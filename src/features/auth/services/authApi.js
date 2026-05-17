import api from "../../../services/api";

export const login = async ({ email, password }) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

export const register = async ({ fullName, email, password }) => {
  const { data } = await api.post("/auth/register", { fullName, email, password });
  return data;
};

export const getAuthErrorMessage = (error, fallback) => {
  if (!error.response) {
    return "Không kết nối được máy chủ. Hãy chạy backend (Node) trên cổng 3000.";
  }
  return error.response?.data?.message || fallback;
};
