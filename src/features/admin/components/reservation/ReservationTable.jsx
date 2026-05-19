import ReservationRow from "./ReservationRow";

const ReservationTable = () => {
  const reservations = [
    {
      name: "Julianne Smith",
      guests: 4,
      table: "T-14",
      time: "18:30",
      status: "Waiting",
    },
    {
      name: "Robert Kenedy",
      guests: 2,
      table: "T-08",
      time: "19:00",
      status: "Confirmed",
    },
    {
      name: "Mia Lowenstein",
      guests: 6,
      table: "L-02",
      time: "18:00",
      status: "Checked-In",
    },
  ];

  return (
    <div className="overflow-x-auto flex-1">
      <table className="w-full text-left min-w-[800px]">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3">Guest Name</th>

            <th className="px-4 py-3">Party Size</th>

            <th className="px-4 py-3">Assigned Table</th>

            <th className="px-4 py-3">Booking Time</th>

            <th className="px-4 py-3">Status</th>

            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {reservations.map((item, index) => (
            <ReservationRow key={index} {...item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationTable;
