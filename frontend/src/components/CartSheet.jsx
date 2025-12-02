import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Separator } from "../ui/Separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/Sheet";
import { Textarea } from "../ui/Textarea";

// HEX equivalents from design system
const colors = {
  accent: "#F2C94C",
  accentHover: "#E6BD47",
  destructive: "#D93025",
  mutedForeground: "#8C8C8C",
};

function CartSheet() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    updateInstructions,
    total,
    itemCount,
    animateCount,
  } = useCart();

  // Local state to trigger slide animation
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className={`relative transition-transform duration-200 ${
            animateCount ? "animate-badge-pulse" : ""
          }`}
          style={{ borderColor: "#d8d8e1", color: "#0A1A3F" }}
        >
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0
                         transition-transform duration-300 transform"
              style={{ backgroundColor: colors.accent, color: "#0A1A3F" }}
            >
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent
        className="w-full sm:max-w-lg overflow-y-auto p-0"
        side="right"
      >
        <div
          className={`transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
        >
          <SheetHeader>
            <SheetTitle style={{ color: "#0A1A3F" }}>
              Your Cart ({itemCount} items)
            </SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <ShoppingCart
                className="h-16 w-16 mb-4"
                style={{ color: colors.mutedForeground }}
              />
              <p
                className="text-lg font-medium mb-2"
                style={{ color: colors.mutedForeground }}
              >
                Your cart is empty
              </p>
              <p
                className="text-sm mb-4"
                style={{ color: colors.mutedForeground }}
              >
                Add some delicious Filipino dishes!
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4 my-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg p-4 space-y-3"
                    style={{ border: "1px solid #d8d8e1" }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4
                          className="font-semibold"
                          style={{ color: "#0A1A3F" }}
                        >
                          {item.name}
                        </h4>
                        <p
                          className="text-sm"
                          style={{ color: colors.mutedForeground }}
                        >
                          {item.category}
                        </p>
                        <p
                          className="text-lg font-bold mt-1"
                          style={{ color: colors.accent }}
                        >
                          ₱{item.price}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2
                          className="h-4 w-4"
                          style={{ color: colors.destructive }}
                        />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus
                          className="h-4 w-4"
                          style={{ color: "#0A1A3F" }}
                        />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value) || 1)
                        }
                        className="w-16 text-center"
                        min="1"
                        style={{ borderColor: "#d8d8e1", color: "#0A1A3F" }}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus
                          className="h-4 w-4"
                          style={{ color: "#0A1A3F" }}
                        />
                      </Button>
                      <span
                        className="ml-auto font-semibold"
                        style={{ color: "#0A1A3F" }}
                      >
                        ₱{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <Textarea
                      placeholder="Special instructions (optional)"
                      value={item.specialInstructions || ""}
                      onChange={(e) =>
                        updateInstructions(item.id, e.target.value)
                      }
                      className="text-sm"
                      rows={2}
                      style={{
                        borderColor: "#d8d8e1",
                        color: "#0A1A3F",
                        backgroundColor: "#FFFFFF",
                      }}
                    />
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div
                  className="flex justify-between text-lg font-semibold"
                  style={{ color: "#0A1A3F" }}
                >
                  <span>Subtotal:</span>
                  <span>₱{total.toFixed(2)}</span>
                </div>
                <div
                  className="flex justify-between text-sm"
                  style={{ color: colors.mutedForeground }}
                >
                  <span>Delivery Fee:</span>
                  <span>Calculated at checkout</span>
                </div>
                <Separator />
                <div
                  className="flex justify-between text-xl font-bold"
                  style={{ color: "#0A1A3F" }}
                >
                  <span>Total:</span>
                  <span style={{ color: colors.accent }}>
                    ₱{total.toFixed(2)}
                  </span>
                </div>

                <Link to="/checkout">
                  <Button
                    className="w-full"
                    size="lg"
                    style={{ backgroundColor: colors.accent, color: "#0A1A3F" }}
                  >
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CartSheet;
