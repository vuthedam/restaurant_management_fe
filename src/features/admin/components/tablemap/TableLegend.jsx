import { TABLE_STATUS_LABELS } from "../../utils/adminLabels";

const LEGEND_KEYS = [
  "available",
  "occupied",
  "reserved",
  "waiting_payment",
  "inactive",
];

const COLORS = {
  available: "bg-emerald-500",
  occupied: "bg-red-500",
  reserved: "bg-orange-500",
  waiting_payment: "bg-blue-500",
  inactive: "bg-slate-400",
};

const TableLegend = ({ tables = [] }) => {
  const counts = LEGEND_KEYS.reduce((acc, key) => {
    acc[key] = tables.filter((t) => t.status === key).length;
    return acc;
  }, {});

  return (
    <section className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm">
      <h3 className="font-semibold text-slate-900 text-lg mb-4">Chú thích</h3>
      <div className="space-y-3">
        {LEGEND_KEYS.map((key) => (
          <div key={key} className="flex items-center gap-3">
            <span className={`w-4 h-4 rounded-full ${COLORS[key]}`} />
            <span className="text-sm text-slate-600 font-medium">{TABLE_STATUS_LABELS[key]}</span>
            <span className="ml-auto text-xs bg-slate-50 border border-slate-100 px-2.5 py-0.5 rounded-full font-semibold text-slate-600">
              {counts[key]}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TableLegend;
