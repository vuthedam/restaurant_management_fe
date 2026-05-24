export function PageLoading() {
  return (
    <div className="rounded-xl border bg-white p-12 text-center text-gray-500 shadow-sm">
      Đang tải dữ liệu...
    </div>
  );
}

export function PageError({ message, onRetry }) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
      <p className="text-red-700">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
        >
          Thử lại
        </button>
      ) : null}
    </div>
  );
}
