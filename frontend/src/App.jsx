import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import AdminDashboard from "./users/AdminDashboard.jsx";
import CustomerDashboard from "./users/CustomerDashboard.jsx";
import Orders from "./ui/Orders.jsx"; // <-- import Orders page
import RiderDashboard from "./users/RiderDashboard.jsx";
import StaffDashboard from "./users/StaffDashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route → Login page */}
        <Route path="/" element={<Login />} />
        {/* Dashboards for each role */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
        <Route path="/rider-dashboard" element={<RiderDashboard />} />
        {/* Orders page */}
        <Route path="/orders" element={<Orders />} /> {/* <-- Add this */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
