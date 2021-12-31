// Interceptors for requests
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ request, resolve }) => {
	if (request.query.get('_method')) {
		if (request.query.get('_method').toLowerCase() === 'delete') {
			request.method = 'DELETE'
		}
		if (request.query.get('_method').toLowerCase() === 'patch') {
			request.method = 'PATCH'
		}
	}
	const response = await resolve(request)
	return response
}
