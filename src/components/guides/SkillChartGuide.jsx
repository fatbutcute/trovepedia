import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SkillChartGuide.module.css';
import SectionDivider from '../common/SectionDivider';
import { useLanguage } from '../../context/LanguageContext';
import { skillChartGuideContent } from './content/skillChartGuide.content';

const sectionVariant = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.4, ease: "easeOut" }
};

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

export default function SkillChartGuide() {
  const { langCode } = useLanguage();
  const c = skillChartGuideContent[langCode] || skillChartGuideContent.en;
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

      {/* 1. OVERVIEW & SKILL CHART LAYOUT KÉP */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.overview.step}</span>
        <h2 className={styles.sectionTitle}>{s.overview.title}</h2>
        <span className={`${styles.lightBadge} ${styles.badgeCyan}`}>
          {s.overview.badge}
        </span>
        <p className={styles.note}>{s.overview.desc}</p>

        {/* Főkép: Star Chart elrendezés */}
        <ImagePreviewBox 
          src="/guideimages/arsynskillchart.webp" 
          alt="Optimal Star Chart Path" 
          caption="Optimal Star Chart Path & Node Distribution"
          onOpen={handleOpenModal}
        />
      </motion.section>

      {/* 2. NODE COLORS & EFFECTS */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.nodeTypes.step}</span>
        <h2 className={styles.sectionTitle}>{s.nodeTypes.title}</h2>
        <span className={`${styles.lightBadge} ${styles.badgePurple}`}>
          {s.nodeTypes.badge}
        </span>

        <div className={styles.grid}>
          {s.nodeTypes.cards.map((card, idx) => {
            const colorClass = 
              card.color === 'green' ? styles.nodeCardGreen :
              card.color === 'purple' ? styles.nodeCardPurple :
              card.color === 'red' ? styles.nodeCardRed : styles.nodeCardBlue;

            return (
              <div key={idx} className={`${styles.card} ${colorClass}`}>
                <div className={styles.cardHeader}>
                  <span className={styles.stepNum}>0{idx + 1}</span>
                  <h3>{card.title}</h3>
                </div>
                <div>
                  <strong style={{ 
                    color: card.color === 'green' ? '#22c55e' : card.color === 'purple' ? '#c084fc' : card.color === 'red' ? '#f87171' : '#38bdf8',
                    fontSize: '1.05rem', 
                    display: 'inline-block', 
                    marginBottom: '6px' 
                  }}>
                    {card.stat}
                  </strong>
                </div>
                <p style={{ marginTop: 'auto' }}>{card.desc}</p>
              </div>
            );
          })}
        </div>

        <div className={styles.infoBox}>
          <i className="ri-information-line"></i>
          <span>{s.nodeTypes.extraInfo}</span>
        </div>
      </motion.section>

      {/* 3. ESSENTIAL RESOURCES & CELESTIAL NPC KÉPEK */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.resources.step}</span>
        <h2 className={styles.sectionTitle}>{s.resources.title}</h2>
        <span className={`${styles.lightBadge} ${styles.badgeGold}`}>
          {s.resources.badge}
        </span>

        <div className={styles.grid}>
          {s.resources.items.map((item, idx) => (
            <div key={idx} className={styles.costCard}>
              <span className={styles.costTitle}>{item.num}. {item.title}</span>
              <span className={styles.costSubtitle}>{item.subtitle}</span>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 3 Celestial NPC kép rács */}
        <div className={styles.imageGrid3}>
          <ImagePreviewBox 
            src="/guideimages/Celestial.webp" 
            alt="The Celestial NPC Hub Location" 
            caption="Celestial NPC in the Hub"
            onOpen={handleOpenModal}
          />
          <ImagePreviewBox 
            src="/guideimages/Celestial1.webp" 
            alt="Grand Orrery Bench Interface" 
            caption="Grand Orrery Crafting Bench"
            onOpen={handleOpenModal}
          />
          <ImagePreviewBox 
            src="/guideimages/Celestial2.webp" 
            alt="Purchasing Celestial Spheres" 
            caption="Celestial Spheres Exchange"
            onOpen={handleOpenModal}
          />
        </div>
      </motion.section>

      {/* 4. OPTIMIZATION TIPS & RESET KÉPEK */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.proTips.step}</span>
        <h2 className={styles.sectionTitle}>{s.proTips.title}</h2>
        <span className={`${styles.lightBadge} ${styles.badgeCyan}`}>
          {s.proTips.badge}
        </span>

        <div className={styles.grid}>
          {s.proTips.cards.map((tip, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.stepNum}>★</span>
                <h3>{tip.title}</h3>
              </div>
              <p>{tip.desc}</p>
            </div>
          ))}
        </div>

        {/* 2 kép: Almanac és Reset */}
        <div className={styles.imageGrid2}>
          <ImagePreviewBox 
            src="/guideimages/astralechoesalmanac.webp" 
            alt="Astral Echoes Almanac" 
            caption="Astral Echoes Almanac Tome (5,000 / week)"
            onOpen={handleOpenModal}
          />
          <ImagePreviewBox 
            src="/guideimages/startchartreset.webp" 
            alt="Star Chart Reset" 
            caption="Resetting the Star Chart (Key & Spheres)"
            onOpen={handleOpenModal}
          />
        </div>

        {/* EXTERNAL SPREADSHEET LINK BANNER */}
        <a 
          href="https://docs.google.com/spreadsheets/d/1Q2xdqeoHLafC9se5cy_Gpc54KnmpaQez7TGsc5C1Lqw/edit?usp=sharing" 
          target="_blank" 
          rel="noreferrer" 
          className={styles.linkBanner}
        >
          <div className={styles.linkContent}>
            <h4>Check out the Best Class Build Spreadsheet</h4>
            <p>Inspect recommended Star Chart node orders tailored specifically for your active class.</p>
          </div>
          <i className={`ri-external-link-line ${styles.linkIcon}`}></i>
        </a>
      </motion.section>

      {/* 5. RUNE ANVIL & ANVIL KÉPEK */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.anvil.step}</span>
        <h2 className={styles.sectionTitle}>{s.anvil.title}</h2>
        <span className={`${styles.lightBadge} ${styles.badgePurple}`}>
          {s.anvil.badge}
        </span>
        <p className={styles.note}>{s.anvil.desc}</p>

        <div className={styles.imageGrid2}>
          <ImagePreviewBox 
            src="/guideimages/anvil1.webp" 
            alt="Runic Anvil Upgrade Branch 1" 
            caption="Anvil Upgrade Path — Left Tree"
            onOpen={handleOpenModal}
          />
          <ImagePreviewBox 
            src="/guideimages/anvil2.webp" 
            alt="Runic Anvil Upgrade Branch 2" 
            caption="Anvil Upgrade Path — Right Tree"
            onOpen={handleOpenModal}
          />
        </div>

        <div className={styles.infoBox}>
          <i className="ri-shield-flash-line"></i>
          <span>{s.anvil.note}</span>
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
              {modalImage.alt && <span className={styles.modalCaption}>{modalImage.alt}</span>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}