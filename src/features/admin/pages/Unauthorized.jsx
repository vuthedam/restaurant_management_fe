/**
 * PAGE CONTAINER: Unauthorized.jsx
 * TUYẾN ĐƯỜNG (ROUTE): /admin/unauthorized
 * ĐỊA CHỈ FILE: table-order-ap/src/features/admin/pages/Unauthorized.jsx
 *
 * MÔ TẢ:
 * Trang hiển thị khi nhân viên (staff) cố truy cập vào trang chỉ dành cho Admin.
 * Cung cấp nút quay về trang tổng quan.
 */

import { Link } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";

export default function Unauthorized() {
  return (
    <AdminLayout title="Không có quyền">
      <div className="max-w-md mx-auto text-center py-16">
        <span className="material-symbols-outlined text-6xl text-orange-400 mb-4 block">
          lock
        </span>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Trang này dành cho quản trị viên
        </h2>
        <p className="text-gray-500 mb-6">
          Tài khoản nhân viên không được phép truy cập mục này.
        </p>
        <Link
          to="/admin/dashboard"
          className="inline-block bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700"
        >
          Về tổng quan
        </Link>
      </div>
    </AdminLayout>
  );
}
