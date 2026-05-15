import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Menu() {
  return (
    <div className="bg-gray-100 min-h-screen flex">
      <Sidebar />
      <main className="flex-1 lg:ml-64">
        <Header />
        <section className="p-6">
          <h2 className="text-2xl font-bold">Menu Manager</h2>
        </section>
      </main>
    </div>
  );
}
