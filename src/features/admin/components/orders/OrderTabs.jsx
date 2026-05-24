/**
 * COMPONENT: OrderTabs
 * BỘ PHẬN CỦA TRANG: Quản lý đơn hàng trực tiếp (/admin/orders)
 * ĐỊA CHỈ FILE GỐC: table-order-ap/src/features/admin/pages/Orders.jsx
 *
 * MÔ TẢ:
 * Component này hiển thị thanh điều hướng Tabs để lọc đơn hàng theo các trạng thái khác nhau:
 *  - Đang hoạt động (Active): Các đơn hàng chưa thanh toán thành công (chờ duyệt, đã duyệt, đang nấu, đã phục vụ).
 *  - Lịch sử đơn (History): Các đơn hàng đã hoàn tất (thanh toán thành công) hoặc đã hủy.
 *  - Tất cả đơn (All): Xem toàn bộ đơn hàng trong hệ thống.
 */

import React from "react";

export default function OrderTabs({ filterTab, onTabChange, counts }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 bg-white/60 p-2.5 border border-gray-150 rounded-2xl shadow-sm backdrop-blur-sm">
      <div className="flex flex-wrap gap-2">
        {/* Tab 1: Đang hoạt động */}
        <button
          onClick={() => onTabChange("active")}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 border cursor-pointer ${
            filterTab === "active"
              ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-600/20"
              : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <span className="material-symbols-outlined text-lg">schedule</span>
          Đang hoạt động
          <span className={`px-2 py-0.5 rounded-md text-xs font-extrabold ${
            filterTab === "active" ? "bg-white text-orange-600" : "bg-gray-150 text-gray-600"
          }`}>
            {counts.active}
          </span>
        </button>

        {/* Tab 2: Lịch sử đơn */}
        <button
          onClick={() => onTabChange("history")}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 border cursor-pointer ${
            filterTab === "history"
              ? "bg-gray-800 text-white border-gray-800 shadow-md"
              : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <span className="material-symbols-outlined text-lg">history</span>
          Lịch sử đơn
          <span className={`px-2 py-0.5 rounded-md text-xs font-extrabold ${
            filterTab === "history" ? "bg-white text-gray-800" : "bg-gray-150 text-gray-600"
          }`}>
            {counts.history}
          </span>
        </button>

        {/* Tab 3: Tất cả đơn */}
        <button
          onClick={() => onTabChange("all")}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 border cursor-pointer ${
            filterTab === "all"
              ? "bg-slate-700 text-white border-slate-700 shadow-md"
              : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <span className="material-symbols-outlined text-lg">menu</span>
          Tất cả đơn
          <span className={`px-2 py-0.5 rounded-md text-xs font-extrabold ${
            filterTab === "all" ? "bg-white text-slate-700" : "bg-gray-150 text-gray-600"
          }`}>
            {counts.total}
          </span>
        </button>
      </div>
    </div>
  );
}
