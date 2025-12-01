import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastProvider } from "./hooks/use-toast";

import Analytics from "./components/Analytics.jsx";
import Announcements from "./components/Announcement.jsx";
import Customers from "./components/Customer.jsx";
import Feedback from "./components/Feedback.jsx";
import Login from "./components/Login.jsx";
import Menu from "./components/Menu.jsx";
import OrderMenu from "./components/OrderMenu.jsx";
import Orders from "./components/Orders.jsx";

// Dashboards
import AdminDashboard from "./users/AdminDashboard.jsx";
import CustomerDashboard from "./users/CustomerDashboard.jsx";
import RiderDashboard from "./users/RiderDashboard.jsx";
import StaffDashboard from "./users/StaffDashboard.jsx";

// Landing Page
import Landing from "./components/Landing.jsx";

import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Default route → Landing page */}
            <Route path="/" element={<Landing />} />

            {/* Login */}
            <Route path="/login" element={<Login />} />

            {/* Dashboards */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/staff-dashboard" element={<StaffDashboard />} />
            <Route path="/rider-dashboard" element={<RiderDashboard />} />

            {/* Pages */}
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/announcements" element={<Announcements />} />

            {/* Order Menu */}
            <Route path="/order-menu" element={<OrderMenu />} />

            {/* Analytics */}
            <Route path="/analytics" element={<Analytics />} />

            {/* Optional: 404 Not Found */}
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ToastProvider>
  );
}

export default App;
