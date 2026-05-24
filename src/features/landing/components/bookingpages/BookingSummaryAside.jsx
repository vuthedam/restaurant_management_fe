const BookingSummaryAside = ({ formId, dateLabel, time, guests, areaLabel, submitting }) => {
  return (
    <aside className="lg:w-1/3">
      <div className="sticky top-24 rounded-xl border border-outline-variant bg-surface-container-lowest p-lg shadow-sm lg:top-28">
        <h3 className="mb-lg font-display text-2xl font-semibold text-on-surface">
          Tóm tắt đặt bàn
        </h3>

        <div className="mb-lg space-y-md border-b border-outline-variant pb-lg">
          <div className="flex items-center gap-md">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary-container/10 text-primary">
              <span className="material-symbols-outlined">event</span>
            </div>
            <div>
              <p className="font-body text-xs font-bold uppercase tracking-wider text-secondary">
                Ngày &amp; giờ
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
                Số khách
              </p>
              <p className="font-bold text-on-surface">
                {guests} {guests === 1 ? "người" : "người"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-md">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary-container/10 text-primary">
              <span className="material-symbols-outlined">deck</span>
            </div>
            <div>
              <p className="font-body text-xs font-bold uppercase tracking-wider text-secondary">
                Khu vực
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
              Bàn được giữ trong 15 phút sau giờ đặt.
            </p>
          </div>
        </div>

        <button
          type="submit"
          form={formId}
          disabled={submitting}
          className="w-full scale-100 rounded-lg bg-primary py-md font-body text-lg font-bold text-on-primary shadow-md transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60 cursor-pointer"
        >
          {submitting ? "Đang gửi..." : "Xác nhận đặt bàn"}
        </button>

        <p className="mt-md text-center font-body text-xs font-bold uppercase tracking-wider text-secondary">
          Bằng việc xác nhận, bạn đồng ý với Điều khoản dịch vụ.
        </p>
      </div>
    </aside>
  );
};

export default BookingSummaryAside;
