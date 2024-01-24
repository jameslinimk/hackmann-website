export const EMAIL_REGEX =
	// eslint-disable-next-line no-control-regex
	/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

export interface Response {
	error?: string
	success: boolean
	status: number
	data?: string
}

export const response = (error?: string, data?: unknown) =>
	new Response(
		JSON.stringify({
			error,
			data,
			success: !error,
			status: error ? 400 : 200,
		}),
		{
			headers: {
				"content-type": "application/json",
			},
		}
	)

export const ACTIONS = ["getAll", "getEmailList", "getSchoolList"] as const
export type Action = (typeof ACTIONS)[number]
