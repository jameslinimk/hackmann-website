<script lang="ts">
	import { onMount } from "svelte"

	let progress = 0
	const word = "HackMANN".split("")

	const randFill = (length: number) => {
		return Array(length)
			.fill(0)
			.reduce((acc) => acc + Math.random().toString(36)[2], "")
	}

	let hack = ""
	let mann = ""
	let filler = ""

	$: hack = word.slice(0, Math.min(progress, word.length / 2)).join("")
	$: mann = word.slice(word.length / 2, progress).join("")
	$: filler = randFill(word.length - progress)

	let lastProgress = performance.now()
	let lastGlitch = lastProgress

	const PROGRESS_SPEED = [70, 105, 140, 210, 280, 315, 350, 385]
	const GLITCH_SPEED = 50

	onMount(() => {
		const frame = () => {
			const now = performance.now()
			if (now - lastProgress > PROGRESS_SPEED[progress]) {
				progress = Math.min(progress + 1, word.length)
				lastProgress = now
			}

			if (now - lastGlitch > GLITCH_SPEED) {
				filler = randFill(word.length - progress)
				lastGlitch = now
			}

			requestAnimationFrame(frame)
		}
		requestAnimationFrame(frame)
	})
</script>

<span class="text-6xl tracking-wide text-blk">{hack}</span>
<span class="text-6xl tracking-wide font-bold">{mann}</span>
<span class="text-6xl tracking-wide text-black">{filler}</span>
