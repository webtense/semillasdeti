import type { APIRoute } from 'astro';
import { addLead } from '../../lib/leads';
import { addContactToList } from '../../lib/brevo';
import { sendGuideEmail } from './mail-download';

export const prerender = false;

function isValidEmail(email: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const POST: APIRoute = async ({ request }) => {
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
		// 1. Guarda el lead en JSON local (siempre)
		await addLead(email, firstName || 'amiga');

		// 2. Añade el contacto a la lista de Brevo (no bloquea si falla)
		const listId = Number((import.meta.env.PUBLIC_BREVO_LIST_ID as string | undefined) ?? process.env.PUBLIC_BREVO_LIST_ID ?? '1');
		try {
			await addContactToList(email, firstName || '', listId);
		} catch (brevoErr) {
			console.error('[brevo] addContact error (non-fatal):', brevoErr);
		}

		// 3. Envía el email con la guía vía Brevo
		await sendGuideEmail(email, firstName || 'amiga');

		return new Response(
			JSON.stringify({
				message: '¡Gracias! Tu guía está en camino a tu correo.',
				registered: true,
			}),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	} catch (error) {
		console.error('[download-guide] error:', error);
		return new Response(JSON.stringify({ message: 'No pudimos procesar tu solicitud. Intenta más tarde.' }), {
			status: 502,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};
