const orders = [
  {
    id: "#APT-4829",
    customer: "Jane Smith",
    items: "3 items",
    total: "$54.20",
    status: "Preparing",
  },
  {
    id: "#APT-4830",
    customer: "Mike K.",
    items: "1 item",
    total: "$18.50",
    status: "Pending",
  },
  {
    id: "#APT-4825",
    customer: "Robert Lee",
    items: "5 items",
    total: "$112.00",
    status: "Completed",
  },
];

export default function RecentOrders() {
  return (
    <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
      <div className="p-4 border-b">
        <h3 className="text-lg font-bold">Recent Orders</h3>
      </div>

      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Order ID</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Items</th>
            <th className="p-3">Total</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{order.id}</td>
              <td className="p-3">{order.customer}</td>
              <td className="p-3">{order.items}</td>
              <td className="p-3 font-semibold">{order.total}</td>
              <td className="p-3">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
