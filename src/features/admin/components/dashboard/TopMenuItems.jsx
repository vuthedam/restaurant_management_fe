export default function TopMenuItems({ items = [] }) {
  const safeItems = Array.isArray(items) ? items : [];
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-bold mb-4">Món bán chạy</h3>

      {!safeItems.length ? (
        <p className="text-sm text-gray-500 py-8 text-center">
          Chưa có dữ liệu món bán chạy.
        </p>
      ) : (
        <div className="space-y-4">
          {safeItems.map((item) => (
            <div key={item.id || item.name} className="flex justify-between items-center gap-3">
              <div className="min-w-0">
                <p className="font-semibold truncate">{item.name}</p>
                <p className="text-sm text-gray-500">{item.sold}</p>
              </div>
              <p className="font-bold text-orange-600 shrink-0">{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
