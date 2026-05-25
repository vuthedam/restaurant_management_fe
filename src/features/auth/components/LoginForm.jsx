import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SocialButton from "../../../components/common/SocialButton";
import { useAuth } from "../../../contexts/AuthContext";
import { canAccessPanel } from "../../../config/adminPermissions";
import { getAuthErrorMessage, login } from "../services/authApi";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login: saveAuth } = useAuth();

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
      newErrors.email = "Vui lòng nhập email";
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu tối thiểu 6 ký tự";
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
      const result = await login(formData);
      const payload = result?.data;

      if (!payload?.accessToken) {
        setErrors({ server: "Phản hồi đăng nhập không hợp lệ. Thử lại sau." });
        return;
      }

      if (!canAccessPanel(payload.user?.role)) {
        setErrors({
          server: "Tài khoản không có quyền truy cập cổng quản lý nhà hàng.",
        });
        return;
      }

      saveAuth({
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        user: payload.user,
      });
      navigate("/admin/dashboard");
    } catch (error) {
      setErrors({
        server: getAuthErrorMessage(
          error,
          "Đăng nhập thất bại. Vui lòng thử lại.",
        ),
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
            Địa chỉ email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="quanly@nhahang.com"
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
              Mật khẩu
            </label>

            <button
              type="button"
              className="text-sm font-medium text-primary transition hover:text-primary-container"
            >
              Quên mật khẩu?
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
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
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
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="font-bold text-primary hover:underline"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
