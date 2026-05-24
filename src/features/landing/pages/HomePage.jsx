/**
 * PAGE CONTAINER: HomePage.jsx
 * TUYẾN ĐƯỜNG (ROUTE): / (Trang chủ chính của khách hàng)
 * ĐỊA CHỈ FILE: table-order-ap/src/features/landing/pages/HomePage.jsx
 *
 * MÔ TẢ:
 * Trang chủ chính của nhà hàng. Cho phép khách hàng xem các món ăn nổi bật, 
 * thông tin giới thiệu, đặt bàn trước hoặc đi thẳng tới trang gọi món tại bàn.
 */

import SiteHeader from "../components/homepages/SiteHeader";
import LandingHero from "../components/homepages/LandingHero";
import MenuSection from "../components/homepages/MenuSection";
import ReservationBanner from "../components/homepages/ReservationBanner";
import LandingFooter from "../components/homepages/LandingFooter";
import MobileOrderFab from "../components/homepages/MobileOrderFab";

const HomePage = () => {
  return (
    <div className="min-h-dvh bg-background font-body text-on-surface">
      <SiteHeader activeLabel="Thực đơn" showStaffLoginMobile />
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
