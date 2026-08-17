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

  // 🌟 PONTOS ELTOLT GÖRGETÉS FÜGGVÉNY 🌟
  const scrollToSection = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      // 🎯 ITT ÁLLÍTSD BE PIXELBEN, HOGY MENNYIVEL MENJEN FELJEBB A TETEJE!
      // Növeld a számot (pl. 220), ha azt akarod, hogy még feljebb álljon meg!
      const OFFSET = 100; 
      
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - OFFSET;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const links = [
    {
      title: d.anatomy,
      icon: <img src="/gemnav/collage.png" alt={d.anatomy} className="max-w-full max-h-full object-contain" />,
      href: "#anatomy",
      onClick: (e) => scrollToSection(e, "#anatomy")
    },
    {
      title: d.stats,
      icon: <img src="/gemnav/stats.png" alt={d.stats} className="max-w-full max-h-full object-contain" />,
      href: "#optimal",
      onClick: (e) => scrollToSection(e, "#optimal")
    },
    {
      title: d.tiers,
      icon: <img src="/gemnav/tiers.png" alt={d.tiers} className="max-w-full max-h-full object-contain" />,
      href: "#tiers",
      onClick: (e) => scrollToSection(e, "#tiers")
    },
    {
      title: d.lesserEmpowered,
      icon: <img src="/gemnav/gemforgemguide.png" alt={d.lesserEmpowered} className="max-w-full max-h-full object-contain" />,
      href: "#lesser-empowered",
      onClick: (e) => scrollToSection(e, "#lesser-empowered")
    },
    {
      title: d.gemTypes,
      icon: <img src="/gemnav/perspective.png" alt={d.gemTypes} className="max-w-full max-h-full object-contain" />,
      href: "#gem-types",
      onClick: (e) => scrollToSection(e, "#gem-types")
    },
    {
      title: d.classGems,
      icon: <img src="/gemnav/classgems.png" alt={d.classGems} className="max-w-full max-h-full object-contain" />,
      href: "#class-gems",
      onClick: (e) => scrollToSection(e, "#class-gems")
    },
    {
      title: d.leveling,
      icon: <img src="/gemnav/leveling.png" alt={d.leveling} className="max-w-full max-h-full object-contain" />,
      href: "#leveling",
      onClick: (e) => scrollToSection(e, "#leveling")
    },
    {
      title: d.perfecting,
      icon: <img src="/gemnav/perfecting.png" alt={d.perfecting} className="max-w-full max-h-full object-contain" />,
      href: "#perfecting",
      onClick: (e) => scrollToSection(e, "#perfecting")
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