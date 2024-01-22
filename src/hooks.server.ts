import { PASSWORD } from "$env/static/private"
import type { Handle } from "@sveltejs/kit"

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith("/admin")) {
		const auth = event.request.headers.get("Authorization")

		if (auth !== `Basic ${btoa(PASSWORD)}`) {
			return new Response("Not authorized", {
				status: 401,
				headers: {
					"WWW-Authenticate": 'Basic realm="User Visible Realm", charset="UTF-8"',
				},
			})
		}
	}

	return resolve(event)
}
