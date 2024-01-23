<script lang="ts">
	import { ACTIONS, type Response } from "$lib"
	import copy from "copy-to-clipboard"
	import { fade } from "svelte/transition"

	let output = null as any
	const classify = (output: string) => {
		if (output === null) return ""
		if (typeof output == "object" || typeof output == "function") return JSON.stringify(output, null, 2)

		return output
	}
	let cls = ""
	$: cls = classify(output)

	let info = ""
	const updateInfo = (text: string) => {
		info = text
		setTimeout(() => {
			if (info === text) info = ""
		}, 1500)
	}

	const makeReq = async (action: string) => {
		const req = await fetch(`/admin?action=${action}`, {
			method: "POST",
		})
		const json = (await req.json()) as Response

		if (json.error) {
			console.error(json.error)
			updateInfo("Error, check console")
		}

		output = json.data
	}

	const copyOutput = () => {
		if (output === null) {
			updateInfo("Nothing to copy")
			return
		}

		copy(cls, {
			format: "text/plain",
			onCopy: () => updateInfo("Copied to clipboard"),
		})
	}

	const store = () => {
		if (output === null) {
			updateInfo("Nothing to store")
			return
		}

		;(window as any).temp = output
		updateInfo("Stored as temp in console")
	}
</script>

<h1 class="font-raleway text-4xl font-bold text-center my-3">Actions:</h1>
<div class="flex gap-2 justify-center items-center">
	{#each ACTIONS as action}
		<button class="bg-lightMaroon text-white font-raleway rounded-md px-2 py-1 text-3xl transition-all hover:scale-105 hover:bg-maroon" on:click={() => makeReq(action)}>{action}</button>
	{/each}
</div>

<div class="p-5">
	<div class="font-raleway font-bold text-xl mb-1 flex items-center gap-1">
		<span>Output</span>
		<button on:click={copyOutput} class="font-normal bg-blk text-white px-1 rounded-md text-sm transition-all hover:scale-105 hover:bg-black">Copy</button>
		<button on:click={store} class="font-normal bg-blk text-white px-1 rounded-md text-sm transition-all hover:scale-105 hover:bg-black">Store as temp</button>

		{#if info}
			<span class="text-lightMaroon font-normal" transition:fade>{info}</span>
		{/if}
	</div>
	<div class="border-2 border-gray-400 rounded-md p-1 w-full font-plexMono text-sm whitespace-pre-wrap">
		{cls}
	</div>
</div>
