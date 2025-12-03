import {
  Bike,
  CheckCircle2,
  Clock,
  Filter,
  Package,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  assignRiderToOrder,
  fetchActiveOrders,
  fetchDashboardStats,
  updateOrderStatus,
} from "../api/StaffAPI";
import { useToast } from "../hooks/use-toast";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { DashboardHeader } from "../ui/DashboardHeader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { Input } from "../ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Tables";

const StaffDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [orders, setOrders] = useState([]);
  const [availableRiders, setAvailableRiders] = useState([]);
  const [stats, setStats] = useState({
    pending: 0,
    preparing: 0,
    readyForDelivery: 0,
    availableRiders: 0,
  });

  const { addToast } = useToast();
  const userRole = "Staff";

  // ----------------------------
  // Load dashboard data
  // ----------------------------
  const loadDashboardData = async () => {
    try {
      const statData = await fetchDashboardStats();
      setStats(statData);

      const orderData = await fetchActiveOrders();
      setOrders(orderData.orders || []);
      setAvailableRiders(orderData.riders || []);
    } catch (err) {
      addToast({
        title: "Error",
        description: "Failed to load dashboard data",
      });
    }
  };

  useEffect(() => {
    loadDashboardData(); // initial load

    const interval = setInterval(() => {
      loadDashboardData(); // fetch latest data every 5 seconds
    }, 5000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  // ----------------------------
  // Status & priority colors
  // ----------------------------
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-[#F2C94C] text-[#0A1A3F]";
      case "preparing":
        return "bg-[#13A4E9] text-white";
      case "ready":
        return "bg-[#2CC48C] text-white";
      case "assigned":
        return "bg-[#0A1A3F] text-white";
      default:
        return "bg-[#F5F5F5] text-[#0A1A3F]";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-4 border-[#D9464F]";
      case "medium":
        return "border-l-4 border-[#F2C94C]";
      case "low":
        return "border-l-4 border-[#F5F5F5]";
      default:
        return "";
    }
  };

  // ----------------------------
  // Handle status updates
  // ----------------------------
  const handlePrepareOrder = async (orderId) => {
    try {
      await updateOrderStatus(orderId, "preparing");
      addToast({
        title: "Order Updated",
        description: `Order ${orderId} is now preparing`,
      });
      loadDashboardData();
    } catch {
      addToast({
        title: "Error",
        description: `Failed to update order ${orderId}`,
      });
    }
  };

  const handleMarkAsReady = async (orderId) => {
    try {
      await updateOrderStatus(orderId, "ready");
      addToast({
        title: "Order Updated",
        description: `Order ${orderId} is ready for delivery`,
      });
      loadDashboardData();
    } catch {
      addToast({
        title: "Error",
        description: `Failed to mark order ${orderId} as ready`,
      });
    }
  };

  const handleAssignRider = async (orderId, riderId) => {
    try {
      await assignRiderToOrder(orderId, riderId);
      addToast({
        title: "Rider Assigned",
        description: `Order ${orderId} assigned to rider ${riderId}`,
      });

      // REFRESH DATA AFTER SUCCESSFUL ASSIGNMENT
      await loadDashboardData();
    } catch {
      addToast({
        title: "Error",
        description: `Failed to assign rider to order ${orderId}`,
      });
    }
  };

  // ----------------------------
  // Filter orders by status & search
  // ----------------------------
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toString().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex-1 bg-[#F5F5F5] text-[#0A1A3F]">
      <DashboardHeader userRole={userRole} />
      <main className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{userRole} Dashboard</h1>
          <p className="text-[#6B7280]">
            Manage orders and coordinate deliveries
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Clock />}
            title="Pending Orders"
            value={stats.pending}
            color="text-[#F2C94C]"
            desc="Waiting to prepare"
          />
          <StatCard
            icon={<Package />}
            title="In Preparation"
            value={stats.preparing}
            color="text-[#13A4E9]"
            desc="Being prepared"
          />
          <StatCard
            icon={<CheckCircle2 />}
            title="Ready for Delivery"
            value={stats.readyForDelivery}
            color="text-[#2CC48C]"
            desc="Awaiting riders"
          />
          <StatCard
            icon={<Bike />}
            title="Available Riders"
            value={stats.availableRiders}
            color="text-[#F2C94C]"
            desc="Ready to deliver"
          />
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#D1D5DB]"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48 border-[#D1D5DB]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="preparing">Preparing</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Active Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow
                    key={order.id}
                    className={getPriorityColor(order.priority)}
                  >
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {order.items}
                    </TableCell>
                    <TableCell>{order.time}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right flex flex-col justify-center items-end space-y-2">
                      {order.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() => handlePrepareOrder(order.id)}
                          className="bg-[#13A4E9] hover:bg-[#0F8AD1] text-white"
                        >
                          <Package className="h-4 w-4 mr-1" /> Prepare
                        </Button>
                      )}
                      {order.status === "preparing" && (
                        <Button
                          size="sm"
                          onClick={() => handleMarkAsReady(order.id)}
                          className="bg-[#2CC48C] hover:bg-[#28B17F] text-white"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" /> Mark Ready
                        </Button>
                      )}
                      {order.status === "ready" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="bg-[#F2C94C] hover:bg-[#D9B73C] text-[#0A1A3F]">
                              <Bike className="h-4 w-4 mr-1" /> Assign Rider
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Assign Rider to Order {order.id}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                              {availableRiders.length > 0 ? (
                                availableRiders.map((rider) => (
                                  <div
                                    key={rider.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-[#F5F5F5] transition-colors"
                                  >
                                    <div>
                                      <p className="font-medium">
                                        {rider.name}
                                      </p>
                                      <p className="text-sm text-[#6B7280]">
                                        {rider.deliveries} deliveries completed
                                      </p>
                                    </div>
                                    <Button
                                      onClick={() =>
                                        handleAssignRider(order.id, rider.id)
                                      }
                                      className="bg-[#0A1A3F] hover:bg-[#0A1A3F]/90 text-white"
                                    >
                                      Assign
                                    </Button>
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-[#6B7280]">
                                  No available riders at the moment
                                </p>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default StaffDashboard;

// ----------------------------
// Stat Card Component
// ----------------------------
const StatCard = ({ icon, title, value, color, desc }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="pb-3">
      <CardTitle className="text-sm font-medium flex items-center gap-2 text-[#6B7280]">
        {icon} {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className={`text-3xl font-bold ${color}`}>{value}</div>
      <p className="text-xs text-[#6B7280] mt-1">{desc}</p>
    </CardContent>
  </Card>
);
