'use client';

import { useState } from 'react';

export default function TodoList({ todos, onUpdate, onDelete, loading }) {
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleToggle = async (todo) => {
    setUpdatingId(todo.id);
    try {
      await onUpdate(todo.id, { completed: !todo.completed });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    setDeletingId(id);
    try {
      await onDelete(id);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-xl">
        <div className="inline-block w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4" />
        <p className="text-gray-600 text-lg font-medium">Loading your tasks...</p>
      </div>
    );
  }
  if (todos.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-xl border-2 border-dashed border-gray-300">
        <div className="text-6xl mb-4">🎯</div>
        <h3 className="text-2xl font-bold text-gray-700 mb-2">No tasks yet!</h3>
        <p className="text-gray-500 text-lg">Add your first task to get started</p>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 border-2 p-5 transform hover:scale-[1.01] ${
            todo.completed ? 'border-green-200 bg-green-50' : 'border-purple-100 hover:border-purple-300'
          } ${updatingId === todo.id || deletingId === todo.id ? 'opacity-50' : ''}`}
        >
          <div className="flex items-start gap-4">
            {/* Checkbox */}
            <button
              onClick={() => handleToggle(todo)}
              disabled={updatingId === todo.id || deletingId === todo.id}
              className="flex-shrink-0 mt-1 disabled:cursor-not-allowed"
            >
              <div className={`w-7 h-7 rounded-lg border-3 flex items-center justify-center transition-all duration-200 ${
                todo.completed
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300 hover:border-purple-500 hover:bg-purple-50'
              }`}>
                {todo.completed && (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </button>
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className={`text-lg font-bold mb-1 break-words ${
                todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
              }`}>
                {todo.title}
              </h3>
              {todo.description && (
                <p className={`text-sm mb-2 break-words ${
                  todo.completed ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {todo.description}
                </p>
              )}
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>🕐</span>
                <span>
                  {new Date(todo.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
            {/* Delete Button */}
            <button
              onClick={() => handleDelete(todo.id)}
              disabled={updatingId === todo.id || deletingId === todo.id}
              className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all duration-200 flex items-center justify-center font-bold text-xl hover:scale-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              title="Delete task"
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
