import { formatCurrency } from "../../../utils/format";

export default function OrderMenuCard({ item, onAdd }) {
  const price = item.unitPrice ?? item.salePrice ?? item.price;
  const image =
    item.image ||
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop";

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest transition hover:shadow-md">
      <div className="aspect-[4/3] overflow-hidden bg-surface-container">
        <img src={image} alt={item.name} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-4 border-t-2 border-primary/30">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold leading-tight">{item.name}</h3>
          <span className="shrink-0 font-semibold tabular-nums text-primary">
            {formatCurrency(price)}
          </span>
        </div>
        {item.description ? (
          <p className="mb-3 line-clamp-2 text-sm text-on-surface-variant">{item.description}</p>
        ) : null}
        <button
          type="button"
          onClick={() => onAdd?.(item)}
          className="mt-auto flex w-full items-center justify-center gap-1 rounded-lg bg-primary py-2.5 text-sm font-bold text-on-primary transition hover:opacity-95"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Thêm vào đơn
        </button>
      </div>
    </article>
  );
}
