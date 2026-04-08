/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly PUBLIC_BREVO_FORM_ACTION?: string;
	readonly PUBLIC_BREVO_LIST_ID?: string;
	readonly PUBLIC_WHATSAPP_MESSAGE?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
