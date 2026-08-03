// src/components/guides/GuideViewer.jsx
import React, { Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GUIDES_DATA } from './index';
import styles from './GuideViewer.module.css';

export default function GuideViewer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSlug = searchParams.get('guide'); // Pl. kiolvassa: "gems"

  const activeGuide = activeSlug ? GUIDES_DATA[activeSlug] : null;
  const ActiveComponent = activeGuide ? activeGuide.component : null;

  // Guide kiválasztása -> Frissíti az URL-t: /guides?guide=gems
  const handleSelectGuide = (id) => {
    setSearchParams({ guide: id });
  };

  // Visszalépés -> Törli a paramétert az URL-ből: /guides
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
              <h1 className={styles.mainTitle}>Trove Guides & Tutorials</h1>
              <p className={styles.mainSub}>
                Browse our collection of community-crafted guides below to fast-track your endgame progression, optimize your builds, and master essential gameplay mechanics.
              </p>
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
            aria-label="Back to All Guides"
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
                  <span>Loading guide...</span>
                </div>
              }
            >
              {ActiveComponent && <ActiveComponent />}
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}