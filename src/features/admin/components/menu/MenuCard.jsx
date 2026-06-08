import { Pencil, Trash2 } from "lucide-react";

export default function MenuCard({ item, readOnly = false }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-slate-200/60 transition-all duration-300">
      <div className="relative h-52">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-xl text-xs font-bold shadow-sm">
          {item.priceLabel ?? item.price}
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900">{item.name}</h3>

            <p className="text-slate-500 text-xs font-medium">{item.category}</p>
          </div>

          {!readOnly ? (
            <div className="flex gap-1.5">
              <button type="button" className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-900 transition-all cursor-pointer">
                <Pencil size={16} />
              </button>

              <button type="button" className="p-2 hover:bg-red-50 text-red-500 rounded-xl transition-all cursor-pointer">
                <Trash2 size={16} />
              </button>
            </div>
          ) : null}
        </div>

        <div className="flex justify-between items-center border-t border-slate-100 pt-3">
          <span className="text-xs font-medium text-slate-500">
            {item.inStock ? "Còn hàng" : "Hết hàng"}
          </span>

          <span className="bg-orange-50 text-orange-600 border border-orange-100/50 text-xs px-2.5 py-1 rounded-full font-semibold">
            {item.status}
          </span>
        </div>
      </div>
    </div>
  );
}
