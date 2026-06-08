/**
 * COMPONENT: TableInfoCard
 * THUỘC: QuickSummary — Sơ đồ bàn (/admin/tables)
 * ĐỊA CHỈ FILE: table-order-ap/src/features/admin/components/tablemap/TableInfoCard.jsx
 *
 * MÔ TẢ: Hiển thị thông tin tĩnh của bàn (tên, sức chứa, trạng thái).
 */

import { TABLE_STATUS_LABELS } from "../../utils/adminLabels";

const STATUS_COLORS = {
  available: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  occupied: "bg-red-50 text-red-600 border-red-200/60",
  reserved: "bg-orange-50 text-orange-700 border-orange-200/60",
  waiting_payment: "bg-blue-50 text-blue-700 border-blue-200/60",
  inactive: "bg-slate-50 text-slate-600 border-slate-200/60",
};

export default function TableInfoCard({ table }) {
  const label = table.code || table.name || "—";
  const statusLabel = TABLE_STATUS_LABELS[table.status] || table.status;
  const colorClass = STATUS_COLORS[table.status] || "bg-slate-50 text-slate-600 border-slate-200/60";

  return (
    <div className="flex flex-col gap-3 p-4 border border-slate-200/60 rounded-2xl bg-slate-50/30">
      <Row label="Tên bàn" value={table.name || label} />
      <Row label="Sức chứa" value={`${table.capacity || table.seats} chỗ ngồi`} />
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-500">Trạng thái:</span>
        <span className={`px-3 py-0.5 rounded-full text-[11px] font-semibold border ${colorClass}`}>
          {statusLabel}
        </span>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium text-slate-500">{label}:</span>
      <span className="text-sm font-semibold text-slate-800">{value}</span>
    </div>
  );
}
