const SocialButton = ({ title }) => {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2 rounded-2xl border border-outline-variant/60 bg-surface-container-lowest py-3.5 text-sm font-medium text-on-surface transition hover:border-primary/40 hover:bg-surface-container-low"
    >
      <span>{title}</span>
    </button>
  );
};

export default SocialButton;
