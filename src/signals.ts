import { TodoMap } from "./types";
import { signal } from "@preact/signals-react";

const defaultTodoMap: TodoMap = {
  items: [],
  maxId: 0,
  hideCompleted: false,
  showDate: false,
};

export const todoItems = signal<TodoMap>(
  JSON.parse(localStorage.getItem("todos") ?? JSON.stringify(defaultTodoMap))
);

export const errorMessage = signal<string | null>(null);
