const TopBar = () => {
  return (
    <div className="sticky top-0 z-20 bg-white border-b px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-orange-600">Quản lý thực đơn</h1>
      <button type="button" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">
        Thêm món mới
      </button>
    </div>
  );
};

export default TopBar;
