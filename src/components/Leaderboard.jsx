import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import styles from './Leaderboard.module.css';
import { useLanguage } from '../context/LanguageContext';
import { leaderboardContent } from './guides/content/leaderboard.content';

export default function Leaderboard() {
  const { langCode } = useLanguage();
  const c = leaderboardContent[langCode] || leaderboardContent.en;

  const [boards, setBoards] = useState([]);
  const [currentAnchor, setCurrentAnchor] = useState(null);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [entries, setEntries] = useState([]);
  
  const [initialLoading, setInitialLoading] = useState(true);
  const [entriesLoading, setEntriesLoading] = useState(false);
  const [sidebarFilter, setSidebarFilter] = useState('');
  const [playerSearchQuery, setPlayerSearchQuery] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState(new Set());

  // 1. Kezdeti adatbetöltés: teljes táblalista és az anchor megszerzése
  useEffect(() => {
    fetch('/api/player')
      .then((res) => res.json())
      .then((json) => {
        if (json.ok && Array.isArray(json.boards) && json.boards.length > 0) {
          setBoards(json.boards);
          setCurrentAnchor(json.latestAnchor);
          
          // Alapértelmezettnek kiválasztjuk az első táblát (pl. Trove Mastery vagy Challenge Deepest)
          const defaultBoard = json.boards.find(b => b.uuid === 1) || json.boards[0];
          setSelectedBoard(defaultBoard);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setInitialLoading(false));
  }, []);

  // 2. Ha kiválasztunk egy táblát, lekérjük a rangsorát uuid alapján
  useEffect(() => {
    if (!selectedBoard) return;
    setEntriesLoading(true);

    const anchorParam = currentAnchor ? `&anchor=${currentAnchor}` : '';
    fetch(`/api/player?uuid=${selectedBoard.uuid}${anchorParam}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.ok && json.data) {
          const items = json.data.items || [];
          setEntries(items);
        } else {
          setEntries([]);
        }
      })
      .catch(() => setEntries([]))
      .finally(() => setEntriesLoading(false));
  }, [selectedBoard, currentAnchor]);

  // Kategóriák szerinti csoportosítás pontosan úgy, mint az eredeti BetterTroveTools-ban
  const groupedBoards = useMemo(() => {
    const filter = sidebarFilter.toLowerCase().trim();
    const filtered = boards.filter((b) => {
      const nameMatch = (b.name || '').toLowerCase().includes(filter);
      const catMatch = (b.category || '').toLowerCase().includes(filter);
      return nameMatch || catMatch;
    });

    const groups = new Map();

    const weekly = filtered.filter((b) => b.contest_type === 'weekly');
    const daily = filtered.filter((b) => b.contest_type === 'daily');

    if (weekly.length > 0) groups.set('Weekly Contests', weekly);
    if (daily.length > 0) groups.set('Daily Contests', daily);

    for (const b of filtered) {
      if (b.contest_type === 'weekly' || b.contest_type === 'daily') continue;
      const cat = b.category || 'Other';
      if (!groups.has(cat)) groups.set(cat, []);
      groups.get(cat).push(b);
    }

    return groups;
  }, [boards, sidebarFilter]);

  const toggleCategory = (catName) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(catName)) next.delete(catName);
      else next.add(catName);
      return next;
    });
  };

  // Keresés az adott ranglista játékosai között
  const filteredEntries = useMemo(() => {
    if (!playerSearchQuery.trim()) return entries;
    return entries.filter((e) =>
      (e.player_name || '').toLowerCase().includes(playerSearchQuery.toLowerCase().trim())
    );
  }, [entries, playerSearchQuery]);

  return (
    <div className={styles.pageContainer}>
      <motion.header 
        className={styles.hero}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className={styles.badge}>{c.badge || 'SERVER LEADERBOARDS'}</span>
        <h1 className={styles.title}>{c.title || 'Trove Leaderboards'}</h1>
        <p className={styles.description}>
          {c.description || 'Full in-game leaderboards, live rankings, categories and player history.'}
        </p>
      </motion.header>

      {/* Játékoskereső felül */}
      <div className={styles.playerSearchWrapper}>
        <input 
          type="text"
          className={styles.playerSearchInput}
          placeholder="🔍 Search a player name in this board..."
          value={playerSearchQuery}
          onChange={(e) => setPlayerSearchQuery(e.target.value)}
        />
      </div>

      <div className={styles.layoutGrid}>
        
        {/* BAL OLDALI SÁV (A teljes játékon belüli menürendszer) */}
        <aside className={styles.sidebar}>
          <input 
            type="text" 
            className={styles.filterInput}
            placeholder="Filter boards..."
            value={sidebarFilter}
            onChange={(e) => setSidebarFilter(e.target.value)}
          />

          {initialLoading ? (
            <div className={styles.stateBox}>
              <span className={styles.spinner}>⟳</span> Loading all boards...
            </div>
          ) : groupedBoards.size === 0 ? (
            <div className={styles.stateBox}>No boards found.</div>
          ) : (
            Array.from(groupedBoards.entries()).map(([catName, bList]) => {
              const isCollapsed = collapsedCategories.has(catName);
              return (
                <div key={catName} className={styles.categoryGroup}>
                  <div 
                    className={styles.groupTitle} 
                    style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
                    onClick={() => toggleCategory(catName)}
                  >
                    <span>{catName}</span>
                    <span style={{ opacity: 0.6 }}>{bList.length}</span>
                  </div>
                  
                  {!isCollapsed && (
                    <div className={styles.categoryItemList}>
                      {bList.map((board) => {
                        const isSelected = selectedBoard?.uuid === board.uuid;
                        return (
                          <button
                            key={board.uuid}
                            className={`${styles.catItemBtn} ${isSelected ? styles.active : ''}`}
                            onClick={() => setSelectedBoard(board)}
                          >
                            <span className="truncate">{board.name}</span>
                            {board.contest_type && (
                              <span className={styles.catTag}>{board.contest_type}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </aside>

        {/* JOBB OLDALI TARTALOM (Ranglista tábla) */}
        <main className={styles.contentPanel}>
          <div className={styles.panelHeader}>
            <div>
              <h2 className={styles.panelTitle}>
                {selectedBoard ? selectedBoard.name : 'Leaderboard'}
              </h2>
              {selectedBoard?.category && (
                <span style={{ fontSize: '0.8rem', color: '#9aa4b2' }}>{selectedBoard.category}</span>
              )}
            </div>
            <span style={{ fontSize: '0.85rem', color: '#58a6ff', fontWeight: 700 }}>
              {entries.length} entries loaded
            </span>
          </div>

          {entriesLoading ? (
            <div className={styles.stateBox}>
              <span className={styles.spinner}>⟳</span> Loading entries...
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className={styles.stateBox}>
              No player entries found for this board.
            </div>
          ) : (
            <div className={styles.tableWrapper}>
              {filteredEntries.map((item, idx) => {
                const rank = item.rank || idx + 1;
                const score = item.score != null ? Number(item.score).toLocaleString() : '—';
                return (
                  <div key={idx} className={styles.rankRow}>
                    <div className={styles.rankInfo}>
                      <span className={styles.rankNumber}>#{rank}</span>
                      <span className={styles.playerName}>{item.player_name}</span>
                    </div>
                    <div className={styles.rankBadge}>
                      {score}
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