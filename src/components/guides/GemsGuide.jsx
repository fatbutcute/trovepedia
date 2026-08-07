// src/components/guides/GemsGuide.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './GemsGuide.module.css';
import GemTiersSection from './GemTiersSection';
import { GemsGuideDock } from "./GemsGuideDock";
import GemBasicsScrolly from './GemBasicsScrolly';
import SectionDivider from '../common/SectionDivider'; // ◄ ITT VOLT A HIÁNYZÓ IMPORT!

const scrollFadeInVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
  }
};

export default function GemsGuide() {
  const [activeTab, setActiveTab] = useState('empowered');

  return (
    <>
      {/* 1. FELSŐ KONTÉNER (Csak a Hero szekciónak) */}
      <div className={styles.container}>
        <motion.header 
          className={styles.hero}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className={styles.badge}>Endgame Progression</span>
          <h1 className={styles.title}>Maximize Gem Stats</h1>
          <p className={styles.description}>
            A complete walkthrough on optimizing your Empowered and Lesser Gems, rerolling stats, moving boosts, and augmenting to reach maximum Power Rank and Light.
          </p>
        </motion.header>
      </div>

      {/* 2. SCROLLYTELLING SZEKCIÓ */}
      <GemBasicsScrolly />

      {/* 3. ALSÓ KONTÉNER (A többi tartalomnak) */}
      <div className={styles.container} style={{ marginTop: '0' }}>
        
        {/* LESSER VS EMPOWERED GEMS SECTION (Áttéve a konténeren belülre) */}

        {/* Rerolling & Moving Stats */}
        <motion.section 
          className={styles.section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={scrollFadeInVariants}
        >
          <h2 className={styles.sectionTitle}>Rerolling & Moving Stats</h2>
          <div className={styles.grid}>
            <motion.div className={styles.card} whileHover={{ scale: 1.05}}>
              <div className={styles.cardHeader}>
                <span className={styles.stepNum}>01</span>
                <h3>Contained Chaos Spark</h3>
              </div>
              <p>
                Use Chaos Sparks at the Gem Forge to <strong>reroll undesirable stats</strong> into crucial attributes like <em>Light, Physical/Magic Damage, or Critical Damage</em>.
              </p>
            </motion.div>

            <motion.div className={styles.card} whileHover={{ scale: 1.05}}>
              <div className={styles.cardHeader}>
                <span className={styles.stepNum}>02</span>
                <h3>Contained Chaos Flare</h3>
              </div>
              <p>
                Use Chaos Flares to <strong>move stat boost procs</strong> (the small gems next to stats) to your most vital stat - ideally <em>Light</em> for Cosmics, or Damage/Crit Damage.
              </p>
            </motion.div>

            <motion.div className={styles.card} whileHover={{ scale: 1.05}}>
              <div className={styles.cardHeader}>
                <span className={styles.stepNum}>03</span>
                <h3>Builder's Focuses</h3>
              </div>
              <p>
                Augment each stat's base percentage up to <strong>100%</strong> using Rough, Precise, and Superior Focuses to maximize total Power Rank.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Optimal Stat Distribution */}
        <motion.section 
          className={styles.section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={scrollFadeInVariants}
        >
          <h2 className={styles.sectionTitle}>Optimal Stat Distribution</h2>
          
          <div className={styles.tabContainer}>
            <button
              className={`${styles.tab} ${activeTab === 'empowered' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('empowered')}
            >
              Cosmic Gems
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'elemental' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('elemental')}
            >
              Elemental Gems (Water / Fire / Air)
            </button>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className={styles.tabContent}
          >
            {activeTab === 'empowered' ? (
              <div className={styles.statList}>
                <div className={styles.statItem}>
                  <span className={styles.statName}>Stat 1: Light</span>
                  <span className={styles.statPriority}>MUST HAVE (3x Boosts)</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statName}>Stat 2: Physical / Magic Damage</span>
                  <span className={styles.statPriority}>Recommended</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statName}>Stat 3: Critical Damage</span>
                  <span className={styles.statPriority}>Recommended</span>
                </div>
              </div>
            ) : (
              <div className={styles.statList}>
                <div className={styles.statItem}>
                  <span className={styles.statName}>Stat 1: Physical / Magic Damage</span>
                  <span className={styles.statPriority}>Core Stat</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statName}>Stat 2: Critical Damage</span>
                  <span className={styles.statPriority}>Core Stat</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statName}>Stat 3: Critical Hit (until 100%)</span>
                  <span className={styles.statPriority}>Flex Stat</span>
                </div>
              </div>
            )}
          </motion.div>
        </motion.section>

        {/* Pro Tip Box */}
        <motion.div 
          className={styles.proTip}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={scrollFadeInVariants}
        >
          <div>
            <h4>Keep in mind!</h4>
            <p>
              Always start with <strong>3-stat Stellar/Crystal gems</strong> at level 1. If a gem only drops with 2 stats, it loses 1 boost proc at level 5, capping its maximum Power Rank lower than a perfect 3-stat gem!
            </p>
          </div>
        </motion.div>

        {/* Gem Tiers Section */}
        <motion.section 
          className={styles.section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={scrollFadeInVariants}
        >
          <GemTiersSection />
        </motion.section>

        {/* Converters Grid */}
        <motion.section
          className={styles.section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={scrollFadeInVariants}
        >
          <h2 className={styles.sectionTitle}>Mystic and Crystal Gem Converter</h2>
          
          <div className={styles.converterGrid}>
            {/* Bal oldal: Crystal Converter */}
            <motion.div 
              className={`${styles.converterCard} ${styles.crystalCard}`}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              <h3 className={styles.converterCardTitle}>Crystal Gem Converter</h3>
              <div className={styles.converterCardBody}>
                <div className={styles.converterImgWrapper}>
                  <img 
                    src="/gemtiers/crystalconv.webp" 
                    alt="Crystal Gem Converter" 
                    className={styles.converterImg}
                  />
                </div>
                <p className={styles.converterCardText}>
                  Upgrades a maxed <strong>Stellar Gem</strong> directly into a <strong>Crystal Gem</strong>. It retains all existing stat rolls, level progression, and focus augments so you don't have to restart your gem build from scratch.
                </p>
              </div>
            </motion.div>

            {/* Jobb oldal: Mystic Converter */}
            <motion.div 
              className={`${styles.converterCard} ${styles.mysticCard}`}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
            >
              <h3 className={styles.converterCardTitle}>Mystic Gem Converter</h3>
              <div className={styles.converterCardBody}>
                <div className={styles.converterImgWrapper}>
                  <img 
                    src="/gemtiers/mysticconv.webp" 
                    alt="Mystic Gem Converter" 
                    className={styles.converterImg}
                  />
                </div>
                <p className={styles.converterCardText}>
                  Upgrades a maxed <strong>Crystal Gem</strong> to the pinnacle <strong>Mystic Tier</strong>. Perfect for endgame players aiming for the absolute maximum Light and Power Rank caps without sacrificing stat investments.
                </p>
              </div>
            </motion.div>
          </div>

          <p className={styles.note}>
            <strong>Note:</strong> Converters aren't mandatory, but they have a specific use case. While high-tier gems can drop naturally in higher difficulty worlds, converters are best used when you already have a fully maxed gem and want to upgrade it to the next tier without losing its stats or augments.
          </p>
        </motion.section>

        {/* LESSER VS EMPOWERED GEMS SECTION - FRISSÍTVE MOTION.SECTION-RE */}
        <motion.section 
          className={styles.section} 
          id="lesser-empowered"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={scrollFadeInVariants}
        >
          <SectionDivider />
          <h2 className={styles.sectionTitle}>Lesser vs. Empowered Gems</h2>
          <p className={styles.note}>
            Gems in Trove are split into two fundamental categories. While Lesser Gems form your stat foundation, Empowered Gems define your build with game-changing abilities.
          </p>

          <div className={styles.compareGrid}>
            {/* BAL OLDALI KÁRTYA: LESSER GEM (Alulról vagy balról beúszás) */}
            <motion.div
              className={`${styles.compareCard} ${styles.lesserCard}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className={styles.compareHeader}>
                <div className={styles.gemIconWrapper}>
                  <img
                    src="/gemtiers/air.png"
                    alt="Lesser Gem"
                    className={styles.compareGemImg}
                  />
                </div>
                <div className={styles.compareTitleGroup}>
                  <span className={styles.compareTag}>COMMON - RESTRICTED</span>
                  <h3>Lesser Gem</h3>
                </div>
              </div>

              <p className={styles.compareIntro}>
                Lesser gems are common gems. They are locked to a single damage school and have no special ability - but since you equip many of them, their combined stats add up.
              </p>

              <ul className={styles.compareList}>
                <li>
                  <strong>Restriction:</strong> Fierce gems roll Physical stats, while Arcane gems roll Magic stats.
                </li>
                <li>
                  <strong>Stat Rolls:</strong> Comes with two or three stats, each rolled at a random strength.
                </li>
                <li>
                  <strong>Augmenting:</strong> Improve and focus the stats to close the gap toward the perfect 100%.
                </li>
              </ul>
            </motion.div>

            {/* JOBB OLDALI KÁRTYA: EMPOWERED GEM (Alulról vagy jobbról beúszás) */}
            <motion.div
              className={`${styles.compareCard} ${styles.empoweredCard}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
            >
              <div className={styles.compareHeader}>
                <div className={`${styles.gemIconWrapper} ${styles.empoweredGlow}`}>
                  <img
                    src="/gemtiers/empair.png"
                    alt="Empowered Gem"
                    className={styles.compareGemImg}
                  />
                </div>
                <div className={styles.compareTitleGroup}>
                  <span className={styles.compareTag} style={{ color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                    "UNRESTRICTED" & RARE
                  </span>
                  <h3 style={{ color: '#f59e0b' }}>Empowered Gem</h3>
                </div>
              </div>

              <p className={styles.compareIntro}>
                Empowered gems are more powerful and more rare to get. It removes the damage-school restriction, rolls within a higher stat range, and comes with a special ability.
              </p>

              <ul className={styles.compareList}>
                <li>
                  <strong>Unique Ability:</strong> Grants a special ability, or a class ability on Class Gems.
                </li>
                <li>
                  <strong>One of a Kind:</strong> Every ability is unique - two equipped gems can never have the same ability.
                </li>
                <li>
                  <strong>Higher Base Stats:</strong> Rolls within a higher stat range and starts with +100 Power Rank.
                </li>
                <li>
                  <strong>High Impact:</strong> You only equip a few - each one is a major upgrade.
                </li>
              </ul>
            </motion.div>
            
          </div>

          {/* HOW TO OBTAIN LESSER GEMS SUBSECTION */}
          <div className={styles.obtainContainer}>
            <h3 className={styles.obtainTitle}>How do you obtain Lesser Gems?</h3>
            
            <div className={styles.obtainGrid}>
              {/* BAL OLDAL: FROM UBER WORLDS */}
              <div className={styles.obtainCard}>
                <div className={styles.obtainHeader}>
                  <div className={styles.obtainIconWrapper}>
                    <img 
                      src="/icons/earth.png" 
                      alt="Uber Worlds" 
                      className={styles.obtainIcon} 
                    />
                  </div>
                  <h4>Uber Worlds</h4>
                </div>

                <div className={styles.tierStripList}>
                  <div className={`${styles.tierStrip} ${styles.radiantStrip}`}>
                    <span className={styles.stripTier}>Radiant</span>
                    <span className={styles.stripUber}>Uber 12</span>
                  </div>
                  <div className={`${styles.tierStrip} ${styles.stellarStrip}`}>
                    <span className={styles.stripTier}>Stellar</span>
                    <span className={styles.stripUber}>Uber 13</span>
                  </div>
                  <div className={`${styles.tierStrip} ${styles.crystalStrip}`}>
                    <span className={styles.stripTier}>Crystal</span>
                    <span className={styles.stripUber}>Uber 14</span>
                  </div>
                  <div className={`${styles.tierStrip} ${styles.mysticStrip}`}>
                    <span className={styles.stripTier}>Mystic</span>
                    <span className={styles.stripUber}>Uber 15</span>
                  </div>
            </div>
                          <div className={styles.noteBox}>
              <p className={styles.noteText}>
                {/* Ide írhatod majd a szövegedet */}
                In Uber Worlds you obtain lesser gems based on the world difficulty. Uber Worlds are more restricted, because they need specified light requirements to enter.
              </p>
                </div>
              </div>

              {/* JOBB OLDAL: FROM DELVES */}
              <div className={styles.obtainCard}>
                <div className={styles.obtainHeader}>
                  <div className={styles.obtainIconWrapper}>
                    <img 
                      src="/icons/pickaxe.png" 
                      alt="Delves" 
                      className={styles.obtainIcon} 
                    />
                  </div>
                  <h4>Delves</h4>
                </div>

                <div className={styles.delveInfoBox}>
                  <p>
                    160+ Delves: <span className={styles.delvetext}>Explore Delves up to 160+ depth and earn the same Gem Boxes available from D15 Uber Worlds.</span><br />
                    Power Rank: <span className={styles.delvetext}>A minimum of <strong className={styles.prStrong}>15,000</strong> Power Rank is required to access certain Delve depths.</span><br />
                    No Light requirement: <span className={styles.delvetext}>Delves are not restricted by Light, allowing you to progress regardless of your current Light.</span>
                  </p>
                </div>
                {/* NOTE BOX PLACEHOLDER */}
            <div className={styles.noteBox}>
              <p className={styles.noteText}>
                {/* Ide írhatod majd a szövegedet */}
                Delves are just shortcut to mystic gems. Completing <strong className={styles.noteStrong}>165+ delves</strong> is the same as doing D15 Uber worlds, but with lesser and lower restrictions. Delves are pretty useful if you want to skip Stellar and Crystal gems.
              </p>
            </div>
          </div>
              </div>
            </div>



        </motion.section>

      </div>

      <GemsGuideDock />
    </>
  );
}