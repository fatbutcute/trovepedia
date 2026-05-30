import React, { useState, useEffect } from 'react';
import './DailyWeeklyBuffs.css';

// ─── BÓNUSZ ADATBÁZISOK (A SCRIPTED ALAPJÁN) ───
const dailyColors = {
  1: "#a855f7", // Hétfő - Lila (Delve)
  2: "#00e5ff", // Kedd - Cián (Gathering)
  3: "#f43f5e", // Szerda - Pink (Gem)
  4: "#facc15", // Csütörtök - Sárga (Adventure)
  5: "#ef4444", // Péntek - Piros (Dragon)
  6: "#4ade80", // Szombat - Zöld (XP)
  0: "#f97316"  // Vasárnap - Narancs (Loot)
};

const dailyBonuses = {
  1: "Delve Day", 2: "Gathering Day", 3: "Gem Day", 4: "Adventure Day", 5: "Dragon Day", 6: "Experience Day", 0: "Loot Day"
};

const dailyDesc = {
  1: "2x crystal, shadow shard and inert geode drops!",
  2: "2x Radiant Shard Drops, +20% Harvest Chance, +50% Ore chance, +20% Fish Chance.",
  3: "-10% (Dust) Upgrade Cost, +25% Gem Box Drops Chance, 3 Lustrous Gem Box / day.",
  4: "+50% More Adventurine, 2x Chance for Adventure Boxes, 2x chance to find Talismans.",
  5: "2x Dragon Coins from Challenges, 2x Lesser Dragon Caches from Challenges, 2x Chance for Dragon Fragments.",
  6: "50% more Adventure Experience, 50% More Club Experience, 50% More Arena Win Experience.",
  0: "+100 Magic Find, 2x Chance to find Flux Artifacts, increased Chaos Chest Drop Chance."
};

const patronDesc = {
  1: "3x crystal, shadow shard and inert geode drops!",
  2: "3x Radiant Shard Drops, +40% Harvest Chance, +100% Ore chance, +40% Fish Chance.",
  3: "-20% (Dust) Upgrade Cost, +50% Gem Box Drops Chance, 6 Lustrous Gem Box / day.",
  4: "+100% More Adventurine, 3x Chance for Adventure Boxes, 3x chance to find Talismans.",
  5: "3x Dragon Coins from Challenges, 3x Lesser Dragon Caches from Challenges, 3x Chance for Dragon Fragments.",
  6: "100% more Adventure Experience, 100% More Club Experience, 100% More Arena Win Experience.",
  0: "+400 Magic Find, 3x Chance to find Flux Artifacts, increased Chaos Chest Drop Chance."
};

const weeklyRotation = [
  { id: "invasion", name: "Fast Invasion Week", desc: "Invaders occur more frequently.", glow: "#a855f7" },
  { id: "starbar", name: "Double Cubit Bar", desc: "2x Star Bar rewards.", glow: "#f97316" },
  { id: "xp", name: "XP Week", desc: "100% Base Experience!", glow: "#4ade80" },
  { id: "reroll", name: "Second Stat Reroll", desc: "Chaos Forge can reroll the 2nd stat.", glow: "#8b5cf6" }
];

export default function DailyWeeklyBuffs() {
  const [now, setNow] = useState(new Date());
  const [isPatron, setIsPatron] = useState(false);

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
    
    const index = ((weeksPassed % weeklyRotation.length) + weeklyRotation.length) % weeklyRotation.length;
    
    const currentWeekStart = new Date(startDate.getTime() + (weeksPassed * msInWeek));
    const currentWeekEnd = new Date(currentWeekStart.getTime() + msInWeek);
    
    return {
      bonus: weeklyRotation[index],
      start: currentWeekStart,
      end: currentWeekEnd
    };
  };

  const weeklyData = getWeeklyBonus();

  return (
    <div className="buffs-grid-wrapper">

      {/* 2. DAILY BUFF CARD */}
      <div className="neon-buff-card" style={{ '--buff-glow-color': activeDailyColor }}>
        <div className="neon-card-internal-glow"></div>
        <div className="neon-buff-header">
          <div className="neon-buff-title-group">
            <span className="neon-buff-subtitle">Current Daily Bonus</span>
            <h2 className="neon-buff-main-title">{dailyBonuses[currentBonusDay]}</h2>
          </div>
          
          {/* Patron Switcher */}
          <div className="buff-patron-toggle">
            <span className="buff-patron-text" style={{ color: isPatron ? '#fbff00' : '#64748b' }}>
              {isPatron ? 'PATRON' : 'NORMAL'}
            </span>
            <label className="buff-switch-label">
              <input type="checkbox" checked={isPatron} onChange={(e) => setIsPatron(e.target.checked)} />
              <span className="buff-switch-slider"></span>
            </label>
          </div>
        </div>
        
            <div className="neon-buff-body">
            <p style={{ 
                // Itt a logika: ha isPatron igaz, akkor a szín #facc15 (sárga), különben marad a default kék/fehér
                color: isPatron ? '#fbff00' : '#dceaff',
                transition: 'color 0.3s ease' // Ez teszi lágyabbá a színváltást
            }}>
                {isPatron ? patronDesc[currentBonusDay] : dailyDesc[currentBonusDay]}
            </p>
            </div>
        </div>

      {/* 3. WEEKLY EVENT CARD */}
      <div className="neon-buff-card" style={{ '--buff-glow-color': weeklyData.bonus.glow }}>
        <div className="neon-card-internal-glow"></div>
        <div className="neon-buff-header">
          <div className="neon-buff-title-group">
            <span className="neon-buff-subtitle">Active Weekly Bonus</span>
            <h2 className="neon-buff-main-title">{weeklyData.bonus.name}</h2>
          </div>
        </div>
        
        <div className="neon-buff-body">
          <p>{weeklyData.bonus.desc}</p>
        </div>
        <div className="weekly-date-range">
            {/* Közös konténer az ikonnak és a szövegnek */}
            <div className="date-row">
              <i className="ri-calendar-event-line"></i>
              <span>
                {weeklyData.start.toLocaleDateString('en-US', {month:'short', day:'2-digit'})} - {weeklyData.end.toLocaleDateString('en-US', {month:'short', day:'2-digit'})}
              </span>
            </div>
          </div>
      </div>

    </div>
  );
}