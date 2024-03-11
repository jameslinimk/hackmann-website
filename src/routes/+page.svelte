<script lang="ts">
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
		<strong>HackMann</strong> is a virtual hackathon hosted by the Horace Mann School Programming Club. Over the course of <strong>Friday, April 5 to Sunday, April 7</strong>, teams of up to two in
		both the beginner and intermediate-advanced competitions will
		<strong class="font-semibold text-blk">compete to build a working proof of concept technology that solves an issue based on a given theme</strong> (given during the opening ceremony). Mentors will
		be available to assist students in developing their applications, and workshops will be held throughout the weekend to help you learn new skills and get started on your project. At the end, each
		team will present their project, and the judges will decide the winners. If you're with your friends, great! But if you're coming solo, we'll have time at the beginning of the event to form new
		teams. Please register below to add your email to our list and
		<strong class="font-semibold text-blk"
			>join our
			<a href="/discord" class="a">Discord server</a></strong
		> to receive updates about Hackmann. We hope to see you there!
	</p>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2 lg:mb-4">
		<Faq title="Who can join?">
			<p>
				We encourage <strong class="font-semibold text-blk">any middle or high school student</strong> to participate in Hackmann. We are open to all skills and skill levels and will have workshops and
				mentors to help you get started. We will have a beginner division for those new to coding and an advanced division for those with experience.
			</p>
		</Faq>
		<Faq title="What are the prizes?">
			<p class="mb-1">The awards will be based on creativity, usefulness, technical prowess, and concept. The prizes given are as follows:</p>
			<div>
				<img src="/first.svg" alt="Trophy" class="inline select-none" />
				Advanced Division (x2 per team)
				<div class="ml-5 mt-1 mb-2">
					<div>
						<img src="/circle.svg" alt="-" class="inline mr-1" />
						<strong class="font-semibold text-blk">1st:</strong> iPad Air
					</div>
					<div>
						<img src="/circle.svg" alt="-" class="inline mr-1" />
						<strong class="font-semibold text-blk">2nd:</strong> AirPod Pro (2nd gen)
					</div>
					<div>
						<img src="/circle.svg" alt="-" class="inline mr-1" />
						<strong class="font-semibold text-blk">3rd:</strong> 50$ Amazon gift card
					</div>
				</div>
				<div>
					<img src="/first.svg" alt="Trophy" class="inline select-none" />
					Beginner Division (x2 per team)
					<div class="ml-5 mt-1">
						<div>
							<img src="/circle.svg" alt="-" class="inline mr-1" />
							<strong class="font-semibold text-blk">1st:</strong> 25$ Amazon gift card
						</div>
					</div>
				</div>
			</div>
		</Faq>
		<Faq title="What if I don't know how to code?">
			<p>
				No problem! We'll have workshops and mentors to help you get started, and beginner teams will be judged separately from advanced teams. We encourage you to learn something new and have fun!
				Hackathons are a great way to learn to code and design a project from start to finish. Remember, judges will look at more than code quality, so don't be afraid to join!
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

	<p class="text-center text-sm lg:text-base -mt-3 mb-2 lg:px-6">
		If you have any questions, feel free to reach out to us at any of the following emails or on our
		<a href="/discord" class="a">Discord server</a> as admins.
	</p>

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
