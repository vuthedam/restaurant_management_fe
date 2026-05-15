const seats = [
  { id: "B-01", status: "available" },
  { id: "B-02", status: "occupied" },
  { id: "B-03", status: "occupied" },
  { id: "B-04", status: "available" },
  { id: "B-05", status: "available" },
  { id: "B-06", status: "reserved" },
];

const colors = {
  available: "border-green-500 text-green-600",
  occupied: "border-red-500 text-red-500",
  reserved: "border-orange-400 text-orange-500",
};

const BarSeat = () => {
  return (
    <div className="mt-8 border-t pt-6 grid grid-cols-6 gap-2">
      {seats.map((seat) => (
        <div
          key={seat.id}
          className={`h-12 border-2 rounded flex items-center justify-center font-bold ${colors[seat.status]}`}
        >
          {seat.id}
        </div>
      ))}
    </div>
  );
};

export default BarSeat;
