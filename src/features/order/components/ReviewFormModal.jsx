import { useState } from "react";
import { submitGuestReview, getOrderApiError } from "../services/orderApi";

export default function ReviewFormModal({ isOpen, onClose, tableSessionId, orderId }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Vui lòng chọn số sao đánh giá (từ 1 đến 5 sao).");
      return;
    }
    setError(null);
    setSubmitting(true);

    try {
      await submitGuestReview({
        tableSessionId,
        orderId: orderId || null,
        rating,
        comment: comment.trim() || null,
      });
      setSuccess(true);
      // Reset form
      setRating(0);
      setComment("");
    } catch (err) {
      setError(getOrderApiError(err, "Không gửi được đánh giá. Vui lòng thử lại."));
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError(null);
    onClose();
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
                  Cảm ơn quý khách!
                </h3>
                <p className="text-sm text-gray-600 max-w-xs mx-auto">
                  Ý kiến của quý khách là động lực giúp nhà hàng nâng cao chất lượng dịch vụ mỗi ngày.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="mt-4 px-6 py-2.5 bg-primary hover:bg-orange-700 text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer"
              >
                Đóng
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 font-display">
                  Đánh Giá Dịch Vụ
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Trải nghiệm của quý khách hôm nay thế nào?
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 text-center animate-shake">
                  {error}
                </div>
              )}

              {/* Star Rating Selector */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                    >
                      <span
                        className={`text-4xl transition-colors duration-200 ${
                          star <= (hoverRating || rating)
                            ? "text-amber-500 fill-current"
                            : "text-gray-300"
                        }`}
                        style={{
                          fontVariationSettings: star <= (hoverRating || rating) ? '"FILL" 1' : '"FILL" 0'
                        }}
                      >
                        ★
                      </span>
                    </button>
                  ))}
                </div>
                <span className="text-xs font-bold text-amber-600 h-4">
                  {rating === 1 && "Tệ"}
                  {rating === 2 && "Tạm được"}
                  {rating === 3 && "Bình thường"}
                  {rating === 4 && "Ngon miệng / Tốt"}
                  {rating === 5 && "Tuyệt vời / Rất hài lòng"}
                </span>
              </div>

              {/* Comment Textarea */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Ý kiến đóng góp
                </label>
                <div className="relative">
                  <textarea
                    rows="4"
                    maxLength={1000}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Quý khách có đóng góp gì về món ăn, dịch vụ hay không gian của nhà hàng..."
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-sm text-gray-800"
                    disabled={submitting}
                  />
                  <span className="absolute bottom-3 right-4 text-[10px] text-gray-400">
                    {comment.length}/1000
                  </span>
                </div>
              </div>

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
                  className="flex-1 py-3 bg-primary hover:bg-orange-700 text-white font-bold rounded-2xl text-sm transition-all shadow-md hover:shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer"
                  disabled={submitting}
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
                  ) : (
                    "Gửi đánh giá"
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
