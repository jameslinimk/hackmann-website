<script lang="ts">
	import { SHOW_RECOURSES } from "$lib"
	import Divider from "$lib/components/divider.svelte"
	import Faq from "$lib/components/faq.svelte"
	import Register from "$lib/components/register.svelte"
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

<div bind:this={formDiv} class="w-full md:text-lg lg:text-lg items-center justify-center flex flex-col gap-3"></div>

<div bind:this={parentDiv} class="text-lg text-blk lg:text-xl px-6 md:px-14 lg:px-40 2xl:px-96 mt-4 lg:mt-8 font-raleway">
	<p class="mb-4 lg:mb-8">
		<strong>HackMann</strong> is a virtual hackathon hosted by Horace Mann School Programming Club. Over the course of <strong>Friday, April 5 to Sunday, April 7</strong>, teams of
		<strong class="font-semibold text-blk">up to two</strong> in both the beginner and intermediate-advanced competitions will compete to build a working proof of concept technology that solves an issue
		for the betterment of humanity. Mentors will be available to assist students in developing their applications, and workshops will be held throughout the weekend to help you learn new skills and get
		started on your project. At the end, each team will give a presentation of its project, and the judges will decide the winners. If you're with your friends, great! But, if you're coming solo, we'll
		have time at the beginning of the event to form new teams. Register below to add your email to our mailing list and receive updates about the event. We hope to see you there!
	</p>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2 lg:mb-4">
		<Faq title="Theme">
			<p>
				This year, we've chosen to focus on the theme of <strong>health</strong>! From the COVID-19 pandemic to cancer, our health is always under constant threat. It is our responsibility as software
				engineers and innovators to combat these issues. We welcome projects of all sorts of complexity, from tracking sleep, to using machine learning for early detection of disease.
			</p>
		</Faq>
		<Faq title="Prizes & Price">
			<p class="mb-1">The awards will be given out based on creativity, usefulness, technical prowess, and concept. The prizes given are as follows:</p>
			<div>
				<img src="/first.svg" alt="Trophy" class="inline" />
				<span>Advanced Division (x2 per team)</span>
				<div class="mb-2">
					<div class="list-disc list-image-none relative left-8 top-1">
						<div class="mb-0.5">
							<span class="-left-2 relative"> <strong class="font-semibold text-blk">1st:</strong> iPad Air </span>
						</div>
						<div class="mb-0.5">
							<span class="-left-2 relative"> <strong class="font-semibold text-blk">2nd:</strong> AirPod Pro (2nd gen) </span>
						</div>
						<div>
							<span class="-left-2 relative"> <strong class="font-semibold text-blk">3rd:</strong> 50$ Amazon gift card </span>
						</div>
					</div>
				</div>
				<div>
					<img src="/first.svg" alt="Trophy" class="inline" />
					<span>Beginner Division (x2 per team)</span>
					<div class="list-disc list-image-none relative left-8 top-1">
						<div class="mb-0.5">
							<span class="-left-2 relative"> <strong class="font-semibold text-blk">1st:</strong> 25$ Amazon gift card </span>
						</div>
					</div>
				</div>
			</div>
		</Faq>
		<Faq title="What if I don't know how to code?">
			<p>
				No problem! We'll have workshops and mentors to help you get started, and beginner teams will be judged separately from advanced teams. We encourage you to learn something new and have fun!
				Hackathons are a great way to learn to code and learn how to design a project from start to finish.

				{#if SHOW_RECOURSES}
					If you're a beginner, we recommend you to look at our
					<a href="/recourses" class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">recourses page</a> to get an idea of what you can learn before the Hackathon.
				{/if}
			</p>
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
