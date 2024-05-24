import { defaultTodoMap, TodoMap, TODOS_KEY } from "./types";
import { signal } from "@preact/signals-react";

const getInitialTodos = (): TodoMap => {
  const localStorageTodosString = localStorage.getItem(TODOS_KEY);
  const parsed: TodoMap = localStorageTodosString
    ? JSON.parse(localStorageTodosString)
    : defaultTodoMap;

  return {
    ...parsed,
    items: parsed.items.map((item) => ({
      ...item,
      created: new Date(item.created),
      updated: new Date(item.updated),
    })),
  };
};

export const todoItems = signal<TodoMap>(getInitialTodos());

export const errorMessage = signal<string | null>(null);
