import { db } from "$lib/db.server.js"
import { emails } from "$lib/text.json"
import { validate } from "email-validator"
import type { RequestHandler } from "./$types.js"

const response = (error?: string) =>
	new Response(
		JSON.stringify({
			error: error,
			success: !error,
			status: error ? 400 : 200,
		}),
		{
			headers: {
				"content-type": "application/json",
			},
		}
	)

export interface RegisterResponse {
	error?: string
	success: boolean
	status: number
}

export const POST: RequestHandler = async ({ url, getClientAddress }) => {
	const email = url.searchParams.get("email")
	if (!email) return response("No email provided")
	if (emails.includes(email)) return response("Nice try")
	if (!validate(email)) return response("Invalid email address")

	const name = url.searchParams.get("name")
	if (!name) return response("No name provided")

	const school = url.searchParams.get("school")
	if (!school) return response("No school provided")

	const already = await db.emails.findUnique({ where: { email } })
	if (already) return response("Email already registered")

	await db.emails.create({ data: { email, name, school, ip: getClientAddress() } })
	return response()
}
