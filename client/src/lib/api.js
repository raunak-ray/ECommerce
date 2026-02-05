import axios from "axios";

// const baseUrl = `${import.meta}`

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  withCredentials: true,
});

export default api;
