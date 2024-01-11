<script lang="ts">
	import { glitch } from "$lib/glitch.js"
	import { validate } from "email-validator"
	import { onMount } from "svelte"
	import { fade } from "svelte/transition"

	export let bodyParagraph: HTMLParagraphElement
	export let parentDiv: HTMLDivElement

	let showInput = false
	let registerButton: HTMLButtonElement
	let emailInput: HTMLInputElement
	let extrasParent: HTMLDivElement
	let error = ""
	let email = ""
	let mouseOverRegister = false

	$: email = email.toLowerCase()

	$: if (registerButton) {
		registerButton.addEventListener("mouseover", () => (mouseOverRegister = true))
		registerButton.addEventListener("mouseout", () => (mouseOverRegister = false))
	}

	$: if (emailInput) {
		if (mouseOverRegister) emailInput.focus()
		emailInput.style.transitionProperty = "all"
		emailInput.style.transitionTimingFunction = "cubic-bezier(0.4, 0, 0.2, 1)"
		emailInput.style.transitionDuration = "150ms"
	}

	let INPUT_WIDTH = "400px"
	const INPUT_COLOR = "#E1D9D1"

	onMount(() => {
		const check = () => {
			if (window.innerWidth < 768) INPUT_WIDTH = "300px"
			else if (window.innerWidth < 1024) INPUT_WIDTH = "400px"
			else INPUT_WIDTH = "500px"
		}
		window.addEventListener("resize", check)
		check()
	})

	let glitching = false
	const click = () => {
		if (glitching) return

		const width = getComputedStyle(registerButton).width
		const color = getComputedStyle(registerButton).color
		registerButton.animate(
			[
				{ width, color },
				{ width: INPUT_WIDTH, color: INPUT_COLOR },
			],
			{
				duration: 750,
				fill: "forwards",
				easing: "ease",
			}
		)

		glitch(
			"Register now!",
			"example@gmail.com",
			{
				addSpeed: 200,
				glitchSpeed: 50,
				correctSpeed: 50,
				oldToGlitchSpeed: 10,
			},
			(text) => {
				registerButton.innerText = text
			},
			() => {
				glitching = false
				showInput = true
			}
		)
		glitching = true
	}

	const changeError = (n: string) => {
		if (!error || error === n) {
			error = n
			return
		}

		glitch(
			error,
			n,
			{
				addSpeed: 200,
				glitchSpeed: 50,
				correctSpeed: 50,
				oldToGlitchSpeed: 10,
			},
			(text) => {
				error = text
			}
		)
	}

	let sending = false
	let animating = false
	const submit = async () => {
		if (sending) return
		if (!email) {
			changeError("Please enter an email")
			return
		}

		if (!validate(email)) {
			changeError("Please enter a valid email")
			return
		}

		if (localStorage.getItem("emails")?.includes(email)) {
			changeError("Email already registered")
			return
		}

		animating = true
		error = ""

		const pos = emailInput.getBoundingClientRect()
		const target = bodyParagraph.getBoundingClientRect()

		let anim = emailInput.animate(
			[
				{
					position: "absolute",
					top: `${pos.top}px`,
					left: `${pos.left}px`,
				},
				{
					position: "absolute",
					top: `${target.top}px`,
					left: `${target.left}px`,
				},
			],
			{
				duration: 800,
				fill: "forwards",
				easing: "ease",
			}
		)

		for (const children of extrasParent.children) {
			if (children.tagName === "LABEL") {
				const height = 32 // children.getBoundingClientRect().height
				const diff = Math.abs(pos.height - height)
				console.log(pos.height, height, diff, children, children.getBoundingClientRect())
				children.animate(
					[
						{
							position: "absolute",
							top: `${pos.top + diff / 2}px`,
							left: `${pos.left}px`,
						},
						{
							position: "absolute",
							top: `${target.top + diff / 2}px`,
							left: `${target.right}px`,
						},
					],
					{
						duration: 800,
						fill: "forwards",
						easing: "ease",
					}
				)
			}
		}

		anim = parentDiv.animate([{ opacity: 1 }, { opacity: 0 }], {
			duration: 800,
			fill: "forwards",
			easing: "ease",
		})
		anim.onfinish = () => {
			parentDiv.style.display = "none"
		}

		// sending = true

		// const res = await fetch(`/register?email=${email}`, {
		// 	method: "POST",
		// }).catch(() => {
		// 	changeError("Failed to add email to list")
		// })
		// if (!res) return
		// const json = (await res.json()) as RegisterResponse

		// sending = false

		// if (json.error) {
		// 	changeError(json.error)
		// 	return
		// }

		// changeError("Added email to list")
		// localStorage.setItem("emails", `${localStorage.getItem("emails") ?? ""}${email},`)
	}
</script>

{#if error}
	<div class="h-1"></div>
	<p class="text-xs -mb-7 md:text-sm md:-mb-6 transition-all" transition:fade>{error}</p>
{/if}

<div class="flex justify-center items-center w-full h-24">
	{#if showInput}
		<div bind:this={extrasParent} style={animating ? "" : "display:none"}>
			<label for="email" class="text-2xl font-bold text-black font-raleway absolute"> Email </label>
		</div>

		<input
			bind:this={emailInput}
			bind:value={email}
			on:keypress={(e) => e.key === "Enter" && submit()}
			type="email"
			placeholder="example@gmail.com"
			id="email"
			style="width:{INPUT_WIDTH};--input-color:{INPUT_COLOR}"
			class="text-lg md:text-2xl bg-lightMaroon text-white px-2 py-1 rounded-md focus:scale-105 focus:bg-maroon"
		/>
	{:else}
		<button bind:this={registerButton} on:click={click} class="text-left text-lg md:text-2xl bg-lightMaroon text-white px-2 py-1 rounded-md hover:scale-105 hover:bg-maroon transition-all">
			Register now!
		</button>
	{/if}
</div>

{#if email && !animating}
	<input
		on:click={submit}
		transition:fade
		type="submit"
		value="Next"
		class="-mt-5 md:-mt-4 text-left text-base md:text-lg bg-lightMaroon text-white px-1 rounded-md hover:scale-105 hover:bg-maroon transition-all mb-10"
	/>
{/if}

<style>
	input::placeholder {
		color: var(--input-color);
	}
</style>
