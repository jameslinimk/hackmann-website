import { redirect } from "@sveltejs/kit"

const DISCORD_LINK = "https://discord.gg/7AsWAFcBAu"
export const load = () => {
	redirect(301, DISCORD_LINK)
}
