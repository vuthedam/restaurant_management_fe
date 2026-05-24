/**
 * COMPONENT: ReservationConfirmModal.jsx
 * THUỘC TRANG: Reservation (/admin/reservations)
 * ĐỊA CHỈ FILE: table-order-ap/src/features/admin/components/reservation/ReservationConfirmModal.jsx
 *
 * MÔ TẢ:
 * Modal xác nhận đặt bàn và gán bàn trống phù hợp cho khách.
 * Hiển thị danh sách bàn có sức chứa đủ và đề xuất bàn phù hợp nhất lên đầu.
 */

import AdminModal from "../common/AdminModal";

export default function ReservationConfirmModal({
  open,
  onClose,
  tables,
  guestCount,
  selectedTableId,
  onTableChange,
  onConfirm,
  busy,
}) {
  const sorted = [...tables]
    .map((t) => {
      const isAvailable = t.status === "available";
      const hasCapacity = Number(t.capacity) >= Number(guestCount);
      const isRecommended = isAvailable && hasCapacity;

      let statusText = "Trống";
      if (t.status === "occupied") statusText = "Đang có khách";
      if (t.status === "reserved") statusText = "Đã đặt";
      if (t.status === "waiting_payment") statusText = "Chờ thanh toán";
      if (t.status === "inactive") statusText = "Ngừng hoạt động";

      return {
        ...t,
        isRecommended,
        label: `${t.code || t.name} (${t.capacity} người - ${statusText})${isRecommended ? " — ĐỀ XUẤT" : ""}`,
      };
    })
    .sort((a, b) => (a.isRecommended === b.isRecommended ? 0 : a.isRecommended ? -1 : 1));

  return (
    <AdminModal open={open} title="Xác nhận đặt bàn & Gán bàn" onClose={onClose}>
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Vui lòng chọn một bàn phù hợp để xác nhận yêu cầu đặt bàn này.
        </p>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Chọn bàn *</span>
          <select
            value={selectedTableId}
            onChange={(e) => onTableChange(e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2 bg-white"
            required
          >
            <option value="">-- Chọn bàn cho khách --</option>
            {sorted.map((t) => (
              <option key={t._id} value={t._id}>
                {t.label}
              </option>
            ))}
          </select>
        </label>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 cursor-pointer"
          >
            Huỷ
          </button>
          <button
            type="button"
            disabled={!selectedTableId || busy}
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-green-600 text-white font-semibold disabled:opacity-60 hover:bg-green-700 shadow-md cursor-pointer"
          >
            {busy ? "Đang lưu..." : "Xác nhận & Gán bàn"}
          </button>
        </div>
      </div>
    </AdminModal>
  );
}
