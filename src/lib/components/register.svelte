<script lang="ts">
	import { glitch } from "$lib/glitch.js"
	import { onMount } from "svelte"
	import { fade } from "svelte/transition"

	export let parentDiv: HTMLDivElement
	export let formDiv: HTMLDivElement

	let showInput = false
	let registerButton: HTMLButtonElement
	let emailInput: HTMLInputElement
	let emailLabel: HTMLLabelElement
	let extrasParent: HTMLDivElement
	let error = ""
	let email = ""
	let mouseOverRegister = false

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

	$: console.log(INPUT_WIDTH)

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
		// if (sending) return
		// if (!email) {
		// 	changeError("Please enter an email")
		// 	return
		// }

		// if (!validate(email)) {
		// 	changeError("Please enter a valid email")
		// 	return
		// }

		// if (localStorage.getItem("emails")?.includes(email)) {
		// 	changeError("Email already registered")
		// 	return
		// }

		animating = true
		error = ""

		window.scrollTo({ top: 0 })

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
			if (i === 0) continue
			for (const inputElm of child.children as any as HTMLInputElement[]) {
				if (inputElm.tagName !== "INPUT") continue
				placeholders.push(inputElm.placeholder)
				inputElm.placeholder = email || "example@gmail.com"
			}
		}

		// Getting target info
		const parentRect = parentDiv.getBoundingClientRect()
		const parentCX = parentDiv.offsetLeft + parentRect.width / 2
		const parentY = parentDiv.offsetTop

		// Other anim
		let height = 0
		const MARGIN = 10
		containers.forEach((c, i) => {
			if (i !== 0) c.style.display = "block"
			if (i === 0) (c.children[0] as HTMLLabelElement).style.display = "block"

			const pos = c.getBoundingClientRect()
			if (!height) height = pos.height

			const cx = c.offsetLeft + pos.width / 2
			const diff = parentCX - cx

			const tx = pos.left + diff
			const ty = parentY + (height + MARGIN) * i

			const [input, label] = c.children as any as [HTMLInputElement, HTMLLabelElement]
			const ity = ty + label.getBoundingClientRect().height

			input.style.position = "absolute"
			label.style.position = "absolute"

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
			)
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
			if (i === 0) return
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
		<div bind:this={extrasParent}>
			<div>
				<label bind:this={emailLabel} for="email" class="text-lg font-bold text-black font-raleway hidden"> Email </label>
				<input
					bind:this={emailInput}
					bind:value={email}
					on:keypress={(e) => e.key === "Enter" && submit()}
					type="email"
					placeholder="example@gmail.com"
					id="email"
					name="email"
					style="width:{INPUT_WIDTH};--input-color:{INPUT_COLOR}"
					class="input"
				/>
			</div>
			{#each [["name", "Name", "John Doe"], ["school", "School", "Horace Mann School"]] as [name, label, placeholder]}
				<div class="hidden">
					<label for={name} class="text-lg font-bold text-black font-raleway block"> {label} </label>
					<input id={name} type="text" {name} {placeholder} style="width:{INPUT_WIDTH};--input-color:{INPUT_COLOR}" class="input transition-all" />
				</div>
			{/each}
		</div>
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
	.input::placeholder {
		color: var(--input-color);
	}

	.input {
		@apply text-lg md:text-2xl bg-lightMaroon text-white px-2 py-1 rounded-md focus:scale-105 focus:bg-maroon;
	}
</style>
