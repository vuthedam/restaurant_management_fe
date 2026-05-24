/**
 * COMPONENT: QuickSummary
 * THUỘC TRANG: TableMap (/admin/tables)
 * ĐỊA CHỈ FILE: table-order-ap/src/features/admin/components/tablemap/QuickSummary.jsx
 *
 * MÔ TẢ:
 * Panel bên trái sơ đồ bàn — hiển thị chi tiết bàn được chọn và các thao tác
 * tương ứng theo trạng thái: mở bàn, check-in, quản lý phiên, thanh toán.
 */

import { useState, useEffect } from "react";
import { postAdmin, patchAdmin, getApiError } from "../../services/adminApi";
import api from "../../../../services/api";
import TableInfoCard from "./TableInfoCard";
import WalkInForm from "./WalkInForm";
import CheckInReservationForm from "./CheckInReservationForm";
import ActiveSessionPanel from "./ActiveSessionPanel";
import PaymentModal from "../orders/PaymentModal";

const QuickSummary = ({ table, allTables = [], reloadTables }) => {
  const [activeSession, setActiveSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  // Walk-in form state
  const [walkInName, setWalkInName] = useState("");
  const [walkInGuests, setWalkInGuests] = useState(2);

  // Check-in form state
  const [selectedResId, setSelectedResId] = useState("");

  // Transfer form state
  const [transferTableId, setTransferTableId] = useState("");

  // Guest counter state
  const [guestCountInput, setGuestCountInput] = useState(1);

  useEffect(() => {
    setError(null);
    setSuccess(null);
    setWalkInName("");
    setWalkInGuests(2);
    setSelectedResId("");
    setTransferTableId("");
    if (!table) return;

    const fetchSessionData = async () => {
      if (table.status === "occupied" || table.status === "waiting_payment") {
        setLoadingSession(true);
        try {
          const res = await api.get(`/table-sessions?tableId=${table._id}`);
          const session = res.data?.data?.[0];
          if (session && (session.status === "active" || session.status === "waiting_payment")) {
            setActiveSession(session);
            setGuestCountInput(session.guestCount || 1);
          } else {
            setActiveSession(null);
          }
        } catch {
          setActiveSession(null);
        } finally {
          setLoadingSession(false);
        }
      } else {
        setActiveSession(null);
      }

      if (table.status === "available") {
        try {
          const res = await api.get("/reservations");
          const all = res.data?.data || [];
          setReservations(all.filter((r) => r.status === "confirmed"));
        } catch {
          setReservations([]);
        }
      }
    };

    fetchSessionData();
  }, [table?._id, table?.status]);

  if (!table) {
    return (
      <section className="bg-white border rounded-xl p-6 shadow-sm">
        <h3 className="font-bold text-lg mb-4">Chi tiết bàn</h3>
        <p className="text-sm text-gray-500">Vui lòng chọn bàn để thao tác.</p>
      </section>
    );
  }

  const label = table.code || table.name || "—";

  const withFeedback = (fn) => async (...args) => {
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      await fn(...args);
    } catch (err) {
      setError(getApiError(err, "Thao tác thất bại."));
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenWalkIn = withFeedback(async (e) => {
    e.preventDefault();
    await postAdmin("/table-sessions", {
      tableId: table._id,
      customerName: walkInName.trim() || "Khách vãng lai",
      guestCount: Number(walkInGuests),
      status: "active",
    });
    await patchAdmin(`/tables/${table._id}`, { status: "occupied" });
    setSuccess("Đã mở bàn thành công!");
    reloadTables();
  });

  const handleCheckInRes = withFeedback(async (e) => {
    e.preventDefault();
    await patchAdmin(`/reservations/${selectedResId}`, {
      status: "checked_in",
      assignedTableId: table._id,
    });
    setSuccess("Đã check-in khách thành công!");
    reloadTables();
  });

  const handleTransferTable = withFeedback(async (e) => {
    e.preventDefault();
    await postAdmin(`/table-sessions/${activeSession._id}/transfer`, {
      targetTableId: transferTableId,
    });
    setSuccess("Chuyển bàn thành công!");
    reloadTables();
  });

  const handleUpdateGuests = withFeedback(async (newVal) => {
    if (newVal < 1) return;
    await patchAdmin(`/table-sessions/${activeSession._id}`, { guestCount: Number(newVal) });
    setGuestCountInput(newVal);
    setActiveSession({ ...activeSession, guestCount: newVal });
    setSuccess("Cập nhật số người thành công!");
    reloadTables();
  });

  const handleCancelSession = withFeedback(async () => {
    if (!window.confirm("Hủy phiên dùng bàn? Mọi thông tin chưa thanh toán sẽ bị huỷ.")) return;
    await patchAdmin(`/table-sessions/${activeSession._id}`, {
      status: "cancelled",
      endedAt: new Date().toISOString(),
    });
    await patchAdmin(`/tables/${table._id}`, { status: "available" });
    setSuccess("Đã hủy bàn thành công!");
    reloadTables();
  });

  const handleReservedCheckIn = withFeedback(async () => {
    const res = await api.get("/reservations");
    const all = res.data?.data || [];
    const matched = all.find(
      (r) =>
        String(r.assignedTableId?._id || r.assignedTableId) === String(table._id) &&
        r.status === "confirmed"
    );
    if (!matched) throw new Error("Không tìm thấy đơn đặt bàn đã xác nhận của bàn này.");
    await patchAdmin(`/reservations/${matched._id}`, { status: "checked_in" });
    setSuccess("Check-in khách thành công!");
    reloadTables();
  });

  const availableTablesForTransfer = allTables.filter(
    (t) => t.status === "available" && t._id !== table._id
  );

  return (
    <section className="bg-white border rounded-xl p-6 shadow-sm flex flex-col gap-5">
      {/* Header */}
      <div>
        <h3 className="font-bold text-xl mb-1 flex items-center justify-between">
          <span>Chi tiết bàn</span>
          <span className="text-gray-400 font-normal text-sm">#{table.code || label}</span>
        </h3>
        <p className="text-gray-500 text-sm">Quản lý và cập nhật phiên dùng bàn.</p>
      </div>

      <TableInfoCard table={table} />

      {/* Feedback */}
      {error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
      {success && (
        <p className="text-xs text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          {success}
        </p>
      )}

      {/* Bàn trống */}
      {table.status === "available" && (
        <div className="flex flex-col gap-5 border-t pt-4">
          <WalkInForm
            table={table}
            name={walkInName}
            guests={walkInGuests}
            onNameChange={setWalkInName}
            onGuestsChange={setWalkInGuests}
            onSubmit={handleOpenWalkIn}
            submitting={submitting}
          />

          <div className="flex flex-col gap-2 border-t pt-4">
            <h4 className="font-bold text-sm text-gray-800 flex items-center gap-1.5 mb-1">
              <span className="material-symbols-outlined text-base">add_shopping_cart</span>
              Đặt món hộ khách ngay
            </h4>
            <a
              href={`/order?table=${table.qrToken}`}
              target="_blank"
              rel="noreferrer"
              className="w-full border border-orange-200 text-orange-600 hover:bg-orange-50 py-2.5 rounded-lg text-sm font-bold transition flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">restaurant_menu</span>
              Đặt món cho bàn {label}
            </a>
          </div>

          <div className="border-t pt-4">
            <CheckInReservationForm
              reservations={reservations}
              selectedId={selectedResId}
              onSelect={setSelectedResId}
              onSubmit={handleCheckInRes}
              submitting={submitting}
            />
          </div>
        </div>
      )}

      {/* Bàn đang có khách */}
      {(table.status === "occupied" || table.status === "waiting_payment") && (
        <div className="flex flex-col gap-5 border-t pt-4">
          {loadingSession ? (
            <p className="text-sm text-center text-gray-500 py-4">Đang tải phiên dùng bàn...</p>
          ) : activeSession ? (
            <ActiveSessionPanel
              session={activeSession}
              table={table}
              guestCount={guestCountInput}
              availableTablesForTransfer={availableTablesForTransfer}
              transferTableId={transferTableId}
              onTransferTableChange={setTransferTableId}
              onTransferSubmit={handleTransferTable}
              onUpdateGuests={handleUpdateGuests}
              onPayment={() => setPaymentOpen(true)}
              onCancelSession={handleCancelSession}
              submitting={submitting}
            />
          ) : (
            <p className="text-sm text-center text-red-500 py-4">
              Lỗi: Không tìm thấy phiên hoạt động.
            </p>
          )}
        </div>
      )}

      {/* Bàn đã đặt trước */}
      {table.status === "reserved" && (
        <div className="flex flex-col gap-4 border-t pt-4">
          <p className="text-xs text-orange-600 bg-orange-50 border border-orange-100 rounded-lg px-3 py-2 font-medium">
            Bàn đang được đặt chỗ giữ trước. Bạn cần check-in khách khi họ đến đúng giờ.
          </p>
          <button
            type="button"
            onClick={handleReservedCheckIn}
            disabled={submitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-bold transition disabled:opacity-60"
          >
            Check-in khách đến
          </button>
        </div>
      )}

      {activeSession && (
        <PaymentModal
          open={paymentOpen}
          onClose={() => setPaymentOpen(false)}
          session={activeSession}
          tableLabel={table.name || table.code}
          onSuccess={() => {
            setPaymentOpen(false);
            reloadTables();
          }}
        />
      )}
    </section>
  );
};

export default QuickSummary;
