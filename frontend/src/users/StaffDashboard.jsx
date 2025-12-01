// StaffDashboard.jsx
import {
  Bike,
  CheckCircle2,
  Clock,
  Filter,
  Package,
  Search,
} from "lucide-react";
import { useState } from "react";
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

// Mock Data
const mockOrders = [
  {
    id: "ORD-001",
    customer: "Juan Dela Cruz",
    items: "Chicken Adobo, Pancit Canton",
    time: "10 mins ago",
    status: "pending",
    priority: "high",
  },
  {
    id: "ORD-002",
    customer: "Maria Santos",
    items: "Sinigang, Lumpia",
    time: "15 mins ago",
    status: "preparing",
    priority: "medium",
  },
  {
    id: "ORD-003",
    customer: "Pedro Reyes",
    items: "Lechon Kawali, Halo-Halo",
    time: "5 mins ago",
    status: "pending",
    priority: "high",
  },
  {
    id: "ORD-004",
    customer: "Ana Garcia",
    items: "Kare-Kare, Leche Flan",
    time: "20 mins ago",
    status: "preparing",
    priority: "low",
  },
  {
    id: "ORD-005",
    customer: "Jose Lim",
    items: "Sisig, Calamansi Juice",
    time: "2 mins ago",
    status: "ready",
    priority: "high",
  },
];

const mockRiders = [
  { id: "R001", name: "Miguel Santos", status: "available", deliveries: 12 },
  { id: "R002", name: "Carlos Reyes", status: "available", deliveries: 8 },
  { id: "R003", name: "Ramon Cruz", status: "busy", deliveries: 15 },
];

const StaffDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const { addToast } = useToast();

  // Replace this dynamically from auth context or API
  const userRole = "Staff";

  // Status colors
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-[#F2C94C] text-[#0A1A3F]";
      case "preparing":
        return "bg-[#13A4E9] text-[#FFFFFF]";
      case "ready":
        return "bg-[#2CC48C] text-[#FFFFFF]";
      default:
        return "bg-[#F5F5F5] text-[#0A1A3F]";
    }
  };

  // Priority colors
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

  const handlePrepareOrder = (orderId) => {
    addToast({
      title: "Order Updated",
      description: `Order ${orderId} is now being prepared`,
    });
  };

  const handleMarkAsReady = (orderId) => {
    addToast({
      title: "Order Updated",
      description: `Order ${orderId} marked as ready for delivery`,
    });
  };

  const handleAssignRider = (orderId, riderId) => {
    addToast({
      title: "Rider Assigned",
      description: `Order ${orderId} assigned to rider ${riderId}`,
    });
  };

  // Filter orders based on search & status
  const filteredOrders = mockOrders.filter((order) => {
    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Stats counts
  const pendingCount = filteredOrders.filter(
    (o) => o.status === "pending"
  ).length;
  const preparingCount = filteredOrders.filter(
    (o) => o.status === "preparing"
  ).length;
  const readyCount = filteredOrders.filter((o) => o.status === "ready").length;
  const availableRidersCount = mockRiders.filter(
    (r) => r.status === "available"
  ).length;

  return (
    <div className="flex-1 bg-[#F5F5F5] text-[#0A1A3F]">
      {/* Pass userRole to DashboardHeader */}
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
          {/* Pending Orders */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-[#6B7280]">
                <Clock className="h-4 w-4" /> Pending Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#F2C94C]">
                {pendingCount}
              </div>
              <p className="text-xs text-[#6B7280] mt-1">Waiting to prepare</p>
            </CardContent>
          </Card>

          {/* In Preparation */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-[#6B7280]">
                <Package className="h-4 w-4" /> In Preparation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#13A4E9]">
                {preparingCount}
              </div>
              <p className="text-xs text-[#6B7280] mt-1">Being prepared</p>
            </CardContent>
          </Card>

          {/* Ready for Delivery */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-[#6B7280]">
                <CheckCircle2 className="h-4 w-4" /> Ready for Delivery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2CC48C]">
                {readyCount}
              </div>
              <p className="text-xs text-[#6B7280] mt-1">Awaiting riders</p>
            </CardContent>
          </Card>

          {/* Available Riders */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-[#6B7280]">
                <Bike className="h-4 w-4" /> Available Riders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#F2C94C]">
                {availableRidersCount}
              </div>
              <p className="text-xs text-[#6B7280] mt-1">Ready to deliver</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
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
            </div>
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
                      {/* Prepare button for pending orders */}
                      {order.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() => handlePrepareOrder(order.id)}
                          className="bg-[#13A4E9] hover:bg-[#0F8AD1] text-white"
                        >
                          <Package className="h-4 w-4 mr-1" /> Prepare
                        </Button>
                      )}

                      {/* Mark Ready button for preparing orders */}
                      {order.status === "preparing" && (
                        <Button
                          size="sm"
                          onClick={() => handleMarkAsReady(order.id)}
                          className="bg-[#2CC48C] hover:bg-[#28B17F] text-white"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" /> Mark Ready
                        </Button>
                      )}

                      {/* Assign Rider button for ready orders */}
                      {order.status === "ready" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              className="bg-[#F2C94C] hover:bg-[#D9B73C] text-[#0A1A3F]"
                            >
                              <Bike className="h-4 w-4 mr-1" /> Assign Rider
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Assign Rider to {order.id}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                              {mockRiders
                                .filter((r) => r.status === "available")
                                .map((rider) => (
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
                                ))}
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
