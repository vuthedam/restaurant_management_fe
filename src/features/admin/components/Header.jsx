export default function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-30 shadow-sm">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div>
          <h2 className="text-3xl font-bold text-orange-600">
            Dashboard Overview
          </h2>
          <p className="text-sm text-gray-500">Tuesday, October 24th, 2024</p>
        </div>

        <button className="bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold">
          New Reservation
        </button>
      </div>
    </header>
  );
}
