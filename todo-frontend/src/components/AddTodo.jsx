'use client';

import { useState } from 'react';

export default function AddTodo({ onAdd, loading }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await onAdd({ title: title.trim(), description: description.trim() });
      setTitle('');
      setDescription('');
    } catch (error) {
      setError('Failed to add todo. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border-2 border-purple-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-3xl">➕</span>
        Add New Task
      </h2>
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
            Task Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What do you need to do?"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition text-gray-800 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={submitting || loading}
            autoFocus
          />
        </div>
        {/* Description Input */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details..."
            rows="3"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition resize-none text-gray-800 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={submitting || loading}
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting || loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <span className="text-xl">✨</span>
              Add Task
            </>
          )}
        </button>
        {/* Debug Info */}
        <div className="text-xs text-gray-400 mt-2">
          Debug: Title length = {title.length}, Submitting = {submitting ? 'true' : 'false'}
        </div>
      </form>
    </div>
  );
}
