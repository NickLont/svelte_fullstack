export const enhanceForm = (form: HTMLFormElement, { result }) => {
	const handleSubmit = async (e: Event) => {
		e.preventDefault()

		try {
			const body = new FormData(form)
			if (form.action.includes('method=delete')) {
				result()
				return
			}
			const res = await fetch(form.action, {
				method: form.method,
				body,
				headers: {
					accept: 'application/json'
				}
			})
			if (res.ok) {
				result(res, form)
			} else {
				console.log('Fetch error: ', await res.text())
			}
		} catch (error) {
			console.log('Error: ', error)
		}
	}
	form.addEventListener('submit', handleSubmit)
	// Destroy gets triggered when the component is Unmounted from the DOM
	return {
		destroy() {
			form.removeEventListener('submit', handleSubmit)
		}
	}
}
