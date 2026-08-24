import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './LeviathanTorchGuide.module.css';
import SectionDivider from '../common/SectionDivider';
import { useLanguage } from '../../context/LanguageContext';
import { leviathanTorchGuideContent } from './content/leviathanTorchGuide.content';

const sectionVariant = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.4, ease: "easeOut" }
};

// 🌐 Képfeliratok 4 nyelven a 6 új képhez
const imageCaptions = {
  en: {
    vale: "Eerie Vale - Dark Lair on Geode Topside",
    vault: "Leviathan Vault with Key Mold nearby",
    leviathans: "The Three Topside Leviathans",
    torches: "Temporary & Permanent Banner Torches",
    badges: "Leviathan Slayer Badges Progression",
    ego: "Ego Potion Reward Milestone"
  },
  fr: {
    vale: "Eerie Vale - Antre sombre de Geode Topside",
    vault: "Coffre de Léviathan et moule à clé",
    leviathans: "Les trois Léviathans de Geode Topside",
    torches: "Torches de bannière temporaires et permanentes",
    badges: "Progression des badges de Léviathan",
    ego: "Récompense de potion d'Ego"
  },
  es: {
    vale: "Eerie Vale - Guarida oscura en Geode Topside",
    vault: "Cofre de Leviatán y molde de llave",
    leviathans: "Los tres Leviatanes de Geode Topside",
    torches: "Antorchas temporales y permanentes",
    badges: "Progresión de insignias de cazador de Leviatán",
    ego: "Recompensa de Poción de Ego"
  },
  zh: {
    vale: "诡异峡谷 (Eerie Vale) - 晶洞地表黑暗巢穴",
    vault: "利维坦宝箱与万用钥匙模具",
    leviathans: "三大晶洞地表利维坦世界领主",
    torches: "临时与永久战旗火炬一览",
    badges: "利维坦击杀勋章成长体系",
    ego: "自我药水 (Ego Potion) 里程碑奖励"
  }
};

// 🌟 Színkövető csillag és formázó konverter
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

export default function LeviathanTorchGuide() {
  const { langCode } = useLanguage();
  const c = leviathanTorchGuideContent[langCode] || leviathanTorchGuideContent.en;
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

      {/* 1. OVERVIEW & EERIE VALE IMAGE */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.overview.step}</span>
        <h2 className={styles.sectionTitle}>{renderFormattedText(s.overview.title)}</h2>
        <span className={`${styles.lightBadge} ${styles.badgeCyan}`}>
          {renderFormattedText(s.overview.badge)}
        </span>
        
        <div className={styles.twoColRow}>
          <p className={styles.note}>{renderFormattedText(s.overview.desc)}</p>
          <div className={styles.compactImageWrap}>
          </div>
        </div>
            <ImagePreviewBox 
              src="/guideimages/Eerie_Vale_by_Trovesaurus.webp" 
              alt={cap.vale} 
              caption={cap.vale}
              onOpen={handleOpenModal}
            />
      </motion.section>

      {/* 2. MECHANICS, KEYS & VAULT IMAGE */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.mechanics.step}</span>
        <h2 className={styles.sectionTitle}>{renderFormattedText(s.mechanics.title)}</h2>
        <span className={`${styles.lightBadge} ${styles.badgeGold}`}>
          {renderFormattedText(s.mechanics.badge)}
        </span>

        <div className={styles.twoColRow}>
          <div className={styles.grid}>
            {s.mechanics.cards.map((card, idx) => (
              <div key={idx} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.stepNum}>0{idx + 1}</span>
                  <h3>{renderFormattedText(card.title)}</h3>
                </div>
                <p className={styles.cardDesc}>{renderFormattedText(card.desc)}</p>
              </div>
            ))}
          </div>

          <div className={styles.compactImageWrap}>
          </div>
        </div>
            <ImagePreviewBox 
              src="/guideimages/Leviathan_Vault_by_Trovesaurus.webp" 
              alt={cap.vault} 
              caption={cap.vault}
              onOpen={handleOpenModal}
            />
      </motion.section>

      {/* 3. BOSS TIERS & LEVIATHANS IMAGE */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.bossTiers.step}</span>
        <h2 className={styles.sectionTitle}>{renderFormattedText(s.bossTiers.title)}</h2>
        <span className={`${styles.lightBadge} ${styles.badgePurple}`}>
          {renderFormattedText(s.bossTiers.badge)}
        </span>

        <div className={styles.gridboss}>
          {s.bossTiers.cards.map((boss, idx) => (
            <div key={idx} className={styles.bossCard}>
              <div className={styles.cardHeader}>
                <span className={styles.stepNum}>0{idx + 1}</span>
                <h3>{renderFormattedText(boss.name)}</h3>
              </div>
              <div className={styles.bossMetaCol}>
                <span className={styles.bossLocationText}>{boss.location}</span>
                <span className={styles.bossLightText}>{boss.reqLight}</span>
              </div>
              <p className={styles.cardDesc2}>{renderFormattedText(boss.desc)}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '1rem' }}>
          <ImagePreviewBox 
            src="/guideimages/Leviathans_by_Trovesaurus.webp" 
            alt={cap.leviathans} 
            caption={cap.leviathans}
            onOpen={handleOpenModal}
          />
        </div>
      </motion.section>

      {/* 4. EXACT TORCH TABLE & TORCHES IMAGE */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.torchTable.step}</span>
        <h2 className={styles.sectionTitle}>{renderFormattedText(s.torchTable.title)}</h2>
        <span className={`${styles.lightBadge} ${styles.badgeGold}`}>
          {renderFormattedText(s.torchTable.badge)}
        </span>
        <p className={styles.note}>{renderFormattedText(s.torchTable.desc)}</p>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {s.torchTable.headers.map((head, idx) => (
                  <th key={idx}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.torchTable.rows.map((row, idx) => (
                <tr key={idx}>
                  <td className={styles.torchNameCol}>{renderFormattedText(row.name)}</td>
                  <td>{renderFormattedText(row.boss)}</td>
                  <td className={styles.lightCol}>{renderFormattedText(row.light)}</td>
                  <td className={styles.decayCol}>{renderFormattedText(row.decay)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <ImagePreviewBox 
            src="/guideimages/Torches_by_Trovesaurus.webp" 
            alt={cap.torches} 
            caption={cap.torches}
            onOpen={handleOpenModal}
          />
        </div>
      </motion.section>

      {/* 5. BADGES, MILESTONES & EGO POTION IMAGES */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.badges.step}</span>
        <h2 className={styles.sectionTitle}>{renderFormattedText(s.badges.title)}</h2>
        <span className={`${styles.lightBadge} ${styles.badgeCyan}`}>
          {renderFormattedText(s.badges.badge)}
        </span>
        <p className={styles.note}>{renderFormattedText(s.badges.desc)}</p>

        <ul className={styles.bulletList}>
          {s.badges.milestones.map((ms, idx) => (
            <li key={idx} className={styles.bulletItem}>
              <strong>{ms.kills}:</strong> {renderFormattedText(ms.reward)}
            </li>
          ))}
        </ul>

        <div className={styles.imageGrid2}>
          <ImagePreviewBox 
            src="/guideimages/Badges_by_Trovesaurus.webp" 
            alt={cap.badges} 
            caption={cap.badges}
            onOpen={handleOpenModal}
          />
          <ImagePreviewBox 
            src="/guideimages/Ego_Potion_by_Trovesaurus.webp" 
            alt={cap.ego} 
            caption={cap.ego}
            onOpen={handleOpenModal}
          />
        </div>

        <div className={styles.infoBox}>
          <i className="ri-shield-flash-line"></i>
          <span>
            {renderFormattedText(
              langCode === 'zh'
                ? "250 次击杀保底计数器全账号共享，击杀任意世界或深渊利维坦均可无缝累积！"
                : "The 250-kill pity tracker is account-wide across all difficulties and guarantees your permanent torch progress."
            )}
          </span>
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