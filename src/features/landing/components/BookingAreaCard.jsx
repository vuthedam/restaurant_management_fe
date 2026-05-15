const BookingAreaCard = ({
  areaId,
  title,
  subtitle,
  imageSrc,
  imageAlt,
  checked,
  onSelect,
}) => {
  return (
    <label
      className={`group relative block cursor-pointer overflow-hidden rounded-xl border bg-surface-container-lowest transition-all ${
        checked
          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
          : "border-outline-variant hover:border-outline"
      }`}
    >
      <input
        type="radio"
        name="area"
        value={areaId}
        checked={checked}
        onChange={() => onSelect(areaId)}
        className="sr-only"
      />
      <div
        className="h-32 w-full bg-cover bg-center"
        style={{ backgroundImage: `url('${imageSrc}')` }}
        role="img"
        aria-label={imageAlt}
      />
      <div className="flex items-center justify-between p-md">
        <div>
          <span className="font-bold text-on-surface">{title}</span>
          <p className="font-body text-xs font-bold uppercase tracking-wider text-secondary">
            {subtitle}
          </p>
        </div>
        <span
          className={`material-symbols-outlined text-primary ${checked ? "inline" : "hidden"}`}
          style={{ fontVariationSettings: "'FILL' 1" }}
          aria-hidden
        >
          check_circle
        </span>
      </div>
    </label>
  );
};

export default BookingAreaCard;
