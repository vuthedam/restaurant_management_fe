/**
 * PAGE CONTAINER: Payments.jsx (Payment History)
 * TUYẾN ĐƯỜNG (ROUTE): /admin/payments (Chỉ dành cho Admin)
 * ĐỊA CHỈ FILE: table-order-ap/src/features/admin/pages/Payments.jsx
 *
 * MÔ TẢ:
 * Trang quản lý lịch sử giao dịch và hóa đơn thanh toán của nhà hàng dành cho Admin.
 * Hiển thị mã giao dịch, tổng số tiền thanh toán, phương thức sử dụng (tiền mặt, chuyển khoản QR),
 * trạng thái giao dịch và mốc thời gian hoàn thành thanh toán.
 */

import AdminLayout from "../../../layouts/AdminLayout";
import AdminTable from "../components/common/AdminTable";
import { PageError, PageLoading } from "../components/common/PageState";
import useAdminList from "../hooks/useAdminList";
import {
  formatCurrency,
  formatDateTime,
  PAYMENT_METHOD_LABELS,
  PAYMENT_STATUS_LABELS,
} from "../utils/adminLabels";

export default function Payments() {
  const { items, loading, error, reload } = useAdminList("/payments");

  const rows = items.map((item) => ({
    id: item._id,
    paymentCode: item.paymentCode,
    amount: formatCurrency(item.amount),
    method: PAYMENT_METHOD_LABELS[item.method] ?? item.method,
    status: PAYMENT_STATUS_LABELS[item.status] ?? item.status,
    paidAt: formatDateTime(item.paidAt),
  }));

  const columns = [
    { key: "paymentCode", label: "Mã thanh toán" },
    { key: "amount", label: "Số tiền" },
    { key: "method", label: "Phương thức" },
    {
      key: "status",
      label: "Trạng thái",
      render: (row) => (
        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
          {row.status}
        </span>
      ),
    },
    { key: "paidAt", label: "Thời gian thanh toán" },
  ];

  return (
    <AdminLayout title="Thanh toán">
      {loading ? <PageLoading /> : null}
      {!loading && error ? <PageError message={error} onRetry={reload} /> : null}
      {!loading && !error ? (
        <AdminTable columns={columns} rows={rows} emptyMessage="Chưa có giao dịch thanh toán." />
      ) : null}
    </AdminLayout>
  );
}
