import { useState } from "react";
import AdminModal from "../common/AdminModal";
import { getApiError, postAdmin } from "../../services/adminApi";
import { uniqueSlug } from "../../utils/adminWorkflow";

const emptyForm = {
  categoryId: "",
  name: "",
  price: "",
  description: "",
  image: "",
};

export default function MenuItemFormModal({ open, onClose, categories = [], onSuccess }) {
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
      await postAdmin("/menu-items", {
        categoryId: form.categoryId,
        name: form.name.trim(),
        slug: uniqueSlug(form.name),
        description: form.description.trim() || null,
        image: form.image.trim() || null,
        price: Number(form.price),
        isAvailable: true,
        status: "active",
      });
      handleClose();
      onSuccess?.();
    } catch (err) {
      setError(getApiError(err, "Không thêm được món."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminModal open={open} title="Thêm món mới" onClose={handleClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error ? (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 font-medium">
            {error}
          </p>
        ) : null}

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Danh mục *</span>
          <select
            required
            value={form.categoryId}
            onChange={(e) => setField("categoryId", e.target.value)}
            className="mt-1 w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
          >
            <option value="">Chọn danh mục</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Tên món *</span>
          <input
            required
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            className="mt-1 w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Giá (VND) *</span>
          <input
            required
            type="number"
            min={0}
            value={form.price}
            onChange={(e) => setField("price", e.target.value)}
            className="mt-1 w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">URL ảnh</span>
          <input
            type="url"
            value={form.image}
            onChange={(e) => setField("image", e.target.value)}
            className="mt-1 w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            placeholder="https://..."
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Mô tả</span>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            className="mt-1 w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
          />
        </label>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-all cursor-pointer"
          >
            Huỷ
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all disabled:opacity-60 shadow-sm"
          >
            {submitting ? "Đang lưu..." : "Thêm món"}
          </button>
        </div>
      </form>
    </AdminModal>
  );
}
