import api from './api';
export const getGithubStats = () => api.get('/github/stats').then((r) => r.data);
export const getRepos = () => api.get('/github/repos').then((r) => r.data);
