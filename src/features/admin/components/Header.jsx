import { useState, useEffect, useRef } from "react";
import { socket } from "../../../services/socket";
import { fetchAdminList, patchAdmin } from "../services/adminApi";
import { formatRelativeTime } from "../utils/adminLabels";

// Web Audio API Synthesizer Chime helper
const playChimeSound = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioCtx.currentTime;
    
    // First note (E5)
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(659.25, now);
    gain1.gain.setValueAtTime(0.08, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(now);
    osc1.stop(now + 0.3);

    // Second note (A5) after 0.1 seconds
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(880.00, now + 0.1);
    gain2.gain.setValueAtTime(0.08, now + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(now + 0.1);
    osc2.stop(now + 0.45);
  } catch (error) {
    console.error("Failed to play chime sound:", error);
  }
};

export default function Header({
  title = "Tổng quan",
  subtitle,
  actionLabel,
  onAction,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCalls, setActiveCalls] = useState([]);
  const [toasts, setToasts] = useState([]);
  const dropdownRef = useRef(null);

  const dateStr =
    subtitle ??
    new Date().toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch active service calls on mount
  useEffect(() => {
    const loadCalls = async () => {
      try {
        const data = await fetchAdminList("/service-calls?status=pending,handling");
        setActiveCalls(data);
      } catch (err) {
        console.error("Failed to load active service calls:", err);
      }
    };
    loadCalls();
  }, []);

  // Socket.IO event listeners
  useEffect(() => {
    const handleNewCall = (newCall) => {
      setActiveCalls((prev) => {
        // Avoid duplicates
        if (prev.some((c) => c._id === newCall._id)) return prev;
        return [newCall, ...prev];
      });

      // Play notification chime sound
      playChimeSound();

      // Trigger Toast notification
      const toastText = `Bàn ${newCall.tableId?.code || newCall.tableId?.name || "???"} ${newCall.note || newCall.type}`;
      const newToast = { id: Date.now(), message: toastText };
      setToasts((prev) => [...prev, newToast]);

      // Auto dismiss Toast after 5 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 5000);
    };

    const handleHandling = (updatedCall) => {
      setActiveCalls((prev) =>
        prev.map((c) => (c._id === updatedCall._id ? updatedCall : c))
      );
    };

    const handleCompleted = (completedCall) => {
      // Completed calls disappear from active lists
      setActiveCalls((prev) => prev.filter((c) => c._id !== completedCall._id));
    };

    socket.on("new_service_call", handleNewCall);
    socket.on("service_call_handling", handleHandling);
    socket.on("service_call_completed", handleCompleted);

    return () => {
      socket.off("new_service_call", handleNewCall);
      socket.off("service_call_handling", handleHandling);
      socket.off("service_call_completed", handleCompleted);
    };
  }, []);

  const handleAction = async (id, newStatus) => {
    try {
      await patchAdmin(`/service-calls/${id}`, { status: newStatus });
      // The socket listener handles local activeCalls update reactively
    } catch (err) {
      alert("Lỗi khi cập nhật trạng thái yêu cầu.");
    }
  };

  return (
    <header className="bg-white border-b border-slate-200/60 sticky top-0 z-30 shadow-xs">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h2>
          <p className="text-sm text-slate-500">{dateStr}</p>
        </div>

        <div className="flex items-center gap-4">
          {actionLabel ? (
            <button
              type="button"
              onClick={onAction}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow cursor-pointer"
            >
              {actionLabel}
            </button>
          ) : null}

          {/* Notification Bell Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2 text-slate-600 hover:text-orange-500 hover:bg-slate-100 rounded-full transition-all cursor-pointer flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-2xl">notifications</span>
              {activeCalls.length > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center animate-pulse border-2 border-white">
                  {activeCalls.length}
                </span>
              )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200/60 rounded-2xl shadow-lg z-50 overflow-hidden animate-scale-up">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 font-display flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-orange-500 text-lg">support_agent</span>
                    Yêu cầu cần hỗ trợ
                  </h3>
                  <span className="text-xs bg-orange-50 text-orange-600 border border-orange-100/50 font-semibold px-2 py-0.5 rounded-full">
                    {activeCalls.length} hoạt động
                  </span>
                </div>

                <div className="max-h-96 overflow-y-auto divide-y divide-slate-100">
                  {activeCalls.length === 0 ? (
                    <div className="p-6 text-center text-slate-500">
                      <span className="material-symbols-outlined text-slate-300 text-4xl block mb-2">notifications_off</span>
                      <p className="text-sm">Không có yêu cầu phục vụ nào</p>
                    </div>
                  ) : (
                    activeCalls.map((call) => {
                      const typeIcons = {
                        request_payment: "payments",
                        need_water: "water_drop",
                        clean_table: "dry_cleaning",
                        call_staff: "support_agent",
                        other: "notifications",
                      };
                      return (
                        <div key={call._id} className="p-4 hover:bg-slate-50/50 transition-colors space-y-3">
                          <div className="flex justify-between items-start gap-2">
                            <div className="flex gap-2">
                              <span className="material-symbols-outlined text-slate-400 mt-1">
                                {typeIcons[call.type] || "notifications"}
                              </span>
                              <div>
                                <span className="font-semibold text-[10px] text-orange-600 bg-orange-50 px-2 py-0.5 rounded-xl border border-orange-100/50">
                                  Bàn {call.tableId?.code || call.tableId?.name || "???"}
                                </span>
                                <p className="text-sm text-slate-800 font-semibold mt-1.5 leading-snug">
                                  {call.note || "Yêu cầu phục vụ"}
                                </p>
                                <span className="text-[10px] text-slate-400 block mt-1">
                                  {formatRelativeTime(call.createdAt)}
                                </span>
                              </div>
                            </div>
                            
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${
                              call.status === "pending"
                                ? "bg-amber-50 text-amber-600 border-amber-100/50"
                                : "bg-blue-50 text-blue-600 border-blue-100/50"
                            }`}>
                              {call.status === "pending" ? "Đang chờ" : "Đang xử lý"}
                            </span>
                          </div>

                          {call.status === "handling" && call.handledBy && (
                            <p className="text-[10px] text-slate-600 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                              👤 Người nhận: <strong>{call.handledBy.fullName}</strong>
                            </p>
                          )}

                          <div className="flex gap-2">
                            {call.status === "pending" ? (
                              <button
                                onClick={() => handleAction(call._id, "handling")}
                                className="w-full py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm"
                              >
                                Nhận xử lý
                              </button>
                            ) : (
                              <button
                                onClick={() => handleAction(call._id, "completed")}
                                className="w-full py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm"
                              >
                                Hoàn thành
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-orange-500 border border-orange-400 text-white px-5 py-4 rounded-2xl shadow-lg flex items-center justify-between gap-4 max-w-sm w-80 animate-slide-in"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl animate-bounce">notifications_active</span>
              <p className="text-sm font-semibold">{toast.message}</p>
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-white/80 hover:text-white transition cursor-pointer flex items-center"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        ))}
      </div>
    </header>
  );
}
