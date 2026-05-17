import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import { getAvatarUrl, getRoleLabel } from "../../../utils/authStorage";

const navClass = ({ isActive }) =>
  `px-4 py-3 rounded-xl font-semibold transition ${
    isActive
      ? "bg-orange-100 text-orange-600"
      : "hover:bg-gray-100 text-gray-700"
  }`;

export default function Sidebar() {
  const { user, logout } = useAuth();

  const displayName = user?.fullName || "User";
  const displayRole = getRoleLabel(user?.role);
  const avatarSrc = getAvatarUrl(user);

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 bg-white border-r shadow-sm">
      <div className="px-6 py-8">
        <h1 className="text-2xl font-bold text-orange-600">Admin Portal</h1>
        <p className="text-sm text-gray-500">Main Branch HQ</p>
      </div>

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

      <div className="p-4 border-t bg-gray-50">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={avatarSrc}
            alt={displayName}
            className="w-11 h-11 rounded-full object-cover border bg-orange-100"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800 truncate">{displayName}</p>
            <p className="text-sm text-gray-500">{displayRole}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
