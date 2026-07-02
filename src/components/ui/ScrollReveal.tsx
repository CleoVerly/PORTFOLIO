"use client";

import { useRef } from "react";
import { motion, useInView, type Variant } from "framer-motion";

type AnimationDirection = "up" | "down" | "left" | "right" | "scale" | "fade";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: AnimationDirection;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  stagger?: boolean;
  staggerDelay?: number;
}

const getVariants = (direction: AnimationDirection) => {
  const hidden: Record<AnimationDirection, Variant> = {
    up: { opacity: 0, y: 60 },
    down: { opacity: 0, y: -60 },
    left: { opacity: 0, x: -60 },
    right: { opacity: 0, x: 60 },
    scale: { opacity: 0, scale: 0.85 },
    fade: { opacity: 0 },
  };

  const visible: Variant = {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  };

  return { hidden: hidden[direction], visible };
};

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className = "",
  once = true,
  stagger = false,
  staggerDelay = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    margin: "-80px",
  });

  const variants = getVariants(direction);

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: staggerDelay,
            },
          },
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Child wrapper for stagger animations
export function ScrollRevealItem({
  children,
  direction = "up",
  duration = 0.6,
  className = "",
}: {
  children: React.ReactNode;
  direction?: AnimationDirection;
  duration?: number;
  className?: string;
}) {
  const variants = getVariants(direction);

  return (
    <motion.div
      variants={variants}
      transition={{
        duration,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
