/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly PUBLIC_BREVO_LIST_ID?: string;
	readonly PUBLIC_WHATSAPP_MESSAGE?: string;
	readonly PUBLIC_GOOGLE_SITE_VERIFICATION?: string;
	readonly BREVO_API_KEY?: string;
	readonly ADMIN_USERNAME?: string;
	readonly ADMIN_PASSWORD?: string;
	readonly ADMIN_SESSION_SECRET?: string;
	readonly ADMIN_REDEPLOY_COMMAND?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
