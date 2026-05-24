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

  return (
    <tr className="hover:bg-orange-50 transition-colors">
      <td className="px-4 py-4 font-semibold">{name}</td>
      <td className="px-4 py-4">{guests} khách</td>
      <td className="px-4 py-4">{table}</td>
      <td className="px-4 py-4">{time}</td>
      <td className="px-4 py-4">
        <span className="px-3 py-1 rounded-full text-xs bg-orange-500 text-white">
          {status}
        </span>
      </td>
      <td className="px-4 py-4 text-right whitespace-nowrap">
        {canAdvance && getNextReservationStatus(rawStatus) ? (
          <button
            type="button"
            disabled={busy}
            title={nextLabel}
            onClick={() => onAdvance?.(id, getNextReservationStatus(rawStatus))}
            className="mr-2 p-1 rounded hover:bg-green-100 text-green-700 disabled:opacity-50"
          >
            <span className="material-symbols-outlined">check_circle</span>
          </button>
        ) : null}
        {rawStatus === "confirmed" ? (
          <button
            type="button"
            disabled={busy}
            title="Khách không đến (No-Show)"
            onClick={() => onNoShow?.(id)}
            className="mr-2 p-1 rounded hover:bg-yellow-100 text-yellow-600 disabled:opacity-50"
          >
            <span className="material-symbols-outlined">person_off</span>
          </button>
        ) : null}
        {canCancel ? (
          <button
            type="button"
            disabled={busy}
            title="Huỷ đặt bàn"
            onClick={() => onCancel?.(id)}
            className="p-1 rounded hover:bg-red-100 text-red-600 disabled:opacity-50"
          >
            <span className="material-symbols-outlined">cancel</span>
          </button>
        ) : null}
      </td>
    </tr>
  );
};

export default ReservationRow;
