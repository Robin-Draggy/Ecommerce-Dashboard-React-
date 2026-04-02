import { api } from '../../../api/axios'

export const getOrdersAPI = () => api.get('/orders')
export const deleteOrderAPI = (id) => api.delete(`/orders/${id}`)