import { reservationContent } from "../../data/landingData";

const ReservationBanner = () => {
  const { imageSrc, imageAlt, badge, imageCaption, title, description } =
    reservationContent;

  return (
    <section className="bg-inverse-surface px-margin py-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-xl md:flex-row">
        <div className="w-full md:w-1/2">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-[400px] w-full object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
              aria-hidden
            />
            <div className="absolute bottom-lg left-lg">
              <span className="mb-sm inline-block rounded-full bg-primary px-md py-xs font-body text-xs font-bold uppercase tracking-wider text-on-primary">
                {badge}
              </span>
              <p className="font-display text-2xl font-semibold text-white">
                {imageCaption}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full text-white md:w-1/2">
          <h2 className="mb-md font-display text-4xl font-bold">{title}</h2>
          <p className="mb-xl font-body text-lg opacity-80">{description}</p>

          <form className="space-y-md" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-md">
              <div className="flex flex-col gap-xs">
                <label className="font-body text-xs font-bold uppercase tracking-wider opacity-60">
                  Date
                </label>
                <input
                  type="date"
                  className="rounded-lg border border-white/20 bg-white/10 p-sm text-white outline-none focus:border-primary"
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-body text-xs font-bold uppercase tracking-wider opacity-60">
                  Guests
                </label>
                <select className="appearance-none rounded-lg border border-white/20 bg-white/10 p-sm text-white outline-none focus:border-primary">
                  <option>2 People</option>
                  <option>4 People</option>
                  <option>6+ People</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-primary py-md font-bold text-on-primary shadow-lg shadow-primary/20 transition-colors hover:bg-primary-container active:scale-[0.98]"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ReservationBanner;
