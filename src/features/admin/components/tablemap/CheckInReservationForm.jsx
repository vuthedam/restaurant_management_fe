/**
 * COMPONENT: CheckInReservationForm
 * THUỘC: QuickSummary — Sơ đồ bàn (/admin/tables)
 * ĐỊA CHỈ FILE: table-order-ap/src/features/admin/components/tablemap/CheckInReservationForm.jsx
 *
 * MÔ TẢ: Form chọn đơn đặt bàn trước và check-in khách khi họ đến.
 */

export default function CheckInReservationForm({ reservations, selectedId, onSelect, onSubmit, submitting }) {
  if (reservations.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <h4 className="font-semibold text-sm text-slate-800 flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-base text-slate-500">event_available</span>
          Nhận đặt trước đến giờ
        </h4>
        <p className="text-xs text-slate-500 font-medium">Không có đơn đặt bàn nào chờ check-in.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <h4 className="font-semibold text-sm text-slate-800 flex items-center gap-2 mb-1">
        <span className="material-symbols-outlined text-base text-slate-500">event_available</span>
        Nhận đặt trước đến giờ
      </h4>
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <select
          value={selectedId}
          onChange={(e) => onSelect(e.target.value)}
          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white transition-all duration-200 text-slate-700"
          required
          disabled={submitting}
        >
          <option value="">Chọn đơn đặt bàn...</option>
          {reservations.map((r) => (
            <option key={r._id} value={r._id}>
              {r.customerName} ({r.guestCount} khách) - {r.reservationTime}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={!selectedId || submitting}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98] disabled:opacity-50"
        >
          Check-in nhận bàn
        </button>
      </form>
    </div>
  );
}
