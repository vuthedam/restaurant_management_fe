import BookingAreaCard from "./BookingAreaCard";
import { bookingAreas, bookingTimeOptions } from "../../data/bookingData";

const inputClass =
  "w-full rounded-lg border border-outline-variant outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary";

const iconInputClass = `${inputClass} py-md pl-xl pr-md`;

function BookingFormFields({ formId, onSubmit, values, onFieldChange }) {
  const { fullName, phone, date, time, guests, area } = values;

  return (
    <form id={formId} className="space-y-lg" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-md rounded-xl border border-outline-variant bg-surface-container-lowest p-lg shadow-sm md:grid-cols-2">
        <div className="space-y-xs">
          <label
            htmlFor="booking-full-name"
            className="block font-body text-xs font-bold uppercase tracking-wider text-on-surface-variant"
          >
            Full name
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline">
              person
            </span>
            <input
              id="booking-full-name"
              type="text"
              value={fullName}
              onChange={(e) => onFieldChange("fullName", e.target.value)}
              placeholder="John Doe"
              className={iconInputClass}
            />
          </div>
        </div>

        <div className="space-y-xs">
          <label
            htmlFor="booking-phone"
            className="block font-body text-xs font-bold uppercase tracking-wider text-on-surface-variant"
          >
            Phone number
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline">
              call
            </span>
            <input
              id="booking-phone"
              type="tel"
              value={phone}
              onChange={(e) => onFieldChange("phone", e.target.value)}
              placeholder="+1 (555) 000-0000"
              className={iconInputClass}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-md rounded-xl border border-outline-variant bg-surface-container-lowest p-lg shadow-sm md:grid-cols-3">
        <div className="space-y-xs">
          <label
            htmlFor="booking-date"
            className="block font-body text-xs font-bold uppercase tracking-wider text-on-surface-variant"
          >
            Date
          </label>
          <input
            id="booking-date"
            type="date"
            value={date}
            onChange={(e) => onFieldChange("date", e.target.value)}
            className={`${inputClass} px-md py-md`}
          />
        </div>

        <div className="space-y-xs">
          <label
            htmlFor="booking-time"
            className="block font-body text-xs font-bold uppercase tracking-wider text-on-surface-variant"
          >
            Time
          </label>
          <select
            id="booking-time"
            value={time}
            onChange={(e) => onFieldChange("time", e.target.value)}
            className={`${inputClass} bg-white px-md py-md`}
          >
            {bookingTimeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-xs">
          <label
            htmlFor="booking-guests"
            className="block font-body text-xs font-bold uppercase tracking-wider text-on-surface-variant"
          >
            Guests
          </label>
          <input
            id="booking-guests"
            type="number"
            min={1}
            max={20}
            value={guests}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              onFieldChange("guests", Number.isFinite(v) ? v : 1);
            }}
            className={`${inputClass} px-md py-md`}
          />
        </div>
      </div>

      <div className="space-y-md">
        <h3 className="font-display text-2xl font-semibold text-on-surface">
          Select Table Area
        </h3>
        <div className="grid grid-cols-1 gap-md md:grid-cols-3">
          {bookingAreas.map((a) => (
            <BookingAreaCard
              key={a.id}
              areaId={a.id}
              title={a.title}
              subtitle={a.subtitle}
              imageSrc={a.imageSrc}
              imageAlt={`${a.title} dining area`}
              checked={area === a.id}
              onSelect={(id) => onFieldChange("area", id)}
            />
          ))}
        </div>
      </div>
    </form>
  );
}

export default BookingFormFields;
