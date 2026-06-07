/**
 * PAGE CONTAINER: OrderPage.jsx
 * TUYẾN ĐƯỜNG (ROUTE): /order (Khách hàng / Nhân viên đặt món tại bàn)
 * ĐỊA CHỈ FILE: table-order-ap/src/features/order/pages/OrderPage.jsx
 *
 * MÔ TẢ:
 * Trang đặt món tại bàn dành cho khách hàng (hoặc nhân viên đặt hộ cho khách) thông qua quét QR.
 * Cho phép khách hàng duyệt thực đơn, quản lý giỏ hàng tạm thời, gửi lệnh đặt món cho nhà bếp,
 * và theo dõi trạng thái chế biến thời gian thực của các món ăn đã gọi.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SiteHeader from "../../landing/components/homepages/SiteHeader";
import OrderMenuCard from "../components/OrderMenuCard";
import OrderCart from "../components/OrderCart";
import ReviewFormModal from "../components/ReviewFormModal";
import SupportModal from "../components/SupportModal";
import useCart from "../hooks/useCart";
import { useAuth } from "../../../contexts/AuthContext";
import { socket } from "../../../services/socket";
import {
  fetchPublicMenu,
  fetchTableByQr,
  getOrderApiError,
  placeGuestOrder,
  placeStaffOrder,
  cancelGuestPendingOrderItem,
} from "../services/orderApi";

export default function OrderPage() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const qrToken = searchParams.get("table")?.trim() || "";

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [table, setTable] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [activeCall, setActiveCall] = useState(null);

  const cart = useCart();

  // Load active support call when table loads
  useEffect(() => {
    if (table?.activeServiceCall) {
      setActiveCall(table.activeServiceCall);
    } else {
      setActiveCall(null);
    }
  }, [table]);

  // Realtime update active support request from Socket.IO
  useEffect(() => {
    if (!table?._id) return;

    const handleNewCall = (newCall) => {
      const targetTableId = newCall.tableId?._id || newCall.tableId;
      if (targetTableId === table._id) {
        setActiveCall(newCall);
      }
    };

    const handleHandling = (updatedCall) => {
      const targetTableId = updatedCall.tableId?._id || updatedCall.tableId;
      if (targetTableId === table._id) {
        setActiveCall(updatedCall);
      }
    };

    const handleCompleted = (completedCall) => {
      const targetTableId = completedCall.tableId?._id || completedCall.tableId;
      if (targetTableId === table._id) {
        setActiveCall((prev) => {
          if (prev?._id === completedCall._id) {
            return { ...completedCall, status: "completed" };
          }
          return prev;
        });

        // Hide completed request after 5 seconds so they can submit again
        setTimeout(() => {
          setActiveCall((prev) => (prev?.status === "completed" ? null : prev));
        }, 5000);
      }
    };

    socket.on("new_service_call", handleNewCall);
    socket.on("service_call_handling", handleHandling);
    socket.on("service_call_completed", handleCompleted);

    return () => {
      socket.off("new_service_call", handleNewCall);
      socket.off("service_call_handling", handleHandling);
      socket.off("service_call_completed", handleCompleted);
    };
  }, [table?._id]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!qrToken) {
        setError("Vui lòng quét mã QR trên bàn (hoặc thêm ?table=mã-bàn vào URL).");
        setLoading(false);
        return;
      }

      const [menuData, tableData] = await Promise.all([
        fetchPublicMenu(),
        fetchTableByQr(qrToken),
      ]);

      setCategories(menuData?.categories ?? []);
      setTable(tableData);
    } catch (err) {
      setError(getOrderApiError(err, "Không tải được thực đơn."));
    } finally {
      setLoading(false);
    }
  }, [qrToken]);

  useEffect(() => {
    load();
  }, [load]);

  const visibleItems = useMemo(() => {
    if (activeCategory === "all") {
      return categories.flatMap((c) => c.items ?? []);
    }
    const cat = categories.find((c) => c._id === activeCategory);
    return cat?.items ?? [];
  }, [categories, activeCategory]);

  const tableLabel = table ? `${table.code || table.name}` : null;

  const handleSubmit = async () => {
    if (!qrToken || !cart.lines.length) return;
    setSubmitting(true);
    setError(null);
    try {
      let result;
      const isStaffOrAdmin = user && (user.role === "admin" || user.role === "staff");
      
      if (isStaffOrAdmin) {
        result = await placeStaffOrder({
          tableId: table?._id,
          items: cart.lines.map((line) => ({
            menuItemId: line.menuItemId,
            quantity: line.quantity,
            note: line.note || "",
          })),
          customerName: table?.activeSession?.customerName || "Nhân viên đặt hộ",
          guestCount: table?.activeSession?.guestCount || 1,
        });
      } else {
        result = await placeGuestOrder({
          qrToken,
          items: cart.lines.map((line) => ({
            menuItemId: line.menuItemId,
            quantity: line.quantity,
          })),
        });
      }

      setSuccess({
        orderNumber: result?.order?.orderNumber,
        total: result?.order?.finalAmount,
      });
      cart.clear();
      await load(); // Reload to show new items in ordered list
    } catch (err) {
      setError(getOrderApiError(err, "Không gửi được đơn."));
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelItem = async (itemId, itemName) => {
    if (!window.confirm(`Bạn muốn hủy món "${itemName}"?`)) return;
    setError(null);
    try {
      await cancelGuestPendingOrderItem(itemId);
      await load(); // Reload list after cancelation
    } catch (err) {
      setError(getOrderApiError(err, "Không thể hủy món ăn."));
    }
  };

  return (
    <div className="min-h-dvh bg-background font-body text-on-surface">
      <SiteHeader activeLabel="Đặt món" showStaffLoginMobile />

      <main className="mx-auto max-w-7xl px-margin pb-24 pt-[88px]">
        {user && (user.role === "admin" || user.role === "staff") && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 border border-orange-500/30 backdrop-blur-md shadow-lg flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-orange-600 bg-orange-100 p-2 rounded-xl text-2xl">
                support_agent
              </span>
              <div>
                <h3 className="font-bold text-orange-950 font-display">
                  Chế độ Đặt món hộ Khách
                </h3>
                <p className="text-xs text-orange-800">
                  Bạn đang đăng nhập với tư cách <strong>{user.fullName}</strong> ({user.role === "admin" ? "Quản trị viên" : "Nhân viên"}). Đơn hàng sẽ được tự động xác nhận.
                </p>
              </div>
            </div>
            <Link
              to="/admin/tables"
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-orange-500/20 flex items-center gap-1.5 shrink-0"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Quay lại Sơ đồ bàn
            </Link>
          </div>
        )}

        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold">Đặt món tại bàn</h1>
          <p className="text-on-surface-variant mt-1">
            Chọn món, xem giá và gửi đơn trực tiếp cho bếp.
          </p>
        </div>

        {table ? (
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-xl shadow-sm">
            <div>
              <p className="text-xs text-orange-600 font-bold uppercase tracking-wider">Bàn của bạn</p>
              <h2 className="text-xl font-bold text-orange-950">Bàn {table.code || table.name}</h2>
            </div>
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex gap-6">
                <div>
                  <p className="text-xs text-orange-600 font-bold uppercase tracking-wider">Sức chứa tối đa</p>
                  <p className="font-bold text-orange-900">{table.capacity || 0} người</p>
                </div>
                <div>
                  <p className="text-xs text-orange-600 font-bold uppercase tracking-wider">Số khách đang ngồi</p>
                  <p className="font-bold text-orange-900">{table.activeGuestCount || 0} người</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setIsSupportOpen(true)}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-orange-500/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">support_agent</span>
                  Yêu cầu hỗ trợ
                </button>
                {table.activeSession && (
                  <button
                    type="button"
                    onClick={() => setIsReviewOpen(true)}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-orange-500/20 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">rate_review</span>
                    Đánh giá dịch vụ
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : null}

        {/* Support Request Status Banner */}
        {activeCall && (
          <div className={`mb-6 p-4 rounded-2xl border flex items-center justify-between animate-fade-in shadow-md ${
            activeCall.status === "pending"
              ? "bg-amber-50 border-amber-200 text-amber-900"
              : activeCall.status === "handling"
                ? "bg-sky-50 border-sky-200 text-sky-900"
                : "bg-green-50 border-green-200 text-green-900 animate-pulse"
          }`}>
            <div className="flex items-center gap-3">
              <span className={`material-symbols-outlined text-2xl ${
                activeCall.status === "pending"
                  ? "text-amber-600 animate-bounce"
                  : activeCall.status === "handling"
                    ? "text-sky-600 animate-spin"
                    : "text-green-600 font-bold"
              }`}
              style={{
                animationDuration: activeCall.status === "handling" ? "3s" : undefined
              }}>
                {activeCall.status === "pending"
                  ? "hourglass_empty"
                  : activeCall.status === "handling"
                    ? "support_agent"
                    : "check_circle"}
              </span>
              <div>
                <p className="font-bold text-sm">
                  {activeCall.status === "pending" && "Yêu cầu đã được gửi tới nhân viên."}
                  {activeCall.status === "handling" && "Yêu cầu của bạn đang được nhân viên hỗ trợ."}
                  {activeCall.status === "completed" && "Yêu cầu của bạn đã được hỗ trợ."}
                </p>
                <p className="text-xs opacity-80 mt-0.5">
                  Chi tiết: {activeCall.note || "Đang chờ hỗ trợ"} 
                  {activeCall.status === "handling" && activeCall.handledBy && ` | Phục vụ bởi: ${activeCall.handledBy.fullName}`}
                </p>
              </div>
            </div>
            {activeCall.status !== "completed" && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/60 border border-current/10">
                <span className={`h-1.5 w-1.5 rounded-full bg-current mr-1.5 ${activeCall.status === "pending" ? "animate-ping" : "animate-pulse"}`}></span>
                {activeCall.status === "pending" ? "Đang chờ" : "Đang xử lý"}
              </span>
            )}
          </div>
        )}

        {error ? (
          <div className="mb-6 rounded-xl border border-error/30 bg-error-container/30 px-4 py-3 text-sm text-error">
            {error}
            {!qrToken ? (
              <p className="mt-2 text-on-surface-variant">
                Nhân viên có thể lấy mã QR trong quản trị → Sơ đồ bàn.
              </p>
            ) : null}
          </div>
        ) : null}

        {success ? (
          <div className="mb-6 rounded-xl border border-primary/30 bg-primary-fixed/40 px-4 py-4">
            <p className="font-bold text-primary">Đã gửi đơn thành công!</p>
            <p className="text-sm mt-1">
              Mã đơn: <strong>{success.orderNumber}</strong>
            </p>
            <button
              type="button"
              className="mt-3 text-sm font-semibold text-primary underline cursor-pointer"
              onClick={() => setSuccess(null)}
            >
              Đặt thêm món
            </button>
          </div>
        ) : null}

        {loading ? (
          <p className="text-center py-16 text-on-surface-variant">Đang tải thực đơn...</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveCategory("all")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    activeCategory === "all"
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container text-on-surface-variant"
                  }`}
                >
                  Tất cả
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    type="button"
                    onClick={() => setActiveCategory(cat._id)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      activeCategory === cat._id
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container text-on-surface-variant"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {visibleItems.map((item) => (
                  <OrderMenuCard key={item._id} item={item} onAdd={cart.addItem} />
                ))}
              </div>

              {!visibleItems.length && !error ? (
                <p className="text-center text-on-surface-variant py-12">Chưa có món trong danh mục này.</p>
              ) : null}
            </div>

            <div className="lg:col-span-1 space-y-6">
              <OrderCart
                lines={cart.lines}
                total={cart.total}
                itemCount={cart.itemCount}
                onUpdateQty={cart.updateQty}
                onRemove={cart.removeLine}
                onSubmit={handleSubmit}
                submitting={submitting}
                tableLabel={tableLabel}
              />

              {/* Active ordered items */}
              {table?.activeOrderItems?.length > 0 && (
                <div className="bg-white border rounded-xl p-4 shadow-sm space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-lg text-gray-900">Món ăn đã gọi</h3>
                    <p className="text-xs text-gray-500">Xem trạng thái chế biến trực tiếp từ bếp</p>
                  </div>
                  <ul className="divide-y divide-gray-100 max-h-[350px] overflow-y-auto pr-1">
                    {table.activeOrderItems.map((item) => {
                      const badgeStyles = {
                        pending: "bg-yellow-50 text-yellow-800 border-yellow-200",
                        confirmed: "bg-teal-50 text-teal-800 border-teal-200",
                        preparing: "bg-orange-50 text-orange-800 border-orange-200",
                        served: "bg-blue-50 text-blue-800 border-blue-200",
                        cancelled: "bg-gray-100 text-gray-500 border-gray-200 line-through",
                      };
                      const statusLabels = {
                        pending: "Chờ duyệt",
                        confirmed: "Đã nhận",
                        preparing: "Đang nấu",
                        served: "Đã phục vụ",
                        cancelled: "Đã hủy",
                      };

                      return (
                        <li key={item._id} className="py-3 flex justify-between items-start gap-4">
                          <div className="min-w-0">
                            <span
                              className={`font-semibold text-sm block truncate ${
                                item.status === "cancelled"
                                  ? "line-through text-gray-400 font-normal"
                                  : "text-gray-800"
                              }`}
                            >
                              {item.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              Số lượng: {item.quantity} |{" "}
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(item.price)}
                            </span>
                            <div className="mt-1 flex flex-wrap items-center gap-2">
                              <span
                                className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${
                                  badgeStyles[item.status] || ""
                                }`}
                              >
                                {statusLabels[item.status] || item.status}
                              </span>
                              {item.note && (
                                <span className="text-[10px] text-orange-600 bg-orange-50 px-1 py-0.5 rounded border border-orange-100">
                                  Chú ý: {item.note}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col items-end shrink-0 gap-2">
                            <span
                              className={`text-sm font-bold ${
                                item.status === "cancelled"
                                  ? "line-through text-gray-400 font-normal"
                                  : "text-gray-900"
                              }`}
                            >
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(item.subtotal)}
                            </span>
                            {item.status === "pending" && (
                              <button
                                type="button"
                                onClick={() => handleCancelItem(item._id, item.name)}
                                className="text-xs font-bold text-red-600 hover:text-red-800 underline hover:no-underline cursor-pointer"
                              >
                                Hủy món
                              </button>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setIsReviewOpen(true)}
                      className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-orange-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">rate_review</span>
                      Gửi phản hồi & Đánh giá dịch vụ
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <p className="mt-8 text-center text-sm text-on-surface-variant">
          <Link to="/" className="text-primary font-semibold hover:underline">
            ← Về trang chủ
          </Link>
        </p>
      </main>

      <ReviewFormModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        tableSessionId={table?.activeSession?._id}
        orderId={table?.activeOrders?.[0]?._id}
      />

      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
        tableId={table?._id}
        tableSessionId={table?.activeSession?._id}
        onSuccess={(newCall) => {
          setActiveCall(newCall);
        }}
      />
    </div>
  );
}
