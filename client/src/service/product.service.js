import api from "../lib/api.js";

export const productService = {
  getAllProducts: () => api.get("/products"),
  getProductById: (productId) => api.get(`/products/${productId}`),
  getProductByCategory: (categoryId) =>
    api.get(`/products/category/${categoryId}`),
  createProduct: (data) => api.post("/products", data),
  updateProduct: (productId, data) => api.put(`/products/${productId}`, data),
  delteProduct: (productId) => api.delete(`/products/${productId}`),
};
