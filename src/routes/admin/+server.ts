import { response, type Action } from "$lib"
import { db } from "$lib/db.server.js"
import type { RequestHandler } from "./$types.js"

export const POST: RequestHandler = async ({ url }) => {
	const action = url.searchParams.get("action") as Action

	switch (action) {
		case "getAll":
			return response(undefined, await db.emails.findMany())
		default:
			return response("Invalid action")
	}
}
