import { useState, useMemo } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { PageError, PageLoading } from "../components/common/PageState";
import useAdminList from "../hooks/useAdminList";
import { deleteAdmin, getApiError } from "../services/adminApi";
import { formatDateTime } from "../utils/adminLabels";

function Stars({ rating }) {
  return (
    <span
      className="text-amber-500 font-bold text-sm tracking-wide"
      title={`${rating}/5`}
    >
      {"★".repeat(Math.round(rating))}
      <span className="text-gray-200">
        {"★".repeat(5 - Math.round(rating))}
      </span>
      <span className="text-xs text-gray-500 ml-1">
        ({Number(rating).toFixed(1)})
      </span>
    </span>
  );
}

export default function Reviews() {
  const { items: reviews, loading, error, reload } = useAdminList("/reviews");
  const { items: tables } = useAdminList("/tables");

  const [search, setSearch] = useState("");
  const [selectedTableId, setSelectedTableId] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id, name) => {
    if (
      !window.confirm(`Bạn có chắc chắn muốn xóa đánh giá của khách "${name}"?`)
    )
      return;
    setActionError(null);
    setDeletingId(id);
    try {
      await deleteAdmin(`/reviews/${id}`);
      reload();
    } catch (err) {
      setActionError(getApiError(err, "Không xóa được đánh giá."));
    } finally {
      setDeletingId(null);
    }
  };

  const processedReviews = useMemo(() => {
    return reviews.map((item) => {
      const session = item.table_session_id || item.tableSessionId;
      const tableObj = session?.tableId;

      return {
        id: item._id,
        customerName: session?.customerName || "Khách vãng lai",
        tableName: tableObj?.name || tableObj?.code || "—",
        tableId: tableObj?._id || tableObj || "",
        foodRating: item.food_rating || item.foodRating || item.rating || 0,
        serviceRating:
          item.service_rating || item.serviceRating || item.rating || 0,
        ambianceRating:
          item.ambiance_rating || item.ambianceRating || item.rating || 0,
        rating: item.rating || 0,
        comment: item.comment || "—",
        rawDate: item.createdAt,
        dateLabel: formatDateTime(item.createdAt),
      };
    });
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    let result = [...processedReviews];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((r) => r.customerName.toLowerCase().includes(q));
    }

    if (selectedTableId) {
      result = result.filter(
        (r) => String(r.tableId) === String(selectedTableId),
      );
    }

    return result;
  }, [processedReviews, search, selectedTableId]);

  return (
    <AdminLayout title="Quản lý đánh giá của khách hàng">
      {loading ? <PageLoading /> : null}
      {!loading && error ? (
        <PageError message={error} onRetry={reload} />
      ) : null}

      {!loading && !error && (
        <div className="space-y-6">
          {actionError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
              {actionError}
            </div>
          )}

          {/* Search and Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white p-4 rounded-2xl border shadow-xs">
            <div className="relative flex-1 max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-lg">
                search
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm theo tên khách..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800"
              />
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedTableId}
                onChange={(e) => setSelectedTableId(e.target.value)}
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-700"
              >
                <option value="">Tất cả các bàn</option>
                {tables.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name || t.code}
                  </option>
                ))}
              </select>

              <button
                onClick={() => {
                  setSearch("");
                  setSelectedTableId("");
                }}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-all cursor-pointer"
                title="Làm mới bộ lọc"
              >
                <span className="material-symbols-outlined">restart_alt</span>
              </button>
            </div>
          </div>

          {/* Reviews List Table */}
          <div className="bg-white border rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider border-b">
                    <th className="px-6 py-4">Khách hàng</th>
                    <th className="px-6 py-4">Bàn</th>
                    <th className="px-6 py-4">Món ăn</th>
                    <th className="px-6 py-4">Phục vụ</th>
                    <th className="px-6 py-4">Không gian</th>
                    <th className="px-6 py-4">Điểm trung bình</th>
                    <th className="px-6 py-4">Bình luận</th>
                    <th className="px-6 py-4">Thời gian</th>
                    <th className="px-6 py-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                  {filteredReviews.length > 0 ? (
                    filteredReviews.map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-gray-50/50 transition-all"
                      >
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          {row.customerName}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 bg-orange-50 text-orange-700 border border-orange-100 rounded-lg text-xs font-bold">
                            {row.tableName}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-800">
                            {row.foodRating} ★
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-800">
                            {row.serviceRating} ★
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-800">
                            {row.ambianceRating} ★
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Stars rating={row.rating} />
                        </td>
                        <td
                          className="px-6 py-4 max-w-[200px] truncate"
                          title={row.comment}
                        >
                          {row.comment}
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-500">
                          {row.dateLabel}
                        </td>
                        <td className="px-6 py-4 text-right space-x-2 shrink-0">
                          <button
                            onClick={() => setSelectedReview(row)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                            title="Xem chi tiết"
                          >
                            <span className="material-symbols-outlined text-lg">
                              visibility
                            </span>
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(row.id, row.customerName)
                            }
                            disabled={deletingId === row.id}
                            className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50 cursor-pointer"
                            title="Xóa đánh giá"
                          >
                            <span className="material-symbols-outlined text-lg">
                              delete
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="9"
                        className="text-center py-12 text-gray-500"
                      >
                        Không tìm thấy đánh giá nào.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Review Detail Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full bg-white border rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 animate-scale-up">
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-xl font-bold text-gray-900 font-display">
                  Chi tiết đánh giá
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Được gửi bởi khách:{" "}
                  <strong>{selectedReview.customerName}</strong> tại{" "}
                  <strong>{selectedReview.tableName}</strong>
                </p>
              </div>

              {/* Ratings List */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-gray-50 border rounded-xl text-center space-y-1">
                  <p className="text-xs text-gray-500 font-bold uppercase">
                    Món ăn
                  </p>
                  <p className="text-xl font-bold text-amber-600">
                    {selectedReview.foodRating}{" "}
                    <span className="text-xs">★</span>
                  </p>
                </div>
                <div className="p-3 bg-gray-50 border rounded-xl text-center space-y-1">
                  <p className="text-xs text-gray-500 font-bold uppercase">
                    Phục vụ
                  </p>
                  <p className="text-xl font-bold text-amber-600">
                    {selectedReview.serviceRating}{" "}
                    <span className="text-xs">★</span>
                  </p>
                </div>
                <div className="p-3 bg-gray-50 border rounded-xl text-center space-y-1">
                  <p className="text-xs text-gray-500 font-bold uppercase">
                    Không gian
                  </p>
                  <p className="text-xl font-bold text-amber-600">
                    {selectedReview.ambianceRating}{" "}
                    <span className="text-xs">★</span>
                  </p>
                </div>
              </div>

              {/* Average rating banner */}
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-orange-800 uppercase tracking-wider">
                    Điểm đánh giá trung bình
                  </p>
                  <div className="mt-1">
                    <Stars rating={selectedReview.rating} />
                  </div>
                </div>
                <span className="text-3xl font-extrabold text-orange-600">
                  {Number(selectedReview.rating).toFixed(1)}
                </span>
              </div>

              {/* Comments block */}
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Lời bình luận từ khách hàng
                </p>
                <div className="p-4 bg-gray-50 rounded-2xl text-sm text-gray-700 italic border min-h-[80px]">
                  &ldquo;{selectedReview.comment}&rdquo;
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t pt-4">
                <button
                  onClick={() => setSelectedReview(null)}
                  className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-all cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    const id = selectedReview.id;
                    const name = selectedReview.customerName;
                    setSelectedReview(null);
                    handleDelete(id, name);
                  }}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer"
                >
                  Xóa Đánh Giá
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
