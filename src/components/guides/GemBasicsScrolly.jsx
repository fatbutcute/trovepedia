import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './GemBasicsScrolly.module.css';
import { useLanguage } from '../../context/LanguageContext';
import { gemsGuideContent } from './content/gemsGuide.content';

const BASE_STEPS = [
  { id: 'step-1', gemImg: "/gemtiers/water.png", color: "#2effee" },
  { id: 'step-2', gemImages: ["/gemtiers/air.png", "/gemtiers/empair.png"], color: "#f59e0b" },
  { id: 'step-3', gemImg: "/gemtiers/cosmic.png", color: "#ff0f6b" },
  { id: 'step-4', gemImg: "/gemtiers/fire.png", color: "#c084fc" },
  { id: 'step-5', gemImg: "/gemtiers/stellar.png", color: "#fbbf24" }
];

export function GemBasicsScrolly() {
  const { langCode } = useLanguage();
  const scrollyData = gemsGuideContent[langCode]?.scrolly || gemsGuideContent.en.scrolly;

  const steps = BASE_STEPS.map((step, idx) => {
    const textData = scrollyData.steps[idx] || gemsGuideContent.en.scrolly.steps[idx];
    return {
      ...step,
      ...textData
    };
  });

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
            setActiveIndex(Number(entry.target.dataset.stepIndex));
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    stepRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [steps]);

  const active = steps[activeIndex] ?? steps[0];

  useEffect(() => {
    if (active.gemImages && active.gemImages.length > 1) {
      const interval = setInterval(() => {
        setSlideIndex((prev) => (prev + 1) % active.gemImages.length);
      }, 2500);
      return () => clearInterval(interval);
    } else {
      setSlideIndex(0);
    }
  }, [active]);

  const currentImage = active.gemImages 
    ? active.gemImages[slideIndex % active.gemImages.length] 
    : active.gemImg;

  const railMarkerPositions = useMemo(() => {
    if (steps.length <= 1) return [50];
    return steps.map((_, i) => (i / (steps.length - 1)) * 100);
  }, [steps]);

  return (
    <section className={styles.scrollySection} style={{ '--gem-color': active.color }}>
      <header className={styles.header}>
        <h2 className={styles.mainTitle}>{scrollyData.title}</h2>
        <p className={styles.subTitle}>{scrollyData.subtitle}</p>
      </header>

      <div className={styles.gridContainer}>
        <div className={styles.railColumn}>
          <div className={styles.railTrack}>
            <div className={styles.railFill} style={{ height: `${(activeIndex / Math.max(steps.length - 1, 1)) * 100}%` }} />
            {steps.map((step, i) => (
              <div
                key={step.id}
                className={`${styles.railMarker} ${i <= activeIndex ? styles.railMarkerActive : ''}`}
                style={{ top: `${railMarkerPositions[i]}%`, '--marker-color': step.color }}
              />
            ))}
          </div>
        </div>

        <div className={styles.stickyColumn}>
          <div className={styles.previewCard}>
            <div className={styles.gemDisplay}>
              <div className={styles.glowBg} />
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={currentImage}
                  alt={active.title}
                  className={styles.gemImg}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.17 }}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className={styles.scrollColumn}>
          {steps.map((step, i) => (
            <div
              key={step.id}
              id={step.id}
              ref={addStepRef}
              data-step-index={i}
              className={`${styles.stepBlock} ${i === activeIndex ? styles.activeBlock : ''}`}
            >
              <div className={styles.stepHeader}>
                <span className={styles.stepNumber} style={{ color: step.color }}>{step.num} —</span>
                <span className={styles.stepTier} style={{ '--step-color': step.color }}>{step.tier}</span>
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription} dangerouslySetInnerHTML={{ __html: step.description }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GemBasicsScrolly;