import api from './api';
export const sendChat = (sessionId, question) => api.post('/chat', { sessionId, question }).then((r) => r.data);
export const explainProject = (id) => api.post(`/chat/explain/${id}`).then((r) => r.data);
