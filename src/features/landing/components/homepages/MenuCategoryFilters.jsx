const MenuCategoryFilters = ({ filters = [], active, onChange }) => {
  return (
    <div className="flex flex-wrap gap-sm">
      {filters.map((label) => {
        const isActive = label === active;
        return (
          <button
            key={label}
            type="button"
            onClick={() => onChange?.(label)}
            className={
              isActive
                ? "rounded-full bg-primary px-md py-sm font-body text-xs font-bold uppercase tracking-wider text-on-primary cursor-pointer"
                : "rounded-full bg-surface-container px-md py-sm font-body text-xs font-bold uppercase tracking-wider text-on-surface-variant transition-colors hover:bg-primary/10 cursor-pointer"
            }
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default MenuCategoryFilters;
