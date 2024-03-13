<script>
	import Subtitle from "$lib/components/subtitle.svelte"
	import Title from "$lib/components/title.svelte"
	import "../app.css"
</script>

<div class="text-maroon font-plexMono text-[0] absolute top-0 left-0 w-full flex items-center justify-center pt-4 flex-col">
	<Title />
	<Subtitle />
	<div class="flex mt-3 gap-1">
		<a href="https://github.com/jameslinimk/hackmann-website" target="_blank">
			<img src="/github-mark.svg" alt="Github" class="h-5 hover:scale-110 hover:opacity-100 opacity-85 transition-all" />
		</a>
		<a href="/discord" target="_blank">
			<img src="/discord.svg" alt="Github" class="h-7 -mt-1 hover:scale-110 hover:opacity-100 opacity-85 transition-all" />
		</a>
	</div>
	<slot />
</div>
