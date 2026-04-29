const BREVO_API = 'https://api.brevo.com/v3';

function getKey(): string {
	const k = (import.meta.env.BREVO_API_KEY as string | undefined) ?? process.env.BREVO_API_KEY;
	if (!k) throw new Error('BREVO_API_KEY no configurada');
	return k;
}

function getSender() {
	return {
		email:
			(import.meta.env.BREVO_SENDER_EMAIL as string | undefined) ??
			process.env.BREVO_SENDER_EMAIL ??
			'zoraidapozobarrio@gmail.com',
		name:
			(import.meta.env.BREVO_SENDER_NAME as string | undefined) ??
			process.env.BREVO_SENDER_NAME ??
			'Zoraida — Semillas de Ti',
	};
}

export interface BrevoEmailPayload {
	toEmail: string;
	toName: string;
	subject: string;
	html: string;
	text: string;
	tags?: string[];
}

export async function addContactToList(email: string, firstName: string, listId: number): Promise<void> {
	const res = await fetch(`${BREVO_API}/contacts`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'api-key': getKey(),
		},
		body: JSON.stringify({
			email,
			attributes: { FIRSTNAME: firstName },
			listIds: [listId],
			updateEnabled: true,
		}),
	});
	// 204 = contact updated (already existed), also OK
	if (!res.ok && res.status !== 204) {
		const body = await res.text().catch(() => '');
		throw new Error(`Brevo contacts ${res.status}: ${body}`);
	}
}

export async function sendEmail(payload: BrevoEmailPayload): Promise<void> {
	const sender = getSender();
	const res = await fetch(`${BREVO_API}/smtp/email`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'api-key': getKey(),
		},
		body: JSON.stringify({
			sender,
			to: [{ email: payload.toEmail, name: payload.toName || payload.toEmail }],
			subject: payload.subject,
			htmlContent: payload.html,
			textContent: payload.text,
			tags: payload.tags ?? [],
		}),
	});
	if (!res.ok) {
		const body = await res.text().catch(() => '');
		throw new Error(`Brevo email ${res.status}: ${body}`);
	}
}

export async function getListContactCount(listId: number): Promise<number> {
	try {
		const res = await fetch(`${BREVO_API}/contacts/lists/${listId}`, {
			headers: { 'api-key': getKey() },
		});
		if (!res.ok) return -1;
		const data = (await res.json()) as { totalSubscribers?: number };
		return data.totalSubscribers ?? 0;
	} catch {
		return -1;
	}
}
