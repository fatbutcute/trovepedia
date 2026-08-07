// src/components/guides/TinyQuestGuide.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TinyQuestGuide.module.css';
import SectionDivider from '../common/SectionDivider';

// ◄ A GEMS GUIDE-BÓL MÁSOLT PONTOS VARIÁNS ÉS BEÁLLÍTÁSOK
const scrollFadeInVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
  }
};

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
      <motion.header 
        className={styles.heroSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.imageContainer}>
          <img 
            src="/guideimages/maxresdefault.webp" 
            alt="Trove Tiny Quest Update Thumbnail Banner" 
            className={styles.heroBanner}
          />
          <div className={styles.heroOverlay} />

          {/* CREDIT BADGE A JOBB FELSŐ SAROKBAN */}
          <div className={styles.creditBadge}>
            Guide content by:{' '}
            <a 
              href="https://www.youtube.com/@CashinClean" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.creditLink}
            >
              CashinClean
            </a>
          </div>
        </div>

        <div className={styles.heroContent}>
          <span className={styles.badge}>Tiny Quest Update Guide</span>
          <h1 className={styles.mainTitle}>Tiny Quest & Ally Mastery Guide</h1>
          <p className={styles.subTitle}>
            Everything you need to know about the Tiny Quest update, leveling allies to level 30, expedition mechanics, and optimal progression routes.
          </p>
        </div>
      </motion.header>

      {/* SECTION 1: ALLY LEVELING & STAT SCALER (Most már pontosan mint a Gems Guide!) */}
      <motion.section 
        className={styles.sectionContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={scrollFadeInVariants}
      >
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
      </motion.section>

      {/* SECTION 2: EXPEDITION MECHANICS & VOUCHER STRATEGY (Ugyanaz a scrollFadeInVariants!) */}
      <motion.section 
        className={styles.sectionContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={scrollFadeInVariants}
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
              You can only run up to 3 (eventually 6 when you get the expanders) active expeditions simultaneously. Timers continue ticking down in real time even if you log out or close Trove.
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
              <strong>Note:</strong> As the natural timer gets closer to 0, the token cost dynamically drops!
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 3: LEVELING ROUTE & WORLD PROGRESSION CHART */}
      <motion.section 
        className={styles.sectionContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={scrollFadeInVariants}
      >
        <SectionDivider />
        <div className={styles.sectionHeader}>
          <span className={styles.sectionStep}>03</span>
          <h2 className={styles.sectionTitle}>Leveling Route & World Progression</h2>
          <p className={styles.sectionDesc}>
            Maximize your Ally XP efficiency by completing quests in higher difficulty worlds. As you ascend tiers, expedition duration increases alongside XP rewards.
          </p>
        </div>

        {/* PROGRESSION TABLE */}
        <div className={styles.tableWrapper}>
          <table className={styles.progressionTable}>
            <thead>
              <tr>
                <th>World Difficulty</th>
                <th>Quest Tier</th>
                <th>Avg. Duration</th>
                <th>Ally XP Yield</th>
                <th>Recommended Strategy</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className={styles.worldTag} style={{ color: '#94a3b8' }}>Novice – Uber 5</span></td>
                <td>Tier 1–2</td>
                <td>5 – 15 Mins</td>
                <td>Low (100–300 XP)</td>
                <td>Fast cycles. Great for burning excess Insta-Complete Tokens.</td>
              </tr>
              <tr>
                <td><span className={styles.worldTag} style={{ color: '#38bdf8' }}>Uber 6 – Uber 9</span></td>
                <td>Tier 3–4</td>
                <td>30 Mins – 2 Hours</td>
                <td>Medium (500–1,200 XP)</td>
                <td>Balanced route for mid-game players pushing towards max level.</td>
              </tr>
              <tr>
                <td><span className={styles.worldTag} style={{ color: '#fbbf24' }}>Uber 10 – Uber 11</span></td>
                <td>Tier 5–6</td>
                <td>3 – 8 Hours</td>
                <td>High (2,000–5,000 XP)</td>
                <td>Set active before logging off to gain passive offline XP progress.</td>
              </tr>
              <tr>
                <td><span className={styles.worldTag} style={{ color: '#c084fc' }}>Uber 12 (Endgame)</span></td>
                <td>Max Tier</td>
                <td>12 – 24 Hours</td>
                <td>Massive (8,000+ XP)</td>
                <td>Best XP-to-quest ratio. Use "Get Voucher" if timers are too long.</td>
              </tr>
            </tbody>
          </table>
        </div>


        {/* STRATEGY CARDS */}
        <div className={styles.strategyGrid}>
          <div className={styles.strategyCard}>
            <h4>XP Scaling Mechanics</h4>
            <p>
              Allies require roughly <strong>65,000 total XP</strong> to reach level 30. Stat boosts scale progressively, with major power spikes occurring every 5 levels.
            </p>
          </div>

          <div className={styles.strategyCard}>
            <h4>Active vs. Offline Farming</h4>
            <p>
              Short quests (under 20 mins) are ideal for active play sessions. For long quests (8+ hours), queue them right before closing the game so timers tick while offline.
            </p>
          </div>
        </div>
      </motion.section>

      {/* SECTION 4: CRAFTING, KEY RECIPES & BENCHMARKS */}
      <motion.section 
        className={styles.sectionContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={scrollFadeInVariants}
      >
        <SectionDivider />
        <div className={styles.sectionHeader}>
          <span className={styles.sectionStep}>04</span>
          <h2 className={styles.sectionTitle}>Crafting & Key Recipes</h2>
          <p className={styles.sectionDesc}>
            Everything you need to craft at the Tiny Bench. Convert your saved Vouchers and materials into keys and frogs to unlock new allies and expedition rewards.
          </p>
        </div>

        {/* CRAFTING CARDS GRID */}
        <div className={styles.craftingGrid}>
          {/* RECIPE 1: SIMPLE TINY KEY */}
          <div className={styles.recipeCard}>
            <div className={styles.recipeHeader}>
              <span className={styles.recipeTag}>EXPEDITION KEY</span>
              <div className={styles.recipeTitleRow}>
                <h4>Simple Tiny Key</h4>
                <img 
                  src="/tinyquestkeys/tinykey.png" 
                  alt="Simple Tiny Key" 
                  className={styles.recipeHeaderIcon} 
                />
              </div>
            </div>
            <p className={styles.recipeDesc}>
              Used to open basic expedition reward caches and claim your earned rewards.
            </p>
            <div className={styles.ingredientList}>
              <div className={styles.ingredientItem}>
                <span>Vouchers Required</span>
                <strong>100x Expedition Vouchers</strong>
              </div>
            </div>
          </div>

          {/* RECIPE 2: GILDEN RANA */}
          <div className={styles.recipeCard}>
            <div className={styles.recipeHeader}>
              <span className={styles.recipeTag} style={{ color: '#c084fc', borderColor: '#c084fc' }}>ALLY CRAFTING</span>
              <div className={styles.recipeTitleRow}>
                <h4>Gilden Rana</h4>
                <img 
                  src="/tinyquestkeys/gildedrana.png" 
                  alt="Gilden Rana" 
                  className={styles.recipeHeaderIcon} 
                />
              </div>
            </div>
            <p className={styles.recipeDesc}>
              Special crafting material used as a core ingredient to craft new, powerful allies at the Tadpole Tours Kiosk.
            </p>
            <div className={styles.ingredientList}>
              <div className={styles.ingredientItem}>
                <span>Key Base</span>
                <strong>1x Simple Tiny Key</strong>
              </div>
              <div className={styles.ingredientItem}>
                <span>Bonus Material</span>
                <strong>Extra Rare Materials</strong>
              </div>
            </div>
          </div>
        </div>

        {/* BENCHMARK SUMMARY BOX */}
        <div className={styles.benchmarkBox}>
          <div className={styles.benchmarkHeader}>
            <span className={styles.benchmarkBadge}>SUMMARY</span>
            <h3>Key Takeaways & Endgame Goals</h3>
          </div>
          <ul className={styles.benchmarkList}>
            <li>
              <strong>Prioritize Light Allies:</strong> Get Tiny Trugina or Vivian to Level 30 first to max out your Light stat (563 Light ceiling).
            </li>
            <li>
              <strong>Always Keep 3 Slots Running:</strong> Never leave expedition slots empty. Let long timers tick down passively while offline.
            </li>
            <li>
              <strong>Voucher Optimization:</strong> Never waste time on low-value 12+ hour quests if you need quick keys — convert them directly into Vouchers!
            </li>
            <li>
              <strong>Token Discipline:</strong> Only use Insta-Complete Tokens when natural timers drop under 20 minutes to get maximum efficiency per token.
            </li>
          </ul>
        </div>
      </motion.section>

        {/* SECTION 05: HORIZONTAL SCROLL REVEAL (BEST WAY TO LEVEL YOUR ALLIES) */}
      <section className={styles.horizontalScrollSection}>
        <SectionDivider />
        <div className={styles.sectionHeader} style={{ padding: '0 1.5rem', maxWidth: '1350px', margin: '0 auto 2rem auto' }}>
          <span className={styles.sectionStep}>05</span>
          <h2 className={styles.sectionTitle}>Best Way to Level your Allies</h2>
          <p className={styles.sectionDesc}>
            Scroll down to sequentially reveal crucial ally progression mechanics and strategy field notes.
          </p>
        </div>

        {/* STICKY CONTAINER FOR HORIZONTAL REVEAL */}
        <HorizontalRevealGrid />
      </section>

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

/* ==========================================================================
   2X2 GRID SCROLL REVEAL COMPONENT WITH SMOOTH HOVER
   ========================================================================== */

const REVEAL_CARDS = [
  {
    id: 1,
    step: "01",
    category: "MECHANICS",
    title: "Expedition Slot Expansion (Max 6)",
    icon: "/icons/gears.png",
    description: "By default, you start with 3 active expedition slots. Acquire Expedition Slot Expanders to unlock up to 6 total slots!",
    highlight: "Note: Running 6 active slots simultaneously doubles your passive offline Ally XP generation."
  },
  {
    id: 2,
    step: "02",
    category: "RESETS",
    title: "Quest Station Spawn & Refresh",
    icon: "/icons/reset.png",
    description: "Quest stations spawn in dungeons after defeat. If a station offers undesirable quests or long timers, completing dungeons in different biomes cycles the available pool.",
    bullets: [
      "Timers tick down in real-time while offline.",
      "Token costs dynamically drop as natural timers decrease."
    ]
  },
  {
    id: 3,
    step: "03",
    category: "PROGRESSION",
    title: "Ally Leveling XP & Stat Scaling",
    icon: "/icons/lvlup.png",
    description: "Leveling an ally from Level 1 to 30 requires approximately 65,000 Total XP.",
    highlight: "Stat scaling isn't linear — major power spikes trigger every 5 levels (Lvl 5, 10, 15, 20, 25, 30)."
  },
  {
    id: 4,
    step: "04",
    category: "STRATEGY",
    title: "Optimal Voucher Conversion",
    icon: "/icons/voucher.png",
    description: "Always use 'Get Voucher Instead' on 12+ hour quests unless you plan to go offline for the night.",
    highlight: "100 Vouchers craft a Simple Tiny Key, which opens rewards immediately without waiting on long timers."
  }
];

function HorizontalRevealGrid() {
  return (
    <div className={styles.revealGridContainer}>
      {REVEAL_CARDS.map((card, index) => (
        <motion.div
          key={card.id}
          className={styles.revealCard}
          initial={{ opacity: 0, x: -40, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.6,
            delay: index * 0.12, // Lépcsőzetes reveal
            ease: [0.25, 1, 0.5, 1]
          }}
          whileHover={{ 
            y: -8, 
            transition: { duration: 0.25, ease: "easeOut" } 
          }}
        >
          <div className={styles.revealCardHeader}>
            <div className={styles.revealCardTitleGroup}>
              <span className={styles.revealStepBadge}>{card.step}</span>
              <span className={styles.revealCategory}>{card.category}</span>
            </div>
            <img src={card.icon} alt="" className={styles.revealIcon} />
          </div>

          <h3 className={styles.revealTitle}>{card.title}</h3>
          <p className={styles.revealDesc}>{card.description}</p>

          {card.highlight && (
            <div className={styles.revealHighlightBox}>
              {card.highlight}
            </div>
          )}

          {card.bullets && (
            <ul className={styles.revealBulletList}>
              {card.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          )}
        </motion.div>
      ))}
    </div>
  );
}