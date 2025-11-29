import { Coffee, Drumstick, Edit, IceCream, Soup, Trash2 } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import { DashboardHeader } from "../ui/DashboardHeader";
import { DashboardSidebar } from "../ui/DashboardSidebar";
import { Input } from "../ui/Input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";

const menuItems = {
  mains: [
    {
      id: 1,
      name: "Chicken Adobo",
      price: "₱280",
      description: "Classic Filipino braised chicken in soy sauce and vinegar",
      category: "Best Seller",
      stock: "Available",
    },
    {
      id: 2,
      name: "Pork Adobo",
      price: "₱300",
      description: "Tender pork belly in traditional adobo sauce",
      category: "Best Seller",
      stock: "Available",
    },
    {
      id: 3,
      name: "Kare-Kare",
      price: "₱420",
      description: "Oxtail stew in rich peanut sauce with vegetables",
      category: "Specialty",
      stock: "Available",
    },
  ],
  appetizers: [
    {
      id: 4,
      name: "Lumpiang Shanghai",
      price: "₱180",
      description: "Crispy fried spring rolls with ground pork",
      category: "Appetizer",
      stock: "Available",
    },
    {
      id: 5,
      name: "Calamares",
      price: "₱280",
      description: "Crispy fried squid rings with spicy vinegar",
      category: "Appetizer",
      stock: "Available",
    },
  ],
  noodles: [
    {
      id: 6,
      name: "Pancit Canton",
      price: "₱220",
      description: "Stir-fried flour noodles with vegetables and meat",
      category: "Signature",
      stock: "Available",
    },
    {
      id: 7,
      name: "Palabok",
      price: "₱250",
      description: "Rice noodles with shrimp sauce and toppings",
      category: "Specialty",
      stock: "Available",
    },
  ],
  desserts: [
    {
      id: 8,
      name: "Halo-Halo",
      price: "₱150",
      description:
        "Mixed shaved ice with sweet beans, fruits, and ube ice cream",
      category: "Dessert",
      stock: "Available",
    },
    {
      id: 9,
      name: "Leche Flan",
      price: "₱120",
      description: "Creamy caramel custard",
      category: "Dessert",
      stock: "Available",
    },
  ],
  beverages: [
    {
      id: 10,
      name: "Calamansi Juice",
      price: "₱80",
      description: "Freshly squeezed Philippine lime juice",
      category: "Beverage",
      stock: "Available",
    },
    {
      id: 11,
      name: "Buko Juice",
      price: "₱90",
      description: "Fresh young coconut water",
      category: "Beverage",
      stock: "Available",
    },
  ],
};

// Badge colors
const getCategoryColor = (category) => {
  switch (category) {
    case "Best Seller":
      return "bg-yellow-500 text-white";
    case "Specialty":
      return "bg-purple-500 text-white";
    case "Signature":
      return "bg-blue-500 text-white";
    case "Appetizer":
      return "bg-green-500 text-white";
    case "Dessert":
      return "bg-pink-500 text-white";
    case "Beverage":
      return "bg-orange-500 text-white";
    default:
      return "bg-gray-300 text-black";
  }
};

// Badge icons
const getCategoryIcon = (category) => {
  switch (category) {
    case "Best Seller":
      return <Drumstick className="h-4 w-4 text-white" />;
    case "Specialty":
      return <Soup className="h-4 w-4 text-white" />;
    case "Signature":
      return <Coffee className="h-4 w-4 text-white" />;
    case "Appetizer":
      return <Drumstick className="h-4 w-4 text-white" />;
    case "Dessert":
      return <IceCream className="h-4 w-4 text-white" />;
    case "Beverage":
      return <Coffee className="h-4 w-4 text-white" />;
    default:
      return null;
  }
};

// Menu card
const MenuItemCard = ({ item }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="flex justify-between items-start gap-4 p-4">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-black">{item.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{item.description}</p>
        <div className="flex items-center gap-2">
          <Badge
            className={`${getCategoryColor(
              item.category
            )} flex items-center gap-1`}
          >
            {getCategoryIcon(item.category)}
            {item.category}
          </Badge>
          <Badge variant={item.stock === "Available" ? "outline" : "secondary"}>
            {item.stock}
          </Badge>
        </div>
      </div>
      <div className="text-right flex flex-col justify-between">
        <div className="text-xl font-bold text-black mb-2">{item.price}</div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Tab icons
const getTabIcon = (category) => {
  switch (category) {
    case "mains":
      return <Drumstick className="h-4 w-4 mr-1" />;
    case "appetizers":
      return <Soup className="h-4 w-4 mr-1" />;
    case "noodles":
      return <Coffee className="h-4 w-4 mr-1" />;
    case "desserts":
      return <IceCream className="h-4 w-4 mr-1" />;
    case "beverages":
      return <Coffee className="h-4 w-4 mr-1" />;
    default:
      return null;
  }
};

// Full display names for tabs
const tabLabels = {
  mains: "Main Courses",
  appetizers: "Appetizers",
  noodles: "Noodles & Rice",
  desserts: "Desserts",
  beverages: "Beverages",
};

const Menu = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <DashboardSidebar />
      <div className="pl-64">
        <DashboardHeader />
        <main className="px-8 py-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-black">Menu Management</h1>
              <p className="text-gray-500">
                Manage your Filipino cuisine menu items
              </p>
            </div>
            <Button className="bg-accent hover:bg-accent/90">
              Add Menu Item
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Card>
              <CardContent className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-600 flex items-center justify-center rounded-full">
                  <Drumstick className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-black">
                    {Object.values(menuItems).flat().length}
                  </div>
                  <div className="text-gray-500 text-sm">Total Items</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-3">
                <div className="w-6 h-6 bg-yellow-500 flex items-center justify-center rounded-full">
                  <Drumstick className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-500">
                    {menuItems.mains.length}
                  </div>
                  <div className="text-gray-500 text-sm">Main Courses</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-3">
                <div className="w-6 h-6 bg-pink-500 flex items-center justify-center rounded-full">
                  <IceCream className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-500">
                    {menuItems.desserts.length}
                  </div>
                  <div className="text-gray-500 text-sm">Desserts</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-3">
                <div className="w-6 h-6 bg-orange-500 flex items-center justify-center rounded-full">
                  <Coffee className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-500">
                    {menuItems.beverages.length}
                  </div>
                  <div className="text-gray-500 text-sm">Beverages</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Input placeholder="Search menu items..." className="pl-10" />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Edit className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="mains" className="w-full">
            <TabsList className="grid grid-cols-5 gap-2">
              {Object.keys(tabLabels).map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="flex items-center justify-center gap-1"
                >
                  {getTabIcon(cat)} {tabLabels[cat]}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.keys(menuItems).map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {menuItems[category].map((item) => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Menu;
