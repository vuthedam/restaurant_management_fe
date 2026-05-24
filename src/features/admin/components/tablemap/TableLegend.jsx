import { TABLE_STATUS_LABELS } from "../../utils/adminLabels";

const LEGEND_KEYS = [
  "available",
  "occupied",
  "reserved",
  "waiting_payment",
  "inactive",
];

const COLORS = {
  available: "bg-green-500",
  occupied: "bg-red-500",
  reserved: "bg-orange-400",
  waiting_payment: "bg-purple-500",
  inactive: "bg-gray-400",
};

const TableLegend = ({ tables = [] }) => {
  const counts = LEGEND_KEYS.reduce((acc, key) => {
    acc[key] = tables.filter((t) => t.status === key).length;
    return acc;
  }, {});

  return (
    <section className="bg-white border rounded-xl p-4 shadow-sm">
      <h3 className="font-bold text-lg mb-4">Chú thích</h3>
      <div className="space-y-3">
        {LEGEND_KEYS.map((key) => (
          <div key={key} className="flex items-center gap-3">
            <span className={`w-4 h-4 rounded-full ${COLORS[key]}`} />
            <span>{TABLE_STATUS_LABELS[key]}</span>
            <span className="ml-auto text-sm bg-gray-100 px-2 py-1 rounded">
              {counts[key]}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TableLegend;
