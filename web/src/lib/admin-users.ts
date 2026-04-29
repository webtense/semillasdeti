import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { randomUUID } from 'node:crypto';
import path from 'node:path';

const USERS_FILE = path.join(process.cwd(), 'src/data/admin-users.json');

interface AdminUser {
	id: string;
	username: string;
	passwordHash: string;
	createdAt: string;
}

export interface AdminUserPublic {
	id: string;
	username: string;
	createdAt: string;
}

function hashPassword(password: string): string {
	const salt = randomBytes(16);
	const hash = scryptSync(password, salt, 64);
	return `${salt.toString('hex')}:${hash.toString('hex')}`;
}

function checkPassword(password: string, stored: string): boolean {
	const [saltHex, hashHex] = stored.split(':');
	if (!saltHex || !hashHex) return false;
	try {
		const salt = Buffer.from(saltHex, 'hex');
		const storedHash = Buffer.from(hashHex, 'hex');
		const hash = scryptSync(password, salt, 64);
		return timingSafeEqual(hash, storedHash);
	} catch {
		return false;
	}
}

async function ensureFile() {
	await mkdir(path.dirname(USERS_FILE), { recursive: true });
	if (!existsSync(USERS_FILE)) {
		await writeFile(USERS_FILE, JSON.stringify([], null, 2), 'utf-8');
	}
}

async function loadUsers(): Promise<AdminUser[]> {
	await ensureFile();
	try {
		return JSON.parse(await readFile(USERS_FILE, 'utf-8'));
	} catch {
		return [];
	}
}

async function saveUsers(users: AdminUser[]): Promise<void> {
	await writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
}

export async function hasUsers(): Promise<boolean> {
	await ensureFile();
	const users = await loadUsers();
	return users.length > 0;
}

export async function listUsers(): Promise<AdminUserPublic[]> {
	const users = await loadUsers();
	return users.map(({ id, username, createdAt }) => ({ id, username, createdAt }));
}

export async function addUser(username: string, password: string): Promise<{ ok: boolean; error?: string }> {
	const users = await loadUsers();
	if (users.some((u) => u.username === username)) {
		return { ok: false, error: 'El nombre de usuario ya existe.' };
	}
	users.push({ id: randomUUID(), username, passwordHash: hashPassword(password), createdAt: new Date().toISOString() });
	await saveUsers(users);
	return { ok: true };
}

export async function deleteUser(id: string): Promise<{ ok: boolean; error?: string }> {
	const users = await loadUsers();
	if (users.length <= 1) return { ok: false, error: 'No se puede eliminar el único usuario.' };
	const filtered = users.filter((u) => u.id !== id);
	if (filtered.length === users.length) return { ok: false, error: 'Usuario no encontrado.' };
	await saveUsers(filtered);
	return { ok: true };
}

export async function changePassword(id: string, newPassword: string): Promise<{ ok: boolean; error?: string }> {
	const users = await loadUsers();
	const user = users.find((u) => u.id === id);
	if (!user) return { ok: false, error: 'Usuario no encontrado.' };
	user.passwordHash = hashPassword(newPassword);
	await saveUsers(users);
	return { ok: true };
}

export async function verifyUserCredentials(username: string, password: string): Promise<boolean> {
	const users = await loadUsers();
	const user = users.find((u) => u.username === username);
	if (!user) return false;
	return checkPassword(password, user.passwordHash);
}

export async function seedFromEnvIfEmpty(username: string, password: string): Promise<void> {
	const users = await loadUsers();
	if (users.length > 0) return;
	users.push({ id: randomUUID(), username, passwordHash: hashPassword(password), createdAt: new Date().toISOString() });
	await saveUsers(users);
}

export async function getUserId(username: string): Promise<string | undefined> {
	const users = await loadUsers();
	return users.find((u) => u.username === username)?.id;
}
