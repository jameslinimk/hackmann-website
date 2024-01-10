<script lang="ts">
	import { onMount } from "svelte"

	let text = ""
	let showText = "0101"
	const word = "bits"

	const GLITCH_SPEED = 50
	const CHAR_SPEED = 500

	let lastGlitch = performance.now()
	let lastChar = lastGlitch + 1000

	const fillWithBits = (str: string, totalLength: number) => {
		while (str.length < totalLength) str += Math.random() > 0.5 ? "0" : "1"
		return str
	}

	onMount(() => {
		const frame = () => {
			const now = performance.now()
			if (now - lastGlitch > GLITCH_SPEED) {
				showText = fillWithBits(text, word.length)
				lastGlitch = now
			}

			if (now - lastChar > CHAR_SPEED) {
				text = word.slice(0, text.length + 1)
				lastChar = now
			}

			requestAnimationFrame(frame)
		}
		requestAnimationFrame(frame)
	})
</script>

<div class="text-xl md:text-2xl lg:text-3xl font-raleway mt-1 lg:mt-2 text-black fadeIn">Hack your code to <code class="bg-neutral-300 rounded-md px-1">{showText}</code></div>

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
