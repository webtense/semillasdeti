import type { APIRoute } from 'astro';
import { addContactToList } from '../../lib/brevo';
import { addLead } from '../../lib/leads';

export const prerender = false;

type RequestWindow = { count: number; firstHit: number };
const ipWindow = new Map<string, RequestWindow>();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 30;

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
	return current.count > MAX_REQUESTS;
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
		await addLead(email, firstName || '');
		const listId = Number((import.meta.env.PUBLIC_BREVO_LIST_ID as string | undefined) ?? process.env.PUBLIC_BREVO_LIST_ID ?? '1');
		await addContactToList(email, firstName || '', listId);

		return new Response(JSON.stringify({ message: 'Gracias por suscribirte. Revisa tu correo.' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('[newsletter] error:', error);
		return new Response(JSON.stringify({ message: 'No pudimos procesar la suscripción ahora mismo.' }), {
			status: 502,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};
