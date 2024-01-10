<script lang="ts">
	import Subtitle from "$lib/components/subtitle.svelte"
	import Title from "$lib/components/title.svelte"
</script>

<div class="text-maroon font-plexMono text-[0] absolute top-0 left-0 w-full flex items-center justify-center pt-4 flex-col">
	<Title />
	<Subtitle />

	<p class="text-base text-black md:text-lg lg:text-xl px-4 text-center mt-4 md:mt-8 font-raleway">
		HackMANN is a hackathon for high school students that will be hosted at the Horace Mann School in Riverdale, Bronx. On the weekend of June 3-4, 2017, teams of 1-4 students are invited to come to
		Horace Mann School and spend 24 hours making a hardware, software, or electrical project. Professional mentors will be available to assist students in their creations. At the end, each team will
		give a short presentation of its project, and the judges will decide the winners!
	</p>
	<button class="mt-4 text-2xl bg-lightMaroon text-white px-2 py-1 rounded-md">Register now!</button>
</div>
