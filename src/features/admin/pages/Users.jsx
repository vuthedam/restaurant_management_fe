/**
 * PAGE CONTAINER: Users.jsx (Staff Management)
 * TUYẾN ĐƯỜNG (ROUTE): /admin/users (Chỉ dành cho Admin)
 * ĐỊA CHỈ FILE: table-order-ap/src/features/admin/pages/Users.jsx
 *
 * MÔ TẢ:
 * Trang quản lý tài khoản nhân viên dành cho Admin.
 * Hiển thị danh sách nhân viên, vai trò, trạng thái hoạt động và lần đăng nhập gần nhất.
 * Cho phép thêm nhân viên mới, khóa/mở khóa tài khoản và xem hồ sơ chi tiết.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";
import AdminTable from "../components/common/AdminTable";
import UserFormModal from "../components/users/UserFormModal";
import { PageError, PageLoading } from "../components/common/PageState";
import useAdminList from "../hooks/useAdminList";
import { formatDateTime, USER_ROLE_LABELS } from "../utils/adminLabels";
import { getApiError, patchAdmin } from "../services/adminApi";

export default function Users() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const { items, loading, error, reload } = useAdminList("/users");
  const [actionError, setActionError] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const rows = items.map((item) => ({
    id: item._id,
    fullName: item.fullName || "—",
    email: item.email,
    role: USER_ROLE_LABELS[item.role] ?? item.role,
    status: item.isActive ? "Hoạt động" : "Khóa",
    isActive: item.isActive,
    lastLoginAt: formatDateTime(item.lastLoginAt),
  }));

  const handleToggleActive = async (row) => {
    if (!window.confirm(`Xác nhận ${row.isActive ? "khóa" : "mở khóa"} tài khoản của ${row.fullName}?`)) {
      return;
    }

    setActionError(null);
    setBusyId(row.id);
    try {
      await patchAdmin(`/users/${row.id}`, { isActive: !row.isActive });
      await reload();
    } catch (err) {
      setActionError(getApiError(err, "Không thể cập nhật trạng thái tài khoản."));
    } finally {
      setBusyId(null);
    }
  };

  const columns = [
    { key: "fullName", label: "Họ tên" },
    { key: "email", label: "Email" },
    { key: "role", label: "Vai trò" },
    {
      key: "status",
      label: "Trạng thái",
      render: (row) => (
        <span
          className={`rounded-full px-3 py-0.5 text-xs font-semibold border ${
            row.status === "Hoạt động"
              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
              : "bg-slate-50 text-slate-600 border-slate-200/60"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    { key: "lastLoginAt", label: "Đăng nhập gần nhất" },
    {
      key: "actions",
      label: "Hành động",
      className: "text-right",
      render: (row) => (
        <div className="flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate(`/admin/users/${row.id}`)}
            className="rounded-xl border border-orange-200 px-3.5 py-1.5 text-sm font-semibold text-orange-600 hover:bg-orange-50/50 hover:border-orange-300 transition-all duration-200 active:scale-[0.98]"
          >
            Xem
          </button>
          <button
            type="button"
            disabled={busyId === row.id}
            onClick={() => handleToggleActive(row)}
            className="rounded-xl bg-slate-100 px-3.5 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
          >
            {row.isActive ? "Khóa" : "Mở khóa"}
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout
      title="Quản lý nhân viên"
      actionLabel="Thêm nhân viên"
      onAction={() => setModalOpen(true)}
    >
      {loading ? <PageLoading /> : null}
      {!loading && error ? <PageError message={error} onRetry={reload} /> : null}
      {actionError ? <PageError message={actionError} onRetry={reload} /> : null}
      {!loading && !error ? (
        <AdminTable columns={columns} rows={rows} emptyMessage="Chưa có nhân viên." />
      ) : null}
      <UserFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={reload}
      />
    </AdminLayout>
  );
}
