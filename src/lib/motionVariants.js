// Central place for animation timing/easing.
// Tweak values here and every scroll animation in the app updates with it.

export const EASE = [0.2, 0.8, 0.2, 1]; // matches the cubic-bezier already used in the site's CSS

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export const scaleFadeIn = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

// Wrap a grid/list container with this + variants={staggerContainer} initial="hidden"
// whileInView="visible" and each child gets variants={fadeUp}/{scaleFadeIn} for a
// staggered "cards fly in one after another" reveal.
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

// Standard viewport config: animate once, fire a bit before the element is fully on screen.
export const defaultViewport = { once: true, amount: 0.2 };
