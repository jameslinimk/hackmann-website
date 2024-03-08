import { response } from "$lib"
import { db } from "$lib/db.server.js"
import { emails } from "$lib/text.json"
import { validate } from "email-validator"
import { appendFile } from "fs/promises"
import type { RequestHandler } from "./$types.js"

export const POST: RequestHandler = async ({ url }) => {
	const email = url.searchParams.get("email")?.trim()?.toLowerCase()

	if (!email) return response("No email provided")
	if (emails.includes(email) || email === "example@gmail.com") return response("Nice try")
	if (!validate(email)) return response("Invalid email address")

	const name = url.searchParams.get("name")?.trim()
	if (!name) return response("No name provided")

	const school = url.searchParams.get("school")?.trim()
	if (!school) return response("No school provided")

	const already = await db.emails.findUnique({ where: { email } })
	if (already) return response("Email already registered")

	await db.emails.create({ data: { email, name, school } })

	console.log(`Registered ${email} from ${school} as ${name}`)
	await appendFile("prisma/log.txt", `${email} from ${school} as ${name}\n`)

	return response()
}
