import "./index.css";
import TodoItem from "./TodoItem";
import { errorMessage, todoItems } from "../signals";
import Logo from "../assets/logo.png";
import TodoListOption from "./TodoListOption";
import {
  dismissError,
  handleComplete,
  handleDelete,
  handleSubmit,
  toggleValue,
} from "./actions";

const TodoList = () => (
  <main>
    <div className="todo-header">
      <img src={Logo} alt="To-Do List Logo" width={32} /> To-Do List
    </div>
    <div className="todo-list-options">
      <ul className="todo-list-options-group">
        <TodoListOption
          checked={todoItems.value.hideCompleted}
          onChange={toggleValue("hideCompleted")}
          label="Hide completed"
        />
        <TodoListOption
          checked={todoItems.value.showDate}
          onChange={toggleValue("showDate")}
          label="Show last updated"
        />
        <TodoListOption
          checked={todoItems.value.sortByUpdated}
          onChange={toggleValue("sortByUpdated")}
          label="Sort by last updated"
        />
      </ul>
    </div>
    {errorMessage.value && (
      <div className="error-message">
        <span className="message">{errorMessage.value}</span>
        <button onClick={dismissError} className="close-button">
          x
        </button>
      </div>
    )}
    <form className="todo-form" name="todoform" onSubmit={handleSubmit}>
      <fieldset>
        <input
          type="text"
          name="item"
          className="todo-item-input"
          placeholder="Enter a to-do item"
          autoFocus
          autoComplete="off"
        />
        <button className="todo-form-submit-button" type="submit">
          Add Todo
        </button>
      </fieldset>
    </form>
    <div className="todo-output">
      <ul className="todo-list">
        {todoItems.value.items
          .filter((item) => !(item.completed && todoItems.value.hideCompleted))
          .sort((a, b) =>
            todoItems.value.sortByUpdated
              ? b.updated.getTime() - a.updated.getTime()
              : a.id - b.id
          )
          .map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              onComplete={handleComplete(item.id)}
              onDelete={handleDelete(item.id)}
            />
          ))}
      </ul>
    </div>
  </main>
);

export default TodoList;
