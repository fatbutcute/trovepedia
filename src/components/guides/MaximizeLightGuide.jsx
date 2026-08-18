import React from 'react';
import { motion } from 'framer-motion';
import styles from './MaximizeLightGuide.module.css'; // 👈 ITT AZ ÚJ DEDIKÁLT CSS IMPORT!
import SectionDivider from '../common/SectionDivider';
import { useLanguage } from '../../context/LanguageContext';
import { maximizeLightGuideContent } from './content/maximizeLightGuide.content';

const sectionVariant = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.4, ease: "easeOut" }
};

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

export default function MaximizeLightGuide() {
  const { langCode } = useLanguage();
  const c = maximizeLightGuideContent[langCode] || maximizeLightGuideContent.en;
  const s = c.sections;

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

      {/* 1. COSMIC GEMS SECTION */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.cosmicGems.step}</span>
        <h2 className={styles.sectionTitle}>{s.cosmicGems.title}</h2>
        <span className={`${styles.lightBadge} ${styles.badgeCyan}`}>
          {renderWithStarGear(s.cosmicGems.totalBadge)}
        </span>
        <p className={styles.note}>{renderWithStarGear(s.cosmicGems.desc)}</p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.stepNum}>★</span>
              <h3>{s.cosmicGems.empoweredTitle}</h3>
            </div>
            <p><strong style={{ color: '#2effee', fontSize: '1.15rem' }}>{s.cosmicGems.empoweredLight}</strong></p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.stepNum}>★</span>
              <h3>{s.cosmicGems.lesserTitle}</h3>
            </div>
            <p><strong style={{ color: '#38bdf8', fontSize: '1.15rem' }}>{s.cosmicGems.lesserLight}</strong></p>
          </div>
        </div>

        <div className={styles.infoBox}>
          <i className="ri-information-line"></i>
          <span>{renderWithStarGear(s.cosmicGems.rule)}</span>
        </div>
      </motion.section>

      {/* 2. C5 GEAR SECTION */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.c5Gear.step}</span>
        <h2 className={styles.sectionTitle}>{s.c5Gear.title}</h2>
        <span className={`${styles.lightBadge} ${styles.badgeCyan}`}>
          {s.c5Gear.totalBadge}
        </span>

        <div className={styles.grid}>
          {s.c5Gear.items.map((item, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.stepNum}>0{idx + 1}</span>
                <h3>{item.name}</h3>
              </div>
              <p>
                <strong style={{ color: '#2effee', fontSize: '1.1rem' }}>{item.light}</strong><br />
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{renderWithStarGear(item.pr)}</span>
              </p>
            </div>
          ))}
        </div>

        <div className={styles.costPanelGrid}>
          {s.c5Gear.costs.map((cost, idx) => (
            <div key={idx} className={styles.costCard}>
              <span className={styles.costTitle}>{renderWithStarGear(cost.label)}</span>
              <ul>
                <li>• {cost.cores}</li>
                <li>• {cost.frags}</li>
                <li>• {cost.flux}</li>
              </ul>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 3. MYSTIC GEAR SECTION */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.mysticGear.step}</span>
        <h2 className={styles.sectionTitle} style={{ color: '#c084fc' }}>{s.mysticGear.title}</h2>
        <span className={`${styles.lightBadge} ${styles.badgePurple}`}>
          {s.mysticGear.totalBadge}
        </span>
        <p className={styles.note}>{renderWithStarGear(s.mysticGear.forgeTip)}</p>

        <div className={styles.grid}>
          {s.mysticGear.items.map((item, idx) => (
            <div key={idx} className={styles.card} style={{ borderColor: 'rgba(192, 132, 252, 0.25)' }}>
              <div className={styles.cardHeader}>
                <span className={styles.stepNum} style={{ color: '#c084fc', background: 'rgba(192, 132, 252, 0.15)' }}>0{idx + 1}</span>
                <h3>{item.name}</h3>
              </div>
              <p>
                <strong style={{ color: '#c084fc', fontSize: '1.1rem' }}>{item.light}</strong><br />
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{renderWithStarGear(item.pr)}</span>
              </p>
            </div>
          ))}
        </div>

        <div className={styles.costPanelGrid}>
          {s.mysticGear.costs.map((cost, idx) => (
            <div key={idx} className={`${styles.costCard} ${styles.costCardPurple}`}>
              <span className={styles.costTitle} style={{ color: '#c084fc' }}>{renderWithStarGear(cost.label)}</span>
              <ul>
                <li>• {cost.cores}</li>
                <li>• {cost.souls}</li>
                <li>• {cost.deepstone}</li>
              </ul>
            </div>
          ))}
        </div>
      </motion.section>

{/* 4. MISC GEAR SECTION */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.miscGear.step}</span>
        <h2 className={styles.sectionTitle}>{s.miscGear.title}</h2>
        <span className={`${styles.lightBadge} ${styles.badgeGold}`}>
          {s.miscGear.totalBadge}
        </span>

        <div className={styles.grid}>
          {/* BANNER CARD */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.stepNum}>01</span>
              <h3>{s.miscGear.bannerTitle}</h3>
            </div>
            <div>
              <strong style={{ color: '#fbbf24', fontSize: '1.05rem', display: 'inline-block', marginBottom: '6px' }}>
                {s.miscGear.bannerLight}
              </strong>
              {/* 👇 minHeight: '2.8rem' lefoglalja a 2 sornyi helyet fixen! */}
              <div style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: '1.4', minHeight: '2.8rem' }}>
                {s.miscGear.bannerName}
              </div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: '1.5', margin: 'auto 0 0 0', paddingTop: '10px' }}>
              {s.miscGear.bannerDesc}
            </p>
          </div>

          {/* RING CARD */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.stepNum}>02</span>
              <h3>{s.miscGear.ringTitle}</h3>
            </div>
            <div>
              <strong style={{ color: '#fbbf24', fontSize: '1.05rem', display: 'inline-block', marginBottom: '6px' }}>
                {s.miscGear.ringLight}
              </strong>
              {/* 👇 minHeight: '2.8rem' lefoglalja a 2 sornyi helyet fixen! */}
              <div style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: '1.4', minHeight: '2.8rem' }}>
                {s.miscGear.ringName}
              </div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: '1.5', margin: 'auto 0 0 0', paddingTop: '10px' }}>
              {s.miscGear.ringDesc}
            </p>
          </div>

          {/* AUTO-USE CARD */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.stepNum}>03</span>
              <h3>{s.miscGear.autoTitle}</h3>
            </div>
            <div>
              <strong style={{ color: '#fbbf24', fontSize: '1.05rem', display: 'inline-block', marginBottom: '6px' }}>
                {s.miscGear.autoLight}
              </strong>
              {/* 👇 minHeight: '2.8rem' lefoglalja a 2 sornyi helyet fixen! */}
              <div style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: '1.4', minHeight: '2.8rem' }}>
                {s.miscGear.autoName}
              </div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: '1.5', margin: 'auto 0 0 0', paddingTop: '10px' }}>
              {s.miscGear.autoDesc}
            </p>
          </div>
        </div>

      </motion.section>

      {/* 5. ALLIES SECTION */}
<motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.allies.step}</span>
        <h2 className={styles.sectionTitle}>{s.allies.title}</h2>
        <span className={`${styles.lightBadge} ${styles.badgeCyan}`}>
          {s.allies.totalBadge}
        </span>

        <div className={styles.grid}>
          {/* SCORPIUS (PD) */}
          <div className={styles.card} style={{ position: 'relative' }}>
            <div className={styles.cardHeader} style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className={styles.stepNum}>PD</span>
                <h3>{s.allies.pdName}</h3>
              </div>
              <img 
                src="/allies/scorpius.png" 
                alt={s.allies.pdName} 
                style={{ width: '60px', height: '60px', objectFit: 'contain', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <p style={{ marginTop: '-2rem' }}>
              <strong style={{ color: '#38bdf8', fontSize: '1.15rem' }}>
                {s.allies.pdLight}
              </strong>
            </p>
          </div>

          {/* ORCHIAN (MD) */}
          <div className={styles.card} style={{ position: 'relative' }}>
            <div className={styles.cardHeader} style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className={styles.stepNum}>MD</span>
                <h3>{s.allies.mdName}</h3>
              </div>
              <img 
                src="/allies/orchian.png" 
                alt={s.allies.mdName} 
                style={{ width: '60px', height: '60px', objectFit: 'contain', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <p style={{ marginTop: '-2rem' }}>
              <strong style={{ color: '#c084fc', fontSize: '1.15rem' }}>
                {s.allies.mdLight}
              </strong>
            </p>
          </div>
        </div>

        <div className={styles.infoBox}>
          <span>{s.allies.note450}</span>
        </div>

      </motion.section>

      {/* 6. DRAGONS SECTION */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.dragons.step}</span>
        <h2 className={styles.sectionTitle}>{s.dragons.title}</h2>
        <span className={`${styles.lightBadge} ${styles.badgeGold}`}>
          {s.dragons.totalBadge}
        </span>

        <div className={styles.dragonList}>
          {s.dragons.list.map((dragon, idx) => (
            <div key={idx} className={styles.dragonRow} style={{ borderLeftColor: idx === 2 ? '#c084fc' : '#fbbf24' }}>
              <div className={styles.dragonIdentity}>
                <h4>{dragon.name}</h4>
                <p className={styles.dragonCost}><strong>Cost:</strong> {dragon.cost}</p>
                {dragon.note && <p style={{ color: '#2effee', fontSize: '0.85rem', margin: '4px 0 0 0' }}>{dragon.note}</p>}
              </div>
              <div className={styles.dragonLight}>+{dragon.light}</div>
            </div>
          ))}
        </div>

      </motion.section>

      {/* 7. STAR CHART SECTION */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.starChart.step}</span>
        <h2 className={styles.sectionTitle}>{s.starChart.title}</h2>
        <span className={`${styles.lightBadge} ${styles.badgeCyan}`}>
          {s.starChart.totalBadge}
        </span>
        <p className={styles.note}>{s.starChart.nodes}</p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.stepNum}>★</span>
              <h3>{s.starChart.keysTitle}</h3>
            </div>
            <p>{s.starChart.keysDesc}</p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.stepNum}>★</span>
              <h3>{s.starChart.spheresTitle}</h3>
            </div>
            <p>{s.starChart.spheresDesc}</p>
          </div>
        </div>

      </motion.section>

      {/* 8. OTHER BUFFS SECTION */}
      <motion.section className={styles.section} {...sectionVariant}>
        <SectionDivider />
        <span className={styles.sectionStep}>{s.otherBuffs.step}</span>
        <h2 className={styles.sectionTitle}>{s.otherBuffs.title}</h2>
        <span className={`${styles.lightBadge} ${styles.badgeCyan}`}>
          {s.otherBuffs.totalBadge}
        </span>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.stepNum}>01</span>
              <h3>{s.otherBuffs.solarionTitle}</h3>
            </div>
            <p>
              <strong style={{ color: '#2effee', fontSize: '1.05rem'}}>+{s.otherBuffs.solarionLight}</strong><br />
              {s.otherBuffs.solarionDesc}
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.stepNum}>02</span>
              <h3>{s.otherBuffs.geodeTitle}</h3>
            </div>
            <p>
              <strong style={{ color: '#2effee', fontSize: '1.05rem' }}>+{s.otherBuffs.geodeLight}</strong><br />
              {s.otherBuffs.geodeDesc}
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.stepNum}>03</span>
              <h3>{s.otherBuffs.litanyTitle}</h3>
            </div>
            <p>{s.otherBuffs.litanyDesc}</p>
          </div>
        </div>

      </motion.section>

      {/* 9. FINAL SUMMARY */}
      <motion.section className={styles.section} {...sectionVariant}>
        <div className={styles.summaryBanner}>
          <h3>{s.everything.title}</h3>
          <div className={styles.summaryList}>
            <div><strong>C5 Gear:</strong> {s.everything.c5Total}</div>
            <div><strong>Mystic Gear:</strong> {s.everything.mysticTotal}</div>

          </div>
        </div>
            <div className={styles.summaryMax}>{s.everything.absoluteMax}</div>
      </motion.section>
    </div>
  );
}