// src/components/guides/GemsGuideDock.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FloatingDock } from '../ui/floating-dock';

export function GemsGuideDock() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Figyeljük a window-t és a documentRoot-ot is
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      if (currentScroll > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    {
      title: "Gem Tiers",
      icon: <img src="/gemnav/tiers.png" alt="Gem Tiers" className="max-w-full max-h-full object-contain" />,
      href: "#tiers",
    },
    {
      title: "Lesser & Empowered",
      icon: <img src="/gemnav/gemforgemguide.png" alt="Lesser & Empowered" className="max-w-full max-h-full object-contain" />,
      href: "#lesser-empowered",
    },
    {
      title: "Class Gems",
      icon: <img src="/gemnav/classgems.png" alt="Class Gems" className="max-w-full max-h-full object-contain" />,
      href: "#class-gems",
    },
    {
      title: "Gem Structure",
      icon: <img src="/gemnav/collage.png" alt="Gem Structure" className="max-w-full max-h-full object-contain" />,
      href: "#structure",
    },
    {
      title: "Optimal Stats",
      icon: <img src="/gemnav/stats.png" alt="Stats" className="max-w-full max-h-full object-contain" />,
      href: "#stats",
    },
    {
      title: "Leveling",
      icon: <img src="/gemnav/leveling.png" alt="Leveling" className="max-w-full max-h-full object-contain" />,
      href: "#leveling",
    },
    {
      title: "Perfecting",
      icon: <img src="/gemnav/perfecting.png" alt="Perfecting" className="max-w-full max-h-full object-contain" />,
      href: "#perfecting",
    },
    {
      title: "Gem Builds",
      icon: <img src="/gemnav/gembuild.png" alt="Gem Builds" className="max-w-full max-h-full object-contain" />,
      href: "#gem-builds",
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      /* A Framer Motion közvetlenül vezérli az opacitást görgetéskor és egér fölé vitelkor */
      animate={{ 
        opacity: isScrolled ? 0.35 : 1, 
        y: 0 
      }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{
        position: 'fixed',
        top: '140px',
        left: '0',
        right: '0',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 'fit-content',
        zIndex: 50,
      }}
    >
      <FloatingDock items={links} />
    </motion.div>
  );
}