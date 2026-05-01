import React, { useState } from 'react';
import './ClassesPage.css';

const classesData = [
  { 
    id: 1, 
    name: "Vanguardian", 
    img: "/classes/Trove-Class-Vanguardian.webp",
    bgImg: "/classbg/Gemini_Generated_Image_5ipegp5ipegp5ipef.png",
    details: {
      Gems: "Focus on Physical Damage, Critical Hit, and Critical Damage. For Cosmic Gems, aim for 3 pearls into Light.",
      Abilities: "Switch between Melee and Ranged modes. Use 'Touchdown' to deal massive AoE damage and 'Hero's Charge' for mobility.",
      "How to use": "Vanguardian is a versatile fighter. Start with Force Flash for a speed boost, then dive in with Touchdown to crush groups of enemies.",
      Equipment: [
        { slot: "Allies", text: "Berserker / Scorpius" },
        { slot: "Emblems", text: "Martial Emblem / Trailblazing" },
        { slot: "Banner", text: "Enshadowed Torch of Knotted Shadow" },
        { slot: "Flask", text: "Death-Defying Vial" },
        { slot: "Subclass", text: "Knight (for movement speed and flasks)" },
        { slot: "Gems", text: "Berserk Battler / Pyrodisc / Vampiric Vanquisher" }
      ]
    }
  },
  { 
    id: 2, 
    name: "Dino Tamer", 
    img: "/classes/Trove-Class-Dino-Tamer.webp",
    bgImg: "/classbg/2016-10-01_160508.png",
    details: {
      Gems: "Physical Damage and Critical stats are key. Dino Tamer relies on high damage during the Ultimate transformation.",
      Abilities: "Uses Hunting Nets to root enemies and Dino Buddies to distract them. The Ultimate 'Dino Mount' grants huge buffs.",
      "How to use": "Throw nets constantly to keep enemies in place while your summons deal damage. Keep your Ultimate active as much as possible.",
      Equipment: [
        { slot: "Allies", text: "Rapt" },
        { slot: "Emblems", text: "Martial Emblem / Trailblazing" },
        { slot: "Banner", text: "Enshadowed Torch of the Hive" },
        { slot: "Flask", text: "Death-Defying Vial" },
        { slot: "Subclass", text: "Knight or Lunar Lancer" },
        { slot: "Gems", text: "Class Gem is mandatory for multi-nets" }
      ]
    }
  },
  { 
    id: 3, 
    name: "Chloromancer", 
    img: "/classes/Trove-Class-Chloromancer.webp",
    bgImg: "/classbg/trove-biome-1-medieval-highlands.png",
    details: {
      Gems: "Magic Damage and Critical stats. Chloromancer is a hybrid damage/support class.",
      Abilities: "Basic attacks heal plants and allies. Leafy Lashers slow enemies, and Blooming Pollinators deal burst damage.",
      "How to use": "Spam your leafy lashers to create a field of CC. Use your basic attack to accelerate plant growth and heal your team.",
      Equipment: [
        { slot: "Allies", text: "Prefect Penguin or Chronomancer Qubesly" },
        { slot: "Emblems", text: "Arcane & Chronomantic Emblem" },
        { slot: "Banner", text: "Magic Damage / Light Banner" },
        { slot: "Flask", text: "Death-Defying Vial" },
        { slot: "Subclass", text: "Knight or Bard" },
        { slot: "Gems", text: "Class Gem for Empowered Growth" }
      ]
    }
  },
  { 
    id: 4, 
    name: "Revenant", 
    img: "/classes/Trove-Class-Revenant.webp",
    bgImg: "/classbg/Gemini_Generated_Image_a6f5ofa6f5ofa6f5.png",
    details: {
      Gems: "Physical Damage and Max Health. Revenant uses health to power abilities, so high HP is vital.",
      Abilities: "Spirit Spears deal damage over time. Spirit Storm pulls enemies in and heals the Revenant.",
      "How to use": "A true tank. Dive into the middle of enemies, activate Spirit Storm to grouping them, and poke them down with spears.",
      Equipment: [
        { slot: "Allies", text: "Puck or Rapt" },
        { slot: "Emblems", text: "Martial & Vampiric Emblem" },
        { slot: "Banner", text: "U11 Physical Damage Banner" },
        { slot: "Flask", text: "Death-Defying Vial" },
        { slot: "Subclass", text: "Candy Barbarian or Knight" },
        { slot: "Gems", text: "Class Gem for Aegis of Death" }
      ]
    }
  },
  { 
    id: 5, 
    name: "Lunar Lancer", 
    img: "/classes/Trove-Class-Lunar-Lancer.webp",
    bgImg: "/classbg/yx9KNkl.png",
    details: {
      Gems: "Physical Damage and Critical stats. Lunar Lancer excels at burst damage in Lunatic form.",
      Abilities: "Grappling Spear for mobility and Crescent Combo for massive AoE stun and damage.",
      "How to use": "Use Grappling Spear to fly through dungeons. When fighting, use Crescent Combo to keep enemies stunned.",
      Equipment: [
        { slot: "Allies", text: "Rapt" },
        { slot: "Emblems", text: "Martial & Beamer Emblem" },
        { slot: "Banner", text: "Enshadowed Torch of the Hive" },
        { slot: "Flask", text: "Death-Defying Vial" },
        { slot: "Subclass", text: "Knight" },
        { slot: "Gems", text: "Class Gem for Shadow Lancer" }
      ]
    }
  },
  { 
    id: 6, 
    name: "Tomb Raiser", 
    img: "/classes/Trove-Class-Tomb-Raiser.webp",
    bgImg: "/classbg/trove-biome-3-cursed-vale.png",
    details: {
      Gems: "Magic Damage and Critical Damage. Health is also important for minion survivability.",
      Abilities: "Summon Bonetourage minions and combine them into a massive Grave Goliath.",
      "How to use": "Keep your Banshee's Boon active to stay alive and heal your minions. Sacrifice them for a Goliath when facing bosses.",
      Equipment: [
        { slot: "Allies", text: "Chronomancer Qubesly" },
        { slot: "Emblems", text: "Arcane & Vampiric Emblem" },
        { slot: "Banner", text: "Magic Damage / Light Banner" },
        { slot: "Flask", text: "Death-Defying Vial" },
        { slot: "Subclass", text: "Knight" },
        { slot: "Gems", text: "Class Gem for extra minions" }
      ]
    }
  },
  { 
    id: 7, 
    name: "Boomeranger", 
    img: "/classes/Trove-Class-Boomeranger.webp",
    bgImg: "/classbg/Fgr9l24.png",
    details: {
      Gems: "Physical Damage and Critical stats. Boomeranger is an RNG-heavy, fun burst class.",
      Abilities: "Throw Boomerangs to reduce cooldowns. Mysterious Urn grants random buffs like chickens or bombs.",
      "How to use": "Always catch your boomerang! It's the key to spamming your abilities and keeping your chicken army alive.",
      Equipment: [
        { slot: "Allies", text: "Rapt" },
        { slot: "Emblems", text: "Martial & Beamer Emblem" },
        { slot: "Banner", text: "U11 Physical Banner" },
        { slot: "Flask", text: "Death-Defying Vial" },
        { slot: "Subclass", text: "Knight" },
        { slot: "Gems", text: "Class Gem for Bawk-Bomb chickens" }
      ]
    }
  },
  { 
    id: 8, 
    name: "Ice Sage", 
    img: "/classes/Trove-Class-Ice-Sage.webp",
    bgImg: "/classbg/Fsc7ngB.png",
    details: {
      Gems: "Magic Damage and Critical Damage. Ice Sage is a top-tier farmer and boss killer.",
      Abilities: "Ice Crash drops icicles from the sky. Frozen Ward protects and buffs attack speed.",
      "How to use": "Keep Frozen Ward active at all times. Use your Ultimate 'The Big Chill' to freeze time and shred bosses.",
      Equipment: [
        { slot: "Allies", text: "Prefect Penguin" },
        { slot: "Emblems", text: "Arcane & Chronomantic Emblem" },
        { slot: "Banner", text: "U11 Magic Damage Banner" },
        { slot: "Flask", text: "Death-Defying Vial" },
        { slot: "Subclass", text: "Knight" },
        { slot: "Gems", text: "Class Gem for Pain Freeze" }
      ]
    }
  },
  { 
    id: 9, 
    name: "Shadow Hunter", 
    img: "/classes/Trove-Class-Shadow-Hunter.webp",
    bgImg: "/classbg/TqVhomw.png",
    details: {
      Gems: "Physical Damage and Critical Damage. Attack speed is provided by the Class Gem.",
      Abilities: "Sun Snare stuns enemies. Radiant Arrow can shoot through walls and deal massive damage.",
      "How to use": "Once you have the Class Gem, your basic attack becomes a machine gun. Just hold left click and win.",
      Equipment: [
        { slot: "Allies", text: "Rapt" },
        { slot: "Emblems", text: "Martial & Beamer Emblem" },
        { slot: "Banner", text: "Enshadowed Torch" },
        { slot: "Flask", text: "Death-Defying Vial" },
        { slot: "Subclass", text: "Knight" },
        { slot: "Gems", text: "Class Gem (Mandatory for rapid fire)" }
      ]
    }
  },
  { 
    id: 10, 
    name: "Candy Barbarian", 
    img: "/classes/Trove-Class-Candy-Barbarian.webp",
    bgImg: "/classbg/Trove_Screenshot_2026.04.11_-_03.44.48.62.png",
    details: {
      Gems: "Physical Damage and Max Health. A tanky support that drops candy for the team.",
      Abilities: "Vanilla Swirlwind pulls enemies in. Eis-Crom Cone heals and buffs allies.",
      "How to use": "Spam Swirlwind to keep enemies grouped. Use Sugar Crash for mobility and pick up candies for attack speed buffs.",
      Equipment: [
        { slot: "Allies", text: "Rapt" },
        { slot: "Emblems", text: "Martial & Vampiric Emblem" },
        { slot: "Banner", text: "U11 Physical Banner" },
        { slot: "Flask", text: "Death-Defying Vial" },
        { slot: "Subclass", text: "Knight" },
        { slot: "Gems", text: "Class Gem for Scoop n' Gloop" }
      ]
    }
  },
  { 
    id: 11, 
    name: "Dracolyte", 
    img: "/classes/Trove-Class-Dracolyte.webp",
    bgImg: "/classbg/trove-biome-10-dragonfire-peaks.png",
    details: {
      Gems: "Magic Damage and Max Health. Dracolyte is a close-range mage who thrives in lava.",
      Abilities: "Summon Burnt Offerings (bombs) and detonate them. Transform into a Dragon for major buffs.",
      "How to use": "Drop bombs constantly while attacking with your flamethrower. Use your Ultimate when facing hordes.",
      Equipment: [
        { slot: "Allies", text: "Chronomancer Qubesly" },
        { slot: "Emblems", text: "Arcane & Vampiric Emblem" },
        { slot: "Banner", text: "Magic Damage / Light" },
        { slot: "Flask", text: "Death-Defying Vial" },
        { slot: "Subclass", text: "Knight" },
        { slot: "Gems", text: "Class Gem for extra dragon minions" }
      ]
    }
  },
  { 
    id: 12, 
    name: "Neon Ninja", 
    img: "/classes/Trove-Class-Neon-Ninja.webp",
    bgImg: "/classbg/Luminopolis.png",
    details: {
      Gems: "Physical Damage and Critical Damage. High movement speed is essential for this class.",
      Abilities: "Shadow Flip for stealth and speed. Stasis Blade for crowd control and throwing stars.",
      "How to use": "Attack three times to charge your stars, then Shadow Flip and throw them to deal critical damage from afar.",
      Equipment: [
        { slot: "Allies", text: "Rapt Berserk Battler" },
        { slot: "Emblems", text: "Martial & Trailblazing Emblem" },
        { slot: "Banner", text: "Movement Speed / Physical Banner" },
        { slot: "Flask", text: "Death-Defying Vial" },
        { slot: "Subclass", text: "Knight" },
        { slot: "Gems", text: "Class Gem for Hepta-Force stars" }
      ]
    }
  },
  { 
    id: 13, 
    name: "Gunslinger", 
    img: "/classes/Trove-Class-Gun-Slinger.webp",
    bgImg: "/classbg/WULhg74.png",
    details: {
      Gems: "Magic Damage and Critical stats. Gunslinger is the king of vertical combat.",
      Abilities: "Blast Jump to stay in the air. Run and Gun increases attack speed and mobility.",
      "How to use": "Stay airborne! Hold your jump button and use Run and Gun to rain down charged shots on enemies.",
      Equipment: [
        { slot: "Allies", text: "Chronomancer Qubesly" },
        { slot: "Emblems", text: "Arcane & Beamer Emblem" },
        { slot: "Banner", text: "Magic Damage / Light" },
        { slot: "Flask", text: "Death-Defying Vial" },
        { slot: "Subclass", text: "Knight" },
        { slot: "Gems", text: "Class Gem (Mandatory for aerial superiority)" }
      ]
    }
  },
  { 
    id: 14, 
    name: "Knight", 
    img: "/classes/Trove-Class-Knight.webp",
    bgImg: "/classbg/Trove-wallpaper-1.jpg",
    details: {
      Gems: "Physical Damage and Health. Knight is a classic, sturdy melee class.",
      Abilities: "Charge to close gaps. Iron Will grants invulnerability and heals the Knight.",
      "How to use": "Charge into battle and use Smash to taunt enemies. Use Iron Will when your health is low to survive anything.",
      Equipment: [
        { slot: "Allies", text: "Rapt Berserk Battler" },
        { slot: "Emblems", text: "Martial & Vampiric Emblem" },
        { slot: "Banner", text: "U11 Physical Banner" },
        { slot: "Flask", text: "Death-Defying Vial" },
        { slot: "Subclass", text: "Lunar Lancer (for extra damage)" },
        { slot: "Gems", text: "Class Gem for Overcharge" }
      ]
    }
  },
  { 
    id: 15, 
    name: "Fae Trickster", 
    img: "/classes/Trove-Class-Fae-Trickster.webp",
    bgImg: "/classbg/ONLM28j.png",
    details: {
      Gems: "Magic Damage and Critical Damage. Avoid Health, focus on pure damage.",
      Abilities: "Blink to leave decoys. Faerie Dance summons staves that attack for you.",
      "How to use": "Never stop blinking! Your passive deals massive damage only if you haven't been hit recently.",
      Equipment: [
        { slot: "Allies", text: "Chronomancer Qubesly" },
        { slot: "Emblems", text: "Arcane & Beamer Emblem" },
        { slot: "Banner", text: "U11 Magic Banner" },
        { slot: "Flask", text: "Death-Defying Vial" },
        { slot: "Subclass", text: "Knight" },
        { slot: "Gems", text: "Class Gem for Faerie Force" }
      ]
    }
  },
  { 
    id: 16, 
    name: "Pirate Captain", 
    img: "/classes/Trove-Class-Pirate-Captain.webp",
    bgImg: "/classbg/NCSmFCd.png",
    details: {
      Gems: "Magic Damage and Critical stats. Pirate Captain is a turret-based damage powerhouse.",
      Abilities: "First Mate turret shoots enemies. Man o' War deals huge AoE damage.",
      "How to use": "Throw your First Mate and collect doubloons to upgrade it. Use Pretend Pirate to distract foes while you fire.",
      Equipment: [
        { slot: "Allies", text: "Chronomancer Qubesly" },
        { slot: "Emblems", text: "Arcane & Chronomantic Emblem" },
        { slot: "Banner", text: "Magic Damage / Light" },
        { slot: "Flask", text: "Death-Defying Vial" },
        { slot: "Subclass", text: "Knight" },
        { slot: "Gems", text: "Class Gem for First Mate upgrades" }
      ]
    }
  },
  { 
    id: 17, 
    name: "Bard", 
    img: "/classes/Trove-Class-Bard.webp",
    bgImg: "/classbg/92J4wsh.png",
    details: {
      Gems: "Magic Damage and Critical stats. Bard is the ultimate team-buffing class.",
      Abilities: "Songs provide buffs like speed, health, and damage. Backflip grants invulnerability.",
      "How to use": "Maintain your songs! Use Jubilant Song for farming speed and Battle Song for boss shredding.",
      Equipment: [
        { slot: "Allies", text: "Prefect Penguin" },
        { slot: "Emblems", text: "Arcane & Zealous Emblem" },
        { slot: "Banner", text: "U11 Magic Banner" },
        { slot: "Flask", text: "Death-Defying Vial" },
        { slot: "Subclass", text: "Knight or Lunar Lancer" },
        { slot: "Gems", text: "Class Gem for Jubilant Song buffs" }
      ]
    }
  },
  { 
    id: 18, 
    name: "Solarion", 
    img: "/classes/Trove-Class-Solarion.webp",
    bgImg: "/classbg/trovepediabg.png",
    details: {
      Gems: "Physical Damage and Critical stats. Solarion is currently one of the strongest damage dealers.",
      Abilities: "Phoenix Dive to heal and attack. Solar Flare for continuous burning damage.",
      "How to use": "Keep your phoenix alive! Use Guiding Light to shred enemy resistances and burn everything in sight.",
      Equipment: [
        { slot: "Allies", text: "Rapt Berserk Battler" },
        { slot: "Emblems", text: "Martial & Beamer Emblem" },
        { slot: "Banner", text: "U11 Physical Damage Banner" },
        { slot: "Flask", text: "Death-Defying Vial" },
        { slot: "Subclass", text: "Knight" },
        { slot: "Gems", text: "Class Gem for Solar Flare burn" }
      ]
    }
  }
];

const ClassesPage = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [activeTab, setActiveTab] = useState('Gems');
  const [isClosing, setIsClosing] = useState(false);
  const equipmentSlots = ["Allies", "Emblems", "Banner", "Flask", "Subclass", "Gems"];
  const Icon = ({ name, size = 20, className = "" }) => (
  <div 
    className={`ui-icon ${className}`}
    style={{ 
      width: `${size}px`, 
      height: `${size}px`, 
      backgroundImage: `url(/icons/${name}.png)`, // Feltételezve, hogy a public/icons mappában vannak
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      display: 'inline-flex'
    }}
  />
);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedClass(null);
      setIsClosing(false);
      setActiveTab('Gems');
    }, 300);
  };

  return (
    <div className="classes-wrapper">
            <header className="classes-header">
        <h1 className="slide-in-left">Trove Classes</h1>
        <p className="slide-in-right">
          On this page you can explore all of Trove's classes, from the classic Knight to the latest Solarion. <br />Click on any class card to dive into detailed information about their abilities, gems, and optimal equipment setups.
        </p>
      </header>

      <div className="classes-grid">
        {classesData.map((item, index) => (
          <div 
            key={item.id} 
            className="class-card" 
            style={{ animationDelay: `${0.08 * index}s` }}
            onClick={() => setSelectedClass(item)}
          >
            <div 
              className="class-card-bg" 
              style={{ backgroundImage: `url(${item.bgImg})` }}
            ></div>

            <div className="class-content">
              <img src={item.img} alt={item.name} className="class-img" />
              <div className="class-name-overlay">
                <span>{item.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedClass && (
        <div 
          className={`modal-overlay ${isClosing ? 'is-closing' : 'is-open'}`} 
          onClick={closeModal}
        >
          <div 
            className={`modal-box ${isClosing ? 'is-closing' : 'is-open'}`} 
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>
              <img src="/icons/icons8-close-80.png" alt="close" />
            </button>

            <div className="modal-body">
              <div className="modal-left">
                <img src={selectedClass.img} alt={selectedClass.name} className="modal-char-img" />
              </div>

              <div className="modal-right">
                <h2 className="modal-title">{selectedClass.name}</h2>
                
                <div className="modal-tabs">
                  {['Gems', 'Abilities', 'How to use', 'Equipment'].map((tab) => (
                    <button 
                      key={tab}
                      className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="tab-content-area" key={activeTab}>
                  {activeTab === 'Equipment' ? (
                    <div className="equipment-grid">
                    {selectedClass.details?.Equipment.map((slotData, i) => (
                        <div key={i} className="equip-box">
                        <h3>{slotData.slot}</h3>
                        <p>
                            {/* Ikon span-ként */}
                            <span className="icon-box-equipment"></span>
                            {/* Szöveg span-ként */}
                            <span>{slotData.text}</span>
                        </p>
                        </div>
                    ))}
                    </div>
                  ) : (
                    <div className="generic-tab-text">
                      <h3>{activeTab}</h3>
                      <p>{selectedClass.details?.[activeTab] || "Content coming soon..."}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassesPage;