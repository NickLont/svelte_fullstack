// Endpoint /todos.json
import type { RequestHandler } from '@sveltejs/kit'

// TODO: persist in database
const todos: Todo[] = []

export const get: RequestHandler = () => ({
    status: 200,
    body: todos
})

export const post: RequestHandler<unknown, FormData> = (request) => {
    todos.push({
        created_at: new Date(),
        text: request.body.get('text'),
        done: false
    })
    return {
        // Form submit redirect code
        status: 303,
        headers: {
            location: '/'
        }
    }
}