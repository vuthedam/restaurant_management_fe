/**
 * COMPONENT: ActiveSessionPanel
 * THUỘC: QuickSummary — Sơ đồ bàn (/admin/tables)
 * ĐỊA CHỈ FILE: table-order-ap/src/features/admin/components/tablemap/ActiveSessionPanel.jsx
 *
 * MÔ TẢ: Panel hiển thị và quản lý phiên bàn đang hoạt động:
 * thông tin khách, cập nhật số khách, chuyển bàn, thanh toán, hủy phiên.
 */

import { Link } from "react-router-dom";

export default function ActiveSessionPanel({
  session,
  table,
  guestCount,
  availableTablesForTransfer,
  transferTableId,
  onTransferTableChange,
  onTransferSubmit,
  onUpdateGuests,
  onPayment,
  onCancelSession,
  submitting,
}) {
  return (
    <>
      {/* Thông tin phiên */}
      <div className="text-sm border-l-4 border-orange-500 pl-3 py-1 bg-orange-50/50 rounded-r-lg">
        <p className="font-bold text-gray-800">
          Khách: {session.customerName || "Khách vãng lai"}
        </p>
        <p className="text-xs text-gray-600 mt-0.5">
          Bắt đầu:{" "}
          {new Date(session.startedAt).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {/* Số khách */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
          Số khách đang ngồi
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onUpdateGuests(guestCount - 1)}
            disabled={guestCount <= 1 || submitting}
            className="w-8 h-8 rounded-full border flex items-center justify-center font-bold text-lg hover:bg-gray-100 disabled:opacity-50"
          >
            -
          </button>
          <span className="text-base font-bold w-6 text-center">{guestCount}</span>
          <button
            type="button"
            onClick={() => onUpdateGuests(guestCount + 1)}
            disabled={guestCount >= 30 || submitting}
            className="w-8 h-8 rounded-full border flex items-center justify-center font-bold text-lg hover:bg-gray-100 disabled:opacity-50"
          >
            +
          </button>
        </div>
      </div>

      {/* Chuyển bàn */}
      <form onSubmit={onTransferSubmit} className="flex flex-col gap-2 border-t pt-4">
        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
          Chuyển sang bàn khác
        </span>
        <div className="flex gap-2">
          <select
            value={transferTableId}
            onChange={(e) => onTransferTableChange(e.target.value)}
            className="flex-1 border rounded-lg px-2.5 py-1.5 text-sm"
            required
            disabled={submitting}
          >
            <option value="">Chọn bàn trống...</option>
            {availableTablesForTransfer.map((t) => (
              <option key={t._id} value={t._id}>
                {t.code || t.name} ({t.capacity} chỗ)
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={!transferTableId || submitting}
            className="bg-black hover:bg-gray-800 text-white py-1.5 px-3 rounded-lg text-sm font-semibold transition disabled:opacity-60 flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">swap_horiz</span>
            Chuyển
          </button>
        </div>
      </form>

      {/* Actions */}
      <div className="flex flex-col gap-2 border-t pt-4">
        <button
          type="button"
          onClick={onPayment}
          disabled={submitting}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg text-sm font-bold transition disabled:opacity-60 flex items-center justify-center gap-1.5 shadow-sm"
        >
          <span className="material-symbols-outlined text-base">point_of_sale</span>
          Thanh toán
        </button>

        <a
          href={`/order?table=${table.qrToken}`}
          target="_blank"
          rel="noreferrer"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2.5 rounded-lg text-sm font-bold transition flex items-center justify-center gap-1.5 text-center"
        >
          <span className="material-symbols-outlined text-base">add_shopping_cart</span>
          Đặt món hộ khách
        </a>

        <Link
          to={`/admin/orders?tableId=${table._id}`}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2.5 rounded-lg text-sm font-bold transition flex items-center justify-center gap-1.5 text-center"
        >
          <span className="material-symbols-outlined text-base">restaurant_menu</span>
          Xem các đơn đặt món
        </Link>

        <button
          type="button"
          onClick={onCancelSession}
          disabled={submitting}
          className="w-full border border-red-200 text-red-600 hover:bg-red-50 py-2.5 rounded-lg text-sm font-bold transition disabled:opacity-60 flex items-center justify-center gap-1.5"
        >
          <span className="material-symbols-outlined text-base">cancel</span>
          Hủy phiên dùng bàn
        </button>
      </div>
    </>
  );
}
