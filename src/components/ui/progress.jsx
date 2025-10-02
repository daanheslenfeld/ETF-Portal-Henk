import React from "react";
export function Progress({ value = 0, ...props }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="h-2 w-full rounded-full bg-slate-200" {...props}>
      <div className="h-2 rounded-full bg-slate-900 transition-[width]" style={{ width: `${v}%` }} />
    </div>
  );
}
