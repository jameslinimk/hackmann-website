<script lang="ts">
	import { ACTIONS, type Response } from "$lib"

	const makeReq = async (action: string) => {
		const req = await fetch(`/admin?action=${action}`, {
			method: "POST",
		})
		const json = (await req.json()) as Response
		if (json.error) console.error(json.error)
		console.log(json.data)
	}
</script>

<p>Check console for outputs</p>

{#each ACTIONS as action}
	<button class="bg-lightMaroon text-white font-raleway rounded-md px-2 py-1 text-3xl" on:click={() => makeReq(action)}>{action}</button>
{/each}
