import { useState } from "react";

const INPUT_CLASS =
  "w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ tên.";
    if (!formData.email.trim()) newErrors.email = "Vui lòng nhập email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Email không hợp lệ.";
    if (!formData.subject.trim()) newErrors.subject = "Vui lòng nhập chủ đề.";
    if (!formData.message.trim()) newErrors.message = "Vui lòng nhập lời nhắn.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  if (submitted)
    return (
      <div className="bg-white p-10 rounded-xl border shadow-sm flex flex-col items-center justify-center gap-4 min-h-[300px]">
        <span className="material-symbols-outlined text-primary text-6xl">
          check_circle
        </span>
        <h3 className="text-2xl font-bold">Gửi thành công!</h3>
        <p className="text-secondary text-center">
          Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-2 text-primary font-semibold hover:underline"
        >
          Gửi tin nhắn khác
        </button>
      </div>
    );

  return (
    <div className="bg-white p-10 rounded-xl border shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="grid md:grid-cols-2 gap-6">
          <Field label="Họ Và Tên" error={errors.name}>
            <input
              type="text"
              name="name"
              placeholder="Nguyễn Văn A"
              className={INPUT_CLASS}
              value={formData.name}
              onChange={handleChange}
            />
          </Field>

          <Field label="Email" error={errors.email}>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              className={INPUT_CLASS}
              value={formData.email}
              onChange={handleChange}
            />
          </Field>
        </div>

        <Field label="Chủ Đề" error={errors.subject}>
          <input
            type="text"
            name="subject"
            placeholder="Đặt bàn / Phản hồi"
            className={INPUT_CLASS}
            value={formData.subject}
            onChange={handleChange}
          />
        </Field>

        <Field label="Lời Nhắn" error={errors.message}>
          <textarea
            rows="5"
            name="message"
            placeholder="Hãy cho chúng tôi biết yêu cầu của bạn..."
            className={INPUT_CLASS}
            value={formData.message}
            onChange={handleChange}
          />
        </Field>

        <button
          type="submit"
          className="w-full bg-primary py-4 text-white font-bold rounded-lg hover:opacity-90 transition"
        >
          Gửi Tin Nhắn
        </button>
      </form>
    </div>
  );
};

const Field = ({ label, error, children }) => (
  <div>
    <label className="block mb-2 font-semibold">{label}</label>
    {children}
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

export default ContactForm;
