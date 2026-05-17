const ContactHero = () => {
  return (
    <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCa6shtl5xqhziTFyVLBAHWaGgJ1dkouNi9DS72Oijdvy60kufvMQsebYNcdmhCGG50CrLLxBDGXY0p2lUDJBLIjWFCOgDMu4_2HC2pYxVpxOXc7OZsdF1gGxRie0nWhdlsEucIlDh4v_z3ibor34LxPPEADuWQgYbewb1p4tCgdCT03pKvE9FFGFW9IOYpbg6ED7vnaBRZnvAerWiEUNC17s7JsGui-14AMlJc1all5CmZY6qZKdmZTCPVMiVQR8_94BIpys-wVA8"
        alt="Restaurant"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl font-bold text-white mb-4">
          Liên Hệ Với Chúng Tôi
        </h1>

        <p className="text-white/90 max-w-2xl mx-auto text-lg">
          Chúng tôi luôn sẵn sàng lắng nghe ý kiến và hỗ trợ bạn.
        </p>
      </div>
    </section>
  );
};

export default ContactHero;
