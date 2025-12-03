import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// --- Get logged-in customer ID from session ---
const getCustomerId = () => sessionStorage.getItem("user_id");

// ----------------------------
// Profile
// ----------------------------
export const fetchCustomerProfile = async () => {
  const customerId = getCustomerId();
  if (!customerId) throw new Error("No customer session found.");

  const res = await axios.get(`${BASE_URL}/customer/${customerId}`);
  return res.data;
};

export const updateCustomerProfile = async (profileData) => {
  const customerId = getCustomerId();
  if (!customerId) throw new Error("No customer session found.");

  const res = await axios.put(`${BASE_URL}/customer/${customerId}`, {
    full_name: profileData.fullName,
    email: profileData.email,
    phone: profileData.phone,
    address: profileData.address,
  });

  return res.data;
};

// ----------------------------
// Orders
// ----------------------------
export const fetchCustomerOrders = async () => {
  const customerId = getCustomerId();
  if (!customerId) throw new Error("No customer session found.");

  const res = await axios.get(`${BASE_URL}/customer/orders/${customerId}`);
  const orders = res.data.data || [];
  orders.forEach((o) => {
    if (!Array.isArray(o.items)) o.items = [];
  });

  return { success: res.data.success, data: orders };
};

export const fetchCustomerOrderHistory = async () => {
  const customerId = getCustomerId();
  if (!customerId) throw new Error("No customer session found.");

  const res = await axios.get(
    `${BASE_URL}/customer/orders/${customerId}/history`
  );
  const orders = res.data.data || [];
  orders.forEach((o) => {
    if (!Array.isArray(o.items)) o.items = [];
  });

  return { success: res.data.success, data: orders };
};

// ----------------------------
// Stats
// ----------------------------
export const fetchCustomerStats = async () => {
  const customerId = getCustomerId();
  if (!customerId) throw new Error("No customer session found.");

  const res = await axios.get(`${BASE_URL}/customer/stats/${customerId}`);
  const stats = res.data.data || { totalOrders: 0, totalSpent: 0 };

  return { success: res.data.success, data: stats };
};

// ----------------------------
// Feedback
// ----------------------------
export const fetchOrderFeedback = async (orderId) => {
  const customerId = getCustomerId();
  if (!customerId) throw new Error("No customer session found.");

  const res = await axios.get(`${BASE_URL}/customer/feedback/${customerId}`, {
    params: { orderId },
  });

  return res.data; // { success: true, data: { rating, comment } }
};

export const submitFeedback = async (orderId, rating, comment) => {
  const customerId = getCustomerId();
  if (!customerId) throw new Error("No customer session found.");

  const res = await axios.post(`${BASE_URL}/customer/feedback/${customerId}`, {
    orderId,
    rating,
    comment,
  });

  return res.data; // { success: true, data: {...}, message: "Feedback submitted successfully" }
};
