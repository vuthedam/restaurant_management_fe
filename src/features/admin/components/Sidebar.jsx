import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import { getAvatarUrl, getRoleLabel } from "../../../utils/authStorage";
import { getNavSectionsForRole, isAdmin } from "../../../config/adminPermissions";

const navClass = ({ isActive }) =>
  `px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
    isActive
      ? "bg-orange-100 text-orange-600"
      : "hover:bg-gray-100 text-gray-700"
  }`;

export default function Sidebar() {
  const { user, logout } = useAuth();

  const displayName = user?.fullName || "Người dùng";
  const displayRole = getRoleLabel(user?.role);
  const avatarSrc = getAvatarUrl(user);
  const navSections = getNavSectionsForRole(user?.role);
  const portalTitle = isAdmin(user?.role) ? "Cổng quản trị" : "Cổng nhân viên";

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 bg-white border-r shadow-sm z-40">
      <div className="px-6 py-6 shrink-0">
        <h1 className="text-xl font-bold text-orange-600">{portalTitle}</h1>
        <p className="text-xs text-gray-500 mt-1">Chi nhánh chính</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 pb-4 space-y-5">
        {navSections.map((section) => (
          <div key={section.title}>
            <p className="px-2 mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
              {section.title}
            </p>
            <div className="flex flex-col gap-1">
              {section.links.map((link) => (
                <NavLink key={link.to} to={link.to} className={navClass}>
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t bg-gray-50 shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={avatarSrc}
            alt={displayName}
            className="w-10 h-10 rounded-full object-cover border bg-orange-100"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-gray-800 truncate">{displayName}</p>
            <p className="text-xs text-gray-500">{displayRole}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition text-sm font-semibold"
        >
          <LogOut size={16} />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
