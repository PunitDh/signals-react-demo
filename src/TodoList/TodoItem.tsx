import DeleteIcon from "../assets/DeleteIcon";
import EditIcon from "../assets/EditIcon";
import { todoItems } from "../signals";
import { Todo } from "../types";
import { formatDate } from "./actions";
import "./TodoItem.css";

type Props = {
  item: Todo;
  onComplete: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

const TodoItem = ({ item, onComplete, onDelete, onEdit }: Props) => (
  <li className="todo-item" key={item.id}>
    <span className="todo-item-row" title="Mark as completed">
      <label className="todo-item-label" htmlFor={`todo-item-${item.id}`}>
        <input
          type="checkbox"
          id={`todo-item-${item.id}`}
          className="todo-item-checkbox"
          onChange={onComplete}
          checked={item.completed}
        />{" "}
        <span className={item.completed ? "todo-list-item-completed" : ""}>
          {item.title}
        </span>
        {todoItems.value.showDate && (
          <span className="subtitle">{formatDate(item.updated)}</span>
        )}
      </label>
      {!item.completed && <button
        className="todo-list-item-action-button"
        type="button"
        onClick={onEdit}
        title="Edit this to-do item"
      >
        <EditIcon size={24} color="white" />
      </button>}
      <button
        className="todo-list-item-action-button"
        type="button"
        onClick={onDelete}
        title="Delete this to-do item"
      >
        <DeleteIcon size={24} color="white" />
      </button>
    </span>
  </li>
);

export default TodoItem;
