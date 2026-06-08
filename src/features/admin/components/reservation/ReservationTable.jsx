import ReservationRow from "./ReservationRow";

const ReservationTable = ({ rows = [], onAdvance, onCancel, onNoShow, busyId }) => {
  if (!rows.length) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 text-slate-500 font-medium bg-white">
        Chưa có đặt bàn nào.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto flex-1">
      <table className="w-full text-left min-w-[800px]">
        <thead className="bg-slate-50 border-b border-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-wider">
          <tr>
            <th className="px-6 py-4">Tên khách</th>
            <th className="px-6 py-4">Số khách</th>
            <th className="px-6 py-4">Bàn</th>
            <th className="px-6 py-4">Giờ đặt</th>
            <th className="px-6 py-4">Trạng thái</th>
            <th className="px-6 py-4 text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((item) => (
            <ReservationRow
              key={item.id}
              {...item}
              onAdvance={onAdvance}
              onCancel={onCancel}
              onNoShow={onNoShow}
              busy={busyId === item.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationTable;
