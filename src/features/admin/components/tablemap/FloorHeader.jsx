const FloorHeader = ({ tables = [] }) => {
  const active = tables.filter((t) => t.status === "occupied").length;
  const capacity = tables
    .filter((t) => t.status !== "inactive")
    .reduce((sum, t) => sum + (t.capacity || 0), 0);

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h2 className="text-2xl font-bold">Sảnh chính</h2>
        <p className="text-gray-500">
          Sức chứa: {capacity} khách | Đang phục vụ: {active} bàn
        </p>
      </div>

      <div className="flex gap-2">
        <button type="button" className="p-2 border rounded-lg" aria-label="Phóng to">
          <span className="material-symbols-outlined">zoom_in</span>
        </button>
        <button type="button" className="p-2 border rounded-lg" aria-label="Thu nhỏ">
          <span className="material-symbols-outlined">zoom_out</span>
        </button>
        <button type="button" className="p-2 border rounded-lg" aria-label="Lưới">
          <span className="material-symbols-outlined">grid_view</span>
        </button>
      </div>
    </div>
  );
};

export default FloorHeader;
