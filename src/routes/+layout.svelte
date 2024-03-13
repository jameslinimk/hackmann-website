<script>
	import Subtitle from "$lib/components/subtitle.svelte"
	import Title from "$lib/components/title.svelte"
	import "../app.css"
</script>

<div class="text-maroon font-plexMono text-[0] absolute top-0 left-0 w-full flex items-center justify-center pt-4 flex-col">
	<Title />
	<Subtitle />
	<slot />
</div>

<a class="fixed right-0 bottom-0 p-1 md:p-2 opacity-60 flex items-center gap-1" target="_blank" href="https://github.com/jameslinimk/hackmann-website">
	<img src="/github-mark.svg" alt="Github logo" class="h-4 w-4 lg:h-5 lg:w-5 inline" />
</a>
