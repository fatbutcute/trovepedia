import React, { useState, useEffect, useMemo } from 'react';
import fishingData from '../data/fishingData.json';
import './FishingPage.css';

export default function FishingPage() {
  const [activeTab, setActiveTab] = useState('waters'); // waters, pools, poles
  const [searchTerm, setSearchTerm] = useState('');
  
  // Lazy loading / Infinite scroll állapota
  const [visibleItemsCount, setVisibleItemsCount] = useState(15);

  // Kereső szűrés
// Ritkaságok súlyozása: minél kisebb a szám, annál előrébb lesz a listában
  const rarityWeights = {
    'common': 1,
    'uncommon': 2,
    'rare': 3,
    'epic': 4,
    'legendary': 5
  };

  // Kereső szűrés ÉS Ritkaság szerinti növekvő rendezés
  const filteredItems = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase().trim();
    let currentPool = [];

    if (activeTab === 'waters') currentPool = fishingData.openWaters;
    if (activeTab === 'pools') currentPool = fishingData.pools;
    if (activeTab === 'poles') currentPool = fishingData.poles;

    // 1. Lépés: Kiszűrjük az elemeket a kereső alapján
    const filtered = currentPool.filter(item => {
      if (!item) return false;
      const nameMatch = (item.fish || item.name || "").toLowerCase().includes(lowerSearch);
      const liquidMatch = (item.liquid || "").toLowerCase().includes(lowerSearch);
      const biomeMatch = (item.biome || "").toLowerCase().includes(lowerSearch);
      const rarityMatch = (item.rarity || "").toLowerCase().includes(lowerSearch);
      
      return nameMatch || liquidMatch || biomeMatch || rarityMatch;
    });

    // 2. Lépés: Sorba rendezzük őket a súlyozás alapján (Növekvő sorrend: Common -> Legendary)
    return filtered.sort((a, b) => {
      const weightA = rarityWeights[(a.rarity || 'common').toLowerCase()] || 1;
      const weightB = rarityWeights[(b.rarity || 'common').toLowerCase()] || 1;
      return weightA - weightB; // Kisebbtől a nagyobbig
    });

  }, [activeTab, searchTerm]);

  // Szeletelt tömb a lazy loadinghoz
  const displayedItems = useMemo(() => {
    return filteredItems.slice(0, visibleItemsCount);
  }, [filteredItems, visibleItemsCount]);

  // Reseteljük a betöltött darabszámot, ha fület vagy keresési kifejezést váltunk
  useEffect(() => {
    setVisibleItemsCount(15);
  }, [activeTab, searchTerm]);

  // Figyeljük a görgetést a teljes oldalon (Infinite scroll)
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        // Ha elértük az oldal alját, betöltünk még 15 elemet
        setVisibleItemsCount(prev => Math.min(prev + 15, filteredItems.length));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filteredItems]);

  return (
    <div className="page-wrapper fishing-page">
      <header className="fishing-header">
        <h1>Fishing<span className="highlight"></span></h1>
        <p>Discover catch locations, required liquids, poles, and pools across the Trove universe.</p>
        
        <div className="fishing-tabs">
          <button className={`fish-tab-btn ${activeTab === 'waters' ? 'active' : ''}`} onClick={() => setActiveTab('waters')}>Open Waters</button>
          <button className={`fish-tab-btn ${activeTab === 'pools' ? 'active' : ''}`} onClick={() => setActiveTab('pools')}>Fishing Pools</button>
          <button className={`fish-tab-btn ${activeTab === 'poles' ? 'active' : ''}`} onClick={() => setActiveTab('poles')}>Fishing Poles</button>
        </div>

        <div className="fishing-search-wrapper">
          <input 
            type="text" 
            placeholder={`Search by name, liquid, biome or rarity...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="fishing-search-input"
          />
        </div>
      </header>

      <main className="fishing-container">
        <div className="fishing-grid">
          {displayedItems.map((item, index) => (
            <div 
              key={index} 
              className={`fish-ui-card f-rarity-${(item.rarity || 'common').toLowerCase()}`}
              style={{ animationDelay: `${(index % 15) * 0.03}s` }}
            >
              <div className="fish-card-header">
                <span className="fish-liquid-tag">{item.liquid}</span>
                {item.rarity && <span className="fish-rarity-badge">{item.rarity}</span>}
              </div>

              <h2 className="fish-card-title">{item.fish || item.name}</h2>

              <div className="fish-card-body">
                {activeTab !== 'poles' ? (
                  <>
                    <div className="fish-info-row"><strong>Biome:</strong> <span>{item.biome}</span></div>
                    {item.poolType && <div className="fish-info-row"><strong>Pool Type:</strong> <span>{item.poolType}</span></div>}
                    {item.depth && <div className="fish-info-row"><strong>Depth:</strong> <span>{item.depth}</span></div>}
                  </>
                ) : (
                  <>
                    <div className="fish-info-row"><strong>Source:</strong> <span>{item.source}</span></div>
                    <div className="fish-info-row"><strong>Price:</strong> <span>{item.price}</span></div>
                  </>
                )}
                <div className="fish-card-notes">{item.notes || item.effect}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Visszajelzés, ha nincs találat */}
        {displayedItems.length === 0 && (
          <div className="fish-no-results">No catch found matching your search.</div>
        )}

        {/* Kis infó sáv a lazy load jelzésére */}
        {visibleItemsCount < filteredItems.length && (
          <div className="fish-lazy-loader">Scrolling loads more fish...</div>
        )}
      </main>
    </div>
  );
}