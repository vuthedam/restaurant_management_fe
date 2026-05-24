export const PAYMENT_METHOD_LABELS = {
  cash: "Tiền mặt",
  banking: "Chuyển khoản",
  momo: "MoMo",
  vnpay: "VNPay",
  pos: "POS",
};

export const PAYMENT_STATUS_LABELS = {
  pending: "Chờ thanh toán",
  paid: "Đã thanh toán",
  failed: "Thất bại",
  refunded: "Đã hoàn tiền",
};

export const SERVICE_CALL_TYPE_LABELS = {
  call_staff: "Gọi nhân viên",
  request_payment: "Yêu cầu thanh toán",
  need_water: "Thêm nước",
  clean_table: "Dọn bàn",
  other: "Khác",
};

export const SERVICE_CALL_STATUS_LABELS = {
  pending: "Chờ xử lý",
  handling: "Đang xử lý",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};

export const CATEGORY_STATUS_LABELS = {
  active: "Đang dùng",
  inactive: "Tắt",
};

export const USER_ROLE_LABELS = {
  admin: "Quản trị viên",
  staff: "Nhân viên",
};

export const ORDER_STATUS_LABELS = {
  pending: "Chờ xử lý",
  confirmed: "Đã xác nhận",
  preparing: "Đang chế biến",
  served: "Đã phục vụ",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};

export const RESERVATION_STATUS_LABELS = {
  pending: "Đang chờ",
  confirmed: "Đã xác nhận",
  checked_in: "Đã check-in",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
  no_show: "Không đến",
};

export const TABLE_STATUS_LABELS = {
  available: "Trống",
  occupied: "Đang dùng",
  reserved: "Đã đặt",
  waiting_payment: "Chờ thanh toán",
  inactive: "Ngưng dùng",
};

export function formatRelativeTime(value) {
  if (!value) return "—";
  const diff = Date.now() - new Date(value).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Vừa xong";
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  return formatDateTime(value);
}

export function formatTime(value) {
  if (!value) return "—";
  return new Date(value).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatCurrency(amount) {
  if (amount == null || Number.isNaN(Number(amount))) return "—";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export function formatDateTime(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
