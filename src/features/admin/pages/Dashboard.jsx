import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/dashboard/StatCard";
import SalesChart from "../components/dashboard/SalesChart";
import TopMenuItems from "../components/dashboard/TopMenuItems";
import RecentOrders from "../components/dashboard/RecentOrders";

export default function Dashboard() {
  return (
    <div className="bg-gray-100 min-h-screen flex">
      <Sidebar />

      <main className="flex-1 lg:ml-64">
        <Header />

        <section className="p-6 max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="Today's Revenue"
              value="$12,482.50"
              sub="+12% from yesterday"
            />
            <StatCard title="Total Orders" value="142" sub="-3% vs last week" />
            <StatCard title="Occupancy Rate" value="84%" sub="18 / 22 tables" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <SalesChart />
            </div>

            <TopMenuItems />
          </div>

          <RecentOrders />
        </section>
      </main>
    </div>
  );
}
