<script lang="ts">
	import { browser } from "$app/environment"
	import { randFill } from "$lib/glitch.js"
	import { reset } from "$lib/title.js"
	import { onMount } from "svelte"

	let progress = 0
	const word = "HackMANN".split("")
	const YEAR = "2024"

	let hack = ""
	let mann = ""
	let filler = ""
	let year = ""
	let visible = true

	let v_interval = setInterval(() => {
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

	// Reset
	$: if ($reset) {
		$reset = false
		hack = ""
		mann = ""
		filler = ""
		year = ""
		progress = 0
		visible = true
		yo_applied = false
		lastProgress = performance.now()
		lastGlitch = lastProgress
		lastYear = lastProgress
		if (t) {
			clearTimeout(t)
			t = null
		}
		clearInterval(v_interval)
		v_interval = setInterval(() => {
			visible = !visible
		}, 500)
	}

	let t: number | null = null
	onMount(() => {
		;(window as any).test = () => ($reset = true)

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

				if (t === null) {
					t = setTimeout(() => {
						clearInterval(v_interval)
						visible = false
					}, 1000)
				}
			}

			requestAnimationFrame(frame)
		}
		requestAnimationFrame(frame)
	})

	let homepage = false
	onMount(() => {
		if (browser) homepage = window.location.pathname === "/"
	})
</script>

<a href="." on:click={() => ($reset = homepage)}>
	<span class="text-4.5xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide text-blk">{hack}</span>
	<span class="text-4.5xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide font-bold">{mann}</span>
	<span class="text-4.5xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide text-black">{filler}</span>
	<span class="text-4.5xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide text-blk ml-2">{year}</span>
	<span
		class="rounded-sm absolute bg-blk
				h-[0.24rem] w-7 mt-9
				md:h-[0.34rem] md:w-10 md:mt-[3.2rem]
				lg:h-[0.4rem] lg:w-11 lg:mt-16"
		class:invisible={!visible}
	></span>
</a>
