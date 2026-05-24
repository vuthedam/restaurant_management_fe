import api from "../../../services/api";

export async function fetchPublicMenu() {
  const { data } = await api.get("/public/menu");
  return data?.data;
}

export async function fetchTableByQr(qrToken) {
  const { data } = await api.get(`/public/tables/${encodeURIComponent(qrToken)}`);
  return data?.data;
}

export async function placeGuestOrder(payload) {
  const { data } = await api.post("/public/orders", payload);
  return data?.data;
}

export async function placeStaffOrder(payload) {
  const { data } = await api.post("/orders", payload);
  return data?.data;
}

export async function placeGuestReservation(payload) {
  const { data } = await api.post("/public/reservations", payload);
  return data?.data;
}

export async function cancelGuestPendingOrderItem(itemId) {
  const { data } = await api.patch(`/public/order-items/${itemId}/cancel`);
  return data?.data;
}

export function getOrderApiError(err, fallback = "Đã xảy ra lỗi.") {
  return err?.response?.data?.message || err?.message || fallback;
}
