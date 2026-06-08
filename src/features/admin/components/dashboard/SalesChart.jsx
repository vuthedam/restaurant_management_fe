import { formatCurrency } from "../../utils/adminLabels";

const CHART_HEIGHT_PX = 200;

export default function SalesChart({ data = [] }) {
  const safeData = Array.isArray(data) ? data : [];
  const maxValue = Math.max(...safeData.map((item) => Number(item.value || 0)), 0);
  const hasRevenue = maxValue > 0;

  return (
    <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <h3 className="text-base font-bold text-slate-900 mb-1">Xu hướng doanh thu tuần</h3>
      <p className="text-xs text-slate-500 mb-4">7 ngày gần nhất (giao dịch đã thanh toán)</p>

      {!safeData.length ? (
        <p className="text-sm text-slate-500 py-12 text-center">
          Chưa có dữ liệu doanh thu tuần.
        </p>
      ) : !hasRevenue ? (
        <div className="py-12 text-center space-y-2">
          <p className="text-sm text-slate-500">Chưa có doanh thu trong 7 ngày qua.</p>
          <p className="text-xs text-slate-400">
            Biểu đồ sẽ hiển thị sau khi có giao dịch thanh toán thành công.
          </p>
        </div>
      ) : (
        <div
          className="flex items-end gap-2 sm:gap-3 border-b border-slate-100 pb-1"
          style={{ height: CHART_HEIGHT_PX }}
          role="img"
          aria-label="Biểu đồ doanh thu 7 ngày"
        >
          {safeData.map((item, index) => {
            const value = Number(item.value || 0);
            const barHeight =
              maxValue > 0
                ? Math.max(Math.round((value / maxValue) * CHART_HEIGHT_PX), value > 0 ? 10 : 4)
                : 4;
            const isPeak = value === maxValue && maxValue > 0;

            return (
              <div
                key={`${item.label}-${index}`}
                className="flex-1 h-full flex flex-col items-center justify-end min-w-0"
                title={`${item.label}: ${formatCurrency(value)}`}
              >
                <span className="text-[10px] font-semibold text-slate-500 mb-1 truncate w-full text-center">
                  {value >= 1_000_000
                    ? `${Math.round(value / 1_000_000)}tr`
                    : value >= 1_000
                      ? `${Math.round(value / 1_000)}k`
                      : value > 0
                        ? String(value)
                        : ""}
                </span>
                <div
                  className={`w-full max-w-[48px] rounded-t transition-all duration-300 ${
                    isPeak ? "bg-orange-500" : "bg-slate-200 hover:bg-slate-300 transition-colors"
                  }`}
                  style={{ height: barHeight }}
                />
                <span className="text-xs mt-2 font-semibold text-slate-500">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
