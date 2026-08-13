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

const CLASS_GEMS_DATA = [
  { id: 'bard', icon: '/classgems/Gem_class_bard.webp', color: '#fde68a', abilities: ['/classgemimg/bard1.webp', '/classgemimg/bard2.webp', '/classgemimg/bard3.webp'] },
  { id: 'boomeranger', icon: '/classgems/Gem_class_boomeranger.webp', color: '#fb923c', abilities: ['/classgemimg/boomer1.webp', '/classgemimg/boomer2.webp'] },
  { id: 'candybarbarian', icon: '/classgems/Gem_class_candybarbarian.webp', color: '#f9a8d4', abilities: ['/classgemimg/cb.webp'] },
  { id: 'chloromancer', icon: '/classgems/Gem_class_chloromancer.webp', color: '#86efac', abilities: ['/classgemimg/chloro.webp'] },
  { id: 'dinotamer', icon: '/classgems/Gem_class_dinotamer.webp', color: '#7aaf18', abilities: ['/classgemimg/dt.webp'] },
  { id: 'dracolyte', icon: '/classgems/Gem_class_dracolyte.webp', color: '#f87171', abilities: ['/classgemimg/draco.webp'] },
  { id: 'faetrickster', icon: '/classgems/Gem_class_faetrickster.webp', color: '#d8b4fe', abilities: ['/classgemimg/fae.webp'] },
  { id: 'gunslinger', icon: '/classgems/Gem_class_gunslinger.webp', color: '#a57e00', abilities: ['/classgemimg/gs.webp'] },
  { id: 'icesage', icon: '/classgems/Gem_class_icesage.webp', color: '#2cd9f0', abilities: ['/classgemimg/is.webp'] },
  { id: 'knight', icon: '/classgems/Gem_class_knight.webp', color: '#e2e8f0', abilities: ['/classgemimg/knight.webp'] },
  { id: 'lunarlancer', icon: '/classgems/Gem_class_lunarlancer.webp', color: '#a5b4fc', abilities: ['/classgemimg/ll.webp'] },
  { id: 'neonninja', icon: '/classgems/Gem_class_neonninja.webp', color: '#00f7ff', abilities: ['/classgemimg/nn.webp'] },
  { id: 'pirate', icon: '/classgems/Gem_class_pirate.webp', color: '#46ff8d', abilities: ['/classgemimg/pirate.webp'] },
  { id: 'revenant', icon: '/classgems/Gem_class_revenant.webp', color: '#e8d1ff', abilities: ['/classgemimg/revenant.webp'] },
  { id: 'shadowhunter', icon: '/classgems/Gem_class_shadowhunter.webp', color: '#870cc0', abilities: ['/classgemimg/sh.webp'] },
  { id: 'solarion', icon: '/classgems/Gem_class_solarion.webp', color: '#fbbf24', abilities: ['/classgemimg/sola.webp'] },
  { id: 'tombraiser', icon: '/classgems/Gem_class_tombraiser.webp', color: '#9500cf', abilities: ['/classgemimg/tr.webp'] },
  { id: 'vanguardian', icon: '/classgems/Gem_class_vanguardian.webp', color: '#60a5fa', abilities: ['/classgemimg/vg.webp'] },
];

export default function GemsGuide() {
  const [activeTab, setActiveTab] = useState('empowered');
  const [selectedClassGem, setSelectedClassGem] = useState('bard');
  
  const { langCode } = useLanguage();
  const c = gemsGuideContent[langCode] || gemsGuideContent.en;

  // Safe fallback
  const classGemsSec = c.classGemsSection || gemsGuideContent.en.classGemsSection;
  const currentGemConfig = CLASS_GEMS_DATA.find(g => g.id === selectedClassGem) || CLASS_GEMS_DATA[0];
  const currentGemInfo = classGemsSec?.gems?.[selectedClassGem] || gemsGuideContent.en.classGemsSection?.gems?.[selectedClassGem];

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
      <div className={styles.container} style={{ marginTop: '0' }} id="optimal">
        
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
          id="tiers"
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

        {/* ── 5. CLASS GEMS SZEKCIÓ (MODIFIKÁLT TOOLBOX-SZAL) ── */}
        {classGemsSec && (
          <motion.section
            className={styles.section}
            id="class-gems"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={scrollFadeInVariants}
          >
            <SectionDivider />
            <span className={styles.sectionStep}>{classGemsSec.step}</span>
            <h2 className={styles.sectionTitle}>{classGemsSec.title}</h2>
            <p className={styles.note}>{classGemsSec.intro}</p>

            {/* Felső 2 kártyás sor */}
            <div className={styles.cgTopGrid}>
              <div className={styles.cgFeatureCard}>
                <div className={`${styles.cgCardIcon} ${styles.cgIconBlue}`}>
                  <i className="ri-user-star-line" aria-hidden="true"></i>
                </div>
                <h3 className={styles.cgFeatureTitle}>{classGemsSec.cards?.onePerClass?.title}</h3>
                <p className={styles.cgFeatureDesc}>{classGemsSec.cards?.onePerClass?.desc}</p>
              </div>

              <div className={styles.cgFeatureCard}>
                <div className={`${styles.cgCardIcon} ${styles.cgIconPurple}`}>
                  <i className="ri-magic-line" aria-hidden="true"></i>
                </div>
                <h3 className={styles.cgFeatureTitle}>{classGemsSec.cards?.rewritesAbility?.title}</h3>
                <p className={styles.cgFeatureDesc}>{classGemsSec.cards?.rewritesAbility?.desc}</p>
              </div>

              <div className={styles.cgBannerCard}>
                <div className={styles.cgBannerText}>
                  <div className={`${styles.cgCardIcon} ${styles.cgIconYellow}`}>
                    <i className="ri-lock-unlock-line" aria-hidden="true"></i>
                  </div>
                  <h3 className={styles.cgBannerLabel}>{classGemsSec.cards?.howToGet?.title}</h3>{' '}
                  <p className={styles.cgBannerDesc}>{classGemsSec.cards?.howToGet?.desc}</p>
                </div>
              </div>
            </div>

            <p className={styles.cgSelectorTitle}>{classGemsSec.selectorTitle}</p>

            {/* 3x6-os rács a Class Gem kártyákkal */}
            <div className={styles.cgGridWrapper} role="listbox" aria-label={classGemsSec.selectorTitle}>
              {CLASS_GEMS_DATA.map((gem) => {
                const gemInfo = classGemsSec.gems?.[gem.id] || gemsGuideContent.en.classGemsSection?.gems?.[gem.id];
                const isSelected = selectedClassGem === gem.id;

                return (
                  <motion.div
                    key={gem.id}
                    whileHover={{ scale: 1.07 }}
                    onClick={() => setSelectedClassGem(gem.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedClassGem(gem.id);
                      }
                    }}
                    role="option"
                    tabIndex={0}
                    aria-selected={isSelected}
                    className={`${styles.cgCard} ${isSelected ? styles.cgCardSelected : ''}`}
                    style={{ '--cg-accent': gem.color }}
                  >
                    <div className={styles.cgIconWrap}>
                      <img
                        src={gem.icon}
                        alt={gemInfo?.name}
                        className={styles.cgIconImg}
                      />
                    </div>
                    <span className={styles.cgGemName}>
                      {gemInfo?.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Kiválasztott Class Gem kártya leírása (Toolbox) */}
            {currentGemConfig && currentGemInfo && (
              <motion.div
                key={selectedClassGem}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={styles.cgToolboxPanel}
                style={{ '--cg-accent': currentGemConfig.color }}
              >
                <div className={styles.cgToolboxHeader}>
                  <div className={styles.cgToolboxBadge}>
                    <img src={currentGemConfig.icon} alt={currentGemInfo.name} className={styles.cgToolboxBadgeImg} />
                  </div>
                  <div className={styles.cgToolboxTitles}>
                    <span className={styles.cgToolboxTag}>
                      {classGemsSec.selectedLabel}
                    </span>
                    <h3 className={styles.cgToolboxHeading}>
                      {currentGemInfo.name} · <span className={styles.cgToolboxAbility}>{currentGemInfo.ability}</span>
                    </h3>
                  </div>

                  {/* JOBB FELSŐ SARKi KÉPESSÉG IKONOK */}
                  {currentGemConfig.abilities && currentGemConfig.abilities.length > 0 && (
                    <div className={styles.cgTopRightIcons}>
                      {currentGemConfig.abilities.map((iconPath, idx) => (
                        <div key={idx} className={styles.cgAbilityIconWrapTop}>
                          <img
                            src={iconPath}
                            alt="Ability Icon"
                            className={styles.cgAbilityIconImg}
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* BAL ALSÓ SOROK: IKONOK EGYMÁS ALATT A SAJÁT SZÖVEGÜKKEL */}
                <div className={styles.cgToolboxBody}>
                  {Array.isArray(currentGemInfo.desc) ? (
                    /* HA TÖBB MONDAT/SOR VAN (pl. Bard, Boomeranger) */
                    <div className={styles.cgAbilityList}>
                      {currentGemInfo.desc.map((textLine, idx) => (
                        <div key={idx} className={styles.cgAbilityRow}>
                          <img
                            src={currentGemConfig.abilities?.[idx] || currentGemConfig.abilities?.[0]}
                            alt=""
                            className={styles.cgAbilityRowIcon}
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                          <div className={styles.cgAbilityRowText}>
                            <p className={styles.cgToolboxDesc}>{textLine}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* HA CSAK 1 SIMA MONDAT VAN (a többi karakternél) */
                    <div className={styles.cgAbilityRow}>
                      {currentGemConfig.abilities?.[0] && (
                        <img
                          src={currentGemConfig.abilities[0]}
                          alt=""
                          className={styles.cgAbilityRowIcon}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      )}
                      <div className={styles.cgAbilityRowText}>
                        <p className={styles.cgToolboxDesc}>{currentGemInfo.desc}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

          </motion.section>
        )}

      </div>

      <GemsGuideDock />
    </>
  );
}