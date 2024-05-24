import { errorMessage, todoItems } from "../signals";
import { defaultTodoMap, Todo, TodoMap, ToggleOptions } from "../types";

const setTodoMap = (param: Partial<TodoMap>) => {
  const todoMap: TodoMap = {
    ...todoItems.value,
    ...param,
  };
  todoItems.value = todoMap;
  localStorage.setItem("todos", JSON.stringify(todoItems));
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-AU", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }).format(date);
};

export const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const title = form.item.value.trim();

  if (title.length === 0) return;

  const titleExists = todoItems.value.items.some(
    (item) => item.title === title
  );

  if (titleExists) {
    errorMessage.value = `Todo item "${title}" already exists`;
    return;
  }

  todoItems.value.maxId += 1;

  const date = new Date();
  const todo: Todo = {
    id: todoItems.value.maxId,
    title,
    completed: false,
    created: date,
    updated: date,
  };

  setTodoMap({ items: [...todoItems.value.items, todo] });
  errorMessage.value = null;
  form.reset();
};

export const handleComplete = (id: number) => () => {
  const updatedItem = todoItems.value.items.find((item) => item.id === id);
  if (!updatedItem) return;
  updatedItem.completed = !updatedItem.completed;
  updatedItem.updated = new Date();
  setTodoMap({
    items: [...todoItems.value.items].map((item) =>
      item.id === id ? updatedItem : item
    ),
  });
};

export const handleDelete = (id: number) => () =>
  setTodoMap({
    items: [...todoItems.value.items].filter((item) => item.id !== id),
  });

export const toggleValue = (param: keyof ToggleOptions) => () =>
  setTodoMap({ [param]: !todoItems.value[param] });

export const dismissError = () => {
  errorMessage.value = null;
};
