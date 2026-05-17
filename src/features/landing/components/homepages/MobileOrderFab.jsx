import { Link } from "react-router-dom";

const MobileOrderFab = () => {
  return (
    <Link
      to="/login"
      className="fixed bottom-lg right-lg z-40 flex size-14 items-center justify-center rounded-full bg-primary-container text-on-primary-container shadow-lg transition-transform hover:opacity-95 active:scale-90 md:hidden"
      aria-label="Order or sign in"
    >
      <span className="material-symbols-outlined">restaurant</span>
    </Link>
  );
};

export default MobileOrderFab;
