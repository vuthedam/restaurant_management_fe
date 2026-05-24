/**
 * PAGE CONTAINER: RegisterPage.jsx
 * TUYẾN ĐƯỜNG (ROUTE): /register (Đăng ký tài khoản mới)
 * ĐỊA CHỈ FILE: table-order-ap/src/features/auth/pages/RegisterPage.jsx
 *
 * MÔ TẢ:
 * Trang đăng ký tài khoản cho nhân viên/quản trị viên mới.
 * Thu thập thông tin họ tên, email, số điện thoại và mật khẩu
 * để gửi yêu cầu đăng ký tài khoản lên máy chủ.
 */

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
