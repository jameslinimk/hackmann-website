<script lang="ts">
	import Divider from "$lib/components/divider.svelte"
	import Register from "$lib/components/register.svelte"
	import Subtitle from "$lib/components/subtitle.svelte"
	import Title from "$lib/components/title.svelte"
	import text from "$lib/text.json"

	let parentDiv: HTMLDivElement
	let formDiv: HTMLDivElement

	const schedule = text.schedule as Record<string, Record<string, string>>
</script>

<div class="text-maroon font-plexMono text-[0] absolute top-0 left-0 w-full flex items-center justify-center pt-4 flex-col">
	<Title />
	<Subtitle />

	<div bind:this={formDiv} class="w-full md:text-lg lg:text-lg items-center justify-center flex flex-col gap-3"></div>

	<div bind:this={parentDiv} class="text-sm text-blk md:text-lg lg:text-lg xl:text-xl px-10 md:px-14 lg:px-40 2xl:px-96 mt-4 lg:mt-8 font-raleway">
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
								<div class="font-semibold w-1/4">{time}</div>
								<div class="w-3/4">
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

<style>
	:global(strong) {
		@apply text-lightMaroon;
	}

	:global(ul) {
		@apply mt-3;
	}

	:global(li) {
		@apply list-disc list-inside pl-2;
	}
</style>
