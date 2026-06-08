import { useState, useEffect } from "react";
import { submitGuestServiceCall, getOrderApiError } from "../services/orderApi";

export default function SupportModal({
  isOpen,
  onClose,
  tableId,
  tableSessionId,
  onSuccess,
}) {
  const [selectedOption, setSelectedOption] = useState("");
  const [customNote, setCustomNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Quick options mapping
  const OPTIONS = [
    {
      id: "payment",
      label: "Thanh toán",
      type: "request_payment",
      defaultNote: "Khách yêu cầu thanh toán",
      icon: "payments",
    },
    {
      id: "water",
      label: "Xin thêm nước",
      type: "need_water",
      defaultNote: "Khách xin thêm nước",
      icon: "water_drop",
    },
    {
      id: "napkin",
      label: "Xin thêm khăn giấy",
      type: "clean_table",
      defaultNote: "Khách xin thêm khăn giấy",
      icon: "dry_cleaning",
    },
    {
      id: "missing",
      label: "Báo thiếu món",
      type: "call_staff",
      defaultNote: "Khách báo thiếu món",
      icon: "local_dining",
    },
    {
      id: "staff",
      label: "Gọi nhân viên",
      type: "call_staff",
      defaultNote: "Khách cần nhân viên hỗ trợ",
      icon: "support_agent",
    },
    {
      id: "other",
      label: "Khác",
      type: "other",
      defaultNote: "",
      icon: "more_horiz",
    },
  ];

  // Cooldown timer effect
  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  if (!isOpen) return null;

  const handleClose = () => {
    if (!submitting) {
      setError(null);
      setSuccess(false);
      setSelectedOption("");
      setCustomNote("");
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cooldown > 0) return;
    if (!selectedOption) {
      setError("Vui lòng chọn một trong các yêu cầu hỗ trợ.");
      return;
    }

    const opt = OPTIONS.find((o) => o.id === selectedOption);
    if (!opt) return;

    let finalNote = opt.defaultNote;
    if (opt.id === "other") {
      if (!customNote.trim()) {
        setError("Vui lòng nhập nội dung yêu cầu.");
        return;
      }
      finalNote = customNote.trim();
    }

    setError(null);
    setSubmitting(true);

    try {
      const data = await submitGuestServiceCall({
        tableId,
        tableSessionId: tableSessionId || null,
        type: opt.type,
        note: finalNote,
      });

      setSuccess(true);
      setCooldown(5); // 5-second cooldown to prevent spam
      if (onSuccess) {
        onSuccess(data);
      }
    } catch (err) {
      setError(
        getOrderApiError(
          err,
          "Không gửi được yêu cầu hỗ trợ. Vui lòng thử lại.",
        ),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="relative w-full overflow-hidden bg-white border border-gray-100 rounded-3xl shadow-2xl transition-all duration-300 transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative background gradients */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="p-6 sm:p-8">
          {/* Close button */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all cursor-pointer"
            disabled={submitting}
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>

          {success ? (
            <div className="flex flex-col items-center justify-center text-center py-8 space-y-4 animate-scale-up">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center border border-green-200 shadow-md">
                <span className="material-symbols-outlined text-green-600 text-4xl font-bold animate-bounce">
                  check
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900 font-display">
                  Đã gửi yêu cầu!
                </h3>
                <p className="text-sm text-gray-600 max-w-xs mx-auto">
                  Yêu cầu hỗ trợ đã được gửi tới nhân viên phục vụ. Chúng tôi sẽ
                  có mặt ngay lập tức!
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="mt-4 px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer"
              >
                Đóng
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 font-display">
                  Yêu Cầu Hỗ Trợ
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Chọn một trong các yêu cầu nhanh dưới đây để được trợ giúp
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 text-center animate-shake">
                  {error}
                </div>
              )}

              {/* Grid Options */}
              <div className="grid grid-cols-2 gap-3">
                {OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setSelectedOption(opt.id);
                      setError(null);
                    }}
                    className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer ${
                      selectedOption === opt.id
                        ? "border-orange-500 bg-orange-50/70 text-orange-700 font-bold scale-[1.02] shadow-sm"
                        : "border-gray-100 bg-gray-50/50 hover:bg-gray-100/70 text-gray-700"
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-2xl ${
                        selectedOption === opt.id
                          ? "text-orange-600"
                          : "text-gray-500"
                      }`}
                    >
                      {opt.icon}
                    </span>
                    <span className="text-xs">{opt.label}</span>
                  </button>
                ))}
              </div>

              {/* Custom Textarea for 'Other' */}
              {selectedOption === "other" && (
                <div className="space-y-1.5 animate-fade-in">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Nội dung yêu cầu cụ thể
                  </label>
                  <textarea
                    rows="3"
                    maxLength={150}
                    value={customNote}
                    onChange={(e) => {
                      setCustomNote(e.target.value);
                      setError(null);
                    }}
                    placeholder="Ví dụ: Xin thêm bát đũa, Gọi quản lý, Đổi vị trí ngồi..."
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none text-sm text-gray-800"
                    disabled={submitting}
                  />
                  <div className="flex justify-end">
                    <span className="text-[10px] text-gray-400">
                      {customNote.length}/150
                    </span>
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl text-sm transition-all cursor-pointer"
                  disabled={submitting}
                >
                  Bỏ qua
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl text-sm transition-all shadow-md hover:shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
                  disabled={submitting || cooldown > 0}
                >
                  {submitting ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Đang gửi...
                    </>
                  ) : cooldown > 0 ? (
                    `Chờ ${cooldown}s`
                  ) : (
                    "Gửi yêu cầu"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
