const tabs = ["All Items", "Starters", "Main Course", "Desserts", "Beverages"];

export default function CategoryTabs() {
  return (
    <div className="flex gap-4 border-b overflow-x-auto">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`pb-2 whitespace-nowrap ${
            index === 0
              ? "border-b-2 border-orange-500 text-orange-500 font-bold"
              : "text-gray-500"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
