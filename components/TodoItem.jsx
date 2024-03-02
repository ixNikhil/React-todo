import React, { useState } from 'react';

function TodoItem({ todo, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewTitle(todo.title);
  };

  const handleUpdateTodo = () => {
    onUpdate(todo.id, newTitle);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setNewTitle(e.target.value);
  };

  return (
    <li className="todo-item">
      {isEditing ? (
        <div>
          <input type="text" value={newTitle} onChange={handleChange} />
          <button className="update-btn" onClick={handleUpdateTodo}>Update</button>
          <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <span>{todo.title}</span>
          <button className="delete-btn" onClick={() => onDelete(todo.id)}>Delete</button>
          <button className="edit-btn" onClick={handleEdit}>Edit</button>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
