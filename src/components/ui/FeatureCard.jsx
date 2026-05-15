const FeatureCard = ({ icon, title, desc }) => {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
      <span className="material-symbols-outlined text-[#ffb59d] mb-2">
        {icon}
      </span>

      <h3 className="uppercase text-sm font-bold tracking-wider text-[#ffb59d] mb-2">
        {title}
      </h3>

      <p className="text-sm opacity-80">{desc}</p>
    </div>
  );
};

export default FeatureCard;
