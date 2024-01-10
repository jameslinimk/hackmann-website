<script lang="ts">
	import { onMount } from "svelte"

	let progress = 0
	const word = "HackMANN".split("")
	const YEAR = "2024"

	const randFill = (length: number) => {
		return Array(length)
			.fill(0)
			.reduce((acc) => acc + Math.random().toString(36)[2], "")
	}

	let hack = ""
	let mann = ""
	let filler = ""
	let year = ""
	let visible = true

	const v_interval = setInterval(() => {
		visible = !visible
	}, 500)

	$: hack = word.slice(0, Math.min(progress, word.length / 2)).join("")
	$: mann = word.slice(word.length / 2, progress).join("")
	$: filler = randFill(word.length - progress)

	const PROGRESS_SPEED = [70, 105, 140, 210, 280, 315, 350, 385]
	const GLITCH_SPEED = 50
	const YEAR_SPEED = 125
	const YEAR_OFFSET = 500
	let yo_applied = false

	let lastProgress = performance.now()
	let lastGlitch = lastProgress
	let lastYear = lastProgress

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

			if (progress === word.length && !yo_applied) {
				yo_applied = true
				lastYear = now + YEAR_OFFSET
			}

			if (progress === word.length && now - lastYear > YEAR_SPEED) {
				year = YEAR.slice(0, year.length + 1)
				lastYear = now

				setTimeout(() => {
					clearInterval(v_interval)
					visible = false
				}, 1000)
			}

			requestAnimationFrame(frame)
		}
		requestAnimationFrame(frame)
	})
</script>

<div>
	<span class="text-4xl md:text-6xl lg:text-7xl tracking-wide text-blk">{hack}</span>
	<span class="text-4xl md:text-6xl lg:text-7xl tracking-wide font-bold">{mann}</span>
	<span class="text-4xl md:text-6xl lg:text-7xl tracking-wide text-black">{filler}</span>
	<span class="text-4xl md:text-6xl lg:text-7xl tracking-wide text-blk ml-2">{year}</span>
	<span
		class="rounded-sm absolute bg-blk
				h-[0.24rem] w-6 mt-8
				md:h-[0.34rem] md:w-10 md:mt-[3.2rem]
				lg:h-[0.4rem] lg:w-11 lg:mt-16"
		class:invisible={!visible}
	></span>
</div>
