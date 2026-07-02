"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Counts up to the numeric part of `value` when scrolled into view.
 * Preserves any non-numeric prefix/suffix (e.g. "20+", "∞", "4+").
 */
export default function Counter({
  value,
  duration = 1.2,
}: {
  value: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");

  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const prefix = match ? match[1] : "";
  const target = match ? parseInt(match[2], 10) : null;
  const suffix = match ? match[3] : "";

  useEffect(() => {
    if (target === null || !inView) return;

    let raf = 0;
    let start: number | null = null;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const current = Math.round(ease(progress) * target);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, prefix, suffix, value, duration]);

  return <span ref={ref}>{target === null ? value : display}</span>;
}
