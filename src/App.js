import React, { useState, useEffect } from "react";
import "./App.css";

import moon from "./assets/night-mode.png";
import sun from "./assets/sun-icon-2048x2048-ylj2peao.png";

const App = () => {
  // State to toggle between light and dark mode
  const [darkMode, setDarkMode] = useState(false);

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
          <input type="text" placeholder="Create a new todo..." />
        </div>

        {/* Activity section */}
        <div className="todo-info container  sm:text-xl ">
          <div>0 items left</div>
          <ul className="flex gap-5 cursor-pointer ">
            <li className=" hover:text-gray-700">All</li>
            <li className=" hover:text-gray-700">Active</li>
            <li className=" hover:text-gray-700">Complete</li>
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
