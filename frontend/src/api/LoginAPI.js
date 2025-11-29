import axios from "axios";

// Unified login for all roles
export const loginAllRoles = async (username, password) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/users/login",
      { username, password },
      { headers: { "Content-Type": "application/json" } }
    );

    // Return token, role, id, username
    if (res.data.token) {
      return res.data;
    }

    throw new Error("Login failed");
  } catch (err) {
    if (!err.response) {
      throw new Error("Cannot connect to server");
    }
    throw new Error(err.response.data?.message || "Invalid username or password");
  }
};
