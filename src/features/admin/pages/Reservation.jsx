/**
 * PAGE CONTAINER: Reservation.jsx (Table Booking Management)
 * TUYẾN ĐƯỜNG (ROUTE): /admin/reservations
 * ĐỊA CHỈ FILE: table-order-ap/src/features/admin/pages/Reservation.jsx
 *
 * MÔ TẢ:
 * Trang quản lý yêu cầu đặt bàn trước của khách hàng dành cho quản trị viên và nhân viên.
 * Hỗ trợ hiển thị danh sách đặt chỗ, phân trang và bộ lọc linh hoạt (tất cả, chờ duyệt,
 * đã xác nhận, VIP). Cho phép phê duyệt và gán bàn trống phù hợp, hủy đặt bàn có lý do,
 * đánh dấu khách không đến (No-Show) hoặc đặt bàn mới trực tiếp cho khách.
 */

/**
 * PAGE CONTAINER: Reservation.jsx (Table Booking Management)
 * TUYẾN ĐƯỜNG (ROUTE): /admin/reservations
 * ĐỊA CHỈ FILE: table-order-ap/src/features/admin/pages/Reservation.jsx
 *
 * MÔ TẢ:
 * Trang quản lý yêu cầu đặt bàn trước của khách hàng dành cho quản trị viên và nhân viên.
 * Hỗ trợ hiển thị danh sách đặt chỗ, phân trang và bộ lọc linh hoạt (tất cả, chờ duyệt,
 * đã xác nhận, VIP). Cho phép phê duyệt và gán bàn trống phù hợp, hủy đặt bàn có lý do,
 * đánh dấu khách không đến (No-Show) hoặc đặt bàn mới trực tiếp cho khách.
 */

import { useMemo, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import ReservationStats from "../components/reservation/ReservationStats";
import ReservationFilters from "../components/reservation/ReservationFilters";
import ReservationTable from "../components/reservation/ReservationTable";
import ReservationPagination from "../components/reservation/ReservationPagination";
import ReservationFormModal from "../components/reservation/ReservationFormModal";
import ReservationConfirmModal from "../components/reservation/ReservationConfirmModal";
import { PageError, PageLoading } from "../components/common/PageState";
import useAdminList from "../hooks/useAdminList";
import { mapReservationRow } from "../utils/adminMappers";
import { getApiError, patchAdmin } from "../services/adminApi";

const PAGE_SIZE = 8;

export default function Reservation() {
  const { items, loading, error, reload } = useAdminList("/reservations");
  const { items: tables } = useAdminList("/tables");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [actionError, setActionError] = useState(null);

  // States for confirming pending reservations
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmingReservationId, setConfirmingReservationId] = useState(null);
  const [selectedTableId, setSelectedTableId] = useState("");
  const [selectedReservationGuests, setSelectedReservationGuests] = useState(1);

  const rows = useMemo(() => items.map(mapReservationRow), [items]);

  const filtered = useMemo(() => {
    if (filter === "all") return rows;
    if (filter === "pending")
      return rows.filter((r) => r.rawStatus === "pending");
    if (filter === "confirmed")
      return rows.filter((r) => r.rawStatus === "confirmed");
    if (filter === "vip") return rows.filter((r) => r.guests >= 6);
    return rows;
  }, [rows, filter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const paged = useMemo(() => {
    const safePage = Math.min(page, pageCount);
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page, pageCount]);

  const stats = useMemo(
    () => ({
      total: items.length,
      availableTables: tables.filter((t) => t.status === "available").length,
      pending: items.filter((r) => r.status === "pending").length,
    }),
    [items, tables],
  );

  const handleFilterChange = (next) => {
    setFilter(next);
    setPage(1);
  };

  const handleAdvance = async (id, nextStatus) => {
    // Intercept pending -> confirmed transition to choose a table
    const r = items.find((x) => String(x._id || x.id) === String(id));
    if (nextStatus === "confirmed") {
      setConfirmingReservationId(id);
      setSelectedReservationGuests(r?.guestCount || 1);
      setSelectedTableId(r?.assignedTableId?._id || r?.assignedTableId || "");
      setConfirmModalOpen(true);
      return;
    }

    setBusyId(id);
    setActionError(null);
    try {
      await patchAdmin(`/reservations/${id}`, { status: nextStatus });
      await reload();
    } catch (err) {
      setActionError(getApiError(err, "Không cập nhật được đặt bàn."));
    } finally {
      setBusyId(null);
    }
  };

  const handleConfirmWithTable = async () => {
    if (!confirmingReservationId || !selectedTableId) return;
    setBusyId(confirmingReservationId);
    setActionError(null);
    try {
      await patchAdmin(`/reservations/${confirmingReservationId}`, {
        status: "confirmed",
        assignedTableId: selectedTableId,
      });
      setConfirmModalOpen(false);
      setConfirmingReservationId(null);
      setSelectedTableId("");
      await reload();
    } catch (err) {
      setActionError(getApiError(err, "Không cập nhật được đặt bàn."));
    } finally {
      setBusyId(null);
    }
  };

  const handleCancel = async (id) => {
    const r = items.find((x) => String(x._id || x.id) === String(id));
    const reason = window.prompt("Vui lòng nhập lý do hủy đặt bàn:");
    if (reason === null) return;
    if (!reason.trim()) {
      alert("Bạn phải nhập lý do hủy!");
      return;
    }
    setBusyId(id);
    setActionError(null);
    const oldNote = r?.note || "";
    const newNote = oldNote
      ? `${oldNote}\n[Hủy] Lý do: ${reason.trim()}`
      : `Lý do hủy: ${reason.trim()}`;

    try {
      await patchAdmin(`/reservations/${id}`, {
        status: "cancelled",
        note: newNote,
      });
      await reload();
    } catch (err) {
      setActionError(getApiError(err, "Không cập nhật được đặt bàn."));
    } finally {
      setBusyId(null);
    }
  };

  const handleNoShow = async (id) => {
    const r = items.find((x) => String(x._id || x.id) === String(id));
    const reason = window.prompt(
      "Vui lòng nhập lý do khách không đến (No-Show):",
    );
    if (reason === null) return;
    if (!reason.trim()) {
      alert("Bạn phải nhập lý do khách không đến!");
      return;
    }
    setBusyId(id);
    setActionError(null);
    const oldNote = r?.note || "";
    const newNote = oldNote
      ? `${oldNote}\n[No-Show] Lý do: ${reason.trim()}`
      : `Lý do khách không đến: ${reason.trim()}`;

    try {
      await patchAdmin(`/reservations/${id}`, {
        status: "no_show",
        note: newNote,
      });
      await reload();
    } catch (err) {
      setActionError(getApiError(err, "Không cập nhật được đặt bàn."));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <AdminLayout
      title="Quản lý đặt bàn"
      actionLabel="Đặt bàn mới"
      onAction={() => setModalOpen(true)}
      fullWidth
    >
      <ReservationFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        tables={tables}
        onSuccess={reload}
      />

      <ReservationConfirmModal
        open={confirmModalOpen}
        onClose={() => {
          setConfirmModalOpen(false);
          setConfirmingReservationId(null);
          setSelectedTableId("");
        }}
        tables={tables}
        guestCount={selectedReservationGuests}
        selectedTableId={selectedTableId}
        onTableChange={setSelectedTableId}
        onConfirm={handleConfirmWithTable}
        busy={busyId === confirmingReservationId}
      />

      {loading ? <PageLoading /> : null}
      {!loading && error ? (
        <PageError message={error} onRetry={reload} />
      ) : null}

      {actionError ? (
        <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {actionError}
        </p>
      ) : null}

      {!loading && !error ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <ReservationStats
              total={stats.total}
              availableTables={stats.availableTables}
              pending={stats.pending}
            />
          </div>

          <div className="bg-white border rounded-xl shadow-sm flex flex-col min-h-[480px] overflow-hidden">
            <ReservationFilters
              activeFilter={filter}
              onFilterChange={handleFilterChange}
            />
            <ReservationTable
              rows={paged}
              onAdvance={handleAdvance}
              onCancel={handleCancel}
              onNoShow={handleNoShow}
              busyId={busyId}
            />
            <ReservationPagination
              page={Math.min(page, pageCount)}
              pageCount={pageCount}
              shown={paged.length}
              total={filtered.length}
              onPageChange={setPage}
            />
          </div>
        </>
      ) : null}
    </AdminLayout>
  );
}
