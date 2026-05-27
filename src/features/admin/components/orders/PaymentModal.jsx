/**
 * COMPONENT: PaymentModal
 * BỘ PHẬN CỦA TRANG: Sơ đồ bàn / Quản lý đơn hàng trực tiếp (/admin/tables và /admin/orders)
 * ĐỊA CHỈ FILE: table-order-ap/src/features/admin/components/orders/PaymentModal.jsx
 *
 * MÔ TẢ:
 * Modal xử lý nghiệp vụ thanh toán cho một bàn ăn đang dùng bữa.
 * Hỗ trợ tạo giao dịch, thanh toán qua chuyển khoản QR (VietQR) hoặc tiền mặt,
 * và xác nhận trạng thái thanh toán thành công để giải phóng bàn.
 */

import { useState } from "react";
import AdminModal from "../common/AdminModal";
import { postAdmin, getApiError } from "../../services/adminApi";
import api from "../../../../services/api";
import { formatCurrency } from "../../utils/adminLabels";

// Thông tin tài khoản ngân hàng — chỉnh tại đây
const BANK_INFO = {
  bankId: "MB", // Mã ngân hàng VietQR (MB, VCB, TCB, ACB...)
  accountNo: "0123456789",
  accountName: "APPETITE RESTAURANT",
};

function buildVietQR(amount, description) {
  const { bankId, accountNo } = BANK_INFO;
  const encoded = encodeURIComponent(description);
  return `https://img.vietqr.io/image/${bankId}-${accountNo}-compact2.png?amount=${amount}&addInfo=${encoded}&accountName=${encodeURIComponent(BANK_INFO.accountName)}`;
}

const METHODS = [
  { value: "banking", label: "Chuyển khoản QR", icon: "qr_code_2" },
  { value: "cash", label: "Tiền mặt", icon: "payments" },
];

export default function PaymentModal({
  open,
  onClose,
  session,
  tableLabel,
  onSuccess,
}) {
  const [method, setMethod] = useState("banking");
  const [step, setStep] = useState("select"); // select | qr | confirm | done
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reset = () => {
    setMethod("banking");
    setStep("select");
    setPayment(null);
    setError(null);
  };

  const handleClose = () => {
    if (step === "done") {
      onSuccess?.();
    }
    reset();
    onClose();
  };

  // Bước 1: Tạo giao dịch
  const handleCreatePayment = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await postAdmin("/payments", {
        tableSessionId: session._id,
        method,
      });
      setPayment(data);
      setStep(method === "banking" ? "qr" : "confirm");
    } catch (err) {
      setError(getApiError(err, "Không tạo được giao dịch."));
    } finally {
      setLoading(false);
    }
  };

  // Bước 2: Xác nhận đã nhận tiền
  const handleConfirm = async () => {
    if (!payment) return;
    setLoading(true);
    setError(null);
    try {
      await api.post(`/payments/${payment._id}/confirm`, { confirmed: true });
      setStep("done");
    } catch (err) {
      setError(getApiError(err, "Không xác nhận được thanh toán."));
    } finally {
      setLoading(false);
    }
  };

  const amountLabel = payment ? formatCurrency(payment.amount) : "—";
  const qrDescription = payment ? `${payment.paymentCode} ${tableLabel}` : "";

  return (
    <AdminModal
      open={open}
      title={`Thanh toán — ${tableLabel}`}
      onClose={handleClose}
    >
      {/* Bước: Chọn phương thức */}
      {step === "select" && (
        <div className="space-y-6">
          <p className="text-sm text-gray-500">
            Chọn phương thức thanh toán cho bàn này.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {METHODS.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => setMethod(m.value)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition ${
                  method === m.value
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-3xl ${method === m.value ? "text-orange-600" : "text-gray-500"}`}
                >
                  {m.icon}
                </span>
                <span
                  className={`text-sm font-bold ${method === m.value ? "text-orange-700" : "text-gray-700"}`}
                >
                  {m.label}
                </span>
              </button>
            ))}
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-2.5 rounded-lg border font-medium hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleCreatePayment}
              disabled={loading}
              className="flex-1 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold transition disabled:opacity-60"
            >
              {loading ? "Đang tạo..." : "Tiếp tục"}
            </button>
          </div>
        </div>
      )}

      {/* Bước: Hiển thị QR chuyển khoản */}
      {step === "qr" && payment && (
        <div className="space-y-5 text-center">
          <div className="bg-gray-50 rounded-xl p-4 border">
            <p className="text-xs text-gray-500 mb-1">Số tiền cần thanh toán</p>
            <p className="text-3xl font-bold text-orange-600">{amountLabel}</p>
            <p className="text-xs text-gray-400 mt-1">
              Mã: {payment.paymentCode}
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src={buildVietQR(payment.amount, qrDescription)}
              alt="QR thanh toán"
              className="w-56 h-56 rounded-xl border shadow-sm"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>

          <div className="text-left bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm space-y-1">
            <p>
              <span className="font-semibold">Ngân hàng:</span>{" "}
              {BANK_INFO.bankId}
            </p>
            <p>
              <span className="font-semibold">Số TK:</span>{" "}
              {BANK_INFO.accountNo}
            </p>
            <p>
              <span className="font-semibold">Tên TK:</span>{" "}
              {BANK_INFO.accountName}
            </p>
            <p>
              <span className="font-semibold">Nội dung:</span> {qrDescription}
            </p>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-2.5 rounded-lg border font-medium hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={loading}
              className="flex-1 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">
                check_circle
              </span>
              {loading ? "Đang xử lý..." : "Đã nhận tiền"}
            </button>
          </div>
        </div>
      )}

      {/* Bước: Xác nhận tiền mặt */}
      {step === "confirm" && payment && (
        <div className="space-y-5 text-center">
          <div className="bg-gray-50 rounded-xl p-6 border">
            <span className="material-symbols-outlined text-5xl text-green-600">
              payments
            </span>
            <p className="text-xs text-gray-500 mt-3 mb-1">
              Số tiền khách cần trả
            </p>
            <p className="text-4xl font-bold text-gray-900">{amountLabel}</p>
            <p className="text-xs text-gray-400 mt-2">
              Mã: {payment.paymentCode}
            </p>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-2.5 rounded-lg border font-medium hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={loading}
              className="flex-1 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">
                check_circle
              </span>
              {loading ? "Đang xử lý..." : "Xác nhận đã thu tiền"}
            </button>
          </div>
        </div>
      )}

      {/* Bước: Hoàn tất */}
      {step === "done" && (
        <div className="text-center space-y-4 py-4">
          <span className="material-symbols-outlined text-6xl text-green-500">
            check_circle
          </span>
          <h3 className="text-xl font-bold text-gray-900">
            Thanh toán thành công!
          </h3>
          <p className="text-sm text-gray-500">
            Bàn đã được reset và sẵn sàng phục vụ khách mới.
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="w-full py-3 rounded-lg bg-gray-900 text-white font-bold hover:bg-gray-700 transition"
          >
            Đóng
          </button>
        </div>
      )}
    </AdminModal>
  );
}
