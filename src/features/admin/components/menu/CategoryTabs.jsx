const CategoryTabs = ({ tabs = [], activeTab = "all", onTabChange }) => {
  if (!tabs.length) {
    return null;
  }

  return (
    <div className="flex gap-6 border-b border-slate-200/60 overflow-x-auto scrollbar-none pb-0.5">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange?.(tab.id)}
          className={
            activeTab === tab.id
              ? "border-b-2 border-orange-500 text-orange-500 font-semibold pb-3 px-1 whitespace-nowrap transition-all"
              : "text-slate-500 pb-3 px-1 whitespace-nowrap hover:text-orange-500 transition-all font-medium"
          }
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
