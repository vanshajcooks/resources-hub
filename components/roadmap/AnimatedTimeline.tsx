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
    offset: ["start 20%", "end 80%"],
  });

  return (
    <div ref={ref} className="relative">
      {/* Base line */}
      <div
        aria-hidden
        className="absolute left-[12px] top-0 h-full w-px bg-neutral-800"
      />

      {/* Animated progress line */}
      <motion.div
        aria-hidden
        style={{ scaleY: scrollYProgress }}
        className="absolute left-[12px] top-0 h-full w-px bg-neutral-600 origin-top"
      />

      <div className="relative">{children}</div>
    </div>
  );
}
