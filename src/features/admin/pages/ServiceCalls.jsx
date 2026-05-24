/**
 * PAGE CONTAINER: ServiceCalls.jsx (Service Request Management)
 * TUYẾN ĐƯỜNG (ROUTE): /admin/service-calls
 * ĐỊA CHỈ FILE: table-order-ap/src/features/admin/pages/ServiceCalls.jsx
 *
 * MÔ TẢ:
 * Trang theo dõi các yêu cầu gọi phục vụ từ khách hàng (gọi nhân viên, yêu cầu thanh toán,
 * thêm nước, dọn bàn...). Hiển thị loại yêu cầu, trạng thái xử lý và thời gian gửi.
 */

import AdminLayout from "../../../layouts/AdminLayout";
import AdminTable from "../components/common/AdminTable";
import { PageError, PageLoading } from "../components/common/PageState";
import useAdminList from "../hooks/useAdminList";
import {
  formatDateTime,
  SERVICE_CALL_STATUS_LABELS,
  SERVICE_CALL_TYPE_LABELS,
} from "../utils/adminLabels";

export default function ServiceCalls() {
  const { items, loading, error, reload } = useAdminList("/service-calls");

  const rows = items.map((item) => ({
    id: item._id,
    tableId: item.tableId?.code || item.tableId?.name || item.tableId || "—",
    type: SERVICE_CALL_TYPE_LABELS[item.type] ?? item.type,
    status: SERVICE_CALL_STATUS_LABELS[item.status] ?? item.status,
    note: item.note || "—",
    createdAt: formatDateTime(item.createdAt),
  }));

  const columns = [
    { key: "tableId", label: "Bàn" },
    { key: "type", label: "Loại yêu cầu" },
    {
      key: "status",
      label: "Trạng thái",
      render: (row) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            row.status === "Chờ xử lý"
              ? "bg-red-100 text-red-700"
              : row.status === "Hoàn thành"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    { key: "note", label: "Ghi chú" },
    { key: "createdAt", label: "Thời gian" },
  ];

  return (
    <AdminLayout title="Gọi phục vụ">
      {loading ? <PageLoading /> : null}
      {!loading && error ? <PageError message={error} onRetry={reload} /> : null}
      {!loading && !error ? (
        <AdminTable columns={columns} rows={rows} emptyMessage="Không có yêu cầu phục vụ." />
      ) : null}
    </AdminLayout>
  );
}
