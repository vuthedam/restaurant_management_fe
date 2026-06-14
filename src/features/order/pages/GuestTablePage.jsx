import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchTableByQr,
  createGuestTableSession,
  getOrderApiError,
} from "../services/orderApi";
import SiteHeader from "../../landing/components/homepages/SiteHeader";
import {
  Users,
  User,
  AlertTriangle,
  Loader2,
  ArrowRight,
  Plus,
  Minus,
} from "lucide-react";

export default function GuestTablePage() {
  const { qrToken } = useParams();
  const navigate = useNavigate();

  const [table, setTable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states
  const [customerName, setCustomerName] = useState("");
  const [guestCount, setGuestCount] = useState(2);
  const [submitting, setSubmitting] = useState(false);

  // 1. Kiểm tra trạng thái bàn và phiên ăn hiện tại
  useEffect(() => {
    let active = true;

    async function checkTableSession() {
      if (!qrToken) {
        setError("Mã QR không hợp lệ.");
        setLoading(false);
        return;
      }

      try {
        const tableData = await fetchTableByQr(qrToken);
        if (!active) return;

        setTable(tableData);

        // Nếu bàn đã có phiên đang hoạt động (active), chuyển trực tiếp đến giao diện gọi món
        if (tableData.activeSession) {
          navigate(`/order?table=${encodeURIComponent(qrToken)}`, {
            replace: true,
          });
        }
      } catch (err) {
        if (active) {
          setError(getOrderApiError(err, "Không tìm thấy thông tin bàn ăn."));
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    checkTableSession();

    return () => {
      active = false;
    };
  }, [qrToken, navigate]);

  // Tăng giảm số lượng khách ăn
  const incrementGuests = () => {
    if (guestCount < (table?.capacity || 30)) {
      setGuestCount((prev) => prev + 1);
    }
  };

  const decrementGuests = () => {
    if (guestCount > 1) {
      setGuestCount((prev) => prev - 1);
    }
  };

  // 2. Tạo phiên bàn ăn mới
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      await createGuestTableSession({
        qrToken,
        customerName: customerName.trim(),
        guestCount,
      });

      // Tạo phiên bàn thành công, chuyển hướng đến trang gọi món
      navigate(`/order?table=${encodeURIComponent(qrToken)}`);
    } catch (err) {
      setError(
        getOrderApiError(err, "Không thể mở bàn. Vui lòng liên hệ nhân viên."),
      );
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-body text-slate-800 flex flex-col">
      <SiteHeader activeLabel="Đặt món tại bàn" />

      <main className="flex-1 flex items-center justify-center p-6 pt-24">
        <div className="w-full bg-white border border-slate-200/80 rounded-3xl shadow-xl p-8 relative overflow-hidden">
          {/* Nền trang trí nhẹ nhàng phía trên */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500"></div>

          {/* Trạng thái Loading */}
          {loading && (
            <div className="text-center py-12 flex flex-col items-center justify-center">
              <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mb-4" />
              <h3 className="text-lg font-bold text-slate-700">
                Đang quét thông tin bàn ăn...
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                Vui lòng chờ trong giây lát
              </p>
            </div>
          )}

          {/* Trạng thái báo Lỗi */}
          {!loading && error && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Đã xảy ra lỗi
              </h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-xl transition-all shadow-sm hover:shadow"
              >
                Tải lại trang
              </button>
            </div>
          )}

          {/* Trạng thái sẵn sàng mở phiên mới (Chưa có session active) */}
          {!loading && !error && table && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <span className="inline-flex px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                  Bàn ăn hợp lệ
                </span>
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
                  {table.name}
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Mã bàn:{" "}
                  <span className="font-semibold text-slate-700">
                    {table.code}
                  </span>{" "}
                  | Sức chứa:{" "}
                  <span className="font-semibold text-slate-700">
                    {table.capacity} người
                  </span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Trường Tên khách hàng */}
                <div className="space-y-2">
                  <label
                    htmlFor="customerName"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Tên của bạn <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      id="customerName"
                      type="text"
                      required
                      placeholder="Nhập tên của bạn (Ví dụ: Anh Quân)..."
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Trường Số lượng người */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Số lượng người đi cùng
                  </label>
                  <div className="flex items-center justify-between border border-slate-200 rounded-xl p-2 bg-slate-50">
                    <button
                      type="button"
                      onClick={decrementGuests}
                      disabled={guestCount <= 1}
                      className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 text-slate-600 rounded-lg hover:text-rose-600 hover:border-rose-100 focus:outline-none transition-all disabled:opacity-40"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="font-bold text-slate-800 text-lg">
                        {guestCount}
                      </span>
                      <span className="text-slate-400 text-xs font-normal">
                        người
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={incrementGuests}
                      disabled={guestCount >= (table.capacity || 30)}
                      className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 text-slate-600 rounded-lg hover:text-emerald-600 hover:border-emerald-100 focus:outline-none transition-all disabled:opacity-40"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {guestCount >= (table.capacity || 30) && (
                    <p className="text-[11px] text-amber-600 font-medium">
                      Đã đạt tới sức chứa khuyến nghị của bàn này.
                    </p>
                  )}
                </div>

                {/* Nút Submit mở bàn */}
                <button
                  type="submit"
                  disabled={submitting || !customerName.trim()}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-emerald-500/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Đang chuẩn bị thực đơn...
                    </>
                  ) : (
                    <>
                      Mở bàn & Xem thực đơn
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
