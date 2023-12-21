/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				maroon: "#670A0A",
				lightMaroon: "#831515",
				cream: "#F8F2E5",
				white: "#FFFFFF",
				blk: "#333333",
			},
			fontFamily: {
				plexMono: ['"IBM Plex Mono"', "monospace"],
			},
		},
	},
	plugins: [],
}
