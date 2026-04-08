/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly PUBLIC_BREVO_LIST_ID?: string;
	readonly PUBLIC_WHATSAPP_MESSAGE?: string;
	readonly BREVO_API_KEY?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
