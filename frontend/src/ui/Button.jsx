// Button.jsx
import React from "react";
import { cn } from "../lib/utils";

export const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", children, ...props }, ref) => {
    const variantClass = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
      outline: "border border-gray-300 bg-white hover:bg-gray-50",
      ghost: "hover:bg-gray-100",
      link: "text-blue-600 underline-offset-4 hover:underline",
    };

    const sizeClass = {
      default: "h-10 px-5",
      sm: "h-9 px-3",
      lg: "h-12 px-7",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl text-sm font-medium shadow-sm transition-all",
          variantClass[variant],
          sizeClass[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
