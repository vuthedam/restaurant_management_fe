/**
 * PAGE CONTAINER: Reviews.jsx (Customer Reviews)
 * TUYẾN ĐƯỜNG (ROUTE): /admin/reviews
 * ĐỊA CHỈ FILE: table-order-ap/src/features/admin/pages/Reviews.jsx
 *
 * MÔ TẢ:
 * Trang xem đánh giá và nhận xét của khách hàng sau khi dùng bữa.
 * Hiển thị số sao, nội dung nhận xét và thời gian gửi đánh giá.
 */

import AdminLayout from "../../../layouts/AdminLayout";
import AdminTable from "../components/common/AdminTable";
import { PageError, PageLoading } from "../components/common/PageState";
import useAdminList from "../hooks/useAdminList";
import { formatDateTime } from "../utils/adminLabels";

function Stars({ rating }) {
  return (
    <span className="text-orange-500" title={`${rating}/5`}>
      {"★".repeat(rating)}
      <span className="text-gray-300">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

export default function Reviews() {
  const { items, loading, error, reload } = useAdminList("/reviews");

  const rows = items.map((item) => ({
    id: item._id,
    rating: item.rating,
    comment: item.comment || "—",
    createdAt: formatDateTime(item.createdAt),
  }));

  const columns = [
    {
      key: "rating",
      label: "Đánh giá",
      render: (row) => <Stars rating={row.rating} />,
    },
    { key: "comment", label: "Nhận xét" },
    { key: "createdAt", label: "Thời gian" },
  ];

  return (
    <AdminLayout title="Đánh giá khách hàng">
      {loading ? <PageLoading /> : null}
      {!loading && error ? <PageError message={error} onRetry={reload} /> : null}
      {!loading && !error ? (
        <AdminTable columns={columns} rows={rows} emptyMessage="Chưa có đánh giá." />
      ) : null}
    </AdminLayout>
  );
}
