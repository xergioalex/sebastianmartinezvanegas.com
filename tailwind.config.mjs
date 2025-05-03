/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				serif: ['serif'],
			},
			colors: {
				cream: '#fcf7e3',
        'cream-light': '#fffcf0',
			},
		},
	},
	plugins: [import("@tailwindcss/typography")],
};
