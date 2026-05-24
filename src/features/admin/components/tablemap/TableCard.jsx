import clsx from "clsx";

const statusConfig = {
  available: {
    border: "border-green-500",
    text: "text-green-600",
    bg: "bg-green-50",
    icon: "person",
  },

  occupied: {
    border: "border-red-500",
    text: "text-red-500",
    bg: "bg-red-50",
    icon: "group",
  },

  dirty: {
    border: "border-yellow-400",
    text: "text-yellow-600",
    bg: "bg-yellow-50",
    icon: "cleaning_services",
  },

  reserved: {
    border: "border-orange-400",
    text: "text-orange-500",
    bg: "bg-orange-50",
    icon: "event_available",
  },

  waiting_payment: {
    border: "border-purple-500",
    text: "text-purple-600",
    bg: "bg-purple-50",
    icon: "payments",
  },

  inactive: {
    border: "border-gray-300",
    text: "text-gray-400",
    bg: "bg-gray-100",
    icon: "block",
  },
};

const TableCard = ({ table, isSelected, onClick }) => {
  const config = statusConfig[table.status] || statusConfig.inactive;

  return (
    <div
      onClick={onClick}
      className={clsx(
        "relative rounded-xl p-4 border-2 flex flex-col items-center justify-center cursor-pointer transition hover:shadow-lg",
        isSelected ? "ring-4 ring-orange-500 border-orange-600 scale-105 shadow-md z-10" : config.border,
        config.bg,
      )}
    >
      {table.time && (
        <div className="absolute -top-3 -right-3 bg-black text-white text-[10px] px-2 py-1 rounded-full">
          {table.time}
        </div>
      )}

      <span className="text-xs font-bold mb-3">{table.id}</span>

      <div
        className={clsx(
          "w-16 h-16 border-4 flex items-center justify-center",
          table.shape === "circle" ? "rounded-full" : "rounded-lg",
          config.border,
        )}
      >
        <span className={`material-symbols-outlined ${config.text}`}>
          {config.icon}
        </span>

        {table.seats && (
          <span className={`ml-1 font-bold ${config.text}`}>{table.seats}</span>
        )}
      </div>
    </div>
  );
};

export default TableCard;
