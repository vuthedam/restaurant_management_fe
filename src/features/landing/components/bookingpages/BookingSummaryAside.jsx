const BookingSummaryAside = ({ formId, dateLabel, time, guests, areaLabel }) => {
  return (
    <aside className="lg:w-1/3">
      <div className="sticky top-24 rounded-xl border border-outline-variant bg-surface-container-lowest p-lg shadow-sm lg:top-28">
        <h3 className="mb-lg font-display text-2xl font-semibold text-on-surface">
          Reservation Summary
        </h3>

        <div className="mb-lg space-y-md border-b border-outline-variant pb-lg">
          <div className="flex items-center gap-md">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary-container/10 text-primary">
              <span className="material-symbols-outlined">event</span>
            </div>
            <div>
              <p className="font-body text-xs font-bold uppercase tracking-wider text-secondary">
                Date &amp; time
              </p>
              <p className="font-bold text-on-surface">
                {dateLabel}
                {time ? `, ${time}` : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-md">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary-container/10 text-primary">
              <span className="material-symbols-outlined">group</span>
            </div>
            <div>
              <p className="font-body text-xs font-bold uppercase tracking-wider text-secondary">
                Guests
              </p>
              <p className="font-bold text-on-surface">
                {guests} {guests === 1 ? "Person" : "People"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-md">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary-container/10 text-primary">
              <span className="material-symbols-outlined">deck</span>
            </div>
            <div>
              <p className="font-body text-xs font-bold uppercase tracking-wider text-secondary">
                Area
              </p>
              <p className="font-bold text-on-surface">{areaLabel}</p>
            </div>
          </div>
        </div>

        <div className="mb-lg rounded-lg bg-surface-container-low p-md">
          <div className="flex items-start gap-sm">
            <span
              className="material-symbols-outlined mt-xs text-[20px] text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              info
            </span>
            <p className="font-body text-xs font-bold uppercase italic leading-snug tracking-wider text-on-surface-variant">
              Tables are held for 15 minutes past reservation time.
            </p>
          </div>
        </div>

        <button
          type="submit"
          form={formId}
          className="w-full scale-100 rounded-lg bg-primary py-md font-body text-lg font-bold text-on-primary shadow-md transition-all hover:brightness-110 active:scale-[0.98]"
        >
          Confirm Booking
        </button>

        <p className="mt-md text-center font-body text-xs font-bold uppercase tracking-wider text-secondary">
          By clicking, you agree to our Terms of Service.
        </p>
      </div>
    </aside>
  );
};

export default BookingSummaryAside;
