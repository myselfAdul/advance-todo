import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="app">
      <div className="header">
        <h1>TODO</h1>
        <div className="theme-toggle">
          <span>🌙</span>
        </div>
      </div>

      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Create a new todo..."
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map((todo, index) => (
          <li key={index} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(index)}
            />
            {todo.text}
          </li>
        ))}
      </ul>

      <div className="footer">
        <span>{todos.filter((todo) => !todo.completed).length} Items Left</span>
        <div className="filters">
          <span onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>
            All
          </span>
          <span onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>
            Active
          </span>
          <span onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>
            Completed
          </span>
        </div>
        <button onClick={clearCompleted}>Clear Completed</button>
      </div>
    </div>
  );
}

// export default App;
