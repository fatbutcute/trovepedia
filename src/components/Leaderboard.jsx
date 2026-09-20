import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import styles from './Leaderboard.module.css';
import { useLanguage } from '../context/LanguageContext';
import { leaderboardContent } from './guides/content/leaderboard.content';

const FALLBACK_BOARDS = [
  { id: 'trove_mastery', label: 'Trove Mastery' },
  { id: 'geode_mastery', label: 'Geode Mastery' },
  { id: 'power_rank', label: 'Power Rank' },
  { id: 'challenge_deepest', label: 'CHALLENGE: Deepest' },
  { id: 'deepest_public', label: 'Deepest Diggers of PUBLIC' },
  { id: 'deepest_private', label: 'Deepest PRIVATEers' },
  { id: 'daily_leviathan', label: 'Daily Leviathan Kills' },
];

export default function Leaderboard() {
  const { langCode } = useLanguage();
  const c = leaderboardContent[langCode] || leaderboardContent.en;

  const [availableBoards, setAvailableBoards] = useState(FALLBACK_BOARDS);
  const [activeBoard, setActiveBoard] = useState('trove_mastery');
  const [boardEntries, setBoardEntries] = useState([]);
  
  const [boardLoading, setBoardLoading] = useState(false);
  const [error, setError] = useState(false);

  const [sidebarFilter, setSidebarFilter] = useState('');
  const [playerSearchQuery, setPlayerSearchQuery] = useState('');

  // 1. Kezdeti betöltés: elérhető táblák listája
  useEffect(() => {
    fetch('/api/player')
      .then((res) => res.json())
      .then((json) => {
        const apiData = json?.data;
        if (apiData?.availableBoards) {
          const list = Array.isArray(apiData.availableBoards) 
            ? apiData.availableBoards 
            : apiData.availableBoards.boards || [];
          if (list.length > 0) {
            setAvailableBoards(list.map(b => typeof b === 'string' ? { id: b, label: b } : b));
          }
        }
        // Ha vannak alap leaderboardRecords adatok is a fő hívásban
        if (apiData?.leaderboardRecords && apiData.leaderboardRecords[activeBoard]) {
          const initialData = apiData.leaderboardRecords[activeBoard];
          setBoardEntries(Array.isArray(initialData) ? initialData : [initialData]);
        }
      })
      .catch(() => {});
  }, []);

  // 2. Táblaváltáskor lekérjük az adott kategória adatait
  useEffect(() => {
    if (!activeBoard) return;
    setBoardLoading(true);
    setError(false);

    fetch(`/api/player?board=${encodeURIComponent(activeBoard)}`)
      .then((res) => res.json())
      .then((json) => {
        const resultData = json?.data?.data || json?.data || json;
        const entries = Array.isArray(resultData) 
          ? resultData 
          : resultData.entries || resultData.records || resultData.leaderboardRecords || [resultData];
        setBoardEntries(Array.isArray(entries) ? entries : [entries]);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setBoardLoading(false);
      });
  }, [activeBoard]);

  const filteredBoards = useMemo(() => {
    return availableBoards.filter((b) => 
      (b.label || b.id || '').toLowerCase().includes(sidebarFilter.toLowerCase())
    );
  }, [availableBoards, sidebarFilter]);

  const filteredEntries = useMemo(() => {
    if (!Array.isArray(boardEntries)) return [];
    if (!playerSearchQuery) return boardEntries;
    return boardEntries.filter(entry => {
      const name = entry.player_name || entry.player || entry.name || '';
      return name.toLowerCase().includes(playerSearchQuery.toLowerCase());
    });
  }, [boardEntries, playerSearchQuery]);

  return (
    <div className={styles.pageContainer}>
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

      <div className={styles.playerSearchWrapper}>
        <input 
          type="text"
          className={styles.playerSearchInput}
          placeholder="🔍 Search a player name across leaderboards..."
          value={playerSearchQuery}
          onChange={(e) => setPlayerSearchQuery(e.target.value)}
        />
      </div>

      <div className={styles.layoutGrid}>
        <aside className={styles.sidebar}>
          <input 
            type="text" 
            className={styles.filterInput}
            placeholder="Filter boards..."
            value={sidebarFilter}
            onChange={(e) => setSidebarFilter(e.target.value)}
          />

          <div className={styles.categoryGroup}>
            <div className={styles.groupTitle}>Boards & Categories</div>
            <div className={styles.categoryItemList}>
              {filteredBoards.map((board) => {
                const bId = board.id || board;
                const bLabel = board.label || board;
                return (
                  <button
                    key={bId}
                    className={`${styles.catItemBtn} ${activeBoard === bId ? styles.active : ''}`}
                    onClick={() => setActiveBoard(bId)}
                  >
                    <span className="truncate">{bLabel}</span>
                    {board.tag && <span className={styles.catTag}>{board.tag}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <main className={styles.contentPanel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>
              {availableBoards.find(b => (b.id || b) === activeBoard)?.label || activeBoard}
            </h2>
          </div>

          {boardLoading ? (
            <div className={styles.stateBox}>
              <span className={styles.spinner}>⟳</span> Loading board entries...
            </div>
          ) : error ? (
            <div className={styles.stateBox} style={{ color: '#f87171' }}>
              {c.error}
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className={styles.stateBox}>
              No records found for this board.
            </div>
          ) : (
            <div className={styles.tableWrapper}>
              {filteredEntries.map((entry, index) => {
                const playerName = entry.player_name || entry.player || entry.name || 'Unknown';
                const scoreValue = entry.level ?? entry.score ?? entry.value ?? '—';
                return (
                  <div key={index} className={styles.rankRow}>
                    <div className={styles.rankInfo}>
                      <span className={styles.rankNumber}>#{entry.rank || index + 1}</span>
                      <span className={styles.playerName}>{playerName}</span>
                    </div>
                    <div className={styles.rankBadge}>
                      {scoreValue}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}