const ReservationRow = ({ name, guests, table, time, status }) => {
  return (
    <tr className="hover:bg-orange-50 transition-colors">
      <td className="px-4 py-4 font-semibold">{name}</td>

      <td className="px-4 py-4">{guests} Guests</td>

      <td className="px-4 py-4">{table}</td>

      <td className="px-4 py-4">{time}</td>

      <td className="px-4 py-4">
        <span className="px-3 py-1 rounded-full text-xs bg-orange-500 text-white">
          {status}
        </span>
      </td>

      <td className="px-4 py-4 text-right">
        <button className="mr-2">
          <span className="material-symbols-outlined">edit</span>
        </button>

        <button>
          <span className="material-symbols-outlined">check_circle</span>
        </button>
      </td>
    </tr>
  );
};

export default ReservationRow;
