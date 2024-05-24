import { useMemo } from "react";
import "./TodoListOption.css";

type Props = {
  checked: boolean;
  onChange: () => void;
  label: string;
};

const TodoListOption = ({ checked, onChange, label }: Props) => {
  const id = useMemo(
    () => `todo-list-option-${label.trim().toLowerCase().split(" ").join("-")}`,
    [label]
  );

  return (
    <li className="todo-list-option">
      <div className="todo-list-option-input-group">
        <input
          type="checkbox"
          id={id}
          className="todo-list-option-checkbox"
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    </li>
  );
};

export default TodoListOption;
