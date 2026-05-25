import axios from "axios";
import {
  clearSession,
  getRefreshToken,
  getToken,
  getStoredUser,
  saveSession,
} from "../utils/authStorage";

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (token) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

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

// Xử lý lỗi tập trung và refresh token
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = getRefreshToken();

    if (
      error.response?.status === 401 &&
      refreshToken &&
      originalRequest &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh-token"
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await api.post(
          "/auth/refresh-token",
          { refreshToken },
          { skipAuthRedirect: true },
        );

        const newAccessToken = response?.data?.data?.accessToken;
        const newRefreshToken = response?.data?.data?.refreshToken;
        const storedUser = getStoredUser();

        if (newAccessToken) {
          saveSession({
            token: newAccessToken,
            refreshToken: newRefreshToken,
            user: storedUser,
          });

          api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          onRefreshed(newAccessToken);

          return api(originalRequest);
        }
      } catch (refreshError) {
        clearSession();
        if (
          !originalRequest?.skipAuthRedirect &&
          !window.location.pathname.startsWith("/login")
        ) {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response?.status === 401 && !originalRequest?.skipAuthRedirect) {
      clearSession();
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }

    if (error.response?.status === 403) {
      const message =
        error.response?.data?.message ||
        "Bạn không có quyền thực hiện thao tác này.";
      error.forbiddenMessage = message;
    }

    return Promise.reject(error);
  },
);

export default api;
