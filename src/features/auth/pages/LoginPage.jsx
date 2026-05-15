import AuthLayout from "../../../layouts/AuthLayout";
import AuthBanner from "../components/AuthBanner";
import LoginForm from "../components/LoginForm";
import LoginHeader from "../components/LoginHeader";
import Footer from "../../../components/common/Footer";

const LoginPage = () => {
  return (
    <AuthLayout leftSide={<AuthBanner />}>
      <div>
        <LoginHeader />
        <LoginForm />
      </div>

      <Footer />
    </AuthLayout>
  );
};

export default LoginPage;
