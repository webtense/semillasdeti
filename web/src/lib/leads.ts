import type { APIRoute } from 'astro';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

export const prerender = false;

interface Lead {
	email: string;
	firstName: string;
	registeredAt: string;
}

const LEADS_FILE = path.join(process.cwd(), 'src/data/leads.json');

async function ensureLeadsFile() {
	const dir = path.dirname(LEADS_FILE);
	await mkdir(dir, { recursive: true });
	try {
		await readFile(LEADS_FILE, 'utf-8');
	} catch {
		await writeFile(LEADS_FILE, JSON.stringify([], null, 2), 'utf-8');
	}
}

export async function getLeads(): Promise<Lead[]> {
	await ensureLeadsFile();
	try {
		const data = await readFile(LEADS_FILE, 'utf-8');
		return JSON.parse(data);
	} catch {
		return [];
	}
}

export async function addLead(email: string, firstName: string): Promise<Lead> {
	await ensureLeadsFile();
	const leads = await getLeads();
	const exists = leads.find((l) => l.email.toLowerCase() === email.toLowerCase());
	if (exists) {
		return exists;
	}
	const newLead: Lead = {
		email: email.toLowerCase(),
		firstName,
		registeredAt: new Date().toISOString(),
	};
	leads.push(newLead);
	await writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
	return newLead;
}