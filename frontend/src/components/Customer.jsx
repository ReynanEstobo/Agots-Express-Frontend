import {
  CheckCircle,
  Mail,
  Phone,
  ShoppingCart,
  Star,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { fetchCustomers, fetchStats, updateCustomer } from "../api/StatsAPI";
import { Button } from "../ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { DashboardHeader } from "../ui/DashboardHeader";
import { DashboardSidebar } from "../ui/DashboardSidebar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { Input } from "../ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Tables";

// Stats card data
const statsCards = [
  {
    title: "Total Customers",
    valueKey: "totalCustomers",
    icon: User,
    iconColor: "bg-blue-400",
  },
  {
    title: "New This Month",
    valueKey: "newCustomersThisMonth",
    icon: CheckCircle,
    iconColor: "bg-yellow-400",
  },
  {
    title: "Active Customers",
    valueKey: "activeCustomers",
    icon: Star,
    iconColor: "bg-green-500",
  },
  {
    title: "Avg Spent",
    valueKey: "avgSpent",
    icon: ShoppingCart,
    iconColor: "bg-orange-400",
  },
];

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    newCustomersThisMonth: 0,
    activeCustomers: 0,
    avgSpent: 0,
  });
  const [loading, setLoading] = useState(false);

  // Fetch customers and stats
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await loadCustomers();
      await loadStats();
      setLoading(false);
    };

    fetchData();

    const intervalId = setInterval(fetchData, 30000); // 30 seconds
    return () => clearInterval(intervalId);
  }, []);

  const loadCustomers = async () => {
    const data = await fetchCustomers();
    setCustomers(data);
  };

  const loadStats = async () => {
    const data = await fetchStats();
    setStats({
      totalCustomers: data.totalCustomers || 0,
      newCustomersThisMonth: data.newCustomersThisMonth || 0,
      activeCustomers: data.activeCustomers || 0,
      avgSpent: data.avgSpent || 0,
    });
  };

  const openModal = (customer) => {
    setSelectedCustomer({ ...customer });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    let payload = { ...selectedCustomer };
    await updateCustomer(selectedCustomer.id, payload);
    await loadCustomers(); // Reload customer list
    closeModal();
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9]">
      <DashboardSidebar />
      <div className="pl-64">
        <DashboardHeader />

        <main className="px-8 py-6 space-y-6">
          <h1 className="text-3xl font-bold text-black mb-4">
            Customers Management
          </h1>
          <p className="text-gray-500 mb-7">View and manage all customers</p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {statsCards.map((card, idx) => {
              const gradientMap = {
                "bg-yellow-400":
                  "bg-gradient-to-br from-yellow-400 to-yellow-300",
                "bg-blue-400": "bg-gradient-to-br from-blue-400 to-blue-300",
                "bg-green-500": "bg-gradient-to-br from-green-500 to-green-400",
                "bg-orange-400":
                  "bg-gradient-to-br from-orange-400 to-orange-300",
              };
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl p-6 relative flex items-start gap-4"
                >
                  <div
                    className={`w-16 h-16 flex items-center justify-center rounded-lg ${
                      gradientMap[card.iconColor]
                    } absolute -top-6 left-5 shadow-lg`}
                  >
                    <card.icon size={28} className="text-white" />
                  </div>
                  <div className="flex-1 pl-20">
                    <p className="text-gray-500 text-sm">{card.title}</p>
                    <p className="text-2xl font-bold mt-1">
                      {card.valueKey === "avgSpent"
                        ? `$${stats[card.valueKey].toFixed(2)}`
                        : stats[card.valueKey]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Customer Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-black">
                All Customers
              </CardTitle>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader className="bg-white">
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-primary flex items-center justify-center rounded-full">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <div className="font-medium">
                              {customer.first_name}
                            </div>
                            <div className="text-xs text-gray-500">
                              ID: {customer.id}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="text-xs">
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3 text-gray-400" />{" "}
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3 text-gray-400" />{" "}
                          {customer.phone}
                        </div>
                      </TableCell>

                      <TableCell>{customer.address || "—"}</TableCell>
                      <TableCell className="text-gray-500">
                        {new Date(customer.created_at).toLocaleDateString()}
                      </TableCell>

                      <TableCell>
                        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              onClick={() => openModal(customer)}
                            >
                              Edit
                            </Button>
                          </DialogTrigger>

                          <DialogContent className="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg z-50">
                            <DialogHeader>
                              <DialogTitle className="text-xl font-semibold text-center">
                                Edit Customer
                              </DialogTitle>
                            </DialogHeader>

                            <DialogClose asChild>
                              <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                                <X className="h-5 w-5" />
                              </button>
                            </DialogClose>

                            <div className="space-y-3 mt-2">
                              <div>
                                <label className="text-sm font-medium text-gray-700">
                                  Name
                                </label>
                                <Input
                                  name="first_name"
                                  value={selectedCustomer?.first_name || ""}
                                  onChange={handleChange}
                                />
                              </div>

                              <div>
                                <label className="text-sm font-medium text-gray-700">
                                  Email
                                </label>
                                <Input
                                  name="email"
                                  value={selectedCustomer?.email || ""}
                                  onChange={handleChange}
                                />
                              </div>

                              <div>
                                <label className="text-sm font-medium text-gray-700">
                                  Address
                                </label>
                                <Input
                                  name="address"
                                  value={selectedCustomer?.address || ""}
                                  onChange={handleChange}
                                />
                              </div>

                              <div>
                                <label className="text-sm font-medium text-gray-700">
                                  Phone
                                </label>
                                <Input
                                  name="phone"
                                  value={selectedCustomer?.phone || ""}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                              <Button variant="secondary" onClick={closeModal}>
                                Cancel
                              </Button>
                              <Button onClick={handleSave}>Save</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Customers;
