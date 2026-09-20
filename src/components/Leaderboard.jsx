import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import styles from './Leaderboard.module.css';
import { useLanguage } from '../context/LanguageContext';
import { leaderboardContent } from './guides/content/leaderboard.content';

// Alapértelmezett kategóriák, ha a site végpont nem adna vissza elemeket
const FALLBOARD_CATEGORIES = [
  { id: 'trove_mastery', label: 'Trove Mastery', group: 'General' },
  { id: 'geode_mastery', label: 'Geode Mastery', group: 'General' },
  { id: 'power_rank', label: 'Power Rank', group: 'General' },
  { id: 'challenge_deepest', label: 'CHALLENGE: Deepest', group: 'Delves' },
  { id: 'deepest_public', label: 'Deepest Diggers of PUBLIC', group: 'Delves' },
  { id: 'deepest_private', label: 'Deepest PRIVATEers', group: 'Delves' },
  { id: 'daily_leviathan', label: 'Daily Leviathan Kills', group: 'Daily Contests' },
];

export default function Leaderboard() {
  const { langCode } = useLanguage();
  const c = leaderboardContent[langCode] || leaderboardContent.en;

  const [records, setRecords] = useState(null);
  const [availableBoards, setAvailableBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const [activeBoard, setActiveBoard] = useState('trove_mastery');
  const [sidebarFilter, setSidebarFilter] = useState('');
  const [playerSearchQuery, setPlayerSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/player')
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((json) => {
        const apiData = json?.data;
        if (apiData?.leaderboardRecords) {
          setRecords(apiData.leaderboardRecords);
        }
        if (apiData?.availableBoards) {
          // Ha tömbként vagy objektumként érkezik a site boards lista
          const boardsList = Array.isArray(apiData.availableBoards) 
            ? apiData.availableBoards 
            : apiData.availableBoards.boards || Object.keys(apiData.availableBoards);
          setAvailableBoards(boardsList);
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Összeállítjuk a megjelenítendő kategóriák listáját (API + Fallback)
  const boardsList = useMemo(() => {
    if (availableBoards && availableBoards.length > 0) {
      return availableBoards.map(b => typeof b === 'string' ? { id: b, label: b, group: 'Boards' } : b);
    }
    return FALLBOARD_CATEGORIES;
  }, [availableBoards]);

  // Szűrt kategóriák a bal oldali sávban
  const filteredBoards = useMemo(() => {
    return boardsList.filter((b) => 
      (b.label || b.id).toLowerCase().includes(sidebarFilter.toLowerCase())
    );
  }, [boardsList, sidebarFilter]);

  const currentBoardData = records?.[activeBoard];

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

      {/* Játékos keresősáv felül */}
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
        
        {/* BAL OLDALI SZŰRŐ ÉS KATEGÓRIA SÁV */}
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

        {/* JOBB OLDALI TARTALOM / LISTA */}
        <main className={styles.contentPanel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>
              {boardsList.find(b => (b.id || b) === activeBoard)?.label || activeBoard}
            </h2>
          </div>

          {loading ? (
            <div className={styles.stateBox}>
              <span className={styles.spinner}>⟳</span> {c.loading}
            </div>
          ) : error && !records ? (
            <div className={styles.stateBox} style={{ color: '#f87171' }}>
              {c.error}
            </div>
          ) : !currentBoardData ? (
            <div className={styles.stateBox}>
              Pick a board on the left to load its ranked entries, or no records available for this board yet.
            </div>
          ) : (
            <div className={styles.tableWrapper}>
              {Array.isArray(currentBoardData) ? (
                currentBoardData.map((entry, index) => {
                  const playerName = entry.player_name || entry.player || 'Unknown';
                  if (playerSearchQuery && !playerName.toLowerCase().includes(playerSearchQuery.toLowerCase())) {
                    return null;
                  }
                  return (
                    <div key={index} className={styles.rankRow}>
                      <div className={styles.rankInfo}>
                        <span className={styles.rankNumber}>#{index + 1}</span>
                        <span className={styles.playerName}>{playerName}</span>
                      </div>
                      <div className={styles.rankBadge}>
                        {entry.level ?? entry.score ?? entry.value ?? '—'}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className={styles.rankRow}>
                  <div className={styles.rankInfo}>
                    <span className={styles.rankNumber}>#1</span>
                    <span className={styles.playerName}>
                      {currentBoardData.player_name || currentBoardData.player || 'Unknown Player'}
                    </span>
                  </div>
                  <div className={styles.rankBadge}>
                    {currentBoardData.level ?? currentBoardData.score ?? currentBoardData.value ?? '—'}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}