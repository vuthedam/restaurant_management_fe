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
    <article className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm flex flex-col p-4 space-y-4">
      {/* Đầu thẻ */}
      <div className="flex justify-between items-start border-b pb-3 border-gray-100">
        <div>
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-50 border border-orange-200/50 text-orange-950 font-black text-xs">
            <span className="material-symbols-outlined text-sm">table_restaurant</span>
            <span>{order.table}</span>
          </div>
          <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">schedule</span>
            <span>
              {order.timeAgo} ({order.time})
            </span>
          </p>
        </div>

        <span className={`px-2 py-0.5 rounded-lg text-[10px] border ${overallBadge.classes}`}>
          {overallBadge.label}
        </span>
      </div>

      {/* Danh sách món ăn */}
      <ul className="divide-y divide-gray-50 flex-1 space-y-2.5">
        {order.items.map((item, idx) => (
          <li key={idx} className="pt-2 flex justify-between items-center text-sm">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-5 h-5 shrink-0 rounded bg-gray-150 flex items-center justify-center text-[10px] font-black text-gray-600">
                {item.qty}
              </span>
              <span
                className={`font-semibold truncate ${
                  item.status === "cancelled" ? "line-through text-gray-400 font-normal" : "text-gray-800"
                }`}
              >
                {item.name}
              </span>
            </div>
            <span className="text-xs font-semibold text-gray-500">{item.lineTotal}</span>
          </li>
        ))}
      </ul>

      {/* Dưới thẻ */}
      <div className="border-t pt-3 border-gray-100 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 font-bold">Tổng đơn:</span>
          <span className="text-base font-extrabold text-gray-900">{order.orderTotal}</span>
        </div>

        <div className="flex gap-2">
          {order.nextStatus ? (
            <button
              type="button"
              onClick={() => onAdvance(order)}
              disabled={updatingId === order.id}
              className={`flex-1 py-2 rounded-lg text-xs font-bold text-white transition flex items-center justify-center gap-0.5 cursor-pointer ${order.buttonColor} hover:brightness-95`}
            >
              <span className="material-symbols-outlined text-sm font-bold">check_circle</span>
              <span>{updatingId === order.id ? "..." : order.action}</span>
            </button>
          ) : (
            <div className="flex-1 text-center py-2 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-bold uppercase flex items-center justify-center">
              {order.action}
            </div>
          )}

          <button
            type="button"
            onClick={() => onEditItems(order)}
            className="px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold transition text-xs flex items-center justify-center gap-0.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm font-bold">edit_note</span>
            <span>Sửa</span>
          </button>
        </div>
      </div>
    </article>
  );
}
