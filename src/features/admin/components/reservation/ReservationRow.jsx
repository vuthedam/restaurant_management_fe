import { getNextReservationStatus } from "../../utils/adminWorkflow";

const ReservationRow = ({
  id,
  name,
  guests,
  table,
  time,
  status,
  rawStatus,
  canAdvance,
  canCancel,
  onAdvance,
  onCancel,
  onNoShow,
  busy = false,
}) => {
  const nextLabel =
    rawStatus === "pending"
      ? "Xác nhận"
      : rawStatus === "confirmed"
        ? "Check-in"
        : rawStatus === "checked_in"
          ? "Hoàn thành"
          : null;

  const getBadgeClasses = (st) => {
    switch (st) {
      case "pending":
        return "bg-amber-50 text-amber-600 border border-amber-100/50";
      case "confirmed":
        return "bg-blue-50 text-blue-600 border border-blue-100/50";
      case "checked_in":
      case "completed":
        return "bg-emerald-50 text-emerald-600 border border-emerald-100/50";
      case "cancelled":
      case "no_show":
        return "bg-red-50 text-red-600 border border-red-100/50";
      default:
        return "bg-slate-50 text-slate-600 border border-slate-200/50";
    }
  };

  return (
    <tr className="hover:bg-slate-50 transition-colors text-slate-700">
      <td className="px-6 py-4 font-semibold text-slate-800">{name}</td>
      <td className="px-6 py-4">{guests} khách</td>
      <td className="px-6 py-4">{table}</td>
      <td className="px-6 py-4">{time}</td>
      <td className="px-6 py-4">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getBadgeClasses(rawStatus)}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-right whitespace-nowrap">
        {canAdvance && getNextReservationStatus(rawStatus) ? (
          <button
            type="button"
            disabled={busy}
            title={nextLabel}
            onClick={() => onAdvance?.(id, getNextReservationStatus(rawStatus))}
            className="mr-1.5 p-1.5 rounded-xl hover:bg-emerald-50 text-emerald-600 disabled:opacity-50 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">check_circle</span>
          </button>
        ) : null}
        {rawStatus === "confirmed" ? (
          <button
            type="button"
            disabled={busy}
            title="Khách không đến (No-Show)"
            onClick={() => onNoShow?.(id)}
            className="mr-1.5 p-1.5 rounded-xl hover:bg-amber-50 text-amber-600 disabled:opacity-50 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">person_off</span>
          </button>
        ) : null}
        {canCancel ? (
          <button
            type="button"
            disabled={busy}
            title="Huỷ đặt bàn"
            onClick={() => onCancel?.(id)}
            className="p-1.5 rounded-xl hover:bg-red-50 text-red-500 disabled:opacity-50 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">cancel</span>
          </button>
        ) : null}
      </td>
    </tr>
  );
};

export default ReservationRow;
