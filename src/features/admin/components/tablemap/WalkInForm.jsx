/**
 * COMPONENT: WalkInForm
 * THUỘC: QuickSummary — Sơ đồ bàn (/admin/tables)
 * ĐỊA CHỈ FILE: table-order-ap/src/features/admin/components/tablemap/WalkInForm.jsx
 *
 * MÔ TẢ: Form mở bàn nhanh cho khách vãng lai (không đặt trước).
 */

export default function WalkInForm({ table, name, guests, onNameChange, onGuestsChange, onSubmit, submitting }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <h4 className="font-semibold text-sm text-slate-800 flex items-center gap-2 mb-1">
        <span className="material-symbols-outlined text-base text-slate-500">person_add</span>
        Khách vãng lai (Mở bàn nhanh)
      </h4>
      <input
        type="text"
        placeholder="Tên khách (tùy chọn)"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white transition-all duration-200"
        disabled={submitting}
      />
      <div className="flex gap-2 items-center">
        <span className="text-sm font-medium text-slate-500">Số khách:</span>
        <input
          type="number"
          min={1}
          max={(table.capacity || table.seats || 2) + 2}
          value={guests}
          onChange={(e) => onGuestsChange(Number(e.target.value))}
          className="w-20 border border-slate-200 rounded-xl px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white transition-all duration-200"
          disabled={submitting}
        />
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98] disabled:opacity-50"
        >
          Mở bàn
        </button>
      </div>
    </form>
  );
}
