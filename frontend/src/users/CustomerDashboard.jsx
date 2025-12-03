import {
  Calendar,
  Clock,
  LogOut,
  ShoppingBag,
  UtensilsCrossed,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback } from "../ui/Avatar";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { ProvideOrderFeedback } from "../ui/ProvideOrderFeedback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";

import {
  fetchCustomerOrderHistory,
  fetchCustomerOrders,
  fetchCustomerProfile,
  fetchCustomerStats,
  updateCustomerProfile,
} from "../api/CustomerAPI";

import { fetchAnnouncements } from "../api/AnnouncementAPI";

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("recent");
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [stats, setStats] = useState({ totalOrders: 0, totalSpent: 0 });
  const [announcements, setAnnouncements] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // --- Load all data on mount ---
  useEffect(() => {
    const loadData = async () => {
      try {
        const profileRes = await fetchCustomerProfile();
        if (profileRes.success) {
          const { first_name, email, phone, address } = profileRes.data;
          setProfile({ fullName: first_name, email, phone, address });
        }

        const ordersRes = await fetchCustomerOrders();
        if (ordersRes.success) setOrders(ordersRes.data);

        const historyRes = await fetchCustomerOrderHistory();
        if (historyRes.success) setCompletedOrders(historyRes.data);

        const statsRes = await fetchCustomerStats();
        if (statsRes.success) setStats(statsRes.data);

        const announceRes = await fetchAnnouncements();
        if (Array.isArray(announceRes)) setAnnouncements(announceRes);
      } catch (err) {
        console.error("Error loading customer dashboard data:", err);
      }
    };

    loadData();
  }, []);

  // --- Announcement rotation ---
  useEffect(() => {
    const interval = setInterval(() => {
      if (announcements.length > 0) {
        setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [announcements]);

  // --- Profile handlers ---
  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSaveProfile = async () => {
    try {
      const res = await updateCustomerProfile({
        fullName: profile.fullName,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
      });
      if (res.success) {
        alert("Profile updated successfully!");
        setEditModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };

  // --- Helpers ---
  const getTypeColor = (type) => {
    const map = {
      update: "bg-blue-500 text-white",
      promo: "bg-pink-500 text-white",
      alert: "bg-red-500 text-white",
      event: "bg-green-500 text-white",
      info: "bg-purple-500 text-white",
    };
    return map[type] || "bg-gray-300 text-black";
  };

  const getStatusColor = (status) => {
    const map = {
      pending: "bg-yellow-400 text-white",
      preparing: "bg-yellow-400 text-white",
      ready: "bg-blue-500 text-white",
      "on the way": "bg-blue-500 text-white",
      delivered: "bg-green-600 text-white",
    };
    return map[status.toLowerCase()] || "bg-gray-300 text-black";
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1c2540]">
      {/* HEADER */}
      <header className="bg-[#1c2540] text-white border-b border-[#1c254040]">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-yellow-400">
              <UtensilsCrossed className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">Agot's Restaurant</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/order-menu">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-white">
                <UtensilsCrossed className="h-4 w-4 mr-2" /> Order Now
              </Button>
            </Link>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = "/";
              }}
            >
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* WELCOME */}
        <div className="mb-8 flex items-center gap-4">
          <Avatar className="h-16 w-16 bg-[#1c2540]">
            <AvatarFallback className="text-xl text-white">
              {profile.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {profile.fullName || "Customer"}!
            </h1>
            <p className="text-gray-500">Manage your orders and profile</p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Recent Orders</p>
                <p className="text-2xl font-bold">{stats.totalOrders}</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-400/20">
                <ShoppingBag className="h-6 w-6 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Spent</p>
                <p className="text-2xl font-bold">₱{stats.totalSpent}</p>
              </div>
              <div className="p-3 rounded-lg bg-[#3b4a6b1a]">
                <Clock className="h-6 w-6 text-[#3b4a6b]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ANNOUNCEMENTS */}
        {announcements.length > 0 && (
          <div className="mb-8 w-full">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      className={getTypeColor(
                        announcements[currentAnnouncement].type
                      )}
                    >
                      {announcements[currentAnnouncement].type.toUpperCase()}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">
                    {announcements[currentAnnouncement].title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">
                  {announcements[currentAnnouncement].content}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  {formatDate(announcements[currentAnnouncement].date)}
                </div>
                <div className="flex justify-center mt-4 space-x-2">
                  {announcements.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentAnnouncement === index
                          ? "bg-yellow-500"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TABS */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="w-full flex justify-center mb-4">
            <TabsList className="flex gap-8">
              <TabsTrigger value="recent">Recent Order</TabsTrigger>
              <TabsTrigger value="completed">My Orders</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>
          </div>

          {/* RECENT ORDERS */}
          <TabsContent value="recent">
            {orders.length === 0 ? (
              <p className="text-center text-gray-500">No recent orders.</p>
            ) : (
              orders.map((order) => (
                <Card key={order.id} className="mb-4">
                  <CardContent className="p-6 flex justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">
                          #{order.id}
                        </span>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <div>
                        {order.items?.map((item, idx) => (
                          <p key={idx} className="text-gray-700">
                            {item}
                          </p>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />{" "}
                        {formatDate(order.created_at)}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-yellow-500">
                        ₱{order.total_amount}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* COMPLETED ORDERS */}
          <TabsContent value="completed">
            {completedOrders.length === 0 ? (
              <p className="text-center text-gray-500">No completed orders.</p>
            ) : (
              completedOrders.map((order) => (
                <Card key={order.id} className="mb-4">
                  <CardContent className="p-6 flex justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">
                          #{order.id}
                        </span>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <div>
                        {order.items?.map((item, idx) => (
                          <p key={idx} className="text-gray-700">
                            {item}
                          </p>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />{" "}
                        {formatDate(order.completed_at)}
                      </div>
                    </div>
                    <div className="text-right flex flex-col gap-2">
                      <p className="text-2xl font-bold text-yellow-500">
                        ₱{order.total_amount}
                      </p>
                      <ProvideOrderFeedback
                        orderId={order.id}
                        style={{
                          backgroundColor: "#f2c94c",
                          color: "#1c2540",
                          fontWeight: "bold",
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* PROFILE */}
          {/* PROFILE */}
          <TabsContent value="profile">
            <Card className="shadow-md rounded-xl border border-gray-200 p-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-1 block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={profile.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-1 block">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-1 block">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-1 block">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={profile.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    className="bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg shadow-sm"
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerDashboard;
