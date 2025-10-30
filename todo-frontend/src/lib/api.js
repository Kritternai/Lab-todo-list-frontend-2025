// Client-only API layer using localStorage
// This replaces any network calls so the app works without a backend.

const STORAGE_KEY = 'todo_items_v1';

function safeRead() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function safeWrite(items) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const todoAPI = {
  healthCheck: async () => {
    // Always healthy for client-only mode
    return { ok: true };
  },

  getTodos: async () => {
    const items = safeRead().sort((a, b) => b.created_at - a.created_at);
    return { data: items };
  },

  createTodo: async (todo) => {
    const items = safeRead();
    const newItem = {
      id: generateId(),
      title: (todo && todo.title ? todo.title : '').trim(),
      description: (todo && todo.description ? todo.description : '').trim(),
      completed: false,
      created_at: Date.now(),
    };
    items.push(newItem);
    safeWrite(items);
    return { data: newItem };
  },

  updateTodo: async (id, updates) => {
    const items = safeRead();
    const index = items.findIndex((t) => t.id === id);
    if (index === -1) return { data: null };
    const updated = { ...items[index], ...updates };
    items[index] = updated;
    safeWrite(items);
    return { data: updated };
  },

  deleteTodo: async (id) => {
    const items = safeRead();
    const filtered = items.filter((t) => t.id !== id);
    safeWrite(filtered);
    return { data: { id } };
  },
};

export default todoAPI;
