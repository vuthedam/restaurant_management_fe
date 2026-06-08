/**
 * PAGE CONTAINER: TableMap.jsx (Tables)
 * TUYẾN ĐƯỜNG (ROUTE): /admin/tables
 * ĐỊA CHỈ FILE: table-order-ap/src/features/admin/pages/TableMap.jsx
 *
 * MÔ TẢ:
 * Sơ đồ bàn ăn trực quan thời gian thực của nhà hàng dành cho Admin/Staff.
 * Hiển thị tình trạng bàn ăn (trống, đang dùng bữa, chờ thanh toán),
 * cho phép mở phiên dùng bàn mới, tạo đơn đặt hộ khách tại bàn, và kích hoạt thanh toán bàn.
 */

import { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import FloorHeader from "../components/tablemap/FloorHeader";
import TableLegend from "../components/tablemap/TableLegend";
import QuickSummary from "../components/tablemap/QuickSummary";
import TableGrid from "../components/tablemap/TableGrid";
import { PageError, PageLoading } from "../components/common/PageState";
import useAdminList from "../hooks/useAdminList";

export default function TableMap() {
  const { items: tables, loading, error, reload } = useAdminList("/tables");
  const [selectedTableId, setSelectedTableId] = useState(null);

  const selectedTable = tables.find((t) => t._id === selectedTableId) || tables.find((t) => t.status === "occupied") || tables[0];

  return (
    <AdminLayout title="Sơ đồ bàn" fullWidth>
      {loading ? <PageLoading /> : null}
      {!loading && error ? <PageError message={error} onRetry={reload} /> : null}

      {!loading && !error ? (
        <div className="flex flex-col xl:flex-row gap-6">
          <div className="xl:w-96 flex flex-col gap-6 shrink-0">
            <TableLegend tables={tables} />
            <QuickSummary table={selectedTable} allTables={tables} reloadTables={reload} />
          </div>

          <div className="flex-1 bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm min-h-[400px]">
            <FloorHeader tables={tables} />
            <TableGrid
              tables={tables}
              selectedTableId={selectedTable?._id}
              onSelectTable={setSelectedTableId}
            />
          </div>
        </div>
      ) : null}
    </AdminLayout>
  );
}
