import api from "../lib/api.js";

export const authService = {
    me: () => api.get("/auth/me"),
    login: (data) => api.post("/auth/login", data),
    logout: () => api.post("/auth/logout"),
    signup: (data) => api.post("/auth/signup", data)
}