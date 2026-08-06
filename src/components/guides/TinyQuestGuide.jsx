// src/components/guides/TinyQuestGuide.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TinyQuestGuide.module.css';
import SectionDivider from '../common/SectionDivider';

// Ally data derived from the transcript
const ALLIES = [
  {
    id: 'trudgina',
    name: 'Tiny Trudgina',
    tier: 'Best in Slot Light',
    icon: '/allies/trudgina.png', // Placeholder: Image expected here
    baseLight: 450,
    maxLight: 563,
    baseDamage: '10%',
    maxDamage: '11%',
    perk: 'Extra Experience Gain + High Light',
    description: 'Obtainable from the Tiny Treasure Team pack or by crafting. Currently provides the highest Light stat in the game at level 30.',
    color: '#38bdf8'
  },
  {
    id: 'vivian',
    name: 'Vivian',
    tier: 'Former Max Light',
    icon: '/allies/vivian.png', // Placeholder: Image expected here
    baseLight: 450,
    maxLight: 563,
    baseDamage: '10%',
    maxDamage: '11%',
    perk: 'Physical & Magic Damage Boost',
    description: 'Previously offered the top Light stat before the update. As you level it up, both Light and damage scale steadily.',
    color: '#c084fc'
  },
  {
    id: 'scorpius',
    name: 'Scorpius',
    tier: 'Max Damage Scaling',
    icon: '/allies/scorpius.png', // Placeholder: Image expected here
    baseLight: 400, // Frissítve a helyes alap értékre
    maxLight: 400,  // Frissítve 400 Light-ra!
    baseDamage: '25%',
    maxDamage: '29%',
    perk: 'Massive Raw Damage Increase',
    description: 'A powerful damage-oriented ally that also grants up to 400 Light stat at level 30 alongside its 29% physical and magic damage boost.',
    color: '#f59e0b'
  }
];

export default function TinyQuestGuide() {
  const [selectedAlly, setSelectedAlly] = useState(ALLIES[0]);
  const [currentLevel, setCurrentLevel] = useState(30);

  // State a Lightbox felugró ablaknak
  const [activeLightboxImage, setActiveLightboxImage] = useState(null);

  // Dynamic stat computation for the slider (simulates stat jumps roughly every 5 levels)
  const calculatedLight = Math.round(
    selectedAlly.baseLight + ((selectedAlly.maxLight - selectedAlly.baseLight) * (currentLevel / 30))
  );

  return (
    <div className={styles.guideWrapper}>
      
      {/* HERO HEADER SECTION */}
      <header className={styles.heroSection}>
        <div className={styles.imageContainer}>
          <img 
            src="/guideimages/maxresdefault.webp" 
            alt="Trove Tiny Quest Update Thumbnail Banner" 
            className={styles.heroBanner}
          />
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroContent}>
          <span className={styles.badge}>Tiny Quest Update Guide</span>
          <h1 className={styles.mainTitle}>Tiny Quest & Ally Mastery Guide</h1>
          <p className={styles.subTitle}>
            Everything you need to know about the Tiny Quest update, leveling allies to level 30, expedition mechanics, and optimal progression routes.
          </p>
        </div>
      </header>

      {/* SECTION 1: ALLY LEVELING & STAT SCALER */}
      <section className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionStep}>01</span>
          <h2 className={styles.sectionTitle}>Level 30 Allies & Stat Scaling</h2>
          <p className={styles.sectionDesc}>
            Allies can now be leveled up from Level 1 all the way to Level 30 (around 65,000 total XP). Noticeable stat increases trigger every 5 levels.
          </p>
        </div>

        <div className={styles.scalerGrid}>
          
          {/* LEFT COLUMN: INTERACTIVE STAT SLIDER */}
          <div className={styles.interactiveCard}>
            <div className={styles.cardHeader}>
              <h3>Ally Level Simulator</h3>
              <span className={styles.levelBadge} style={{ backgroundColor: selectedAlly.color }}>
                LVL {currentLevel} / 30
              </span>
            </div>

            <div className={styles.allySelector}>
              {ALLIES.map((ally) => (
                <button
                  key={ally.id}
                  className={`${styles.allyTab} ${selectedAlly.id === ally.id ? styles.activeTab : ''}`}
                  onClick={() => setSelectedAlly(ally)}
                >
                  {ally.name}
                </button>
              ))}
            </div>

            {/* Level Slider */}
            <div className={styles.sliderControl}>
              <label>Adjust Ally Level: <strong>Level {currentLevel}</strong></label>
              <input 
                type="range" 
                min="1" 
                max="30" 
                value={currentLevel} 
                onChange={(e) => setCurrentLevel(Number(e.target.value))}
                className={styles.rangeInput}
              />
              <div className={styles.sliderTicks}>
                <span>Lvl 1 (0 XP)</span>
                <span>Lvl 15</span>
                <span>Lvl 30 (MAX)</span>
              </div>
            </div>

            {/* Calculated Stats Display */}
            <div className={styles.statPreviewGrid}>
              <div className={styles.statBox}>
                <span className={styles.statLabel}>Light after maxing</span>
                <span className={styles.statValue} style={{ color: selectedAlly.color }}>
                  +{calculatedLight}
                </span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statLabel}>Damage Boost</span>
                <span className={styles.statValue}>
                  {currentLevel === 30 ? selectedAlly.maxDamage : selectedAlly.baseDamage}
                </span>
              </div>
            </div>

            <p className={styles.allyPerkText}>
              <strong>Special Perk:</strong> {selectedAlly.perk}
            </p>
          </div>

          {/* RIGHT COLUMN: ALLY COMPARISON CARDS */}
          <div className={styles.allyCardsColumn}>
            {ALLIES.map((ally) => (
              <div 
                key={ally.id} 
                className={`${styles.allyInfoCard} ${selectedAlly.id === ally.id ? styles.selectedCard : ''}`}
                onClick={() => setSelectedAlly(ally)}
              >
                <div className={styles.allyIconWrapper}>
                  {/* IMAGE PLACEHOLDER */}
                  <img 
                    src={ally.icon} 
                    alt={`[Image Placeholder: ${ally.name} Ally Icon]`} 
                    className={styles.allyImg}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className={styles.fallbackIcon} style={{ borderColor: ally.color }}>
                    {ally.name.charAt(0)}
                  </div>
                </div>

                <div className={styles.allyDetails}>
                  <div className={styles.allyTitleRow}>
                    <h4 className={styles.allyName}>{ally.name}</h4>
                    <span className={styles.tierTag} style={{ color: ally.color, borderColor: ally.color }}>
                      {ally.tier}
                    </span>
                  </div>
                  <p className={styles.allyDesc}>{ally.description}</p>
                  <div className={styles.maxStatsRow}>
                    <span>Max Light: <strong>{ally.maxLight || 'N/A'}</strong></span>
                    <span>Max Dmg: <strong>{ally.maxDamage}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 2: EXPEDITION MECHANICS & VOUCHER STRATEGY */}
      <motion.section 
        className={styles.sectionContainer}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <SectionDivider />
        <div className={styles.sectionHeader}>
          <span className={styles.sectionStep}>02</span>
          <h2 className={styles.sectionTitle}>Expedition Mechanics & Voucher Strategy</h2>
          <p className={styles.sectionDesc}>
            Understand how expedition slots work, why breaking chests can ruin your interact prompt, and how to convert unwanted long timers into key vouchers.
          </p>
        </div>

        <div className={styles.mechanicsGrid}>
          {/* CARD 1 */}
          <div className={styles.mechanicCard}>
            <div className={styles.mechanicHeader}>
              <span className={styles.mechanicNum}>01</span>
              <h4>Dungeon Spawns & Chest Tip</h4>
            </div>
            <p className={styles.mechanicText}>
              After completing a dungeon, a quest station spawns. Avoid breaking the loot chest right away, as scattered loot makes it much harder to press your interact key (`E`).
            </p>
            {/* CARD 1 IMAGE BOX WITH EXPAND */}
            <div 
              className={styles.imagePlaceholderBox}
              onClick={() => setActiveLightboxImage({ src: '/questimg/station.png', alt: 'Quest Station Spawn' })}
            >
              <img 
                src="/questimg/station.png" 
                alt="Quest Station Spawn"
                className={styles.mechanicImg}
                onError={(e) => { 
                  e.target.style.display = 'none'; 
                  e.target.nextElementSibling.style.display = 'flex'; 
                }} 
              />
              <span className={styles.placeholderLabel} style={{ display: 'none' }}>
                [Image Placeholder: Quest Station Interact]
              </span>
              <div className={styles.expandIconWrapper}>
                <img src="/icons/questexpand.png" alt="Expand Image" className={styles.expandIcon} />
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className={styles.mechanicCard}>
            <div className={styles.mechanicHeader}>
              <span className={styles.mechanicNum}>02</span>
              <h4>3 Max Expedition Limit</h4>
            </div>
            <p className={styles.mechanicText}>
              You can only run up to 3 active expeditions simultaneously. Timers continue ticking down in real time even if you log out or close Trove.
            </p>
            <div className={styles.badgeRow}>
              <span className={styles.infoBadge}>Max Active: 3 Allies</span>
              <span className={styles.infoBadge}>Offline Progress: YES</span>
            </div>
          </div>

          {/* CARD 3 */}
          <div className={styles.mechanicCard}>
            <div className={styles.mechanicHeader}>
              <span className={styles.mechanicNum}>03</span>
              <h4>"Get Voucher" Skip Method</h4>
            </div>
            <p className={styles.mechanicText}>
              If a quest features an excessively long timer, skip it by selecting "Get Voucher Instead". Accumulating 100 vouchers allows you to craft a <strong>Simple Tiny Key</strong>.
            </p>
            {/* CARD 3 IMAGE BOX WITH EXPAND */}
            <div 
              className={styles.imagePlaceholderBox}
              onClick={() => setActiveLightboxImage({ src: '/questimg/voucher.png', alt: 'Get Voucher Instead Button' })}
            >
              <img 
                src="/questimg/voucher.png" 
                alt="Get Voucher Instead Button"
                className={styles.mechanicImg}
                onError={(e) => { 
                  e.target.style.display = 'none'; 
                  e.target.nextElementSibling.style.display = 'flex'; 
                }} 
              />
              <span className={styles.placeholderLabel} style={{ display: 'none' }}>
                [Image Placeholder: Get Voucher Option]
              </span>
              <div className={styles.expandIconWrapper}>
                <img src="/icons/questexpand.png" alt="Expand Image" className={styles.expandIcon} />
              </div>
            </div>
          </div>

          {/* CARD 4 */}
          <div className={styles.mechanicCard}>
            <div className={styles.mechanicHeader}>
              <span className={styles.mechanicNum}>04</span>
              <h4>Insta-Complete Token Usage</h4>
            </div>
            <p className={styles.mechanicText}>
              Shorter timers require significantly fewer Insta-Complete Tokens. Reserve tokens strictly for quests under 20–25 minutes to stretch your resources.
            </p>
            <div className={styles.tipBox}>
              <strong>Pro Tip:</strong> As the natural timer gets closer to 0, the token cost dynamically drops!
            </div>
          </div>
        </div>
      </motion.section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeLightboxImage && (
          <motion.div 
            className={styles.lightboxOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxImage(null)}
          >
            <motion.div 
              className={styles.lightboxContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.lightboxCloseBtn}
                onClick={() => setActiveLightboxImage(null)}
              >
                ✕
              </button>
              <img 
                src={activeLightboxImage.src} 
                alt={activeLightboxImage.alt} 
                className={styles.lightboxImg}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}