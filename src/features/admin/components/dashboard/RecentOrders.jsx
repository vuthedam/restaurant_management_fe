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
        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
      <div className="p-4 border-b">
        <h3 className="text-lg font-bold">Đơn hàng gần đây</h3>
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
