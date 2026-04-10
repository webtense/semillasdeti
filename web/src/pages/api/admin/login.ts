import type { APIRoute } from 'astro';
import {
	createCsrfToken,
	createSessionToken,
	CSRF_COOKIE_NAME,
	getAdminCredentials,
	isProduction,
	SESSION_COOKIE_NAME,
	verifyAdminCredentials,
} from '../../../lib/auth';

export const prerender = false;

type AttemptData = {
	count: number;
	firstAttemptAt: number;
	blockedUntil: number;
};

const attemptsByIp = new Map<string, AttemptData>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const BLOCK_MS = 15 * 60 * 1000;

function isRateLimited(ip: string) {
	const now = Date.now();
	const data = attemptsByIp.get(ip);
	if (!data) {
		return false;
	}
	if (data.blockedUntil > now) {
		return true;
	}
	if (now - data.firstAttemptAt > WINDOW_MS) {
		attemptsByIp.delete(ip);
	}
	return false;
}

function registerFailedAttempt(ip: string) {
	const now = Date.now();
	const current = attemptsByIp.get(ip);
	if (!current || now - current.firstAttemptAt > WINDOW_MS) {
		attemptsByIp.set(ip, { count: 1, firstAttemptAt: now, blockedUntil: 0 });
		return;
	}
	current.count += 1;
	if (current.count >= MAX_ATTEMPTS) {
		current.blockedUntil = now + BLOCK_MS;
	}
	attemptsByIp.set(ip, current);
}

function clearAttempts(ip: string) {
	attemptsByIp.delete(ip);
}

export const POST: APIRoute = async ({ request, redirect, cookies, clientAddress }) => {
	if (isRateLimited(clientAddress)) {
		return redirect('/admin/login?reason=limited', 302);
	}

	try {
		getAdminCredentials();
	} catch {
		return new Response('Admin credentials are not configured.', { status: 500 });
	}

	const formData = await request.formData();
	const username = String(formData.get('username') || '').trim();
	const password = String(formData.get('password') || '');

	if (!verifyAdminCredentials(username, password)) {
		registerFailedAttempt(clientAddress);
		return redirect('/admin/login?reason=invalid', 302);
	}

	clearAttempts(clientAddress);
	const sessionToken = createSessionToken(username);
	const csrfToken = createCsrfToken();

	cookies.set(SESSION_COOKIE_NAME, sessionToken, {
		httpOnly: true,
		secure: isProduction(),
		sameSite: 'strict',
		path: '/',
		maxAge: 60 * 60 * 12,
	});

	cookies.set(CSRF_COOKIE_NAME, csrfToken, {
		httpOnly: false,
		secure: isProduction(),
		sameSite: 'strict',
		path: '/',
		maxAge: 60 * 60 * 12,
	});

	return redirect('/admin', 302);
};
