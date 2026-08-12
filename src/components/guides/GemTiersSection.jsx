import React, { useState, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './GemTiersSection.module.css';
import SectionDivider from '../common/SectionDivider';
import { useLanguage } from '../../context/LanguageContext';
import { gemsGuideContent } from './content/gemsGuide.content';

const MAX_PR = 3601;

const BASE_GEM_TIERS = [
  {
    id: 'radiant',
    tierNum: 'TIER 1',
    maxLevel: '23',
    color: '#e2e8f0',
    maxPowerRank: '1,270',
    prVal: 1270,
    icon: '/gemtiers/water.png',
    rollBonus: '150',
    converter: null,
  },
  {
    id: 'stellar',
    tierNum: 'TIER 2',
    maxLevel: '25',
    color: '#f59e0b',
    maxPowerRank: '2,251',
    prVal: 2251,
    icon: '/gemtiers/air.png',
    rollBonus: '210',
    converter: {
      name: 'Crystal Gem Converter',
      fromIcon: '/gemtiers/stellar.png',
      toIcon: '/gemtiers/crystal.png',
      converterImg: '/gemtiers/crystalconv.webp',
      glowType: 'crystal',
    },
  },
  {
    id: 'crystal',
    tierNum: 'TIER 3',
    maxLevel: '30',
    color: '#2effee',
    maxPowerRank: '2,830',
    prVal: 2830,
    icon: '/gemtiers/fire.png',
    rollBonus: '280',
    converter: {
      name: 'Mystic Gem Converter',
      fromIcon: '/gemtiers/crystal.png',
      toIcon: '/gemtiers/mystic.png',
      converterImg: '/gemtiers/mysticconv.webp',
      glowType: 'mystic',
    },
  },
  {
    id: 'mystic',
    tierNum: 'TIER 4',
    maxLevel: '35',
    color: '#c084fc',
    maxPowerRank: '3,601',
    prVal: 3601,
    icon: '/gemtiers/cosmic.png',
    rollBonus: '350',
    converter: null,
  },
];

export default function GemTiersSection() {
  const [active, setActive] = useState(null);
  const layoutId = useId();
  const { langCode } = useLanguage();

  const c = gemsGuideContent[langCode]?.tiersSection || gemsGuideContent.en.tiersSection;

  const GEM_TIERS = BASE_GEM_TIERS.map(tier => {
    const tData = c.tiersData[tier.id] || gemsGuideContent.en.tiersSection.tiersData[tier.id];
    return {
      ...tier,
      title: tData.title,
      description: tData.desc,
      converter: tier.converter ? {
        ...tier.converter,
        cost: tData.convCost,
        note: tData.convNote
      } : null
    };
  });

  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [active]);

  const pathD = "M 32 130 A 56 56 0 1 1 136 130";

  return (
    <div className={styles.wrapper}>
      <SectionDivider />
      {/* Fejléc */}
      <span className={styles.sectionStep}>{c.step}</span>
      <div className={styles.header}>
        <h2 className={styles.mainTitle}>{c.title}</h2>
        <p className={styles.subTitle} dangerouslySetInnerHTML={{ __html: c.subtitle }} />
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className={styles.backdrop}
          />
        )}
      </AnimatePresence>

      {/* EXPANDED MODAL */}
      <AnimatePresence>
        {active ? (
          <div className={styles.modalOverlay}>
            <motion.div
              layoutId={`card-${active.id}-${layoutId}`}
              className={styles.expandedCard}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <button className={styles.closeBtn} onClick={() => setActive(null)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className={styles.expandedHeader}>
                <span className={styles.tierTag} style={{ color: active.color }}>
                  {active.tierNum}
                </span>
                
                <div className={styles.expandedTitleRow}>
                  <span
                    className={styles.dot}
                    style={{
                      backgroundColor: active.color,
                      boxShadow: `0 0 10px ${active.color}, 0 0 18px ${active.color}`,
                    }}
                  />
                  <motion.h3
                    layoutId={`title-${active.id}-${layoutId}`}
                    className={styles.expandedTitle}
                  >
                    {active.title} Gem Tier
                  </motion.h3>
                </div>
              </div>

              <p className={styles.expandedDesc}>{active.description}</p>

              {/* Stats Grid */}
              <div className={styles.statsGrid}>
                <div className={styles.statBox}>
                  <span className={styles.statLabel}>{c.labels.maxLevel}</span>
                  <span className={styles.statVal} style={{ color: active.color }}>
                    {active.maxLevel}
                  </span>
                  <span className={styles.statSub}>{c.labels.maxLevelSub}</span>
                </div>

                <div className={styles.statBox}>
                  <span className={styles.statLabel}>{c.labels.eachRoll}</span>
                  <span className={styles.statVal} style={{ color: active.color }}>
                    +{active.rollBonus}
                  </span>
                  <span className={styles.statSub}>{c.labels.eachRollSub}</span>
                </div>        

                <div className={styles.statBox}>
                  <span className={styles.statLabel}>{c.labels.maxPr}</span>
                  <span className={styles.statVal} style={{ color: active.color }}>
                    {active.maxPowerRank}
                  </span>
                  <span className={styles.statSub}>{c.labels.maxPrSub}</span>
                </div>
              </div>

              {/* REPLÜŐ CONVERTER ANIMÁCIÓ SZEKCIÓ */}
              {active.converter && (
                <div className={styles.converterSection}>

                  <div className={styles.visualFlow}>
                    <div className={styles.gemBox}>
                      <img src={active.converter.fromIcon} alt="Source Gem" className={styles.flowGemIcon} />
                    </div>

                    <div className={styles.travelTrack}>
                      <div className={`${styles.converterImgWrapper} ${styles[active.converter.glowType + 'Glow']}`}>
                        <img 
                          src={active.converter.converterImg} 
                          alt={active.converter.name} 
                          className={styles.converterImg}
                        />
                      </div>
                    </div>

                    <div className={styles.gemBox}>
                      <img src={active.converter.toIcon} alt="Target Gem" className={styles.flowGemIcon} />
                    </div>
                  </div>

                  <div className={styles.converterFooter}>
                    <div className={styles.converterTitleRow}>
                      <span className={styles.converterName}>{active.converter.name}</span>
                      <span className={styles.costTag}>{active.converter.cost}</span>
                    </div>
                    <span className={styles.converterNote}>{active.converter.note}</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* 4 ALAP KÁRTYA GRID */}
      <div className={styles.grid}>
        {GEM_TIERS.map((tier) => {
          const fillRatio = tier.prVal / MAX_PR;

          return (
            <motion.div
              layoutId={`card-${tier.id}-${layoutId}`}
              key={tier.id}
              onClick={() => setActive(tier)}
              whileHover={{
                scale: 1.02,
                y: -4,
                borderColor: `${tier.color}66`,
                boxShadow: `0 8px 25px -5px ${tier.color}35`,
              }}
              whileTap={{ scale: 0.98 }}
              className={`${styles.card} group`}
            >
              <div className={styles.cardInfo}>
                <div className={styles.cardTop}>
                  <span
                    className={styles.dot}
                    style={{
                      backgroundColor: tier.color,
                      boxShadow: `0 0 8px ${tier.color}`,
                    }}
                  />
                  <motion.h3
                    layoutId={`title-${tier.id}-${layoutId}`}
                    className={styles.cardTitle}
                  >
                    {tier.title}
                  </motion.h3>
                </div>
                
                <span className={styles.cardTier}>{tier.tierNum}</span>
                
                <div className={styles.cardFooter}>
                  <span>{c.labels.levelCap} <strong>{tier.maxLevel}</strong></span>
                </div>
              </div>

              <div className={styles.gaugeContainer}>
                <div className={styles.gaugeRelative}>
                  <svg
                    className={styles.gaugeSvg}
                    viewBox="0 0 160 160"
                    fill="none"
                  >
                    <path
                      d={pathD}
                      strokeWidth="12"
                      strokeLinecap="round"
                      stroke="rgba(255, 255, 255, 0.08)"
                      pathLength="100"
                    />
                    
                    <motion.path
                      d={pathD}
                      pathLength="100"
                      strokeWidth="12"
                      strokeLinecap="round"
                      stroke={tier.color}
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: fillRatio }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                      style={{
                        filter: `drop-shadow(0 0 6px ${tier.color}88)`,
                      }}
                    />
                  </svg>

                  <img
                    src={tier.icon}
                    alt={tier.title}
                    className={styles.gemIcon}
                  />
                </div>

                <span className={styles.prLabel} style={{ color: tier.color }}>
                  {tier.maxPowerRank} PR
                </span>
              </div>

            </motion.div>
          );
        })}
      </div>
    </div>
  );
}