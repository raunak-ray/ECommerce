import { Route, Routes } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import AuthLayout from "./layout/AuthLayout";
import Signup from "./pages/auth/Signup";
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminCategories from "./pages/Admin/AdminCategories";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminSellers from "./pages/Admin/AdminSellers";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/sellers" element={<AdminSellers />} />
      </Route>
    </Routes>
  );
}

export default App;
