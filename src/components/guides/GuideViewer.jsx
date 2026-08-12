import React, { Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GUIDES_DATA } from './index';
import styles from './GuideViewer.module.css';
import { useLanguage } from '../../context/LanguageContext';
import { guideViewerContent } from './content/guideViewer.content';

export default function GuideViewer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSlug = searchParams.get('guide');

  const { langCode } = useLanguage();
  const c = guideViewerContent[langCode] || guideViewerContent.en;

  const activeGuide = activeSlug ? GUIDES_DATA[activeSlug] : null;
  const ActiveComponent = activeGuide ? activeGuide.component : null;

  const handleSelectGuide = (id) => {
    setSearchParams({ guide: id });
  };

  const handleBack = () => {
    setSearchParams({});
  };

  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        {!activeSlug ? (
          /* 1. GUIDE SELECTION GRID */
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={styles.gridWrapper}
          >
            <div className={styles.header}>
              <h1 className={styles.mainTitle}>{c.title}</h1>
              <p className={styles.mainSub}>{c.subtitle}</p>
            </div>

            <div className={styles.grid}>
              {Object.values(GUIDES_DATA).map((guide) => (
                <motion.div
                  key={guide.id}
                  className={styles.card}
                  whileHover={{ scale: 1.05}}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectGuide(guide.id)}
                >
                  <span className={styles.cardSubtitle}>{guide.subtitle}</span>
                  <h3 className={styles.cardTitle}>{guide.title}</h3>
                  <p className={styles.cardDesc}>{guide.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* 2. ACTIVE GUIDE VIEW */
          <motion.div
            key="guide-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={styles.guideWrapper}
          >
            <button
              onClick={handleBack}
              className={styles.backButton}
              aria-label={c.backButton}
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>

            <Suspense
              fallback={
                <div className={styles.loadingState}>
                  <div className={styles.spinner} />
                  <span>{c.loading}</span>
                </div>
              }
            >
              {ActiveComponent ? (
                <ActiveComponent />
              ) : (
                <div className="p-8 text-center">
                  <h2>{c.notFound}</h2>
                  <p>{c.notFoundDesc}</p>
                </div>
              )}
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}