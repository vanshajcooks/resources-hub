"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";

export default function AnimatedTimeline({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 15%", "end 85%"],
  });

  return (
    <div ref={ref} className="relative">
      {/* Static guide line (base) */}
      <div
        aria-hidden
        className="absolute left-[9px] top-0 h-full w-px bg-neutral-800"
      />

      {/* Progress indicator (subtle, animated) */}
      <motion.div
        aria-hidden
        style={{ scaleY: scrollYProgress }}
        className="absolute left-[9px] top-0 h-full w-px bg-neutral-500 origin-top"
      />

      {/* Timeline content */}
      <div className="relative pl-6">{children}</div>
    </div>
  );
}
