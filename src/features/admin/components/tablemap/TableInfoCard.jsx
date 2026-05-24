/**
 * COMPONENT: TableInfoCard
 * THUỘC: QuickSummary — Sơ đồ bàn (/admin/tables)
 * ĐỊA CHỈ FILE: table-order-ap/src/features/admin/components/tablemap/TableInfoCard.jsx
 *
 * MÔ TẢ: Hiển thị thông tin tĩnh của bàn (tên, sức chứa, trạng thái).
 */

import { TABLE_STATUS_LABELS } from "../../utils/adminLabels";

const STATUS_COLORS = {
  available: "bg-green-100 text-green-800 border-green-200",
  occupied: "bg-red-100 text-red-800 border-red-200",
  reserved: "bg-orange-100 text-orange-800 border-orange-200",
  waiting_payment: "bg-purple-100 text-purple-800 border-purple-200",
  inactive: "bg-gray-100 text-gray-800 border-gray-200",
};

export default function TableInfoCard({ table }) {
  const label = table.code || table.name || "—";
  const statusLabel = TABLE_STATUS_LABELS[table.status] || table.status;
  const colorClass = STATUS_COLORS[table.status] || "bg-gray-100 text-gray-800 border-gray-200";

  return (
    <div className="flex flex-col gap-3 p-4 border rounded-xl bg-gray-50">
      <Row label="Tên bàn" value={table.name || label} />
      <Row label="Sức chứa" value={`${table.capacity || table.seats} chỗ ngồi`} />
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-700">Trạng thái:</span>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${colorClass}`}>
          {statusLabel}
        </span>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm font-semibold text-gray-700">{label}:</span>
      <span className="text-base font-bold">{value}</span>
    </div>
  );
}
