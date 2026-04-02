import { api } from '../../../api/axios'

export const getCategoriesAPI = () => api.get('/categories');
export const createCategoryAPI = (data) => api.post('/categories', data);
export const updateCategoryAPI = (id, data) => api.patch(`/categories/${id}`, data);
export const deleteCategoryAPI = (id) => api.delete(`/categories/${id}`);