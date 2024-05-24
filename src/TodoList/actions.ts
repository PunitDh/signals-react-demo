import { currentEditing, errorMessage, todoItems } from "../signals";
import {
  defaultTodoMap,
  Todo,
  TodoMap,
  TODOS_KEY,
  ToggleOptions,
} from "../types";

export const getInitialTodos = (): TodoMap => {
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

const setTodoMap = (param: Partial<TodoMap>) => {
  const todoMap: TodoMap = {
    ...todoItems.value,
    ...param,
  };
  todoItems.value = todoMap;
  currentEditing.value = null;
  localStorage.setItem(TODOS_KEY, JSON.stringify(todoItems));
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

  let todo: Todo;
  const date = new Date();


  if (currentEditing.value) {
    todo = {
      ...currentEditing.value,
      title,
      updated: date,
    };
  } else {
    todoItems.value.maxId += 1;
    todo = {
      id: todoItems.value.maxId,
      title,
      completed: false,
      created: date,
      updated: date,
    };
  }

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

export const handleEdit = (id: number) => () => {
  const todo = todoItems.value.items.find((item) => item.id === id);
  if (!todo) return;

  if (currentEditing.value) {
    todoItems.value.items.push(currentEditing.value);
  }

  currentEditing.value = {
    ...todo,
  };

  todoItems.value.items = todoItems.value.items.filter(
    (item) => item.id !== id
  );
};

export const cancelEditing = () => {
  if (currentEditing.value) {
    todoItems.value.items.push(currentEditing.value);
    currentEditing.value = null;
  }
};

export const toggleValue = (param: keyof ToggleOptions) => () =>
  setTodoMap({ [param]: !todoItems.value[param] });

export const dismissError = () => {
  errorMessage.value = null;
};
