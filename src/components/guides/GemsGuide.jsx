// src/components/guides/GemsGuide.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './GemsGuide.module.css';
import GemTiersSection from './GemTiersSection';
import { GemsGuideDock } from "./GemsGuideDock";

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
      <div className={styles.container}>
        
        {/* Hero Header */}
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

        {/* 1. Szekció: Rerolling & Moving Stats */}
        <motion.section 
          className={styles.section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={scrollFadeInVariants}
        >
          <h2 className={styles.sectionTitle}>1. Rerolling & Moving Stats</h2>
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

        {/* 2. Szekció: Optimal Stat Distribution */}
        <motion.section 
          className={styles.section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={scrollFadeInVariants}
        >
          <h2 className={styles.sectionTitle}>2. Optimal Stat Distribution</h2>
          
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

      </div>

      {/* A Dock teljesen függetlenül áll a konténeren kívül */}
      <GemsGuideDock />
    </>
  );
}