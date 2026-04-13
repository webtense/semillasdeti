// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
	site: 'https://semillasdeti.com',
	output: 'static',
	adapter: node({ mode: 'standalone' }),
	security: {
		checkOrigin: false,
	},
});
