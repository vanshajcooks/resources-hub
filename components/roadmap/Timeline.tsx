import React from "react";

export default function Timeline({ children }: { children: React.ReactNode }) {
  return <div className="relative space-y-8">{children}</div>;
}
