import axios from "axios";

// ======================
// DASHBOARD API
// ======================

export const fetchStats = async () => {
  try {
    const res = await axios.get("http://localhost:5000/dashboard/stats");
    return res.data;
  } catch (err) {
    console.error("Failed to fetch stats:", err);
    return {
      totalOrders: 0,
      totalOrdersPrevious: 0,
      totalCustomers: 0,
      totalCustomersPrevious: 0,
      todayRevenue: 0,
      revenuePrevious: 0,
      averageFeedback: 0,
      feedbackPrevious: 0,
    };
  }
};

export const fetchRecentOrders = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/dashboard/recent-orders"
    );
    return res.data || [];
  } catch {
    return [];
  }
};

export const fetchAllOrders = async () => {
  try {
    const res = await axios.get("http://localhost:5000/dashboard/orders");
    return res.data || [];
  } catch {
    return [];
  }
};

// ======================
// CUSTOMERS API
// ======================

export const fetchCustomers = async () => {
  try {
    const res = await axios.get("http://localhost:5000/dashboard/customers");
    return res.data || [];
  } catch (err) {
    console.error("Failed to fetch customers:", err);
    return [];
  }
};

export const updateCustomer = async (id, payload) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/dashboard/customers/${id}`,
      payload
    );
    return res.data;
  } catch (err) {
    console.error("Failed to update customer:", err);
    throw err;
  }
};
