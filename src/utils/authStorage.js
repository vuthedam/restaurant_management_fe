const TOKEN_KEY = "token";
const USER_KEY = "user";
const LEGACY_TOKEN_KEY = "accessToken";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || localStorage.getItem(LEGACY_TOKEN_KEY);
}

export function isTokenExpired(token) {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (!payload.exp) return false;
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getUserFromToken() {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      _id: payload.id || payload.userId,
      fullName: payload.fullName || payload.name,
      email: payload.email,
      role: payload.role,
      avatar: payload.avatar ?? null,
    };
  } catch {
    return null;
  }
}

export function normalizeUser(user) {
  if (!user) return null;

  const fullName =
    user.fullName ||
    user.name ||
    user.email?.split("@")[0] ||
    "User";

  return {
    ...user,
    fullName,
    role: user.role || "staff",
    avatar: user.avatar || null,
  };
}

export function getInitialUser() {
  return normalizeUser(getStoredUser()) || normalizeUser(getUserFromToken());
}

export function saveSession({ token, user }) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.removeItem(LEGACY_TOKEN_KEY);
  }
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(normalizeUser(user)));
  }
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(LEGACY_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/** Xóa token hết hạn/không hợp lệ nhưng giữ user để hiển thị sidebar */
export function clearInvalidToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(LEGACY_TOKEN_KEY);
}

export function getAvatarUrl(user) {
  const name = user?.fullName || "User";
  if (user?.avatar) return user.avatar;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f97316&color=fff&size=128`;
}

export const ROLE_LABELS = {
  admin: "Administrator",
  staff: "Staff",
};

export function getRoleLabel(role) {
  return ROLE_LABELS[role] ?? role ?? "Staff";
}
