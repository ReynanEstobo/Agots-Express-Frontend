// Orders.jsx
import { Search, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Badge } from "../ui/Badge";
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

// Demo Orders
const orders = [
  {
    id: "#1234",
    customer: "John Doe",
    items: "Adobo Combo, Sinigang",
    total: "₱850",
    status: "completed",
    time: "2:45 PM",
  },
  {
    id: "#1235",
    customer: "Maria Santos",
    items: "Lechon Kawali, Garlic Rice x2",
    total: "₱450",
    status: "preparing",
    time: "3:10 PM",
  },
  {
    id: "#1236",
    customer: "Pedro Cruz",
    items: "Catering Package A",
    total: "₱15,000",
    status: "pending",
    time: "3:15 PM",
  },
  {
    id: "#1237",
    customer: "Ana Garcia",
    items: "Kare-Kare Set, Halo-Halo",
    total: "₱680",
    status: "completed",
    time: "1:30 PM",
  },
];

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesSearch = order.customer
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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
              <p className="text-gray-500">
                View and manage all restaurant orders
              </p>
            </div>
          </div>

          {/* Stats Cards with Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Card>
              <CardContent className="flex items-center gap-3">
                <ShoppingCart className="text-[#1b2559] w-6 h-6" />
                <div>
                  <div className="text-3xl font-bold text-[#1b2559]">248</div>
                  <div className="text-gray-500 text-sm">Total Today</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-3">
                <ShoppingCart className="text-orange-500 w-6 h-6" />
                <div>
                  <div className="text-3xl font-bold text-orange-500">12</div>
                  <div className="text-gray-500 text-sm">Preparing</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-3">
                <ShoppingCart className="text-yellow-600 w-6 h-6" />
                <div>
                  <div className="text-3xl font-bold text-yellow-600">5</div>
                  <div className="text-gray-500 text-sm">Pending</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-3">
                <ShoppingCart className="text-green-600 w-6 h-6" />
                <div>
                  <div className="text-3xl font-bold text-green-600">231</div>
                  <div className="text-gray-500 text-sm">Completed</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders Section */}
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
                    placeholder="Search orders, customers, menu items..."
                    className="pl-10 border-gray-300 bg-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <Select onValueChange={setStatusFilter} defaultValue="all">
                  <SelectTrigger className="w-full sm:w-[180px] border-gray-300 bg-white">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="preparing">Preparing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Orders Table */}
              <div className="border border-gray-200 rounded-xl overflow-x-auto">
                <Table>
                  <TableHeader className="bg-white">
                    <TableRow>
                      <TableHead className="text-gray-600">Order ID</TableHead>
                      <TableHead className="text-gray-600">Customer</TableHead>
                      <TableHead className="text-gray-600">Items</TableHead>
                      <TableHead className="text-gray-600">Time</TableHead>
                      <TableHead className="text-gray-600">Total</TableHead>
                      <TableHead className="text-gray-600">Status</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-semibold text-[#1b2559]">
                          {order.id}
                        </TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell className="max-w-[220px] truncate">
                          {order.items}
                        </TableCell>
                        <TableCell>{order.time}</TableCell>
                        <TableCell className="font-semibold text-yellow-600">
                          {order.total}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={order.status}>{order.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Orders;
