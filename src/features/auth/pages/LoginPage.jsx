/**
 * PAGE CONTAINER: LoginPage.jsx
 * TUYẾN ĐƯỜNG (ROUTE): /login (Đăng nhập hệ thống)
 * ĐỊA CHỈ FILE: table-order-ap/src/features/auth/pages/LoginPage.jsx
 *
 * MÔ TẢ:
 * Trang đăng nhập dành cho quản trị viên và nhân viên nhà hàng (staff/admin).
 * Cho phép nhân viên đăng nhập bằng số điện thoại/email và mật khẩu để quản lý
 * bàn ăn, đơn hàng, hóa đơn và cấu hình hệ thống.
 */

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
