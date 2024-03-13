/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				maroon: "#670A0A",
				lightMaroon: "#831515",
				darkMaroon: "#400000",
				cream: "#F8F2E5",
				white: "#FFFFFF",
				blk: "#333333",
				blu: "#6568C5",
				darkBlu: "#2A398E",
			},
			fontFamily: {
				plexMono: ['"IBM Plex Mono"', "monospace"],
				raleway: ['"Raleway"', "sans-serif"],
			},
			fontSize: {
				lbase: ["1.08rem", "1.55rem"],
				"4.5xl": ["2.7rem", "2.5rem"],
				"2xs": ".6rem",
			},
		},
	},
	plugins: [],
}
