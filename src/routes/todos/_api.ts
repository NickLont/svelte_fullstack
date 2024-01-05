// files with _ in routes are automatically ignored in svelte
import type { Request } from '@sveltejs/kit'
import PrismaClient from '$lib/prisma'

const prisma = new PrismaClient()

export const api = async (request: Request, data?: Record<string, unknown>): Promise<{
	status: number,
	body?: Todo[],
	headers?: Record<'location', '/'>
}> => {
	let body = []
	let status = 500
	switch (request.method.toUpperCase()) {
		case 'GET':
			body = await prisma.todo.findMany()
			status = 200
			break
		case 'POST':
			await prisma.todo.create({
				data: {
					created_at: data.created_at as Date,
					done: data.done as boolean,
					text: data.text as string
				}
			})
			status = 201
			break
		case 'DELETE':
			
			await prisma.todo.delete({
				where: {
					uid: request.params.uid
				}
			})
			break
		case 'PATCH':
			status = 200
			await prisma.todo.update({
				where: {
					uid: request.params.uid
				},
				data: {
					done: data.done,
					text: data.text
				}
			})
			break

		default:
			break
	}
	if (request.method.toUpperCase() !== 'GET' && request.headers.accept !== 'application/json') {
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
