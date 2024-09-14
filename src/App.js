import React, { useState, useEffect } from "react";
import "./App.css";

import moon from "./assets/night-mode.png";
import sun from "./assets/sun-icon-2048x2048-ylj2peao.png";
import cross from "./assets/close.png";
import darkCross from "./assets/dark-close.png";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active" && todo.completed) return false;
    if (filter === "completed" && !todo.completed) return false;
    if (
      searchQuery &&
      !todo.text.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={`app ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="background"></div>
      <div className="main ">
        <div className="title">
          <h1>TODO</h1>
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

        {/* Search input */}
        <div className="search-input  ">
          <input
            
            type="text"
            placeholder="Search todos here..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

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

        <div className="todo-info shadow-2xl container sm:text-xl ">
          <div>{todos.filter((todo) => !todo.completed).length} items left</div>
          <ul className="flex gap-2 cursor-pointer">
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
          <p className="cursor-pointer " onClick={handleClearCompleted}>
            Clear Completed
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
