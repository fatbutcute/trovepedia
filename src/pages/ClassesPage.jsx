import { useState, useEffect } from 'react'
import './ClassesPage.css'

// ─── DATA ────────────────────────────────────────────────────────────────────
const classesData = [
  {
    id: 1, name: 'Vanguardian',
    img: '/classes/Trove-Class-Vanguardian.webp',
    bgImg: '/upscaled/Gemini_Generated_Image_5ipegp5ipegp5ipef.png',
    type: 'Physical', color: '#60a5fa',
    details: {
      Equipment: [
        { slot: 'Allies',    text: 'Berserker / Scorpius' },
        { slot: 'Emblems',   text: 'Martial Emblem / Trailblazing' },
        { slot: 'Banner',    text: 'Enshadowed Torch of Knotted Shadow' },
        { slot: 'Flask',     text: 'Death-Defying Vial' },
        { slot: 'Subclass',  text: 'Knight (for movement speed and flasks)' },
        { slot: 'Gems',      text: 'Berserk Battler / Pyrodisc / Vampiric Vanquisher' },
      ],
      Abilities: 'Switch between Melee and Ranged modes. Use "Touchdown" to deal massive AoE damage and "Hero\'s Charge" for mobility.',
      Gems: 'Focus on Physical Damage, Critical Hit, and Critical Damage. For Cosmic Gems, aim for 3 pearls into Light.',
      'How to use': 'Vanguardian is a versatile fighter. Start with Force Flash for a speed boost, then dive in with Touchdown to crush groups of enemies.',
    },
  },
  {
    id: 2, name: 'Dino Tamer',
    img: '/classes/Trove-Class-Dino-Tamer.webp',
    bgImg: '/upscaled/2016-10-01_160508.png',
    type: 'Magic', color: '#4ade80',
    details: {
      Equipment: [
        { slot: 'Allies',    text: 'Rapt' },
        { slot: 'Emblems',   text: 'Martial Emblem / Trailblazing' },
        { slot: 'Banner',    text: 'Enshadowed Torch of the Hive' },
        { slot: 'Flask',     text: 'Death-Defying Vial' },
        { slot: 'Subclass',  text: 'Knight or Lunar Lancer' },
        { slot: 'Gems',      text: 'Class Gem is mandatory for multi-nets' },
      ],
      Abilities: 'Uses Hunting Nets to root enemies and Dino Buddies to distract them. The Ultimate "Dino Mount" grants huge buffs.',
      Gems: 'Physical Damage and Critical stats are key. Dino Tamer relies on high damage during the Ultimate transformation.',
      'How to use': 'Throw nets constantly to keep enemies in place while your summons deal damage. Keep your Ultimate active as much as possible.',
    },
  },
  {
    id: 3, name: 'Chloromancer',
    img: '/classes/Trove-Class-Chloromancer.webp',
    bgImg: '/upscaled/trove-biome-1-medieval-highlands.png',
    type: 'Magic', color: '#86efac',
    details: {
      Equipment: [
        { slot: 'Allies',    text: 'Prefect Penguin or Chronomancer Qubesly' },
        { slot: 'Emblems',   text: 'Arcane & Chronomantic Emblem' },
        { slot: 'Banner',    text: 'Magic Damage / Light Banner' },
        { slot: 'Flask',     text: 'Death-Defying Vial' },
        { slot: 'Subclass',  text: 'Knight or Bard' },
        { slot: 'Gems',      text: 'Class Gem for Empowered Growth' },
      ],
      Abilities: 'Basic attacks heal plants and allies. Leafy Lashers slow enemies, and Blooming Pollinators deal burst damage.',
      Gems: 'Magic Damage and Critical stats. Chloromancer is a hybrid damage/support class.',
      'How to use': 'Spam your leafy lashers to create a field of CC. Use your basic attack to accelerate plant growth and heal your team.',
    },
  },
  {
    id: 4, name: 'Revenant',
    img: '/classes/Trove-Class-Revenant.webp',
    bgImg: '/upscaled/Gemini_Generated_Image_a6f5ofa6f5ofa6f5.png',
    type: 'Physical', color: '#c084fc',
    details: {
      Equipment: [
        { slot: 'Allies',    text: 'Puck or Rapt' },
        { slot: 'Emblems',   text: 'Martial & Vampiric Emblem' },
        { slot: 'Banner',    text: 'U11 Physical Damage Banner' },
        { slot: 'Flask',     text: 'Death-Defying Vial' },
        { slot: 'Subclass',  text: 'Candy Barbarian or Knight' },
        { slot: 'Gems',      text: 'Class Gem for Aegis of Death' },
      ],
      Abilities: 'Spirit Spears deal damage over time. Spirit Storm pulls enemies in and heals the Revenant.',
      Gems: 'Physical Damage and Max Health. Revenant uses health to power abilities, so high HP is vital.',
      'How to use': 'A true tank. Dive into the middle of enemies, activate Spirit Storm to group them, and poke them down with spears.',
    },
  },
  {
    id: 5, name: 'Lunar Lancer',
    img: '/classes/Trove-Class-Lunar-Lancer.webp',
    bgImg: '/upscaled/yx9KNkl.png',
    type: 'Physical', color: '#a5b4fc',
    details: {
      Equipment: [
        { slot: 'Allies',    text: 'Rapt' },
        { slot: 'Emblems',   text: 'Martial & Beamer Emblem' },
        { slot: 'Banner',    text: 'Enshadowed Torch of the Hive' },
        { slot: 'Flask',     text: 'Death-Defying Vial' },
        { slot: 'Subclass',  text: 'Knight' },
        { slot: 'Gems',      text: 'Class Gem for Shadow Lancer' },
      ],
      Abilities: 'Grappling Spear for mobility and Crescent Combo for massive AoE stun and damage.',
      Gems: 'Physical and Critical stats. Lunar Lancer excels at burst damage in Lunatic form.',
      'How to use': 'Use Grappling Spear to fly through dungeons. When fighting, use Crescent Combo to keep enemies stunned.',
    },
  },
  {
    id: 6, name: 'Tomb Raiser',
    img: '/classes/Trove-Class-Tomb-Raiser.webp',
    bgImg: '/upscaled/trove-biome-3-cursed-vale.png',
    type: 'Magic', color: '#94a3b8',
    details: {
      Equipment: [
        { slot: 'Allies',    text: 'Chronomancer Qubesly' },
        { slot: 'Emblems',   text: 'Arcane & Vampiric Emblem' },
        { slot: 'Banner',    text: 'Magic Damage / Light Banner' },
        { slot: 'Flask',     text: 'Death-Defying Vial' },
        { slot: 'Subclass',  text: 'Knight' },
        { slot: 'Gems',      text: 'Class Gem for extra minions' },
      ],
      Abilities: 'Summon Bonetourage minions and combine them into a massive Grave Goliath.',
      Gems: 'Magic Damage and Critical Damage. Health is also important for minion survivability.',
      'How to use': 'Keep your Banshee\'s Boon active to stay alive and heal your minions. Sacrifice them for a Goliath when facing bosses.',
    },
  },
  {
    id: 7, name: 'Boomeranger',
    img: '/classes/Trove-Class-Boomeranger.webp',
    bgImg: '/upscaled/Fgr9l24.png',
    type: 'Physical', color: '#fb923c',
    details: {
      Equipment: [
        { slot: 'Allies',    text: 'Rapt' },
        { slot: 'Emblems',   text: 'Martial & Beamer Emblem' },
        { slot: 'Banner',    text: 'U11 Physical Banner' },
        { slot: 'Flask',     text: 'Death-Defying Vial' },
        { slot: 'Subclass',  text: 'Knight' },
        { slot: 'Gems',      text: 'Class Gem for Bawk-Bomb chickens' },
      ],
      Abilities: 'Throw Boomerangs to reduce cooldowns. Mysterious Urn grants random buffs like chickens or bombs.',
      Gems: 'Physical Damage and Critical stats. Boomeranger is an RNG-heavy, fun burst class.',
      'How to use': 'Always catch your boomerang! It\'s the key to spamming your abilities and keeping your chicken army alive.',
    },
  },
  {
    id: 8, name: 'Ice Sage',
    img: '/classes/Trove-Class-Ice-Sage.webp',
    bgImg: '/upscaled/Fsc7ngB.png',
    type: 'Magic', color: '#bae6fd',
    details: {
      Equipment: [
        { slot: 'Allies',    text: 'Prefect Penguin' },
        { slot: 'Emblems',   text: 'Arcane & Chronomantic Emblem' },
        { slot: 'Banner',    text: 'U11 Magic Damage Banner' },
        { slot: 'Flask',     text: 'Death-Defying Vial' },
        { slot: 'Subclass',  text: 'Knight' },
        { slot: 'Gems',      text: 'Class Gem for Pain Freeze' },
      ],
      Abilities: 'Ice Crash drops icicles from the sky. Frozen Ward protects and buffs attack speed.',
      Gems: 'Magic Damage and Critical Damage. Ice Sage is a top-tier farmer and boss killer.',
      'How to use': 'Keep Frozen Ward active at all times. Use your Ultimate "The Big Chill" to freeze time and shred bosses.',
    },
  },
  {
    id: 9, name: 'Shadow Hunter',
    img: '/classes/Trove-Class-Shadow-Hunter.webp',
    bgImg: '/upscaled/TqVhomw.png',
    type: 'Physical', color: '#fbbf24',
    details: {
      Equipment: [
        { slot: 'Allies',    text: 'Rapt' },
        { slot: 'Emblems',   text: 'Martial & Beamer Emblem' },
        { slot: 'Banner',    text: 'Enshadowed Torch' },
        { slot: 'Flask',     text: 'Death-Defying Vial' },
        { slot: 'Subclass',  text: 'Knight' },
        { slot: 'Gems',      text: 'Class Gem (Mandatory for rapid fire)' },
      ],
      Abilities: 'Sun Snare stuns enemies. Radiant Arrow can shoot through walls and deal massive damage.',
      Gems: 'Physical Damage and Critical Damage. Attack speed is provided by the Class Gem.',
      'How to use': 'Once you have the Class Gem, your basic attack becomes a machine gun. Just hold left click and win.',
    },
  },
  {
    id: 10, name: 'Candy Barbarian',
    img: '/classes/Trove-Class-Candy-Barbarian.webp',
    bgImg: '/upscaled/Trove_Screenshot_2026.04.11_-_03.44.48.62.png',
    type: 'Physical', color: '#f9a8d4',
    details: {
      Equipment: [
        { slot: 'Allies',    text: 'Rapt' },
        { slot: 'Emblems',   text: 'Martial & Vampiric Emblem' },
        { slot: 'Banner',    text: 'U11 Physical Banner' },
        { slot: 'Flask',     text: 'Death-Defying Vial' },
        { slot: 'Subclass',  text: 'Knight' },
        { slot: 'Gems',      text: 'Class Gem for Scoop n\' Gloop' },
      ],
      Abilities: 'Vanilla Swirlwind pulls enemies in. Eis-Crom Cone heals and buffs allies.',
      Gems: 'Physical Damage and Max Health. A tanky support that drops candy for the team.',
      'How to use': 'Spam Swirlwind to keep enemies grouped. Use Sugar Crash for mobility and pick up candies for attack speed buffs.',
    },
  },
  {
    id: 11, name: 'Dracolyte',
    img: '/classes/Trove-Class-Dracolyte.webp',
    bgImg: '/upscaled/trove-biome-10-dragonfire-peaks.png',
    type: 'Magic', color: '#f87171',
    details: {
      Equipment: [
        { slot: 'Allies',    text: 'Chronomancer Qubesly' },
        { slot: 'Emblems',   text: 'Arcane & Vampiric Emblem' },
        { slot: 'Banner',    text: 'Magic Damage / Light' },
        { slot: 'Flask',     text: 'Death-Defying Vial' },
        { slot: 'Subclass',  text: 'Knight' },
        { slot: 'Gems',      text: 'Class Gem for extra dragon minions' },
      ],
      Abilities: 'Summon Burnt Offerings (bombs) and detonate them. Transform into a Dragon for major buffs.',
      Gems: 'Magic Damage and Max Health. Dracolyte is a close-range mage who thrives in lava.',
      'How to use': 'Drop bombs constantly while attacking with your flamethrower. Use your Ultimate when facing hordes.',
    },
  },
  {
    id: 12, name: 'Neon Ninja',
    img: '/classes/Trove-Class-Neon-Ninja.webp',
    bgImg: '/upscaled/Luminopolis.png',
    type: 'Physical', color: '#22d3ee',
    details: {
      Equipment: [
        { slot: 'Allies',    text: 'Rapt Berserk Battler' },
        { slot: 'Emblems',   text: 'Martial & Trailblazing Emblem' },
        { slot: 'Banner',    text: 'Movement Speed / Physical Banner' },
        { slot: 'Flask',     text: 'Death-Defying Vial' },
        { slot: 'Subclass',  text: 'Knight' },
        { slot: 'Gems',      text: 'Class Gem for Hepta-Force stars' },
      ],
      Abilities: 'Shadow Flip for stealth and speed. Stasis Blade for crowd control and throwing stars.',
      Gems: 'Physical Damage and Critical Damage. High movement speed is essential for this class.',
      'How to use': 'Attack three times to charge your stars, then Shadow Flip and throw them to deal critical damage from afar.',
    },
  },
  {
    id: 13, name: 'Gunslinger',
    img: '/classes/Trove-Class-Gun-Slinger.webp',
    bgImg: '/upscaled/WULhg74.png',
    type: 'Magic', color: '#fcd34d',
    details: {
      Equipment: [
        { slot: 'Allies',    text: 'Chronomancer Qubesly' },
        { slot: 'Emblems',   text: 'Arcane & Beamer Emblem' },
        { slot: 'Banner',    text: 'Magic Damage / Light' },
        { slot: 'Flask',     text: 'Death-Defying Vial' },
        { slot: 'Subclass',  text: 'Knight' },
        { slot: 'Gems',      text: 'Class Gem (Mandatory for aerial superiority)' },
      ],
      Abilities: 'Blast Jump to stay in the air. Run and Gun increases attack speed and mobility.',
      Gems: 'Magic Damage and Critical stats. Gunslinger is the king of vertical combat.',
      'How to use': 'Stay airborne! Hold your jump button and use Run and Gun to rain down charged shots on enemies.',
    },
  },
  {
    id: 14, name: 'Knight',
    img: '/classes/Trove-Class-Knight.webp',
    bgImg: '/upscaled/Trove-wallpaper-1.jpg',
    type: 'Physical', color: '#e2e8f0',
    details: {
      Equipment: [
        { slot: 'Allies',    text: 'Rapt Berserk Battler' },
        { slot: 'Emblems',   text: 'Martial & Vampiric Emblem' },
        { slot: 'Banner',    text: 'U11 Physical Banner' },
        { slot: 'Flask',     text: 'Death-Defying Vial' },
        { slot: 'Subclass',  text: 'Lunar Lancer (for extra damage)' },
        { slot: 'Gems',      text: 'Class Gem for Overcharge' },
      ],
      Abilities: 'Charge to close gaps. Iron Will grants invulnerability and heals the Knight.',
      Gems: 'Physical Damage and Health. Knight is a classic, sturdy melee class.',
      'How to use': 'Charge into battle and use Smash to taunt enemies. Use Iron Will when your health is low to survive anything.',
    },
  },
  {
    id: 15, name: 'Fae Trickster',
    img: '/classes/Trove-Class-Fae-Trickster.webp',
    bgImg: '/upscaled/faebiome.png',
    type: 'Magic', color: '#d8b4fe',
    details: {
      Equipment: [
        { slot: 'Allies',    text: 'Chronomancer Qubesly' },
        { slot: 'Emblems',   text: 'Arcane & Beamer Emblem' },
        { slot: 'Banner',    text: 'U11 Magic Banner' },
        { slot: 'Flask',     text: 'Death-Defying Vial' },
        { slot: 'Subclass',  text: 'Knight' },
        { slot: 'Gems',      text: 'Class Gem for Faerie Force' },
      ],
      Abilities: 'Blink to leave decoys. Faerie Dance summons staves that attack for you.',
      Gems: 'Magic Damage and Critical Damage. Avoid Health, focus on pure damage.',
      'How to use': 'Never stop blinking! Your passive deals massive damage only if you haven\'t been hit recently.',
    },
  },
  {
    id: 16, name: 'Pirate Captain',
    img: '/classes/Trove-Class-Pirate-Captain.webp',
    bgImg: '/upscaled/NCSmFCd.png',
    type: 'Magic', color: '#fb923c',
    details: {
      Equipment: [
        { slot: 'Allies',    text: 'Chronomancer Qubesly' },
        { slot: 'Emblems',   text: 'Arcane & Chronomantic Emblem' },
        { slot: 'Banner',    text: 'Magic Damage / Light' },
        { slot: 'Flask',     text: 'Death-Defying Vial' },
        { slot: 'Subclass',  text: 'Knight' },
        { slot: 'Gems',      text: 'Class Gem for First Mate upgrades' },
      ],
      Abilities: 'First Mate turret shoots enemies. Man o\' War deals huge AoE damage.',
      Gems: 'Magic Damage and Critical stats. Pirate Captain is a turret-based damage powerhouse.',
      'How to use': 'Throw your First Mate and collect doubloons to upgrade it. Use Pretend Pirate to distract foes while you fire.',
    },
  },
  {
    id: 17, name: 'Bard',
    img: '/classes/Trove-Class-Bard.webp',
    bgImg: '/upscaled/92J4wsh.png',
    type: 'Magic', color: '#fde68a',
    details: {
      Equipment: [
        { slot: 'Allies',    text: 'Prefect Penguin' },
        { slot: 'Emblems',   text: 'Arcane & Zealous Emblem' },
        { slot: 'Banner',    text: 'U11 Magic Banner' },
        { slot: 'Flask',     text: 'Death-Defying Vial' },
        { slot: 'Subclass',  text: 'Knight or Lunar Lancer' },
        { slot: 'Gems',      text: 'Class Gem for Jubilant Song buffs' },
      ],
      Abilities: 'Songs provide buffs like speed, health, and damage. Backflip grants invulnerability.',
      Gems: 'Magic Damage and Critical stats. Bard is the ultimate team-buffing class.',
      'How to use': 'Maintain your songs! Use Jubilant Song for farming speed and Battle Song for boss shredding.',
    },
  },
  {
    id: 18, name: 'Solarion',
    img: '/classes/Trove-Class-Solarion.webp',
    bgImg: '/upscaled/trovepediabg.png',
    type: 'Physical', color: '#fbbf24',
    details: {
      Equipment: [
        { slot: 'Allies',    text: 'Rapt Berserk Battler' },
        { slot: 'Emblems',   text: 'Martial & Beamer Emblem' },
        { slot: 'Banner',    text: 'U11 Physical Damage Banner' },
        { slot: 'Flask',     text: 'Death-Defying Vial' },
        { slot: 'Subclass',  text: 'Knight' },
        { slot: 'Gems',      text: 'Class Gem for Solar Flare burn' },
      ],
      Abilities: 'Phoenix Dive to heal and attack. Solar Flare for continuous burning damage.',
      Gems: 'Physical Damage and Critical stats. Solarion is currently one of the strongest damage dealers.',
      'How to use': 'Keep your phoenix alive! Use Guiding Light to shred enemy resistances and burn everything in sight.',
    },
  },
]

const TABS = ['Equipment', 'Abilities', 'Gems', 'How to use']

// ─── TYPE BADGE COLORS ───────────────────────────────────────────────────────
const typeColor = {
  Physical:  '#f97316',
  Summoner: '#a78bfa',
  Support:  '#34d399',
  Tank:     '#94a3b8',
  Magic: '#22d3ee',
  Mage:     '#818cf8',
  Ranger:   '#fbbf24',
}

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useTypewriter(text, active, speed = 5) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (!active || !text) { setDisplayed(''); return }
    setDisplayed('')
    let i = 0
    const id = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, active, speed])

  return displayed
}

// ─── EQUIPMENT GRID ──────────────────────────────────────────────────────────
const EQUIP_ICONS = {
  Allies: '👥', Emblems: '🔰', Banner: '🏴', Flask: '⚗️', Subclass: '⚔️', Gems: '💎',
}

function EquipmentGrid({ items, visible }) {
  return (
    <div className="cp-equip-grid">
      {items.map((item, i) => (
        <div
          key={item.slot}
          className="cp-equip-row"
          style={{ animationDelay: visible ? `${i * 70}ms` : '0ms' }}
        >
          <span className="cp-equip-icon">{EQUIP_ICONS[item.slot] ?? '🔷'}</span>
          <span className="cp-equip-slot">{item.slot}</span>
          <span className="cp-equip-text">{item.text}</span>
        </div>
      ))}
    </div>
  )
}

// ─── TAB CONTENT ─────────────────────────────────────────────────────────────
function TabContent({ cls, tab }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(false)
    const t = setTimeout(() => setVisible(true), 40)
    return () => clearTimeout(t)
  }, [tab, cls.id])

  const textContent = typeof cls.details?.[tab] === 'string' ? cls.details[tab] : ''
  const typed = useTypewriter(textContent, visible && tab !== 'Equipment')

  if (tab === 'Equipment') {
    return (
      <div className={`cp-tab-body ${visible ? 'cp-tab-visible' : ''}`}>
        <EquipmentGrid items={cls.details.Equipment} visible={visible} />
      </div>
    )
  }

  return (
    <div className={`cp-tab-body ${visible ? 'cp-tab-visible' : ''}`}>
      <p className="cp-typewriter-text">{typed}<span className="cp-cursor">|</span></p>
    </div>
  )
}


// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function ClassesPage() {
  // Alapból az első class van kiválasztva (hogy ne legyen üres az oldal)
  const [selected, setSelected] = useState(classesData[0])
  const [activeTab, setActiveTab] = useState('Equipment')

  // Fül váltás nullázása, ha új classt választasz
  useEffect(() => {
    setActiveTab('Equipment')
  }, [selected.id])

  useEffect(() => {
    classesData.forEach((cls) => {
      const bgImg = new Image()
      bgImg.src = cls.bgImg
      
      const charImg = new Image()
      charImg.src = cls.img
    })
  }, [])

  return (
    <div className="cp-wrapper">
      
      {/* 2. ÚJ RÉSZ: HÁTTÉRKÉP RÉTEGEK */}
      {/* Az összes kép bekerül a DOM-ba, de csak az aktív lesz látható */}
      {classesData.map((cls) => (
        <div
          key={`bg-${cls.id}`}
          className={`cp-bg-layer ${selected.id === cls.id ? 'active' : ''}`}
          style={{ backgroundImage: `url(${cls.bgImg})` }}
        />
      ))}

      {/* Sötétítő réteg a háttérképen */}
      <div className="cp-bg-overlay" />

      {/* ─── KÖZÉPSŐ TARTALOM (Szövegek + Nagy Kép) INNEN MARAD MINDEN A RÉGI ─── */}
      <div className="cp-main" key={selected.id}>
        
        {/* BAL OLDAL - Szöveg és Tabok */}
        <div className="cp-left">
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
          
          <div className="cp-tabs">
            {TABS.map((tab) => (
              <button
                key={tab}
                className={`cp-tab-btn ${activeTab === tab ? 'cp-tab-btn--active' : ''}`}
                style={{ '--class-color': selected.color }}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="cp-tab-wrap">
            <TabContent cls={selected} tab={activeTab} />
          </div>
        </div>

        {/* JOBB OLDAL - Nagy karakter kép */}
        <div className="cp-right">
          <img src={selected.img} alt={selected.name} className="cp-large-img" />
        </div>
      </div>

      {/* ─── ALSÓ SZALAG (Ribbon) ─── */}
      <div className="cp-ribbon-container">
        <div className="cp-ribbon">
          {classesData.map(cls => (
            <div 
              key={cls.id}
              className={`cp-ribbon-card ${selected.id === cls.id ? 'active' : ''}`}
              onClick={() => setSelected(cls)}
              style={{ '--cls-color': cls.color }}
            >
              <img src={cls.img} alt={cls.name} />
              <span className="cp-ribbon-name">{cls.name}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}