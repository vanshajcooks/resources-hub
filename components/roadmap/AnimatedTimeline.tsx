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
    offset: ["start 10%", "end 80%"],
  });

  return (
    <div ref={ref} className="relative">
      {/* Animated vertical progress line */}
      <motion.div
        style={{ scaleY: scrollYProgress }}
        className="absolute left-[9px] top-0 h-full w-[2px] bg-gradient-to-b from-purple-500 to-blue-500 origin-top"
      />

      {/* Timeline content */}
      <div className="relative pl-6">{children}</div>
    </div>
  );
}
