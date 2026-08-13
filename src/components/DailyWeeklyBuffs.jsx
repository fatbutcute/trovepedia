import React, { useState, useEffect } from 'react';
import './DailyWeeklyBuffs.css';
import { useLanguage } from '../context/LanguageContext';
import { dailyWeeklyContent } from './guides/content/dailyWeeklyBuffs.content.js';

const dailyColors = {
  1: "#a855f7", // Hétfő - Lila
  2: "#00e5ff", // Kedd - Cián
  3: "#f43f5e", // Szerda - Pink
  4: "#facc15", // Csütörtök - Sárga
  5: "#ef4444", // Péntek - Piros
  6: "#4ade80", // Szombat - Zöld
  0: "#f97316"  // Vasárnap - Narancs
};

const weeklyRotationBase = [
  { id: "invasion", glow: "#a855f7" },
  { id: "starbar", glow: "#f97316" },
  { id: "xp", glow: "#4ade80" },
  { id: "reroll", glow: "#8b5cf6" }
];

export default function DailyWeeklyBuffs() {
  const [now, setNow] = useState(new Date());
  const [isPatron, setIsPatron] = useState(false);

  const { langCode } = useLanguage();
  const c = dailyWeeklyContent[langCode] || dailyWeeklyContent.en;

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Napi Reset szerinti nap kiszámítása (11:00 UTC váltás)
  const getBonusDay = () => {
    return now.getUTCHours() < 11 ? (now.getUTCDay() + 6) % 7 : now.getUTCDay();
  };
  
  const currentBonusDay = getBonusDay();
  const activeDailyColor = dailyColors[currentBonusDay];

  // Heti rotáció kalkulációja
  const getWeeklyBonus = () => {
    const startDate = new Date(Date.UTC(2026, 1, 9, 11, 0, 0)); // 2026 Feb 9, 11:00 UTC bázis
    const msInWeek = 7 * 24 * 60 * 60 * 1000;
    const diff = now.getTime() - startDate.getTime();
    const weeksPassed = Math.floor(diff / msInWeek);
    
    const index = ((weeksPassed % weeklyRotationBase.length) + weeklyRotationBase.length) % weeklyRotationBase.length;
    const currentBase = weeklyRotationBase[index];
    
    const translatedWeekly = c.weeklyRotation[currentBase.id] || dailyWeeklyContent.en.weeklyRotation[currentBase.id];

    const currentWeekStart = new Date(startDate.getTime() + (weeksPassed * msInWeek));
    const currentWeekEnd = new Date(currentWeekStart.getTime() + msInWeek);
    
    return {
      bonus: {
        ...currentBase,
        name: translatedWeekly.name,
        desc: translatedWeekly.desc
      },
      start: currentWeekStart,
      end: currentWeekEnd
    };
  };

  const weeklyData = getWeeklyBonus();

  return (
    <div className="buffs-grid-wrapper">

      {/* DAILY BUFF CARD */}
      <div className="neon-buff-card" style={{ '--buff-glow-color': activeDailyColor }}>
        <div className="neon-card-internal-glow"></div>
        <div className="neon-buff-header">
          <div className="neon-buff-title-group">
            <span className="neon-buff-subtitle">{c.dailySubtitle}</span>
            <h2 className="neon-buff-main-title">{c.dailyBonuses[currentBonusDay]}</h2>
          </div>
          
          {/* Patron Switcher */}
          <div className="buff-patron-toggle">
            <span className="buff-patron-text" style={{ color: isPatron ? '#fbff00' : '#64748b' }}>
              {isPatron ? c.patronOn : c.patronOff}
            </span>
            <label className="buff-switch-label">
              <input type="checkbox" checked={isPatron} onChange={(e) => setIsPatron(e.target.checked)} />
              <span className="buff-switch-slider"></span>
            </label>
          </div>
        </div>
        
        <div className="neon-buff-body">
          <p style={{ 
            color: isPatron ? '#fbff00' : '#dceaff',
            transition: 'color 0.3s ease'
          }}>
            {isPatron ? c.patronDesc[currentBonusDay] : c.dailyDesc[currentBonusDay]}
          </p>
        </div>
      </div>

      {/* WEEKLY EVENT CARD */}
      <div className="neon-buff-card" style={{ '--buff-glow-color': weeklyData.bonus.glow }}>
        <div className="neon-card-internal-glow"></div>
        <div className="neon-buff-header">
          <div className="neon-buff-title-group">
            <span className="neon-buff-subtitle">{c.weeklySubtitle}</span>
            <h2 className="neon-buff-main-title">{weeklyData.bonus.name}</h2>
          </div>
        </div>
        
        <div className="neon-buff-body">
          <p>{weeklyData.bonus.desc}</p>
        </div>
        <div className="weekly-date-range">
          <div className="date-row">
            <i className="ri-calendar-event-line"></i>
            <span>
              {weeklyData.start.toLocaleDateString(langCode === 'zh' ? 'zh-CN' : 'en-US', {month:'short', day:'2-digit'})} - {weeklyData.end.toLocaleDateString(langCode === 'zh' ? 'zh-CN' : 'en-US', {month:'short', day:'2-digit'})}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}