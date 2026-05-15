import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SocialButton from "../../../components/common/SocialButton";
import { login } from "../services/authApi";

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear error khi user nhập lại
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // VALIDATE
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
      const { data } = await login(formData);
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/admin/dashboard");
    } catch (error) {
      setErrors({
        server: error.response?.data?.message || "Login failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit}>
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
            className="w-full rounded-2xl border border-outline-variant/60 bg-surface-container-low px-4 py-3.5 text-on-surface outline-none transition placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <div className="mb-2 flex justify-between">
            <label className="text-sm font-semibold text-on-surface">
              Password
            </label>

            <button
              type="button"
              className="text-sm font-medium text-primary transition hover:text-primary-container"
            >
              Forgot password?
            </button>
          </div>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full rounded-2xl border border-outline-variant/60 bg-surface-container-low px-4 py-3.5 text-on-surface outline-none transition placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
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
          {loading ? "Logging in..." : "Login"}
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
          New to the platform?{" "}
          <Link
            to="/register"
            className="font-bold text-primary hover:underline"
          >
            Create a new account
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
