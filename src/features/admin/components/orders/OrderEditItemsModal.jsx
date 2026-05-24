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
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Danh sách món hiện tại</h4>
          {orderItems.length === 0 ? (
            <p className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3 text-center">
              Chưa có món ăn nào trong đơn.
            </p>
          ) : (
            <ul className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {orderItems.map((item) => (
                <li
                  key={item._id}
                  className="flex items-center justify-between gap-4 p-2 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {fmt(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item, -1)}
                      className="w-7 h-7 rounded bg-white border flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item, 1)}
                      className="w-7 h-7 rounded bg-white border flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item)}
                      className="p-1 rounded text-red-600 hover:bg-red-50 ml-2 cursor-pointer"
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
        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Thêm món mới</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <select
                value={selectedMenuId}
                onChange={(e) => onMenuChange(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 bg-white text-sm"
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
                className="w-16 border rounded-lg px-2 text-center text-sm"
              />
              <button
                type="button"
                onClick={onAdd}
                disabled={!selectedMenuId}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 disabled:opacity-50 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm font-bold">add</span>
                Thêm
              </button>
            </div>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <div className="flex justify-end border-t pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg border font-medium hover:bg-gray-50 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </AdminModal>
  );
}
