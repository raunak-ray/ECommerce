import api from "../lib/api";

export const categoryService = {
  getAll: () => api.get("/category"),
  create: (data) => api.post("/category", data),
  update: (data, categoryId) => api.put(`/category/${categoryId}`, data),
  delete: (categoryId) => api.delete(`/category/${categoryId}`),
};
