/**
 * API service layer — placeholder for backend integration.
 * Replace BASE_URL and implement real fetch calls when backend is ready.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

async function request(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const api = {
  generateSql: (prompt) =>
    request('/query/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    }),
  executeSql: (sql) =>
    request('/query/execute', {
      method: 'POST',
      body: JSON.stringify({ sql }),
    }),
  getHistory: () => request('/query/history'),
  getSchema: () => request('/database/schema'),
};
