import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';

export const SESSION_COOKIE_NAME = 'sdt_admin_session';
export const CSRF_COOKIE_NAME = 'sdt_admin_csrf';
const SESSION_TTL_SECONDS = 60 * 60 * 12;

function getSessionSecret() {
	const secret = import.meta.env.ADMIN_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET;
	if (!secret || secret.length < 32) {
		throw new Error('ADMIN_SESSION_SECRET must be set and have at least 32 characters.');
	}
	return secret;
}

function sign(value: string) {
	return createHmac('sha256', getSessionSecret()).update(value).digest('hex');
}

function secureCompare(a: string, b: string) {
	const left = Buffer.from(a);
	const right = Buffer.from(b);
	if (left.length !== right.length) {
		return false;
	}
	return timingSafeEqual(left, right);
}

function encodeUsername(username: string) {
	return Buffer.from(username, 'utf-8').toString('base64url');
}

function decodeUsername(encoded: string) {
	try {
		return Buffer.from(encoded, 'base64url').toString('utf-8');
	} catch {
		return '';
	}
}

export function createSessionToken(username: string) {
	const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
	const payload = `${encodeUsername(username)}.${expiresAt}.${randomUUID()}`;
	const signature = sign(payload);
	return `${payload}.${signature}`;
}

export function verifySessionToken(token?: string | null) {
	if (!token) {
		return false;
	}
	const [encodedUsername, expiresAtRaw, nonce, signature, ...rest] = token.split('.');
	if (!encodedUsername || !expiresAtRaw || !nonce || !signature || rest.length > 0) {
		return false;
	}
	const username = decodeUsername(encodedUsername);
	if (!username) {
		return false;
	}
	const expiresAt = Number(expiresAtRaw);
	if (!Number.isFinite(expiresAt) || expiresAt < Math.floor(Date.now() / 1000)) {
		return false;
	}
	const payload = `${encodedUsername}.${expiresAtRaw}.${nonce}`;
	const expectedSignature = sign(payload);
	return secureCompare(signature, expectedSignature);
}

export function createCsrfToken() {
	return randomUUID().replace(/-/g, '');
}

export function getAdminCredentials() {
	const username = import.meta.env.ADMIN_USERNAME || process.env.ADMIN_USERNAME;
	const password = import.meta.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;
	if (!username || !password) {
		throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD are required.');
	}
	return { username, password };
}

export function verifyAdminCredentials(usernameInput: string, passwordInput: string) {
	const { username, password } = getAdminCredentials();
	if (!usernameInput || !passwordInput) {
		return false;
	}
	return secureCompare(usernameInput, username) && secureCompare(passwordInput, password);
}

export function isProduction() {
	return import.meta.env.PROD;
}
