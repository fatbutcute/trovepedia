import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Leaderboard.module.css';
import { useLanguage } from '../context/LanguageContext';
import { leaderboardContent } from './guides/content/leaderboard.content';

export default function Leaderboard() {
  const { langCode } = useLanguage();
  const c = leaderboardContent[langCode] || leaderboardContent.en;

  const [records, setRecords] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState('mastery');

  useEffect(() => {
    fetch('/api/player')
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((json) => {
        // A player.js a json.data-n belül adja vissza az összes endpoint eredményét
        const apiData = json?.data;
        if (apiData?.leaderboardRecords) {
          setRecords(apiData.leaderboardRecords);
        } else {
          setError(true);
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <motion.header 
        className={styles.hero}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className={styles.badge}>{c.badge}</span>
        <h1 className={styles.title}>{c.title}</h1>
        <p className={styles.description}>{c.description}</p>
      </motion.header>

      <div className={styles.boardCard}>
        <div className={styles.catTabs}>
          <button 
            className={`${styles.catBtn} ${activeTab === 'mastery' ? styles.active : ''}`}
            onClick={() => setActiveTab('mastery')}
          >
            {c.categories.mastery}
          </button>
          <button 
            className={`${styles.catBtn} ${activeTab === 'geode' ? styles.active : ''}`}
            onClick={() => setActiveTab('geode')}
          >
            {c.categories.geode}
          </button>
          <button 
            className={`${styles.catBtn} ${activeTab === 'pr' ? styles.active : ''}`}
            onClick={() => setActiveTab('pr')}
          >
            {c.categories.pr}
          </button>
        </div>

        {loading ? (
          <div className={styles.stateBox}>
            <span className={styles.spinner}>⟳</span> {c.loading}
          </div>
        ) : error || !records ? (
          <div className={styles.stateBox} style={{ color: '#f87171' }}>
            {c.error}
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            {activeTab === 'mastery' && records.trove_mastery && (
              <div className={styles.rankRow}>
                <div className={styles.rankInfo}>
                  <span className={styles.rankNumber}>#1</span>
                  <div className={styles.playerDetails}>
                    <span className={styles.playerName}>
                      {records.trove_mastery.player_name || records.trove_mastery.player || 'Unknown'}
                    </span>
                    <span className={styles.playerSub}>{c.categories.mastery} Elite</span>
                  </div>
                </div>
                <div className={styles.rankBadge}>
                  Lv {records.trove_mastery.level ?? records.trove_mastery.score ?? '—'}
                </div>
              </div>
            )}

            {activeTab === 'geode' && records.geode_mastery && (
              <div className={styles.rankRow}>
                <div className={styles.rankInfo}>
                  <span className={styles.rankNumber}>#1</span>
                  <div className={styles.playerDetails}>
                    <span className={styles.playerName}>
                      {records.geode_mastery.player_name || records.geode_mastery.player || 'Unknown'}
                    </span>
                    <span className={styles.playerSub}>{c.categories.geode} Elite</span>
                  </div>
                </div>
                <div className={`${styles.rankBadge} ${styles.geode}`}>
                  Lv {records.geode_mastery.level ?? records.geode_mastery.score ?? '—'}
                  {records.geode_mastery.capped ? ` (${c.maxCapped})` : ''}
                </div>
              </div>
            )}

            {activeTab === 'pr' && records.power_rank && (
              <div className={styles.rankRow}>
                <div className={styles.rankInfo}>
                  <span className={styles.rankNumber}>#1</span>
                  <div className={styles.playerDetails}>
                    <span className={styles.playerName}>
                      {records.power_rank.player_name || records.power_rank.player || 'Unknown'}
                    </span>
                    <span className={styles.playerSub}>{c.categories.pr} Leader</span>
                  </div>
                </div>
                <div className={`${styles.rankBadge} ${styles.power}`}>
                  {records.power_rank.value ?? records.power_rank.score ?? '—'} PR
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}