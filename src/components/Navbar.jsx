import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  /*{ code: 'ru', label: 'Русский', flag: '🇷🇺' },*/
  { code: 'zh', label: '中文', flag: '🇨🇳' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { langCode, setLangCode, t } = useLanguage();

  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const currentLang = LANGUAGES.find((l) => l.code === langCode) || LANGUAGES[0];

  const NAV_GROUPS = useMemo(() => ({
    [t('nav.categories.navigation')]: [
      { label: t('nav.guides'), path: '/guides' },
      { label: t('nav.classes'), path: '/classes' },
      /*{ label: t('nav.rotations'), path: '/rotations' },*/
      { label: t('nav.hub'), path: '/hub' },
    ],
    [t('nav.categories.tools')]: [
      { label: t('nav.calculators'), path: '/calculators' },
      { label: t('nav.starchart'), path: '/starchart' },
      /*{ label: t('nav.archive'), path: '/archive' },*/
    ],
    [t('nav.categories.community')]: [
      { label: t('nav.discord'), href: 'https://discord.com/invite/trovegame' },
      { label: t('nav.trovesaurus'), href: 'https://trovesaurus.com/' },
      { label: t('nav.contributors'), path: '/contribute' },
      /*{ label: t('nav.clubs'), path: '/clubs' },*/
      { label: t('nav.news'), path: '/news' },
    ],
  }), [langCode, t]);

  const goHome = () => {
    setOpen(false);
    setLangOpen(false);
    navigate('/');
  };

  const handleNavigate = (path, href) => {
    setOpen(false);
    setLangOpen(false);
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else if (path) {
      navigate(path);
    }
  };

  const handleSelectLanguage = (lang) => {
    setLangCode(lang.code);
    setLangOpen(false);
  };

  return (
    <nav className="custom-navbar">
      <div className="relative flex items-center justify-between w-[280px] sm:w-[600px]">
        
        {/* LOGO GOMB A LEFORDÍTOTT ALCÍMMEL */}
        <button className="nav-logo flex items-center gap-3 bg-transparent border-none cursor-pointer" onClick={goHome}>
          <span className="diamond" />
          <div className="nav-logo-text text-left">
            <span className="nav-logo-title">Trovepedia</span>
            <span className="nav-logo-sub">{t('nav.logoSub') || "made by community"}</span>
          </div>
        </button>

        {/* JOBB OLDALI GOMBOK */}
        <div className="flex items-center gap-3">
          
          {/* NYELVVÁLASZTÓ GOMB & MENÜ */}
          <div className="relative">
            <button
              onClick={() => {
                setLangOpen((pv) => !pv);
                setOpen(false);
              }}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#131922] border border-[#1f2733] text-xs font-semibold text-[#9aa4b2] hover:text-[#e6edf3] hover:border-[#58a6ff]/40 transition-all cursor-pointer font-['Quicksand']"
            >
              <span>{currentLang.flag}</span>
              <span className="uppercase">{currentLang.code}</span>
              
              <motion.img 
                src="/icons/arrowdown.png" 
                alt="Select language" 
                style={{ width: '10px', height: '10px' }}
                className="object-contain opacity-70 ml-0.5"
                animate={langOpen ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={wrapperVariants}
                  className="absolute top-[calc(100%+8px)] right-0 w-[140px] p-2 bg-[#131922] border border-[#1f2733] rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl z-50 flex flex-col gap-1 text-left"
                >
                  {LANGUAGES.map((lang) => (
                    <motion.button
                      key={lang.code}
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectLanguage(lang)}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold font-['Quicksand'] w-full border-none bg-transparent cursor-pointer transition-colors ${
                        currentLang.code === lang.code
                          ? 'bg-[#58a6ff]/15 text-[#58a6ff]'
                          : 'text-[#9aa4b2] hover:bg-[#1a212c] hover:text-[#e6edf3]'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* DROPDOWN NYÍL GOMB & MENÜ */}
          <div className="relative">
            <button
              onClick={() => {
                setOpen((pv) => !pv);
                setLangOpen(false);
              }}
              className="nav-arrow-trigger"
              aria-label="Toggle navigation menu"
            >
              <motion.img 
                src="/icons/arrowdown.png" 
                alt="Menu" 
                style={{ width: '12px', height: '12px' }}
                className="object-contain opacity-90"
                animate={open ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>

            {/* LEGÖRDÜLŐ MENÜ */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={wrapperVariants}
                  style={{ translateX: "-50%" }}
                  className="absolute top-[calc(100%+12px)] left-1/2 w-[520px] max-w-[90vw] p-5 bg-[#131922] border border-[#1f2733] rounded-[18px] shadow-[0_16px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl z-50 overflow-hidden flex flex-row gap-6 text-left justify-between"
                >
                  {Object.entries(NAV_GROUPS).map(([category, links]) => (
                    <div key={category} className="flex-1 flex flex-col gap-2 min-w-[130px]">
                      
                      <motion.span 
                        variants={itemVariants}
                        className="text-[12px] font-bold tracking-[0.12em] uppercase text-[#e8b84b] font-['Quicksand'] px-2 pb-1 border-b border-[#1f2733] block"
                      >
                        {category}
                      </motion.span>

                      <ul className="flex flex-col gap-1 m-0 p-0 list-none">
                        {links.map(({ label, path, href }) => {
                          const isActive = location.pathname === path;

                          return (
                            <motion.li key={label} variants={itemVariants}>
                              <motion.button
                                whileHover={{ x: 3, scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                onClick={() => handleNavigate(path, href)}
                                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[16px] font-['Quicksand'] transition-colors cursor-pointer border-none bg-transparent ${
                                  isActive
                                    ? 'bg-[#58a6ff]/15 text-[#58a6ff] border border-[#58a6ff]/30'
                                    : 'text-[#9aa4b2] hover:bg-[#1a212c] hover:text-[#e6edf3]'
                                }`}
                              >
                                <span className="truncate">{label}</span>
                                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#58a6ff] shadow-[0_0_8px_#58a6ff] flex-shrink-0 ml-1" />}
                              </motion.button>
                            </motion.li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </nav>
  );
}

const wrapperVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      ease: [0.25, 1, 0.5, 1],
      when: "beforeChildren",
      staggerChildren: 0.01,
    },
  },
  closed: {
    y: -15,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.25, 1, 0.5, 1],
      when: "afterChildren",
      staggerChildren: 0.01,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.1 }
  },
  closed: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.1 }
  },
};