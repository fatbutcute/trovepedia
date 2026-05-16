import React, { useState, useMemo, useEffect } from "react";
import materialsData from "./materials_exact.json";
import "./TroveArchive.css";

const MANUAL_ENDGAME_ITEMS = [
  "Depths Core",
  "Soul of the Depths",
  "Deepstone",
];

const PROCESSED_ITEMS = [];

// ÚJ ADATFELDOLGOZÓ LOGIKA (Subkategóriák dinamikus kezelésével)
if (materialsData && materialsData.Resources) {
  Object.entries(materialsData.Resources).forEach(([categoryName, contentObj]) => {
    
    // Belső feldolgozó függvény
    const processItems = (itemsObj, catName, subCatName = null) => {
      Object.entries(itemsObj).forEach(([itemName, itemData]) => {
        const isEndgame = MANUAL_ENDGAME_ITEMS.includes(itemName);
        
        let finalCategory = catName;
        if (isEndgame) {
          finalCategory = "Endgame";
        }

        const iconUrl = itemData.blueprint 
          ? `https://trovesaurus.com/data/catalog/${itemData.blueprint.toLowerCase()}.png`
          : null;

        PROCESSED_ITEMS.push({
          id: itemData.identifier || itemName,
          name: itemName,
          description: itemData.description?.replace(/\\\\n/g, ' ')?.replace(/\\n/g, ' ') || "Crafting material used in various recipes.",
          category: finalCategory,
          subCategory: isEndgame ? null : subCatName, 
          iconUrl: iconUrl
        });
      });
    };

    // Megnézzük, hogy ez a kategória közvetlenül itemeket tartalmaz-e, vagy alkategóriákat
    const firstKey = Object.keys(contentObj)[0];
    if (firstKey && contentObj[firstKey] && typeof contentObj[firstKey] === 'object' && contentObj[firstKey].identifier) {
       // Közvetlen itemek (pl. Materials, Ores)
       processItems(contentObj, categoryName);
    } else {
       // Alkategóriák (pl. Geode -> Materials, Geode -> Ores)
       Object.entries(contentObj).forEach(([subCategoryName, itemsObj]) => {
           processItems(itemsObj, categoryName, subCategoryName);
       });
    }
  });
}

export default function TroveArchive() {
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterSubCategory, setFilterSubCategory] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});

  // Animációs állapotok
  const [displayItems, setDisplayItems] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleCategory = (cat) => {
    setExpandedCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  // Kategóriák és számosságok kigyűjtése
  const categoryTree = useMemo(() => {
    const tree = {};
    PROCESSED_ITEMS.forEach(item => {
      const cat = item.category;
      const subCat = item.subCategory;
      
      if (!tree[cat]) {
        tree[cat] = { count: 0, subCategories: {} };
      }
      tree[cat].count++;
      
      if (subCat && cat !== "Endgame") {
        if (!tree[cat].subCategories[subCat]) {
          tree[cat].subCategories[subCat] = 0;
        }
        tree[cat].subCategories[subCat]++;
      }
    });
    return tree;
  }, []);

  // Kategóriák sorrendbe rakása (Endgame legyen az első)
  const sortedCategories = useMemo(() => {
    return Object.keys(categoryTree).sort((a, b) => {
      if (a === "Endgame") return -1;
      if (b === "Endgame") return 1;
      return a.localeCompare(b);
    });
  }, [categoryTree]);

  // Első betöltés késleltetés kikapcsolása
  useEffect(() => {
    const timer = setTimeout(() => setInitialLoad(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Keresés és szűrés
  useEffect(() => {
    const runFilter = () => {
      return PROCESSED_ITEMS.filter(item => {
        const matchCat = filterCategory === "All" || item.category === filterCategory;
        const matchSubCat = !filterSubCategory || item.subCategory === filterSubCategory;
        const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchSubCat && matchSearch;
      }).sort((a, b) => {
        if (a.category === "Endgame" && b.category !== "Endgame") return -1;
        if (a.category !== "Endgame" && b.category === "Endgame") return 1;
        return a.name.localeCompare(b.name);
      });
    };

    if (initialLoad && displayItems.length === 0) {
      setDisplayItems(runFilter());
      return;
    }

    setIsAnimating(true);
    const timeout = setTimeout(() => {
      setDisplayItems(runFilter());
      setAnimationKey(prev => prev + 1);
      setIsAnimating(false);
    }, 350); 

    return () => clearTimeout(timeout);
  }, [filterCategory, filterSubCategory, searchQuery]);

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

        {/* ÚJ DINAMIKUS FILTER LISTA */}
        <div className="sidebar-section filter-section">
          <label>Filter by Source</label>
          <div className="sidebar-filter-list">
            
            {/* Minden Elem */}
            <div className="filter-group" style={{ animationDelay: '0.1s' }}>
              <div 
                className={`filter-item ${filterCategory === "All" && !filterSubCategory ? 'active' : ''}`}
                onClick={() => { setFilterCategory("All"); setFilterSubCategory(null); }}
              >
                <div className="filter-item-name"><span>All Items</span></div>
                <span className="item-count">({PROCESSED_ITEMS.length})</span>
              </div>
            </div>

            {/* Generált Kategóriák és Alkategóriák */}
            {sortedCategories.map((cat, index) => {
              const hasSub = Object.keys(categoryTree[cat].subCategories).length > 0;
              const isExpanded = expandedCategories[cat];
              
              return (
                <div key={cat} className="filter-group" style={{ animationDelay: `${0.15 + index * 0.05}s` }}>
                  <div 
                    className={`filter-item ${filterCategory === cat && !filterSubCategory ? 'active' : ''}`}
                    onClick={() => {
                      setFilterCategory(cat);
                      setFilterSubCategory(null);
                      if (hasSub) toggleCategory(cat);
                    }}
                  >
                    <div className="filter-item-name">
                      {hasSub && (
                        <i className={`fi fi-sr-angle-small-${isExpanded ? 'down' : 'right'} expand-icon`}></i>
                      )}
                      <span>{cat}</span>
                    </div>
                    <span className="item-count">({categoryTree[cat].count})</span>
                  </div>
                  
                  {/* Lenyíló Alkategóriák (pl. Geode Ores, Materials) */}
                    {/* Lenyíló Alkategóriák (pl. Geode Ores, Materials) */}
                    {hasSub && (
                      <div className={`filter-subcategories ${isExpanded ? 'open' : ''}`}>
                        {Object.keys(categoryTree[cat].subCategories).sort().map(subCat => (
                          <div
                            key={subCat}
                            className={`filter-sub-item ${filterCategory === cat && filterSubCategory === subCat ? 'active' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setFilterCategory(cat);
                              setFilterSubCategory(subCat);
                            }}
                          >
                            <span>{subCat}</span>
                            <span className="item-count">({categoryTree[cat].subCategories[subCat]})</span>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              );
            })}
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
                    <span className="item-category-tag">{item.category} {item.subCategory ? ` / ${item.subCategory}` : ''}</span>
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