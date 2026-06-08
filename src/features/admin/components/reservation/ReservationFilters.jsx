const FILTERS = [
  { id: "all", label: "Tất cả đặt bàn" },
  { id: "pending", label: "Chỉ đang chờ" },
  { id: "confirmed", label: "Đã xác nhận" },
  { id: "vip", label: "6+ khách" },
];

const ReservationFilters = ({ activeFilter = "all", onFilterChange }) => {
  return (
    <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-wrap gap-2 items-center justify-between">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => onFilterChange?.(f.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeFilter === f.id
                ? "bg-orange-50 text-orange-600 border border-orange-100/50 shadow-xs"
                : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReservationFilters;
