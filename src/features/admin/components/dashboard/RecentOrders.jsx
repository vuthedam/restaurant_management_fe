import AdminTable from "../common/AdminTable";

export default function RecentOrders({ orders = [] }) {
  const columns = [
    { key: "id", label: "Mã đơn" },
    { key: "customer", label: "Ghi chú" },
    { key: "total", label: "Tổng tiền" },
    {
      key: "status",
      label: "Trạng thái",
      render: (row) => (
        <span className="rounded-full bg-orange-50 text-orange-600 border border-orange-100/50 px-3 py-1 text-xs font-semibold">
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="p-5 border-b border-slate-100 bg-slate-50/50">
        <h3 className="text-base font-bold text-slate-900">Đơn hàng gần đây</h3>
      </div>
      <div className="p-2">
        <AdminTable
          columns={columns}
          rows={orders}
          emptyMessage="Chưa có đơn hàng."
        />
      </div>
    </div>
  );
}
