/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{ts,tsx}"
	],
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: "#000000",
					50: "#f6f6f6",
					100: "#e7e7e7",
					200: "#cfcfcf",
					300: "#b1b1b1",
					400: "#7e7e7e",
					500: "#4a4a4a",
					600: "#2e2e2e",
					700: "#1f1f1f",
					800: "#141414",
					900: "#0a0a0a"
				}
			}
		}
	},
	plugins: []
};


