import TableCard from "./TableCard";
import BarSeat from "./BarSeat";
import { mapTableForCard } from "../../utils/adminMappers";

const TableGrid = ({ tables = [], selectedTableId, onSelectTable }) => {
  if (!tables.length) {
    return (
      <p className="text-center text-gray-500 py-12">Chưa có bàn trong hệ thống.</p>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {tables.map((table) => {
          const card = mapTableForCard(table);
          return (
            <TableCard
              key={table._id}
              table={card}
              isSelected={table._id === selectedTableId}
              onClick={() => onSelectTable?.(table._id)}
            />
          );
        })}
      </div>
      <BarSeat />
    </div>
  );
};

export default TableGrid;
