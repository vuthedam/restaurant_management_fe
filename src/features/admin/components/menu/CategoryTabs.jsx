const CategoryTabs = ({ tabs = [], activeTab = "all", onTabChange }) => {
  if (!tabs.length) {
    return null;
  }

  return (
    <div className="flex gap-4 border-b overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange?.(tab.id)}
          className={
            activeTab === tab.id
              ? "border-b-2 border-orange-500 text-orange-500 font-bold pb-2 whitespace-nowrap"
              : "text-gray-500 pb-2 whitespace-nowrap hover:text-orange-500"
          }
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
