import FAQItem from "./FAQItem";
import { faqData } from "../../data/faqData";

const FAQSection = () => {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Câu Hỏi Thường Gặp</h2>

        <div className="h-1 w-20 bg-primary mx-auto" />
      </div>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <FAQItem key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
