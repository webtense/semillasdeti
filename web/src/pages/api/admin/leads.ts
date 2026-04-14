import type { APIRoute } from 'astro';
import { getLeads } from '../../../lib/leads';
import { ensureAdminAuthenticated, validateCsrf } from '../../../lib/admin';

export const prerender = false;

export const GET: APIRoute = async (context) => {
	const authError = ensureAdminAuthenticated(context);
	if (authError) {
		return authError;
	}

	const format = context.url.searchParams.get('format') || 'json';
	const leads = await getLeads();

	if (format === 'csv') {
		const csv = [
			'Email,Nombre,Fecha de registro',
			...leads.map((l) => `${l.email},${l.firstName},${l.registeredAt}`),
		].join('\n');

		return new Response(csv, {
			headers: {
				'Content-Type': 'text/csv; charset=utf-8',
				'Content-Disposition': 'attachment; filename="leads.csv"',
			},
		});
	}

	return new Response(JSON.stringify(leads, null, 2), {
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

export const POST: APIRoute = async (context) => {
	const authError = ensureAdminAuthenticated(context);
	if (authError) {
		return authError;
	}

	const formData = await context.request.formData();
	const csrfToken = String(formData.get('csrfToken') || '');

	if (!validateCsrf(context, csrfToken)) {
		return context.redirect('/admin?error=csrf', 302);
	}

	const action = String(formData.get('action') || '');

	if (action === 'export-csv') {
		return context.redirect('/api/admin/leads?format=csv');
	}

	return context.redirect('/admin?tab=leads');
};