import { api } from '../../../api/axios'

export const getCustomersAPI = () => api.get('/customers')
export const deleteCustomerAPI = (id) => api.delete(`/customers/${id}`)