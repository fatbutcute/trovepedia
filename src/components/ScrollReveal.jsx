import { motion } from 'framer-motion';
import { EASE } from '../lib/motionVariants';

/**
 * Generic "fade + slide in as it enters the viewport" wrapper.
 * Drop any element in here instead of hand-rolling an IntersectionObserver.
 *
 * <ScrollReveal><h2>Heading</h2></ScrollReveal>
 * <ScrollReveal delay={0.1} y={60} as="span">...</ScrollReveal>
 */
export default function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 40,
  duration = 0.6,
  once = true,
  amount = 0.2,
  as = 'div',
  ...props
}) {
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
