const items = [
  {
    label: "Available",
    color: "bg-green-500",
    count: 14,
  },
  {
    label: "Occupied",
    color: "bg-red-500",
    count: 8,
  },
  {
    label: "Reserved",
    color: "bg-orange-400",
    count: 3,
  },
  {
    label: "Dirty",
    color: "bg-yellow-400",
    count: 2,
  },
];

const TableLegend = () => {
  return (
    <section className="bg-white border rounded-xl p-4 shadow-sm">
      <h3 className="font-bold text-lg mb-4">Legend</h3>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className={`w-4 h-4 rounded-full ${item.color}`} />

            <span>{item.label}</span>

            <span className="ml-auto text-sm bg-gray-100 px-2 py-1 rounded">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TableLegend;
