/**
 * PAGE CONTAINER: ContactPage.jsx
 * TUYẾN ĐƯỜNG (ROUTE): /contact (Trang liên hệ)
 * ĐỊA CHỈ FILE: table-order-ap/src/features/landing/pages/ContactPage.jsx
 *
 * MÔ TẢ:
 * Trang liên hệ của nhà hàng. Cung cấp thông tin địa chỉ, email, số điện thoại,
 * bản đồ chỉ đường, các câu hỏi thường gặp (FAQ) và form gửi tin nhắn phản hồi trực tuyến.
 */

import SiteHeader from "../components/homepages/SiteHeader";
import ContactHero from "../components/contact/ContactHero";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";
import ContactMap from "../components/contact/ContactMap";
import FAQSection from "../components/contact/FAQSection";
import LandingFooter from "../components/homepages/LandingFooter";

const ContactPage = () => {
  return (
    <div className="min-h-dvh bg-background font-body text-on-surface">
      <SiteHeader activeLabel="Liên hệ" />
      <main className="pt-[72px]">
        <ContactHero />

        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <ContactInfo />
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </section>

        <ContactMap />

        <FAQSection />
      </main>
      <LandingFooter />
    </div>
  );
};

export default ContactPage;
