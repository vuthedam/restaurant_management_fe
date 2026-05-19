import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import ReservationStats from "../components/reservation/ReservationStats";
import ReservationFilters from "../components/reservation/ReservationFilters";
import ReservationTable from "../components/reservation/ReservationTable";
import ReservationPagination from "../components/reservation/ReservationPagination";

const Reservation = () => {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex overflow-hidden">
      <Sidebar />

      <main className="flex-1 lg:ml-64 flex flex-col h-screen overflow-hidden">
        <Header title="Reservations Management" />

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pt-10 pb-4">
          <ReservationStats />
        </section>

        <section className="flex-1 px-6 pb-10 overflow-hidden flex flex-col">
          <div className="bg-white border rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden">
            <ReservationFilters />

            <ReservationTable />

            <ReservationPagination />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Reservation;
