// src/components/guides/GemBasicsScrolly.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './GemBasicsScrolly.module.css';

const DEFAULT_STEPS = [
{
  id: 'step-1',
  num: "1",
  tier: "Tier Ceiling",
  title: "Tier determines its potential",
  description:
    'A gem\'s tier determines its maximum potential, including how high it can level and how powerful its stats can become. While Trove features several gem tiers, the four most important are <strong style="color: #e2e8f0;">Radiant</strong>, <strong style="color: #f59e0b;">Stellar</strong>, <strong style="color: #2effee;">Crystal</strong>, and <strong style="color: #c084fc;">Mystic</strong>. A gem\'s tier never changes through leveling, but it can be upgraded by one tier with a Converter while keeping all of its progress.',
  gemImg: "/gemtiers/water.png",
  color: "#2effee"
},
{
  id: 'step-2',
  num: "2",
  tier: "Classification",
  title: "Lesser vs. Empowered",
  description:
    'Lesser Gems are limited to a single damage type. Empowered Gems remove that limitation, offer stronger stat rolls, and come with a unique special ability. Since you can equip far fewer Empowered Gems, choosing the right ones is much more important.',
  gemImages: ["/gemtiers/air.png", "/gemtiers/empair.png"],
  color: "#f59e0b"
},
{
  id: 'step-3',
  num: "3",
  tier: "Sockets",
  title: "Elements determine the socket",
  description:
    'Every gem belongs to one of four elements: Water, Fire, Air, or Cosmic. A gem can only be placed into a socket that matches its element. Cosmic Gems are unique because they always include the Light stat which cannot be rerolled.',
  gemImg: "/gemtiers/cosmic.png",
  color: "#ff0f6b"
},
{
  id: 'step-4',
  num: "4",
  tier: "Stat Rolls",
  title: "Understanding stat rolls",
  description:
    'When a gem drops, it randomly rolls either two or three stats from a pool that includes Damage, Critical Damage, Critical Hit, and Health. Each stat also rolls with a random value. Always check a gem\'s stats before investing in it, and only keep gems that roll with all three stats.',
  gemImg: "/gemtiers/fire.png",
  color: "#c084fc"
},
{
  id: 'step-5',
  num: "5",
  tier: "Optimization",
  title: "Maximize its potential",
  description:
    'Once you have a good gem, level it up with Gem Dust to increase its Power Rank and unlock additional stat boosts. Afterward, use Focuses to optimize every stat until they reach 100%, creating a fully perfected gem.',
  gemImg: "/gemtiers/stellar.png",
  color: "#fbbf24"
}
];

export function GemBasicsScrolly({
  title = 'Learn the basics of gems',
  subtitle = 'Every gem in the game follows this pattern. One you understand the basics, you can dive more deeper into the details of gems.',
  steps = DEFAULT_STEPS,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const stepRefs = useRef([]);
  stepRefs.current = [];

  const addStepRef = (el) => {
    if (el) stepRefs.current.push(el);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.stepIndex);
            setActiveIndex(idx);
          }
        });
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0,
      }
    );

    stepRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [steps]);

  const active = steps[activeIndex] ?? steps[0];

  // Automatikus képváltó időzítő (Slider logic)
    useEffect(() => {
    if (active.gemImages && active.gemImages.length > 1) {
      const interval = setInterval(() => {
        setSlideIndex((prev) => (prev + 1) % active.gemImages.length);
      }, 2500); // 2.5 másodpercenként váltja a 2 képet

      return () => clearInterval(interval);
    } else {
      setSlideIndex(0);
    }
  }, [active]);

  // Kitaláljuk az aktuálisan megjelenítendő képet
    const currentImage = active.gemImages 
    ? active.gemImages[slideIndex % active.gemImages.length] 
    : active.gemImg;

  const railMarkerPositions = useMemo(() => {
    if (steps.length <= 1) return [50];
    return steps.map((_, i) => (i / (steps.length - 1)) * 100);
  }, [steps]);

  return (
    <section
      className={styles.scrollySection}
      style={{ '--gem-color': active.color }}
    >
      <header className={styles.header}>
        <h2 className={styles.mainTitle}>{title}</h2>
        <p className={styles.subTitle}>{subtitle}</p>
      </header>

      <div className={styles.gridContainer}>
        {/* Cut-line progress rail */}
        <div className={styles.railColumn}>
          <div className={styles.railTrack}>
            <div
              className={styles.railFill}
              style={{
                height: `${(activeIndex / Math.max(steps.length - 1, 1)) * 100}%`,
              }}
            />
            {steps.map((step, i) => (
              <div
                key={step.id}
                className={`${styles.railMarker} ${
                  i <= activeIndex ? styles.railMarkerActive : ''
                }`}
                style={{
                  top: `${railMarkerPositions[i]}%`,
                  '--marker-color': step.color,
                }}
              />
            ))}
          </div>
        </div>

        {/* Sticky Gem Card - Automatikusan váltó diaképpel */}
    <div className={styles.stickyColumn}>
      <div className={styles.previewCard}>
        <div className={styles.gemDisplay}>
          <div className={styles.glowBg} />
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage} // Important: currentImage a key!
              src={currentImage}
              alt={active.title}
              className={styles.gemImg}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.35 }}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>

        {/* Scrolling steps */}
        <div className={styles.scrollColumn}>
          {steps.map((step, i) => (
            <div
              key={step.id}
              id={step.id}
              ref={addStepRef}
              data-step-index={i}
              className={`${styles.stepBlock} ${
                i === activeIndex ? styles.activeBlock : ''
              }`}
            >
              <div className={styles.stepHeader}>
                <span
                  className={styles.stepNumber}
                  style={{ color: step.color }}
                >
                  {step.num} —
                </span>
                <span
                  className={styles.stepTier}
                  style={{ '--step-color': step.color }}
                >
                  {step.tier}
                </span>
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p
                className={styles.stepDescription}
                dangerouslySetInnerHTML={{ __html: step.description }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GemBasicsScrolly;