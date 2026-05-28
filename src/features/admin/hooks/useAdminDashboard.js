import { useCallback, useEffect, useState } from "react";
import { fetchAdminList } from "../services/adminApi";
import { formatCurrency, ORDER_STATUS_LABELS } from "../utils/adminLabels";

export default function useAdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);
  const [payments, setPayments] = useState([]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [ordersResult, tablesResult, paymentsResult] = await Promise.allSettled([
        fetchAdminList("/orders"),
        fetchAdminList("/tables"),
        fetchAdminList("/payments"),
      ]);

      const ordersData =
        ordersResult.status === "fulfilled" ? ordersResult.value : [];
      const tablesData =
        tablesResult.status === "fulfilled" ? tablesResult.value : [];
      const paymentsData =
        paymentsResult.status === "fulfilled" ? paymentsResult.value : [];

      setOrders(Array.isArray(ordersData) ? ordersData : []);
      setTables(Array.isArray(tablesData) ? tablesData : []);
      setPayments(Array.isArray(paymentsData) ? paymentsData : []);

      // Chỉ báo lỗi khi tất cả endpoint đều fail; nếu fail 1 phần vẫn render dashboard.
      if (
        ordersResult.status === "rejected" &&
        tablesResult.status === "rejected" &&
        paymentsResult.status === "rejected"
      ) {
        throw ordersResult.reason || tablesResult.reason || paymentsResult.reason;
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

  const paidToday = payments.filter((p) => p.status === "paid");
  const revenue = paidToday.reduce((sum, p) => sum + (p.amount || 0), 0);
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
  };
}
