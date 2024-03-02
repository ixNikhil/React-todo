import React, { useState } from 'react';
import Spinner from './Spinner';

function AddTodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== '') {
      setIsAdding(true);
      onAdd(title);
      setTitle('');
      setIsAdding(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter your todo here"
      />
      {isAdding ? (
        <button type="submit" disabled>
          <Spinner /> Adding
        </button>
      ) : (
        <button type="submit">Add Todo</button>
      )}
    </form>
  );
}

export default AddTodoForm;
