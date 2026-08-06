import { AnimatePresence, motion } from 'framer-motion';
import { Children, cloneElement, useState, useEffect, useId } from 'react';

export function AnimatedBackground({
  children,
  defaultValue,
  onValueChange,
  className,
  transition,
  enableHover = false,
}) {
  const [activeId, setActiveId] = useState(defaultValue);
  const [hoveredId, setHoveredId] = useState(null);
  const uniqueHoverId = useId();

  // ◄ SZINKRONIZÁCIÓ: Ha kívülről (pl. Footer kattintásra vagy URL váltásra) 
  // megváltozik a defaultValue, azonnal frissítjük a belső activeId-t is!
  useEffect(() => {
    setActiveId(defaultValue);
  }, [defaultValue]);

  const handleSetActiveId = (id) => {
    setActiveId(id);
    if (onValueChange) {
      onValueChange(id);
    }
  };

  return Children.map(children, (child, index) => {
    if (!child) return null;

    const id = child.props['data-id'];
    const isActive = activeId === id;
    const isHovered = hoveredId === id;

    return cloneElement(
      child,
      {
        key: index,
        className: `relative inline-flex ${child.props.className || ''}`,
        onMouseEnter: () => setHoveredId(id),
        onMouseLeave: () => setHoveredId(null),
        onClick: (e) => {
          handleSetActiveId(id);
          if (child.props.onClick) child.props.onClick(e);
        },
      },
      <>
        {/* 1. STABIL AKTÍV NÉGYZET: Csak és kizárólag a jelenleg aktív elemen látható */}
        {isActive && !isHovered && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={`absolute inset-0 -z-10 ${className}`}
          />
        )}

        {/* 2. HOVER NÉGYZET: Egérrávitelnél lágyan csúszkál a menüpontok között */}
        <AnimatePresence>
          {isHovered && (
            <motion.span
              layoutId={uniqueHoverId}
              className={`absolute inset-0 -z-10 ${className}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition || { type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </AnimatePresence>

        {child.props.children}
      </>
    );
  });
}