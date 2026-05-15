import { useCallback, useMemo, useState } from "react";
import SiteHeader from "../components/SiteHeader";
import BookingFormFields from "../components/BookingFormFields";
import BookingSummaryAside from "../components/BookingSummaryAside";
import LandingFooter from "../components/LandingFooter";
import { bookingAreas } from "../data/bookingData";
import { formatDateLabel, todayIsoDate } from "../utils/bookingDate";

const FORM_ID = "quick-booking-form";

function initialForm() {
  return {
    fullName: "",
    phone: "",
    date: todayIsoDate(),
    time: "19:30",
    guests: 2,
    area: "indoor",
  };
}

const BookingPage = () => {
  const [form, setForm] = useState(initialForm);

  const onFieldChange = useCallback((field, value) => {
    if (field === "guests") {
      const n = typeof value === "number" ? value : parseInt(String(value), 10);
      setForm((f) => ({
        ...f,
        guests: Math.min(20, Math.max(1, Number.isFinite(n) ? n : 1)),
      }));
      return;
    }
    if (field === "area") {
      setForm((f) => ({ ...f, area: String(value) }));
      return;
    }
    setForm((f) => ({ ...f, [field]: value }));
  }, []);

  const areaLabel = useMemo(
    () => bookingAreas.find((a) => a.id === form.area)?.summaryLabel ?? "—",
    [form.area],
  );

  const dateLabel = useMemo(() => formatDateLabel(form.date), [form.date]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-dvh flex-col bg-background font-body text-on-surface">
      <SiteHeader activeLabel="Book Table" showStaffLoginMobile={false} />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-xl px-margin pb-xl pt-[72px] lg:flex-row">
        <div className="flex-1 lg:w-2/3">
          <div className="mb-xl">
            <h1 className="mb-sm font-display text-3xl font-bold tracking-tight text-on-surface">
              Quick Booking
            </h1>
            <p className="font-body text-base text-secondary">
              Reserve your spot in seconds. No account required.
            </p>
          </div>

          <BookingFormFields
            formId={FORM_ID}
            values={form}
            onFieldChange={onFieldChange}
            onSubmit={handleSubmit}
          />
        </div>

        <BookingSummaryAside
          formId={FORM_ID}
          dateLabel={dateLabel}
          time={form.time}
          guests={form.guests}
          areaLabel={areaLabel}
        />
      </main>

      <LandingFooter variant="simple" />
    </div>
  );
};

export default BookingPage;
