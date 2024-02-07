<script lang="ts">
	export let title: string

	let content: HTMLParagraphElement
	let expanded = true

	const toggle = () => {
		expanded = !expanded

		if (content.style.maxHeight) {
			content.style.maxHeight = ""
		} else {
			content.style.maxHeight = `${content.scrollHeight}px`
		}
	}
</script>

<div class="border-2 border-gray-400 rounded-md p-2">
	<button class="flex items-center mb-1 w-full" on:click={toggle}>
		<img src="/back.svg" alt="Back button" class="h-5 w-5 inline mr-0.5 transition-all duration-300 back" class:toggle={expanded} />
		<span class="font-bold text-lightMaroon text-lg lg:text-xl">{title}</span>
	</button>

	<div class="text-base lg:text-lg overflow-hidden transition-all duration-300 max-h-0" bind:this={content}>
		<slot />
	</div>
</div>

<style>
	.back.toggle {
		transform: rotate(180deg);
	}
</style>
