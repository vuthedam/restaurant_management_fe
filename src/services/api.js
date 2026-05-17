import axios from "axios";
import { clearSession, getToken } from "../utils/authStorage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Gắn token vào mỗi request
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Xử lý lỗi tập trung
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && !error.config?.skipAuthRedirect) {
      clearSession();
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
