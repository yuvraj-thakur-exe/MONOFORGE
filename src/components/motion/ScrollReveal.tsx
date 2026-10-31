'use client';

import React from 'react';
import { motion, MotionProps } from 'framer-motion';

export interface ScrollRevealProps extends MotionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  distance?: number;
}

/**
 * Scroll reveal component that animates elements as they scroll into view.
 */
export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.5,
  className = '',
  direction = 'up',
  distance = 24,
  ...props
}: ScrollRevealProps) {
  const getInitial = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance, x: 0 };
      case 'down':
        return { opacity: 0, y: -distance, x: 0 };
      case 'left':
        return { opacity: 0, x: distance, y: 0 };
      case 'right':
        return { opacity: 0, x: -distance, y: 0 };
      case 'scale':
        return { opacity: 0, scale: 0.95 };
      default:
        return { opacity: 0, y: 0, x: 0 };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case 'scale':
        return { opacity: 1, scale: 1 };
      default:
        return { opacity: 1, x: 0, y: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Smooth spring cubic bezier
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

