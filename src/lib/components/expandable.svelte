<script lang="ts">
	export let title: string

	let content: HTMLParagraphElement
	let expandButton: HTMLButtonElement
</script>

<div class="border-2 border-gray-400 rounded-md p-2">
	<p class="font-bold text-lightMaroon text-lg lg:text-xl mb-1">{title}</p>
	<p class="text-base lg:text-lg" bind:this={content}>
		<slot />
	</p>
</div>
