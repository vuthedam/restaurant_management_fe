import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SocialButton from "../../../components/common/SocialButton";
import { register } from "../services/authApi";

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
      newErrors.fullName = "Full name is required";
    }

    // EMAIL
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // PASSWORD
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    }

    // CONFIRM PASSWORD
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // TERMS
    if (!formData.terms) {
      newErrors.terms = "You must accept Terms & Privacy Policy";
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
      console.error("Register error:", error?.response?.status, error?.response?.data);
      setErrors({
        server: error?.response?.data?.message || "Registration failed. Please try again.",
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
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className={INPUT_CLASS}
          />

          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-on-surface">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="manager@restaurant.com"
            className={INPUT_CLASS}
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-on-surface">
            Password
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
            Minimum 8 characters with at least one number.
          </p>

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-on-surface">
            Confirm Password
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
              I agree to the{" "}
              <a
                href="#"
                className="font-semibold text-primary hover:underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="font-semibold text-primary hover:underline"
              >
                Privacy Policy
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
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <div className="relative my-10">
        <div className="border-t border-outline-variant/40" />

        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-4 text-xs font-medium uppercase tracking-wide text-on-surface-variant/70">
          or continue with
        </span>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-4">
        <SocialButton title="Google" />
        <SocialButton title="SSO" />
      </div>

      <div className="text-center">
        <p className="text-sm text-on-surface-variant">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
};

export default RegisterForm;
