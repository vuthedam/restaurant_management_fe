import { useCallback, useEffect, useState } from "react";
import { fetchAdminList } from "../services/adminApi";
import { formatCurrency, ORDER_STATUS_LABELS } from "../utils/adminLabels";
import { mapOrderToCard } from "../utils/adminMappers";

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
      const [ordersData, tablesData, paymentsData] = await Promise.all([
        fetchAdminList("/orders"),
        fetchAdminList("/tables"),
        fetchAdminList("/payments"),
      ]);
      setOrders(Array.isArray(ordersData) ? ordersData : []);
      setTables(Array.isArray(tablesData) ? tablesData : []);
      setPayments(Array.isArray(paymentsData) ? paymentsData : []);
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
  const activeTables = tables.filter((t) => t.status === "occupied").length;
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

  const orderCards = orders
    .filter((o) => !["completed", "cancelled"].includes(o.status))
    .slice(0, 6)
    .map(mapOrderToCard);

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
    orderCards,
  };
}
