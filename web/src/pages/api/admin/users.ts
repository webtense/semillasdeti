import type { APIRoute } from 'astro';
import { ensureAdminAuthenticated, validateCsrf } from '../../../lib/admin';
import { addUser, deleteUser, changePassword, getUserId } from '../../../lib/admin-users';
import { getSessionUsername, SESSION_COOKIE_NAME } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async (context) => {
	const authError = ensureAdminAuthenticated(context);
	if (authError) return authError;

	const formData = await context.request.formData();
	const csrfToken = String(formData.get('csrfToken') || '');
	if (!validateCsrf(context, csrfToken)) {
		return context.redirect('/admin?error=csrf&tab=usuarios', 302);
	}

	const action = String(formData.get('action') || '');

	if (action === 'add') {
		const username = String(formData.get('username') || '').trim().toLowerCase();
		const password = String(formData.get('password') || '');
		const confirm = String(formData.get('confirm') || '');

		if (!username || username.length < 3) {
			return context.redirect('/admin?tab=usuarios&usererror=short', 302);
		}
		if (password.length < 8) {
			return context.redirect('/admin?tab=usuarios&usererror=weakpass', 302);
		}
		if (password !== confirm) {
			return context.redirect('/admin?tab=usuarios&usererror=mismatch', 302);
		}

		const result = await addUser(username, password);
		if (!result.ok) {
			return context.redirect('/admin?tab=usuarios&usererror=exists', 302);
		}
		return context.redirect('/admin?tab=usuarios&usersaved=1', 302);
	}

	if (action === 'delete') {
		const id = String(formData.get('id') || '');
		const result = await deleteUser(id);
		if (!result.ok) {
			return context.redirect('/admin?tab=usuarios&usererror=cantdelete', 302);
		}
		return context.redirect('/admin?tab=usuarios&userdeleted=1', 302);
	}

	if (action === 'change-password') {
		const token = context.cookies.get(SESSION_COOKIE_NAME)?.value;
		const currentUsername = getSessionUsername(token);
		if (!currentUsername) {
			return context.redirect('/admin/login', 302);
		}
		const id = await getUserId(currentUsername);
		if (!id) {
			return context.redirect('/admin?tab=usuarios&usererror=notfound', 302);
		}
		const newPassword = String(formData.get('newPassword') || '');
		const confirm = String(formData.get('confirmPassword') || '');

		if (newPassword.length < 8) {
			return context.redirect('/admin?tab=usuarios&usererror=weakpass', 302);
		}
		if (newPassword !== confirm) {
			return context.redirect('/admin?tab=usuarios&usererror=mismatch', 302);
		}

		const result = await changePassword(id, newPassword);
		if (!result.ok) {
			return context.redirect('/admin?tab=usuarios&usererror=notfound', 302);
		}
		return context.redirect('/admin?tab=usuarios&pwchanged=1', 302);
	}

	return context.redirect('/admin?tab=usuarios', 302);
};
