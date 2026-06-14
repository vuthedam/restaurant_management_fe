import { useState, useEffect } from "react";
import api from "../../../services/api";
import AdminLayout from "../../../layouts/AdminLayout";
import { 
  Download, 
  ExternalLink, 
  Copy, 
  Check, 
  Search, 
  RefreshCw, 
  Printer,
  QrCode
} from "lucide-react";

export default function TableQrList() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  // Gọi API lấy danh sách bàn ăn kèm QR Code
  const fetchQrList = async () => {
    setLoading(true);
    setError("");
    try {
      // Gọi API GET /api/tables/qr-list
      const response = await api.get("/tables/qr-list");
      if (response.data?.success) {
        setTables(response.data.data);
      } else {
        setError(response.data?.message || "Không thể tải danh sách QR Code.");
      }
    } catch (err) {
      console.error("Lỗi lấy danh sách QR:", err);
      setError(err.response?.data?.message || "Có lỗi kết nối hệ thống. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQrList();
  }, []);

  // Xử lý sao chép URL của QR Code
  const handleCopyLink = (url, id) => {
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      })
      .catch((err) => console.error("Không thể sao chép liên kết:", err));
  };

  // Xử lý tải xuống QR Code dạng hình ảnh PNG
  const handleDownloadQr = (qrImageBase64, tableName) => {
    const link = document.createElement("a");
    link.href = qrImageBase64;
    // Chuyển tên bàn từ tiếng Việt có dấu thành không dấu/gạch dưới để làm tên file
    const safeName = tableName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_")
      .toLowerCase();
    link.download = `qr_code_${safeName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Xử lý in toàn bộ QR Code của các bàn ăn
  const handlePrintAll = () => {
    window.print();
  };

  // Lọc danh sách bàn theo ô tìm kiếm
  const filteredTables = tables.filter(
    (table) =>
      table.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      table.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout 
      title="Quản lý mã QR bàn ăn" 
      subtitle="Danh sách mã QR cố định của từng bàn ăn. Bạn có thể in hoặc tải xuống để dán tại bàn."
    >
      {/* Khung tìm kiếm và các nút thao tác nhanh */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 print:hidden">
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </span>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm transition-all text-sm"
            placeholder="Tìm theo tên bàn hoặc mã bàn (Ví dụ: Bàn 1, T01)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchQrList}
            disabled={loading}
            className="inline-flex items-center justify-center p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-emerald-600 hover:border-emerald-100 hover:bg-emerald-50 focus:outline-none shadow-sm transition-all disabled:opacity-50"
            title="Làm mới"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={handlePrintAll}
            disabled={loading || tables.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm hover:shadow focus:outline-none font-medium text-sm transition-all disabled:opacity-50"
          >
            <Printer className="w-4 h-4" />
            In tất cả QR Code
          </button>
        </div>
      </div>

      {/* Trạng thái lỗi */}
      {error && (
        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5 mb-6 text-center shadow-sm print:hidden">
          <p className="text-rose-700 font-medium mb-3">{error}</p>
          <button
            onClick={fetchQrList}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-medium text-sm rounded-xl transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Thử lại
          </button>
        </div>
      )}

      {/* Trạng thái đang tải dữ liệu (Loading Skeleton) */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 print:hidden">
          {[...Array(8)].map((_, index) => (
            <div 
              key={index} 
              className="bg-white border border-slate-200/60 rounded-2xl p-5 animate-pulse"
            >
              <div className="h-5 w-2/3 bg-slate-200 rounded mb-4"></div>
              <div className="aspect-square w-full max-w-[180px] mx-auto bg-slate-200 rounded-xl mb-4"></div>
              <div className="h-4 w-5/6 bg-slate-100 rounded mx-auto mb-2"></div>
              <div className="h-9 w-full bg-slate-100 rounded-xl mt-4"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Trạng thái danh sách rỗng */}
          {filteredTables.length === 0 ? (
            <div className="bg-white border border-slate-200/60 rounded-2xl p-12 text-center shadow-sm print:hidden">
              <QrCode className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-700 mb-1">Không tìm thấy mã QR nào</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                {searchQuery 
                  ? `Không tìm thấy bàn nào khớp với từ khóa "${searchQuery}"`
                  : "Hệ thống hiện chưa có bàn ăn nào đang hoạt động."}
              </p>
            </div>
          ) : (
            /* Hiển thị danh sách QR Code */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 print:grid-cols-2 print:gap-12">
              {filteredTables.map((table) => (
                <div
                  key={table.id}
                  className="bg-white border border-slate-200/70 rounded-2xl p-5 hover:shadow-lg hover:border-slate-300/80 transition-all duration-300 flex flex-col justify-between shadow-sm relative group print:border-none print:shadow-none print:p-2"
                >
                  <div>
                    {/* Header Thẻ bàn */}
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-slate-800 text-lg leading-tight">
                        {table.name}
                      </h3>
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg border border-emerald-100">
                        {table.code}
                      </span>
                    </div>

                    {/* Khung Ảnh QR Code */}
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex justify-center items-center aspect-square max-w-[200px] mx-auto mb-4 group-hover:bg-white transition-all print:bg-white print:border-none">
                      <img
                        src={table.qr_image}
                        alt={`Mã QR ${table.name}`}
                        className="w-full h-full object-contain select-none print:w-[150px] print:h-[150px]"
                      />
                    </div>

                    {/* Hiển thị URL tĩnh */}
                    <div className="text-center mb-4 print:hidden">
                      <p className="text-slate-400 text-[11px] mb-1 font-mono uppercase tracking-wider">
                        Đường dẫn cố định
                      </p>
                      <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg text-slate-600 text-xs font-mono break-all line-clamp-1 border border-slate-100">
                        <span className="truncate flex-1 text-left">{table.qr_url}</span>
                        <button
                          onClick={() => handleCopyLink(table.qr_url, table.id)}
                          className="text-slate-400 hover:text-emerald-600 transition-colors focus:outline-none shrink-0"
                          title="Sao chép liên kết"
                        >
                          {copiedId === table.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Nút hành động */}
                  <div className="flex gap-2.5 mt-2 print:hidden">
                    <button
                      onClick={() => handleDownloadQr(table.qr_image, table.name)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-white border border-slate-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-200 hover:bg-emerald-50 rounded-xl font-medium text-xs shadow-sm hover:shadow transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Tải PNG
                    </button>
                    
                    <a
                      href={table.qr_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-2 bg-slate-50 border border-slate-200 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200 rounded-xl transition-all"
                      title="Mở link dán trên bàn"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Nhãn ẩn dùng riêng khi in ấn */}
                  <div className="hidden print:block text-center mt-2">
                    <p className="text-sm font-semibold text-slate-900">{table.name}</p>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">{table.qr_url}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Định nghĩa CSS bổ sung cho chế độ in ấn để tạo trang in đẹp mắt */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #root, main, section, .print\\:grid-cols-2, .print\\:grid-cols-2 * {
            visibility: visible;
          }
          main {
            margin: 0 !important;
            padding: 0 !important;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          section {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
          }
          .print\\:grid-cols-2 {
            display: grid !important;
            grid-template-cols: repeat(2, 1fr) !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </AdminLayout>
  );
}
