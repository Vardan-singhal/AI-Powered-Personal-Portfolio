import api from './api';

export const getPageContent = (slug) =>
  api.get(`/pages/${slug}`).then((r) => r.data);

export const getAllPages = () =>
  api.get('/pages').then((r) => r.data);

export const updatePageContent = (slug, data) =>
  api.put(`/pages/${slug}`, data).then((r) => r.data);

export const resetPageContent = (slug) =>
  api.delete(`/pages/${slug}`).then((r) => r.data);
