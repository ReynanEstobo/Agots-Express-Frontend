// Input.jsx
import React from "react";
import { cn } from "../lib/utils";

export const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      "h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";
