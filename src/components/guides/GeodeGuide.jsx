import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './GeodeGuide.module.css';
import SectionDivider from '../common/SectionDivider';
import { useLanguage } from '../../context/LanguageContext';
import { geodeGuideContent } from './content/geodeGuide.content';

const sectionVariant = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.4, ease: "easeOut" }
};

function renderFormattedText(text) {
  if (!text || typeof text !== 'string') return text;
  return <span dangerouslySetInnerHTML={{ __html: text }} />;
}

export default function GeodeGuide() {
  const { langCode } = useLanguage();
  const c = geodeGuideContent[langCode] || geodeGuideContent.en;
  const s = c.sections;

  const [selectedModule, setSelectedModule] = useState(null);

  const getIcon = (row) => {
    if (!row) return null;
    return row.iconUrl || row.icon || null;
  };

  return (
    <div className={styles.container}>
      {/* HERO SECTION */}
      <motion.header
        className={styles.hero}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <span className={styles.badge}>{renderFormattedText(c.hero.badge)}</span>
        <h1 className={styles.title}>{renderFormattedText(c.hero.title)}</h1>
        <p className={styles.description}>{renderFormattedText(c.hero.description)}</p>
      </motion.header>

      {/* 1. OVERVIEW */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.overview.step}</span>
        <h2 className={styles.sectionTitle}>{renderFormattedText(s.overview.title)}</h2>
        <span className={`${styles.lightBadge} ${styles.badgeCyan}`}>
          {renderFormattedText(s.overview.badge)}
        </span>
        <p className={styles.note}>{renderFormattedText(s.overview.desc)}</p>
      </motion.section>

      {/* 2. CENTRAL SPIRE FLOORS */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.spireFloors.step}</span>
        <h2 className={styles.sectionTitle}>{renderFormattedText(s.spireFloors.title)}</h2>
        <span className={`${styles.lightBadge} ${styles.badgeGold}`}>
          {renderFormattedText(s.spireFloors.badge)}
        </span>

        <div className={styles.floorGrid}>
          {s.spireFloors.floors.map((fl, idx) => (
            <div key={idx} className={styles.floorCard}>
              <div className={styles.floorHeader}>
                <span className={styles.stepNum}>0{idx + 1}</span>
                <h3>{renderFormattedText(fl.floor)}</h3>
              </div>
              <p className={styles.cardDesc}>{renderFormattedText(fl.desc)}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 3. SPECIALIZED WINGS */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.wings.step}</span>
        <h2 className={styles.sectionTitle}>{renderFormattedText(s.wings.title)}</h2>
        <span className={`${styles.lightBadge} ${styles.badgePurple}`}>
          {renderFormattedText(s.wings.badge)}
        </span>

        <div className={styles.grid}>
          {s.wings.cards.map((wing, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>{renderFormattedText(wing.name)}</h3>
                <span className={styles.cardTag}>{wing.npc}</span>
              </div>
              <p className={styles.cardDesc}>{renderFormattedText(wing.desc)}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 4. MODULES TABLE */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.modules.step}</span>
        <h2 className={styles.sectionTitle}>{renderFormattedText(s.modules.title)}</h2>
        <span className={`${styles.lightBadge} ${styles.badgeCyan}`}>
          {renderFormattedText(s.modules.badge)}
        </span>
        <p className={styles.note}>{renderFormattedText(s.modules.desc)}</p>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
              <thead>
                <tr>
                  {s.modules.headers.map((head, idx) => (
                    <th 
                      key={idx} 
                      style={{ height: "80px", verticalAlign: "middle", padding: "0 1.2rem" }}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
            <tbody>
              {s.modules.rows.map((row, idx) => {
                const iconUrl = getIcon(row);
                return (
                  <tr 
                    key={idx} 
                    className={styles.clickableRow}
                    onClick={() => setSelectedModule(row)}
                  >
                    <td className={styles.moduleNameCol}>
                      <div className={styles.moduleItemWrapper}>
                        <div className={styles.iconContainer}>
                          {iconUrl ? (
                            <img
                              src={iconUrl}
                              alt={typeof row.name === 'string' ? row.name.replace(/<[^>]*>?/gm, '') : 'Module'}
                              className={styles.itemIconImg}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                          ) : (
                            <div className={styles.iconPlaceholder} />
                          )}
                        </div>
                        <span className={styles.moduleNameText}>{renderFormattedText(row.name)}</span>
                      </div>
                    </td>
                    <td>{renderFormattedText(row.type)}</td>
                    <td className={styles.prioCol}>{renderFormattedText(row.prio)}</td>
                    <td className={styles.maxCol}>{renderFormattedText(row.max)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* 5. TIPS & PROGRESSION */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.tips.step}</span>
        <h2 className={styles.sectionTitle}>{renderFormattedText(s.tips.title)}</h2>
        <span className={`${styles.lightBadge} ${styles.badgeGold}`}>
          {renderFormattedText(s.tips.badge)}
        </span>

        <ul className={styles.bulletList}>
          {s.tips.list.map((tip, idx) => (
            <li key={idx} className={styles.bulletItem}>
              {renderFormattedText(tip)}
            </li>
          ))}
        </ul>
      </motion.section>

      {/* MODULE UPGRADE MODAL */}
      <AnimatePresence>
        {selectedModule && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedModule(null)}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.modalCloseBtn}
                onClick={() => setSelectedModule(null)}
              >
                ✕
              </button>

              <div className={styles.modalHeader}>
                <div className={styles.modalIconBox}>
                  {getIcon(selectedModule) ? (
                    <img 
                      src={getIcon(selectedModule)} 
                      alt={selectedModule.name} 
                      className={styles.modalIconImg}
                    />
                  ) : null}
                </div>
                <div className={styles.modalTitleBlock}>
                  <span className={styles.modalBadge}>{selectedModule.prio}</span>
                  <h2>{renderFormattedText(selectedModule.name)}</h2>
                  <p>{renderFormattedText(selectedModule.type)}</p>
                </div>
              </div>

              <div className={styles.modalDivider} />

              <div className={styles.modalBody}>
                <h4 className={styles.upgradeTitle}>Upgrade Costs & Tiers</h4>
                <div className={styles.upgradeList}>
                  {selectedModule.upgrades && selectedModule.upgrades.length > 0 ? (
                    selectedModule.upgrades.map((upg, uIdx) => (
                      <div key={uIdx} className={styles.upgradeCard}>
                        <div className={styles.tierHeader}>
                          <span className={styles.tierBadge}>Rank {upg.rank || uIdx + 1}</span>
                          <span className={styles.tierBenefit}>{upg.stats || upg.benefit || ""}</span>
                        </div>
                        <div className={styles.costGrid}>
                          {upg.costs && upg.costs.map((cost, cIdx) => (
                            <div key={cIdx} className={styles.costItem}>
                              <span className={styles.costAmount}>{cost.amount}x</span>
                              <span className={styles.costName}>{cost.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className={styles.emptyUpgradeNotice}>
                      Upgrade requirements will appear here for Rank 1 to 10.
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}