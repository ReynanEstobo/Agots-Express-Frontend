import axios from "axios";

const API_URL = "http://localhost:5000/api/menu";

// Generic API request handler
const apiRequest = async (method, url, data = null, headers = {}) => {
  try {
    const config = { method, url, data, headers };
    const response = await axios(config);
    return response.data;
  } catch (err) {
    console.error(
      `API Error (${method} ${url}):`,
      err.response ? err.response.data : err.message
    );
    throw new Error(
      err.response ? err.response.data.message : "An error occurred"
    );
  }
};

// Fetch all menu items
export const fetchMenuItems = async () => apiRequest("GET", API_URL);

// Create a new menu item (with FormData for image upload)
export const createMenuItem = async (menuItemFormData) => {
  if (!menuItemFormData.get("name") || !menuItemFormData.get("price") || !menuItemFormData.get("group")) {
    throw new Error("Name, price, and group are required fields.");
  }

  const headers = { "Content-Type": "multipart/form-data" };
  return apiRequest("POST", API_URL, menuItemFormData, headers);
};

// Update a menu item (with FormData for image upload)
export const updateMenuItem = async (id, menuItemFormData) => {
  if (!menuItemFormData.get("name") || !menuItemFormData.get("price") || !menuItemFormData.get("group")) {
    throw new Error("Name, price, and group are required fields.");
  }

  const headers = { "Content-Type": "multipart/form-data" };
  return apiRequest("PUT", `${API_URL}/${id}`, menuItemFormData, headers);
};

// Delete a menu item
export const deleteMenuItem = async (id) =>
  apiRequest("DELETE", `${API_URL}/${id}`);
