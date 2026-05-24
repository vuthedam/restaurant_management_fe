const RegisterHeader = () => {
  return (
    <>
      <div className="mb-10 flex items-center gap-2 lg:hidden">
        <div className="flex size-10 items-center justify-center rounded-2xl bg-primary shadow-sm shadow-primary/30">
          <span className="material-symbols-outlined text-white text-[20px]">
            restaurant
          </span>
        </div>
        <h1 className="text-2xl font-bold text-primary">Appetite</h1>
      </div>

      <div className="mb-10">
        <h2 className="text-4xl font-bold mb-2">Tạo tài khoản</h2>
        <p className="text-on-surface-variant">
          Thiết lập tài khoản quản trị để bắt đầu sử dụng hệ thống.
        </p>
      </div>
    </>
  );
};

export default RegisterHeader;
