import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onDelete, onUpdate }) {
  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onUpdate={onUpdate} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
