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

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

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

  return (
    <div className={`app ${darkMode ? "dark-mode" : "light-mode"}`}>
      {/* Background */}
      <div className="background"></div>
      <div className="main">
        <div className="title">
          <h1>TODO</h1>

          {/* Add toggle button */}
          <img
            src={darkMode ? sun : moon}
            alt="sun/moon"
            onClick={handleToggle}
            className="toggle-button"
          />
        </div>
        <div className="todo-input container">
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
        <div className="todo-list">
          {todos.map((todo) => (
            <div key={todo.id} className="todo-input container new-todo">
              <div className="checkmark">
                <button className="checkmark-inner"></button>
              </div>
              <div
                checked={todo.completed}
                onChange={() =>
                  setTodos(
                    todos.map((t) =>
                      t.id === todo.id ? { ...t, completed: !t.completed } : t
                    )
                  )
                }
              />
              <p className=" text-container flex-1">{todo.text}</p>

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
            <li className="hover:text-gray-700">All</li>
            <li className="hover:text-gray-700">Active</li>
            <li className="hover:text-gray-700">Complete</li>
          </ul>
          <div className="cursor-pointer hover:text-gray-700">
            Clear Completed
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
