import { useState, useEffect } from 'react';
import './ClassesPage.css';
import { useLanguage } from '../context/LanguageContext';
import { classesPageContent } from '../components/guides/content/classesPage.content.js';

// ─── DATA ────────────────────────────────────────────────────────────────────
const BASE_CLASSES = [
  {
    id: 1, name: 'Vanguardian',
    img: '/classes/Trove-Class-Vanguardian.webp',
    bgImg: '/upscaled/Gemini_Generated_Image_5ipegp5ipegp5ipef.webp',
    type: 'Physical', color: '#60a5fa',
    Equipment: [
      { slot: 'Allies', text: 'Scorpius' },
      { slot: 'Emblems', text: 'Martial Emblem / Trailblazing Emblem' },
      { slot: 'Banner', text: 'Enshadowed Torch of Knotted Shadow' },
      { slot: 'Flask', text: 'Death-Defying Vial' },
      { slot: 'Subclass', text: 'Solarion' },
      { slot: 'Gems', text: 'Class Gem, Vampiric Vanquisher, Pyrodisc, Explosive Epilogue' },
      { slot: 'Hidden Ring Effect', text: 'Heros Stand' },
    ]
  },
  {
    id: 2, name: 'Dino Tamer',
    img: '/classes/Trove-Class-Dino-Tamer.webp',
    bgImg: '/upscaled/2016-10-01_160508.webp',
    type: 'Magic', color: '#4ade80',
    Equipment: [
      { slot: 'Allies', text: 'Orchian' },
      { slot: 'Emblems', text: 'Martial Emblem / Chronomantic Emblem' },
      { slot: 'Banner', text: 'Enshadowed Torch of The Sabreskull' },
      { slot: 'Flask', text: 'Death-Defying Vial' },
      { slot: 'Subclass', text: 'Solarion' },
      { slot: 'Gems', text: 'Class Gem, Vampiric Vanquisher, Pyrodisc, Explosive Epilogue' },
      { slot: 'Hidden Ring Effect', text: 'Mr. CHOMP CHOMP' },
    ]
  },
  {
    id: 3, name: 'Chloromancer',
    img: '/classes/Trove-Class-Chloromancer.webp',
    bgImg: '/upscaled/trove-biome-1-medieval-highlands.webp',
    type: 'Magic', color: '#86efac',
    Equipment: [
      { slot: 'Allies', text: 'Orchian' },
      { slot: 'Emblems', text: 'Arcane & Chronomantic Emblem' },
      { slot: 'Banner', text: 'Enshadowed Torch of The Sabreskull' },
      { slot: 'Flask', text: 'Death-Defying Vial' },
      { slot: 'Subclass', text: 'Solarion' },
      { slot: 'Gems', text: 'Class Gem, Pyrodisc, Vampiric Vanquisher, Explosive Epilogue' },
      { slot: 'Hidden Ring Effect', text: 'Gatling Gatling Gatling' },
    ]
  },
  {
    id: 4, name: 'Revenant',
    img: '/classes/Trove-Class-Revenant.webp',
    bgImg: '/upscaled/Gemini_Generated_Image_a6f5ofa6f5ofa6f5.webp',
    type: 'Physical', color: '#c084fc',
    Equipment: [
      { slot: 'Allies', text: 'Scorpius' },
      { slot: 'Emblems', text: 'Martial & Trailblazing Emblem' },
      { slot: 'Banner', text: 'Enshadowed Torch of the Knotted Shadow' },
      { slot: 'Flask', text: 'Death-Defying Vial' },
      { slot: 'Subclass', text: 'Solarion' },
      { slot: 'Gems', text: 'Class Gem, Pyrodisc, Vampiric Vanquisher, Explosive Epilogue' },
      { slot: 'Hidden Ring Effect', text: 'Vengeful Storm' },
    ]
  },
  {
    id: 5, name: 'Lunar Lancer',
    img: '/classes/Trove-Class-Lunar-Lancer.webp',
    bgImg: '/upscaled/yx9KNkl.webp',
    type: 'Physical', color: '#a5b4fc',
    Equipment: [
      { slot: 'Allies', text: 'Scorpius' },
      { slot: 'Emblems', text: 'Martial Emblem & Trailblazer Emblem' },
      { slot: 'Banner', text: 'Enshadowed of the Knotted Shadow' },
      { slot: 'Flask', text: 'Death-Defying Vial' },
      { slot: 'Subclass', text: 'Solarion' },
      { slot: 'Gems', text: 'Class Gem, Vampirian Vanquisher, Pyrodisc, Explosive Epilogue' },
      { slot: 'Hidden Ring Effect', text: 'From the Moon' },
    ]
  },
  {
    id: 6, name: 'Tomb Raiser',
    img: '/classes/Trove-Class-Tomb-Raiser.webp',
    bgImg: '/upscaled/trove-biome-3-cursed-vale.webp',
    type: 'Magic', color: '#94a3b8',
    Equipment: [
      { slot: 'Allies', text: 'Orchian' },
      { slot: 'Emblems', text: 'Arcane & Trailblazer Emblem' },
      { slot: 'Banner', text: 'Enshadowed Torch of The Sabreskull' },
      { slot: 'Flask', text: 'Death-Defying Vial' },
      { slot: 'Subclass', text: 'Solarion' },
      { slot: 'Gems', text: 'Class Gem, Vampiric Vanquisher, Pyrodisc, Explosive Epilogue' },
      { slot: 'Hidden Ring Effect', text: 'Skellbiggle Split' },
    ]
  },
  {
    id: 7, name: 'Boomeranger',
    img: '/classes/Trove-Class-Boomeranger.webp',
    bgImg: '/upscaled/Fgr9l24.webp',
    type: 'Physical', color: '#fb923c',
    Equipment: [
      { slot: 'Allies', text: 'Scorpius (Farm and general tasks) / Mini Fire Manabeast (For damage maxing)' },
      { slot: 'Emblems', text: 'Martial & Chronomantic Emblem' },
      { slot: 'Banner', text: 'Enshadowed Torch of Knotted Shadow' },
      { slot: 'Flask', text: 'Death-Defying Vial (Delves) / Conjurer’s Crucible Vial (Farm)'},
      { slot: 'Subclass', text: 'Solarion' },
      { slot: 'Gems', text: 'Class Gem, Pyrodisc, Berserk Battler, Stinging Curse / Explosive Epilogue' },
      { slot: 'Hidden Ring Effect', text: 'Cyclone' },
    ]
  },
  {
    id: 8, name: 'Ice Sage',
    img: '/classes/Trove-Class-Ice-Sage.webp',
    bgImg: '/upscaled/Fsc7ngB.webp',
    type: 'Magic', color: '#bae6fd',
    Equipment: [
      { slot: 'Allies', text: 'Orchian / Mini Water Manabeast (For damage maxing)' },
      { slot: 'Emblems', text: 'Arcane & Chronomantic Emblem' },
      { slot: 'Banner', text: 'Enshadowed Torch of The Sabreskull' },
      { slot: 'Flask', text: 'Death-Defying Vial' },
      { slot: 'Subclass', text: 'Solarion' },
      { slot: 'Gems', text: 'Class Gem, Pyrodisc, Berserk Battler, Stinging Curse / Explosive Epilogue' },
      { slot: 'Hidden Ring Effect', text: 'Chill Out' },
    ]
  },
  {
    id: 9, name: 'Shadow Hunter',
    img: '/classes/Trove-Class-Shadow-Hunter.webp',
    bgImg: '/upscaled/TqVhomw.webp',
    type: 'Physical', color: '#fbbf24',
    Equipment: [
      { slot: 'Allies', text: 'Scorpius' },
      { slot: 'Emblems', text: 'Martial & Trailblazing Emblem' },
      { slot: 'Banner', text: 'Enshadowed Torch of the Knotted Shadow' },
      { slot: 'Flask', text: 'Death-Defying Vial / Conjurer’s Crucible Vial' },
      { slot: 'Subclass', text: 'Solarion' },
      { slot: 'Gems', text: 'Class Gem, Pyrodisc, Explosive Epilogue, Vampiric Vanquisher / Berserk Battler' },
      { slot: 'Hidden Ring Effect', text: 'Tactical Seekers' },
    ]
  },
  {
    id: 10, name: 'Candy Barbarian',
    img: '/classes/Trove-Class-Candy-Barbarian.webp',
    bgImg: '/upscaled/Trove_Screenshot_2026.04.11_-_03.44.48.62.webp',
    type: 'Physical', color: '#f9a8d4',
    Equipment: [
      { slot: 'Allies', text: 'Scorpius (Farm and general tasks) / Mini Fire Manabeast (For damage maxing)' },
      { slot: 'Emblems', text: 'Martial & Chronomantic Emblem' },
      { slot: 'Banner', text: 'Enshadowed Torch of Knotted Shadow' },
      { slot: 'Flask', text: 'Death-Defying Vial' },
      { slot: 'Subclass', text: 'Solarion' },
      { slot: 'Gems', text: 'Class Gem, Pyrodisc, Berserk Battler, Explosive Epilogue' },
      { slot: 'Hidden Ring Effect', text: 'Emergency Snack (Restores Health & Resetting Abilities) / Spin to Win (Good for farming)' },
    ]
  },
  {
    id: 11, name: 'Dracolyte',
    img: '/classes/Trove-Class-Dracolyte.webp',
    bgImg: '/upscaled/trove-biome-10-dragonfire-peaks.webp',
    type: 'Magic', color: '#f87171',
    Equipment: [
      { slot: 'Allies', text: 'Orchian' },
      { slot: 'Emblems', text: 'Arcane & Chronomantic Emblem' },
      { slot: 'Banner', text: 'Enshadowed Torch of The Sabreskull' },
      { slot: 'Flask', text: 'Death-Defying Vial' },
      { slot: 'Subclass', text: 'Solarion' },
      { slot: 'Gems', text: 'Class Gem, Vampiric Vanquisher, Pyrodisc, Explosive Epilogue' },
      { slot: 'Hidden Ring Effect', text: 'Dragon Force' },
    ]
  },
  {
    id: 12, name: 'Neon Ninja',
    img: '/classes/Trove-Class-Neon-Ninja.webp',
    bgImg: '/upscaled/Luminopolis.webp',
    type: 'Physical', color: '#22d3ee',
    Equipment: [
      { slot: 'Allies', text: 'Scorpius' },
      { slot: 'Emblems', text: 'Martial Emblem & Trailblazing Emblem' },
      { slot: 'Banner', text: 'Enshadowed Torch of Knotted Shadow' },
      { slot: 'Flask', text: 'Death-Defying Vial' },
      { slot: 'Subclass', text: 'Solarion' },
      { slot: 'Gems', text: 'Class Gem, Vampiric Vanquisher, Pyrodisc, Explosive Epilogue' },
      { slot: 'Hidden Ring Effect', text: 'Recharge' },
    ]
  },
  {
    id: 13, name: 'Gunslinger',
    img: '/classes/Trove-Class-Gun-Slinger.webp',
    bgImg: '/upscaled/WULhg74.webp',
    type: 'Magic', color: '#fcd34d',
    Equipment: [
      { slot: 'Allies', text: 'Orchian' },
      { slot: 'Emblems', text: 'Arcane Emblem & Chronomantic Emblem' },
      { slot: 'Banner', text: 'Enshadowed Torch of The Sabreskull' },
      { slot: 'Flask', text: 'Death-Defying Vial' },
      { slot: 'Subclass', text: 'Solarion' },
      { slot: 'Gems', text: 'Class Gem, Vampiric Vanquisher, Pyrodisc, Explosive Epilogue' },
      { slot: 'Hidden Ring Effect', text: 'Berserk Slinger' },
    ]
  },
  {
    id: 14, name: 'Knight',
    img: '/classes/Trove-Class-Knight.webp',
    bgImg: '/upscaled/Trove-wallpaper-1.webp',
    type: 'Physical', color: '#e2e8f0',
    Equipment: [
      { slot: 'Allies', text: 'Scorpius' },
      { slot: 'Emblems', text: 'Martial Emblem & Trailblazing Emblem' },
      { slot: 'Banner', text: 'Enshadowed Torch of Knotted Shadow' },
      { slot: 'Flask', text: 'Death-Defying Vial' },
      { slot: 'Subclass', text: 'Solarion' },
      { slot: 'Gems', text: 'Class Gem, Pyrodisc, Explosive Epilogue, Vampiric Vanquisher / Berserk Battler' },
      { slot: 'Hidden Ring Effect', text: 'Over Charge' },
    ]
  },
  {
    id: 15, name: 'Fae Trickster',
    img: '/classes/Trove-Class-Fae-Trickster.webp',
    bgImg: '/upscaled/faebiome.webp',
    type: 'Magic', color: '#d8b4fe',
    Equipment: [
      { slot: 'Allies', text: 'Orchian' },
      { slot: 'Emblems', text: 'Arcane & Chronomantic Emblem' },
      { slot: 'Banner', text: 'U11 Magic Banner' },
      { slot: 'Flask', text: 'Death-Defying Vial' },
      { slot: 'Subclass', text: 'Solarion' },
      { slot: 'Gems', text: 'Class Gem, Berserk Battler, Pyrodisc, Stinging Curse' },
      { slot: 'Hidden Ring Effect', text: 'Dance Partner' },
    ]
  },
  {
    id: 16, name: 'Pirate Captain',
    img: '/classes/Trove-Class-Pirate-Captain.webp',
    bgImg: '/upscaled/NCSmFCd.webp',
    type: 'Magic', color: '#fb923c',
    Equipment: [
      { slot: 'Allies', text: 'Orchian' },
      { slot: 'Emblems', text: 'Arcane Emblem & Trailblazing Emblem' },
      { slot: 'Banner', text: 'Enshadowed Torch of The Sabreskull' },
      { slot: 'Flask', text: 'Death-Defying Vial' },
      { slot: 'Subclass', text: 'Solarion' },
      { slot: 'Gems', text: 'Class Gem, Vampiric Vanquisher, Pyrodisc, Explosive Epilogue' },
      { slot: 'Hidden Ring Effect', text: 'Avast YEE!!' },
    ]
  },
  {
    id: 17, name: 'Bard',
    img: '/classes/Trove-Class-Bard.webp',
    bgImg: '/upscaled/92J4wsh.webp',
    type: 'Magic', color: '#fde68a',
    Equipment: [
      { slot: 'Allies', text: 'Orchian' },
      { slot: 'Emblems', text: 'Arcane & Trailblazing' },
      { slot: 'Banner', text: 'Enshadowed Torch of The Sabreskull' },
      { slot: 'Flask', text: 'Death-Defying Vial' },
      { slot: 'Subclass', text: 'Knight or Lunar Lancer' },
      { slot: 'Gems', text: 'Class Gem, Vampirian, Pyrodisc, Explosive Epilogue' },
      { slot: 'Hidden Ring Effect', text: 'Overload' },
    ]
  },
  {
    id: 18, name: 'Solarion',
    img: '/classes/Trove-Class-Solarion.webp',
    bgImg: '/upscaled/trovepediabg.webp',
    type: 'Physical', color: '#fbbf24',
    Equipment: [
      { slot: 'Allies', text: 'Earnie / Scorpius / Mini Fire Manabeast (For damage maxing)' },
      { slot: 'Emblems', text: 'Martial Emblem & Zealous Emblem' },
      { slot: 'Banner', text: 'Enshadowed Torch of the Knotted Shadow' },
      { slot: 'Flask', text: 'Death-Defying Vial' },
      { slot: 'Subclass', text: 'Lunar Lancer / Bard' },
      { slot: 'Gems', text: 'Class Gem, Pyrodisc, Explosive Epilogue, Berserk Battler' },
      { slot: 'Hidden Ring Effect', text: 'Prismatic Chain' },
    ]
  },
];

const TABS_KEYS = ['Equipment', 'Abilities', 'Gems', 'How to use'];

const typeColor = {
  Physical: '#f97316',
  Summoner: '#a78bfa',
  Support:  '#34d399',
  Tank:     '#94a3b8',
  Magic:    '#22d3ee',
  Mage:     '#818cf8',
  Ranger:   '#fbbf24',
};

function TabContent({ cls, tab, c }) {
  if (tab === 'Equipment') {
    return (
      <div className="cp-equip-list">
        {cls.Equipment.map((eq, index) => {
          const translatedText = c.equipItems?.[eq.text] || eq.text;

          return (
            <div 
              key={eq.slot} 
              className="cp-equip-item cp-rubrika-box"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <span className="cp-equip-slot">{c.slots[eq.slot] || eq.slot}</span>
              <span className="cp-equip-text">{translatedText}</span>
            </div>
          );
        })}
      </div>
    );
  }

  const classTexts = c.classes[cls.name] || classesPageContent.en.classes[cls.name];
  const textVal = classTexts ? classTexts[tab] : '';

  return (
    <div className="cp-text-content-wrap">
      <p>{textVal}</p>
    </div>
  );
}

export default function ClassesPage() {
  const [selected, setSelected] = useState(BASE_CLASSES[0]);
  const [activeTab, setActiveTab] = useState(TABS_KEYS[0]);

  const { langCode } = useLanguage();
  const c = classesPageContent[langCode] || classesPageContent.en;

  return (
    <div className="cp-wrapper">
      {/* Háttérképek rétegei */}
      {BASE_CLASSES.map(cls => (
        <div 
          key={`bg-${cls.id}`}
          className={`cp-bg-layer ${selected.id === cls.id ? 'active' : ''}`}
          style={{ backgroundImage: `url(${cls.bgImg})` }}
        />
      ))}
      <div className="cp-bg-overlay" />

      <div className="cp-main-layout">
        
        {/* 1. BAL OLDAL: KARAKTERVÁLASZTÓ */}
        <div className="cp-left-selection">
          <p className="cp-selection-label">{c.selectLabel}</p>
          <div className="cp-grid-selection">
            {BASE_CLASSES.map(cls => (
              <div 
                key={cls.id}
                className={`cp-grid-card ${selected.id === cls.id ? 'active' : ''}`}
                onClick={() => setSelected(cls)}
                style={{ '--cls-color': cls.color }}
              >
                <img src={cls.img} alt={cls.name} className="cp-grid-avatar" />
                <div className="cp-grid-card-border" />
              </div>
            ))}
          </div>
        </div>

        {/* 2. KÖZÉP: A HŐS KÉPE */}
        <div className="cp-center-hero" key={`hero-container-${selected.id}`}>
          <img 
            src={selected.img} 
            alt={selected.name} 
            className="cp-large-img" 
          />
          <div className="cp-hero-shadow" style={{ '--cls-color': selected.color }} />
        </div>

        {/* 3. JOBB OLDAL: INFÓK ÉS LEÍRÁS */}
        <div className="cp-right-info" key={`info-container-${selected.id}`}>
          <div className="cp-info-header">
            <span 
              className="cp-type-badge" 
              style={{ 
                color: typeColor[selected.type], 
                borderColor: typeColor[selected.type],
                backgroundColor: `${typeColor[selected.type]}15`
              }}
            >
              {selected.type}
            </span>
            <h1 className="cp-main-title">{selected.name}</h1>
          </div>
          
          <div className="cp-tabs">
            {TABS_KEYS.map((tabKey) => (
              <button
                key={tabKey}
                className={`cp-tab-btn ${activeTab === tabKey ? 'cp-tab-btn--active' : ''}`}
                style={{ '--class-color': selected.color }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab(tabKey);
                }}
              >
                {c.tabs[tabKey] || tabKey}
              </button>
            ))}
          </div>

          <div className="cp-tab-wrap" key={`tab-content-${selected.id}-${activeTab}`}>
            <TabContent cls={selected} tab={activeTab} c={c} />
          </div>
        </div>

      </div>
    </div>
  );
}