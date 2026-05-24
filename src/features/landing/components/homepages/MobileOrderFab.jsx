import { Link } from "react-router-dom";

const MobileOrderFab = () => {
  return (
    <Link
      to="/order?table=demo-table-01"
      className="fixed bottom-lg right-lg z-40 flex size-14 items-center justify-center rounded-full bg-primary-container text-on-primary-container shadow-lg transition-transform hover:opacity-95 active:scale-90 md:hidden"
      aria-label="Đặt món hoặc đăng nhập"
    >
      <span className="material-symbols-outlined">restaurant</span>
    </Link>
  );
};

export default MobileOrderFab;
