import { getInitialTodos } from "./TodoList/actions";
import { Todo, TodoMap } from "./types";
import { signal } from "@preact/signals-react";

export const todoItems = signal<TodoMap>(getInitialTodos());

export const errorMessage = signal<string | null>(null);

export const currentEditing = signal<Todo | null>(null);
