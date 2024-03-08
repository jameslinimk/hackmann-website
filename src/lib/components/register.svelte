<script lang="ts">
	import type { Response } from "$lib"
	import { glitch } from "$lib/glitch.js"
	import { reset } from "$lib/title.js"
	import { validate } from "email-validator"
	import { onMount } from "svelte"
	import { fade } from "svelte/transition"

	export let parentDiv: HTMLDivElement
	export let formDiv: HTMLDivElement

	let showInput = false
	let registerButton: HTMLButtonElement
	let emailInput: HTMLInputElement
	let extrasParent: HTMLDivElement
	let fullParent: HTMLDivElement
	let nextButton: HTMLButtonElement
	let error = ""
	let showThanks = false
	let email = ""
	let mouseOverRegister = false

	const inputs = [
		["name", "Name", "John Doe"],
		["school", "School", "Horace Mann School"],
	]
	const inputMap: Record<string, string> = {}

	const onInputChange = (event: Event, name: string) => {
		inputMap[name] = (event.target as HTMLInputElement).value.trim()
	}

	const animationConf: KeyframeAnimationOptions = {
		duration: 800,
		fill: "forwards",
		easing: "ease",
	}

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
		showThanks = false
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
		const json = (await res.json()) as Response

		sending = false

		if (json.error) {
			changeError(json.error)
			return
		}

		changeError("")
		showThanks = true
		localStorage.setItem("emails", `${localStorage.getItem("emails") ?? ""}${email},`)
	}

	let containers: HTMLDivElement[] = []
	let placeholders: string[] = []
	$: if (extrasParent && !containers.length && !placeholders.length) {
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
	}

	const MARGIN_TOP = 12
	const SUBMIT_MARGIN_TOP = 12
	const MARGIN = 12

	let emailParentRect: DOMRect
	let nextButtonRect: DOMRect
	let expanded = false
	const expandForm = () => {
		if (expanded || checkEmail()) return

		changeError("")
		expanded = true
		error = ""

		// Stuff
		window.scrollTo({ top: 0 })
		const focused = document.activeElement === emailInput
		if (focused) disableAnim()
		fullParent.style.pointerEvents = "none"

		// Getting target info
		emailParentRect = emailInput.parentElement!.getBoundingClientRect()
		nextButtonRect = nextButton.getBoundingClientRect()

		const parentRect = formDiv.getBoundingClientRect()
		const parentCX = formDiv.offsetLeft + parentRect.width / 2
		const parentY = formDiv.offsetTop + MARGIN_TOP

		// Other anim
		let height = 0
		containers.forEach((c, i) => {
			const [label, input] = c.children as any as [HTMLInputElement, HTMLLabelElement]
			const button = i === containers.length - 1

			const target = button ? nextButtonRect : emailParentRect

			if (i !== 0) {
				if (button) c.style.display = "flex"
				else c.style.display = "block"
			} else label.style.display = "block"

			const cRect = c.getBoundingClientRect()
			if (!height) height = cRect.height

			const cx = c.offsetLeft + cRect.width / 2
			const diff = parentCX - cx

			let tx = cRect.left + diff
			let itx = tx
			const ty = parentY + (height + MARGIN) * i + (button ? SUBMIT_MARGIN_TOP : 0)

			label.style.position = "absolute"
			input.style.position = "absolute"

			if (button) {
				const labelRect = label.getBoundingClientRect()
				input.style.width = `${labelRect.width}px`

				tx = cx - MARGIN / 2 - labelRect.width
				itx = cx + MARGIN / 2
			}

			if (i !== 0) {
				c.animate(
					[
						{
							opacity: 0,
						},
						{
							opacity: 1,
						},
					],
					animationConf
				)
			}

			const ity = button ? ty : ty + label.getBoundingClientRect().height
			input.animate(
				[
					{
						top: `${target.top}px`,
						left: `${target.left}px`,
					},
					{
						top: `${ity}px`,
						left: `${itx}px`,
					},
				],
				animationConf
			)

			label.animate(
				[
					{
						top: `${target.top}px`,
						left: `${target.left}px`,
					},
					{
						top: `${ty}px`,
						left: `${tx}px`,
					},
				],
				animationConf
			).onfinish = () => {
				label.style.position = "static"
				input.style.position = "static"

				if (button) {
					c.style.marginTop = `${SUBMIT_MARGIN_TOP}px`
				}

				formDiv.appendChild(c)
				formDiv.style.marginTop = `${MARGIN_TOP}px`

				if (focused && i === 0) {
					emailInput.focus()
					enableAnim()
				}
			}
		})

		// Fading out parent
		const parentAnim = parentDiv.animate([{ opacity: 1 }, { opacity: 0 }], animationConf)
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

	const collapseForm = () => {
		if (!expanded) return

		// Stuff
		fullParent.style.pointerEvents = "auto"

		// Fading in parent
		formDiv.style.marginTop = "0"
		parentDiv.style.display = "block"
		parentDiv.animate([{ opacity: 0 }, { opacity: 1 }], animationConf)

		containers.forEach((c, i) => {
			extrasParent.appendChild(c)
			const [label, input] = c.children as any as [HTMLInputElement, HTMLLabelElement]
			const button = i === containers.length - 1

			const target = button ? nextButtonRect : emailParentRect

			label.style.position = "absolute"
			input.style.position = "absolute"

			if (i !== 0) {
				c.animate(
					[
						{
							opacity: 1,
						},
						{
							opacity: 0,
						},
					],
					animationConf
				)
			}

			input.animate(
				[
					{
						top: `${input.offsetTop}px`,
						left: `${input.offsetLeft}px`,
					},
					{
						top: `${target.top}px`,
						left: `${target.left}px`,
					},
				],
				animationConf
			)
			label.animate(
				[
					{
						top: `${label.offsetTop}px`,
						left: `${label.offsetLeft}px`,
					},
					{
						top: `${target.top}px`,
						left: `${target.left}px`,
					},
				],
				animationConf
			).onfinish = () => {
				if (i !== 0) c.style.display = "none"
				else label.style.display = "none"

				label.style.position = "static"
				input.style.position = "static"

				expanded = false
			}
		})
	}

	reset.subscribe(() => {
		collapseForm()
	})
</script>

{#if error || showThanks}
	<div class="h-1" />
	<p class="text-xs -mb-7 md:text-sm md:-mb-6 transition-all text-center" transition:fade>
		{#if error}
			{error}
		{:else}
			Thanks for signing up!, an email will be sent out soon. Make sure to join our <a href="/discord" class="a">Discord server</a> to stay connected!
		{/if}
	</p>
{/if}

<div bind:this={fullParent} class="flex justify-center items-center w-full h-24">
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
					<input
						bind:value={inputMap[name]}
						on:change={(e) => onInputChange(e, name)}
						on:keypress={(e) => e.key === "Enter" && submit()}
						id={name}
						type="text"
						autocomplete={name}
						{name}
						{placeholder}
						style="width:{INPUT_WIDTH};--input-color:{INPUT_COLOR}"
						class="input transition-all"
					/>
				</div>
			{/each}
			<div class="hidden opacity-0 items-center justify-center" style="gap: {MARGIN}px;">
				<button on:click={submit} class="text-left text-lg md:text-xl bg-darkBlu text-white px-2 py-0.5 rounded-sm hover:scale-105 hover:bg-black transition-all"> Submit </button>
				<button on:click={collapseForm} class="text-lg md:text-xl bg-blk text-white text-center px-2 py-0.5 rounded-sm hover:scale-105 hover:bg-black transition-all"> Back </button>
			</div>
		</div>
	{:else}
		<button bind:this={registerButton} on:click={expandInput} class="text-left text-lg md:text-2xl bg-lightMaroon text-white px-2 py-1 rounded-md hover:scale-105 hover:bg-maroon transition-all">
			Register now!
		</button>
	{/if}
</div>

{#if email && !expanded}
	<button
		on:click={expandForm}
		disabled={sending}
		bind:this={nextButton}
		transition:fade
		class="-mt-5 md:-mt-4 text-center text-base md:text-lg bg-blk text-white px-1 rounded-sm hover:scale-105 hover:bg-darkBlu transition-all mb-10"
	>
		Next
	</button>
{/if}

<style lang="postcss">
	.input::placeholder {
		color: var(--input-color);
	}

	.input {
		@apply text-lg md:text-2xl bg-lightMaroon text-white px-2 py-1 rounded-md focus:scale-105 focus:bg-maroon;
	}
</style>
