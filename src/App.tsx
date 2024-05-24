import "./App.css";
import Navbar from "./Navbar";
import TodoList from "./TodoList";
import "@preact/signals-react/auto";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <TodoList />
      </header>
    </div>
  );
}

export default App;
