/** Đường dẫn staff được phép mở */
export const STAFF_ROUTES = [
  "/admin/dashboard",
  "/admin/profile",
  "/admin/orders",
  "/admin/tables",
  "/admin/service-calls",
  "/admin/menu",
  "/admin/reservations",
];

/** Chỉ admin */
export const ADMIN_ONLY_ROUTES = [
  "/admin/categories",
  "/admin/customers",
  "/admin/payments",
  "/admin/reviews",
  "/admin/users",
  "/admin/activity-logs",
];

export const PANEL_ROLES = ["admin", "staff"];

export function isAdmin(role) {
  return role === "admin";
}

export function isStaff(role) {
  return role === "staff";
}

export function canAccessPanel(role) {
  return PANEL_ROLES.includes(role);
}

export function canAccessRoute(role, pathname) {
  if (!canAccessPanel(role)) return false;
  if (pathname === "/admin/unauthorized") return true;
  if (isAdmin(role)) return true;
  return STAFF_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function canManageMenu(role) {
  return isAdmin(role);
}

export function canManageCategories(role) {
  return isAdmin(role);
}

export function canManageUsers(role) {
  return isAdmin(role);
}

/** Lọc menu sidebar theo role */
export function getNavSectionsForRole(role) {
  const all = [
    {
      title: "Vận hành",
      links: [
        { to: "/admin/dashboard", label: "Tổng quan" },
        { to: "/admin/profile", label: "Hồ sơ" },
        { to: "/admin/orders", label: "Đơn hàng trực tiếp" },
        { to: "/admin/tables", label: "Sơ đồ bàn" },
        { to: "/admin/service-calls", label: "Gọi phục vụ" },
      ],
    },
    {
      title: "Thực đơn & đặt bàn",
      links: [
        { to: "/admin/menu", label: "Quản lý thực đơn" },
        { to: "/admin/categories", label: "Danh mục món", adminOnly: true },
        { to: "/admin/reservations", label: "Đặt bàn" },
      ],
    },
    {
      title: "Khách hàng & tài chính",
      adminOnly: true,
      links: [
        { to: "/admin/customers", label: "Khách hàng" },
        { to: "/admin/payments", label: "Thanh toán" },
        { to: "/admin/reviews", label: "Đánh giá" },
      ],
    },
    {
      title: "Hệ thống",
      adminOnly: true,
      links: [
        { to: "/admin/users", label: "Nhân viên" },
        { to: "/admin/activity-logs", label: "Nhật ký" },
      ],
    },
  ];

  if (isAdmin(role)) {
    return all.map((section) => ({
      ...section,
      links: section.links.filter((l) => !l.adminOnly || isAdmin(role)),
    }));
  }

  return all
    .filter((section) => !section.adminOnly)
    .map((section) => ({
      ...section,
      links: section.links.filter((link) => !link.adminOnly),
    }))
    .filter((section) => section.links.length > 0);
}
