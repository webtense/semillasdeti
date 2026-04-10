import type { APIRoute } from 'astro';
import { ensureAdminAuthenticated, validateCsrf } from '../../../lib/admin';
import { saveSiteContent } from '../../../lib/content';

export const prerender = false;

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

	const contentRaw = String(formData.get('content') || '');
	if (!contentRaw) {
		return context.redirect('/admin?error=missing', 302);
	}
	if (contentRaw.length > 120_000) {
		return context.redirect('/admin?error=toolarge', 302);
	}

	let parsed: unknown;
	try {
		parsed = JSON.parse(contentRaw);
	} catch {
		return context.redirect('/admin?error=json', 302);
	}

	await saveSiteContent(parsed);
	return context.redirect('/admin?saved=1', 302);
};
