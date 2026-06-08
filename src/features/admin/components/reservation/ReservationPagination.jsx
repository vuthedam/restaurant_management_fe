const ReservationPagination = ({
  page = 1,
  pageCount = 1,
  shown = 0,
  total = 0,
  onPageChange,
}) => {
  return (
    <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-slate-500">
        Trang {page}/{pageCount} — hiển thị {shown} / {total} đặt bàn
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange?.(page - 1)}
          className="px-3 py-1.5 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 rounded-xl text-sm font-semibold disabled:opacity-40 transition-all cursor-pointer"
        >
          Trước
        </button>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onPageChange?.(n)}
            className={`w-8 h-8 border text-sm font-semibold transition-all rounded-xl cursor-pointer ${
              n === page ? "border-orange-100 bg-orange-50 text-orange-600 font-bold shadow-xs" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {n}
          </button>
        ))}
        <button
          type="button"
          disabled={page >= pageCount}
          onClick={() => onPageChange?.(page + 1)}
          className="px-3 py-1.5 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 rounded-xl text-sm font-semibold disabled:opacity-40 transition-all cursor-pointer"
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default ReservationPagination;
