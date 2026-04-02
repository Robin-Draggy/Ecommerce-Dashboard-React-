import { api } from '../../../api/axios'

export const getInventoriesAPI = () => api.get('/inventory')
export const deleteInventoryAPI = (id) => api.delete(`/inventory/${id}`)