const ContactMap = () => {
  const address = "128 Culinary Way, Quận 1, TP.HCM";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <section className="w-full h-[450px] relative overflow-hidden">
      <iframe
        title="Bản đồ nhà hàng"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4!2d106.6983!3d10.7769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ2JzM3LjAiTiAxMDbCsDQxJzU0LjAiRQ!5e0!3m2!1svi!2svn!4v1234567890"
        className="w-full h-full border-0 grayscale opacity-80"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 hover:shadow-xl transition"
        >
          <div className="bg-primary p-2 rounded-lg">
            <span className="material-symbols-outlined text-white text-xl">
              restaurant
            </span>
          </div>
          <div>
            <p className="font-bold text-sm">Appetite HQ</p>
            <p className="text-xs text-secondary">Xem chỉ đường →</p>
          </div>
        </a>
      </div>
    </section>
  );
};

export default ContactMap;
