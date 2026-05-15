import TableCard from "./TableCard";
import { tables } from "./tableData";
import BarSeat from "./BarSeat";

const TableGrid = () => {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {tables.map((table) => (
          <TableCard key={table.id} table={table} />
        ))}
      </div>

      <BarSeat />
    </div>
  );
};

export default TableGrid;
