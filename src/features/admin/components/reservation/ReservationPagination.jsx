const ReservationPagination = () => {
  return (
    <div className="p-4 border-t flex items-center justify-between">
      <p className="text-sm text-gray-500">Showing 5 of 42 reservations</p>

      <div className="flex gap-2">
        <button className="w-8 h-8 border rounded-lg">1</button>

        <button className="w-8 h-8 border rounded-lg">2</button>
      </div>
    </div>
  );
};

export default ReservationPagination;
