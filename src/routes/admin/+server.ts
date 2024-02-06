import { response, type Action } from "$lib"
import { db } from "$lib/db.server.js"
import type { RequestHandler } from "./$types.js"

const uniqueString = <T>(arr: T[], index: keyof T) => {
	const unique = new Set()
	let str = ""
	arr.forEach((e) => {
		if (!unique.has(e[index])) {
			unique.add(e[index])
			str += e[index] + ","
		}
	})
	if (str.endsWith(",")) str = str.slice(0, -1)
	return str
}

export const POST: RequestHandler = async ({ url }) => {
	const action = url.searchParams.get("action") as Action

	switch (action) {
		case "getAll":
			return response(undefined, await db.emails.findMany())
		case "getEmailList": {
			const emails = await db.emails.findMany({ select: { email: true } })
			return response(undefined, uniqueString(emails, "email"))
		}
		case "getSchoolList": {
			const schools = await db.emails.findMany({ select: { school: true } })
			return response(undefined, uniqueString(schools, "school"))
		}
		default:
			return response("Invalid action")
	}
}
