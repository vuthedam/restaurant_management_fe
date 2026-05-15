const sales = [60, 45, 85, 70, 95, 100, 55];
const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function SalesChart() {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-bold mb-4">Weekly Sales Trends</h3>

      <div className="h-64 flex items-end gap-3">
        {sales.map((height, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center justify-end"
          >
            <div
              className={`w-full rounded-t ${
                index === 2 ? "bg-orange-500" : "bg-gray-300"
              }`}
              style={{ height: `${height}%` }}
            ></div>
            <span className="text-xs mt-2 font-semibold text-gray-500">
              {days[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
