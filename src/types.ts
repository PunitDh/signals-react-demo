export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  created: Date;
  updated: Date;
};

export type TodoMap = {
  items: Todo[];
  maxId: number;
} & ToggleOptions;

export type ToggleOptions = {
  hideCompleted: boolean;
  showDate: boolean;
  sortByUpdated: boolean;
};

export const defaultTodoMap = {
  items: [],
  maxId: 0,
  hideCompleted: false,
  showDate: false,
  sortByUpdated: false,
} as const;

export const TODOS_KEY = "todos" as const;
