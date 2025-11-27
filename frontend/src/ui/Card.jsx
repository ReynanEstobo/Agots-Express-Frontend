// Card.jsx
import React from "react";
import { cn } from "../lib/utils";

export const Card = React.forwardRef(
  ({ className, bgColor, ...props }, ref) => {
    const gradientMap = {
      "bg-yellow-400": "bg-gradient-to-br from-yellow-400 to-yellow-300",
      "bg-blue-400": "bg-gradient-to-br from-blue-400 to-blue-300",
      "bg-green-500": "bg-gradient-to-br from-green-500 to-green-400",
      "bg-orange-400": "bg-gradient-to-br from-orange-400 to-orange-300",
      "bg-gray-400": "bg-gradient-to-br from-gray-400 to-gray-300",
    };

    const gradientClass = bgColor
      ? gradientMap[bgColor] || bgColor
      : "bg-white";

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200",
          gradientClass,
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-4", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold text-gray-900", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mt-4", className)} {...props} />
));
CardFooter.displayName = "CardFooter";
