import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Spinner from '../components/Spinner';
import TodoList from '../components/TodoList';
import AddTodoForm from '../components/AddTodoForm';
import { todoListEndpoint } from '../components/Endpoint';

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${todoListEndpoint}?_limit=3`)
      .then(response => {
        setTodos(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError('Error fetching todos');
        setIsLoading(false);
      });
  }, []);

  const handleAddTodo = (title) => {
    setIsLoading(true);
    axios.post(todoListEndpoint, { title, completed: false })
      .then(response => {
        const newTodo = { ...response.data, id: todos.length + 1 };
        setTodos(prevTodos => [...prevTodos, newTodo]);
        setIsLoading(false);
      })
      .catch(error => {
        setError('Error adding todo');
        setIsLoading(false);
      });
  };

  const handleDeleteTodo = (id) => {
    setIsLoading(true);
    axios.delete(`${todoListEndpoint}/${id}`)
      .then(response => {
        if (response.status === 200) {
          setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        } else {
          setError('Failed to delete todo');
        }
        setIsLoading(false);
      })
      .catch(error => {
        setError('Error deleting todo');
        setIsLoading(false);
      });
  };

  const handleUpdateTodo = (id, newTitle) => {
    setIsLoading(true);
    axios.put(`${todoListEndpoint}/${id}`, { title: newTitle })
      .then(response => {
        if (response.status === 200) {
          setTodos(prevTodos => prevTodos.map(todo => {
            if (todo.id === id) {
              return { ...todo, title: newTitle };
            }
            return todo;
          }));
        } else {
          setError('Failed to update todo');
        }
        setIsLoading(false);
      })
      .catch(error => {
        setError('Error updating todo');
        setIsLoading(false);
      });
  };

  return (
    <div className="app">
      <TodoList todos={todos} onDelete={handleDeleteTodo} onUpdate={handleUpdateTodo} />
      {isLoading ? <Spinner /> : <AddTodoForm onAdd={handleAddTodo} />}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;
