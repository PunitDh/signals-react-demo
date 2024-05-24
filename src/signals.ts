import { defaultTodoMap, TodoMap } from "./types";
import { signal } from "@preact/signals-react";

export const todoItems = signal<TodoMap>(
  JSON.parse(localStorage.getItem("todos") ?? JSON.stringify(defaultTodoMap))
);

export const errorMessage = signal<string | null>(null);
