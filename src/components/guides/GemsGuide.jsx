import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './GemsGuide.module.css';
import GemTiersSection from './GemTiersSection';
import { GemsGuideDock } from "./GemsGuideDock";
import GemBasicsScrolly from './GemBasicsScrolly';
import SectionDivider from '../common/SectionDivider';
import { useLanguage } from '../../context/LanguageContext';
import { gemsGuideContent } from './content/gemsGuide.content';

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
  const { langCode } = useLanguage();
  const c = gemsGuideContent[langCode] || gemsGuideContent.en;

  return (
    <>
      {/* 1. HERO SZEKCIÓ */}
      <div className={styles.container}>
        <motion.header 
          className={styles.hero}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className={styles.badge}>{c.hero.badge}</span>
          <h1 className={styles.title}>{c.hero.title}</h1>
          <p className={styles.description}>{c.hero.description}</p>
        </motion.header>
      </div>

      {/* 2. SCROLLYTELLING SZEKCIÓ */}
      <GemBasicsScrolly />

      {/* 3. TARTALMI SZEKCIÓK */}
      <div className={styles.container} style={{ marginTop: '0' }}>
        
        {/* Rerolling & Moving Stats */}
        <motion.section 
          className={styles.section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={scrollFadeInVariants}
        >
          <span className={styles.sectionStep}>{c.rerollSection.step}</span>
          <h2 className={styles.sectionTitle}>{c.rerollSection.title}</h2>
          <div className={styles.grid}>
            {c.rerollSection.cards.map((card) => (
              <motion.div key={card.num} className={styles.card} whileHover={{ scale: 1.05 }}>
                <div className={styles.cardHeader}>
                  <span className={styles.stepNum}>{card.num}</span>
                  <h3>{card.title}</h3>
                </div>
                <p dangerouslySetInnerHTML={{ __html: card.body }} />
              </motion.div>
            ))}
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
          <h2 className={styles.sectionTitle}>{c.statsSection.title}</h2>
          
          <div className={styles.tabContainer}>
            <button
              className={`${styles.tab} ${activeTab === 'empowered' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('empowered')}
            >
              {c.statsSection.tabs.empowered}
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'elemental' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('elemental')}
            >
              {c.statsSection.tabs.elemental}
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
                {c.statsSection.cosmicStats.map((st, i) => (
                  <div key={i} className={styles.statItem}>
                    <span className={styles.statName}>{st.name}</span>
                    <span className={styles.statPriority}>{st.priority}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.statList}>
                {c.statsSection.elementalStats.map((st, i) => (
                  <div key={i} className={styles.statItem}>
                    <span className={styles.statName}>{st.name}</span>
                    <span className={styles.statPriority}>{st.priority}</span>
                  </div>
                ))}
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
            <h4>{c.proTip.title}</h4>
            <p dangerouslySetInnerHTML={{ __html: c.proTip.body }} />
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
          <h2 className={styles.sectionTitle}>{c.convertersSection.title}</h2>
          
          <div className={styles.converterGrid}>
            <motion.div 
              className={`${styles.converterCard} ${styles.crystalCard}`}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              <h3 className={styles.converterCardTitle}>{c.convertersSection.crystal.title}</h3>
              <div className={styles.converterCardBody}>
                <div className={styles.converterImgWrapper}>
                  <img src="/gemtiers/crystalconv.webp" alt="Crystal Gem Converter" className={styles.converterImg} />
                </div>
                <p className={styles.converterCardText} dangerouslySetInnerHTML={{ __html: c.convertersSection.crystal.text }} />
              </div>
            </motion.div>

            <motion.div 
              className={`${styles.converterCard} ${styles.mysticCard}`}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
            >
              <h3 className={styles.converterCardTitle}>{c.convertersSection.mystic.title}</h3>
              <div className={styles.converterCardBody}>
                <div className={styles.converterImgWrapper}>
                  <img src="/gemtiers/mysticconv.webp" alt="Mystic Gem Converter" className={styles.converterImg} />
                </div>
                <p className={styles.converterCardText} dangerouslySetInnerHTML={{ __html: c.convertersSection.mystic.text }} />
              </div>
            </motion.div>
          </div>

          <p className={styles.note} dangerouslySetInnerHTML={{ __html: c.convertersSection.note }} />
        </motion.section>

        {/* LESSER VS EMPOWERED GEMS SECTION */}
        <motion.section 
          className={styles.section} 
          id="lesser-empowered"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={scrollFadeInVariants}
        >
          <SectionDivider />
          <span className={styles.sectionStep}>{c.lesserVsEmpowered.step}</span>
          <h2 className={styles.sectionTitle}>{c.lesserVsEmpowered.title}</h2>
          <p className={styles.note}>{c.lesserVsEmpowered.intro}</p>

          <div className={styles.compareGrid}>
            {/* LESSER GEM */}
            <motion.div
              className={`${styles.compareCard} ${styles.lesserCard}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className={styles.compareHeader}>
                <div className={styles.gemIconWrapper}>
                  <img src="/gemtiers/air.png" alt="Lesser Gem" className={styles.compareGemImg} />
                </div>
                <div className={styles.compareTitleGroup}>
                  <span className={styles.compareTag}>{c.lesserVsEmpowered.lesser.tag}</span>
                  <h3>{c.lesserVsEmpowered.lesser.title}</h3>
                </div>
              </div>
              <p className={styles.compareIntro}>{c.lesserVsEmpowered.lesser.intro}</p>
              <ul className={styles.compareList}>
                {c.lesserVsEmpowered.lesser.list.map((item, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            </motion.div>

            {/* EMPOWERED GEM */}
            <motion.div
              className={`${styles.compareCard} ${styles.empoweredCard}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
            >
              <div className={styles.compareHeader}>
                <div className={`${styles.gemIconWrapper} ${styles.empoweredGlow}`}>
                  <img src="/gemtiers/empair.png" alt="Empowered Gem" className={styles.compareGemImg} />
                </div>
                <div className={styles.compareTitleGroup}>
                  <span className={styles.compareTag} style={{ color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                    {c.lesserVsEmpowered.empowered.tag}
                  </span>
                  <h3 style={{ color: '#f59e0b' }}>{c.lesserVsEmpowered.empowered.title}</h3>
                </div>
              </div>
              <p className={styles.compareIntro}>{c.lesserVsEmpowered.empowered.intro}</p>
              <ul className={styles.compareList}>
                {c.lesserVsEmpowered.empowered.list.map((item, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            </motion.div>
          </div>

          {/* OBTAIN LESSER GEMS */}
          <div className={styles.obtainContainer}>
            <h3 className={styles.obtainTitle}>{c.lesserVsEmpowered.obtainLesser.title}</h3>
            <div className={styles.obtainGrid}>
              <div className={styles.obtainCard}>
                <div className={styles.obtainHeader}>
                  <div className={styles.obtainIconWrapper}>
                    <img src="/icons/earth.png" alt="Uber Worlds" className={styles.obtainIcon} />
                  </div>
                  <h4>{c.lesserVsEmpowered.obtainLesser.worlds.title}</h4>
                </div>
                <div className={styles.tierStripList}>
                  <div className={`${styles.tierStrip} ${styles.radiantStrip}`}><span className={styles.stripTier}>Radiant</span><span className={styles.stripUber}>D12</span></div>
                  <div className={`${styles.tierStrip} ${styles.stellarStrip}`}><span className={styles.stripTier}>Stellar</span><span className={styles.stripUber}>D13</span></div>
                  <div className={`${styles.tierStrip} ${styles.crystalStrip}`}><span className={styles.stripTier}>Crystal</span><span className={styles.stripUber}>D14</span></div>
                  <div className={`${styles.tierStrip} ${styles.mysticStrip}`}><span className={styles.stripTier}>Mystic</span><span className={styles.stripUber}>D15</span></div>
                </div>
                <div className={styles.noteBox}>
                  <p className={styles.noteText}>{c.lesserVsEmpowered.obtainLesser.worlds.note}</p>
                </div>
              </div>

              <div className={styles.obtainCard}>
                <div className={styles.obtainHeader}>
                  <div className={styles.obtainIconWrapper}>
                    <img src="/icons/pickaxe.png" alt="Delves" className={styles.obtainIcon} />
                  </div>
                  <h4>{c.lesserVsEmpowered.obtainLesser.delves.title}</h4>
                </div>
                <div className={styles.delveInfoBox}>
                  <p dangerouslySetInnerHTML={{ __html: c.lesserVsEmpowered.obtainLesser.delves.info }} />
                </div>
                <div className={styles.noteBox}>
                  <p className={styles.noteText} dangerouslySetInnerHTML={{ __html: c.lesserVsEmpowered.obtainLesser.delves.note }} />
                </div>
              </div>
            </div>
          </div>

          {/* OBTAIN EMPOWERED GEMS */}
          <div className={styles.obtainContainer}>
            <h3 className={styles.obtainTitle}>{c.lesserVsEmpowered.obtainEmpowered.title}</h3>
            <div className={styles.empoweredObtainGrid}>
              {c.lesserVsEmpowered.obtainEmpowered.cards.map((card, i) => (
                <motion.div key={i} className={styles.empObtainCard} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <div className={styles.empCardHeader}>
                    <div className={styles.empIconWrapper}>
                      <img src={`/empgems/${i === 0 ? 'empbox.png' : i === 1 ? 'empboxstellar.png' : i === 2 ? 'empgemboxtome.png' : i === 3 ? 'leaderboard.png' : i === 4 ? 'sovereign.png' : 'adventurebench.png'}`} alt={card.title} className={styles.empBoxIcon} />
                    </div>
                    <div className={styles.empTitleGroup}>
                      <span className={styles.empTag}>{card.tag}</span>
                      <h4>{card.title}</h4>
                    </div>
                  </div>
                  <p className={styles.empCardDesc} dangerouslySetInnerHTML={{ __html: card.desc }} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* GEM TYPES SECTION */}
        <motion.section 
          className={styles.section} 
          id="gem-types"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={scrollFadeInVariants}
        >
          <SectionDivider />
          <span className={styles.sectionStep}>{c.gemTypes.step}</span>
          <h2 className={styles.sectionTitle}>{c.gemTypes.title}</h2>
          <p className={styles.note}>{c.gemTypes.note}</p>

          <div className={styles.gemTypesGrid}>
            <div className={styles.gemTypeCard}>
              <div className={styles.gemTypeHeader}>
                <div className={styles.elementBadgeGroup}>
                  <span className={`${styles.elementBadge} ${styles.waterBadge}`}>Water</span>
                  <span className={`${styles.elementBadge} ${styles.fireBadge}`}>Fire</span>
                  <span className={`${styles.elementBadge} ${styles.airBadge}`}>Air</span>
                </div>
                <h3>{c.gemTypes.elemental.title}</h3>
              </div>
              <p className={styles.gemTypeDesc}>{c.gemTypes.elemental.desc}</p>

              <div className={styles.statRollsBox}>
                <span className={styles.boxLabel}>{c.gemTypes.elemental.canRoll}</span>
                <div className={styles.tagsFlex}>
                  {c.gemTypes.elemental.stats.map((st, i) => <span key={i}>{st}</span>)}
                </div>
              </div>

              <div className={styles.abilitiesBox}>
                <span className={styles.boxLabel}>{c.gemTypes.elemental.abilitiesTitle}</span>
                <p className={styles.abilityNames}>{c.gemTypes.elemental.abilities}</p>
                <span className={styles.abilityRuleNote} dangerouslySetInnerHTML={{ __html: c.gemTypes.elemental.restriction }} />
              </div>
            </div>

            <div className={`${styles.gemTypeCard} ${styles.cosmicTypeCard}`}>
              <div className={styles.gemTypeHeader}>
                <span className={`${styles.elementBadge} ${styles.cosmicBadge}`}>Cosmic</span>
                <h3>{c.gemTypes.cosmic.title}</h3>
              </div>
              <p className={styles.gemTypeDesc} dangerouslySetInnerHTML={{ __html: c.gemTypes.cosmic.desc }} />

              <div className={styles.cosmicHighlightBox}>
                <p>{c.gemTypes.cosmic.highlight}</p>
              </div>

              <div className={styles.statRollsBox}>
                <span className={styles.boxLabel}>{c.gemTypes.cosmic.uniqueFeature}</span>
                <div className={styles.tagsFlex}>
                  {c.gemTypes.cosmic.stats.map((st, i) => (
                    <span key={i} className={i === 0 ? styles.lightTag : ''}>{st}</span>
                  ))}
                </div>
              </div>
              <div className={styles.abilitiesBox}>
                <span className={styles.boxLabel}>{c.gemTypes.cosmic.abilitiesTitle}</span>
                <p className={styles.abilityNames}>{c.gemTypes.cosmic.abilities}</p>
              </div>
            </div>
          </div>

          <div className={styles.dragonBonusBox}>
            <div className={styles.dragonHeader}>
              <span className={styles.dragonBadge}>{c.gemTypes.dragonBonus.badge}</span>
              <h3>{c.gemTypes.dragonBonus.title}</h3>
            </div>
            <p className={styles.dragonDesc}>{c.gemTypes.dragonBonus.desc}</p>
          </div>
        </motion.section>

      </div>

      <GemsGuideDock />
    </>
  );
}