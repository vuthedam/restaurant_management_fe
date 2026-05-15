import { Link } from "react-router-dom";
import SocialButton from "../../../components/common/SocialButton";

const INPUT_CLASS =
  "w-full rounded-2xl border border-outline-variant/60 bg-surface-container-low px-4 py-3.5 text-on-surface outline-none transition placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20";

const RegisterForm = () => {
  return (
    <>
      <form className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-on-surface">
              First Name
            </label>
            <input
              type="text"
              placeholder="John"
              className={INPUT_CLASS}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-on-surface">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Doe"
              className={INPUT_CLASS}
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-on-surface">
            Email Address
          </label>
          <input
            type="email"
            placeholder="manager@restaurant.com"
            className={INPUT_CLASS}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-on-surface">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className={INPUT_CLASS}
          />
          <p className="mt-1.5 text-xs text-on-surface-variant/70">
            Minimum 8 characters with at least one number.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-on-surface">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className={INPUT_CLASS}
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            id="terms"
            type="checkbox"
            className="mt-0.5 size-4 cursor-pointer rounded border-outline-variant accent-primary"
          />
          <label
            htmlFor="terms"
            className="cursor-pointer text-sm text-on-surface-variant"
          >
            I agree to the{" "}
            <a href="#" className="font-semibold text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="font-semibold text-primary hover:underline">
              Privacy Policy
            </a>
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-primary py-3.5 text-base font-semibold text-on-primary shadow-md shadow-primary/25 transition hover:bg-primary-container hover:shadow-lg hover:shadow-primary/30"
        >
          Create Account
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
