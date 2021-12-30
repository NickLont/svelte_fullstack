/// <reference types="@sveltejs/kit" />
// Global Typerscript types and interfaces

type Todo = {
    uid: string
    created_at: Date
    text: string
    done: boolean
}