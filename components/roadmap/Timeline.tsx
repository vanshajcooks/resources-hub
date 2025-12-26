import React from "react";

export default function Timeline({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative pl-6 border-l border-neutral-300 space-y-8">
      {children}
    </div>
  );
}
