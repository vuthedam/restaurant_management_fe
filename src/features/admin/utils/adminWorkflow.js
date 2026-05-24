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
