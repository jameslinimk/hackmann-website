<script lang="ts">
	import Register from "$lib/components/register.svelte"
	import Subtitle from "$lib/components/subtitle.svelte"
	import Title from "$lib/components/title.svelte"
	import text from "$lib/text.json"

	let parentDiv: HTMLDivElement
	let formDiv: HTMLDivElement
</script>

<div class="text-maroon font-plexMono text-[0] absolute top-0 left-0 w-full flex items-center justify-center pt-4 flex-col">
	<Title />
	<Subtitle />

	<div bind:this={formDiv} class="w-full md:text-lg lg:text-lg items-center justify-center flex flex-col"></div>

	<div bind:this={parentDiv} class="text-sm text-black md:text-lg lg:text-lg px-10 md:px-14 lg:px-40 2xl:px-72 mt-4 lg:mt-8 font-raleway">
		<p class="mb-4">{@html text.body}</p>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			{#each text.faq as [title, body]}
				<div class="border-2 border-gray-400 rounded-md p-2">
					<p class="font-bold text-lightMaroon text-lg">{title}</p>
					<p class="text-sm">{body}</p>
				</div>
			{/each}
		</div>
	</div>

	<Register bind:parentDiv bind:formDiv />
</div>

<style>
	:global(strong) {
		@apply text-lightMaroon;
	}
</style>
