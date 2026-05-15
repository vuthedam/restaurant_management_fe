import SiteHeader from "../components/SiteHeader";
import LandingHero from "../components/LandingHero";
import MenuSection from "../components/MenuSection";
import ReservationBanner from "../components/ReservationBanner";
import LandingFooter from "../components/LandingFooter";
import MobileOrderFab from "../components/MobileOrderFab";

const HomePage = () => {
  return (
    <div className="min-h-dvh bg-background font-body text-on-surface">
      <SiteHeader activeLabel="Menu" showStaffLoginMobile />
      <main className="pt-[72px]">
        <LandingHero />
        <MenuSection />
        <ReservationBanner />
      </main>
      <LandingFooter />
      <MobileOrderFab />
    </div>
  );
};

export default HomePage;
