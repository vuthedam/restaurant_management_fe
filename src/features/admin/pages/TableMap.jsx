import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

// import FloorHeader from "../components/tablemap/FloorHeader";
// import TableLegend from "../components/tablemap/TableLegend";
// import QuickSummary from "../components/tablemap/QuickSummary";
// import TableGrid from "../components/tablemap/TableGrid";

const TableMap = () => {
  return (
    <div className="bg-background min-h-screen flex">
      <Sidebar />

      <main className="flex-1 lg:ml-64 flex flex-col">
        <Header title="Floor Plan" />

        <div className="flex-1 p-6 flex flex-col xl:flex-row gap-6">
          {/* LEFT SIDEBAR */}
          <div className="xl:w-80 flex flex-col gap-6">
            <TableLegend />
            <QuickSummary />
          </div>

          {/* FLOOR MAP */}
          <div className="flex-1 bg-surface-container-low border border-outline-variant rounded-2xl p-6">
            <FloorHeader />
            <TableGrid />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TableMap;
