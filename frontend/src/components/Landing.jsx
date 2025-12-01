import {
  Award,
  ChefHat,
  Clock,
  Mail,
  MapPin,
  Phone,
  Star,
  UtensilsCrossed,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";

const Landing = () => {
  const featuredDishes = [
    {
      name: "Chicken Adobo",
      price: "₱280",
      description: "Classic braised chicken in soy and vinegar",
      image: "🍗",
    },
    {
      name: "Lechon Kawali",
      price: "₱380",
      description: "Crispy deep-fried pork belly",
      image: "🥓",
    },
    {
      name: "Sinigang na Baboy",
      price: "₱350",
      description: "Sour pork soup with tamarind",
      image: "🍲",
    },
    {
      name: "Kare-Kare",
      price: "₱420",
      description: "Oxtail stew in rich peanut sauce",
      image: "🍛",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#0A1A3F]/95 backdrop-blur-sm z-50 border-b border-[#FFFFFF]/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between relative">
            <div className="flex items-center gap-2 z-10">
              <div className="w-10 h-10 rounded-lg bg-[#F2C94C] flex items-center justify-center">
                <UtensilsCrossed className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-[#FFFFFF]">
                Agot's Restaurant
              </span>
            </div>

            {/* Centered Menu Links */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <a
                href="#menu"
                className="text-[#FFFFFF]/80 hover:text-[#FFD966] transition-colors duration-300"
              >
                Menu
              </a>
              <a
                href="#about"
                className="text-[#FFFFFF]/80 hover:text-[#FFD966] transition-colors duration-300"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-[#FFFFFF]/80 hover:text-[#FFD966] transition-colors duration-300"
              >
                Contact
              </a>
            </div>

            <div className="flex items-center gap-3 z-10">
              <Link to="/login">
                <Button className="bg-[#FFD966] text-[#0A1A3F] hover:bg-[#FFF3B0] transition-colors duration-300">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-[#0A1A3F] via-[#0A1A3F] to-[#0A1A3F] text-[#FFFFFF]">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge className="bg-[#FFD966] text-[#0A1A3F] px-4 py-1.5">
              Filipino Cuisine with a Modern Twist
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Experience Authentic Filipino Flavors
            </h1>
            <p className="text-xl text-[#FFFFFF]/80 max-w-2xl mx-auto">
              Since decades ago, Agot's Restaurant has been serving traditional
              Filipino dishes made with locally sourced ingredients and love.
            </p>
            <div className="flex items-center justify-center gap-4 pt-6">
              <Link to="/order">
                <Button className="bg-[#FFD966] text-[#0A1A3F] hover:bg-[#FFF3B0] text-lg px-8 transition-colors duration-300">
                  Order Now
                </Button>
              </Link>
              <a href="#menu">
                <Button className="bg-[#FFD966]/20 text-[#0A1A3F] hover:bg-[#FFF3B0]/40 text-lg px-8 transition-colors duration-300">
                  View Menu
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
              <div className="space-y-1">
                <div className="text-4xl font-bold text-[#FFD966]">40+</div>
                <div className="text-sm text-[#FFFFFF]/70">
                  Years Experience
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-bold text-[#FFD966]">50K+</div>
                <div className="text-sm text-[#FFFFFF]/70">Happy Customers</div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-bold text-[#FFD966]">4.8</div>
                <div className="text-sm text-[#FFFFFF]/70">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section id="menu" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0A1A3F] mb-4">
              Featured Dishes
            </h2>
            <p className="text-xl text-[#9B9B9B]">
              Taste our signature Filipino specialties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDishes.map((dish, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="text-6xl mb-4 text-center">{dish.image}</div>
                  <h3 className="text-xl font-bold text-[#0A1A3F] mb-2">
                    {dish.name}
                  </h3>
                  <p className="text-[#9B9B9B] text-sm mb-4">
                    {dish.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#FFD966]">
                      {dish.price}
                    </span>
                    <Link to="/order-menu">
                      <Button className="bg-[#FFD966] hover:bg-[#FFF3B0] transition-colors duration-300">
                        Order
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/order-menu">
              <Button className="bg-[#FFD966]/20 text-[#0A1A3F] hover:bg-[#FFF3B0]/40 transition-colors duration-300">
                View Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 px-6 bg-[#F5F5F5]/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#0A1A3F] mb-12">
            About Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-tr from-[#FF8A00] to-[#FF3D00] rounded-full flex items-center justify-center mx-auto">
                  <ChefHat className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0A1A3F]">
                  Expert Chefs
                </h3>
                <p className="text-[#333333]">
                  Experienced chefs preparing authentic Filipino recipes passed
                  down through generations
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-tr from-[#4ADE80] to-[#16A34A] rounded-full flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0A1A3F]">
                  Fresh Ingredients
                </h3>
                <p className="text-[#333333]">
                  Only locally sourced, fresh ingredients to ensure quality and
                  authentic flavors
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-tr from-[#FACC15] to-[#F59E0B] rounded-full flex items-center justify-center mx-auto">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0A1A3F]">
                  5-Star Service
                </h3>
                <p className="text-[#333333]">
                  Exceptional service and warm hospitality that makes you feel
                  at home
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#0A1A3F] mb-4">
                Visit Us Today
              </h2>
              <p className="text-xl text-[#9B9B9B]">We'd love to serve you!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#FFD966]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-[#FFD966]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Address</h3>
                      <p className="text-[#9B9B9B]">
                        Palikpikan Street, Balayan, Philippines
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#FFD966]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-[#FFD966]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Phone</h3>
                      <p className="text-[#9B9B9B]">0917 505 8692</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#FFD966]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-[#FFD966]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Email</h3>
                      <p className="text-[#9B9B9B]">
                        agotscatering1977@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#FFD966]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-[#FFD966]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Hours</h3>
                      <p className="text-[#9B9B9B]">
                        Everyday: 08:00 AM - 10:00 PM
                      </p>
                      
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="font-bold text-xl mb-6">Send us a message</h3>
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-lg border border-[#D1D5DB] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#FFD966]"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 rounded-lg border border-[#D1D5DB] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#FFD966]"
                    />
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-[#D1D5DB] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#FFD966] resize-none"
                    />
                    <Button className="w-full bg-[#FFD966] hover:bg-[#FFF3B0] transition-colors duration-300">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A1A3F] text-[#FFFFFF] py-8 px-6">
        <div className="container mx-auto text-center">
          <p className="text-[#FFFFFF]/70">
            &copy; 2024 Agot's Restaurant. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
