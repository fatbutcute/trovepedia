import React, { useState, useMemo, useEffect } from "react";
import materialsData from "./materials_exact.json";
import "./TroveArchive.css";
import StaffCard from '../../components/StaffCard';

const PROCESSED_ITEMS = [];

// ADATFELDOLGOZÓ LOGIKA
if (materialsData && materialsData.Resources) {
  Object.entries(materialsData.Resources).forEach(([categoryName, contentObj]) => {
    
    const processItems = (itemsObj, catName, subCatName = null) => {
      Object.entries(itemsObj).forEach(([itemName, itemData]) => {
        
        const iconUrl = itemData.blueprint 
          ? `https://trovesaurus.com/data/catalog/${itemData.blueprint.toLowerCase()}.png`
          : null;

        PROCESSED_ITEMS.push({
          id: itemData.identifier || itemName,
          name: itemName,
          description: itemData.description?.replace(/\\\\n/g, ' ')?.replace(/\\n/g, ' ') || "Crafting material used in various recipes.",
          category: catName,
          subCategory: subCatName,
          iconUrl: iconUrl
        });
      });
    };

    const firstKey = Object.keys(contentObj)[0];
    if (firstKey && contentObj[firstKey] && typeof contentObj[firstKey] === 'object' && contentObj[firstKey].identifier) {
       processItems(contentObj, categoryName);
    } else {
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

  const [displayItems, setDisplayItems] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleCategory = (cat) => {
    setExpandedCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const categoryTree = useMemo(() => {
    const tree = {};
    PROCESSED_ITEMS.forEach(item => {
      const cat = item.category;
      const subCat = item.subCategory;
      
      if (!tree[cat]) {
        tree[cat] = { count: 0, subCategories: {} };
      }
      tree[cat].count++;
      
      if (subCat) {
        if (!tree[cat].subCategories[subCat]) {
          tree[cat].subCategories[subCat] = 0;
        }
        tree[cat].subCategories[subCat]++;
      }
    });
    return tree;
  }, []);

  const sortedCategories = useMemo(() => {
    return Object.keys(categoryTree).sort((a, b) => a.localeCompare(b));
  }, [categoryTree]);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoad(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const runFilter = () => {
      return PROCESSED_ITEMS.filter(item => {
        const matchCat = filterCategory === "All" || item.category === filterCategory;
        const matchSubCat = !filterSubCategory || item.subCategory === filterSubCategory;
        const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchSubCat && matchSearch;
      }).sort((a, b) => a.name.localeCompare(b.name));
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
        </div>

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

        {/* ── ITT VOLT A HIBA: Hozzáadva a "filter-section" osztály, ami aktiválja a magasság-korlátozást ── */}
        <div className="sidebar-section filter-section">
          <label>Filter by Source</label>
          <div className="sidebar-filter-list">
            
            <div className="filter-group" style={{ animationDelay: '0.1s' }}>
              <div 
                className={`filter-item ${filterCategory === "All" && !filterSubCategory ? 'active' : ''}`}
                onClick={() => { setFilterCategory("All"); setFilterSubCategory(null); }}
              >
                <div className="filter-item-name"><span>All Items</span></div>
                <span className="item-count">({PROCESSED_ITEMS.length})</span>
              </div>
            </div>

            {sortedCategories.map((cat, index) => {
              const hasSub = Object.keys(categoryTree[cat].subCategories).length > 0;
              const isExpanded = expandedCategories[cat];
              
              return (
                <div key={cat} className="filter-group" style={{ animationDelay: `${0.15 + index * 0.05}s` }}>
                  <div 
                    className={`filter-item ${filterCategory === "All" && !filterSubCategory ? '' : (filterCategory === cat && !filterSubCategory ? 'active' : '')}`}
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
            const staggerDelay = Math.sqrt(index) * 0.055;
            
            return (
              <div 
                key={item.id} 
                className="item-voxel-card"
                style={{ animationDelay: `${baseDelay + staggerDelay}s` }}
              >
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