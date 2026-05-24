/**
 * PAGE CONTAINER: Customers.jsx (Customer List)
 * TUYẾN ĐƯỜNG (ROUTE): /admin/customers (Chỉ dành cho Admin)
 * ĐỊA CHỈ FILE: table-order-ap/src/features/admin/pages/Customers.jsx
 *
 * MÔ TẢ:
 * Trang thống kê và hiển thị danh sách thông tin khách hàng đã đăng ký hoặc được lưu vết
 * từ các phiên đặt bàn trước đó của nhà hàng. Hỗ trợ hiển thị tên, số điện thoại, email và ngày đăng ký.
 */

import AdminLayout from "../../../layouts/AdminLayout";
import AdminTable from "../components/common/AdminTable";
import { PageError, PageLoading } from "../components/common/PageState";
import useAdminList from "../hooks/useAdminList";
import { formatDateTime } from "../utils/adminLabels";

export default function Customers() {
  const { items, loading, error, reload } = useAdminList("/customers");

  const rows = items.map((item) => ({
    id: item._id,
    fullName: item.fullName,
    phone: item.phone,
    email: item.email || "—",
    createdAt: formatDateTime(item.createdAt),
  }));

  const columns = [
    { key: "fullName", label: "Họ tên" },
    { key: "phone", label: "Số điện thoại" },
    { key: "email", label: "Email" },
    { key: "createdAt", label: "Ngày tạo" },
  ];

  return (
    <AdminLayout title="Khách hàng">
      {loading ? <PageLoading /> : null}
      {!loading && error ? <PageError message={error} onRetry={reload} /> : null}
      {!loading && !error ? (
        <AdminTable columns={columns} rows={rows} emptyMessage="Chưa có khách hàng." />
      ) : null}
    </AdminLayout>
  );
}
