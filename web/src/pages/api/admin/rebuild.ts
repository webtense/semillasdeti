import { promisify } from 'node:util';
import { execFile as execFileCallback } from 'node:child_process';
import type { APIRoute } from 'astro';
import { ensureAdminAuthenticated, validateCsrf } from '../../../lib/admin';

export const prerender = false;

const execFile = promisify(execFileCallback);

function hasUnsafeShellChars(value: string) {
	return /[;&|`$><\n\r]/.test(value);
}

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

	const command = import.meta.env.ADMIN_REDEPLOY_COMMAND || process.env.ADMIN_REDEPLOY_COMMAND;
	if (!command) {
		return context.redirect('/admin?rebuild=missing', 302);
	}
	if (hasUnsafeShellChars(command)) {
		return context.redirect('/admin?rebuild=invalid', 302);
	}

	const parts = command.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) {
		return context.redirect('/admin?rebuild=invalid', 302);
	}

	const [bin, ...args] = parts;

	try {
		await execFile(bin, args, {
			cwd: process.cwd(),
			timeout: 1000 * 60 * 10,
			maxBuffer: 1024 * 1024,
		});
		return context.redirect('/admin?rebuild=ok', 302);
	} catch {
		return context.redirect('/admin?rebuild=error', 302);
	}
};
