import axios from "axios";

const API_URL = "http://localhost:5000/landing";

// Fetch landing stats (average rating + total customers)
export const fetchLandingStats = async () => {
  const res = await axios.get(`${API_URL}/stats`);
  return res.data; // { avgRating: 4.8, totalCustomers: 50000 }
};

// Fetch top 4 featured dishes (most selling)
export const fetchFeaturedDishes = async () => {
  const res = await axios.get(`${API_URL}/featured-dishes`);
  return res.data;
  // Returns array of dishes:
  // [
  //   { id, name, price, description, category, group, image, total_sold },
  //   ...
  // ]
};
