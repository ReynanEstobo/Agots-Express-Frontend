// Tables.jsx
import React from "react";
import { cn } from "../lib/utils";

export const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="overflow-x-auto">
    <table
      ref={ref}
      className={cn(
        "w-full border border-gray-200 rounded-xl text-sm text-gray-800 bg-white",
        className
      )}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

export const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("text-gray-600 bg-white", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("", className)} {...props} />
));
TableBody.displayName = "TableBody";

export const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-gray-200 last:border-none hover:bg-gray-50/40 transition-colors",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

export const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn("px-6 py-4 font-medium text-gray-600", className)}
    {...props}
  />
));
TableHead.displayName = "TableHead";

export const TableCell = React.forwardRef(
  ({ className, center = false, ...props }, ref) => (
    <td
      ref={ref}
      className={cn("px-6 py-4", center && "text-center", className)}
      {...props}
    />
  )
);
TableCell.displayName = "TableCell";
