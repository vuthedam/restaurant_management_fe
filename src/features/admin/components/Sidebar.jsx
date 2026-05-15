import { NavLink } from "react-router-dom";

const navClass = ({ isActive }) =>
  `px-4 py-3 rounded font-semibold ${
    isActive
      ? "bg-orange-100 text-orange-600"
      : "hover:bg-gray-100 text-gray-700"
  }`;

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 bg-white border-r shadow-sm">
      <div className="px-6 py-8">
        <h1 className="text-2xl font-bold text-orange-600">Admin Portal</h1>
        <p className="text-sm text-gray-500">Main Branch HQ</p>
      </div>

      <nav className="flex-1 flex flex-col px-4 gap-2">
        <NavLink to="/admin/dashboard" className={navClass}>Dashboard</NavLink>
        <NavLink to="/admin/orders" className={navClass}>Live Orders</NavLink>
        <NavLink to="/admin/tables" className={navClass}>Table Map</NavLink>
        <NavLink to="/admin/menu" className={navClass}>Menu Manager</NavLink>
        <NavLink to="/admin/reservations" className={navClass}>Reservations</NavLink>
      </nav>
    </aside>
  );
}
