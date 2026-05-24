const sales = [60, 45, 85, 70, 95, 100, 55];
const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

export default function SalesChart() {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-bold mb-4">Xu hướng doanh thu tuần</h3>

      <div className="h-64 flex items-end gap-3">
        {sales.map((height, index) => (
          <div
            key={days[index]}
            className="flex-1 flex flex-col items-center justify-end"
          >
            <div
              className={`w-full rounded-t ${
                index === 2 ? "bg-orange-500" : "bg-gray-300"
              }`}
              style={{ height: `${height}%` }}
            />
            <span className="text-xs mt-2 font-semibold text-gray-500">
              {days[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
