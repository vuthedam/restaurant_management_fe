import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const navClass = ({ isActive }) =>
  `px-4 py-3 rounded-xl font-semibold transition ${
    isActive
      ? "bg-orange-100 text-orange-600"
      : "hover:bg-gray-100 text-gray-700"
  }`;

export default function Sidebar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const res = await axios.get(
          "https://restaurant-management-biap.onrender.com/api/users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setUser(res.data.data);
      } catch (error) {
        console.error("Lỗi lấy user:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 bg-white border-r shadow-sm">
      {/* Header */}
      <div className="px-6 py-8">
        <h1 className="text-2xl font-bold text-orange-600">Admin Portal</h1>
        <p className="text-sm text-gray-500">Main Branch HQ</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col px-4 gap-2">
        <NavLink to="/admin/dashboard" className={navClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/orders" className={navClass}>
          Live Orders
        </NavLink>
        <NavLink to="/admin/tables" className={navClass}>
          Table Map
        </NavLink>
        <NavLink to="/admin/menu" className={navClass}>
          Menu Manager
        </NavLink>
        <NavLink to="/admin/reservations" className={navClass}>
          Reservations
        </NavLink>
      </nav>

      {/* Footer user profile */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={user?.avatar || "https://i.pravatar.cc/100?img=12"}
            alt="avatar"
            className="w-11 h-11 rounded-full object-cover border"
          />
          <div className="flex-1">
            <p className="font-semibold text-gray-800">
              {user?.fullName || "Loading..."}
            </p>
            <p className="text-sm text-gray-500">
              {user?.role || "Administrator"}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
