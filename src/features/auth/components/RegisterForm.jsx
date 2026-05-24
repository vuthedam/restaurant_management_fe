import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SocialButton from "../../../components/common/SocialButton";
import { getAuthErrorMessage, register } from "../services/authApi";

const INPUT_CLASS =
  "w-full rounded-2xl border border-outline-variant/60 bg-surface-container-low px-4 py-3.5 text-on-surface outline-none transition placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // VALIDATE
  const validateForm = () => {
    const newErrors = {};

    // FULL NAME
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ tên";
    }

    // EMAIL
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    // PASSWORD
    if (!formData.password.trim()) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 8) {
      newErrors.password = "Mật khẩu tối thiểu 8 ký tự";
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = "Mật khẩu phải có ít nhất một chữ số";
    }

    // CONFIRM PASSWORD
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    // TERMS
    if (!formData.terms) {
      newErrors.terms = "Bạn cần đồng ý Điều khoản & Chính sách bảo mật";
    }

    return newErrors;
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      await register(formData);
      navigate("/login");
    } catch (error) {
      setErrors({
        server: getAuthErrorMessage(error, "Đăng ký thất bại. Vui lòng thử lại."),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* FULL NAME */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-on-surface">
            Họ và tên
          </label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Nguyễn Văn A"
            className={INPUT_CLASS}
          />

          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-on-surface">
            Địa chỉ email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="quanly@nhahang.com"
            className={INPUT_CLASS}
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-on-surface">
            Mật khẩu
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className={INPUT_CLASS}
          />

          <p className="mt-1.5 text-xs text-on-surface-variant/70">
            Tối thiểu 8 ký tự, có ít nhất một chữ số.
          </p>

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-on-surface">
            Xác nhận mật khẩu
          </label>

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className={INPUT_CLASS}
          />

          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* TERMS */}
        <div>
          <div className="flex items-start gap-3">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={formData.terms}
              onChange={handleChange}
              className="mt-0.5 size-4 cursor-pointer rounded border-outline-variant accent-primary"
            />

            <label
              htmlFor="terms"
              className="cursor-pointer text-sm text-on-surface-variant"
            >
              Tôi đồng ý với{" "}
              <a
                href="#"
                className="font-semibold text-primary hover:underline"
              >
                Điều khoản dịch vụ
              </a>{" "}
              và{" "}
              <a
                href="#"
                className="font-semibold text-primary hover:underline"
              >
                Chính sách bảo mật
              </a>
            </label>
          </div>

          {errors.terms && (
            <p className="mt-1 text-sm text-red-500">{errors.terms}</p>
          )}
        </div>

        {/* SERVER ERROR */}
        {errors.server && (
          <div className="rounded-xl bg-red-100 px-4 py-3 text-sm text-red-600">
            {errors.server}
          </div>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-primary py-3.5 text-base font-semibold text-on-primary shadow-md shadow-primary/25 transition hover:bg-primary-container hover:shadow-lg hover:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
        </button>
      </form>

      <div className="relative my-10">
        <div className="border-t border-outline-variant/40" />

        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-4 text-xs font-medium uppercase tracking-wide text-on-surface-variant/70">
          hoặc tiếp tục với
        </span>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-4">
        <SocialButton title="Google" />
        <SocialButton title="SSO" />
      </div>

      <div className="text-center">
        <p className="text-sm text-on-surface-variant">
          Đã có tài khoản?{" "}
          <Link to="/login" className="font-bold text-primary hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </>
  );
};

export default RegisterForm;
