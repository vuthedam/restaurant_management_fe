import AuthLayout from "../../../layouts/AuthLayout";
import AuthBanner from "../components/AuthBanner";
import RegisterHeader from "../components/RegisterHeader";
import RegisterForm from "../components/RegisterForm";
import Footer from "../../../components/common/Footer";

const RegisterPage = () => {
  return (
    <AuthLayout leftSide={<AuthBanner />}>
      <div>
        <RegisterHeader />
        <RegisterForm />
      </div>
      <Footer />
    </AuthLayout>
  );
};

export default RegisterPage;
