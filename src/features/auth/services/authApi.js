import api from "../../../services/api";

export const login = async ({ email, password }) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

export const register = async ({ fullName, email, password }) => {
  const { data } = await api.post("/auth/register", { fullName, email, password });
  return data;
};
