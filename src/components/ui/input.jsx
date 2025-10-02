import React from "react";

export const Input = React.forwardRef(function Input({ className = "", ...props }, ref) {
  return (
    <input
      ref={ref}
      className={`w-full border rounded-xl h-11 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring focus:ring-slate-200 ${className}`}
      {...props}
    />
  );
});
