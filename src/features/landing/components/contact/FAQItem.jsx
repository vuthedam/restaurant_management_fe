const FAQItem = ({ item }) => {
  return (
    <div className="bg-surface-container-low p-6 rounded-xl border">
      <h3 className="font-bold mb-2 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">
          {item.icon}
        </span>

        {item.question}
      </h3>

      <p className="text-on-surface-variant">{item.answer}</p>
    </div>
  );
};

export default FAQItem;
