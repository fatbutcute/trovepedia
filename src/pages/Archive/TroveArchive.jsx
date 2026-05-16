import React, { useState, useMemo, useRef, useEffect } from "react";
import materialsData from "./materials_exact.json";
import "./TroveArchive.css";

const MANUAL_ENDGAME_ITEMS = [
  "Depths Core",
  "Soul of the Depths",
  "Deepstone",
];

const PROCESSED_ITEMS = [];

// ÚJ ADATFELDOLGOZÓ LOGIKA AZ ÚJ JSON STRUKTÚRÁHOZ
if (materialsData && materialsData.Resources) {
  // Végigmegyünk a kategóriákon (Materials, Harvestables, Ores, stb.)
  Object.entries(materialsData.Resources).forEach(([categoryName, itemsObj]) => {
    // Végigmegyünk a kategórián belüli itemeken (Blank Scroll, Bleached Bone, stb.)
    Object.entries(itemsObj).forEach(([itemName, itemData]) => {
      
      const isEndgame = MANUAL_ENDGAME_ITEMS.includes(itemName);
      
      // Ha manuálisan Endgame-re állítottuk, felülírjuk a kategóriát
      let finalCategory = categoryName;
      if (isEndgame) {
        finalCategory = "Endgame";
      }

      // Kép generálása a blueprint alapján
      const iconUrl = itemData.blueprint 
        ? `https://trovesaurus.com/data/catalog/${itemData.blueprint.toLowerCase()}.png`
        : null;

      PROCESSED_ITEMS.push({
        id: itemData.identifier || itemName,
        name: itemName,
        description: itemData.description?.replace(/\\\\n/g, ' ')?.replace(/\\n/g, ' ') || "Crafting material used in various recipes.",
        category: finalCategory,
        iconUrl: iconUrl
      });
    });
  });
}

export default function TroveArchive() {
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef(null);

  // Animációs állapotok
  const [displayItems, setDisplayItems] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);
  const isFirstRender = useRef(true);

  // A filter menü kategóriáinak automatikus generálása
  const categories = useMemo(() => {
    return ["All", ...new Set(PROCESSED_ITEMS.map(i => i.category))].sort();
  }, []);

  // Első betöltéskori csúsztatás (késleltetés) kikapcsolása 1.5mp után
  useEffect(() => {
    const timer = setTimeout(() => setInitialLoad(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (selectRef.current && !selectRef.current.contains(e.target)) setIsSelectOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Keresés és szűrés frissítése animációval egybekötve
  useEffect(() => {
    const runFilter = () => {
      return PROCESSED_ITEMS.filter(item => {
        const matchCat = filterCategory === "All" || item.category === filterCategory;
        const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchSearch;
      }).sort((a, b) => {
        if (a.category === "Endgame" && b.category !== "Endgame") return -1;
        if (a.category !== "Endgame" && b.category === "Endgame") return 1;
        return a.name.localeCompare(b.name);
      });
    };

    if (isFirstRender.current) {
      setDisplayItems(runFilter());
      isFirstRender.current = false;
      return;
    }

    // Szűrés változásakor: Elindítjuk a kimenő animációt
    setIsAnimating(true);
    
    // Várunk amíg a kártyák "kimennek", majd frissítjük az adatokat
    const timeout = setTimeout(() => {
      setDisplayItems(runFilter());
      setAnimationKey(prev => prev + 1); // A kulcs váltása újraindítja a belépő animációkat
      setIsAnimating(false);
    }, 350); 

    return () => clearTimeout(timeout);
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
            {displayItems.length} records found
          </div>
        </div>
      </aside>

      <main className="journal-main">
        <div className="bg-aurora" />
        <div className="bg-grid" />
        <div className="bg-vignette" />
        
        <div className="canvas-header">
          <h1 className="journal-title">Materials <span className="neon-text">Archive</span></h1>
          <p className="journal-description">This page provides up-to-date, detailed informations from the standard materials until the endgame materials.</p>
          <div className="header-line" />
        </div>

        <div key={animationKey} className={`materials-grid ${isAnimating ? 'animating-out' : ''}`}>
          {displayItems.map((item, index) => {
            const baseDelay = initialLoad ? 0.7 : 0;
            const staggerDelay = Math.min(index * 0.04, 1.5);
            
            return (
              <div 
                key={item.id} 
                className="item-voxel-card"
                style={{ animationDelay: `${baseDelay + staggerDelay}s` }}
              >
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
            );
          })}
        </div>
      </main>
    </div>
  );
}