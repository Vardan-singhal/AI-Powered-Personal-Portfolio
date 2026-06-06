import api from './api';
export const reviewResume = (file) => {
  const fd = new FormData();
  fd.append('resume', file);
  return api.post('/resume/review', fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data);
};
