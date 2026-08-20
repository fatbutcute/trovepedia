import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MysticGearGuide.module.css';
import SectionDivider from '../common/SectionDivider';
import { useLanguage } from '../../context/LanguageContext';
import { mysticGearGuideContent } from './content/mysticGearGuide.content';

const sectionVariant = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.4, ease: "easeOut" }
};

// 🌟 Frissített függvény: HTML tageket és a StarGear csillagokat is helyesen rendereli
function renderFormattedText(text) {
  if (typeof text !== 'string') return text;

  // Először lecseréljük a ★ csillagokat egy speciális placeholderre
  const starImgHtml = '<img src="/icons/stargear.png" alt="★" style="width:1em;height:1em;display:inline-block;vertical-align:text-bottom;margin:0 2px;object-fit:contain;" />';
  const parsedText = text.replace(/(★|\*)/g, starImgHtml);

  return <span dangerouslySetInnerHTML={{ __html: parsedText }} />;
}

// 🌟 Automatikus segédfüggvény a ★ csillagok /icons/stargear.png-re cserélésére
function renderWithStarGear(text) {
  if (typeof text !== 'string') return text;
  const parts = text.split(/(★|\*)/g);
  return parts.map((part, idx) => {
    if (part === '★' || part === '*') {
      return (
        <img
          key={idx}
          src="/icons/stargear.png"
          alt="★"
          style={{
            width: '1em',
            height: '1em',
            display: 'inline-block',
            verticalAlign: 'text-bottom',
            margin: '2px 2px',
            objectFit: 'contain'
          }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      );
    }
    return part;
  });
}

// 🖼️ Kattintható, nagyítható kép komponens
function ImagePreviewBox({ src, alt, caption, onOpen }) {
  return (
    <div className={styles.imageCard} onClick={() => onOpen(src, alt)}>
      <div className={styles.imageWrapper}>
        <img src={src} alt={alt} loading="lazy" />
        <div className={styles.expandBadge} title="Click to enlarge">
          <img src="/icons/questexpand.png" alt="Enlarge" />
        </div>
      </div>
      {caption && <span className={styles.imageCaption}>{caption}</span>}
    </div>
  );
}

export default function MysticGearGuide() {
  const { langCode } = useLanguage();
  const c = mysticGearGuideContent[langCode] || mysticGearGuideContent.en;
  const s = c.sections;

  // Modal állapot
  const [modalImage, setModalImage] = useState(null);

  const handleOpenModal = (src, alt) => {
    setModalImage({ src, alt });
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  // Escape gomb figyelése
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleCloseModal();
    };
    if (modalImage) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalImage]);

  return (
    <div className={styles.container}>
      {/* HERO SECTION */}
      <motion.header
        className={styles.hero}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <span className={styles.badge}>{c.hero.badge}</span>
        <h1 className={styles.title}>{c.hero.title}</h1>
        <p className={styles.description}>{c.hero.description}</p>
      </motion.header>

      {/* 1. OVERVIEW */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.overview.step}</span>
        <h2 className={styles.sectionTitle}>{s.overview.title}</h2>
        <span className={`${styles.lightBadge} ${styles.badgePurple}`}>
          {s.overview.badge}
        </span>
        <p className={styles.note}>{renderWithStarGear(s.overview.desc)}</p>
      </motion.section>

      {/* 2. TOTAL UPGRADE COSTS */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.totalCosts.step}</span>
        <h2 className={styles.sectionTitle}>{s.totalCosts.title}</h2>
        <span className={`${styles.lightBadge} ${styles.badgeGold}`}>
          {s.totalCosts.badge}
        </span>
        <p className={styles.note}>{renderWithStarGear(s.totalCosts.desc)}</p>

        <div className={styles.grid}>
          {s.totalCosts.items.map((item, idx) => (
            <div key={idx} className={styles.costCard}>
              <div className={styles.costCardTitle}>{renderWithStarGear(item.name)}</div>
              <div className={styles.costCardAmount}>{renderWithStarGear(item.total)}</div>
              <div className={styles.costCardMeta}>
                <span>{item.cost}</span>
                <span>{item.type}</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
                {renderWithStarGear(item.desc)}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 3. 8-WEEK FARMING STRATEGY */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.strategy.step}</span>
        <h2 className={styles.sectionTitle}>{s.strategy.title}</h2>
        <span className={`${styles.lightBadge} ${styles.badgeCyan}`}>
          {s.strategy.badge}
        </span>
        <p className={styles.note}>{renderWithStarGear(s.strategy.desc)}</p>

        <div className={styles.grid}>
          {s.strategy.coreMethods.map((method, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.stepNum}>0{idx + 1}</span>
                <h3>{renderWithStarGear(method.title)}</h3>
              </div>
              <div>
                <strong style={{ color: '#2effee', fontSize: '1.1rem', display: 'inline-block', marginBottom: '4px' }}>
                  {method.yield}
                </strong>
              </div>
              <p style={{ marginTop: 'auto', color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5' }}>
                {renderWithStarGear(method.desc)}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

        {/* 4. SOUL OF THE DEPTHS (MONDAY BONUS) */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.soulFarming.step}</span>
        <h2 className={styles.sectionTitle}>{s.soulFarming.title}</h2>
        <span className={`${styles.lightBadge} ${styles.badgePurple}`}>
          {s.soulFarming.badge}
        </span>
        <p className={styles.note}>{renderFormattedText(s.soulFarming.desc)}</p>

        {/* 2 oszlopos elrendezés: Balra a pontok, Jobbra a kompakt kép */}
        <div className={styles.twoColRow}>
          <ul className={styles.bulletList}>
            {s.soulFarming.points.map((point, idx) => (
              <li key={idx} className={styles.bulletItem}>
                {renderFormattedText(point)}
              </li>
            ))}
          </ul>

          <div className={styles.compactImageWrap}>
            <ImagePreviewBox 
              src="/guideimages/soulofthedepths.webp" 
              alt="Farming Soul of the Depths" 
              onOpen={handleOpenModal}
            />
          </div>
        </div>
      </motion.section>

        {/* 5. DEEPSTONE GATHERING (TUESDAY BONUS) */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.deepstoneFarming.step}</span>
        <h2 className={styles.sectionTitle}>{s.deepstoneFarming.title}</h2>
        <span className={`${styles.lightBadge} ${styles.badgeGold}`}>
          {s.deepstoneFarming.badge}
        </span>
        <p className={styles.note}>{renderFormattedText(s.deepstoneFarming.desc)}</p>

        <ul className={styles.bulletList}>
          {s.deepstoneFarming.tips.map((tip, idx) => (
            <li 
              key={idx} 
              className={styles.bulletItem}
            >
              {renderFormattedText(tip)}
            </li>
          ))}
        </ul>
      </motion.section>

      {/* 🔍 LIGHTBOX MODAL */}
      <AnimatePresence>
        {modalImage && (
          <motion.div 
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.closeBtn} 
                onClick={handleCloseModal}
                title="Close"
              >
                ✕
              </button>
              <img src={modalImage.src} alt={modalImage.alt} />
              {modalImage.alt && <span className={styles.modalCaption}>{modalImage.alt}</span>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}