/**
 * PAGE CONTAINER: Dashboard.jsx
 * TUYẾN ĐƯỜNG (ROUTE): /admin/dashboard
 * ĐỊA CHỈ FILE: table-order-ap/src/features/admin/pages/Dashboard.jsx
 *
 * MÔ TẢ:
 * Bảng điều khiển tổng quan (Dashboard) phân tích hoạt động của nhà hàng dành cho Admin.
 * Tổng hợp các số liệu thống kê chủ chốt (Doanh thu đã thanh toán, Tổng đơn hàng,
 * Tỷ lệ lấp đầy bàn ăn), biểu đồ xu hướng doanh thu, món ăn bán chạy nhất (Top Menu)
 * và danh sách các đơn hàng gần đây nhất.
 */

import AdminLayout from "../../../layouts/AdminLayout";
import StatCard from "../components/dashboard/StatCard";
import SalesChart from "../components/dashboard/SalesChart";
import TopMenuItems from "../components/dashboard/TopMenuItems";
import RecentOrders from "../components/dashboard/RecentOrders";
import { PageError, PageLoading } from "../components/common/PageState";
import useAdminDashboard from "../hooks/useAdminDashboard";

export default function Dashboard() {
  const { loading, error, reload, stats, recentOrders } = useAdminDashboard();

  return (
    <AdminLayout title="Tổng quan">
      {loading ? <PageLoading /> : null}
      {!loading && error ? <PageError message={error} onRetry={reload} /> : null}

      {!loading && !error ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="Doanh thu (đã thanh toán)"
              value={stats.revenue}
              sub="Từ giao dịch paid"
            />
            <StatCard
              title="Tổng đơn hàng"
              value={stats.orderCount}
              sub="Trong hệ thống"
            />
            <StatCard
              title="Tỷ lệ lấp đầy"
              value={stats.occupancy}
              sub={stats.occupancySub}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <SalesChart />
            </div>
            <TopMenuItems />
          </div>

          <RecentOrders orders={recentOrders} />
        </div>
      ) : null}
    </AdminLayout>
  );
}
