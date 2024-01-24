<script lang="ts">
	import Divider from "$lib/components/divider.svelte"
	import Register from "$lib/components/register.svelte"
	import Subtitle from "$lib/components/subtitle.svelte"
	import Title from "$lib/components/title.svelte"
	import text from "$lib/text.json"
	import { MetaTags } from "svelte-meta-tags"

	let parentDiv: HTMLDivElement
	let formDiv: HTMLDivElement

	const schedule = text.schedule as Record<string, Record<string, string>>
</script>

<svelte:head>
	<meta content="#670A0A" data-react-helmet="true" name="theme-color" />
</svelte:head>

<MetaTags
	title="Hackmann 2024"
	description="HackMann is a virtual hackathon for middle and high school students hosted by the Horace Mann School over the weekend of Friday, April 5 to Sunday, April 7."
	canonical="https://www.hack-mann.com/"
	openGraph={{
		url: "https://www.hack-mann.com/",
		title: "Hackmann 2024",
		description: "HackMann is a virtual hackathon for middle and high school students hosted by the Horace Mann School over the weekend of Friday, April 5 to Sunday, April 7.",
		siteName: "Hackmann 2024",
	}}
/>

<div class="text-maroon font-plexMono text-[0] absolute top-0 left-0 w-full flex items-center justify-center pt-4 flex-col">
	<Title />
	<Subtitle />

	<div bind:this={formDiv} class="w-full md:text-lg lg:text-lg items-center justify-center flex flex-col gap-3"></div>

	<div bind:this={parentDiv} class="text-base text-blk md:text-lg lg:text-lg xl:text-xl px-4 md:px-14 lg:px-40 2xl:px-96 mt-4 lg:mt-8 font-raleway">
		<p class="mb-4 lg:mb-8">{@html text.body}</p>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2 lg:mb-4">
			{#each text.faq as [title, body]}
				<div class="border-2 border-gray-400 rounded-md p-2">
					<p class="font-bold text-lightMaroon text-lg lg:text-xl mb-1">{title}</p>
					<p class="text-sm lg:text-base">{@html body}</p>
				</div>
			{/each}
		</div>

		<Divider>Schedule</Divider>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2 lg:mb-4">
			{#each Object.keys(schedule) as day}
				<div>
					<p class="font-bold text-lightMaroon text-xl mb-2">{day}</p>

					<div class="space-y-1.5 text-base">
						{#each Object.keys(schedule[day]) as time}
							<div class="flex items-center">
								<div class="font-semibold w-1/3">{time}</div>
								<div class="w-2/3">
									<div>{schedule[day][time]}</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<Divider>Contact Us</Divider>

		<div class="flex flex-col justify-center items-center gap-0.5 mb-2">
			{#each text.emails as email}
				<a href="mailto:{email}">
					<img src="/mail.svg" alt="mail" class="inline w-5 h-5" />
					<span class="font-semibold text-lightMaroon text-xl">{email}</span>
				</a>
			{/each}
		</div>
	</div>

	<Register bind:parentDiv bind:formDiv />
	<a class="absolute bottom-0 right-0 p-1 md:p-2 opacity-60 flex items-center gap-1" target="_blank" href="https://github.com/jameslinimk/hackmann-website">
		<img src="/github-mark.svg" alt="Github logo" class="h-2.5 w-2.5 md:h-4 md:w-4 inline" />
		<span class="text-2xs md:text-sm font-raleway text-blk">Made by James Lin</span>
	</a>
</div>
