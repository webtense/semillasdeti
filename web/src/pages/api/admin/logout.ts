import type { APIRoute } from 'astro';
import { validateCsrf } from '../../../lib/admin';
import { CSRF_COOKIE_NAME, SESSION_COOKIE_NAME, isProduction } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async (context) => {
	const formData = await context.request.formData();
	const csrfToken = String(formData.get('csrfToken') || '');
	if (!validateCsrf(context, csrfToken)) {
		return context.redirect('/admin/login?reason=invalid', 302);
	}

	context.cookies.set(SESSION_COOKIE_NAME, '', {
		httpOnly: true,
		secure: isProduction(),
		sameSite: 'strict',
		path: '/',
		maxAge: 0,
	});
	context.cookies.set(CSRF_COOKIE_NAME, '', {
		httpOnly: false,
		secure: isProduction(),
		sameSite: 'strict',
		path: '/',
		maxAge: 0,
	});

	return context.redirect('/admin/login?reason=loggedout', 302);
};
