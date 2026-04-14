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

async function sendMailjetEmail(toEmail: string, toName: string) {
	const apiKey = import.meta.env.MAILJET_API_KEY || process.env.MAILJET_API_KEY;
	const apiSecret = import.meta.env.MAILJET_SECRET_KEY || process.env.MAILJET_SECRET_KEY;

	if (!apiKey || !apiSecret) {
		throw new Error('Mailjet credentials not configured');
	}

	const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

	const payload = {
		Messages: [
			{
				From: {
					Email: 'webtense@gmail.com',
					Name: 'Semillas de Ti',
				},
				To: [
					{
						Email: toEmail,
						Name: toName || toEmail,
					},
				],
				Subject: '¡Bienvenida a Semillas de Ti!',
				TextPart: `Hola ${toName || ''},\n\n¡Gracias por suscribirte a Semillas de Ti!\n\nRecibe la guía "5 anclas para volver a ti" en los próximos días.\n\nUn abrazo,\nZoraida`,
				HTMLPart: `<h2>¡Hola ${toName || ''}!</h2><p>¡Gracias por suscribirte a Semillas de Ti!</p><p>Recibe la guía "5 anclas para volver a ti" en los próximos días.</p><p>Un abrazo,<br/>Zoraida</p>`,
				CustomID: 'NewsletterSignup',
			},
		],
	};

	const response = await fetch('https://api.mailjet.com/v3.1/send', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${auth}`,
		},
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Mailjet error: ${response.status} - ${errorText}`);
	}

	return response.json();
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

	try {
		await sendMailjetEmail(email, firstName);
		return new Response(JSON.stringify({ message: 'Gracias por suscribirte. Revisa tu correo.' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('Newsletter error:', error);
		return new Response(JSON.stringify({ message: 'No pudimos procesar la suscripción ahora mismo.' }), {
			status: 502,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};
