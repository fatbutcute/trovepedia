import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Moves its children up/down at a different speed than the page scrolls,
 * tracked against this element's own position (not global scroll), so it
 * works correctly no matter where on the page it sits.
 *
 * speed: how far it drifts, in px, from when the element enters to when it
 * leaves the viewport. Positive = moves down slower than scroll (classic
 * background parallax). Negative = drifts up (foreground/"lift" feel).
 *
 * <Parallax speed={80} className="gd-hero-bg">
 *   <img src={bgImage} />
 * </Parallax>
 */
export default function Parallax({ children, speed = 60, className, style }) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  return (
    <div ref={ref} className={className} style={{ ...style, overflow: 'hidden' }}>
      <motion.div style={{ y: prefersReducedMotion ? 0 : y, willChange: 'transform' }}>
        {children}
      </motion.div>
    </div>
  );
}
