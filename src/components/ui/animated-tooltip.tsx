"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export type AnimatedTooltipItem = {
  id: number | string;
  name: string;
  designation: string;
  image: string; // public path or remote url
};

export function AnimatedTooltip({
  items,
  size = 56, // avatar diameter (px)
  gap = 8,   // negative overlap (px)
}: {
  items: AnimatedTooltipItem[];
  size?: number;
  gap?: number;
}) {
  const [hoveredId, setHoveredId] = useState<number | string | null>(null);

  const x = useMotionValue(0);
  const spring = { stiffness: 100, damping: 15 };
  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), spring);
  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), spring);

  // typed mouse-move (no 'any'), robust center calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    x.set(relX - rect.width / 2);
  };

  return (
    <>
      {items.map((item) => {
        const active = hoveredId === item.id;
        return (
          <div
            key={item.id}
            className="group relative"
            style={{ marginRight: -gap }}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            onMouseMove={handleMouseMove}
          >
            <AnimatePresence>
              {active && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { type: "spring", stiffness: 260, damping: 10 },
                  }}
                  exit={{ opacity: 0, y: 20, scale: 0.6 }}
                  style={{ translateX, rotate, whiteSpace: "nowrap" }}
                  className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center rounded-md bg-black px-4 py-2 text-xs shadow-xl"
                >
                  <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                  <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
                  <div className="relative z-30 text-base font-bold text-white">
                    {item.name}
                  </div>
                  <div className="text-xs text-white">{item.designation}</div>
                </motion.div>
              )}
            </AnimatePresence>

            <div
              className="overflow-hidden rounded-full border-2 border-white ring-1 ring-white/10 shadow-md transition duration-500 group-hover:z-30 group-hover:scale-105"
              style={{ width: size, height: size }}
              aria-label={item.name}
            >
              <Image
                src={item.image}
                alt={item.name}
                width={size}
                height={size}
                className="h-full w-full object-cover object-top"
                sizes={`${size}px`}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default AnimatedTooltip;
