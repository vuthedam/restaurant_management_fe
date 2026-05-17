import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../features/landing/pages/HomePage";
import BookingPage from "../features/landing/pages/BookingPage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import Dashboard from "../features/admin/pages/Dashboard";
import Orders from "../features/admin/pages/Orders";
import Tables from "../features/admin/pages/TableMap";
import Menu from "../features/admin/pages/Menu";
import Reservations from "../features/admin/pages/Reservations";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "../contexts/AuthContext";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/tables" element={<Tables />} />
          <Route path="/admin/menu" element={<Menu />} />
          <Route path="/admin/reservations" element={<Reservations />} />
        </Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
