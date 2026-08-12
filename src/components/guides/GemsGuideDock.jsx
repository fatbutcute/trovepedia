import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FloatingDock } from '../ui/floating-dock';
import { useLanguage } from '../../context/LanguageContext';
import { gemsGuideContent } from './content/gemsGuide.content';

export function GemsGuideDock() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { langCode } = useLanguage();
  const d = gemsGuideContent[langCode]?.dock || gemsGuideContent.en.dock;

  useEffect(() => {
    const handleScroll = () => {
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
      title: d.tiers,
      icon: <img src="/gemnav/tiers.png" alt={d.tiers} className="max-w-full max-h-full object-contain" />,
      href: "#tiers",
    },
    {
      title: d.lesserEmpowered,
      icon: <img src="/gemnav/gemforgemguide.png" alt={d.lesserEmpowered} className="max-w-full max-h-full object-contain" />,
      href: "#lesser-empowered",
    },
    {
      title: d.classGems,
      icon: <img src="/gemnav/classgems.png" alt={d.classGems} className="max-w-full max-h-full object-contain" />,
      href: "#class-gems",
    },
    {
      title: d.structure,
      icon: <img src="/gemnav/collage.png" alt={d.structure} className="max-w-full max-h-full object-contain" />,
      href: "#structure",
    },
    {
      title: d.stats,
      icon: <img src="/gemnav/stats.png" alt={d.stats} className="max-w-full max-h-full object-contain" />,
      href: "#stats",
    },
    {
      title: d.leveling,
      icon: <img src="/gemnav/leveling.png" alt={d.leveling} className="max-w-full max-h-full object-contain" />,
      href: "#leveling",
    },
    {
      title: d.perfecting,
      icon: <img src="/gemnav/perfecting.png" alt={d.perfecting} className="max-w-full max-h-full object-contain" />,
      href: "#perfecting",
    },
    {
      title: d.builds,
      icon: <img src="/gemnav/gembuild.png" alt={d.builds} className="max-w-full max-h-full object-contain" />,
      href: "#gem-builds",
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
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