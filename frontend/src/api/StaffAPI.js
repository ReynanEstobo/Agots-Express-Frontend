import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ----------------------------
// Dashboard Stats
// ----------------------------
export const fetchDashboardStats = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/staff/dashboard/stats`);
    return res.data.success ? res.data.data : null;
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    throw err;
  }
};

// ----------------------------
// Active Orders + Riders
// ----------------------------
export const fetchActiveOrders = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/staff/dashboard/orders`);
    return res.data.success ? res.data.data : null;
  } catch (err) {
    console.error("Error fetching active orders:", err);
    throw err;
  }
};

// ----------------------------
// Update Order Status
// ----------------------------
export const updateOrderStatus = async (orderId, status) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}/staff/orders/${orderId}/status`,
      { status }
    );
    return res.data.success ? res.data : null;
  } catch (err) {
    console.error("Error updating order status:", err);
    throw err;
  }
};

// ----------------------------
// Assign Rider to Order
// ----------------------------
export const assignRiderToOrder = async (orderId, riderId) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}/staff/orders/${orderId}/assign`,
      { riderId }
    );
    return res.data.success ? res.data : null;
  } catch (err) {
    console.error("Error assigning rider:", err);
    throw err;
  }
};