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
      <div className="text-sm border-l-4 border-orange-500 pl-4 py-2 bg-orange-50/40 rounded-r-xl">
        <p className="font-semibold text-slate-800">
          Khách: {session.customerName || "Khách vãng lai"}
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Bắt đầu:{" "}
          {new Date(session.startedAt).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {/* Số khách */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Số khách đang ngồi
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onUpdateGuests(guestCount - 1)}
            disabled={guestCount <= 1 || submitting}
            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-150 disabled:opacity-50 active:scale-95"
          >
            -
          </button>
          <span className="text-base font-semibold w-6 text-center text-slate-800">{guestCount}</span>
          <button
            type="button"
            onClick={() => onUpdateGuests(guestCount + 1)}
            disabled={guestCount >= 30 || submitting}
            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-150 disabled:opacity-50 active:scale-95"
          >
            +
          </button>
        </div>
      </div>

      {/* Chuyển bàn */}
      <form onSubmit={onTransferSubmit} className="flex flex-col gap-2 border-t border-slate-100 pt-4">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Chuyển sang bàn khác
        </span>
        <div className="flex gap-2">
          <select
            value={transferTableId}
            onChange={(e) => onTransferTableChange(e.target.value)}
            className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white transition-all duration-200 text-slate-700"
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
            className="bg-slate-900 hover:bg-slate-800 text-white py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 flex items-center gap-1 shadow-sm active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-sm">swap_horiz</span>
            Chuyển
          </button>
        </div>
      </form>

      {/* Actions */}
      <div className="flex flex-col gap-2 border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={onPayment}
          disabled={submitting}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm hover:shadow active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-base">point_of_sale</span>
          Thanh toán
        </button>

        <a
          href={`/order?table=${table.qrToken}`}
          target="_blank"
          rel="noreferrer"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-center shadow-sm hover:shadow active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-base">add_shopping_cart</span>
          Đặt món hộ khách
        </a>

        <Link
          to={`/admin/orders?tableId=${table._id}`}
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-center active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-base">restaurant_menu</span>
          Xem các đơn đặt món
        </Link>

        <button
          type="button"
          onClick={onCancelSession}
          disabled={submitting}
          className="w-full border border-red-200 text-red-600 hover:bg-red-50 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-base">cancel</span>
          Hủy phiên dùng bàn
        </button>
      </div>
    </>
  );
}
