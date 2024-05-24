import "./Navbar.css";
import { todoItems } from "../signals";

const Navbar = () => (
  <nav className="navbar">
    Todos: {todoItems.value.items.length} Completed:{" "}
    {todoItems.value.items.filter((item) => item.completed).length}
  </nav>
);

export default Navbar;
