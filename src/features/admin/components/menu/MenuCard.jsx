import { Pencil, Trash2 } from "lucide-react";

export default function MenuCard({ item }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
      <div className="relative h-52">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
          ${item.price}
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex justify-between">
          <div>
            <h3 className="font-bold text-lg">{item.name}</h3>

            <p className="text-gray-500 text-sm">{item.category}</p>
          </div>

          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Pencil size={18} />
            </button>

            <button className="p-2 hover:bg-red-100 text-red-500 rounded-lg">
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center border-t pt-3">
          <span className="text-sm text-gray-500">
            {item.inStock ? "In Stock" : "Out Stock"}
          </span>

          <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-lg">
            {item.status}
          </span>
        </div>
      </div>
    </div>
  );
}
