/**
 * COMPONENT: OrderTable
 * BỘ PHẬN CỦA TRANG: Quản lý đơn hàng trực tiếp (/admin/orders)
 * ĐỊA CHỈ FILE GỐC: table-order-ap/src/features/admin/pages/Orders.jsx
 *
 * MÔ TẢ:
 * Component này hiển thị danh sách đơn hàng trực tiếp dưới dạng bảng dữ liệu nâng cao trên các thiết bị màn hình lớn (Desktop).
 * Nó cũng quản lý hành động nhanh cho từng món ăn đơn lẻ trực tiếp trong bảng như duyệt món, nấu món, lên món và hủy món.
 */

import React from "react";

export default function OrderTable({
  orders,
  updatingId,
  onAdvance,
  onUpdateItemStatus,
  onEditItems,
  itemStatusBadges,
  orderStatusBadges,
}) {
  return (
    <div className="hidden lg:block bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-slate-600">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-[18%]">
                Mã đơn / Thời gian
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-[12%]">
                Bàn
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-[42%]">
                Chi tiết gọi món & Tiến trình
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-[13%]">
                Tổng tiền
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-[15%]">
                Trạng thái & Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {orders.map((order) => {
              const overallBadge = orderStatusBadges[order.rawStatus] || {
                label: order.rawStatus,
                classes: "bg-slate-50 text-slate-800",
              };

              return (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* 1. Mã đơn & Thời gian */}
                  <td className="px-6 py-5 align-top">
                    <div className="space-y-1">
                      <span className="font-mono text-sm font-bold text-slate-900 select-all">
                        {order.time}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        <span>{order.timeAgo}</span>
                      </div>
                    </div>
                  </td>

                  {/* 2. Bàn */}
                  <td className="px-6 py-5 align-top">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-100/50 text-orange-600 font-semibold text-xs rounded-xl">
                      <span className="material-symbols-outlined text-base">table_restaurant</span>
                      <span>{order.table}</span>
                    </div>
                  </td>

                  {/* 3. Chi tiết các món & Thao tác đơn lẻ cho từng món */}
                  <td className="px-6 py-5 align-top">
                    <ul className="space-y-3.5">
                      {order.items.map((item, idx) => {
                        const isActionable = !!item.id;
                        const itemBadge = itemStatusBadges[item.status] || null;

                        return (
                          <li
                            key={idx}
                            className="flex flex-col gap-1 pb-3 border-b border-dashed border-slate-200/60 last:border-b-0 last:pb-0"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="w-6 h-6 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-700">
                                  {item.qty}
                                </span>
                                <span
                                  className={`text-sm font-bold truncate ${
                                    item.status === "cancelled"
                                      ? "line-through text-slate-400 font-normal"
                                      : "text-slate-800"
                                  }`}
                                >
                                  {item.name}
                                </span>
                              </div>

                              {item.lineTotal && (
                                <span
                                  className={`text-sm font-semibold shrink-0 ${
                                    item.status === "cancelled"
                                      ? "line-through text-slate-400 font-normal"
                                      : "text-slate-600"
                                  }`}
                                >
                                  {item.lineTotal}
                                </span>
                              )}
                            </div>

                            {/* Action bar cho từng món ăn */}
                            {isActionable && (
                              <div className="flex items-center justify-between gap-2 pl-8 mt-1">
                                {itemBadge && (
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${itemBadge.classes}`}
                                  >
                                    {itemBadge.label}
                                  </span>
                                )}

                                <div className="flex gap-1.5">
                                  {item.status === "pending" && (
                                    <>
                                      <button
                                        type="button"
                                        onClick={() => onUpdateItemStatus(item.id, "confirmed")}
                                        className="px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100/60 text-emerald-600 border border-emerald-100/50 transition-all text-[10px] font-semibold flex items-center gap-0.5 cursor-pointer"
                                        title="Xác nhận duyệt món"
                                      >
                                        <span className="material-symbols-outlined text-xs font-bold">
                                          check
                                        </span>
                                        Duyệt món
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (window.confirm(`Hủy món "${item.name}"?`)) {
                                            onUpdateItemStatus(item.id, "cancelled");
                                          }
                                        }}
                                        className="p-1 rounded-xl bg-red-50 hover:bg-red-100/60 text-red-500 border border-red-100/50 transition-all flex items-center justify-center cursor-pointer"
                                        title="Hủy món ăn"
                                      >
                                        <span className="material-symbols-outlined text-xs font-bold">
                                          close
                                        </span>
                                      </button>
                                    </>
                                  )}

                                  {item.status === "confirmed" && (
                                    <>
                                      <button
                                        type="button"
                                        onClick={() => onUpdateItemStatus(item.id, "preparing")}
                                        className="px-2.5 py-1 rounded-xl bg-orange-50 hover:bg-orange-100/60 text-orange-600 border border-orange-100/50 transition-all text-[10px] font-semibold flex items-center gap-0.5 cursor-pointer"
                                        title="Chuyển sang trạng thái Đang Nấu"
                                      >
                                        <span className="material-symbols-outlined text-xs">
                                          soup_kitchen
                                        </span>
                                        Nấu món
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (window.confirm(`Hủy món "${item.name}"?`)) {
                                            onUpdateItemStatus(item.id, "cancelled");
                                          }
                                        }}
                                        className="p-1 rounded-xl bg-red-50 hover:bg-red-100/60 text-red-500 border border-red-100/50 transition-all flex items-center justify-center cursor-pointer"
                                        title="Hủy món ăn"
                                      >
                                        <span className="material-symbols-outlined text-xs font-bold">
                                          close
                                        </span>
                                      </button>
                                    </>
                                  )}

                                  {item.status === "preparing" && (
                                    <>
                                      <button
                                        type="button"
                                        onClick={() => onUpdateItemStatus(item.id, "served")}
                                        className="px-2.5 py-1 rounded-xl bg-blue-50 hover:bg-blue-100/60 text-blue-600 border border-blue-100/50 transition-all text-[10px] font-semibold flex items-center gap-0.5 cursor-pointer"
                                        title="Xác nhận đã phục vụ lên bàn"
                                      >
                                        <span className="material-symbols-outlined text-xs">
                                          restaurant
                                        </span>
                                        Lên món
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (window.confirm(`Hủy món "${item.name}"?`)) {
                                            onUpdateItemStatus(item.id, "cancelled");
                                          }
                                        }}
                                        className="p-1 rounded-xl bg-red-50 hover:bg-red-100/60 text-red-500 border border-red-100/50 transition-all flex items-center justify-center cursor-pointer"
                                        title="Hủy món ăn"
                                      >
                                        <span className="material-symbols-outlined text-xs font-bold">
                                          close
                                        </span>
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </td>

                  {/* 4. Tổng tiền */}
                  <td className="px-6 py-5 align-top">
                    <div className="font-extrabold text-base text-slate-900 tracking-tight">
                      {order.orderTotal || "—"}
                    </div>
                  </td>

                  {/* 5. Trạng thái & Thao tác đồng loạt */}
                  <td className="px-6 py-5 align-top">
                    <div className="flex flex-col gap-3">
                      <span
                        className={`inline-flex self-start px-2.5 py-1 rounded-full text-xs font-semibold border ${overallBadge.classes}`}
                      >
                        {overallBadge.label}
                      </span>

                      <div className="flex flex-col gap-2">
                        {order.nextStatus ? (
                          <button
                            type="button"
                            onClick={() => onAdvance(order)}
                            disabled={updatingId === order.id || order.disabled}
                            title={order.advanceHint || ""}
                            className={`w-full py-2 px-3 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-1 shadow-sm hover:shadow ${order.buttonColor} hover:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                              order.disabled ? "" : "cursor-pointer"
                            }`}
                          >
                            <span className="material-symbols-outlined text-sm font-bold">
                              check_circle
                            </span>
                            <span>{updatingId === order.id ? "Đang xử lý..." : order.action}</span>
                          </button>
                        ) : null}
                        {order.nextStatus && order.advanceHint ? (
                          <p className="text-[10px] text-amber-700 leading-snug">
                            {order.advanceHint}
                          </p>
                        ) : null}
                        {!order.nextStatus ? (
                          <div className="w-full text-center py-2 bg-slate-100 text-slate-500 rounded-xl text-[10px] font-bold uppercase tracking-wider">
                            {order.action}
                          </div>
                        ) : null}

                        <button
                          type="button"
                          onClick={() => onEditItems(order)}
                          className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold transition-all text-xs flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm font-bold">
                            edit_note
                          </span>
                          <span>Sửa món</span>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
