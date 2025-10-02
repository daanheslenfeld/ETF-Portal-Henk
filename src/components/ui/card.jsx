import React from "react";

export function Card({ className = "", ...props }) {
  return <div className={`rounded-2xl border bg-white ${className}`} {...props} />;
}
export function CardHeader({ className = "", ...props }) {
  return <div className={`p-6 ${className}`} {...props} />;
}
export function CardContent({ className = "", ...props }) {
  return <div className={`p-6 pt-0 ${className}`} {...props} />;
}
export function CardTitle({ className = "", ...props }) {
  return <h2 className={`font-semibold leading-tight ${className}`} {...props} />;
}
