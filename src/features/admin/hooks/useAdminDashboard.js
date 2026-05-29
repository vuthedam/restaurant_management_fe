import { useCallback, useEffect, useState } from "react";
import { fetchAdminList } from "../services/adminApi";
import { formatCurrency, ORDER_STATUS_LABELS } from "../utils/adminLabels";

export default function useAdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);
  const [payments, setPayments] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [ordersResult, tablesResult, paymentsResult, orderItemsResult] =
        await Promise.allSettled([
          fetchAdminList("/orders"),
          fetchAdminList("/tables"),
          fetchAdminList("/payments"),
          fetchAdminList("/order-items"),
        ]);

      const ordersData =
        ordersResult.status === "fulfilled" ? ordersResult.value : [];
      const tablesData =
        tablesResult.status === "fulfilled" ? tablesResult.value : [];
      const paymentsData =
        paymentsResult.status === "fulfilled" ? paymentsResult.value : [];
      const orderItemsData =
        orderItemsResult.status === "fulfilled" ? orderItemsResult.value : [];

      setOrders(Array.isArray(ordersData) ? ordersData : []);
      setTables(Array.isArray(tablesData) ? tablesData : []);
      setPayments(Array.isArray(paymentsData) ? paymentsData : []);
      setOrderItems(Array.isArray(orderItemsData) ? orderItemsData : []);

      // Chỉ báo lỗi khi tất cả endpoint đều fail; nếu fail 1 phần vẫn render dashboard.
      if (
        ordersResult.status === "rejected" &&
        tablesResult.status === "rejected" &&
        paymentsResult.status === "rejected" &&
        orderItemsResult.status === "rejected"
      ) {
        throw (
          ordersResult.reason ||
          tablesResult.reason ||
          paymentsResult.reason ||
          orderItemsResult.reason
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Không tải được dữ liệu tổng quan. Kiểm tra backend.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const paidPayments = payments.filter((p) => p.status === "paid");
  const revenueRecords =
    paidPayments.length > 0
      ? paidPayments
      : orders
          .filter((o) => o.status === "completed")
          .map((o) => ({
            status: "paid",
            amount: o.finalAmount ?? o.subtotal ?? 0,
            paidAt: o.updatedAt || o.createdAt,
            createdAt: o.createdAt,
          }));

  const revenue = revenueRecords.reduce((sum, p) => sum + Number(p.amount || 0), 0);
  const activeTables = tables.filter(
    (t) => t.status === "occupied" || t.status === "waiting_payment",
  ).length;
  const totalTables = tables.filter((t) => t.status !== "inactive").length;
  const occupancy =
    totalTables > 0 ? Math.round((activeTables / totalTables) * 100) : 0;

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
    .map((o) => ({
      id: o.orderNumber || o._id,
      customer: o.note || "Khách tại bàn",
      items: "—",
      total: formatCurrency(o.finalAmount),
      status: ORDER_STATUS_LABELS[o.status] || o.status,
    }));

  const now = new Date();
  const dayLabels = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const weekRevenueByDay = Array.from({ length: 7 }).map((_, idx) => {
    const day = new Date(now);
    day.setHours(0, 0, 0, 0);
    day.setDate(now.getDate() - (6 - idx));
    const nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);

    const value = revenueRecords
      .filter((p) => {
        const paidAt = p.paidAt || p.createdAt;
        if (!paidAt) return false;
        const time = new Date(paidAt).getTime();
        return time >= day.getTime() && time < nextDay.getTime();
      })
      .reduce((sum, p) => sum + Number(p.amount || 0), 0);

    return {
      label: dayLabels[day.getDay()],
      value,
    };
  });

  const topMenuItems = Object.values(
    orderItems
      .filter((item) => item.status !== "cancelled")
      .reduce((acc, item) => {
        const key = String(item.menuItemId?._id || item.menuItemId || item.name || "");
        if (!key) return acc;
        if (!acc[key]) {
          acc[key] = {
            id: key,
            name: item.name || item.menuItemId?.name || "Món chưa rõ",
            quantity: 0,
            revenue: 0,
          };
        }
        acc[key].quantity += Number(item.quantity || 0);
        acc[key].revenue += Number(item.subtotal || 0);
        return acc;
      }, {}),
  )
    .sort((a, b) => b.quantity - a.quantity || b.revenue - a.revenue)
    .slice(0, 5)
    .map((item) => ({
      ...item,
      sold: `${item.quantity} phần`,
      price: formatCurrency(item.revenue),
    }));

  return {
    loading,
    error,
    reload: load,
    stats: {
      revenue: formatCurrency(revenue),
      orderCount: String(orders.length),
      occupancy: `${occupancy}%`,
      occupancySub:
        totalTables > 0 ? `${activeTables} / ${totalTables} bàn` : "Chưa có bàn",
    },
    recentOrders,
    weekRevenueByDay,
    topMenuItems,
  };
}
