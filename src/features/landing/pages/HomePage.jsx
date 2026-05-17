import SiteHeader from "../components/homepages/SiteHeader";
import LandingHero from "../components/homepages/LandingHero";
import MenuSection from "../components/homepages/MenuSection";
import ReservationBanner from "../components/homepages/ReservationBanner";
import LandingFooter from "../components/homepages/LandingFooter";
import MobileOrderFab from "../components/homepages/MobileOrderFab";

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
