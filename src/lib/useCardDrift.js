import { useRef } from 'react';
import { useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Gives each grid card a tiny vertical drift tied to scroll position, offset
 * per-column so neighbouring cards don't move in lockstep — the same idea as
 * the masonry gallery in the reference video, just dialed way down so it
 * reads as "alive" rather than distracting on a text-heavy card grid.
 *
 * columnIndex: 0, 1, 2... (e.g. index % columnsInRow) — even/odd/third cards
 * drift at slightly different rates so the grid doesn't feel flat.
 */
export function useCardDrift(columnIndex = 0) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // 8px, 16px, 24px... small enough to feel like depth, not motion sickness.
  const range = 8 + (columnIndex % 3) * 8;
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  return { ref, y: prefersReducedMotion ? 0 : y };
}
