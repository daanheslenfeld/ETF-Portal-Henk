import React from "react";

export const Button = React.forwardRef(function Button(
  { className = "", variant = "default", ...props },
  ref
) {
  const base =
    "inline-flex items-center justify-center h-11 px-4 text-sm font-medium rounded-xl transition focus:outline-none focus:ring disabled:opacity-50";
  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-700",
  };
  return (
    <button ref={ref} className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
});
