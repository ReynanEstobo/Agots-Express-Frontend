import axios from "axios";
import { motion } from "framer-motion";
import { MessageSquare, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { DashboardHeader } from "../ui/DashboardHeader";
import { DashboardSidebar } from "../ui/DashboardSidebar";
import { OrdersChart } from "../ui/OrdersChart";
import { RecentOrders } from "../ui/RecentOrders";
import { SalesChart } from "../ui/SalesChart";
import { StatsCard } from "../ui/StatsCard";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);

  // ------------------------- LOAD DASHBOARD DATA -------------------------
  const loadDashboard = async () => {
    try {
      const statsRes = await axios.get("http://localhost:5000/dashboard/stats");
      setStats(statsRes.data);

      const ordersRes = await axios.get(
        "http://localhost:5000/dashboard/recent-orders"
      );
      const orders = ordersRes.data || [];

      // Fetch items for each order
      const ordersWithItems = await Promise.all(
        orders.map(async (order) => {
          const orderItemsRes = await axios.get(
            `http://localhost:5000/dashboard/order-items/${order.id}`
          );
          order.items = orderItemsRes.data;
          return order;
        })
      );
      setRecentOrders(ordersWithItems);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  // ------------------------- UTILITY FUNCTIONS -------------------------
  const getChangePercent = (current, previous, suffix = "") => {
    current = Number(current || 0);
    previous = Number(previous || 0);

    if (previous === 0) {
      if (current === 0) return "0" + suffix;
      return current > 0 ? "+100" + suffix : "-100" + suffix;
    }

    const percent = ((current - previous) / previous) * 100;
    const sign = percent >= 0 ? "+" : ""; // negative automatically has '-' sign
    return sign + percent.toFixed(1) + suffix;
  };

  const getChangeType = (current, previous) => {
    const percentChange =
      previous === 0
        ? current === 0
          ? 0
          : 100
        : ((current - previous) / previous) * 100;
    return percentChange >= 0 ? "positive" : "negative";
  };

  // ------------------------- RENDER -------------------------
  return (
    <div className="min-h-screen bg-[#F4F6F9]">
      <DashboardSidebar />
      <div className="pl-64 transition-all duration-300">
        <DashboardHeader />
        <motion.main
          key="dashboard-content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="p-6 space-y-6"
        >
          {!stats && (
            <div className="animate-pulse space-y-4">
              <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          )}

          {stats && (
            <>
              <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  Dashboard Overview
                </h1>
                <p className="text-gray-500">
                  Welcome back! Here's what's happening today.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Orders */}
                <StatsCard
                  title="Today's total Orders"
                  value={stats.totalOrders}
                  change={getChangePercent(
                    stats.totalOrders,
                    stats.totalOrdersPrevious,
                    "% from yesterday"
                  )}
                  changeType={getChangeType(
                    stats.totalOrders,
                    stats.totalOrdersPrevious
                  )}
                  icon={ShoppingCart}
                  iconColor="bg-yellow-400"
                />

                {/* Customers */}
                <StatsCard
                  title="Customers"
                  value={stats.totalCustomers}
                  change={getChangePercent(
                    stats.currentWeekCustomers,
                    stats.previousWeekCustomers,
                    "% from last week"
                  )}
                  changeType={getChangeType(
                    stats.currentWeekCustomers,
                    stats.previousWeekCustomers
                  )}
                  icon={Users}
                  iconColor="bg-blue-400"
                />

                {/* Revenue */}
                <StatsCard
                  title="Revenue Today"
                  value={`₱${Number(stats.todayRevenue).toLocaleString()}`}
                  change={getChangePercent(
                    stats.todayRevenue,
                    stats.revenuePrevious,
                    "% from yesterday"
                  )}
                  changeType={getChangeType(
                    stats.todayRevenue,
                    stats.revenuePrevious
                  )}
                  icon={TrendingUp}
                  iconColor="bg-green-500"
                />

                {/* Feedback */}
                <StatsCard
                  title="New Feedback"
                  value={stats.newFeedbackToday}
                  change={`${stats.satisfactionPercentage.toFixed(
                    1
                  )}% satisfaction`}
                  changeType={
                    stats.satisfactionPercentage >= 50 ? "positive" : "negative"
                  }
                  icon={MessageSquare}
                  iconColor="bg-orange-400"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SalesChart />
                <OrdersChart />
              </div>

              <RecentOrders orders={recentOrders} />
            </>
          )}
        </motion.main>
      </div>
    </div>
  );
};

export default AdminDashboard;
