/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				sand: '#f7f0e8',
				terra: '#c5745a',
				sienna: '#8a4d3a',
				sage: '#6c8a6c',
				cacao: '#3f2a25',
				clay: '#edd8cb',
			},
			fontFamily: {
				serif: ['"Playfair Display"', 'serif'],
				sans: ['"Source Sans 3"', 'sans-serif'],
			},
			boxShadow: {
				soft: '0 25px 60px -40px rgba(62, 35, 29, 0.35)',
			},
			backgroundImage: {
				'grain': "radial-gradient(circle at 1px 1px, rgba(62,35,29,0.05) 1px, transparent 0)",
			},
		},
	},
	plugins: [],
}
