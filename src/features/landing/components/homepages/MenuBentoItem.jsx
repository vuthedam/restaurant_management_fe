const imageHover =
  "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105";

const MenuBentoItem = ({
  variant,
  title,
  description,
  price,
  imageSrc,
  imageAlt,
}) => {
  const col =
    variant === "featured" ? "md:col-span-8" : "md:col-span-4";

  const shell =
    "group relative flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest transition-all hover:shadow-lg";

  if (variant === "featured") {
    return (
      <div className={`${col} ${shell}`}>
        <div className="aspect-[16/9] overflow-hidden">
          <img src={imageSrc} alt={imageAlt} className={imageHover} />
        </div>
        <div className="border-t-4 border-primary p-lg">
          <div className="mb-sm flex items-start justify-between">
            <h3 className="font-display text-2xl font-semibold">{title}</h3>
            <span className="font-body text-sm font-semibold tabular-nums text-primary">
              {price}
            </span>
          </div>
          <p className="mb-md font-body text-base text-on-surface-variant">
            {description}
          </p>
          <button
            type="button"
            className="flex items-center gap-xs font-bold text-primary transition-all hover:gap-sm"
          >
            Add to Order
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    );
  }

  if (variant === "square") {
    return (
      <div className={`${col} ${shell}`}>
        <div className="aspect-square overflow-hidden">
          <img src={imageSrc} alt={imageAlt} className={imageHover} />
        </div>
        <div className="grow p-md">
          <h3 className="mb-xs font-display text-xl font-semibold">{title}</h3>
          <p className="mb-md font-body text-base text-on-surface-variant">
            {description}
          </p>
          <span className="font-body text-sm font-semibold tabular-nums text-primary">
            {price}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${col} ${shell}`}>
      <div className="h-48 overflow-hidden">
        <img src={imageSrc} alt={imageAlt} className={imageHover} />
      </div>
      <div className="p-md">
        <h3 className="mb-xs font-display text-xl font-semibold">{title}</h3>
        <p className="mb-sm font-body text-base text-on-surface-variant">
          {description}
        </p>
        <span className="font-body text-sm font-semibold tabular-nums text-primary">
          {price}
        </span>
      </div>
    </div>
  );
};

export default MenuBentoItem;
