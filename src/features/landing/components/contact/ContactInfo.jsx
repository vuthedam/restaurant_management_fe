const ContactInfo = () => {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-bold text-primary mb-8">
          Thông Tin Liên Hệ
        </h2>

        <div className="space-y-6">
          <InfoItem
            icon="location_on"
            title="Địa Chỉ"
            value="128 Culinary Way, Quận 1, TP.HCM"
          />
          <InfoItem icon="phone" title="Điện Thoại" value="+84 999 999 999" />
          <InfoItem icon="mail" title="Email" value="hello@appetite.com" />
          <InfoItem icon="schedule" title="Giờ Mở Cửa" value="10:00 – 22:00 hàng ngày" />
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-4">Kết Nối Với Chúng Tôi</h3>

        <div className="flex gap-4">
          <SocialButton label="Facebook" href="https://facebook.com">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </SocialButton>

          <SocialButton label="Instagram" href="https://instagram.com">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
          </SocialButton>

          <SocialButton label="Twitter / X" href="https://twitter.com">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </SocialButton>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, title, value }) => (
  <div className="flex items-start gap-4">
    <span className="material-symbols-outlined text-primary text-3xl">{icon}</span>
    <div>
      <h3 className="font-bold">{title}</h3>
      <p className="text-secondary">{value}</p>
    </div>
  </div>
);

const SocialButton = ({ label, href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary hover:text-white transition"
  >
    {children}
  </a>
);

export default ContactInfo;
