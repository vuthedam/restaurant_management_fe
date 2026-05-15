import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import OrderCard from "../components/orders/OrderCard";

const ordersData = [
  {
    table: "12",
    timeAgo: "8m ago",
    time: "12:42 PM",
    action: "MARK AS READY",
    border: "border-orange-300",
    headerBg: "bg-orange-50 text-orange-600",
    buttonColor: "bg-orange-500",
    items: [
      { qty: 2, name: "Truffle Burgers", note: "M. Rare" },
      { qty: 1, name: "Caesar Salad", note: "No Croutons" },
      { qty: 1, name: "Sweet Potato Fries" },
    ],
  },
  {
    table: "04",
    timeAgo: "22m ago",
    time: "12:28 PM",
    action: "ORDER SERVED",
    border: "border-gray-300",
    headerBg: "bg-gray-100 text-gray-700",
    buttonColor: "bg-gray-600",
    items: [
      { qty: 4, name: "Pork Ramen XL" },
      { qty: 2, name: "Gyoza (6pc)" },
    ],
  },
  {
    table: "07",
    timeAgo: "Just now",
    time: "NEW ORDER",
    action: "START PREP",
    border: "border-red-400",
    headerBg: "bg-red-100 text-red-600",
    buttonColor: "bg-red-500",
    items: [
      { qty: 1, name: "Ribeye Steak 400g", note: "WELL DONE" },
      { qty: 1, name: "Red Wine Gravy" },
      { qty: 2, name: "Old Fashioned" },
    ],
  },
  {
    table: "21",
    timeAgo: "38m ago",
    time: "12:10 PM",
    action: "MARK AS READY",
    border: "border-yellow-300",
    headerBg: "bg-yellow-50 text-yellow-700",
    buttonColor: "bg-yellow-500",
    items: [
      { qty: 3, name: "Margherita Pizza" },
      { qty: 1, name: "Spaghetti Vongole", note: "Extra Garlic" },
    ],
  },
];

const Orders = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Header title="Live Orders" />

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {ordersData.map((order, index) => (
              <OrderCard key={index} order={order} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
