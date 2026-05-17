import { Link } from "react-router-dom";
import { heroContent } from "../../data/landingData";

const LandingHero = () => {
  const { imageSrc, imageAlt, title, subtitle } = heroContent;

  return (
    <section className="relative flex h-[min(819px,90dvh)] items-center overflow-hidden md:h-[819px]">
      <div className="absolute inset-0 z-0">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover brightness-[0.7]"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-margin text-white">
        <div className="max-w-2xl">
          <h1 className="mb-md font-display text-5xl font-bold leading-tight md:text-7xl">
            {title}
          </h1>
          <p className="mb-xl font-body text-lg opacity-90 md:text-xl">
            {subtitle}
          </p>
          <div className="flex flex-col gap-md sm:flex-row">
            <Link
              to="/booking"
              className="inline-flex justify-center rounded-lg bg-primary-container px-xl py-md font-bold text-on-primary-container transition-transform hover:opacity-95 active:scale-95"
            >
              Book a Table
            </Link>
            <button
              type="button"
              className="rounded-lg border border-white/30 bg-white/10 px-xl py-md font-bold text-white backdrop-blur-md transition-transform hover:bg-white/15 active:scale-95"
            >
              Explore Menu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
