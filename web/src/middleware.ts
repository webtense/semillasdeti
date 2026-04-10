import { defineMiddleware } from 'astro:middleware';
import { SESSION_COOKIE_NAME, verifySessionToken } from './lib/auth';

const LOGIN_PATH = '/admin/login';

function decodePathname(pathname: string) {
	try {
		return decodeURIComponent(pathname);
	} catch {
		return pathname;
	}
}

function withSecurityHeaders(response: Response, requestUrl: URL) {
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
	response.headers.set('Cross-Origin-Resource-Policy', 'same-site');
	response.headers.set(
		'Content-Security-Policy',
		"default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https://api.brevo.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self' mailto:; upgrade-insecure-requests"
	);

	const pathname = decodePathname(requestUrl.pathname);
	if (pathname.startsWith('/admin') || pathname.startsWith('/api/')) {
		response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
	}

	if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin/')) {
		response.headers.set('Cache-Control', 'no-store');
	}

	if (import.meta.env.PROD && requestUrl.protocol === 'https:') {
		response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
	}

	return response;
}

export const onRequest = defineMiddleware(async (context, next) => {
	const pathname = decodePathname(context.url.pathname);
	if (!pathname.startsWith('/admin')) {
		const response = await next();
		return withSecurityHeaders(response, context.url);
	}
	if (pathname.startsWith(LOGIN_PATH) || pathname.startsWith('/api/admin/')) {
		const response = await next();
		return withSecurityHeaders(response, context.url);
	}
	const token = context.cookies.get(SESSION_COOKIE_NAME)?.value;
	if (!verifySessionToken(token)) {
		return withSecurityHeaders(context.redirect(LOGIN_PATH), context.url);
	}
	const response = await next();
	return withSecurityHeaders(response, context.url);
});
