import { api } from "./axios";

export const getProductsAPI = () => api.get("/products");
export const createProductAPI = (data) => api.post("/products", data);
export const updateProductAPI = (id, data) => api.patch(`/products/${id}`, data);
export const deleteProductAPI = (id) => api.delete(`/products/${id}`);