import {
  CheckCircle,
  Mail,
  Phone,
  Search,
  ShoppingCart,
  Star,
  User,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { DashboardHeader } from "../ui/DashboardHeader";
import { DashboardSidebar } from "../ui/DashboardSidebar";
import { Input } from "../ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Tables";

const customers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+63 912 345 6789",
    orders: 24,
    spent: "₱18,450",
    joined: "Jan 2024",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    phone: "+63 923 456 7890",
    orders: 45,
    spent: "₱32,800",
    joined: "Dec 2023",
  },
  {
    id: "3",
    name: "Pedro Cruz",
    email: "pedro.cruz@email.com",
    phone: "+63 934 567 8901",
    orders: 8,
    spent: "₱6,200",
    joined: "Mar 2024",
  },
  {
    id: "4",
    name: "Ana Garcia",
    email: "ana.garcia@email.com",
    phone: "+63 945 678 9012",
    orders: 31,
    spent: "₱25,600",
    joined: "Nov 2023",
  },
  {
    id: "5",
    name: "Juan Reyes",
    email: "juan.reyes@email.com",
    phone: "+63 956 789 0123",
    orders: 15,
    spent: "₱11,900",
    joined: "Feb 2024",
  },
  {
    id: "6",
    name: "Carmen Lopez",
    email: "carmen.lopez@email.com",
    phone: "+63 967 890 1234",
    orders: 52,
    spent: "₱45,300",
    joined: "Oct 2023",
  },
  {
    id: "7",
    name: "Miguel Torres",
    email: "miguel.torres@email.com",
    phone: "+63 978 901 2345",
    orders: 3,
    spent: "₱2,100",
    joined: "May 2024",
  },
  {
    id: "8",
    name: "Sofia Ramos",
    email: "sofia.ramos@email.com",
    phone: "+63 989 012 3456",
    orders: 19,
    spent: "₱14,700",
    joined: "Jan 2024",
  },
];

const Customers = () => {
  const getTierColor = (orders) => {
    if (orders > 40) return "bg-green-600 text-white";
    if (orders > 20) return "bg-blue-600 text-white";
    return "bg-yellow-500 text-white";
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
                Customers Management
              </h1>
              <p className="text-gray-500">View and manage all customers</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Card>
              <CardContent className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-600 flex items-center justify-center rounded-full">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-black">
                    {customers.length}
                  </div>
                  <div className="text-gray-500 text-sm">Total Customers</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-400 flex items-center justify-center rounded-full">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400">
                    {
                      customers.filter(
                        (c) =>
                          new Date(c.joined).getMonth() ===
                          new Date().getMonth()
                      ).length
                    }
                  </div>
                  <div className="text-gray-500 text-sm">New This Month</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-600 flex items-center justify-center rounded-full">
                  <Star className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">
                    {customers.filter((c) => c.orders > 0).length}
                  </div>
                  <div className="text-gray-500 text-sm">Active Customers</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-3">
                <div className="w-6 h-6 bg-yellow-500 flex items-center justify-center rounded-full">
                  <ShoppingCart className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-500">
                    {(
                      customers.reduce(
                        (sum, c) =>
                          sum + parseFloat(c.spent.replace(/[₱,]/g, "")),
                        0
                      ) / customers.length
                    ).toFixed(1)}
                  </div>
                  <div className="text-gray-500 text-sm">Avg Spent</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search customers..."
                className="pl-10 border-gray-300 bg-white"
              />
            </div>
          </div>

          {/* Customers Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-black">
                All Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border border-gray-200 rounded-xl overflow-x-auto">
                <Table>
                  <TableHeader className="bg-white">
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-semibold text-black">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-primary flex items-center justify-center rounded-full">
                              <User className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <div className="font-medium">{customer.name}</div>
                              <div className="text-xs text-gray-500">
                                ID: {customer.id}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs">
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3 text-gray-400" />
                            {customer.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3 text-gray-400" />
                            {customer.phone}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {customer.orders}
                        </TableCell>
                        <TableCell className="text-yellow-600 font-semibold">
                          {customer.spent}
                        </TableCell>
                        <TableCell className="text-gray-500">
                          {customer.joined}
                        </TableCell>
                        <TableCell>
                          <Button size="sm">Edit</Button>
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

export default Customers;
