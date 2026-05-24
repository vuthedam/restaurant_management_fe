const items = [
  {
    name: "Tô xanh Avocado",
    sold: "84 phần hôm nay",
    price: "1.428.000₫",
  },
  {
    name: "Pizza Truffle",
    sold: "65 phần hôm nay",
    price: "1.170.000₫",
  },
  {
    name: "Sườn BBQ đặc biệt",
    sold: "42 phần hôm nay",
    price: "924.000₫",
  },
];

export default function TopMenuItems() {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-bold mb-4">Món bán chạy</h3>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.name} className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">{item.sold}</p>
            </div>
            <p className="font-bold text-orange-600">{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
