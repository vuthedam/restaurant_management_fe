const StatBox = ({ icon, label, value, colorClass }) => (
  <div className="bg-white border rounded-xl p-4 flex items-center gap-4 shadow-sm">
    <div
      className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClass}`}
    >
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <div>
      <p className="text-sm text-gray-500 uppercase">{label}</p>
      <h3 className="text-3xl font-bold">{value}</h3>
    </div>
  </div>
);

const ReservationStats = ({ total = 0, availableTables = 0, pending = 0 }) => {
  return (
    <>
      <StatBox
        icon="book_online"
        label="Tổng đặt bàn"
        value={total}
        colorClass="bg-orange-100 text-orange-500"
      />
      <StatBox
        icon="event_seat"
        label="Bàn trống"
        value={availableTables}
        colorClass="bg-blue-100 text-blue-500"
      />
      <StatBox
        icon="hourglass_top"
        label="Chờ khách đến"
        value={pending}
        colorClass="bg-red-100 text-red-500"
      />
    </>
  );
};

export default ReservationStats;
