/**
 * PAGE CONTAINER: BookingPage.jsx
 * TUYẾN ĐƯỜNG (ROUTE): /booking (Đặt bàn trước trực tuyến)
 * ĐỊA CHỈ FILE: table-order-ap/src/features/landing/pages/BookingPage.jsx
 *
 * MÔ TẢ:
 * Trang đặt bàn trực tuyến dành cho khách hàng trước khi đến nhà hàng.
 * Thu thập thông tin khách hàng, số lượng khách, khu vực mong muốn, ngày giờ đặt bàn,
 * và gửi yêu cầu lưu trữ đến hệ thống quản lý đặt bàn.
 */

import { useCallback, useMemo, useState } from "react";
import SiteHeader from "../components/homepages/SiteHeader";
import BookingFormFields from "../components/bookingpages/BookingFormFields";
import BookingSummaryAside from "../components/bookingpages/BookingSummaryAside";
import LandingFooter from "../components/homepages/LandingFooter";
import { bookingAreas } from "../data/bookingData";
import { formatDateLabel, todayIsoDate } from "../utils/bookingDate";
import { placeGuestReservation } from "../../order/services/orderApi";

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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.date || !form.time) {
      setError("Vui lòng điền đầy đủ họ tên và số điện thoại.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const date = new Date(`${form.date}T${form.time || "00:00"}`);
      const payload = {
        customerName: form.fullName.trim(),
        phone: form.phone.trim(),
        guestCount: Number(form.guests),
        reservationDate: date.toISOString(),
        reservationTime: form.time,
        note: form.area ? `Khu vực đặt trước: ${bookingAreas.find((a) => a.id === form.area)?.title || form.area}` : null,
      };
      const result = await placeGuestReservation(payload);
      setSuccess(result);
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Không gửi được yêu cầu đặt bàn.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col bg-background font-body text-on-surface">
      <SiteHeader activeLabel="Đặt bàn" showStaffLoginMobile={false} />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-xl px-margin pb-xl pt-[72px] lg:flex-row">
        {success ? (
          <div className="flex-1 rounded-xl border border-primary/30 bg-primary-fixed/40 p-lg shadow-sm text-center max-w-2xl mx-auto my-12">
            <span className="material-symbols-outlined text-6xl text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            <h2 className="text-3xl font-bold text-primary mb-4">Đặt bàn thành công!</h2>
            <p className="text-on-surface mb-4">
              Cảm ơn bạn đã lựa chọn nhà hàng. Mã đặt bàn của bạn là:
            </p>
            <div className="bg-white border border-outline-variant rounded-lg p-4 max-w-xs mx-auto mb-6 text-center shadow-sm">
              <span className="text-4xl font-display font-bold text-primary tracking-widest">{success.reservationCode}</span>
            </div>
            <div className="text-left bg-surface-container-lowest border rounded-xl p-md mb-6 space-y-2">
              <p><strong>Khách hàng:</strong> {success.customerName}</p>
              <p><strong>Số điện thoại:</strong> {success.phone}</p>
              <p><strong>Thời gian:</strong> {success.reservationTime} - {formatDateLabel(success.reservationDate.split("T")[0])}</p>
              <p><strong>Số lượng:</strong> {success.guestCount} người</p>
              {success.note ? <p><strong>Ghi chú:</strong> {success.note}</p> : null}
            </div>
            <p className="text-sm text-secondary mb-6 italic">
              * Yêu cầu đặt bàn của bạn hiện đang chờ nhân viên kiểm tra và xác nhận. Chúng tôi sẽ liên hệ sớm nhất.
            </p>
            <button
              onClick={() => {
                setSuccess(null);
                setForm(initialForm());
              }}
              className="px-6 py-3 bg-primary text-on-primary font-bold rounded-lg hover:brightness-110 shadow-md active:scale-95 transition-transform"
            >
              Đặt thêm bàn khác
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 lg:w-2/3">
              <div className="mb-xl">
                <h1 className="mb-sm font-display text-3xl font-bold tracking-tight text-on-surface">
                  Đặt bàn nhanh
                </h1>
                <p className="font-body text-base text-secondary">
                  Đặt chỗ trong vài giây. Không cần tài khoản.
                </p>
              </div>

              {error ? (
                <div className="mb-6 rounded-xl border border-error/30 bg-error-container/30 px-4 py-3 text-sm text-error">
                  {error}
                </div>
              ) : null}

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
              submitting={submitting}
            />
          </>
        )}
      </main>

      <LandingFooter variant="simple" />
    </div>
  );
};

export default BookingPage;
