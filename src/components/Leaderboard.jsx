import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import styles from './Leaderboard.module.css';
import { useLanguage } from '../context/LanguageContext';
import { leaderboardContent } from './guides/content/leaderboard.content';

export default function Leaderboard() {
  const { langCode } = useLanguage();
  const c = leaderboardContent[langCode] || leaderboardContent.en;

  const [categories, setCategories] = useState({});
  const [activeBoard, setActiveBoard] = useState(null);
  const [boardEntries, setBoardEntries] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [boardLoading, setBoardLoading] = useState(false);
  const [sidebarFilter, setSidebarFilter] = useState('');
  const [playerSearchQuery, setPlayerSearchQuery] = useState('');

  // 1. Boards és Kategóriák betöltése
  useEffect(() => {
    fetch('/api/player')
      .then((res) => res.json())
      .then((json) => {
        const rawBoards = json?.data?.availableBoards;
        if (!rawBoards) return;

        let parsed = {};

        // Ha csoportosított objektumként érkezik (kategória -> táblák)
        if (typeof rawBoards === 'object' && !Array.isArray(rawBoards)) {
          if (rawBoards.categories) {
            parsed = rawBoards.categories;
          } else {
            parsed = rawBoards;
          }
        } else if (Array.isArray(rawBoards)) {
          // Ha sima tömb, csoportosítjuk group szerint
          rawBoards.forEach((b) => {
            const group = b.category || b.group || 'Contests';
            if (!parsed[group]) parsed[group] = [];
            parsed[group].push(b);
          });
        }

        setCategories(parsed);

        // Automatikus első aktív board kijelölés
        const firstGroup = Object.keys(parsed)[0];
        if (firstGroup) {
          const firstItem = Array.isArray(parsed[firstGroup]) ? parsed[firstGroup][0] : null;
          const firstKey = typeof firstItem === 'string' ? firstItem : firstItem?.name || firstItem?.id;
          if (firstKey) setActiveBoard(firstKey);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // 2. Kiválasztott Board adatainak betöltése
  useEffect(() => {
    if (!activeBoard) return;
    setBoardLoading(true);

    fetch(`/api/player?board=${encodeURIComponent(activeBoard)}`)
      .then((res) => res.json())
      .then((json) => {
        const result = json?.data?.data || json?.data || json;
        const list = Array.isArray(result) 
          ? result 
          : result?.entries || result?.ranks || result?.players || [];
        setBoardEntries(list);
      })
      .catch(() => {
        setBoardEntries([]);
      })
      .finally(() => {
        setBoardLoading(false);
      });
  }, [activeBoard]);

  // Játékos szerinti keresés a táblában
  const filteredEntries = useMemo(() => {
    if (!playerSearchQuery) return boardEntries;
    return boardEntries.filter((e) => {
      const name = e.player_name || e.player || e.name || '';
      return name.toLowerCase().includes(playerSearchQuery.toLowerCase());
    });
  }, [boardEntries, playerSearchQuery]);

  return (
    <div className={styles.pageContainer}>
      <motion.header 
        className={styles.hero}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className={styles.badge}>{c.badge}</span>
        <h1 className={styles.title}>{c.title}</h1>
        <p className={styles.description}>{c.description}</p>
      </motion.header>

      {/* Játékos kereső */}
      <div className={styles.playerSearchWrapper}>
        <input 
          type="text"
          className={styles.playerSearchInput}
          placeholder="🔍 Search player name across entries..."
          value={playerSearchQuery}
          onChange={(e) => setPlayerSearchQuery(e.target.value)}
        />
      </div>

      <div className={styles.layoutGrid}>
        
        {/* BAL OLDALI SÁV (Kategóriák és Táblák) */}
        <aside className={styles.sidebar}>
          <input 
            type="text" 
            className={styles.filterInput}
            placeholder="Filter boards..."
            value={sidebarFilter}
            onChange={(e) => setSidebarFilter(e.target.value)}
          />

          {loading ? (
            <div className={styles.stateBox}><span className={styles.spinner}>⟳</span> Loading boards...</div>
          ) : Object.keys(categories).length === 0 ? (
            <div className={styles.stateBox}>No categories available.</div>
          ) : (
            Object.entries(categories).map(([groupName, items]) => {
              const itemList = Array.isArray(items) ? items : [];
              const matchingItems = itemList.filter(item => {
                const name = typeof item === 'string' ? item : item.label || item.name || '';
                return name.toLowerCase().includes(sidebarFilter.toLowerCase());
              });

              if (matchingItems.length === 0) return null;

              return (
                <div key={groupName} className={styles.categoryGroup}>
                  <div className={styles.groupTitle}>
                    {groupName} <span style={{ opacity: 0.6 }}>({matchingItems.length})</span>
                  </div>
                  <div className={styles.categoryItemList}>
                    {matchingItems.map((item, idx) => {
                      const id = typeof item === 'string' ? item : item.name || item.id || idx;
                      const label = typeof item === 'string' ? item : item.label || item.name || id;
                      const tag = item.tag || item.type || null;

                      return (
                        <button
                          key={id}
                          className={`${styles.catItemBtn} ${activeBoard === id ? styles.active : ''}`}
                          onClick={() => setActiveBoard(id)}
                        >
                          <span className="truncate">{label}</span>
                          {tag && <span className={styles.catTag}>{tag}</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </aside>

        {/* JOBB OLDALI TARTALOM (Rangsor) */}
        <main className={styles.contentPanel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>{activeBoard || 'Leaderboard'}</h2>
          </div>

          {boardLoading ? (
            <div className={styles.stateBox}><span className={styles.spinner}>⟳</span> Fetching ranking...</div>
          ) : filteredEntries.length === 0 ? (
            <div className={styles.stateBox}>No ranked entries found for this board.</div>
          ) : (
            <div className={styles.tableWrapper}>
              {filteredEntries.map((entry, idx) => {
                const rank = entry.rank || idx + 1;
                const name = entry.player_name || entry.player || entry.name || 'Unknown';
                const score = entry.score ?? entry.value ?? entry.level ?? '—';

                return (
                  <div key={idx} className={styles.rankRow}>
                    <div className={styles.rankInfo}>
                      <span className={styles.rankNumber}>#{rank}</span>
                      <span className={styles.playerName}>{name}</span>
                    </div>
                    <div className={styles.rankBadge}>{score}</div>
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