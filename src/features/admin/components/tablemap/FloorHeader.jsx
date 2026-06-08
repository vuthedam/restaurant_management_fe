const FloorHeader = ({ tables = [] }) => {
  const active = tables.filter((t) => t.status === "occupied").length;
  const capacity = tables
    .filter((t) => t.status !== "inactive")
    .reduce((sum, t) => sum + (t.capacity || 0), 0);

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Sảnh chính</h2>
        <p className="text-slate-500 text-sm mt-1">
          Sức chứa: {capacity} khách | Đang phục vụ: {active} bàn
        </p>
      </div>

      <div className="flex gap-2">
        <button type="button" className="p-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-500 transition-all duration-200" aria-label="Phóng to">
          <span className="material-symbols-outlined text-lg block">zoom_in</span>
        </button>
        <button type="button" className="p-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-500 transition-all duration-200" aria-label="Thu nhỏ">
          <span className="material-symbols-outlined text-lg block">zoom_out</span>
        </button>
        <button type="button" className="p-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-500 transition-all duration-200" aria-label="Lưới">
          <span className="material-symbols-outlined text-lg block">grid_view</span>
        </button>
      </div>
    </div>
  );
};

export default FloorHeader;
