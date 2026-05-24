/**
 * COMPONENT: OrderCard
 * THUỘC TRANG: Orders (/admin/orders)
 * ĐỊA CHỈ FILE: table-order-ap/src/features/admin/components/orders/OrderCard.jsx
 *
 * MÔ TẢ: Card hiển thị một đơn hàng với danh sách món, tổng tiền
 * và nút cập nhật trạng thái đồng loạt hoặc sửa món.
 */

import OrderItemRow from "./OrderItemRow";

const OrderCard = ({ order, onAdvance, onUpdateItemStatus, onEditItems, updating = false }) => {
  return (
    <article className={`bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col ${order.border}`}>
      {/* Header */}
      <div className={`p-4 border-b-4 flex justify-between items-start ${order.headerBg}`}>
        <div>
          <span className="text-xs font-bold uppercase tracking-widest">Bàn</span>
          <h3 className="text-2xl font-bold">{order.table}</h3>
        </div>
        <div className="text-right">
          <p className="text-sm">{order.timeAgo}</p>
          <p className="font-bold">{order.time}</p>
        </div>
      </div>

      {/* Items */}
      <div className="p-4 flex-1">
        <ul className="space-y-4">
          {order.items.map((item, index) => (
            <OrderItemRow
              key={item.id || index}
              item={item}
              onUpdateItemStatus={onUpdateItemStatus}
              updating={updating}
            />
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-gray-50 space-y-3">
        {order.orderTotal && (
          <div className="flex justify-between text-sm font-semibold">
            <span>Tổng đơn</span>
            <span className="text-lg text-gray-900">{order.orderTotal}</span>
          </div>
        )}

        <div className="flex gap-2">
          {order.nextStatus ? (
            <button
              type="button"
              onClick={() => { if (!order.disabled && !updating) onAdvance?.(order); }}
              disabled={order.disabled || updating}
              className={`flex-1 py-2.5 rounded-lg font-bold text-white transition text-sm flex items-center justify-center gap-1 cursor-pointer ${order.buttonColor} ${order.disabled || updating ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"}`}
            >
              {updating ? "Đang cập nhật..." : (
                <>
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  {order.action} (Đồng loạt)
                </>
              )}
            </button>
          ) : (
            <div className="flex-1 text-center py-2.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center">
              {order.action}
            </div>
          )}

          <button
            type="button"
            title="Thêm / Sửa món"
            onClick={() => onEditItems?.(order)}
            className="px-3 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold transition text-sm flex items-center justify-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">edit_note</span>
            Sửa món
          </button>
        </div>
      </div>
    </article>
  );
};

export default OrderCard;
