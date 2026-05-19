const ReservationStats = () => {
  return (
    <>
      <div className="bg-white border rounded-xl p-4 flex items-center gap-4 shadow-sm">
        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500">
          <span className="material-symbols-outlined">book_online</span>
        </div>

        <div>
          <p className="text-sm text-gray-500 uppercase">Total Bookings</p>

          <h3 className="text-3xl font-bold">42</h3>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-4 flex items-center gap-4 shadow-sm">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-500">
          <span className="material-symbols-outlined">event_seat</span>
        </div>

        <div>
          <p className="text-sm text-gray-500 uppercase">Tables Available</p>

          <h3 className="text-3xl font-bold">08</h3>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-4 flex items-center gap-4 shadow-sm">
        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-500">
          <span className="material-symbols-outlined">
            notifications_active
          </span>
        </div>

        <div>
          <p className="text-sm text-gray-500 uppercase">Pending Arrivals</p>

          <h3 className="text-3xl font-bold">05</h3>
        </div>
      </div>
    </>
  );
};

export default ReservationStats;
