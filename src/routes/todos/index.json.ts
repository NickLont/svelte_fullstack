// Endpoint /todos.json
import type { RequestHandler } from '@sveltejs/kit'
import { api } from './_api'

export const get: RequestHandler = (request) => {
	return api(request)
}

export const post: RequestHandler<unknown, FormData> = (request) => {
	const todo = {
		uid: `${Date.now()}`, // TODO replace with the db UID
		created_at: new Date(),
		text: request.body.get('text'),
		done: false
	}
	return api(request, todo)
}
