import React from "react";

export default function Timeline({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative pl-6 space-y-10">
      {/* Vertical guide line */}
      <div
        aria-hidden
        className="absolute left-2 top-0 h-full w-px bg-neutral-800"
      />

      {/* Timeline items */}
      <div className="space-y-10">{children}</div>
    </div>
  );
}
