import { AnimatePresence, motion } from 'framer-motion';
import { Children, cloneElement, useState, useId } from 'react';

export function AnimatedBackground({
  children,
  defaultValue,
  onValueChange,
  className,
  transition,
  enableHover = false,
}) {
  const [activeId, setActiveId] = useState(defaultValue);
  const uniqueId = useId();

  const handleSetActiveId = (id) => {
    setActiveId(id);
    if (onValueChange) {
      onValueChange(id);
    }
  };

  return Children.map(children, (child, index) => {
    if (!child) return null;

    const id = child.props['data-id'];
    const interactionProps = enableHover
      ? {
          onMouseEnter: () => handleSetActiveId(id),
          onMouseLeave: () => handleSetActiveId(null),
        }
      : {
          onClick: () => handleSetActiveId(id),
        };

    return cloneElement(
      child,
      {
        key: index,
        className: `relative inline-flex ${child.props.className || ''}`,
        ...interactionProps,
      },
      <>
        <AnimatePresence>
          {activeId === id && (
            <motion.span
              layoutId={uniqueId}
              className={`absolute inset-0 -z-10 ${className}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
            />
          )}
        </AnimatePresence>
        {child.props.children}
      </>
    );
  });
}