import api from './api';
export const matchJob = ({ file, resumeText, jobDescription }) => {
  const fd = new FormData();
  if (file) fd.append('resume', file);
  if (resumeText) fd.append('resumeText', resumeText);
  fd.append('jobDescription', jobDescription);
  return api.post('/job/match', fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data);
};
