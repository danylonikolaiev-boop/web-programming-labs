import axios from 'axios';
import type { Todo } from '../types/todo';

const BASE_URL = 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const todosApi = {
  getAll: () =>
    apiClient.get<Todo[]>('/todos').then((r) => r.data),

  create: (data: Omit<Todo, 'id'>) =>
    apiClient.post<Todo>('/todos', data).then((r) => r.data),

  update: (id: number, data: Partial<Todo>) =>
    apiClient.patch<Todo>(`/todos/${id}`, data).then((r) => r.data),

  remove: (id: number) =>
    apiClient.delete(`/todos/${id}`),
};