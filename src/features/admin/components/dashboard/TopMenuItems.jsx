const items = [
  {
    name: "Avocado Power Bowl",
    sold: "84 sold today",
    price: "$1,428",
  },
  {
    name: "Truffle Marguerita",
    sold: "65 sold today",
    price: "$1,170",
  },
  {
    name: "Signature BBQ Ribs",
    sold: "42 sold today",
    price: "$924",
  },
];

export default function TopMenuItems() {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-bold mb-4">Top Menu Items</h3>

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
