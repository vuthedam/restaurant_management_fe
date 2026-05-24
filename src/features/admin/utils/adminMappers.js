import {
  formatCurrency,
  formatRelativeTime,
  formatTime,
  ORDER_STATUS_LABELS,
  RESERVATION_STATUS_LABELS,
} from "./adminLabels";
import { getNextOrderStatus } from "./adminWorkflow";

const ORDER_STATUS_UI = {
  pending: {
    action: "XÁC NHẬN",
    border: "border-yellow-300",
    headerBg: "bg-yellow-50 text-yellow-700",
    buttonColor: "bg-yellow-500",
  },
  confirmed: {
    action: "BẮT ĐẦU CHẾ BIẾN",
    border: "border-orange-300",
    headerBg: "bg-orange-50 text-orange-600",
    buttonColor: "bg-orange-500",
  },
  preparing: {
    action: "ĐÁNH DẤU SẴN SÀNG",
    border: "border-orange-300",
    headerBg: "bg-orange-50 text-orange-600",
    buttonColor: "bg-orange-500",
  },
  served: {
    action: "HOÀN TẤT",
    border: "border-blue-300",
    headerBg: "bg-blue-50 text-blue-700",
    buttonColor: "bg-blue-600",
  },
  completed: {
    action: "ĐÃ HOÀN THÀNH",
    border: "border-gray-300",
    headerBg: "bg-gray-100 text-gray-700",
    buttonColor: "bg-gray-600",
  },
  cancelled: {
    action: "ĐÃ HỦY",
    border: "border-gray-300",
    headerBg: "bg-gray-100 text-gray-500",
    buttonColor: "bg-gray-500",
  },
};

function resolveTableLabel(order, tableLookup = {}) {
  if (typeof order.tableId === "object" && order.tableId) {
    return order.tableId.code || order.tableId.name || "—";
  }
  const id = String(order.tableId ?? "");
  return tableLookup[id]?.code || tableLookup[id]?.name || "—";
}

export function mapOrderToCard(order, { tableLookup = {}, orderItems = [] } = {}) {
  const ui = ORDER_STATUS_UI[order.status] || ORDER_STATUS_UI.pending;
  const statusLabel = ORDER_STATUS_LABELS[order.status] || order.status;
  const nextStatus = getNextOrderStatus(order.status);
  const lineItems = orderItems.length
    ? orderItems.map((item) => ({
        id: item._id,
        status: item.status || "pending",
        qty: item.quantity,
        name: item.name,
        lineTotal: formatCurrency(item.subtotal ?? item.price * item.quantity),
        unitPrice: formatCurrency(item.price),
        note: item.note || null,
      }))
    : [
        {
          qty: "—",
          name: `Tổng: ${formatCurrency(order.finalAmount ?? order.subtotal)}`,
          note: statusLabel,
        },
      ];

  return {
    id: order._id,
    rawStatus: order.status,
    nextStatus,
    disabled: !nextStatus,
    table: resolveTableLabel(order, tableLookup),
    timeAgo: formatRelativeTime(order.createdAt),
    time: order.orderNumber || formatTime(order.createdAt),
    action: nextStatus
      ? ui.action
      : order.status === "cancelled"
        ? "ĐÃ HỦY"
        : "ĐÃ HOÀN THÀNH",
    border: ui.border,
    headerBg: ui.headerBg,
    buttonColor: ui.buttonColor,
    orderTotal: formatCurrency(order.finalAmount ?? order.subtotal),
    items: [
      ...lineItems,
      ...(order.note && orderItems.length
        ? [{ qty: "!", name: order.note }]
        : order.note && !orderItems.length
          ? []
          : []),
    ],
  };
}

export function mapTableForCard(table) {
  return {
    id: table.code || table.name,
    seats: table.capacity,
    status: table.status,
    shape: table.capacity <= 2 ? "circle" : "square",
    name: table.name,
  };
}

export function mapMenuItemForCard(item, categoryName = "") {
  const price = item.salePrice ?? item.price;
  return {
    id: item._id,
    name: item.name,
    category: categoryName || "—",
    price,
    priceLabel: formatCurrency(price),
    image:
      item.image ||
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
    status: item.isFeatured ? "Nổi bật" : item.status === "active" ? "Đang bán" : "Tắt",
    inStock: item.isAvailable !== false,
  };
}

export function mapReservationRow(reservation) {
  const tableLabel =
    typeof reservation.assignedTableId === "object" && reservation.assignedTableId
      ? reservation.assignedTableId.code || reservation.assignedTableId.name
      : reservation.assignedTableId || "—";

  const datePart = reservation.reservationDate
    ? new Date(reservation.reservationDate).toLocaleDateString("vi-VN")
  : "";

  return {
    id: reservation._id,
    name: reservation.customerName,
    guests: reservation.guestCount,
    table: tableLabel,
    time: `${datePart} ${reservation.reservationTime || ""}`.trim(),
    status: RESERVATION_STATUS_LABELS[reservation.status] || reservation.status,
    rawStatus: reservation.status,
    canAdvance: ["pending", "confirmed", "checked_in"].includes(reservation.status),
    canCancel: ["pending", "confirmed"].includes(reservation.status),
  };
}
