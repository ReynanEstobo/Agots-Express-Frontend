// Orders.jsx
import axios from "axios";
import { Search, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { DashboardHeader } from "../ui/DashboardHeader";
import { DashboardSidebar } from "../ui/DashboardSidebar";
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

import { fetchAllOrders } from "../api/StatsAPI";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [stats, setStats] = useState({
    totalOrders: 0,
    preparing: 0,
    pending: 0,
    completed: 0,
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedOrderItems, setSelectedOrderItems] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      const data = await fetchAllOrders();
      setOrders(data);

      setStats({
        totalOrders: data.length,
        preparing: data.filter((o) => o.status === "preparing").length,
        pending: data.filter((o) => o.status === "pending").length,
        completed: data.filter((o) => o.status === "completed").length,
      });
    };

    loadOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesSearch =
      order.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toString().includes(search);
    return matchesStatus && matchesSearch;
  });

  const handleViewOrder = async (orderId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/dashboard/order-items/${orderId}`
      );
      setSelectedOrderItems(res.data);
      setSelectedOrderId(orderId);
      setShowModal(true);
    } catch (err) {
      console.error("Failed to fetch order items:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <DashboardSidebar />
      <div className="pl-64">
        <DashboardHeader />

        <main className="px-8 py-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-black">
                Orders Management
              </h1>
              <p className="text-gray-500">View and manage all restaurant orders</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Card>
              <CardContent className="flex items-center gap-3">
                <ShoppingCart className="text-[#1b2559] w-6 h-6" />
                <div>
                  <div className="text-3xl font-bold text-[#1b2559]">
                    {stats.totalOrders}
                  </div>
                  <div className="text-gray-500 text-sm">Total Orders</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-3">
                <ShoppingCart className="text-orange-500 w-6 h-6" />
                <div>
                  <div className="text-3xl font-bold text-orange-500">
                    {stats.preparing}
                  </div>
                  <div className="text-gray-500 text-sm">Preparing</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-3">
                <ShoppingCart className="text-yellow-600 w-6 h-6" />
                <div>
                  <div className="text-3xl font-bold text-yellow-600">
                    {stats.pending}
                  </div>
                  <div className="text-gray-500 text-sm">Pending</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-3">
                <ShoppingCart className="text-green-600 w-6 h-6" />
                <div>
                  <div className="text-3xl font-bold text-green-600">
                    {stats.completed}
                  </div>
                  <div className="text-gray-500 text-sm">Completed</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#1b2559]">
                All Orders
              </CardTitle>
            </CardHeader>

            <CardContent>
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search orders, customers..."
                    className="pl-10 border-gray-300 bg-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <Select defaultValue="all" onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px] border-gray-300 bg-white">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="preparing">Preparing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Table */}
              <div className="border border-gray-200 rounded-xl overflow-x-auto">
                <Table>
                  <TableHeader className="bg-white">
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-semibold text-[#1b2559]">
                          #{order.id}
                        </TableCell>
                        <TableCell>{order.customer_name}</TableCell>
                        <TableCell className="text-yellow-600 font-semibold">
                          ₱{Number(order.total_amount).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant={order.status}>{order.status}</Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(order.created_at).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            onClick={() => handleViewOrder(order.id)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-96 max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">
                Order #{selectedOrderId} Details
              </h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Food</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedOrderItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.food_name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        ₱{Number(item.price).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        ₱{Number(item.total).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-end">
                <Button onClick={() => setShowModal(false)}>Close</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
