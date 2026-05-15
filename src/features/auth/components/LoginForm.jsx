import { Link } from "react-router-dom";
import SocialButton from "../../../components/common/SocialButton";

const LoginForm = () => {
  return (
    <>
      <form className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-on-surface">
            Email Address
          </label>

          <input
            type="email"
            placeholder="manager@restaurant.com"
            className="w-full rounded-2xl border border-outline-variant/60 bg-surface-container-low px-4 py-3.5 text-on-surface outline-none transition placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

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
            placeholder="••••••••"
            className="w-full rounded-2xl border border-outline-variant/60 bg-surface-container-low px-4 py-3.5 text-on-surface outline-none transition placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-primary py-3.5 text-base font-semibold text-on-primary shadow-md shadow-primary/25 transition hover:bg-primary-container hover:shadow-lg hover:shadow-primary/30"
        >
          Login
        </button>
      </form>

      <div className="relative my-10">
        <div className="border-t border-outline-variant/40" />

        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-4 text-xs font-medium uppercase tracking-wide text-on-surface-variant/70">
          or continue with
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <SocialButton title="Google" />
        <SocialButton title="SSO" />
      </div>

      <div className="text-center">
        <p className="text-sm text-on-surface-variant">
          New to the platform?{" "}
          <Link to="/register" className="font-bold text-primary hover:underline">
            Create a new account
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
