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
      <h4 className="font-bold text-sm text-gray-800 flex items-center gap-1.5">
        <span className="material-symbols-outlined text-base">person_add</span>
        Khách vãng lai (Mở bàn nhanh)
      </h4>
      <input
        type="text"
        placeholder="Tên khách (tùy chọn)"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 text-sm"
        disabled={submitting}
      />
      <div className="flex gap-2 items-center">
        <span className="text-sm text-gray-600">Số khách:</span>
        <input
          type="number"
          min={1}
          max={(table.capacity || table.seats || 2) + 2}
          value={guests}
          onChange={(e) => onGuestsChange(Number(e.target.value))}
          className="w-20 border rounded-lg px-2 py-1 text-sm text-center"
          disabled={submitting}
        />
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-1.5 px-3 rounded-lg text-sm font-semibold transition disabled:opacity-60"
        >
          Mở bàn
        </button>
      </div>
    </form>
  );
}
