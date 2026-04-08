// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
	site: 'https://semillasdeti.com',
	output: 'hybrid',
	adapter: node({ mode: 'standalone' }),
	integrations: [tailwind()],
});
