import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "./components/Customer.jsx";
import Login from "./components/Login.jsx";
import Menu from "./components/Menu.jsx"; // <-- import Menu page
import Orders from "./components/Orders.jsx";
import AdminDashboard from "./users/AdminDashboard.jsx";
import CustomerDashboard from "./users/CustomerDashboard.jsx";
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
        {/* Pages */}
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/menu" element={<Menu />} /> {/* <-- Added Menu route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
