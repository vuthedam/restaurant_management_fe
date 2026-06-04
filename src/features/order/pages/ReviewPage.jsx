import { useEffect, useState, useCallback } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import api from "../../../services/api";
import { getOrderApiError } from "../services/orderApi";

export default function ReviewPage() {
  const { tableSessionId: pathId } = useParams();
  const [searchParams] = useSearchParams();
  const tableSessionId = pathId || searchParams.get("session") || "";
  const [checking, setChecking] = useState(true);
  const [canReview, setCanReview] = useState(false);
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [sessionInfo, setSessionInfo] = useState(null);

  const [foodRating, setFoodRating] = useState(0);
  const [hoverFoodRating, setHoverFoodRating] = useState(0);

  const [serviceRating, setServiceRating] = useState(0);
  const [hoverServiceRating, setHoverServiceRating] = useState(0);

  const [ambianceRating, setAmbianceRating] = useState(0);
  const [hoverAmbianceRating, setHoverAmbianceRating] = useState(0);

  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const checkStatus = useCallback(async () => {
    setChecking(true);
    setError(null);
    try {
      const { data } = await api.get(`/reviews/check/${tableSessionId}`);
      if (data?.success) {
        setCanReview(data.data.canReview);
        setReason(data.data.reason || "");
        setMessage(data.data.message || "");
        setSessionInfo(data.data.session || null);
      } else {
        setError(data?.message || "Không thể kiểm tra trạng thái phiên bàn.");
      }
    } catch (err) {
      setError(getOrderApiError(err, "Có lỗi xảy ra khi tải thông tin."));
    } finally {
      setChecking(false);
    }
  }, [tableSessionId]);

  useEffect(() => {
    if (tableSessionId) {
      checkStatus();
    }
  }, [tableSessionId, checkStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (foodRating === 0 || serviceRating === 0 || ambianceRating === 0) {
      setError("Vui lòng chọn đầy đủ số sao cho cả 3 mục đánh giá.");
      return;
    }
    setError(null);
    setSubmitting(true);

    try {
      const payload = {
        table_session_id: tableSessionId,
        food_rating: foodRating,
        service_rating: serviceRating,
        ambiance_rating: ambianceRating,
        comment: comment.trim() || null,
      };

      await api.post("/reviews", payload);
      setSuccess(true);
    } catch (err) {
      setError(getOrderApiError(err, "Không thể gửi đánh giá. Vui lòng thử lại."));
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating, setRating, hoverRating, setHoverRating, label) => {
    return (
      <div className="flex flex-col items-center gap-1.5 p-4 rounded-2xl bg-gray-50/50 border border-gray-100 shadow-xs">
        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">{label}</span>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 transition-transform duration-200 hover:scale-125 focus:outline-none cursor-pointer"
            >
              <span
                className={`text-3xl sm:text-4xl transition-colors duration-200 ${
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
        <span className="text-xs font-semibold text-amber-600 h-4 mt-0.5">
          {(hoverRating || rating) === 1 && "Tệ"}
          {(hoverRating || rating) === 2 && "Tạm được"}
          {(hoverRating || rating) === 3 && "Bình thường"}
          {(hoverRating || rating) === 4 && "Tốt / Hài lòng"}
          {(hoverRating || rating) === 5 && "Tuyệt vời"}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-dvh bg-gradient-to-br from-orange-50 via-background to-amber-50 font-body text-on-surface flex items-center justify-center p-4">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative w-full max-w-xl bg-white border border-gray-100/80 rounded-3xl shadow-2xl p-6 sm:p-8 transition-all overflow-hidden">
        {checking ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <svg
              className="animate-spin h-8 w-8 text-primary"
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
            <p className="text-sm text-gray-500 font-medium">Đang kiểm tra thông tin phiên bàn...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 space-y-4 animate-scale-up">
            <span className="material-symbols-outlined text-red-500 text-6xl">warning</span>
            <h3 className="text-xl font-bold text-gray-900 font-display">Đã xảy ra lỗi</h3>
            <p className="text-sm text-gray-600 max-w-sm mx-auto">{error}</p>
            <button
              onClick={checkStatus}
              className="px-6 py-2.5 bg-primary hover:bg-orange-700 text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer"
            >
              Thử lại
            </button>
          </div>
        ) : success ? (
          <div className="flex flex-col items-center justify-center text-center py-12 space-y-5 animate-scale-up">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center border border-green-200 shadow-md">
              <span className="material-symbols-outlined text-green-600 text-5xl font-bold animate-bounce">
                check
              </span>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900 font-display">Gửi thành công!</h3>
              <p className="text-sm text-gray-600 max-w-sm mx-auto">
                Cảm ơn quý khách. Ý kiến quý giá của quý khách giúp chúng tôi ngày càng cải thiện dịch vụ.
              </p>
            </div>
            <Link
              to="/"
              className="px-6 py-3 bg-primary hover:bg-orange-700 text-white font-bold rounded-xl text-sm transition-all shadow-md"
            >
              Về Trang Chủ
            </Link>
          </div>
        ) : !canReview ? (
          <div className="flex flex-col items-center justify-center text-center py-12 space-y-5 animate-scale-up">
            {reason === "reviewed" ? (
              <>
                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center border border-amber-200 text-amber-500">
                  <span className="material-symbols-outlined text-3xl">favorite</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900 font-display">Đã đánh giá</h3>
                  <p className="text-sm text-gray-600 max-w-sm mx-auto">{message}</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center border border-red-200 text-red-500">
                  <span className="material-symbols-outlined text-3xl">info</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900 font-display">Chưa thể đánh giá</h3>
                  <p className="text-sm text-gray-600 max-w-sm mx-auto">{message}</p>
                </div>
              </>
            )}
            <Link
              to="/"
              className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-all"
            >
              Về Trang Chủ
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 animate-scale-up">
            <div className="text-center pb-2 border-b border-gray-100">
              <h1 className="text-2xl font-bold text-gray-900 font-display">Đánh Giá Dịch Vụ</h1>
              <p className="text-xs text-gray-500 mt-1">
                Chào {sessionInfo?.customerName || "quý khách"}! Hãy chia sẻ trải nghiệm của bạn tại nhà hàng hôm nay nhé.
              </p>
            </div>

            {/* Ratings Grids */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderStars(foodRating, setFoodRating, hoverFoodRating, setHoverFoodRating, "Món ăn")}
              {renderStars(serviceRating, setServiceRating, hoverServiceRating, setHoverServiceRating, "Phục vụ")}
              {renderStars(ambianceRating, setAmbianceRating, hoverAmbianceRating, setHoverAmbianceRating, "Không gian")}
            </div>

            {/* Comment Section */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Ý kiến đóng góp thêm
              </label>
              <div className="relative">
                <textarea
                  rows="4"
                  maxLength={1000}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Nhập ý kiến đóng góp của bạn về món ăn, dịch vụ, hay thái độ phục vụ..."
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-sm text-gray-800"
                  disabled={submitting}
                />
                <span className="absolute bottom-3 right-4 text-[10px] text-gray-400">
                  {comment.length}/1000
                </span>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 text-center animate-shake">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-primary hover:bg-orange-700 text-white font-bold rounded-2xl text-base transition-all shadow-lg hover:shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                  Đang gửi đánh giá...
                </>
              ) : (
                "Gửi đánh giá"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
