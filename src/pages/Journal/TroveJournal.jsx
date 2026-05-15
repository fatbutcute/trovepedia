import React, { useState, useMemo, useRef, useEffect } from "react";
import materialsData from "./materials_exact.json";
import "./TroveJournal.css";

// ═══════════════════════════════════════════════════════════════════════════
//   MANUÁLIS ENDGAME BEÁLLÍTÁS
//   Ide írd be azoknak az itemeknek a PONTOS nevét, amik endgame-nek számítanak!
// ═══════════════════════════════════════════════════════════════════════════
const MANUAL_ENDGAME_ITEMS = [
  "Depths Core",
  "Soul of the Depths",
  "Deepstone",
];

const PROCESSED_ITEMS = materialsData.map((item, index) => {
  // Megnézzük, hogy a manuális listánkban szerepel-e az item
  const isEndgame = MANUAL_ENDGAME_ITEMS.includes(item.name);
  
  let category = "Standard";
  if (isEndgame) {
    category = "Endgame";
  } else {
    // Ha nem endgame, akkor az identifier alapján dől el a kategória
    const parts = item.identifier.split('/');
    if (parts.length > 3) {
      category = parts[2].charAt(0).toUpperCase() + parts[2].slice(1);
    }
  }

  const iconUrl = item.blueprint 
    ? `https://trovesaurus.com/data/catalog/${item.blueprint.toLowerCase()}.png`
    : null;

  return {
    id: item.identifier || index,
    name: item.name,
    description: item.description?.replace(/\\\\n/g, ' ') || "Crafting material used in various recipes.",
    category: category,
    iconUrl: iconUrl
  };
});

export default function TroveJournal() {
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef(null);

  // Kategóriák kigyűjtése (Endgame mindig ott lesz, ha van benne item)
  const categories = useMemo(() => {
    return ["All", ...new Set(PROCESSED_ITEMS.map(i => i.category))].sort();
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (selectRef.current && !selectRef.current.contains(e.target)) setIsSelectOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filteredItems = useMemo(() => {
    return PROCESSED_ITEMS.filter(item => {
      const matchCat = filterCategory === "All" || item.category === filterCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    }).sort((a, b) => {
      // Az Endgame itemeket mindig az elejére rakjuk a listában
      if (a.category === "Endgame" && b.category !== "Endgame") return 1;
      if (a.category !== "Endgame" && b.category === "Endgame") return -1;
      return a.name.localeCompare(b.name);
    });
  }, [filterCategory, searchQuery]);

  return (
    <div className="journal-dashboard">
      <aside className="journal-sidebar">
        <div className="sidebar-header">
          <h2>Archive Settings</h2>
        </div>
        <div className="sidebar-divider" />

        <div className="sidebar-section">
          <label>Search Repository</label>
          <div className="search-input-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input 
              type="text" 
              className="delve-search-input" 
              placeholder="Filter by name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="sidebar-section">
          <label>Filter by Source</label>
          <div className="custom-select-container" ref={selectRef}>
            <button 
              className={`custom-select-trigger ${isSelectOpen ? 'open' : ''}`}
              onClick={() => setIsSelectOpen(!isSelectOpen)}
            >
              <span>{filterCategory === "All" ? "All Sources" : filterCategory}</span>
              <svg className="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            
            {isSelectOpen && (
              <div className="custom-select-options">
                {categories.map(cat => (
                  <div 
                    key={cat} 
                    className={`custom-option ${filterCategory === cat ? 'selected' : ''}`}
                    onClick={() => { setFilterCategory(cat); setIsSelectOpen(false); }}
                  >
                    {cat === "All" ? "All Sources" : cat}
                    {filterCategory === cat && <span className="option-check">✦</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="results-count">
            <span className="count-dot" />
            {filteredItems.length} records found
          </div>
        </div>
      </aside>

      <main className="journal-main">
        <div className="bg-aurora" />
        <div className="bg-grid" />
        <div className="bg-vignette" />
        
        <div className="canvas-header">
          <h1 className="journal-title">Materials <span className="neon-text">Archive</span></h1>
          <p className="journal-description">This page provides up-to-date, detailed informations about the standard materials til the endgame materials.</p>
          <div className="header-line" />
        </div>

        <div className="materials-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="item-voxel-card">
              {/* CSAK ENDGAME ITEMEKNÉL JELENIK MEG A SZIVÁRVÁNY FÉNY */}
              {item.category === "Endgame" && <div className="endgame-glow" />}
              
              <div className="card-inner glass-effect">
                <div className="item-icon-box">
                  {item.iconUrl ? (
                    <img src={item.iconUrl} alt={item.name} className="item-real-icon" />
                  ) : (
                    <div className="item-fallback-icon">⬢</div>
                  )}
                </div>
                <div className="item-details">
                  <span className="item-name">{item.name}</span>
                  <span className="item-category-tag">{item.category}</span>
                </div>
              </div>
              <div className="item-tooltip">
                <div className="tooltip-title">{item.name}</div>
                <p className="tooltip-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}