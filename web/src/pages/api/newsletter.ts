import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	if (!import.meta.env.BREVO_API_KEY) {
		return new Response(JSON.stringify({ message: 'Newsletter no está configurada.' }), {
			status: 503,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	let data: { email?: string; firstName?: string } = {};
	try {
		data = await request.json();
	} catch (error) {
		return new Response(JSON.stringify({ message: 'Formato inválido.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const email = data.email?.trim();
	const firstName = data.firstName?.trim();
	if (!email) {
		return new Response(JSON.stringify({ message: 'El correo es obligatorio.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const listId = Number(import.meta.env.PUBLIC_BREVO_LIST_ID || 1);

	try {
		const response = await fetch('https://api.brevo.com/v3/contacts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				'api-key': import.meta.env.BREVO_API_KEY,
			},
			body: JSON.stringify({
				email,
				attributes: firstName ? { FIRSTNAME: firstName } : undefined,
				updateEnabled: true,
				listIds: [listId],
			}),
		});

		if (!response.ok) {
			const error = await response.json().catch(() => ({}));
			return new Response(JSON.stringify({ message: error?.message || 'No se pudo suscribir.' }), {
				status: 502,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		return new Response(JSON.stringify({ message: 'Gracias por suscribirte.' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		return new Response(JSON.stringify({ message: 'Error conectando con Brevo.' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};
