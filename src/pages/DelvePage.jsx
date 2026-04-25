import React, { useState } from 'react';
import delveData from '../data/delve.json';
import './DelvePage.css';

const DelvePage = () => {
    // Adatok kinyerése és a keresési állapot
    const [delves] = useState(delveData?.data?.depths || delveData?.depths || []);
    const [weekNumber] = useState(delveData?.data?.weekNumber || delveData?.weekNumber || "N/A");
    const [searchTerm, setSearchTerm] = useState("");

    // Szűrési logika: buff, boss, biome, depth, enemy név
    const filteredDelves = delves.filter(item => {
        const lowerSearch = searchTerm.toLowerCase();
        
        const biomeMatch = item.biome?.toLowerCase().includes(lowerSearch);
        const depthMatch = item.depth?.toString().includes(lowerSearch);
        const bossMatch = item.boss?.n?.toLowerCase().includes(lowerSearch);
        const buffMatch = item.boss?.b?.some(buff => buff.toLowerCase().includes(lowerSearch));
        const enemyMatch = item.enemies?.some(enemy => enemy.n?.toLowerCase().includes(lowerSearch));

        return biomeMatch || depthMatch || bossMatch || buffMatch || enemyMatch;
    });

    return (
        <div className="delve-page-wrapper">
            <header className="delve-header">
                <div className="delve-title-row">
                    <h1 className="delve-title">Delve Index</h1>
                    
                    <div className="pyrodisc-container">
                        <a 
                            href="https://www.pyrodisc.one/delves" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="pyrodisc-link"
                        >
                            <span className="pyrodisc-spin-wrapper">
                                <img 
                                    src="/images/pyrodisc.png" 
                                    alt="Pyrodisc Logo" 
                                    className="pyrodisc-image" 
                                />
                            </span>
                        </a>
                        <div className="pyrodisc-tooltip">
                            <span className='pyrodisc-h2'>Pyrodisc</span><br />
                            <p className='pyrodisc-desc'>
                                A data-gathering, dashboard-like website that continuously collects data from delves, including daily and weekly bonuses.
                            </p>
                        </div>
                    </div>
                </div>

                {weekNumber && <div className="week-badge">Week #{weekNumber}</div>}
                
                <p className="delve-desc">
                    We are grateful to the Trove community for their daily contributions and dedication to keeping our data up to date.
                </p>
                <div className="delve-separator"></div>

                {/* ÚJ: Search Bar a separator és a grid között */}
                <div className="delve-search-container">
                    <div className="search-input-wrapper">
                        <img src="/icons/search.png" alt="Search" className="search-icon" />
                        <input 
                            type="text" 
                            className="delve-search-input"
                            placeholder="Search by depth, boss, buff, biome or enemy..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            <main className="delve-container">
                {filteredDelves.length === 0 ? (
                    <div className="no-data-notice">
                        <p>No results found for "{searchTerm}". Try a different term!</p>
                    </div>
                ) : (
                    <div className="delve-grid">
                        {filteredDelves.map((item, index) => (
                            <div 
                                key={item.id || index} 
                                className="ui-card slide-up-animation" 
                                style={{animationDelay: `${index * 0.01}s`}}
                            >
                                <div className="header">
                                    <div className="depth-badge">Depth {item.depth}</div>
                                    <div className="difficulty-tag">{item.zone}</div>
                                </div>

                                <h1 className="title">{item.biome}</h1>

                                <div className="modifier-bar">
                                    {item.boss?.b?.map((buff, idx) => (
                                        <div key={idx} className="mod-badge">{buff}</div>
                                    ))}
                                </div>

                                <div className="info-grid">
                                    <div className="row objective">
                                        <div className="icon-box1"></div>
                                        <span className="main-text">{item.objectiveText}</span>
                                    </div>

                                    <div className="row">
                                        <div className="icon-box2"></div>
                                        <span className="main-text">{item.boss?.n || "Unknown Boss"}</span>
                                    </div>

                                    <div className="row enemies">
                                        <div className="icon-box3"></div>
                                        <div className="text-group">
                                            <span className="label">Enemies</span>
                                            <span className="list-text">
                                                {item.enemies && item.enemies.length > 0 
                                                    ? item.enemies.map(e => e.n).join(', ') 
                                                    : "No enemy data"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default DelvePage;