<script lang="ts">
	import { onMount } from "svelte"

	let text = "0101"
	const word = "bits"

	const GLITCH_SPEED = 50

	let lastGlitch = performance.now()

	onMount(() => {
		const frame = () => {
			const now = performance.now()
			if (now - lastGlitch > GLITCH_SPEED) {
				text = text === "0101" ? "1010" : "0101"
				lastGlitch = now
			}

			requestAnimationFrame(frame)
		}

		frame()
	})
</script>

<div class="text-3xl font-raleway mt-2 text-black fadeIn">Hack your code to <code class="bg-neutral-300 rounded-md px-1">{text}</code></div>

<style>
	.fadeIn {
		animation: fadeIn 2s;
		opacity: 1;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
