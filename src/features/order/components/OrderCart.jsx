import { formatCurrency } from "../../../utils/format";

export default function OrderCart({
  lines,
  total,
  itemCount,
  onUpdateQty,
  onRemove,
  onSubmit,
  submitting,
  tableLabel,
}) {
  return (
    <aside className="flex flex-col rounded-2xl border border-outline-variant bg-surface shadow-lg lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)]">
      <div className="border-b border-outline-variant px-5 py-4">
        <h2 className="font-display text-xl font-bold">Đơn của bạn</h2>
        {tableLabel ? (
          <p className="text-sm text-on-surface-variant mt-1">Bàn: {tableLabel}</p>
        ) : null}
        <p className="text-sm text-primary font-semibold mt-1">{itemCount} món</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 min-h-[120px]">
        {!lines.length ? (
          <p className="text-center text-on-surface-variant text-sm py-8">
            Chưa có món nào. Chọn món từ thực đơn bên trái.
          </p>
        ) : (
          <ul className="space-y-4">
            {lines.map((line) => (
              <li key={line.menuItemId} className="border-b border-outline-variant/50 pb-4 last:border-0">
                <div className="flex justify-between gap-2 mb-1">
                  <span className="font-semibold text-sm leading-snug">{line.name}</span>
                  <span className="font-bold text-primary tabular-nums shrink-0">
                    {formatCurrency(line.subtotal)}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mb-2">
                  {formatCurrency(line.unitPrice)} × {line.quantity}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-lg border border-outline-variant">
                    <button
                      type="button"
                      onClick={() => onUpdateQty(line.menuItemId, -1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-surface-container"
                      aria-label="Giảm"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-bold text-sm">{line.quantity}</span>
                    <button
                      type="button"
                      onClick={() => onUpdateQty(line.menuItemId, 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-surface-container"
                      aria-label="Tăng"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(line.menuItemId)}
                    className="text-xs text-error font-semibold"
                  >
                    Xóa
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-outline-variant px-5 py-4 bg-surface-container-low">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Tổng cộng</span>
          <span className="text-xl font-bold text-primary tabular-nums">
            {formatCurrency(total)}
          </span>
        </div>
        <button
          type="button"
          disabled={!lines.length || submitting}
          onClick={onSubmit}
          className="w-full rounded-xl bg-primary py-3 font-bold text-on-primary disabled:opacity-50"
        >
          {submitting ? "Đang gửi đơn..." : "Gửi đơn cho bếp"}
        </button>
      </div>
    </aside>
  );
}
