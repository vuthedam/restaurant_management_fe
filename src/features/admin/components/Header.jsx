export default function Header({
  title = "Tổng quan",
  subtitle,
  actionLabel,
  onAction,
}) {
  const dateStr =
    subtitle ??
    new Date().toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <header className="bg-white border-b sticky top-0 z-30 shadow-sm">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div>
          <h2 className="text-3xl font-bold text-orange-600">{title}</h2>
          <p className="text-sm text-gray-500">{dateStr}</p>
        </div>

        {actionLabel ? (
          <button
            type="button"
            onClick={onAction}
            className="bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-700 transition"
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
    </header>
  );
}
