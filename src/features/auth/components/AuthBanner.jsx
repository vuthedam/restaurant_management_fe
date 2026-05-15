import FeatureCard from "../../../components/ui/FeatureCard";

const AuthBanner = () => {
  return (
    <section className="relative hidden min-h-0 flex-1 overflow-hidden bg-gradient-to-br from-primary to-on-primary-container lg:flex lg:w-3/5">
      <div className="absolute inset-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1bY4T52EfM-7cmjoP7uuNmZar7s0EBd1nuD1SrwIezfHzL4C3y-A1qcGPZptGoYyqSTeGo2UvtcE-GaO2VlIvIc9CY1dc1V27KJO00uxDgQ51JIul5nhHr2d-tFc1vf1chIg5P7yZCv_nVwpJzovp7R2ZRFM3_IsU0a5LPwOCHv6EQAj0486aZaWsUWEHbaYm1DqXPlVJ2-5p51o4R0KiSMZTc9Sajo_sb3moDam44vmpk-4_namFgmooV-JnBPQcykRAUxLKDCk"
          alt=""
          className="h-full w-full object-cover opacity-25"
        />
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-black/25"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col justify-between gap-8 px-10 py-10 xl:px-14 xl:py-12">
        <header className="flex shrink-0 items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
            <span className="material-symbols-outlined text-[22px] text-white">
              restaurant
            </span>
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            Appetite
          </span>
        </header>

        <div className="flex min-h-0 flex-1 flex-col justify-center py-4">
          <h1 className="max-w-[22ch] font-display text-4xl font-bold leading-[1.08] tracking-tight text-white xl:text-[2.75rem] xl:leading-[1.06]">
            Manage your culinary excellence.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/88 xl:text-lg">
            The centralized platform for restaurant operations.
          </p>
        </div>

        <div className="grid shrink-0 grid-cols-2 gap-4 xl:gap-5">
          <FeatureCard
            icon="analytics"
            title="Real-time Insights"
            desc="Monitor live performance."
          />
          <FeatureCard
            icon="security"
            title="Enterprise Security"
            desc="Encrypted business protection."
          />
        </div>
      </div>
    </section>
  );
};

export default AuthBanner;
