export function PageLoading() {
  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white p-12 text-center text-slate-500 shadow-sm font-medium">
      Đang tải dữ liệu...
    </div>
  );
}

export function PageError({ message, onRetry }) {
  return (
    <div className="rounded-2xl border border-red-100 bg-red-50/50 p-6 text-center shadow-xs">
      <p className="text-red-700 font-medium">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition-all shadow-sm hover:shadow"
        >
          Thử lại
        </button>
      ) : null}
    </div>
  );
}
