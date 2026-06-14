import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../features/landing/pages/HomePage";
import BookingPage from "../features/landing/pages/BookingPage";
import ContactPage from "../features/landing/pages/ContactPage";
import OrderPage from "../features/order/pages/OrderPage";
import ReviewPage from "../features/order/pages/ReviewPage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import Dashboard from "../features/admin/pages/Dashboard";
import Orders from "../features/admin/pages/Orders";
import Tables from "../features/admin/pages/TableMap";
import TableQrList from "../features/admin/pages/TableQrList";
import Menu from "../features/admin/pages/Menu";
import Reservation from "../features/admin/pages/Reservation";
import Categories from "../features/admin/pages/Categories";
import Customers from "../features/admin/pages/Customers";
import Payments from "../features/admin/pages/Payments";
import ServiceCalls from "../features/admin/pages/ServiceCalls";
import Reviews from "../features/admin/pages/Reviews";
import Users from "../features/admin/pages/Users";
import UserProfile from "../features/admin/pages/UserProfile";
import ActivityLogs from "../features/admin/pages/ActivityLogs";
import Unauthorized from "../features/admin/pages/Unauthorized";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "../contexts/AuthContext";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/review/:tableSessionId" element={<ReviewPage />} />
          <Route path="/review" element={<ReviewPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/profile" element={<UserProfile />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/tables" element={<Tables />} />
            <Route path="/admin/tables/qr" element={<TableQrList />} />
            <Route path="/admin/menu" element={<Menu />} />
            <Route path="/admin/reservations" element={<Reservation />} />
            <Route path="/admin/service-calls" element={<ServiceCalls />} />
            <Route path="/admin/unauthorized" element={<Unauthorized />} />


            <Route element={<ProtectedRoute adminOnly />}>
              <Route path="/admin/categories" element={<Categories />} />
              <Route path="/admin/customers" element={<Customers />} />
              <Route path="/admin/payments" element={<Payments />} />
              <Route path="/admin/reviews" element={<Reviews />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/users/:id" element={<UserProfile />} />
              <Route path="/admin/activity-logs" element={<ActivityLogs />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
