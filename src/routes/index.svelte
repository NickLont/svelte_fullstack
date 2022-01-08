<!-- When the component get rendered, context="module" runs ONCE, before the component is rendered () -->
<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit'
	import { enhanceForm } from '$lib/actions/form'
	// ssr needs a load function
	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/todos.json')
		if (res.ok) {
			const todos = await res.json()
			return {
				props: {
					todos
				}
			}
		}
		const { message } = await res.json()
		return {
			error: new Error(message)
		}
	}
</script>

<script lang="ts">
	import TodoItem from '$lib/todo-item.svelte'

	export let todos: Todo[] // this is how we specify component props

	const title = 'Todo'

	const processNewTodoResult = async (res: Response, form: HTMLFormElement) => {
		const newTodo = await res.json()
		todos = [...todos, newTodo]
		form.reset()
	}
	const processDeletedTodoResult = (todoId) => {
		todos = todos.filter(t => t.uid !== todoId)
	}
	const processUpdatedTodoResult = async (res: Response) => {
		const updatedTodo = await res.json()
		todos = todos.map(t => {
			if (t.uid === updatedTodo.uid) return updatedTodo
			return t
		})
	}
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="todos">
	<h1>{title}</h1>
	<!-- The use action get triggered when the element gets added to the DOM -->
	<form action="/todos.json" method="POST" class="new" use:enhanceForm={{
		result: processNewTodoResult
	}}>
		<input type="text" name="text" aria-label="add to do" placeholder="+type to add a todo" />
	</form>
	{#each todos as todo}
		<TodoItem 
			todo={todo} 
			processDeletedTodoResult={() => processDeletedTodoResult(todo.uid)}
			processUpdatedTodoResult={processUpdatedTodoResult}
		/>
	{/each}
</div>

<style>
	.todos {
		width: 100%;
		max-width: 42rem;
		margin: 4rem auto 0 auto;
	}
	.new {
		margin-bottom: 0.5rem;
	}
	.new input {
		font-size: 28px;
		width: 100%;
		padding: 0.5em 1em 0.3em 1em;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 8px;
		text-align: center;
	}
	/* globally select all inputs inside the .todos class */
	.todos :global(input) {
		border: 1px solid transparent;
	}
	.todos :global(input:focus-visible) {
		box-shadow: inset 1px 1px 6px rgba(255, 255, 255, 0.1);
		border: 1px solid #ff3e00 !important;
		outline: none;
	}
</style>
