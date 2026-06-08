export default function AdminTable({ columns, rows, emptyMessage = "Không có dữ liệu" }) {
  if (!rows?.length) {
    return (
      <div className="rounded-2xl border border-slate-200/60 bg-white p-12 text-center text-slate-500 shadow-sm">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200/60 bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-slate-50 border-b border-slate-100 text-slate-600">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 ${col.className ?? ""}`}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50/60 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className={`px-6 py-4 text-slate-700 ${col.className ?? ""}`}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
