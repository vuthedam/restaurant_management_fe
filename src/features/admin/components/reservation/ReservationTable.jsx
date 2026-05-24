import ReservationRow from "./ReservationRow";

const ReservationTable = ({ rows = [], onAdvance, onCancel, onNoShow, busyId }) => {
  if (!rows.length) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 text-gray-500">
        Chưa có đặt bàn nào.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto flex-1">
      <table className="w-full text-left min-w-[800px]">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3">Tên khách</th>
            <th className="px-4 py-3">Số khách</th>
            <th className="px-4 py-3">Bàn</th>
            <th className="px-4 py-3">Giờ đặt</th>
            <th className="px-4 py-3">Trạng thái</th>
            <th className="px-4 py-3 text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody>
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
