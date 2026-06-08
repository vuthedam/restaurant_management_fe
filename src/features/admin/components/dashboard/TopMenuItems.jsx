export default function TopMenuItems({ items = [] }) {
  const safeItems = Array.isArray(items) ? items : [];
  return (
    <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <h3 className="text-base font-bold text-slate-900 mb-4">Món bán chạy</h3>

      {!safeItems.length ? (
        <p className="text-sm text-slate-500 py-8 text-center">
          Chưa có dữ liệu món bán chạy.
        </p>
      ) : (
        <div className="space-y-4">
          {safeItems.map((item) => (
            <div key={item.id || item.name} className="flex justify-between items-center gap-3">
              <div className="min-w-0">
                <p className="font-semibold text-slate-800 text-sm truncate">{item.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.sold}</p>
              </div>
              <p className="font-bold text-orange-500 text-sm shrink-0">{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
