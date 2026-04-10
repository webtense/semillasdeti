import type { APIContext } from 'astro';
import { CSRF_COOKIE_NAME, SESSION_COOKIE_NAME, verifySessionToken } from './auth';

export function isAdminAuthenticated(context: Pick<APIContext, 'cookies'>) {
	const token = context.cookies.get(SESSION_COOKIE_NAME)?.value;
	return verifySessionToken(token);
}

export function ensureAdminAuthenticated(context: Pick<APIContext, 'cookies'>) {
	if (!isAdminAuthenticated(context)) {
		return new Response(null, {
			status: 302,
			headers: { Location: '/admin/login' },
		});
	}
	return null;
}

export function validateCsrf(context: Pick<APIContext, 'cookies'>, formToken: string | null) {
	const cookieToken = context.cookies.get(CSRF_COOKIE_NAME)?.value;
	if (!cookieToken || !formToken) {
		return false;
	}
	return cookieToken === formToken;
}
