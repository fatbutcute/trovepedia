import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TinyQuestGuide.module.css';
import SectionDivider from '../common/SectionDivider';
import { AnimatedBackground } from '../core/animated-background';
import { useLanguage } from '../../context/LanguageContext';
import { tinyQuestGuideContent } from './content/tinyQuestGuide.content';

const scrollFadeInVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
  }
};

const BASE_ALLIES = [
  { id: 'vivian', icon: '/allies/vivian.png', baseLight: 450, maxLight: 563, baseDamage: '10% Phys & Magic', maxDamage: '11.5% Phys & Magic', color: '#c084fc' },
  { id: 'moontouched', icon: '/allies/moontouched.png', baseLight: 450, maxLight: 563, baseDamage: '10% Physical', maxDamage: '11.5% Physical', color: '#38bdf8' },
  { id: 'skyfire', icon: '/allies/skyfire.png', baseLight: 400, maxLight: 500, baseDamage: '25% Magic', maxDamage: '28.75% Magic', color: '#38bdf8' },
  { id: 'scorpius', icon: '/allies/scorpius.png', baseLight: 400, maxLight: 500, baseDamage: '25% Physical', maxDamage: '28.75% Physical', color: '#f59e0b' },
  { id: 'staruable', icon: '/allies/staruable.png', baseLight: 400, maxLight: 500, baseDamage: '8 Movement Speed', maxDamage: '12 Movement Speed', color: '#2effee' },
  { id: 'heckmantis', icon: '/allies/heckmantis.png', baseLight: 150, maxLight: 188, baseDamage: '30% Critical Dmg', maxDamage: '34.5% Critical Dmg', color: '#ef4444' }
];

export default function TinyQuestGuide() {
  const { langCode } = useLanguage();
  const c = tinyQuestGuideContent[langCode] || tinyQuestGuideContent.en;

  // Hozzákötjük a nyelvi szövegeket az aliakhoz
  const ALLIES = BASE_ALLIES.map(ally => ({
    ...ally,
    ...(c.alliesText[ally.id] || tinyQuestGuideContent.en.alliesText[ally.id])
  }));

  const [selectedAlly, setSelectedAlly] = useState(ALLIES[0]);
  const [currentLevel, setCurrentLevel] = useState(30);
  const [activeLightboxImage, setActiveLightboxImage] = useState(null);

  // 💡 EZ A LÉNYEG: Nyelvváltáskor azonnal frissíti a kiválasztott alia adatait az új nyelvre!
  useEffect(() => {
    const updated = ALLIES.find(a => a.id === selectedAlly.id);
    if (updated) {
      setSelectedAlly(updated);
    }
  }, [langCode]);

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
            alt="Trove Tiny Quest Update Banner" 
            className={styles.heroBanner}
            style={{ width: '100%', height: 'auto', aspectRatio: '16/9', objectFit: 'cover' }} // Fix képarány az ugrálás ellen
          />
          <div className={styles.heroOverlay} />
          <div className={styles.creditBadge}>
            Guide content by:{' '}
            <a href="https://www.youtube.com/@CashinClean" target="_blank" rel="noopener noreferrer" className={styles.creditLink}>
              CashinClean
            </a>
          </div>
        </div>

        <div className={styles.heroContent}>
          <span className={styles.badge}>{c.hero.badge}</span>
          <h1 className={styles.mainTitle}>{c.hero.title}</h1>
          <p className={styles.subTitle}>{c.hero.description}</p>
        </div>
      </motion.header>

      {/* SECTION 1: ALLY LEVELING */}
      <motion.section 
        className={styles.sectionContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={scrollFadeInVariants}
      >
        <div className={styles.sectionHeader}>
          <span className={styles.sectionStep}>{c.section1.step}</span>
          <h2 className={styles.sectionTitle}>{c.section1.title}</h2>
          <p className={styles.sectionDesc}>{c.section1.description}</p>
        </div>

        <div className={styles.dashboardContainer}>
          <div className={styles.sidebarList}>
            <AnimatedBackground
              defaultValue={selectedAlly.id}
              className="rounded-xl bg-black/30 border border-white/60 shadow-[0_0_15px_rgba(0,0,0,0.4)]"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              enableHover
            >
              {ALLIES.map((ally) => (
                <button
                  key={ally.id}
                  data-id={ally.id}
                  type="button"
                  className={`${styles.sidebarTab} ${selectedAlly.id === ally.id ? styles.activeSidebarTab : ''}`}
                  onClick={() => setSelectedAlly(ally)}
                >
                  <img 
                    src={ally.icon} 
                    alt={ally.name} 
                    className={styles.sidebarIcon} 
                    style={{ width: '50px', height: '50px', objectFit: 'contain' }} // Fix ikonméret
                    onError={(e) => { e.target.style.display = 'none'; }} 
                  />
                  <span className={styles.sidebarName}>{ally.name}</span>
                </button>
              ))}
            </AnimatedBackground>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedAlly.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className={styles.detailViewPanel}
              style={{ minHeight: '380px' }} // Fix minimális magasság az ugrálás ellen
            >
              <div className={styles.detailHeader}>
                <div className={styles.detailTitleGroup}>
                  <img 
                    src={selectedAlly.icon} 
                    alt={selectedAlly.name} 
                    className={styles.detailMainIcon} 
                    style={{ width: '48px', height: '48px', objectFit: 'contain' }} 
                    onError={(e) => { e.target.style.display = 'none'; }} 
                  />
                  <div>
                    <h3 className={styles.detailAllyName}>{selectedAlly.name}</h3>
                    <span className={styles.detailTierTag} style={{ color: selectedAlly.color, borderColor: selectedAlly.color }}>
                      {selectedAlly.tier}
                    </span>
                  </div>
                </div>

                <span className={styles.levelBadge} style={{ backgroundColor: selectedAlly.color }}>
                  LVL {currentLevel} / 30
                </span>
              </div>

              {/* Fix minimális magasság a leírásnak, hogy ne nyomja össze a csúszkát */}
              <p className={styles.detailDesc} style={{ minHeight: '50px' }}>{selectedAlly.description}</p>

              <div className={styles.sliderControl}>
                <label>{c.section1.adjustLevel} <strong>Level {currentLevel}</strong></label>
                <input type="range" min="1" max="30" value={currentLevel} onChange={(e) => setCurrentLevel(Number(e.target.value))} className={styles.rangeInput} />
                <div className={styles.sliderTicks}>
                  <span>{c.section1.lvl1}</span>
                  <span>{c.section1.lvl15}</span>
                  <span>{c.section1.lvl30}</span>
                </div>
              </div>

              <div className={styles.statPreviewGrid}>
                <div className={styles.statBox}>
                  <span className={styles.statLabel}>{c.section1.lightStat}</span>
                  <span className={styles.statValue} style={{ color: selectedAlly.color }}>+{calculatedLight}</span>
                  <span className={styles.statSubText}>{c.section1.base} {selectedAlly.baseLight}</span>
                </div>

                <div className={styles.statBox}>
                  <span className={styles.statLabel}>{c.section1.damageBoost}</span>
                  <span className={styles.statValue}>{currentLevel === 30 ? selectedAlly.maxDamage : selectedAlly.baseDamage}</span>
                  <span className={styles.statSubText}>{c.section1.base} {selectedAlly.baseDamage}</span>
                </div>
              </div>

              <p className={styles.allyPerkText}>
                <strong>{c.section1.specialPerk}</strong> {selectedAlly.perk}
              </p>

            </motion.div>
          </AnimatePresence>
        </div>
      </motion.section>

      {/* SECTION 2: MECHANICS */}
      <motion.section 
        className={styles.sectionContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={scrollFadeInVariants}
      >
        <SectionDivider />
        <div className={styles.sectionHeader}>
          <span className={styles.sectionStep}>{c.section2.step}</span>
          <h2 className={styles.sectionTitle}>{c.section2.title}</h2>
          <p className={styles.sectionDesc}>{c.section2.description}</p>
        </div>

        <div className={styles.mechanicsGrid}>
          {c.section2.cards.map((card, i) => (
            <div key={i} className={styles.mechanicCard}>
              <div className={styles.mechanicHeader}>
                <span className={styles.mechanicNum}>{card.num}</span>
                <h4>{card.title}</h4>
              </div>
              <p className={styles.mechanicText} dangerouslySetInnerHTML={{ __html: card.text }} />
              {card.badge1 && (
                <div className={styles.badgeRow}>
                  <span className={styles.infoBadge}>{card.badge1}</span>
                  <span className={styles.infoBadge}>{card.badge2}</span>
                </div>
              )}
              {card.note && <div className={styles.tipBox} dangerouslySetInnerHTML={{ __html: card.note }} />}
            </div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 3: LEVELING ROUTE */}
      <motion.section 
        className={styles.sectionContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={scrollFadeInVariants}
      >
        <SectionDivider />
        <div className={styles.sectionHeader}>
          <span className={styles.sectionStep}>{c.section3.step}</span>
          <h2 className={styles.sectionTitle}>{c.section3.title}</h2>
          <p className={styles.sectionDesc}>{c.section3.description}</p>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.progressionTable}>
            <thead>
              <tr>
                {c.section3.headers.map((h, i) => <th key={i}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {c.section3.rows.map((r, i) => (
                <tr key={i}>
                  <td><span className={styles.worldTag} style={{ color: i === 0 ? '#94a3b8' : i === 1 ? '#38bdf8' : i === 2 ? '#fbbf24' : '#c084fc' }}>{r.world}</span></td>
                  <td>{r.tier}</td>
                  <td>{r.duration}</td>
                  <td>{r.xp}</td>
                  <td>{r.strategy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.strategyGrid}>
          <div className={styles.strategyCard}>
            <h4>{c.section3.strategy1.title}</h4>
            <p dangerouslySetInnerHTML={{ __html: c.section3.strategy1.text }} />
          </div>
          <div className={styles.strategyCard}>
            <h4>{c.section3.strategy2.title}</h4>
            <p dangerouslySetInnerHTML={{ __html: c.section3.strategy2.text }} />
          </div>
        </div>
      </motion.section>

      {/* SECTION 4: CRAFTING */}
      <motion.section 
        className={styles.sectionContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={scrollFadeInVariants}
      >
        <SectionDivider />
        <div className={styles.sectionHeader}>
          <span className={styles.sectionStep}>{c.section4.step}</span>
          <h2 className={styles.sectionTitle}>{c.section4.title}</h2>
          <p className={styles.sectionDesc}>{c.section4.description}</p>
        </div>

        <div className={styles.craftingGrid}>
          <div className={styles.recipeCard}>
            <div className={styles.recipeHeader}>
              <span className={styles.recipeTag}>{c.section4.recipes[0].tag}</span>
              <div className={styles.recipeTitleRow}>
                <h4>{c.section4.recipes[0].title}</h4>
                <img src="/tinyquestkeys/tinykey.png" alt="" className={styles.recipeHeaderIcon} style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
              </div>
            </div>
            <p className={styles.recipeDesc}>{c.section4.recipes[0].desc}</p>
            <div className={styles.ingredientList}>
              <div className={styles.ingredientItem}>
                <span>{c.section4.recipes[0].label}</span>
                <strong>{c.section4.recipes[0].value}</strong>
              </div>
            </div>
          </div>

          <div className={styles.recipeCard}>
            <div className={styles.recipeHeader}>
              <span className={styles.recipeTag} style={{ color: '#c084fc', borderColor: '#c084fc' }}>{c.section4.recipes[1].tag}</span>
              <div className={styles.recipeTitleRow}>
                <h4>{c.section4.recipes[1].title}</h4>
                <img src="/tinyquestkeys/gildedrana.png" alt="" className={styles.recipeHeaderIcon} style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
              </div>
            </div>
            <p className={styles.recipeDesc}>{c.section4.recipes[1].desc}</p>
            <div className={styles.ingredientList}>
              <div className={styles.ingredientItem}><span>{c.section4.recipes[1].label1}</span><strong>{c.section4.recipes[1].val1}</strong></div>
              <div className={styles.ingredientItem}><span>{c.section4.recipes[1].label2}</span><strong>{c.section4.recipes[1].val2}</strong></div>
            </div>
          </div>
        </div>

        <div className={styles.benchmarkBox}>
          <div className={styles.benchmarkHeader}>
            <span className={styles.benchmarkBadge}>{c.section4.summary.tag}</span>
            <h3>{c.section4.summary.title}</h3>
          </div>
          <ul className={styles.benchmarkList}>
            {c.section4.summary.list.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        </div>
      </motion.section>

      {/* SECTION 5: REVEAL GRID */}
{/* SECTION 5: REVEAL GRID (Véglegesen javított, eltűnésmentes highlight dobozok) */}
      <section className={styles.horizontalScrollSection}>
        <SectionDivider />
        <div className={styles.sectionHeader}>
          <span className={styles.sectionStep}>{c.section5.step}</span>
          <h2 className={styles.sectionTitle}>{c.section5.title}</h2>
          <p className={styles.sectionDesc}>{c.section5.description}</p>
        </div>

        <div className={styles.revealGridContainer}>
          {c.section5.cards.map((card, index) => {
            // Angol tartalom lekérése biztonsági tartaléknak (fallback)
            const enCard = tinyQuestGuideContent.en?.section5?.cards[index];

            // 1. Keresünk szöveget a jelenlegi nyelv kártyájában (highlight, note, vagy bullets)
            let highlightText = card.highlight || card.note;

            if (!highlightText && card.bullets && card.bullets.length > 0) {
              highlightText = card.bullets.join(' ');
            }

            // 2. Ha a jelenlegi nyelven MÉG MINDIG üres, lekérjük az angolból!
            if (!highlightText && enCard) {
              highlightText = enCard.highlight || enCard.note || (enCard.bullets ? enCard.bullets.join(' ') : '');
            }

            const descriptionText = card.desc || card.description || enCard?.desc || enCard?.description;

            return (
              <motion.div
                key={index}
                className={styles.revealCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.25, 1, 0.5, 1]
                }}
                whileHover={{ 
                  y: -8, 
                  transition: { type: 'spring', stiffness: 300, damping: 20 } 
                }}
                style={{ 
                  minHeight: '260px',
                  willChange: 'transform'
                }}
              >
                <div className={styles.revealCardHeader}>
                  <div className={styles.revealCardTitleGroup}>
                    <span className={styles.revealStepBadge}>{card.step}</span>
                    <span className={styles.revealCategory}>{card.category}</span>
                  </div>
                  <img 
                    src={`/icons/${index === 0 ? 'gears.png' : index === 1 ? 'reset.png' : index === 2 ? 'lvlup.png' : 'voucher.png'}`} 
                    alt="" 
                    className={styles.revealIcon} 
                    style={{ width: '28px', height: '28px', objectFit: 'contain' }} 
                  />
                </div>

                <h3 className={styles.revealTitle}>{card.title}</h3>
                <p className={styles.revealDesc}>{descriptionText}</p>

                {/* HIGHLIGHT DOBOZ: Garantáltan kirajzolódik minden nyelven */}
                {highlightText && (
                  <div className={styles.revealHighlightBox}>
                    {highlightText}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
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
              <button className={styles.lightboxCloseBtn} onClick={() => setActiveLightboxImage(null)}>✕</button>
              <img src={activeLightboxImage.src} alt={activeLightboxImage.alt} className={styles.lightboxImg} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}