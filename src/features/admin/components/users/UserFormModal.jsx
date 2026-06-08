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
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3.5 py-2.5 font-medium">
            {error}
          </p>
        ) : null}

        <label className="block">
          <span className="text-sm font-medium text-slate-600">Họ tên *</span>
          <input
            required
            value={form.fullName}
            onChange={(e) => setField("fullName", e.target.value)}
            className="mt-1.5 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white transition-all duration-200"
            placeholder="Nhập họ tên"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-600">Email *</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            className="mt-1.5 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white transition-all duration-200"
            placeholder="example@domain.com"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-600">Số điện thoại</span>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setField("phone", e.target.value)}
            className="mt-1.5 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white transition-all duration-200"
            placeholder="Nhập số điện thoại"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-600">Mật khẩu *</span>
          <input
            required
            type="password"
            minLength={6}
            value={form.password}
            onChange={(e) => setField("password", e.target.value)}
            className="mt-1.5 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white transition-all duration-200"
            placeholder="Ít nhất 6 ký tự"
          />
        </label>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 border border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-800 transition-colors"
          >
            Huỷ
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all duration-200 shadow-sm active:scale-[0.98] disabled:opacity-50"
          >
            {submitting ? "Đang lưu..." : "Thêm nhân viên"}
          </button>
        </div>
      </form>
    </AdminModal>
  );
}
