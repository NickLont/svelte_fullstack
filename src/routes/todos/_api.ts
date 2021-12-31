// files with _ in routes are automatically ignored in svelte
import type { Request } from '@sveltejs/kit'

// TODO: persist in database
let todos: Todo[] = []

export const api = (request: Request, data?: Record<string, unknown>) => {
	let body = {}
	let status = 500
	console.log('data: ', data)

	switch (request.method.toUpperCase()) {
		case 'GET':
			body = todos
			status = 200
			break
		case 'POST':
			todos.push(data as Todo)
			body = data
			status = 201
			break
		case 'DELETE':
			todos = todos.filter((todo) => todo.uid !== request.params.uid)
			break
		case 'PATCH':
			todos = todos.map((todo) => {
				if (todo.uid === request.params.uid) {
					if (data.text) {
						todo.text = data.text as string
					}
					todo.done = data.done as boolean
				}
				return todo
			})
			status = 200
			break

		default:
			break
	}
	if (request.method.toUpperCase() !== 'GET') {
		return {
			status: 303,
			headers: {
				location: '/'
			}
		}
	}
	return {
		status,
		body
	}
}
