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

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("recent");
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

  const myOrders = [
    {
      id: "#1234",
      date: "2024-12-18",
      items: "Adobo Combo, Sinigang",
      total: "₱850",
      status: "delivered",
    },
    {
      id: "#1189",
      date: "2024-12-15",
      items: "Lechon Kawali, Rice",
      total: "₱450",
      status: "preparing",
    },
    {
      id: "#1145",
      date: "2024-12-10",
      items: "Kare-Kare Set",
      total: "₱680",
      status: "on the way",
    },
  ];

  const totalSpent = "₱1,980";

  const announcements = [
    {
      title: "🎉 Christmas Special",
      content: "20% off for all orders above ₱1000!",
      type: "promo",
      date: "2024-12-01",
    },
    {
      title: "📢 New Menu Alert",
      content: "Try our Cheesy Kare-Kare!",
      type: "update",
      date: "2024-12-05",
    },
    {
      title: "🎁 Referral Bonus",
      content: "Refer a friend and get 100 points added to your account.",
      type: "event",
      date: "2024-12-08",
    },
    {
      title: "⏰ Happy Hour",
      content: "2 PM - 5 PM, enjoy free drinks with any meal!",
      type: "info",
      date: "2024-12-10",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+63 912 345 6789",
    address: "123 Sample Street, Manila, Philippines",
  });

  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const recentOrders = myOrders.filter((o) =>
    ["pending", "preparing", "on the way"].includes(o.status.toLowerCase())
  );
  const completedOrders = myOrders.filter(
    (o) => o.status.toLowerCase() === "delivered"
  );

  const getTypeColor = (type) => {
    switch (type) {
      case "update":
        return "bg-blue-500 text-white";
      case "promo":
        return "bg-pink-500 text-white";
      case "alert":
        return "bg-red-500 text-white";
      case "event":
        return "bg-green-500 text-white";
      case "info":
        return "bg-purple-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
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
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 bg-[#1c2540]">
              <AvatarFallback className="text-xl text-white">JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">Welcome back, John!</h1>
              <p className="text-gray-500">Manage your orders and profile</p>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="text-2xl font-bold">{myOrders.length}</p>
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
                <p className="text-2xl font-bold">{totalSpent}</p>
              </div>
              <div className="p-3 rounded-lg bg-[#3b4a6b1a]">
                <Clock className="h-6 w-6 text-[#3b4a6b]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ANNOUNCEMENT CARD */}
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
            {recentOrders.length === 0 ? (
              <p className="text-center text-gray-500">No recent orders.</p>
            ) : (
              recentOrders.map((order) => (
                <Card key={order.id} className="mb-4">
                  <CardContent className="p-6 flex justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">
                          {order.id}
                        </span>
                        <Badge
                          className="text-white"
                          style={{
                            backgroundColor:
                              order.status === "preparing"
                                ? "#fbc02d"
                                : order.status === "on the way"
                                ? "#1976d2"
                                : "#d32f2f",
                          }}
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-gray-700">{order.items}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" /> {order.date}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-yellow-500">
                        {order.total}
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
                          {order.id}
                        </span>
                        <Badge className="text-white bg-green-600">
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-gray-700">{order.items}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" /> {order.date}
                      </div>
                    </div>
                    <div className="text-right flex flex-col gap-2">
                      <p className="text-2xl font-bold text-yellow-500">
                        {order.total}
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
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={profile.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg"
                      style={{ borderColor: "#dbe0e0", color: "#1c2540" }}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={profile.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg"
                      style={{ borderColor: "#dbe0e0", color: "#1c2540" }}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    style={{ borderColor: "#dbe0e0", color: "#1c2540" }}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    style={{ borderColor: "#dbe0e0", color: "#1c2540" }}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    style={{ borderColor: "#dbe0e0", color: "#1c2540" }}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    className="text-[#1c2540]"
                    style={{ backgroundColor: "#f2c94c" }}
                  >
                    Save
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
