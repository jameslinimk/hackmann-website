<script lang="ts">
	import Divider from "$lib/components/divider.svelte"
	import Faq from "$lib/components/faq.svelte"
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

	<div bind:this={parentDiv} class="text-lg text-blk lg:text-xl px-6 md:px-14 lg:px-40 2xl:px-96 mt-4 lg:mt-8 font-raleway">
		<p class="mb-4 lg:mb-8">
			<strong>HackMann</strong> is a hackathon for middle and high school students hosted by Horace Mann School. This year, it will be hosted ~virtually~ over the weekend of
			<strong>Friday, April 5 to Sunday, April 7</strong>. Teams up to 4 students are invited to participate and spend some time creating a programming project. Mentors on the HackMann discord will be
			available around the clock to assist students in creating applications. At the end, each team will give a short presentation of its project, and the judges will decide the winners. If you are
			coming with friends--great! But don't start the fun too early--hacking can only begin at the competition to make sure the playing field is level. If you're coming solo, that's great too! We will
			have time at the beginning of the event to form new teams.
		</p>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2 lg:mb-4">
			<Faq title="Theme">
				This year, we encourage projects to follow the theme of <strong>HEALTH AND ACCESSIBILITY</strong>. We hope to see projects that leverage technology to improve healthcare and well-being for
				all. We welcome projects of all sorts of complexity, whether that is tracking sleep schedule, using machine machine for disease early detection, or creating a platform to gather volunteers for
				health-related community service, the possibilities are endless. <i>If you believe you can make a better project not following this theme, you are welcomed to.</i></Faq
			>
			<Faq title="Prizes & Price">
				The awards are given out based on creativity, usefulness, and technical prowess. Each member of a winning team will receive the prize. The prizes are as followed:
				<div class="flex items-center ml-2 gap-2 mt-2">
					<img src="/first.svg" alt="First place trophy" class="w-6 h-6" />
					Top 3 Advanced Teams: <strong class="font-semibold text-black">$150 each</strong>
				</div>
				<div class="flex items-center ml-2 gap-2 mb-2">
					<img src="/first.svg" alt="First place trophy" class="w-6 h-6" />
					Top 2 Beginner Teams: <strong class="font-semibold text-black">$75 each</strong>
				</div>

				<i class="text-sm"
					>To attend, you must pay <strong class="font-semibold text-black">$5 per person</strong>. Schools can either choose to send one check or have each student send a check addressed to HM. More
					details will be sent out soon.</i
				>
			</Faq>
			<Faq title="What if I don't know how to code?">
				HackMann is a hackathon that is meant for any skill level. Whether you are coming in with all of Knuth's repertoire memorized or with only a basic understanding of what programming is, this
				hackathon is perfect for you. There will also be plenty of workshops throughout the day on lots of topics, from a 'make you first website' class to a class on algorithmic analysis to a class
				on machine learning.
			</Faq>
		</div>

		<Divider>Schedule</Divider>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2 lg:mb-4">
			{#each Object.keys(schedule) as day}
				<div>
					<p class="font-bold text-lightMaroon text-xl mb-2">{day}</p>

					<div class="space-y-1.5 text-base">
						{#each Object.keys(schedule[day]) as time}
							<div class="flex items-center gap-2">
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
</div>

<a class="fixed right-0 bottom-0 p-1 md:p-2 opacity-60 flex items-center gap-1" target="_blank" href="https://github.com/jameslinimk/hackmann-website">
	<img src="/github-mark.svg" alt="Github logo" class="h-4 w-4 lg:h-5 lg:w-5 inline" />
</a>
