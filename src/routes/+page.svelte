<script lang="ts">
	import Subtitle from "$lib/components/subtitle.svelte"
	import Title from "$lib/components/title.svelte"
	import { glitch } from "$lib/glitch.js"
	import text from "$lib/text.json"
	import { validate } from "email-validator"
	import { onMount } from "svelte"
	import { fade } from "svelte/transition"
	import type { RegisterResponse } from "./register/+server.js"

	let showInput = false
	let register: HTMLButtonElement
	let inputEmail: HTMLInputElement
	let error = ""
	let email = ""

	$: email = email.toLowerCase()

	let mouseOverRegister = false

	$: if (register) {
		register.addEventListener("mouseover", () => (mouseOverRegister = true))
		register.addEventListener("mouseout", () => (mouseOverRegister = false))
	}

	$: if (inputEmail) {
		if (mouseOverRegister) inputEmail.focus()
		inputEmail.style.transitionProperty = "all"
		inputEmail.style.transitionTimingFunction = "cubic-bezier(0.4, 0, 0.2, 1)"
		inputEmail.style.transitionDuration = "150ms"
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

		const width = getComputedStyle(register).width
		const color = getComputedStyle(register).color
		register.animate(
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
				register.innerText = text
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

		sending = true

		const res = await fetch(`/register?email=${email}`, {
			method: "POST",
		}).catch(() => {
			changeError("Failed to add email to list")
		})
		if (!res) return
		const json = (await res.json()) as RegisterResponse

		sending = false

		if (json.error) {
			changeError(json.error)
			return
		}

		changeError("Added email to list")
		localStorage.setItem("emails", `${localStorage.getItem("emails") ?? ""}${email},`)
	}
</script>

<div class="text-maroon font-plexMono text-[0] absolute top-0 left-0 w-full flex items-center justify-center pt-4 flex-col">
	<Title />
	<Subtitle />

	<div class="text-sm text-black md:text-lg lg:text-lg px-10 md:px-14 lg:px-40 xl:px-96 mt-4 lg:mt-8 font-raleway">
		<p class="mb-4">{@html text.body}</p>

		<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
			{#each text.faq as [title, body]}
				<div class="border-2 border-gray-400 rounded-md p-2">
					<p class="font-bold text-lightMaroon text-lg">{title}</p>
					<p class="text-sm">{body}</p>
				</div>
			{/each}
		</div>
	</div>

	{#if error}
		<div class="h-1"></div>
		<p class="text-xs -mb-7 md:text-sm md:-mb-6 transition-all" transition:fade>{error}</p>
	{/if}

	<div class="flex justify-center items-center w-full h-24">
		{#if showInput}
			<input
				bind:this={inputEmail}
				bind:value={email}
				on:keypress={(e) => e.key === "Enter" && submit()}
				type="email"
				placeholder="example@gmail.com"
				style="width:{INPUT_WIDTH};--input-color:{INPUT_COLOR}"
				class="text-lg md:text-2xl bg-lightMaroon text-white px-2 py-1 rounded-md focus:scale-105 focus:bg-maroon"
			/>
		{:else}
			<button bind:this={register} on:click={click} class="text-left text-lg md:text-2xl bg-lightMaroon text-white px-2 py-1 rounded-md hover:scale-105 hover:bg-maroon transition-all">
				Register now!
			</button>
		{/if}
	</div>

	{#if showInput}
		<input
			on:click={submit}
			type="submit"
			value="Send"
			class="-mt-5 md:-mt-4 text-left text-base md:text-lg bg-lightMaroon text-white px-1 rounded-md hover:scale-105 hover:bg-maroon transition-all fadeIn mb-10"
		/>
	{/if}
</div>

<style>
	.fadeIn {
		animation: fadeIn 1.5s;
		animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
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

	:global(strong) {
		@apply text-lightMaroon;
	}

	input::placeholder {
		color: var(--input-color);
	}
</style>
