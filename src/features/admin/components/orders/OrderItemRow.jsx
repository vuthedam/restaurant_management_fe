/**
 * COMPONENT: OrderItemRow
 * THUỘC: OrderCard — Quản lý đơn hàng (/admin/orders)
 * ĐỊA CHỈ FILE: table-order-ap/src/features/admin/components/orders/OrderItemRow.jsx
 *
 * MÔ TẢ: Hiển thị một dòng món ăn trong đơn hàng kèm badge trạng thái
 * và các nút hành động (duyệt, nấu, phục vụ, hủy).
 */

const STATUS_BADGES = {
  pending:  { label: "Chờ duyệt", classes: "bg-yellow-50 text-yellow-800 border-yellow-200" },
  confirmed:{ label: "Đã duyệt",  classes: "bg-teal-50 text-teal-800 border-teal-200" },
  preparing:{ label: "Đang nấu",  classes: "bg-orange-50 text-orange-800 border-orange-200" },
  served:   { label: "Đã lên món",classes: "bg-blue-50 text-blue-800 border-blue-200" },
  cancelled:{ label: "Đã hủy",   classes: "bg-gray-100 text-gray-500 border-gray-200" },
};

export default function OrderItemRow({ item, onUpdateItemStatus, updating }) {
  const hasActions = !!item.id;
  const badge = STATUS_BADGES[item.status] || null;
  const isCancelled = item.status === "cancelled";

  const confirmCancel = () => {
    if (window.confirm(`Hủy món ${item.name}?`)) {
      onUpdateItemStatus?.(item.id, "cancelled");
    }
  };

  return (
    <li className="space-y-1 pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
      {/* Tên + giá */}
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-6 h-6 shrink-0 rounded bg-gray-100 flex items-center justify-center text-xs font-bold">
            {item.qty}
          </span>
          <span className={`font-semibold truncate ${isCancelled ? "line-through text-gray-400 font-normal" : "text-gray-800"}`}>
            {item.name}
          </span>
        </div>
        {item.lineTotal && (
          <span className={`text-sm font-bold shrink-0 ${isCancelled ? "line-through text-gray-400 font-normal" : "text-gray-900"}`}>
            {item.lineTotal}
          </span>
        )}
      </div>

      {/* Đơn giá */}
      {item.unitPrice && item.qty !== "—" && (
        <p className="text-xs text-gray-500 pl-8">{item.unitPrice} × {item.qty}</p>
      )}

      {/* Ghi chú */}
      {item.note && (
        <p className="text-xs text-orange-600 bg-orange-50/50 px-2 py-0.5 rounded border border-orange-100/50 inline-block ml-8">
          Ghi chú: {item.note}
        </p>
      )}

      {/* Badge + action buttons */}
      {hasActions && (
        <div className="pl-8 pt-1 flex justify-between items-center gap-2">
          {badge && (
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${badge.classes}`}>
              {badge.label}
            </span>
          )}

          <div className="flex gap-1">
            {item.status === "pending" && (
              <>
                <ActionBtn title="Duyệt món" color="green" icon="check" disabled={updating}
                  onClick={() => onUpdateItemStatus?.(item.id, "confirmed")} />
                <ActionBtn title="Hủy món" color="red" icon="close" disabled={updating}
                  onClick={confirmCancel} />
              </>
            )}
            {item.status === "confirmed" && (
              <>
                <ActionBtn title="Bắt đầu nấu" color="orange" icon="soup_kitchen" label="Nấu món"
                  disabled={updating} onClick={() => onUpdateItemStatus?.(item.id, "preparing")} />
                <ActionBtn title="Hủy món" color="red" icon="close" disabled={updating}
                  onClick={confirmCancel} />
              </>
            )}
            {item.status === "preparing" && (
              <>
                <ActionBtn title="Phục vụ" color="blue" icon="restaurant" label="Phục vụ"
                  disabled={updating} onClick={() => onUpdateItemStatus?.(item.id, "served")} />
                <ActionBtn title="Hủy món" color="red" icon="close" disabled={updating}
                  onClick={confirmCancel} />
              </>
            )}
          </div>
        </div>
      )}
    </li>
  );
}

function ActionBtn({ title, color, icon, label, disabled, onClick }) {
  const colors = {
    green:  "bg-green-50 hover:bg-green-100 text-green-700",
    red:    "bg-red-50 hover:bg-red-100 text-red-700",
    orange: "bg-orange-50 hover:bg-orange-100 text-orange-700",
    blue:   "bg-blue-50 hover:bg-blue-100 text-blue-700",
  };

  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`p-1 rounded transition ${colors[color]} ${label ? "px-2 py-1 text-[10px] font-bold flex items-center gap-0.5" : ""}`}
    >
      <span className={`material-symbols-outlined ${label ? "text-xs" : "text-sm font-bold"}`}>
        {icon}
      </span>
      {label && label}
    </button>
  );
}
