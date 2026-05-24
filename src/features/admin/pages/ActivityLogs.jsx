/**
 * PAGE CONTAINER: ActivityLogs.jsx (System Activity Log)
 * TUYẾN ĐƯỜNG (ROUTE): /admin/activity-logs (Chỉ dành cho Admin)
 * ĐỊA CHỈ FILE: table-order-ap/src/features/admin/pages/ActivityLogs.jsx
 *
 * MÔ TẢ:
 * Trang xem nhật ký hoạt động hệ thống dành cho Admin.
 * Ghi lại các hành động quan trọng (tạo/sửa/xóa đơn hàng, thanh toán, thay đổi menu...)
 * kèm loại đối tượng, mô tả và thời gian thực hiện.
 */

import AdminLayout from "../../../layouts/AdminLayout";
import AdminTable from "../components/common/AdminTable";
import { PageError, PageLoading } from "../components/common/PageState";
import useAdminList from "../hooks/useAdminList";
import { formatDateTime } from "../utils/adminLabels";

export default function ActivityLogs() {
  const { items, loading, error, reload } = useAdminList("/activity-logs");

  const rows = items.map((item) => ({
    id: item._id,
    action: item.action || "—",
    entityType: item.entityType || "—",
    description: item.description || "—",
    createdAt: formatDateTime(item.createdAt),
  }));

  const columns = [
    { key: "action", label: "Hành động" },
    { key: "entityType", label: "Loại đối tượng" },
    { key: "description", label: "Mô tả" },
    { key: "createdAt", label: "Thời gian" },
  ];

  return (
    <AdminLayout title="Nhật ký hoạt động">
      {loading ? <PageLoading /> : null}
      {!loading && error ? <PageError message={error} onRetry={reload} /> : null}
      {!loading && !error ? (
        <AdminTable columns={columns} rows={rows} emptyMessage="Chưa có nhật ký." />
      ) : null}
    </AdminLayout>
  );
}
