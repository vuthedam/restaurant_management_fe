/**
 * COMPONENT: OrderMobileCard
 * BỘ PHẬN CỦA TRANG: Quản lý đơn hàng trực tiếp (/admin/orders)
 * ĐỊA CHỈ FILE GỐC: table-order-ap/src/features/admin/pages/Orders.jsx
 *
 * MÔ TẢ:
 * Component này hiển thị thông tin thu gọn và các nút thao tác chính của đơn hàng
 * dưới dạng một chiếc thẻ Grid, tối ưu hóa giao diện hiển thị cho các thiết bị màn hình di động nhỏ (Mobile).
 */

import React from "react";

export default function OrderMobileCard({
  order,
  updatingId,
  onAdvance,
  onEditItems,
  orderStatusBadges,
}) {
  const overallBadge = orderStatusBadges[order.rawStatus] || {
    label: order.rawStatus,
    classes: "bg-gray-50 text-gray-800",
  };

  return (
    <article className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm flex flex-col p-4 space-y-4 hover:shadow-md transition-all duration-300">
      {/* Đầu thẻ */}
      <div className="flex justify-between items-start border-b pb-3 border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 border border-orange-100/50 text-orange-600 font-semibold text-[10px] rounded-xl">
            <span className="material-symbols-outlined text-xs">table_restaurant</span>
            <span>{order.table}</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">schedule</span>
            <span>
              {order.timeAgo} ({order.time})
            </span>
          </p>
        </div>

        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${overallBadge.classes}`}>
          {overallBadge.label}
        </span>
      </div>

      {/* Danh sách món ăn */}
      <ul className="divide-y divide-slate-100 flex-1 space-y-2.5 text-slate-600">
        {order.items.map((item, idx) => (
          <li key={idx} className="pt-2 flex justify-between items-center text-sm">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-5 h-5 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-700">
                {item.qty}
              </span>
              <span
                className={`font-semibold truncate ${
                  item.status === "cancelled" ? "line-through text-slate-400 font-normal" : "text-slate-800"
                }`}
              >
                {item.name}
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-500">{item.lineTotal}</span>
          </li>
        ))}
      </ul>

      {/* Dưới thẻ */}
      <div className="border-t pt-3 border-slate-100 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-500 font-bold">Tổng đơn:</span>
          <span className="text-base font-extrabold text-slate-900">{order.orderTotal}</span>
        </div>

        <div className="flex gap-2">
          {order.nextStatus ? (
            <button
              type="button"
              onClick={() => onAdvance(order)}
              disabled={updatingId === order.id || order.disabled}
              title={order.advanceHint || ""}
              className={`flex-1 py-2 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-0.5 ${order.buttonColor} hover:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                order.disabled ? "" : "cursor-pointer"
              }`}
            >
              <span className="material-symbols-outlined text-sm font-bold">check_circle</span>
              <span>{updatingId === order.id ? "..." : order.action}</span>
            </button>
          ) : (
            <div className="flex-1 text-center py-2 bg-slate-100 text-slate-500 rounded-xl text-[10px] font-bold uppercase flex items-center justify-center">
              {order.action}
            </div>
          )}

          <button
            type="button"
            onClick={() => onEditItems(order)}
            className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold transition-all text-xs flex items-center justify-center gap-0.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm font-bold">edit_note</span>
            <span>Sửa</span>
          </button>
        </div>
      </div>
    </article>
  );
}
