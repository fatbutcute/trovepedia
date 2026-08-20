import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TowersShipsGuide.module.css';
import SectionDivider from '../common/SectionDivider';
import { useLanguage } from '../../context/LanguageContext';
import { towersShipsGuideContent } from './content/towersShipsGuide.content';

const sectionVariant = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.4, ease: "easeOut" }
};

// 🌐 Képfeliratok 4 nyelven
const imageCaptions = {
  en: {
    ship: "5★ Ship in Sundered Uplands",
    tower: "5★ Tower in Sundered Uplands",
    spots: "Optimal Tower Room Clearing Positions",
    cleaner: "Cleaner Spot & Boss Room Loot Position"
  },
  fr: {
    ship: "Vaisseau 5★ des Sundered Uplands",
    tower: "Tour 5★ des Sundered Uplands",
    spots: "Positions optimales de nettoyage des salles",
    cleaner: "Emplacement de nettoyage & butin du boss"
  },
  es: {
    ship: "Barco 5★ en Sundered Uplands",
    tower: "Torre 5★ en Sundered Uplands",
    spots: "Posiciones óptimas de limpieza de salas",
    cleaner: "Punto de limpieza y botín de la sala del jefe"
  },
  zh: {
    ship: "裂隙高地 5★ 飞船副本",
    tower: "裂隙高地 5★ 高塔副本",
    spots: "高塔房间最佳清理战术站位",
    cleaner: "清场点与 Boss 房宝箱拾取点位"
  }
};

// 🌟 Automatikus színkövető StarGear csillag konverter (currentColor alapú maszkkal)
function renderFormattedText(text) {
  if (!text || typeof text !== 'string') return text;

  const starIconHtml = `
    <span 
      style="
        display: inline-block;
        width: 1.05em;
        height: 1.05em;
        vertical-align: -0.15em;
        margin: 0 2px;
        background-color: currentColor;
        -webkit-mask-image: url('/icons/stargear.png');
        mask-image: url('/icons/stargear.png');
        -webkit-mask-size: contain;
        mask-size: contain;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-position: center;
        mask-position: center;
      "
    ></span>
  `;

  let parsedText = text
    .replace(/(★|\*)/g, starIconHtml)
    .replace(/5[\s-]?stars?/gi, `5${starIconHtml}`)
    .replace(/5[\s-]?étoiles?/gi, `5${starIconHtml}`)
    .replace(/5[\s-]?estrellas?/gi, `5${starIconHtml}`)
    .replace(/5[\s-]?星/g, `5${starIconHtml}`);

  return <span dangerouslySetInnerHTML={{ __html: parsedText }} />;
}

// 🖼️ Kattintható, nagyítható kép komponens
function ImagePreviewBox({ src, alt, caption, onOpen }) {
  return (
    <div className={styles.imageCard} onClick={() => onOpen(src, alt, caption)}>
      <div className={styles.imageWrapper}>
        <img src={src} alt={alt} loading="lazy" />
        <div className={styles.expandBadge} title="Click to enlarge">
          <img src="/icons/questexpand.png" alt="Enlarge" />
        </div>
      </div>
      {caption && <span className={styles.imageCaption}>{renderFormattedText(caption)}</span>}
    </div>
  );
}

export default function TowersShipsGuide() {
  const { langCode } = useLanguage();
  const c = towersShipsGuideContent[langCode] || towersShipsGuideContent.en;
  const s = c.sections;
  const cap = imageCaptions[langCode] || imageCaptions.en;

  // Modal állapot
  const [modalImage, setModalImage] = useState(null);

  const handleOpenModal = (src, alt, caption) => {
    setModalImage({ src, alt, caption });
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
        <span className={styles.badge}>{renderFormattedText(c.hero.badge)}</span>
        <h1 className={styles.title}>{renderFormattedText(c.hero.title)}</h1>
        <p className={styles.description}>{renderFormattedText(c.hero.description)}</p>
      </motion.header>

      {/* 1. OVERVIEW */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.overview.step}</span>
        <h2 className={styles.sectionTitle}>{renderFormattedText(s.overview.title)}</h2>
        <span className={`${styles.lightBadge} ${styles.badgeGold}`}>
          {renderFormattedText(s.overview.badge)}
        </span>
        <p className={styles.note}>{renderFormattedText(s.overview.desc)}</p>
      </motion.section>

      {/* 2. SHIPS (D13 XP FARMING) */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.ships.step}</span>
        <h2 className={styles.sectionTitle}>{renderFormattedText(s.ships.title)}</h2>
        <span className={`${styles.lightBadge} ${styles.badgeCyan}`}>
          {renderFormattedText(s.ships.badge)}
        </span>
        <p className={styles.note}>{renderFormattedText(s.ships.desc)}</p>

        {/* 2 oszlopos elrendezés: Szöveges adatok és Ship kép */}
        <div className={styles.twoColRow}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className={styles.infoBox}>
              <i className="ri-calendar-event-line"></i>
              <span>{renderFormattedText(s.ships.timing)}</span>
            </div>
            <div className={styles.infoBox}>
              <i className="ri-flag-line"></i>
              <span>{renderFormattedText(s.ships.objectiveDesc)}</span>
            </div>
          </div>

          <div className={styles.compactImageWrap}>
            <ImagePreviewBox 
              src="/guideimages/ship.webp" 
              alt={cap.ship} 
              caption={cap.ship}
              onOpen={handleOpenModal}
            />
          </div>
        </div>

        {/* 7-Player Team Setup kártyák */}
        <div className={styles.grid}>
          {s.ships.composition.map((comp, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.stepNum}>0{idx + 1}</span>
                <h3>{renderFormattedText(comp.role)}</h3>
              </div>
              <p style={{ marginTop: 'auto', color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5' }}>
                {renderFormattedText(comp.desc)}
              </p>
            </div>
          ))}
        </div>

        <div className={styles.infoBox}>
          <i className="ri-information-line"></i>
          <span>{renderFormattedText(s.ships.roomTip)}</span>
        </div>
      </motion.section>

      {/* 3. TOWERS (D14 PHOENIX MOTES) */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.towers.step}</span>
        <h2 className={styles.sectionTitle}>{renderFormattedText(s.towers.title)}</h2>
        <span className={`${styles.lightBadge} ${styles.badgeGold}`}>
          {renderFormattedText(s.towers.badge)}
        </span>
        <p className={styles.note}>{renderFormattedText(s.towers.desc)}</p>

        {/* 2 oszlopos elrendezés: Tower kép és infók */}
        <div className={styles.twoColRow}>
          <ul className={styles.bulletList}>
            <li className={styles.bulletItem}>
              {renderFormattedText(s.towers.requirements)}
            </li>
            {s.towers.drops.map((drop, idx) => (
              <li key={idx} className={styles.bulletItem}>
                {renderFormattedText(drop)}
              </li>
            ))}
          </ul>

          <div className={styles.compactImageWrap}>
            <ImagePreviewBox 
              src="/guideimages/tower.webp" 
              alt={cap.tower} 
              caption={cap.tower}
              onOpen={handleOpenModal}
            />
          </div>
        </div>

        {/* Tippek lista */}
        <ul className={styles.bulletList}>
          {s.towers.tips.map((tip, idx) => (
            <li key={idx} className={styles.bulletItem}>
              {renderFormattedText(tip)}
            </li>
          ))}
        </ul>
      </motion.section>

      {/* 4. BEST SPOTS & POSITIONS */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.spots.step}</span>
        <h2 className={styles.sectionTitle}>{renderFormattedText(s.spots.title)}</h2>
        <span className={`${styles.lightBadge} ${styles.badgePurple}`}>
          {renderFormattedText(s.spots.badge)}
        </span>
        <p className={styles.note}>{renderFormattedText(s.spots.desc)}</p>

        <div className={styles.imageGrid2}>
          <ImagePreviewBox 
            src="/guideimages/towerspot.webp" 
            alt={cap.spots} 
            caption={cap.spots}
            onOpen={handleOpenModal}
          />
          <ImagePreviewBox 
            src="/guideimages/towerspot2.webp" 
            alt={cap.cleaner} 
            caption={cap.cleaner}
            onOpen={handleOpenModal}
          />
        </div>
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
              {modalImage.caption && (
                <span className={styles.modalCaption}>
                  {renderFormattedText(modalImage.caption)}
                </span>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}