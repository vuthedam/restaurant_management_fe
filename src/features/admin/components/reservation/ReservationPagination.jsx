const ReservationPagination = ({
  page = 1,
  pageCount = 1,
  shown = 0,
  total = 0,
  onPageChange,
}) => {
  return (
    <div className="p-4 border-t flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-gray-500">
        Trang {page}/{pageCount} — hiển thị {shown} / {total} đặt bàn
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange?.(page - 1)}
          className="px-3 py-1 border rounded-lg text-sm disabled:opacity-40"
        >
          Trước
        </button>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onPageChange?.(n)}
            className={`w-8 h-8 border rounded-lg text-sm font-semibold ${
              n === page ? "bg-orange-100 text-orange-600" : ""
            }`}
          >
            {n}
          </button>
        ))}
        <button
          type="button"
          disabled={page >= pageCount}
          onClick={() => onPageChange?.(page + 1)}
          className="px-3 py-1 border rounded-lg text-sm disabled:opacity-40"
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default ReservationPagination;
