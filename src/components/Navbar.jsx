import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { dashboardContent } from './guides/content/dashboard.content';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
];

function getDailyBuffIcon(buffData) {
  if (!buffData) return '/icons/power.png';
  const weekday = (buffData.weekday || '').toLowerCase();
  const buffName = (buffData.name || '').toLowerCase();

  if (weekday.includes('mon')) return '/icons/pickaxe.png';
  if (weekday.includes('tue')) return '/icons/fish.png';
  if (weekday.includes('wed')) return '/icons/icons8-sparkling-diamond-80.png';
  if (weekday.includes('thu')) return '/icons/quest.png';
  if (weekday.includes('fri')) return '/icons/dragon.png';
  if (weekday.includes('sat')) return '/icons/xp.png';
  if (weekday.includes('sun')) return '/icons/lootbag.png';

  if (buffName.includes('mining') || buffName.includes('gathering')) return '/icons/pickaxe.png';
  if (buffName.includes('fish')) return '/icons/fish.png';
  if (buffName.includes('gem')) return '/icons/icons8-sparkling-diamond-80.png';
  if (buffName.includes('adventure') || buffName.includes('quest')) return '/icons/quest.png';
  if (buffName.includes('dragon')) return '/icons/dragon.png';
  if (buffName.includes('xp') || buffName.includes('experience')) return '/icons/xp.png';
  if (buffName.includes('loot') || buffName.includes('karma')) return '/icons/lootbag.png';

  return '/icons/power.png';
}

function formatClock(unixSeconds) {
  if (!Number.isFinite(unixSeconds)) return '--:--';
  const d = new Date(unixSeconds * 1000);
  return d.toISOString().slice(11, 16);
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

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { langCode, setLangCode, t } = useLanguage();
  const dashT = dashboardContent[langCode] || dashboardContent.en;

  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  // Status Bar adatok
  const [navData, setNavData] = useState(null);
  const [clockOffset, setClockOffset] = useState(0);
  const [navTick, setNavTick] = useState(() => Math.floor(Date.now() / 1000));

  useEffect(() => {
    let cancelled = false;

    async function fetchStatus() {
      try {
        const res = await fetch('https://trove.aallyn.net/api/v1/meta').then((r) => r.json());
        if (cancelled) return;

        const mainJson = res?.data || res;
        if (mainJson) {
          setNavData(mainJson);
          if (Number.isFinite(mainJson?.serverTime?.now_unix)) {
            setClockOffset(mainJson.serverTime.now_unix - Math.floor(Date.now() / 1000));
          }
        }
      } catch (err) {
        // Csendes fallback
      }
    }

    fetchStatus();
    const interval = setInterval(fetchStatus, 60_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  // Óra ketyegés
  useEffect(() => {
    const tick = setInterval(() => {
      setNavTick(Math.floor(Date.now() / 1000) + clockOffset);
    }, 1000);
    return () => clearInterval(tick);
  }, [clockOffset]);

  const currentDaily = navData?.dailyBuffs?.current;
  const currentLang = LANGUAGES.find((l) => l.code === langCode) || LANGUAGES[0];

  const NAV_GROUPS = useMemo(() => ({
    [t('nav.categories.navigation')]: [
      { label: t('nav.guides'), path: '/guides' },
      { label: t('nav.classes'), path: '/classes' },
      { label: t('nav.hub'), path: '/hub' },
    ],
    [t('nav.categories.tools')]: [
      { label: t('nav.calculators'), path: '/calculators' },
      { label: t('nav.starchart'), path: '/starchart' },
    ],
    [t('nav.categories.community')]: [
      { label: t('nav.discord'), href: 'https://discord.com/invite/trovegame' },
      { label: t('nav.trovesaurus'), href: 'https://trovesaurus.com/' },
      { label: t('nav.contributors'), path: '/contribute' },
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
    <nav className="custom-navbar w-full px-4 flex justify-center">
      <div className="relative flex items-center justify-between w-full max-w-[840px]">
        
        {/* 1. LOGO */}
        <button className="nav-logo flex items-center gap-3 bg-transparent border-none cursor-pointer flex-shrink-0" onClick={goHome}>
          <span className="diamond" />
          <div className="nav-logo-text text-left">
            <span className="nav-logo-title">Trovepedia</span>
            <span className="nav-logo-sub">{t('nav.logoSub') || "made by community"}</span>
          </div>
        </button>

        {/* 2. KÖZÉPSŐ LIVE STÁTUSZ PILL (Csak UTC óra + Napi Buff) */}
        <div 
          onClick={() => navigate('/hub')}
          className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#111620]/90 border border-[#1f2733] hover:border-[#58a6ff]/40 transition-all cursor-pointer backdrop-blur-md text-[12px] font-['Quicksand'] font-medium shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          title="Open Hub"
        >
          {/* UTC Óra */}
          <div className="flex items-center gap-1.5 text-[#9aa4b2]">
            <span className="text-[10px] text-[#58a6ff] font-bold">UTC</span>
            <span className="text-[#e6edf3] font-mono text-[11px]">{formatClock(navTick)}</span>
          </div>

          <span className="text-[#2a3648] text-xs">|</span>

          {/* Napi Buff ikonnal és valós névvel */}
          <div className="flex items-center gap-1.5 text-[#e6edf3]">
            <img 
              src={getDailyBuffIcon(currentDaily)} 
              alt="Daily" 
              className="w-4 h-4 object-contain" 
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span className="text-[#f59e0b] font-semibold truncate max-w-[160px]">
              {dashT?.buffNames?.[currentDaily?.name] || currentDaily?.name || 'Loading buff...'}
            </span>
          </div>
        </div>

        {/* 3. JOBB OLDALI GOMBOK */}
        <div className="flex items-center gap-3 flex-shrink-0">
          
          {/* NYELVVÁLASZTÓ */}
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

          {/* MENÜ GOMB */}
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