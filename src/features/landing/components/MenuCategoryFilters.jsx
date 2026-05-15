import { useState } from "react";
import { menuFilters } from "../data/landingData";

const MenuCategoryFilters = () => {
  const [active, setActive] = useState(menuFilters[0]);

  return (
    <div className="flex flex-wrap gap-sm">
      {menuFilters.map((label) => {
        const isActive = label === active;
        return (
          <button
            key={label}
            type="button"
            onClick={() => setActive(label)}
            className={
              isActive
                ? "rounded-full bg-primary px-md py-sm font-body text-xs font-bold uppercase tracking-wider text-on-primary"
                : "rounded-full bg-surface-container px-md py-sm font-body text-xs font-bold uppercase tracking-wider text-on-surface-variant transition-colors hover:bg-primary/10"
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
