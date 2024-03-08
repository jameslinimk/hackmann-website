import { SHOW_RECOURSES } from "$lib"
import { redirect } from "@sveltejs/kit"

export const load = () => {
	if (!SHOW_RECOURSES) redirect(302, "/")
}
