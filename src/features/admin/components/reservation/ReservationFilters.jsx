const ReservationFilters = () => {
  return (
    <div className="p-4 border-b flex flex-wrap gap-2 items-center justify-between">
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold">
          All Reservations
        </button>

        <button className="px-4 py-2 hover:bg-gray-100 rounded-lg text-sm">
          Waiting Only
        </button>

        <button className="px-4 py-2 hover:bg-gray-100 rounded-lg text-sm">
          VIPs
        </button>
      </div>
    </div>
  );
};

export default ReservationFilters;
