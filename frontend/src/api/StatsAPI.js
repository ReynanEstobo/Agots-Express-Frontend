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
  } catch (err) {
    console.error("Failed to fetch recent orders:", err);
    return [];
  }
};

export const fetchAllOrders = async () => {
  try {
    const res = await axios.get("http://localhost:5000/dashboard/orders");
    return res.data || [];
  } catch (err) {
    console.error("Failed to fetch all orders:", err);
    return [];
  }
};



// ======================
// ORDER ITEMS API
// ======================

export const fetchOrderItems = async (orderId) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/dashboard/order-items/${orderId}`
    );
    return res.data || [];
  } catch (err) {
    console.error("Failed to fetch order items:", err);
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

// ======================
// MENU ITEMS API (NEW) ======================

// Fetch all menu items
export const fetchMenuItems = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/menu");
    return res.data || [];
  } catch (err) {
    console.error("Failed to fetch menu items:", err);
    return [];
  }
};

// Create a new menu item
export const createMenuItem = async (menuItem) => {
  try {
    const res = await axios.post("http://localhost:5000/api/menu", {
      name: menuItem.name,
      category: menuItem.category,
      price: menuItem.price,
      description: menuItem.description,
      group: menuItem.group, // Added `group` field here
    });
    return res.data;
  } catch (err) {
    console.error("Failed to create menu item:", err);
    throw err;
  }
};

// Update a menu item
export const updateMenuItem = async (id, updatedItem) => {
  try {
    const res = await axios.put(`http://localhost:5000/api/menu/${id}`, {
      name: updatedItem.name,
      category: updatedItem.category,
      price: updatedItem.price,
      description: updatedItem.description,
      group: updatedItem.group, // Added `group` field here
    });
    return res.data;
  } catch (err) {
    console.error("Failed to update menu item:", err);
    throw err;
  }
};

// Delete a menu item
export const deleteMenuItem = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:5000/api/menu/${id}`);
    return res.data;
  } catch (err) {
    console.error("Failed to delete menu item:", err);
    throw err;
  }
};
