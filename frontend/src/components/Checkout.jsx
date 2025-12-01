import { CreditCard, UtensilsCrossed, Wallet } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../hooks/use-toast";
import { Button } from "../ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { RadioGroup, RadioGroupItem } from "../ui/Radio-group";
import { Separator } from "../ui/Separator";
import { Textarea } from "../ui/Textarea";

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const finalTotal = total; // No delivery fee since order type is removed

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    addToast({
      title: "Order placed successfully!",
      description: `Your order #${Math.floor(
        Math.random() * 10000
      )} has been confirmed.`,
    });
    clearCart();
    navigate("/customer-dashboard");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <UtensilsCrossed className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">
              Add some items to your cart before checking out
            </p>
            <Link to="/order">
              <Button className="bg-[hsl(var(--accent))] text-[hsl(var(--primary))] py-2 px-4">
                Browse Menu
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-[hsl(var(--primary))] text-white border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-[hsl(var(--accent))] flex items-center justify-center">
              <UtensilsCrossed className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Checkout</h1>
              <p className="text-xs text-white/70">Complete your order</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1280px] mx-auto px-6 py-8">
        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+63 912 345 6789"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input id="address" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input id="city" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postal">Postal Code</Label>
                      <Input id="postal" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deliveryInstructions">
                      Delivery Instructions
                    </Label>
                    <Textarea
                      id="deliveryInstructions"
                      placeholder="Any special instructions for the delivery rider..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <div className="flex items-center space-x-2 p-4 border border-gray-300 rounded-lg cursor-pointer mb-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label
                        htmlFor="cash"
                        className="flex items-center gap-2 flex-1 cursor-pointer"
                      >
                        <Wallet className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-semibold">Cash on Delivery</div>
                          <div className="text-sm text-gray-400">
                            Pay when you receive your order
                          </div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border border-gray-300 rounded-lg cursor-pointer">
                      <RadioGroupItem value="card" id="card" />
                      <Label
                        htmlFor="card"
                        className="flex items-center gap-2 flex-1 cursor-pointer"
                      >
                        <CreditCard className="h-5 w-5 text-[hsl(var(--accent))]" />
                        <div>
                          <div className="font-semibold">Credit/Debit Card</div>
                          <div className="text-sm text-gray-400">
                            Pay securely online
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="flex-1">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-semibold">
                          ₱{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₱{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-[hsl(var(--accent))]">
                      ₱{finalTotal.toFixed(2)}
                    </span>
                  </div>

                  <Button className="w-full bg-[hsl(var(--accent))] text-[hsl(var(--primary))] py-3 text-base">
                    Place Order
                  </Button>

                  <p className="text-xs text-gray-400 text-center">
                    By placing your order, you agree to our terms and conditions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
