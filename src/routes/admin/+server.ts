import { response, type Action } from "$lib"
import { db } from "$lib/db.server.js"
import type { RequestHandler } from "./$types.js"

const uniqueString = <T>(arr: T[], index: keyof T) => {
	const unique = new Set()
	let str = ""
	arr.forEach((e) => {
		if (!unique.has(e[index])) {
			unique.add(e[index])
			str += e[index] + ", "
		}
	})
	if (str.endsWith(", ")) str = str.slice(0, -1)
	return str
}

const getList = (index: string) => async () => {
	const list = await db.emails.findMany({ select: { [index]: true } })
	return response(undefined, uniqueString(list, index))
}

export const POST: RequestHandler = async ({ url }) => {
	const action = url.searchParams.get("action") as Action

	switch (action) {
		case "getAll":
			return response(undefined, await db.emails.findMany())
		case "getEmailList":
			return getList("email")()
		case "getSchoolList":
			return getList("school")()
		default:
			return response("Invalid action")
	}
}
