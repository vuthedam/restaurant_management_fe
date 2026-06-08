const StatBox = ({ icon, label, value, colorClass }) => (
  <div className="bg-white border border-slate-200/60 rounded-2xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300">
    <div
      className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${colorClass}`}
    >
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
      <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{value}</h3>
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
        colorClass="bg-orange-50 text-orange-500 border-orange-100/50"
      />
      <StatBox
        icon="event_seat"
        label="Bàn trống"
        value={availableTables}
        colorClass="bg-blue-50 text-blue-500 border-blue-100/50"
      />
      <StatBox
        icon="hourglass_top"
        label="Chờ khách đến"
        value={pending}
        colorClass="bg-red-50 text-red-500 border-red-100/50"
      />
    </>
  );
};

export default ReservationStats;
