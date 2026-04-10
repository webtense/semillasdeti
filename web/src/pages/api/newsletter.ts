import type { APIRoute } from 'astro';

export const prerender = false;

type RequestWindow = { count: number; firstHit: number };
const ipWindow = new Map<string, RequestWindow>();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 30;

function isRateLimited(ip: string) {
	const now = Date.now();
	const current = ipWindow.get(ip);
	if (!current) {
		ipWindow.set(ip, { count: 1, firstHit: now });
		return false;
	}
	if (now - current.firstHit > WINDOW_MS) {
		ipWindow.set(ip, { count: 1, firstHit: now });
		return false;
	}
	current.count += 1;
	ipWindow.set(ip, current);
	return current.count > MAX_REQUESTS_PER_WINDOW;
}

function isValidEmail(email: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
	if (isRateLimited(clientAddress)) {
		return new Response(JSON.stringify({ message: 'Demasiadas solicitudes. Intenta de nuevo en un minuto.' }), {
			status: 429,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const contentLength = Number(request.headers.get('content-length') || 0);
	if (Number.isFinite(contentLength) && contentLength > 10_000) {
		return new Response(JSON.stringify({ message: 'La solicitud excede el tamaño permitido.' }), {
			status: 413,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const brevoApiKey = import.meta.env.BREVO_API_KEY;
	const listId = Number(import.meta.env.PUBLIC_BREVO_LIST_ID || 0);

	if (!brevoApiKey || !listId) {
		return new Response(JSON.stringify({ message: 'La newsletter no está configurada en el servidor.' }), {
			status: 503,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	let body: { email?: string; firstName?: string } = {};
	try {
		body = await request.json();
	} catch {
		return new Response(JSON.stringify({ message: 'No se pudo leer la solicitud.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const email = String(body.email || '').trim().toLowerCase();
	const firstName = String(body.firstName || '').trim();

	if (!email || !isValidEmail(email)) {
		return new Response(JSON.stringify({ message: 'Por favor, indica un correo válido.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const payload = {
		email,
		attributes: {
			FIRSTNAME: firstName,
		},
		listIds: [listId],
		updateEnabled: true,
	};

	try {
		const response = await fetch('https://api.brevo.com/v3/contacts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'api-key': brevoApiKey,
			},
			body: JSON.stringify(payload),
		});

		if (response.ok || response.status === 204) {
			return new Response(JSON.stringify({ message: 'Gracias por suscribirte. Revisa tu correo.' }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		const errorPayload = (await response.json().catch(() => ({}))) as { code?: string; message?: string };
		if (errorPayload.code === 'duplicate_parameter') {
			return new Response(JSON.stringify({ message: 'Ya estabas suscrita. Te seguimos enviando recursos.' }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		return new Response(JSON.stringify({ message: 'No pudimos procesar la suscripción ahora mismo.' }), {
			status: 502,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch {
		return new Response(JSON.stringify({ message: 'No se pudo conectar con Brevo. Intenta más tarde.' }), {
			status: 502,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};
