import React from "react";

export default function Timeline({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative space-y-12 pl-8">
      {/* Vertical guide line */}
      <div
        aria-hidden
        className="absolute left-3 top-0 h-full w-px bg-neutral-800"
      />

      {children}
    </div>
  );
}
