const FILTERS = [
  { id: "all", label: "Tất cả đặt bàn" },
  { id: "pending", label: "Chỉ đang chờ" },
  { id: "confirmed", label: "Đã xác nhận" },
  { id: "vip", label: "6+ khách" },
];

const ReservationFilters = ({ activeFilter = "all", onFilterChange }) => {
  return (
    <div className="p-4 border-b flex flex-wrap gap-2 items-center justify-between">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => onFilterChange?.(f.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              activeFilter === f.id
                ? "bg-orange-100 text-orange-600"
                : "hover:bg-gray-100 text-gray-700"
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
