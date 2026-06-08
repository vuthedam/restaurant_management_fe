/**
 * PAGE CONTAINER: UserProfile.jsx (Staff Profile)
 * TUYẾN ĐƯỜNG (ROUTE): /admin/users/:id | /admin/profile
 * ĐỊA CHỈ FILE: table-order-ap/src/features/admin/pages/UserProfile.jsx
 *
 * MÔ TẢ:
 * Trang xem hồ sơ chi tiết của nhân viên hoặc hồ sơ cá nhân của người dùng đang đăng nhập.
 * Admin có thể khóa/mở khóa tài khoản nhân viên từ trang này.
 */

import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";
import AdminModal from "../components/common/AdminModal";
import { PageError, PageLoading } from "../components/common/PageState";
import { fetchAdminItem, getApiError, patchAdmin } from "../services/adminApi";
import { formatDateTime, USER_ROLE_LABELS } from "../utils/adminLabels";
import { useAuth } from "../../../contexts/AuthContext";

export default function UserProfile() {
  const { id } = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);
  const [passwordBusy, setPasswordBusy] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const isAdmin = user?.role === "admin";
  const viewOwnProfile = !id;
  const apiPath = viewOwnProfile ? "/users/me" : `/users/${id}`;

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminItem(apiPath);
      setProfile(data);
    } catch (err) {
      setError(getApiError(err, "Không tải được thông tin nhân viên."));
    } finally {
      setLoading(false);
    }
  }, [apiPath]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleToggleActive = async () => {
    if (!profile) return;
    if (
      !window.confirm(
        `Xác nhận ${profile.isActive ? "khóa" : "mở khóa"} tài khoản này?`,
      )
    )
      return;
    setSaving(true);
    setError(null);
    try {
      await patchAdmin(`/users/${profile._id}`, {
        isActive: !profile.isActive,
      });
      const data = await fetchAdminItem(apiPath);
      setProfile(data);
    } catch (err) {
      setError(getApiError(err, "Không thể cập nhật trạng thái tài khoản."));
    } finally {
      setSaving(false);
    }
  };

  const openPasswordModal = () => {
    setPasswordModalOpen(true);
    setPassword("");
    setPasswordError(null);
    setPasswordSuccess(null);
  };

  const closePasswordModal = () => {
    setPasswordModalOpen(false);
    setPassword("");
    setPasswordError(null);
    setPasswordSuccess(null);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);
    if (!password || password.length < 6) {
      setPasswordError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    setPasswordBusy(true);
    try {
      await patchAdmin(`/users/${profile._id}/password`, { password });
      setPassword("");
      setPasswordSuccess("Đổi mật khẩu thành công.");
      setPasswordModalOpen(false);
    } catch (err) {
      setPasswordError(getApiError(err, "Không thể đổi mật khẩu."));
    } finally {
      setPasswordBusy(false);
    }
  };

  const title = viewOwnProfile ? "Hồ sơ cá nhân" : "Thông tin nhân viên";

  return (
    <AdminLayout title={title}>
      {loading ? <PageLoading /> : null}
      {!loading && error ? (
        <PageError message={error} onRetry={loadProfile} />
      ) : null}
      {!loading && profile ? (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {profile.fullName || "—"}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {USER_ROLE_LABELS[profile.role] ?? profile.role}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {!viewOwnProfile && (
                  <Link
                    to="/admin/users"
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-800 transition-colors active:scale-[0.98]"
                  >
                    Quay lại danh sách
                  </Link>
                )}
                {isAdmin && !viewOwnProfile && (
                  <>
                    <button
                      type="button"
                      disabled={saving}
                      onClick={openPasswordModal}
                      className="rounded-xl border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50/50 hover:border-orange-300 transition-all duration-200 active:scale-[0.98]"
                    >
                      Đổi mật khẩu
                    </button>
                    <button
                      type="button"
                      disabled={saving}
                      onClick={handleToggleActive}
                      className={`rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98] disabled:opacity-50 shadow-sm hover:shadow ${
                        profile.isActive
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-emerald-500 hover:bg-emerald-600"
                      }`}
                    >
                      {profile.isActive
                        ? "Khóa tài khoản"
                        : "Mở khóa tài khoản"}
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "Email", value: profile.email },
                { label: "Số điện thoại", value: profile.phone },
                {
                  label: "Trạng thái",
                  value: profile.isActive ? "Hoạt động" : "Khóa",
                },
                {
                  label: "Đăng nhập gần nhất",
                  value: formatDateTime(profile.lastLoginAt),
                },
                {
                  label: "Ngày làm việc tháng này",
                  value: profile.workDaysThisMonth ?? 0,
                  large: true,
                },
              ].map(({ label, value, large }) => (
                <div key={label} className="rounded-xl bg-slate-50/50 border border-slate-100 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    {label}
                  </p>
                  <p
                    className={`mt-2 font-semibold text-slate-800 ${large ? "text-3xl text-orange-500" : "text-sm"}`}
                  >
                    {value || "—"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              Thông tin chi tiết
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "Họ tên", value: profile.fullName },
                {
                  label: "Vai trò",
                  value: USER_ROLE_LABELS[profile.role] ?? profile.role,
                },
                { label: "ID tài khoản", value: profile._id, mono: true },
              ].map(({ label, value, mono }) => (
                <div key={label} className="rounded-xl bg-slate-50/50 border border-slate-100 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    {label}
                  </p>
                  <p
                    className={`mt-2 text-sm font-semibold text-slate-800 ${mono ? "break-all font-mono text-xs text-slate-600 bg-slate-100/60 p-1.5 rounded-lg border border-slate-200/40" : ""}`}
                  >
                    {value || "—"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      <AdminModal
        open={passwordModalOpen}
        title="Đổi mật khẩu nhân viên"
        onClose={closePasswordModal}
      >
        {passwordSuccess ? (
          <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-sm text-emerald-700 mb-4 font-medium">
            {passwordSuccess}
          </div>
        ) : null}
        {passwordError ? (
          <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700 mb-4 font-medium">
            {passwordError}
          </div>
        ) : null}
        <form className="space-y-4" onSubmit={handleResetPassword}>
          <label className="block">
            <span className="text-sm font-medium text-slate-600">
              Mật khẩu mới
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white transition-all duration-200"
              placeholder="Ít nhất 6 ký tự"
            />
          </label>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closePasswordModal}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-800 transition-colors active:scale-[0.98]"
            >
              Huỷ
            </button>
            <button
              type="submit"
              disabled={passwordBusy}
              className="rounded-xl bg-orange-500 hover:bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98] disabled:opacity-50"
            >
              {passwordBusy ? "Đang lưu..." : "Đổi mật khẩu"}
            </button>
          </div>
        </form>
      </AdminModal>
    </AdminLayout>
  );
}
