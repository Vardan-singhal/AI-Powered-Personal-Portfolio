import api from './api';
export const listProjects = (params) => api.get('/projects', { params }).then((r) => r.data);
export const getProject = (id) => api.get(`/projects/${id}`).then((r) => r.data);
export const createProject = (fd) => api.post('/projects', fd).then((r) => r.data);
export const updateProject = (id, fd) => api.put(`/projects/${id}`, fd).then((r) => r.data);
export const deleteProject = (id) => api.delete(`/projects/${id}`).then((r) => r.data);
