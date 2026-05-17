import MenuCategoryFilters from "./MenuCategoryFilters";
import MenuBentoItem from "./MenuBentoItem";
import { menuItems, menuSectionIntro } from "../../data/landingData";

const MenuSection = () => {
  const { kicker, title } = menuSectionIntro;

  return (
    <section className="mx-auto max-w-7xl px-margin py-xl" id="menu">
      <div className="mb-xl flex flex-col items-end justify-between gap-md md:flex-row">
        <div>
          <span className="font-body text-xs font-bold uppercase tracking-widest text-primary">
            {kicker}
          </span>
          <h2 className="mt-xs font-display text-4xl font-bold">{title}</h2>
        </div>
        <MenuCategoryFilters />
      </div>

      <div className="grid grid-cols-1 gap-gutter md:grid-cols-12">
        {menuItems.map((item) => (
          <MenuBentoItem key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
