"use client";

import { motion } from "framer-motion";

/**
 * A 4-point sparkle/star — gold decorative accent
 * used throughout the dark luxury design.
 */
export default function Sparkle({
  size = 22,
  className = "",
  spin = true,
}: {
  size?: number;
  className?: string;
  spin?: boolean;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`sparkle ${className}`}
      animate={spin ? { rotate: 360 } : undefined}
      transition={spin ? { duration: 22, repeat: Infinity, ease: "linear" } : undefined}
      aria-hidden="true"
    >
      <path d="M12 0c.6 6.3 5.7 11.4 12 12-6.3.6-11.4 5.7-12 12-.6-6.3-5.7-11.4-12-12C6.3 11.4 11.4 6.3 12 0Z" />
    </motion.svg>
  );
}
