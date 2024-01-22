<script lang="ts">
	import { ACTIONS, type Response } from "$lib"

	let output = ""
	let rawOutput: any = null
	const makeReq = async (action: string) => {
		const req = await fetch(`/admin?action=${action}`, {
			method: "POST",
		})
		const json = (await req.json()) as Response
		if (json.error) console.error(json.error)
		output = JSON.stringify(json.data, null, 2)
		rawOutput = json.data
	}

	const copy = () => {
		navigator.clipboard.writeText(output)
	}

	const store = () => {
		;(window as any).temp = rawOutput
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
		<span>Output</span> <button on:click={copy} class="font-normal bg-blk text-white px-1 rounded-md text-sm transition-all hover:scale-105 hover:bg-black">Copy</button>
		<button on:click={store} class="font-normal bg-blk text-white px-1 rounded-md text-sm transition-all hover:scale-105 hover:bg-black">Store as temp</button>
	</div>
	<div class="border-2 border-gray-400 rounded-md p-1 w-full font-plexMono text-sm whitespace-pre-wrap">
		{output}
	</div>
</div>
