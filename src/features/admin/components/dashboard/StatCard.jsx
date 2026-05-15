export default function StatCard({ title, value, sub }) {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
      <p className="text-sm text-green-600 mt-2">{sub}</p>
    </div>
  );
}
