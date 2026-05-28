import { formatCurrency } from "../../utils/adminLabels";

export default function SalesChart({ data = [] }) {
  const safeData = Array.isArray(data) && data.length ? data : [];
  const maxValue = Math.max(...safeData.map((item) => Number(item.value || 0)), 0);

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-bold mb-4">Xu hướng doanh thu tuần</h3>

      {!safeData.length ? (
        <p className="text-sm text-gray-500 py-12 text-center">
          Chưa có dữ liệu doanh thu tuần.
        </p>
      ) : (
        <div className="h-64 flex items-end gap-3">
          {safeData.map((item, index) => {
            const height =
              maxValue > 0 ? Math.max((Number(item.value || 0) / maxValue) * 100, 6) : 6;
            const isPeak = Number(item.value || 0) === maxValue && maxValue > 0;
            return (
              <div
                key={`${item.label}-${index}`}
                className="flex-1 flex flex-col items-center justify-end"
                title={`${item.label}: ${formatCurrency(item.value || 0)}`}
              >
                <div
                  className={`w-full rounded-t ${isPeak ? "bg-orange-500" : "bg-gray-300"}`}
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs mt-2 font-semibold text-gray-500">
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
