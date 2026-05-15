import { useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../data/landingData";

function linkTarget(item) {
  if (!item.to) return null;
  return item.hash ? { pathname: item.to, hash: item.hash } : item.to;
}

function NavItem({ item, isActive, onNavigate }) {
  const className = isActive
    ? "border-b-2 border-primary pb-1 font-body text-base text-primary transition-colors hover:text-primary-container"
    : "font-body text-base text-secondary transition-colors hover:text-primary-container";

  const to = linkTarget(item);
  if (to) {
    return (
      <Link to={to} className={className} onClick={onNavigate}>
        {item.label}
      </Link>
    );
  }
  return (
    <a href={item.href} className={className} onClick={onNavigate}>
      {item.label}
    </a>
  );
}

/**
 * Header dùng chung cho Home / Booking: activeLabel khớp `label` trong navLinks.
 */
const SiteHeader = ({
  activeLabel,
  showStaffLoginMobile = true,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-outline-variant bg-surface">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-margin py-md">
        <Link
          to="/"
          className="font-display text-2xl font-semibold tracking-tight text-primary"
        >
          Appetite
        </Link>

        <div className="hidden items-center gap-xl md:flex">
          {navLinks.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              isActive={item.label === activeLabel}
            />
          ))}
        </div>

        <div className="flex items-center gap-md">
          <Link
            to="/login"
            className="rounded-lg bg-primary px-lg py-sm font-body text-xs font-bold uppercase tracking-wider text-on-primary transition-transform hover:opacity-95 active:scale-95"
          >
            Order Now
          </Link>
          <button
            type="button"
            className="text-primary md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="site-mobile-nav"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span className="material-symbols-outlined">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {mobileOpen ? (
        <div
          id="site-mobile-nav"
          className="border-t border-outline-variant bg-surface px-margin py-md md:hidden"
        >
          <div className="flex flex-col gap-md">
            {navLinks.map((item) => (
              <NavItem
                key={item.label}
                item={item}
                isActive={item.label === activeLabel}
                onNavigate={() => setMobileOpen(false)}
              />
            ))}
            {showStaffLoginMobile ? (
              <Link
                to="/login"
                className="font-body text-base font-semibold text-primary"
                onClick={() => setMobileOpen(false)}
              >
                Staff login
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default SiteHeader;
