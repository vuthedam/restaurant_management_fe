import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";
import {
  clearInvalidToken,
  clearSession,
  getInitialUser,
  getToken,
  getUserFromToken,
  isTokenExpired,
  normalizeUser,
  saveSession,
} from "../utils/authStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const location = useLocation();
  const [user, setUser] = useState(getInitialUser);

  const refreshProfile = useCallback(async () => {
    const token = getToken();
    if (!token) return;

    if (isTokenExpired(token)) {
      clearSession();
      setUser(null);
      return;
    }

    const cached = getInitialUser();
    if (cached) setUser(cached);

    try {
      const { data } = await api.get("/users/me", { skipAuthRedirect: true });
      const profile = normalizeUser(data?.data);
      if (profile) {
        setUser(profile);
        saveSession({ token, user: profile });
      }
    } catch (error) {
      if (error.response?.status === 401) {
        // Token không khớp server (hết hạn, đổi JWT_SECRET, login nhầm môi trường)
        clearInvalidToken();
        const fallback = normalizeUser(getUserFromToken()) || cached;
        if (fallback) setUser(fallback);
        return;
      }
      console.error("Lỗi lấy user:", error);
    }
  }, []);

  useEffect(() => {
    if (!location.pathname.startsWith("/admin")) return;
    refreshProfile();
  }, [location.pathname, refreshProfile]);

  const login = useCallback((session) => {
    const profile = normalizeUser(session.user);
    saveSession({
      token: session.accessToken || session.token,
      user: profile,
    });
    setUser(profile);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
    window.location.href = "/login";
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
