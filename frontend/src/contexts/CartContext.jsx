import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "../hooks/use-toast";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { addToast } = useToast();

  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Animation states
  const [animateCount, setAnimateCount] = useState(false);
  const [animateIcon, setAnimateIcon] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const triggerAnimations = () => {
    setAnimateCount(true);
    setTimeout(() => setAnimateCount(false), 300);
    setAnimateIcon(true);
    setTimeout(() => setAnimateIcon(false), 300);
  };

  const addToCart = (item, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        addToast({
          title: "Updated cart",
          description: `${item.name} quantity updated`,
          playSound: true, // sound only here
        });
        triggerAnimations();
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }

      addToast({
        title: "Added to cart",
        description: `${item.name} added to your cart`,
        playSound: true, // sound only here
      });
      triggerAnimations();
      return [...prev, { ...item, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    addToast({
      title: "Removed from cart",
      description: "Item removed from your cart",
      playSound: false, // no sound for removal
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart");
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
        animateCount,
        animateIcon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
