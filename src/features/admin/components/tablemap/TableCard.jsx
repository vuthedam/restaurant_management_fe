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

  active: {
    border: "border-primary",
    text: "text-primary",
    bg: "bg-primary/5",
    icon: "restaurant",
  },
};

const TableCard = ({ table }) => {
  const config = statusConfig[table.status];

  return (
    <div
      className={clsx(
        "relative rounded-xl p-4 border-2 flex flex-col items-center justify-center cursor-pointer transition hover:shadow-lg",
        config.border,
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
