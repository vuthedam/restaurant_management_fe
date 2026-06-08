import { useState } from "react";
import AdminModal from "../common/AdminModal";
import { getApiError, postAdmin } from "../../services/adminApi";
import { generateReservationCode } from "../../utils/adminWorkflow";

const SOURCE_OPTIONS = [
  { value: "phone", label: "Điện thoại" },
  { value: "walk_in", label: "Khách walk-in" },
  { value: "website", label: "Website" },
  { value: "facebook", label: "Facebook" },
  { value: "zalo", label: "Zalo" },
];

const emptyForm = {
  customerName: "",
  phone: "",
  guestCount: "2",
  reservationDate: "",
  reservationTime: "",
  assignedTableId: "",
  source: "phone",
  note: "",
};

export default function ReservationFormModal({ open, onClose, tables = [], onSuccess }) {
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
      const date = new Date(`${form.reservationDate}T${form.reservationTime || "00:00"}`);
      await postAdmin("/reservations", {
        reservationCode: generateReservationCode(),
        customerName: form.customerName.trim(),
        phone: form.phone.trim(),
        guestCount: Number(form.guestCount),
        reservationDate: date.toISOString(),
        reservationTime: form.reservationTime,
        assignedTableId: form.assignedTableId || null,
        source: form.source,
        note: form.note.trim() || null,
        status: "pending",
      });
      handleClose();
      onSuccess?.();
    } catch (err) {
      setError(getApiError(err, "Không tạo được đặt bàn."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminModal open={open} title="Đặt bàn mới" onClose={handleClose} wide>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error ? (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 font-medium">
            {error}
          </p>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Tên khách *</span>
            <input
              required
              value={form.customerName}
              onChange={(e) => setField("customerName", e.target.value)}
              className="mt-1 w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Số điện thoại *</span>
            <input
              required
              type="tel"
              minLength={9}
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              className="mt-1 w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Số khách *</span>
            <input
              required
              type="number"
              min={1}
              max={30}
              value={form.guestCount}
              onChange={(e) => setField("guestCount", e.target.value)}
              className="mt-1 w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Ngày *</span>
            <input
              required
              type="date"
              value={form.reservationDate}
              onChange={(e) => setField("reservationDate", e.target.value)}
              className="mt-1 w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Giờ *</span>
            <input
              required
              type="time"
              value={form.reservationTime}
              onChange={(e) => setField("reservationTime", e.target.value)}
              className="mt-1 w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Bàn (tuỳ chọn)</span>
            <select
              value={form.assignedTableId}
              onChange={(e) => setField("assignedTableId", e.target.value)}
              className="mt-1 w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            >
              <option value="">Chưa gán bàn</option>
              {tables.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.code || t.name} ({t.capacity} chỗ)
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Nguồn</span>
            <select
              value={form.source}
              onChange={(e) => setField("source", e.target.value)}
              className="mt-1 w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            >
              {SOURCE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Ghi chú</span>
          <textarea
            rows={2}
            value={form.note}
            onChange={(e) => setField("note", e.target.value)}
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
            {submitting ? "Đang lưu..." : "Tạo đặt bàn"}
          </button>
        </div>
      </form>
    </AdminModal>
  );
}
