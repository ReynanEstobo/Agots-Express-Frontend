import { useState, useEffect } from "react";
import { fetchRecentOrders } from "../api/StatsAPI"; // make sure the path is correct

export const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const variants = {
    completed: "bg-green-500 text-white",
    preparing: "bg-orange-500 text-white",
    pending: "bg-gray-100 text-gray-700 border border-gray-300",
    cancelled: "bg-red-500 text-white",
  };

  // Function to fetch orders
  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await fetchRecentOrders();
      setOrders(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders on mount and every 5 seconds
  useEffect(() => {
    loadOrders();
    const interval = setInterval(loadOrders, 5000); // auto-refresh every 5s
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center">
        <h3 className="font-semibold mb-4 text-lg">Recent Orders</h3>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-red-500">
        <h3 className="font-semibold mb-4 text-lg">Recent Orders</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="font-semibold mb-4 text-lg">Recent Orders</h3>
        <p className="text-gray-500">No recent orders found.</p>
      </div>
    );
  }

  const sortedOrders = [...orders].sort((a, b) => b.id - a.id);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="font-semibold mb-4 text-lg">Recent Orders</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-auto bg-white text-gray-800 text-sm border border-gray-200 rounded-xl">
          <thead className="text-gray-600 bg-white">
            <tr>
              <th className="px-6 py-4 text-center">Order ID</th>
              <th className="px-6 py-4 text-center">Customer</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Price</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order, index) => (
              <tr
                key={order.id}
                className={`border-b border-gray-200 last:border-none hover:bg-gray-50/40 transition-colors ${
                  index === 0 ? "bg-green-50/50" : ""
                }`}
              >
                <td className="px-6 py-4 text-center font-bold align-middle">
                  #{order.id}
                </td>
                <td className="px-6 py-4 text-center align-middle">
                  {order.customer_name || "Unknown"}
                </td>
                <td className="px-6 py-4 text-center align-middle">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      variants[order.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status || "pending"}
                  </span>
                </td>
                <td className="px-6 py-4 text-center font-bold text-yellow-600 align-middle">
                  ₱{order.total_amount || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
