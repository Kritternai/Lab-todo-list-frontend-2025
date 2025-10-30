'use client';

export default function TodoStats({ todos }) {
  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
  };
  if (todos.length === 0) return null;
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-xl shadow-md p-4 border-2 border-blue-100 text-center transform hover:scale-105 transition-transform duration-200">
        <div className="text-3xl mb-1">📊</div>
        <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
        <div className="text-sm text-gray-600 font-medium">Total Tasks</div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 border-2 border-green-100 text-center transform hover:scale-105 transition-transform duration-200">
        <div className="text-3xl mb-1">✅</div>
        <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
        <div className="text-sm text-gray-600 font-medium">Completed</div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 border-2 border-orange-100 text-center transform hover:scale-105 transition-transform duration-200">
        <div className="text-3xl mb-1">⏳</div>
        <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
        <div className="text-sm text-gray-600 font-medium">Pending</div>
      </div>
    </div>
  );
}
