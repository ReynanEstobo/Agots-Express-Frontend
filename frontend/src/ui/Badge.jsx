// Badge.jsx
import React from "react";
import { cn } from "../lib/utils";

export const Badge = React.forwardRef(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      completed: "bg-green-500 text-white",
      preparing: "bg-orange-500 text-white",
      pending: "bg-gray-100 text-gray-700 border border-gray-300",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";
