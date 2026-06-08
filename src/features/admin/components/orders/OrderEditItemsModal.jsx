/**
 * COMPONENT: OrderEditItemsModal.jsx
 * THUỘC TRANG: Orders (/admin/orders)
 * ĐỊA CHỈ FILE: table-order-ap/src/features/admin/components/orders/OrderEditItemsModal.jsx
 *
 * MÔ TẢ:
 * Modal cho phép staff/admin thêm món mới hoặc chỉnh sửa số lượng,
 * xóa món khỏi một đơn hàng đang hoạt động.
 */

import AdminModal from "../common/AdminModal";

const fmt = (amount) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);

export default function OrderEditItemsModal({
  open,
  onClose,
  tableLabel,
  orderItems,
  availableMenu,
  selectedMenuId,
  selectedQty,
  onMenuChange,
  onQtyChange,
  onAdd,
  onUpdateQty,
  onDelete,
  error,
}) {
  return (
    <AdminModal
      open={open}
      title={`Thêm / Sửa món — Bàn ${tableLabel || ""}`}
      onClose={onClose}
    >
      <div className="space-y-6">
        {/* Danh sách món hiện tại */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Danh sách món hiện tại</h4>
          {orderItems.length === 0 ? (
            <p className="text-sm text-slate-500 bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
              Chưa có món ăn nào trong đơn.
            </p>
          ) : (
            <ul className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {orderItems.map((item) => (
                <li
                  key={item._id}
                  className="flex items-center justify-between gap-4 p-3 bg-slate-50 border border-slate-200/60 rounded-xl hover:shadow-xs transition-all"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-slate-900 truncate">{item.name}</p>
                    <p className="text-xs text-slate-500">
                      {fmt(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item, -1)}
                      className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-slate-800">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item, 1)}
                      className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item)}
                      className="p-1.5 rounded-xl text-red-500 hover:bg-red-50 ml-2 cursor-pointer transition-all"
                      title="Xóa món"
                    >
                      <span className="material-symbols-outlined text-lg font-bold">delete</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Thêm món mới */}
        <div className="border-t border-slate-100 pt-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Thêm món mới</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <select
                value={selectedMenuId}
                onChange={(e) => onMenuChange(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              >
                <option value="">-- Chọn món để thêm --</option>
                {availableMenu.map((m) => (
                  <option key={m._id} value={m._id}>
                    {m.name} ({fmt(m.price)})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                min="1"
                max="100"
                value={selectedQty}
                onChange={(e) => onQtyChange(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 border border-slate-200 rounded-xl px-2 py-2.5 text-center text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white"
              />
              <button
                type="button"
                onClick={onAdd}
                disabled={!selectedMenuId}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 disabled:opacity-50 cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-sm font-bold">add</span>
                Thêm
              </button>
            </div>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 font-medium">
            {error}
          </p>
        )}

        <div className="flex justify-end border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-all cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </AdminModal>
  );
}
