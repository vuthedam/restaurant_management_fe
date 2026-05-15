const QuickSummary = () => {
  return (
    <section className="bg-white border rounded-xl p-4 shadow-sm">
      <h3 className="font-bold text-lg mb-4">Quick Summary</h3>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
        <p className="text-primary text-sm font-bold mb-2">
          Active Table: T-12
        </p>

        <div className="flex justify-between items-center mb-4">
          <h4 className="text-2xl font-bold">6 Guests</h4>

          <span className="text-red-500 font-bold">45m</span>
        </div>

        <div className="space-y-1 text-sm mb-4">
          <p>• 2x Wagyu Sliders</p>
          <p>• 1x Truffle Fries</p>
          <p>• 4x Appetite IPAs</p>
        </div>

        <button className="w-full bg-black text-white py-2 rounded-lg font-semibold">
          View Full Order
        </button>
      </div>
    </section>
  );
};

export default QuickSummary;
