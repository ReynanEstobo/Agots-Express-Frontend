import { Home, Plus, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CartSheet from "../components/CartSheet";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../hooks/use-toast";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import { Input } from "../ui/Input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";

const menuItems = {
  "Main Course": [
    {
      id: 1,
      name: "Chicken Adobo",
      price: 280,
      description: "Classic Filipino braised chicken in soy sauce and vinegar",
      category: "Main Course",
    },
    {
      id: 2,
      name: "Pork Adobo",
      price: 300,
      description: "Tender pork belly in traditional adobo sauce",
      category: "Main Course",
    },
    {
      id: 3,
      name: "Sinigang na Baboy",
      price: 350,
      description: "Sour pork soup with tamarind and vegetables",
      category: "Main Course",
    },
    {
      id: 4,
      name: "Kare-Kare",
      price: 420,
      description: "Oxtail stew in rich peanut sauce with vegetables",
      category: "Main Course",
    },
  ],
  Appetizer: [
    {
      id: 9,
      name: "Lumpiang Shanghai",
      price: 180,
      description: "Crispy fried spring rolls with ground pork",
      category: "Appetizer",
    },
    {
      id: 10,
      name: "Fresh Lumpia",
      price: 150,
      description: "Fresh vegetables wrapped in crepe with peanut sauce",
      category: "Appetizer",
    },
  ],
  Dessert: [
    {
      id: 16,
      name: "Halo-Halo",
      price: 150,
      description:
        "Mixed shaved ice with sweet beans, fruits, and ube ice cream",
      category: "Dessert",
    },
    {
      id: 17,
      name: "Leche Flan",
      price: 120,
      description: "Creamy caramel custard",
      category: "Dessert",
    },
  ],
  Beverage: [
    {
      id: 20,
      name: "Calamansi Juice",
      price: 80,
      description: "Freshly squeezed Philippine lime juice",
      category: "Beverage",
    },
  ],
  "Combo Meal": [
    {
      id: 23,
      name: "Adobo Combo",
      price: 500,
      description: "Chicken Adobo + Rice + Drink",
      category: "Combo Meal",
    },
  ],
};

const tabs = [
  { key: "Main Course", label: "Main Course" },
  { key: "Dessert", label: "Dessert" },
  { key: "Appetizer", label: "Appetizer" },
  { key: "Beverage", label: "Beverage" },
  { key: "Combo Meal", label: "Combo Meal" },
];

export default function OrderMenu() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Main Course");
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const filteredItems = (items) =>
    items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleAddToCart = (item) => {
    addToCart(item);
    addToast({ description: `${item.name} added to cart` });
  };

  const MenuItemCard = ({ item }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6 space-y-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{item.name}</h3>
            <p className="text-sm text-[#4C4C4C] mb-2">{item.description}</p>
            <Badge className="text-xs bg-[#E5E5E5] text-[#0A1A3F]">
              {item.category}
            </Badge>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold text-[#F2C94C]">
            ₱{item.price}
          </span>
          <Button
            onClick={() => handleAddToCart(item)}
            style={{ backgroundColor: "#F2C94C", color: "#0A1A3F" }}
            className="hover:bg-[#D4B13D] flex items-center gap-2 px-4 py-2 rounded-lg"
          >
            <Plus className="h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#F5F5F5", color: "#0A1A3F" }}
    >
      {/* Header */}
      <header
        className="sticky top-0 border-b border-[#374A6B] z-40"
        style={{ backgroundColor: "#0A1A3F", color: "#FFFFFF" }}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#F2C94C] text-[#0A1A3F]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 64 64"
                className="w-6 h-6 cursor-pointer"
              >
                <path
                  fill="#000000"
                  d="M30.456 20.765c0 2.024-1.844 4.19-4.235 4.19v34.164c0 4.851-6.61 4.851-6.61 0V24.955c-2.328 0-4.355-1.793-4.355-4.479V1.674c0-1.636 2.364-1.698 2.364.064v13.898h1.98V1.61c0-1.503 2.278-1.599 2.278.064v13.963h2.046V1.63c0-1.572 2.21-1.635 2.21.062v13.945h2.013V1.63c0-1.556 2.309-1.617 2.309.062v19.074zm17.633-14.72v53.059c0 4.743-6.624 4.673-6.624 0V38.051h-3.526V6.045c0-7.451 10.151-7.451 10.151 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold">Order Online</h1>
              <p className="text-xs text-[#D4D4D4]">Agot's Restaurant</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/customer-dashboard">
              <Button
                style={{ color: "#FFFFFF" }}
                className="hover:bg-[#17254F] flex items-center gap-2"
              >
                <Home className="h-4 w-4" /> Dashboard
              </Button>
            </Link>
            <CartSheet />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Search */}
        <div className="mb-8 relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4C4C4C]" />
          <Input
            placeholder="Search for dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              backgroundColor: "#FFFFFF",
              color: "#0A1A3F",
              borderColor: "#374A6B",
            }}
            className="pl-12 h-12 text-lg"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-8">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.key} value={tab.key}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.key} value={tab.key}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems(menuItems[tab.key]).map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
