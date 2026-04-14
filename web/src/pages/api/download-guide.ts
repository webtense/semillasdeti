import type { APIRoute } from 'astro';
import { addLead } from '../../lib/leads';
import { sendDownloadEmail } from './mail-download';

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
		const lead = await addLead(email, firstName || 'amiga');
		
		await sendDownloadEmail(email, firstName || 'amiga');

		return new Response(
			JSON.stringify({
				message: '¡Gracias! Tu guía está en camino a tu correo.',
				registered: true,
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	} catch (error) {
		console.error('Download lead error:', error);
		return new Response(
			JSON.stringify({ message: 'No pudimos procesar tu solicitud. Intenta más tarde.' }),
			{
				status: 502,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
};