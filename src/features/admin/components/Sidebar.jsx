import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 bg-white border-r shadow-sm">
      <div className="px-6 py-8">
        <h1 className="text-2xl font-bold text-orange-600">Admin Portal</h1>
        <p className="text-sm text-gray-500">Main Branch HQ</p>
      </div>

      <nav className="flex-1 flex flex-col px-4 gap-2">
        <Link
          to="/admin/dashboard"
          className="bg-orange-100 text-orange-600 px-4 py-3 rounded font-semibold"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/orders"
          className="px-4 py-3 hover:bg-gray-100 rounded"
        >
          Live Orders
        </Link>

        <Link
          to="/admin/tables"
          className="px-4 py-3 hover:bg-gray-100 rounded"
        >
          Table Map
        </Link>

        <Link to="/admin/menu" className="px-4 py-3 hover:bg-gray-100 rounded">
          Menu Manager
        </Link>

        <Link
          to="/admin/reservations"
          className="px-4 py-3 hover:bg-gray-100 rounded"
        >
          Reservations
        </Link>
      </nav>
    </aside>
  );
}
