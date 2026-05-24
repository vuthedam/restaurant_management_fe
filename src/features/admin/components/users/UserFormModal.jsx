import { useState } from "react";
import AdminModal from "../common/AdminModal";
import { getApiError, postAdmin } from "../../services/adminApi";

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
};

export default function UserFormModal({ open, onClose, onSuccess }) {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleClose = () => {
    setForm(emptyForm);
    setError(null);
    onClose?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await postAdmin("/users", {
        fullName: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim() || undefined,
        password: form.password,
        role: "staff",
        isActive: true,
      });
      handleClose();
      onSuccess?.();
    } catch (err) {
      setError(getApiError(err, "Không thể thêm nhân viên mới."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminModal open={open} title="Thêm nhân viên" onClose={handleClose} wide>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error ? (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        ) : null}

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Họ tên *</span>
          <input
            required
            value={form.fullName}
            onChange={(e) => setField("fullName", e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2"
            placeholder="Nhập họ tên"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Email *</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2"
            placeholder="example@domain.com"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Số điện thoại</span>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setField("phone", e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2"
            placeholder="Nhập số điện thoại"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Mật khẩu *</span>
          <input
            required
            type="password"
            minLength={6}
            value={form.password}
            onChange={(e) => setField("password", e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2"
            placeholder="Ít nhất 6 ký tự"
          />
        </label>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 rounded-lg border font-medium"
          >
            Huỷ
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 rounded-lg bg-orange-600 text-white font-semibold disabled:opacity-60"
          >
            {submitting ? "Đang lưu..." : "Thêm nhân viên"}
          </button>
        </div>
      </form>
    </AdminModal>
  );
}
