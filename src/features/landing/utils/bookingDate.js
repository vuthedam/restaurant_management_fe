export function todayIsoDate() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function isSameCalendarDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function formatDateLabel(iso) {
  if (!iso) return "—";
  const selected = new Date(`${iso}T12:00:00`);
  const today = new Date();
  if (isSameCalendarDay(selected, today)) return "Today";
  return selected.toLocaleDateString("en", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
