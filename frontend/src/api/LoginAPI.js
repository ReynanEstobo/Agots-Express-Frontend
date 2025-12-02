import axios from "axios";

// -------------------- LOGIN --------------------
export const loginAllRoles = async (username, password) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/users/login",
      { username, password },
      { headers: { "Content-Type": "application/json" } }
    );

    // Return token, role, id, username
    if (res.data.token) return res.data;

    throw new Error("Login failed");
  } catch (err) {
    if (!err.response) throw new Error("Cannot connect to server");
    throw new Error(
      err.response.data?.message || "Invalid username or password"
    );
  }
};

// -------------------- SIGNUP --------------------
export const registerCustomer = async ({
  username,
  password,
  first_name,
  email,
  phone,
  address,
}) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/users/register",
      {
        username,
        password,
        role: "customer",
        first_name,
        email,
        phone,
        address,
      },
      { headers: { "Content-Type": "application/json" } }
    );

    return res.data.user; // returns the created user object
  } catch (err) {
    if (!err.response) throw new Error("Cannot connect to server");
    throw new Error(err.response.data?.message || "Signup failed");
  }
};
