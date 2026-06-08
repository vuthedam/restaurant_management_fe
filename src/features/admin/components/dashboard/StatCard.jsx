export default function StatCard({ title, value, sub }) {
  return (
    <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
      <h3 className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">{value}</h3>
      <p className="text-xs text-slate-500 mt-2 font-medium">{sub}</p>
    </div>
  );
}
