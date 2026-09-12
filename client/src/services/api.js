import axios from 'axios';

const getBaseURL = () => {
  if (
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ) {
    return '/api';
  }
  return import.meta.env.VITE_API_URL || '/api';
};

const api = axios.create({ baseURL: getBaseURL() });
let accessToken = localStorage.getItem('accessToken');

export function setAccessToken(t) {
  accessToken = t;
  if (t) api.defaults.headers.common.Authorization = `Bearer ${t}`;
  else delete api.defaults.headers.common.Authorization;
}
if (accessToken) setAccessToken(accessToken);

api.interceptors.response.use(
  (r) => r,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      const rt = localStorage.getItem('refreshToken');
      if (rt) {
        try {
          const { data } = await axios.post(`${api.defaults.baseURL}/auth/refresh`, { refreshToken: rt });
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          setAccessToken(data.accessToken);
          original.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(original);
        } catch {}
      }
    }
    return Promise.reject(err);
  }
);

export default api;
