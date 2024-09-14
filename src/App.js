import React, { useState, useEffect } from "react";
import "./App.css";

import moon from "./assets/night-mode.png";
import sun from "./assets/sun-icon-2048x2048-ylj2peao.png";

// import cross from './assets/cart_cross_icon.png'
import cross from "./assets/close.png";
import darkCross from "./assets/dark-close.png";

const App = () => {
  // State to toggle between light and dark mode
  const [darkMode, setDarkMode] = useState(false);

  const [todos, setTodos] = useState(() => {
    // Retrieve todos from localStorage when the component mounts
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all"); // Filter state: 'all', 'active', 'completed'

  // Function to toggle dark mode
  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  // Apply or remove the 'dark-mode' class from body when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add new todo
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo("");
  };

  // Delete todo
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Toggle complete status when checkmark is clicked
  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Filtered todos based on the current filter state
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // For "all", return everything
  });

  // Clear completed todos
  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <div className={`app ${darkMode ? "dark-mode" : "light-mode"}`}>
      {/* Background */}
      <div className="background"></div>
      <div className="main ">
        <div className="title ">
          <h1>TODO</h1>

          {/* Add toggle button */}
          <img
            src={darkMode ? sun : moon}
            alt="sun/moon"
            onClick={handleToggle}
            className="toggle-button"
          />
        </div>
        <div className="todo-input container shadow">
          <div className="checkmark">
            <button className="checkmark-inner"></button>
          </div>
          <form onSubmit={handleAddTodo}>
            <input
              type="text"
              placeholder="Create a new todo..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
          </form>
        </div>

        {/* List todos here */}
        <div className="todo-list shadow">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-input container new-todo ${
                todo.completed ? "completed" : ""
              }`}
            >
              <div className="checkmark">
                <button
                  className={`checkmark-inner ${
                    todo.completed ? "checked" : ""
                  }`}
                  onClick={() => handleToggleComplete(todo.id)}
                ></button>
              </div>
              <p
                className={`text-container flex-1 ${
                  todo.completed ? "checked" : ""
                }`}
              >
                {todo.text}
              </p>

              <button
                className="delete-button"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                <img
                  src={darkMode ? darkCross : cross}
                  alt="delete todo button"
                />
              </button>
            </div>
          ))}
        </div>

        {/* filter Activity section */}
        <div className="todo-info container sm:text-xl">
          <div>{todos.filter((todo) => !todo.completed).length} items left</div>
          <ul className="flex gap-5 cursor-pointer">
            <li
              className={` ${filter === "all" ? "active-filter" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </li>
            <li
              className={` ${filter === "active" ? "active-filter" : ""}`}
              onClick={() => setFilter("active")}
            >
              Active
            </li>
            <li
              className={` ${filter === "completed" ? "active-filter" : ""}`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </li>
          </ul>
          <li className="cursor-pointer " onClick={handleClearCompleted}>
            Clear Completed
          </li>
        </div>
      </div>
    </div>
  );
};

export default App;
