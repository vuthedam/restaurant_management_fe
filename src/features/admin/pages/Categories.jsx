/**
 * PAGE CONTAINER: Categories.jsx (Menu Category Management)
 * TUYẾN ĐƯỜNG (ROUTE): /admin/categories (Chỉ dành cho Admin)
 * ĐỊA CHỈ FILE: table-order-ap/src/features/admin/pages/Categories.jsx
 *
 * MÔ TẢ:
 * Trang quản lý danh mục thực đơn (ví dụ: Khai vị, Món chính, Đồ uống...).
 * Hiển thị bảng thông tin danh mục, sắp xếp thứ tự hiển thị, slug và trạng thái hoạt động.
 * Cho phép Admin thêm mới hoặc cấu hình danh mục phục vụ cho khách hàng đặt món.
 */

import AdminLayout from "../../../layouts/AdminLayout";
import AdminTable from "../components/common/AdminTable";
import { PageError, PageLoading } from "../components/common/PageState";
import useAdminList from "../hooks/useAdminList";
import { CATEGORY_STATUS_LABELS } from "../utils/adminLabels";

export default function Categories() {
  const { items, loading, error, reload } = useAdminList("/categories");

  const rows = items.map((item) => ({
    id: item._id,
    name: item.name,
    slug: item.slug,
    sortOrder: item.sortOrder ?? 0,
    status: CATEGORY_STATUS_LABELS[item.status] ?? item.status,
  }));

  const columns = [
    { key: "name", label: "Tên danh mục" },
    { key: "slug", label: "Slug" },
    { key: "sortOrder", label: "Thứ tự" },
    {
      key: "status",
      label: "Trạng thái",
      render: (row) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            row.status === "Đang dùng"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <AdminLayout title="Danh mục món" actionLabel="Thêm danh mục">
      {loading ? <PageLoading /> : null}
      {!loading && error ? <PageError message={error} onRetry={reload} /> : null}
      {!loading && !error ? (
        <AdminTable columns={columns} rows={rows} emptyMessage="Chưa có danh mục nào." />
      ) : null}
    </AdminLayout>
  );
}
