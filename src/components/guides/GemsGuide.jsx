import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './GemsGuide.module.css';
import GemTiersSection from './GemTiersSection';
import { GemsGuideDock } from "./GemsGuideDock";
import GemBasicsScrolly from './GemBasicsScrolly';
import SectionDivider from '../common/SectionDivider';
import { useLanguage } from '../../context/LanguageContext';
import { gemsGuideContent } from './content/gemsGuide.content';

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

const TIER_META = {
  radiant: { id: 1, name: 'Radiant', color: '#38bdf8', maxLevel: 23, baseInc: 3, prThreshLesser: [85, 113], prThreshEmp: [113, 150] },
  stellar: { id: 2, name: 'Stellar', color: '#fbbf24', maxLevel: 25, baseInc: 5, prThreshLesser: [150, 200], prThreshEmp: [200, 266] },
  crystal: { id: 3, name: 'Crystal', color: '#2dd4bf', maxLevel: 30, baseInc: 7, prThreshLesser: [175, 250], prThreshEmp: [220, 280] },
  mystic: { id: 4, name: 'Mystic', color: '#c084fc', maxLevel: 35, baseInc: 9, prThreshLesser: [200, 260], prThreshEmp: [240, 300] },
};

const BOOSTERS = [
  { id: 'horseshoe', name: 'Glittering Horseshoe', icon: '/gemtiers/horseshoe.png', lvl: '+50%', dbl: '+0%', bar: 20, color: '#38f2f8' },
  { id: 'luckbug', name: 'Lapis Luckbug', icon: '/gemtiers/luckbug.png', lvl: '+300%', dbl: '+500%', bar: 50, color: '#60a5fa' },
  { id: 'ninth', name: 'Ninth Life', icon: '/gemtiers/ninthlife.png', tagKey: 'allButMystic', lvl: '+4000%', dbl: '+1000%', bar: 85, color: '#f59e0b' },
  { id: 'tenth', name: 'Tenth Life', icon: '/gemtiers/tenthlife.png', tagKey: 'mysticOnly', lvl: '+4000%', dbl: '+1000%', bar: 100, color: '#a200b8' },
];

function calcPrIncrement(base, lvl) {
  if (lvl === 1 || lvl === 5 || lvl === 10 || lvl === 15) return 0;
  if (lvl > 15 && lvl % 5 === 0) return base * 5;
  if (lvl > 1 && lvl < 15) return base;
  if (lvl > 15) return base * 2;
  return 0;
}

function pyRound(num) {
  return Math.round(num);
}

export default function GemsGuide() {
  const [activeTab, setActiveTab] = useState('empowered');
  const [selectedClassGem, setSelectedClassGem] = useState('bard');
  
  // Leveling Simulator State
  const [selectedTier, setSelectedTier] = useState('mystic');
  const [gemType, setGemType] = useState('empowered');
  const [simLevel, setSimLevel] = useState(1);
  const [dragonBonus, setDragonBonus] = useState(true);

  const { langCode } = useLanguage();
  const c = gemsGuideContent[langCode] || gemsGuideContent.en;

  const classGemsSec = c.classGemsSection || gemsGuideContent.en.classGemsSection;
  const levelingSec = c.levelingSection || gemsGuideContent.en.levelingSection;
  const strategySec = c.strategySection || gemsGuideContent.en.strategySection;
  const perfectingSec = c.perfectingSection || gemsGuideContent.en.perfectingSection;

  // Dinamikusan felépített Perfecting & Bound Brilliance elemek a megfelelő nyelven
  const perfectingItems = [
    {
      id: 'spark',
      name: perfectingSec?.items?.spark?.name || 'Contained Chaos Spark',
      icon: '/boundbrilliance/spark.png',
      desc: perfectingSec?.items?.spark?.desc || 'Randomly rerolls one of the stats on a Gem.'
    },
    {
      id: 'flare',
      name: perfectingSec?.items?.flare?.name || 'Contained Chaos Flare',
      icon: '/boundbrilliance/flare.png',
      desc: perfectingSec?.items?.flare?.desc || 'Moves one random stat boost from a stat to another.'
    },
    {
      id: 'focus',
      name: perfectingSec?.items?.focus?.name || "Builder's Focuses",
      icons: [
        '/boundbrilliance/builder.png',
        '/boundbrilliance/precise.png',
        '/boundbrilliance/superior.png'
      ],
      desc: perfectingSec?.items?.focus?.desc || 'Upgrades the percentage value of a stat towards 100%.'
    }
  ];

  const boundBrillianceSources = [
    {
      id: 'ls-vaults',
      img: '/boundbrilliance/lunarsoul.png',
      title: perfectingSec?.sources?.vaults?.title || 'Lunar Souls (Vaults)',
      yield: perfectingSec?.sources?.vaults?.yield || '18 / week',
      desc: perfectingSec?.sources?.vaults?.desc || "Starting at depth 110, Shadowy Vaults appear on every third floor.",
      extraLabel: perfectingSec?.sources?.vaults?.extraLabel || 'Depths:',
      extraTags: perfectingSec?.sources?.vaults?.extraTags || ['112', '115', '118', '...']
    },
    {
      id: 'ls-monday',
      img: '/boundbrilliance/delvekeyfrag.png',
      title: perfectingSec?.sources?.monday?.title || 'Five more, Mondays only',
      yield: perfectingSec?.sources?.monday?.yield || '5 / week',
      desc: perfectingSec?.sources?.monday?.desc || "Loot a Delve Shadowkey Fragment on a Monday to trigger a weekly quest.",
      extraLabel: perfectingSec?.sources?.monday?.extraLabel || 'Rule:',
      extraTags: perfectingSec?.sources?.monday?.extraTags || ['Any depth counts']
    },
    {
      id: 'bb-tome',
      img: '/boundbrilliance/boundtome.png',
      title: perfectingSec?.sources?.tome?.title || 'Book of Bound Brilliance',
      yield: perfectingSec?.sources?.tome?.yield || '5 / week',
      desc: perfectingSec?.sources?.tome?.desc || "Craft this legendary tome at the Adventurer's Crafting Bench.",
      extraLabel: perfectingSec?.sources?.tome?.extraLabel || 'Cost:',
      extraTags: perfectingSec?.sources?.tome?.extraTags || ['2k Dusts', '10 Flame', '2 Penta']
    },
    {
      id: 'bb-bomber',
      img: '/boundbrilliance/burntcoin.png',
      title: perfectingSec?.sources?.bomber?.title || 'Converting Burnt Coins',
      yield: perfectingSec?.sources?.bomber?.yield || '10 / week',
      desc: perfectingSec?.sources?.bomber?.desc || "Earn Blast Coins in Bomber Royale and exchange 30 Burnt Coins for 10 Bound Brilliance.",
      extraLabel: perfectingSec?.sources?.bomber?.extraLabel || 'Exchange:',
      extraTags: perfectingSec?.sources?.bomber?.extraTags || ['30 Burnt Coins']
    },
    {
      id: 'bb-leaderboard',
      img: '/boundbrilliance/bound.png',
      title: perfectingSec?.sources?.leaderboard?.title || 'Three Boards, Every Week',
      yield: perfectingSec?.sources?.leaderboard?.yield || '21 / week',
      desc: perfectingSec?.sources?.leaderboard?.desc || "Place in the top 125 on the three active class Effort contest boards.",
      extraLabel: perfectingSec?.sources?.leaderboard?.extraLabel || 'Goal:',
      extraTags: perfectingSec?.sources?.leaderboard?.extraTags || ['Top 125', '3 Classes']
    },
    {
      id: 'bb-events',
      img: '/boundbrilliance/bound.png',
      title: perfectingSec?.sources?.events?.title || 'During Event',
      yield: perfectingSec?.sources?.events?.yield || 'Varies',
      desc: perfectingSec?.sources?.events?.desc || "Special limited-time events often feature craftable recipes for Bound Brilliance.",
      extraLabel: perfectingSec?.sources?.events?.extraLabel || 'Availability:',
      extraTags: perfectingSec?.sources?.events?.extraTags || ['Limited Time']
    }
  ];

  const currentGemConfig = CLASS_GEMS_DATA.find(g => g.id === selectedClassGem) || CLASS_GEMS_DATA[0];
  const currentGemInfo = classGemsSec?.gems?.[selectedClassGem] || gemsGuideContent.en.classGemsSection?.gems?.[selectedClassGem];

  const simCfg = TIER_META[selectedTier];
  const activeSimLevel = Math.min(simLevel, simCfg.maxLevel);

  const targetPowerRank = useMemo(() => {
    let pr = gemType === 'lesser' ? 0 : 100;
    const thresholdMax = gemType === 'lesser' ? simCfg.prThreshLesser[1] : simCfg.prThreshEmp[1];

    let containerCounts = [1, 1, 1];
    if (activeSimLevel >= 5) containerCounts[0] += 1;
    if (activeSimLevel >= 10) containerCounts[1] += 1;
    if (activeSimLevel >= 15) containerCounts[2] += 1;

    for (let i = 0; i < 3; i++) {
      pr += thresholdMax * containerCounts[i];
    }

    for (let s = 0; s < 3; s++) {
      for (let lvl = 1; lvl <= activeSimLevel; lvl++) {
        pr += calcPrIncrement(simCfg.baseInc, lvl);
      }
    }

    return Math.round(pr);
  }, [selectedTier, gemType, activeSimLevel, simCfg]);

  const [displayPR, setDisplayPR] = useState(targetPowerRank);
  const animFrameRef = useRef(null);
  const currentValRef = useRef(targetPowerRank);

  useEffect(() => {
    const startVal = currentValRef.current;
    const endVal = targetPowerRank;
    const startTime = performance.now();
    const duration = 220; // ms

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + (endVal - startVal) * ease);

      currentValRef.current = current;
      setDisplayPR(current);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };

    cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [targetPowerRank]);

  const bonusPR = dragonBonus ? pyRound(displayPR * 0.1) : 0;

  return (
    <>
      <div className={styles.container} id='anatomy'>
        <motion.header
          className={styles.hero}
          id="Anatomy"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={styles.badge}>{c.hero.badge}</span>
          <h1 className={styles.title}>{c.hero.title}</h1>
          <p className={styles.description}>{c.hero.description}</p>
        </motion.header>
      </div>

      <GemBasicsScrolly />

      <div className={styles.container} style={{ marginTop: '0' }} id="optimal">
        
        {/* Rerolling & Moving Stats */}
        <motion.section 
          className={styles.section}
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
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
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
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

        <motion.div 
          className={styles.proTip}
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div>
            <h4>{c.proTip.title}</h4>
            <p dangerouslySetInnerHTML={{ __html: c.proTip.body }} />
          </div>
        </motion.div>

        <motion.section 
          className={styles.section}
          id="tiers"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <GemTiersSection />
        </motion.section>

        <motion.section
          className={styles.section}
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className={styles.sectionTitle}>{c.convertersSection.title}</h2>
          
          <div className={styles.converterGrid}>
            <motion.div className={`${styles.converterCard} ${styles.crystalCard}`} whileHover={{ y: -3 }}>
              <h3 className={styles.converterCardTitle}>{c.convertersSection.crystal.title}</h3>
              <div className={styles.converterCardBody}>
                <div className={styles.converterImgWrapper}>
                  <img src="/gemtiers/crystalconv.webp" alt="Crystal Gem Converter" className={styles.converterImg} />
                </div>
                <p className={styles.converterCardText} dangerouslySetInnerHTML={{ __html: c.convertersSection.crystal.text }} />
              </div>
            </motion.div>

            <motion.div className={`${styles.converterCard} ${styles.mysticCard}`} whileHover={{ y: -3 }}>
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
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionDivider />
          <span className={styles.sectionStep}>{c.lesserVsEmpowered.step}</span>
          <h2 className={styles.sectionTitle}>{c.lesserVsEmpowered.title}</h2>
          <p className={styles.note}>{c.lesserVsEmpowered.intro}</p>

          <div className={styles.compareGrid}>
            <motion.div className={`${styles.compareCard} ${styles.lesserCard}`}>
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

            <motion.div className={`${styles.compareCard} ${styles.empoweredCard}`}>
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

          <div className={styles.obtainContainer}>
            <h3 className={styles.obtainTitle}>{c.lesserVsEmpowered.obtainEmpowered.title}</h3>
            <div className={styles.empoweredObtainGrid}>
              {c.lesserVsEmpowered.obtainEmpowered.cards.map((card, i) => (
                <motion.div key={i} className={styles.empObtainCard} whileHover={{ y: -5 }}>
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
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
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

        {/* 5. CLASS GEMS SZEKCIÓ */}
        {classGemsSec && (
          <motion.section
            className={styles.section}
            id="class-gems"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SectionDivider />
            <span className={styles.sectionStep}>{classGemsSec.step}</span>
            <h2 className={styles.sectionTitle}>{classGemsSec.title}</h2>
            <p className={styles.note}>{classGemsSec.intro}</p>
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

            <div className={styles.cgGridWrapper} role="listbox" aria-label={classGemsSec.selectorTitle}>
              {CLASS_GEMS_DATA.map((gem) => {
                const gemInfo = classGemsSec.gems?.[gem.id] || gemsGuideContent.en.classGemsSection?.gems?.[gem.id];
                const isSelected = selectedClassGem === gem.id;

                return (
                  <motion.div
                    key={gem.id}
                    whileHover={{ scale: 1.07 }}
                    onClick={() => setSelectedClassGem(gem.id)}
                    role="option"
                    tabIndex={0}
                    aria-selected={isSelected}
                    className={`${styles.cgCard} ${isSelected ? styles.cgCardSelected : ''}`}
                    style={{ '--cg-accent': gem.color }}
                  >
                    <div className={styles.cgIconWrap}>
                      <img src={gem.icon} alt={gemInfo?.name} className={styles.cgIconImg} />
                    </div>
                    <span className={styles.cgGemName}>{gemInfo?.name}</span>
                  </motion.div>
                );
              })}
            </div>

            {currentGemConfig && currentGemInfo && (
              <motion.div
                key={selectedClassGem}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.cgToolboxPanel}
                style={{ '--cg-accent': currentGemConfig.color }}
              >
                <div className={styles.cgToolboxHeader}>
                  <div className={styles.cgToolboxBadge}>
                    <img src={currentGemConfig.icon} alt={currentGemInfo.name} className={styles.cgToolboxBadgeImg} />
                  </div>
                  <div className={styles.cgToolboxTitles}>
                    <span className={styles.cgToolboxTag}>{classGemsSec.selectedLabel}</span>
                    <h3 className={styles.cgToolboxHeading}>
                      {currentGemInfo.name} · <span className={styles.cgToolboxAbility}>{currentGemInfo.ability}</span>
                    </h3>
                  </div>

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

                <div className={styles.cgToolboxBody}>
                  {Array.isArray(currentGemInfo.desc) ? (
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

        {/* 6. LEVELING & POWER RANK SZEKCIÓ */}
        {levelingSec && (
          <motion.section
            className={styles.section}
            id="leveling"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SectionDivider />
            <span className={styles.sectionStep}>{levelingSec.step}</span>
            <h2 className={styles.sectionTitle}>{levelingSec.title}</h2>
            <p className={styles.note}>{levelingSec.intro}</p>

            <div className={styles.hudConsole} style={{ '--theme-color': simCfg.color }}>
              <div className={styles.hudHeader}>
                <div className={styles.tierTabs}>
                  {Object.keys(TIER_META).map((tKey) => (
                    <button
                      key={tKey}
                      className={`${styles.tabBtn} ${selectedTier === tKey ? styles.activeTab : ''}`}
                      style={{ '--tab-color': TIER_META[tKey].color }}
                      onClick={() => {
                        setSelectedTier(tKey);
                        if (simLevel > TIER_META[tKey].maxLevel) setSimLevel(TIER_META[tKey].maxLevel);
                      }}
                    >
                      <span className={styles.tabText}>{levelingSec.sim[tKey]}</span>
                    </button>
                  ))}
                </div>

                <div className={styles.typeTabs}>
                  <button
                    className={`${styles.typeTabBtn} ${gemType === 'empowered' ? styles.activeTypeTab : ''}`}
                    onClick={() => setGemType('empowered')}
                  >
                    {levelingSec.sim.empowered}
                  </button>
                  <button
                    className={`${styles.typeTabBtn} ${gemType === 'lesser' ? styles.activeTypeTab : ''}`}
                    onClick={() => setGemType('lesser')}
                  >
                    {levelingSec.sim.lesser}
                  </button>
                </div>
              </div>

              <div className={styles.hudCore}>
                <div className={styles.coreStatBlock}>
                  <span className={styles.coreLabel}>{levelingSec.sim.level}</span>
                  <div className={styles.coreLevelNumbers}>
                    <span className={styles.megaLevel}>{activeSimLevel}</span>
                    <span className={styles.coreMaxLevel}>/ {simCfg.maxLevel}</span>
                  </div>
                </div>

                <div className={styles.coreDivider}></div>

                <div className={styles.coreStatBlock}>
                  <span className={styles.coreLabel}>{levelingSec.sim.powerRank}</span>
                  <div className={styles.corePrNumbers}>
                    <span className={styles.megaPR}>
                      {displayPR.toLocaleString()}
                    </span>
                    {dragonBonus && (
                      <div className={styles.corePrBonus}>
                        + {bonusPR.toLocaleString()} (10%)
                      </div>
                    )}
                  </div>
                  <span className={styles.corePrSub}>
                    {levelingSec.sim.summaryPerfect
                      ?.replace('{tier}', levelingSec.sim[selectedTier])
                      ?.replace('{type}', levelingSec.sim[gemType])}
                  </span>
                </div>
              </div>

              <div className={styles.hudControls}>
                <div className={styles.sliderContainer}>
                  <input
                    type="range"
                    min="1"
                    max={simCfg.maxLevel}
                    value={activeSimLevel}
                    onChange={(e) => setSimLevel(Number(e.target.value))}
                    className={styles.slider}
                    style={{ 
                      '--progress': `${((activeSimLevel - 1) / (simCfg.maxLevel - 1)) * 100}%` 
                    }}
                  />
                  <div className={styles.milestoneMarks}>
                    <span 
                      className={`${styles.milestone} ${activeSimLevel >= 5 ? styles.passed : ''}`} 
                      style={{ left: `${(4 / (simCfg.maxLevel - 1)) * 100}%` }}
                    >
                      <img src="/icons/power.png" alt="Power" className={styles.milestoneIcon} />
                      5
                    </span>
                    <span 
                      className={`${styles.milestone} ${activeSimLevel >= 10 ? styles.passed : ''}`} 
                      style={{ left: `${(9 / (simCfg.maxLevel - 1)) * 100}%` }}
                    >
                      <img src="/icons/power.png" alt="Power" className={styles.milestoneIcon} />
                      10
                    </span>
                    <span 
                      className={`${styles.milestone} ${activeSimLevel >= 15 ? styles.passed : ''}`} 
                      style={{ left: `${(14 / (simCfg.maxLevel - 1)) * 100}%` }}
                    >
                      <img src="/icons/power.png" alt="Power" className={styles.milestoneIcon} />
                      15
                    </span>
                  </div>
                </div>

                <div className={styles.hudFooterRow}>
                  <label className={styles.dragonCheckboxLabel}>
                    <input
                      type="checkbox"
                      checked={dragonBonus}
                      onChange={(e) => setDragonBonus(e.target.checked)}
                      className={styles.hiddenInput}
                    />
                    <div className={styles.checkmark}></div>
                    <span className={styles.dragonIcon}>
                      <img src="/icons/dragon.png" alt="Dragon Bonus" />
                    </span>
                    <span className={styles.checkboxText}>{levelingSec.sim.dragonBonus}</span>
                  </label>
                  <p className={styles.simHelpText}>{levelingSec.sim.perfectDesc}</p>
                </div>
              </div>
            </div>

            <div className={styles.boosterSection}>
              <h3 className={styles.subHeading}>{levelingSec.boosters.title}</h3>
              <p className={styles.note}>{levelingSec.boosters.desc}</p>

              <div className={styles.boosterList}>
                {BOOSTERS.map((b) => (
                  <div key={b.id} className={styles.boosterRow} style={{ '--b-color': b.color }}>
                    <div className={styles.boosterRowIdentity}>
                      <div className={styles.boosterIconWrapper}>
                        <img src={b.icon} alt={b.name} className={styles.boosterImg} onError={(e) => { e.target.style.display = 'none'; }} />
                      </div>
                      <div className={styles.boosterRowText}>
                        <h4 className={styles.boosterName}>{b.name}</h4>
                        {b.tagKey && <span className={styles.boosterBadge}>{levelingSec.boosters[b.tagKey]}</span>}
                      </div>
                    </div>

                    <div className={styles.boosterRowStats}>
                      <div className={styles.boosterStatGroup}>
                        <span className={styles.statLabel}>{levelingSec.boosters.levelUp}</span>
                        <span className={styles.statVal}>{b.lvl}</span>
                      </div>
                      <div className={styles.boosterStatGroup}>
                        <span className={styles.statLabel}>{levelingSec.boosters.doubleLevel}</span>
                        <span className={styles.statVal}>{b.dbl}</span>
                      </div>
                    </div>

                    <div className={styles.boosterRowStrength}>
                      <span className={styles.strengthLabel}>{levelingSec.boosters.strength}</span>
                      <div className={styles.strengthTrack}>
                        <div className={styles.strengthBar} style={{ width: `${b.bar}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className={styles.boosterFootnote} dangerouslySetInnerHTML={{ __html: levelingSec.boosters.note }} />
            </div>

            <div className={styles.upcyclingSection}>
              <h3 className={styles.subHeading}>{levelingSec.upcycling.title}</h3>
              <p className={styles.note}>{levelingSec.upcycling.desc}</p>

              <div className={styles.dustPanelGrid}>
                <div className={styles.dustPanel}>
                  <div className={styles.dustPanelAccent}></div>
                  <span className={styles.dustCardTag}>{levelingSec.upcycling.fixtureTitle}</span>
                  <div className={styles.dustVal}>{levelingSec.upcycling.fixtureValue}</div>
                  <span className={styles.dustSub}>{levelingSec.upcycling.fixtureSub}</span>
                </div>

                <div className={`${styles.dustPanel} ${styles.dustPanelSpecial}`}>
                  <div className={styles.dustPanelAccent}></div>
                  <span className={styles.dustCardTag}>{levelingSec.upcycling.gemDayTitle}</span>
                  <div className={styles.dustVal}>{levelingSec.upcycling.gemDayValue}</div>
                  <span className={styles.dustSub}>{levelingSec.upcycling.gemDaySub}</span>
                </div>
              </div>

              <div className={styles.Alertgrid}>
                <div className={styles.hudAlertDanger}>
                  <p>{levelingSec.upcycling.alertNever}</p>
                </div>

                <div className={styles.hudAlertTip}>
                  <p>{levelingSec.upcycling.alertTip}</p>
                </div>
              </div>
            </div>

            {/* ── EFFICIENT GEM UPGRADE STRATEGY (2x3 GRID) ── */}
            {strategySec && (
              <div className={styles.strategySection}>
                <div className={styles.strategyHeader}>
                  <h3 className={styles.strategyMainTitle}>{strategySec.title}</h3>
                  <p className={styles.note}>{strategySec.note}</p>
                </div>

                <div className={styles.strategyGrid}>
                  {strategySec.steps?.map((step) => (
                    <motion.div
                      key={step.tag}
                      className={styles.strategyCard}
                      whileHover={{ x: 10, borderColor: 'rgba(56, 189, 248, 0.6)' }}
                    >
                      <div className={styles.strategyCardHeader}>
                        <span className={styles.strategyTag}>{step.tag}</span>
                        <h4 className={styles.strategyCardTitle}>{step.title}</h4>
                      </div>
                      <p className={styles.strategyCardDesc}>{step.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

          </motion.section>
        )}

        {/* ── 7. PERFECTING & BOUND BRILLIANCE ── */}
        {perfectingSec && (
          <motion.section 
            className={styles.section}
            id="perfecting"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SectionDivider />
            <span className={styles.sectionStep}>{perfectingSec.step || "07"}</span>
            <h2 className={styles.sectionTitle}>{perfectingSec.title || "Perfecting"}</h2>
            <p className={styles.note}>{perfectingSec.note}</p>

            {/* Intro Cards: Spark, Flare, Focus */}
            <div className={styles.perfectingIntroGrid}>
              {perfectingItems.map((item) => (
                <div key={item.id} className={styles.perfectingIntroCard}>
                  <div className={styles.pIntroHeader}>
                    <h4 className={styles.pIntroTitle}>{item.name}</h4>

                    {item.icons ? (
                      <div className={styles.iconGroup}>
                        {item.icons.map((iconSrc, idx) => (
                          <img key={idx} src={iconSrc} alt={item.name} className={styles.pIntroIcon} />
                        ))}
                      </div>
                    ) : (
                      <img src={item.icon} alt={item.name} className={styles.pIntroIcon} />
                    )}
                  </div>
                  <p className={styles.pIntroDesc}>{item.desc}</p>
                </div>
              ))}
            </div>

            <h3 className={styles.subHeading} style={{ marginTop: '48px' }}>
              {perfectingSec.bbHeading || "Bound Brilliance & Lunar Souls"}
            </h3>
            <p className={styles.note}>
              {perfectingSec.bbNote}
            </p>

            {/* 3x2 Grid for Farming Sources */}
            <div className={styles.brillianceGrid}>
              {boundBrillianceSources.map((source) => (
                <motion.div 
                  key={source.id} 
                  className={styles.brillianceCard}
                  whileHover={{ y: -5, borderColor: 'rgba(56, 189, 248, 0.5)' }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.bbHeader}>
                    <div className={styles.bbIconWrapper}>
                      <img src={source.img} alt={source.title} className={styles.bbIcon} onError={(e) => { e.target.style.display = 'none'; }} />
                    </div>
                    <div className={styles.bbTitleGroup}>
                      <span className={styles.bbYield}>{source.yield}</span>
                      <h4 className={styles.bbTitle}>{source.title}</h4>
                    </div>
                  </div>

                  <p className={styles.bbDesc}>{source.desc}</p>

                  <div className={styles.bbExtra}>
                    <span className={styles.bbExtraLabel}>{source.extraLabel}</span>
                    <div className={styles.bbTags}>
                      {source.extraTags.map((tag, idx) => (
                        <span key={idx} className={styles.bbTag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

      </div>

      <GemsGuideDock />
    </>
  );
}