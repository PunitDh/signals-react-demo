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
  hideCompleted: boolean;
  showDate: boolean;
};
