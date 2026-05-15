const FloorHeader = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h2 className="text-2xl font-bold">Main Indoor Hall</h2>

        <p className="text-gray-500">Capacity: 120 Guests | Current: 64</p>
      </div>

      <div className="flex gap-2">
        <button className="p-2 border rounded-lg">
          <span className="material-symbols-outlined">zoom_in</span>
        </button>

        <button className="p-2 border rounded-lg">
          <span className="material-symbols-outlined">zoom_out</span>
        </button>

        <button className="p-2 border rounded-lg">
          <span className="material-symbols-outlined">grid_view</span>
        </button>
      </div>
    </div>
  );
};

export default FloorHeader;
