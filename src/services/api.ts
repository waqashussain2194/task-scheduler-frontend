import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',  // Explicitly set the backend URL
});

export const fetchTasks = () => api.get('/tasks');
export const createTask = (task: any) => api.post('/tasks', task);
export const updateTask = (id: number, task: any) => api.put(`/tasks/${id}`, task);
export const deleteTask = (id: number) => api.delete(`/tasks/${id}`);
export const fetchExecutionLogs = () => api.get('/tasks/logs');  // Correct endpoint
