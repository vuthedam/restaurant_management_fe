import { useEffect, useState } from "react";
import MenuCategoryFilters from "./MenuCategoryFilters";
import MenuBentoItem from "./MenuBentoItem";
import { fetchPublicMenu } from "../../../order/services/orderApi";
import { menuSectionIntro } from "../../data/landingData";

const MenuSection = () => {
  const { kicker, title } = menuSectionIntro;
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMenu = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPublicMenu();
      setCategories(data?.categories || []);
      setItems(data?.items || []);
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Không thể tải thực đơn.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenu();
  }, []);

  const filters = ["Tất cả", ...categories.map((c) => c.name)];

  const filteredItems = items.filter((item) => {
    if (activeFilter === "Tất cả") return true;
    const cat = categories.find((c) => c.name === activeFilter);
    return cat ? String(item.categoryId) === String(cat._id) : true;
  });

  return (
    <section className="mx-auto max-w-7xl px-margin py-xl" id="menu">
      <div className="mb-xl flex flex-col items-end justify-between gap-md md:flex-row">
        <div>
          <span className="font-body text-xs font-bold uppercase tracking-widest text-primary">
            {kicker}
          </span>
          <h2 className="mt-xs font-display text-4xl font-bold">{title}</h2>
        </div>
        {!loading && !error && (
          <MenuCategoryFilters
            filters={filters}
            active={activeFilter}
            onChange={setActiveFilter}
          />
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-12">
          {[...Array(6)].map((_, i) => {
            const col =
              i === 0
                ? "md:col-span-8 h-[400px]"
                : i === 1
                  ? "md:col-span-4 h-[400px]"
                  : "md:col-span-4 h-[320px]";
            return (
              <div
                key={i}
                className={`${col} animate-pulse rounded-xl bg-surface-container-high`}
              />
            );
          })}
        </div>
      ) : error ? (
        <div className="text-center py-12 bg-surface-container-low rounded-2xl border p-6 max-w-md mx-auto">
          <p className="text-red-500 mb-4 font-semibold">{error}</p>
          <button
            type="button"
            onClick={loadMenu}
            className="px-6 py-2.5 bg-primary text-on-primary rounded-xl font-bold hover:bg-primary/95 transition cursor-pointer"
          >
            Thử lại
          </button>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-16 text-on-surface-variant bg-surface-container-lowest border rounded-xl">
          Chưa có món ăn nào trong danh mục này.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-12">
          {filteredItems.map((item, index) => {
            // Assign grid variant based on index
            let variant = "compact";
            if (index === 0) variant = "featured";
            else if (index === 1) variant = "square";

            const formattedPrice = new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(item.price);

            return (
              <MenuBentoItem
                key={item._id || item.id}
                variant={variant}
                title={item.name}
                description={item.description}
                price={formattedPrice}
                imageSrc={
                  item.image ||
                  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"
                }
                imageAlt={item.name}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default MenuSection;
