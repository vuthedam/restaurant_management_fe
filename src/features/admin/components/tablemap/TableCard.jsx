import clsx from "clsx";

const statusConfig = {
  available: {
    border: "border-emerald-200/80 hover:border-emerald-500",
    text: "text-emerald-600",
    bg: "bg-emerald-50/40 hover:bg-emerald-50/60",
    icon: "person",
  },

  occupied: {
    border: "border-red-200/80 hover:border-red-500",
    text: "text-red-500",
    bg: "bg-red-50/40 hover:bg-red-50/60",
    icon: "group",
  },

  dirty: {
    border: "border-amber-200/80 hover:border-amber-500",
    text: "text-amber-600",
    bg: "bg-amber-50/40 hover:bg-amber-50/60",
    icon: "cleaning_services",
  },

  reserved: {
    border: "border-orange-200/80 hover:border-orange-500",
    text: "text-orange-500",
    bg: "bg-orange-50/40 hover:bg-orange-50/60",
    icon: "event_available",
  },

  waiting_payment: {
    border: "border-blue-200/80 hover:border-blue-500",
    text: "text-blue-600",
    bg: "bg-blue-50/40 hover:bg-blue-50/60",
    icon: "payments",
  },

  inactive: {
    border: "border-slate-200/60",
    text: "text-slate-400",
    bg: "bg-slate-50",
    icon: "block",
  },
};

const TableCard = ({ table, isSelected, onClick }) => {
  const config = statusConfig[table.status] || statusConfig.inactive;

  return (
    <div
      onClick={onClick}
      className={clsx(
        "relative rounded-2xl p-5 border flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-md",
        isSelected ? "ring-2 ring-orange-500 border-orange-500 scale-[1.02] shadow-sm z-10" : config.border,
        config.bg,
      )}
    >
      {table.time && (
        <div className="absolute -top-2.5 -right-2.5 bg-slate-900 text-white text-[10px] px-2.5 py-0.5 rounded-full font-medium shadow-sm">
          {table.time}
        </div>
      )}

      <span className="text-sm font-semibold text-slate-800 mb-3">{table.id}</span>

      <div
        className={clsx(
          "w-16 h-16 border-2 flex items-center justify-center bg-white shadow-sm transition-all duration-300",
          table.shape === "circle" ? "rounded-full" : "rounded-xl",
          isSelected ? "border-orange-500" : config.border,
        )}
      >
        <span className={`material-symbols-outlined text-xl ${config.text}`}>
          {config.icon}
        </span>

        {table.seats && (
          <span className={`ml-1 text-sm font-semibold ${config.text}`}>{table.seats}</span>
        )}
      </div>
    </div>
  );
};

export default TableCard;
