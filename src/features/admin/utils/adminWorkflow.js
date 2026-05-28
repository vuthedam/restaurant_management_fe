export const ORDER_STATUS_NEXT = {
  pending: "confirmed",
  confirmed: "preparing",
  preparing: "served",
  served: "completed",
};

export const RESERVATION_STATUS_NEXT = {
  pending: "confirmed",
  confirmed: "checked_in",
  checked_in: "completed",
};

export function getNextOrderStatus(status) {
  return ORDER_STATUS_NEXT[status] ?? null;
}

/** Chỉ cho phép Hoàn tất đơn khi mọi món (không hủy) đã phục vụ xong. */
export function canAdvanceOrderStatus(orderStatus, nextStatus, orderItems = []) {
  if (!nextStatus) return false;
  if (nextStatus !== "completed") return true;

  const activeItems = orderItems.filter((item) => item.status !== "cancelled");
  if (!activeItems.length) return false;

  return (
    orderStatus === "served" &&
    activeItems.every((item) => item.status === "served")
  );
}

export function getNextReservationStatus(status) {
  return RESERVATION_STATUS_NEXT[status] ?? null;
}

export function generateReservationCode() {
  const suffix = Date.now().toString(36).toUpperCase().slice(-6);
  return `RSV${suffix}`;
}

export function slugifyName(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function uniqueSlug(name) {
  const base = slugifyName(name) || "mon";
  return `${base}-${Date.now().toString(36).slice(-4)}`;
}
