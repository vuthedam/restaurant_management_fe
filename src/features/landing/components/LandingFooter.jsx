import { footerLinks } from "../data/landingData";

const linkClass =
  "font-body text-xs font-bold uppercase tracking-wider text-on-surface-variant transition-colors hover:text-primary";

/**
 * @param {{ variant?: "full" | "simple" }} props
 */
const LandingFooter = ({ variant = "full" }) => {
  const simple = variant === "simple";

  return (
    <footer
      className={`flex w-full flex-col items-center justify-between border-t border-outline-variant bg-surface-container-lowest px-margin py-xl md:flex-row ${simple ? "mt-xl" : ""}`}
    >
      <div
        className={
          simple
            ? "mb-md md:mb-0"
            : "mb-lg flex flex-col items-center gap-sm md:mb-0 md:items-start"
        }
      >
        <span className="font-body text-lg font-bold text-primary">Appetite</span>
        <p
          className={`font-body text-xs font-bold uppercase tracking-wider text-on-surface-variant ${simple ? "mt-xs" : ""}`}
        >
          © 2024 Appetite Restaurant Management System.
        </p>
      </div>

      <div
        className={
          simple
            ? "mb-md flex flex-wrap justify-center gap-lg md:mb-0"
            : "mb-lg flex flex-wrap justify-center gap-x-xl gap-y-sm md:mb-0"
        }
      >
        {footerLinks.map(({ label, href }) => (
          <a key={label} href={href} className={linkClass}>
            {label}
          </a>
        ))}
      </div>

      {!simple ? (
        <div className="flex gap-md">
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition-all hover:bg-primary hover:text-on-primary"
            aria-label="Website"
          >
            <span className="material-symbols-outlined">public</span>
          </button>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition-all hover:bg-primary hover:text-on-primary"
            aria-label="Email"
          >
            <span className="material-symbols-outlined">mail</span>
          </button>
        </div>
      ) : null}
    </footer>
  );
};

export default LandingFooter;
