import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import type { APIRoute } from 'astro';
import { ensureAdminAuthenticated, validateCsrf } from '../../../lib/admin';
import { getUploadDir } from '../../../lib/content';

export const prerender = false;

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp']);

function detectMimeFromBytes(bytes: Buffer): string | null {
	if (bytes.length >= 4 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
		return 'image/png';
	}
	if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
		return 'image/jpeg';
	}
	if (
		bytes.length >= 12 &&
		bytes[0] === 0x52 &&
		bytes[1] === 0x49 &&
		bytes[2] === 0x46 &&
		bytes[3] === 0x46 &&
		bytes[8] === 0x57 &&
		bytes[9] === 0x45 &&
		bytes[10] === 0x42 &&
		bytes[11] === 0x50
	) {
		return 'image/webp';
	}
	return null;
}

function extensionFromMime(mime: string) {
	if (mime === 'image/png') return '.png';
	if (mime === 'image/webp') return '.webp';
	return '.jpg';
}

function cleanName(filename: string) {
	return filename.toLowerCase().replace(/[^a-z0-9.-]+/g, '-').replace(/-+/g, '-').slice(0, 40);
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

	const image = formData.get('image');
	if (!(image instanceof File)) {
		return context.redirect('/admin?error=missing', 302);
	}
	if (!ALLOWED_MIME.has(image.type) || image.size === 0 || image.size > 5 * 1024 * 1024) {
		return context.redirect('/admin?error=upload', 302);
	}

	const bytes = Buffer.from(await image.arrayBuffer());
	const detectedMime = detectMimeFromBytes(bytes);
	if (!detectedMime || !ALLOWED_MIME.has(detectedMime)) {
		return context.redirect('/admin?error=upload', 302);
	}

	const uploadDir = getUploadDir();
	await mkdir(uploadDir, { recursive: true });
	const sourceName = cleanName(path.parse(image.name).name) || 'image';
	const extension = extensionFromMime(detectedMime);
	const filename = `${Date.now()}-${sourceName}-${randomUUID().slice(0, 8)}${extension}`;
	const targetPath = path.join(uploadDir, filename);

	await writeFile(targetPath, bytes);

	const publicPath = `/images/uploads/${filename}`;
	return context.redirect(`/admin?uploaded=${encodeURIComponent(publicPath)}`, 302);
};
