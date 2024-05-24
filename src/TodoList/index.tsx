import "./TodoList.css";
import TodoItem from "./TodoItem";
import { errorMessage, todoItems } from "../signals";
import Logo from "../assets/logo.png";
import TodoListOption from "./TodoListOption";
import {
  dismissError,
  handleComplete,
  handleDelete,
  handleSubmit,
  toggleHideCompleted,
  toggleShowDate,
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
          onChange={toggleHideCompleted}
          label="Hide completed"
        />
        <TodoListOption
          checked={todoItems.value.showDate}
          onChange={toggleShowDate}
          label="Show date"
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
