const seats = [
  { id: "B-01", status: "available" },
  { id: "B-02", status: "occupied" },
  { id: "B-03", status: "occupied" },
  { id: "B-04", status: "available" },
  { id: "B-05", status: "available" },
  { id: "B-06", status: "reserved" },
];

const colors = {
  available: "border-emerald-500 text-emerald-600 bg-emerald-50/40",
  occupied: "border-red-500 text-red-500 bg-red-50/40",
  reserved: "border-orange-500 text-orange-500 bg-orange-50/40",
};

const BarSeat = () => {
  return (
    <div className="mt-8 border-t border-slate-100 pt-6 grid grid-cols-6 gap-2">
      {seats.map((seat) => (
        <div
          key={seat.id}
          className={`h-12 border-2 rounded-xl flex items-center justify-center font-semibold text-xs ${colors[seat.status]}`}
        >
          {seat.id}
        </div>
      ))}
    </div>
  );
};

export default BarSeat;
