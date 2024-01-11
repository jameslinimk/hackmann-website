interface GlitchConfig {
	glitchSpeed: number
	oldToGlitchSpeed: number
	correctSpeed: number
	addSpeed: number
}

export const randFill = (length: number) => {
	return Array(length)
		.fill(0)
		.reduce((acc) => acc + Math.random().toString(36)[2], "")
}

export const glitch = (text: string, target: string, conf: GlitchConfig, onTextUpdate: (text: string) => unknown, onEnd?: () => unknown) => {
	let lastGlitch = performance.now()
	let lastAdd = lastGlitch
	let lastCorrect = lastGlitch
	let lastOldToGlitch = lastGlitch

	let glitch = ""
	let progress = ""
	let oldText = text

	const animate = () => {
		const now = performance.now()

		if (now - lastOldToGlitch > conf.oldToGlitchSpeed && oldText.length > 0) {
			oldText = oldText.slice(0, oldText.length - 1)
			if (glitch.length < target.length - progress.length) glitch = glitch + randFill(1)
			lastOldToGlitch = now
		}

		if (now - lastGlitch > conf.glitchSpeed) {
			glitch = randFill(glitch.length)
			lastGlitch = now
		}

		if (now - lastAdd > conf.addSpeed && glitch.length + progress.length + oldText.length < target.length) {
			glitch = glitch + randFill(1)
			lastAdd = now
		}

		if (now - lastCorrect > conf.correctSpeed && glitch.length > 0) {
			glitch = glitch.slice(0, glitch.length - 1)
			progress = progress + target[progress.length]
			lastCorrect = now
		}

		if (progress === target) {
			onTextUpdate(progress)
			if (onEnd) onEnd()
			return
		}

		onTextUpdate(oldText + progress + glitch)
		requestAnimationFrame(animate)
	}
	requestAnimationFrame(animate)
}
