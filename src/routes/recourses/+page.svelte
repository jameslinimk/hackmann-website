<script>
	import Expandable from "$lib/components/expandable.svelte"
</script>

<div class="text-lg text-blk lg:text-xl px-6 md:px-14 lg:px-40 2xl:px-96 mt-4 lg:mt-8 font-raleway">
	<p class="mb-4 lg:mb-8">
		Learning to code can be a daunting task, but it doesn't have to be! We've compiled a list of resources to help you get started. Whether you're a beginner or an experienced coder, we have something
		for you.
	</p>

	<div class="grid grid-cols-1 gap-4 mb-2 lg:mb-4">
		<Expandable title="Web Development">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
		</Expandable>
		<Expandable title="App Development">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
		</Expandable>
		<Expandable title="Using API's">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
		</Expandable>
	</div>
</div>
