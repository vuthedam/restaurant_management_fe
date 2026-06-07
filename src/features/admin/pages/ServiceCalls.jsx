import { useEffect } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import AdminTable from "../components/common/AdminTable";
import { PageError, PageLoading } from "../components/common/PageState";
import useAdminList from "../hooks/useAdminList";
import { patchAdmin, getApiError } from "../services/adminApi";
import { socket } from "../../../services/socket";
import {
  formatDateTime,
  SERVICE_CALL_STATUS_LABELS,
  SERVICE_CALL_TYPE_LABELS,
} from "../utils/adminLabels";

export default function ServiceCalls() {
  const { items, setItems, loading, error, reload } = useAdminList("/service-calls");

  // Realtime update using Socket.IO
  useEffect(() => {
    const handleNewCall = (newCall) => {
      setItems((prev) => {
        // Avoid duplicate items
        if (prev.some((item) => item._id === newCall._id)) {
          return prev;
        }
        return [newCall, ...prev];
      });
    };

    const handleHandling = (updatedCall) => {
      setItems((prev) =>
        prev.map((item) => (item._id === updatedCall._id ? updatedCall : item))
      );
    };

    const handleCompleted = (completedCall) => {
      setItems((prev) =>
        prev.map((item) => (item._id === completedCall._id ? completedCall : item))
      );
    };

    socket.on("new_service_call", handleNewCall);
    socket.on("service_call_handling", handleHandling);
    socket.on("service_call_completed", handleCompleted);

    return () => {
      socket.off("new_service_call", handleNewCall);
      socket.off("service_call_handling", handleHandling);
      socket.off("service_call_completed", handleCompleted);
    };
  }, [setItems]);

  const handleAccept = async (id) => {
    try {
      await patchAdmin(`/service-calls/${id}`, { status: "handling" });
    } catch (err) {
      alert(getApiError(err, "Không thể nhận xử lý yêu cầu."));
    }
  };

  const handleComplete = async (id) => {
    try {
      await patchAdmin(`/service-calls/${id}`, { status: "completed" });
    } catch (err) {
      alert(getApiError(err, "Không thể hoàn thành yêu cầu."));
    }
  };

  const rows = items.map((item) => ({
    id: item._id,
    tableId: item.tableId?.code || item.tableId?.name || item.tableId || "—",
    type: SERVICE_CALL_TYPE_LABELS[item.type] ?? item.type,
    status: SERVICE_CALL_STATUS_LABELS[item.status] ?? item.status,
    rawStatus: item.status,
    handledByName: item.handledBy?.fullName || "—",
    note: item.note || "—",
    createdAt: formatDateTime(item.createdAt),
  }));

  const columns = [
    { key: "tableId", label: "Bàn" },
    { key: "type", label: "Loại yêu cầu" },
    {
      key: "status",
      label: "Trạng thái",
      render: (row) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            row.rawStatus === "pending"
              ? "bg-red-100 text-red-700 animate-pulse"
              : row.rawStatus === "completed"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    { key: "handledByName", label: "Người xử lý" },
    { key: "note", label: "Ghi chú" },
    { key: "createdAt", label: "Thời gian" },
    {
      key: "actions",
      label: "Thao tác",
      render: (row) => {
        if (row.rawStatus === "pending") {
          return (
            <button
              onClick={() => handleAccept(row.id)}
              className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold transition cursor-pointer"
            >
              Nhận xử lý
            </button>
          );
        }
        if (row.rawStatus === "handling") {
          return (
            <button
              onClick={() => handleComplete(row.id)}
              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-bold transition cursor-pointer"
            >
              Hoàn thành
            </button>
          );
        }
        return <span className="text-gray-400 text-xs">Đã hoàn thành</span>;
      },
    },
  ];

  return (
    <AdminLayout title="Gọi phục vụ">
      {loading ? <PageLoading /> : null}
      {!loading && error ? <PageError message={error} onRetry={reload} /> : null}
      {!loading && !error ? (
        <AdminTable columns={columns} rows={rows} emptyMessage="Không có yêu cầu phục vụ." />
      ) : null}
    </AdminLayout>
  );
}
