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
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {profile.fullName || "—"}
                </h2>
                <p className="text-sm text-gray-500">
                  {USER_ROLE_LABELS[profile.role] ?? profile.role}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {!viewOwnProfile && (
                  <Link
                    to="/admin/users"
                    className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
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
                      className="rounded-lg border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-50"
                    >
                      Đổi mật khẩu
                    </button>
                    <button
                      type="button"
                      disabled={saving}
                      onClick={handleToggleActive}
                      className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-60"
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
                <div key={label} className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    {label}
                  </p>
                  <p
                    className={`mt-2 font-medium text-gray-900 ${large ? "text-3xl font-semibold text-orange-600" : "text-sm"}`}
                  >
                    {value || "—"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">
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
                <div key={label} className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    {label}
                  </p>
                  <p
                    className={`mt-2 text-sm font-medium text-gray-900 ${mono ? "break-all" : ""}`}
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
          <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700 mb-4">
            {passwordSuccess}
          </div>
        ) : null}
        {passwordError ? (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 mb-4">
            {passwordError}
          </div>
        ) : null}
        <form className="space-y-4" onSubmit={handleResetPassword}>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">
              Mật khẩu mới
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2"
              placeholder="Ít nhất 6 ký tự"
            />
          </label>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closePasswordModal}
              className="rounded-lg border px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
            >
              Huỷ
            </button>
            <button
              type="submit"
              disabled={passwordBusy}
              className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-60"
            >
              {passwordBusy ? "Đang lưu..." : "Đổi mật khẩu"}
            </button>
          </div>
        </form>
      </AdminModal>
    </AdminLayout>
  );
}
