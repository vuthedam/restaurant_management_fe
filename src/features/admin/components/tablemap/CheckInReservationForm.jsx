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
        <h4 className="font-bold text-sm text-gray-800 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-base">event_available</span>
          Nhận đặt trước đến giờ
        </h4>
        <p className="text-xs text-gray-500">Không có đơn đặt bàn nào chờ check-in.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <h4 className="font-bold text-sm text-gray-800 flex items-center gap-1.5">
        <span className="material-symbols-outlined text-base">event_available</span>
        Nhận đặt trước đến giờ
      </h4>
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <select
          value={selectedId}
          onChange={(e) => onSelect(e.target.value)}
          className="w-full border rounded-lg px-2.5 py-2 text-sm"
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
          className="bg-green-600 hover:bg-green-700 text-white py-1.5 px-3 rounded-lg text-sm font-semibold transition disabled:opacity-60"
        >
          Check-in nhận bàn
        </button>
      </form>
    </div>
  );
}
