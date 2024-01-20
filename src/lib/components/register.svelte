<script lang="ts">
	import { glitch } from "$lib/glitch.js"
	import { validate } from "email-validator"
	import { onMount } from "svelte"
	import { fade } from "svelte/transition"
	import type { RegisterResponse } from "../../routes/register/+server.js"

	export let parentDiv: HTMLDivElement
	export let formDiv: HTMLDivElement

	let showInput = false
	let registerButton: HTMLButtonElement
	let emailInput: HTMLInputElement
	let extrasParent: HTMLDivElement
	let error = ""
	let email = ""
	let mouseOverRegister = false

	const inputs = [
		["name", "Name", "John Doe"],
		["school", "School", "Horace Mann School"],
	]
	const inputMap: Record<string, string> = {}

	$: email = email.toLowerCase()

	$: if (registerButton) {
		registerButton.addEventListener("mouseover", () => (mouseOverRegister = true))
		registerButton.addEventListener("mouseout", () => (mouseOverRegister = false))
	}

	const enableAnim = () => {
		emailInput.style.transitionProperty = "all"
		emailInput.style.transitionTimingFunction = "cubic-bezier(0.4, 0, 0.2, 1)"
		emailInput.style.transitionDuration = "150ms"
	}

	const disableAnim = () => {
		emailInput.style.transitionProperty = "none"
		emailInput.style.transitionTimingFunction = "none"
		emailInput.style.transitionDuration = "none"
	}

	let first = false
	$: if (emailInput && !first) {
		first = true
		if (mouseOverRegister) emailInput.focus()
		enableAnim()
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
	const expandInput = () => {
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

	const changeError = (n: string, addSpeed = 200) => {
		if (!error || error === n) {
			error = n
			return
		}

		glitch(
			error,
			n,
			{
				addSpeed,
				glitchSpeed: 50,
				correctSpeed: 50,
				oldToGlitchSpeed: 10,
			},
			(text) => {
				error = text
			}
		)
	}

	const checkEmail = () => {
		if (!email) {
			changeError("Please enter an email")
			return true
		}

		if (!validate(email)) {
			changeError("Please enter a valid email")
			return true
		}

		if (localStorage.getItem("emails")?.includes(email)) {
			changeError("Email already registered")
			return true
		}

		return false
	}

	let sending = false
	const submit = async () => {
		if (sending) return
		if (checkEmail()) return
		for (const [name] of inputs) {
			if (inputMap[name]) continue
			return changeError(`Please enter a ${name}`)
		}

		sending = true

		let url = `/register?email=${email}`
		for (const [name, value] of Object.entries(inputMap)) url += `&${name}=${value}`

		const res = await fetch(url, {
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

		changeError("Added email to list, an email will be sent to you soon!", 50)
		localStorage.setItem("emails", `${localStorage.getItem("emails") ?? ""}${email},`)
	}

	let animating = false
	const expandForm = () => {
		if (animating || checkEmail()) return

		changeError("")
		animating = true
		error = ""

		// Stuff
		window.scrollTo({ top: 0 })
		const focused = document.activeElement === emailInput
		if (focused) disableAnim()

		// Config
		const animation = {
			duration: 800,
			fill: "forwards",
			easing: "ease",
		} as KeyframeAnimationOptions

		// Email stuff
		const emailParentRect = emailInput.parentElement!.getBoundingClientRect()

		const containers: HTMLDivElement[] = []
		const placeholders: string[] = []
		for (let i = 0; i < extrasParent.children.length; i++) {
			const child = extrasParent.children[i]
			containers.push(child as HTMLDivElement)

			if (i === 0 || i === extrasParent.children.length - 1) continue

			// Setting placeholders
			for (const inputElm of child.children as any as HTMLInputElement[]) {
				if (inputElm.tagName !== "INPUT") continue
				placeholders.push(inputElm.placeholder)
				inputElm.placeholder = email || "example@gmail.com"
			}
		}

		// Getting target info
		const MARGIN_TOP = 12
		const SUBMIT_MARGIN_TOP = 12

		const parentRect = formDiv.getBoundingClientRect()
		const parentCX = formDiv.offsetLeft + parentRect.width / 2
		const parentY = formDiv.offsetTop + MARGIN_TOP

		// Other anim
		let height = 0
		const MARGIN = 12
		containers.forEach((c, i) => {
			const [label, input] = c.children as any as [HTMLInputElement, HTMLLabelElement]

			if (i !== 0) c.style.display = "block"
			else label.style.display = "block"

			const cRect = c.getBoundingClientRect()
			if (!height) height = cRect.height

			const cx = c.offsetLeft + cRect.width / 2
			const diff = parentCX - cx

			const tx = cRect.left + diff
			const ty = parentY + (height + MARGIN) * i + (!input ? SUBMIT_MARGIN_TOP : 0)

			const ity = ty + label.getBoundingClientRect().height

			label.style.position = "absolute"
			if (input) input.style.position = "absolute"

			if (input)
				input.animate(
					[
						{
							top: `${emailParentRect.top}px`,
							left: `${emailParentRect.left}px`,
						},
						{
							top: `${ity}px`,
							left: `${tx}px`,
						},
					],
					animation
				)
			label.animate(
				[
					{
						top: `${emailParentRect.top}px`,
						left: `${emailParentRect.left}px`,
					},
					{
						top: `${ty}px`,
						left: `${tx}px`,
					},
				],
				animation
			).onfinish = () => {
				label.style.position = "static"

				if (input) input.style.position = "static"
				else label.style.marginTop = `${SUBMIT_MARGIN_TOP}px`

				formDiv.appendChild(c)
				formDiv.style.marginTop = `${MARGIN_TOP}px`

				if (focused && i === 0) {
					emailInput.focus()
					enableAnim()
				}
			}
		})

		// Fading out parent
		const parentAnim = parentDiv.animate([{ opacity: 1 }, { opacity: 0 }], {
			duration: 800,
			fill: "forwards",
			easing: "ease",
		})
		parentAnim.onfinish = () => {
			parentDiv.style.display = "none"
		}

		// Glitch
		containers.forEach((c, i) => {
			if (i === 0 || i === containers.length - 1) return
			const input = c.children[1] as HTMLInputElement
			glitch(
				input.placeholder,
				placeholders[i - 1],
				{
					addSpeed: 100,
					glitchSpeed: 50,
					correctSpeed: 100,
					oldToGlitchSpeed: 40,
				},
				(text) => {
					input.placeholder = text
				}
			)
		})
	}
</script>

{#if error}
	<div class="h-1"></div>
	<p class="text-xs -mb-7 md:text-sm md:-mb-6 transition-all" transition:fade>{error}</p>
{/if}

<div class="flex justify-center items-center w-full h-24">
	{#if showInput}
		<div bind:this={extrasParent}>
			<div>
				<label for="email" class="text-lg font-bold text-black font-raleway hidden"> Email </label>
				<input
					bind:this={emailInput}
					bind:value={email}
					on:keypress={(e) => e.key === "Enter" && expandForm()}
					type="email"
					placeholder="example@gmail.com"
					autocomplete="email"
					id="email"
					name="email"
					style="width:{INPUT_WIDTH};--input-color:{INPUT_COLOR}"
					class="input"
				/>
			</div>
			{#each inputs as [name, label, placeholder]}
				<div class="hidden">
					<label for={name} class="text-lg font-bold text-black font-raleway block"> {label} </label>
					<input bind:value={inputMap[name]} id={name} type="text" autocomplete={name} {name} {placeholder} style="width:{INPUT_WIDTH};--input-color:{INPUT_COLOR}" class="input transition-all" />
				</div>
			{/each}
			<div class="hidden">
				<button on:click={submit} class="text-left text-lg md:text-xl bg-blk text-white px-2 py-0.5 rounded-sm hover:scale-105 hover:bg-darkBlu transition-all"> Submit </button>
			</div>
		</div>
	{:else}
		<button bind:this={registerButton} on:click={expandInput} class="text-left text-lg md:text-2xl bg-lightMaroon text-white px-2 py-1 rounded-md hover:scale-105 hover:bg-maroon transition-all">
			Register now!
		</button>
	{/if}
</div>

{#if email && !animating}
	<button
		on:click={expandForm}
		disabled={sending}
		transition:fade
		class="-mt-5 md:-mt-4 text-left text-base md:text-lg bg-blk text-white px-1 rounded-sm hover:scale-105 hover:bg-darkBlu transition-all mb-10"
	>
		Next
	</button>
{/if}

<style>
	.input::placeholder {
		color: var(--input-color);
	}

	.input {
		@apply text-lg md:text-2xl bg-lightMaroon text-white px-2 py-1 rounded-md focus:scale-105 focus:bg-maroon;
	}
</style>
