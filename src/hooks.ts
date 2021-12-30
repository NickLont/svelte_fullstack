// Interceptors for requests
import type {Handle} from '@sveltejs/kit'

export const handle: Handle = async ({request, resolve}) => {
    if (request.query.get('_method') && request.query.get('_method').toLowerCase() === 'delete') {
        request.method = 'DELETE'
    }
    const response = await resolve(request)
    return response
}