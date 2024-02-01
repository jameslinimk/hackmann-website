import { writable } from "svelte/store"

export const reset = writable(false)
export const progress = writable(0)
