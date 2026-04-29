import React, { useState, useEffect } from 'react';
// ⚠️ FONTOS: Állítsd be a pontos útvonalat a saját json fájlodhoz!
import delveFallback from '../data/delve.json'; 
import './DelvePage.css';

const DelvePage = () => {
    const [delves, setDelves] = useState([]);
    const [weekNumber, setWeekNumber] = useState("N/A");
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDelve, setSelectedDelve] = useState(null);

    // HIBRID FETCH RENDSZER BIZTONSÁGI HÁLÓVAL
    useEffect(() => {
        const fetchDelveData = async () => {
            const targetUrl = "https://www.pyrodisc.one/api/trove/delve/current.php";
            const proxies = [
                `https://api.codetabs.com/v1/proxy?quest=${targetUrl}`,
                `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`
            ];

            setLoading(true);
            let success = false;

            for (const proxy of proxies) {
                try {
                    const response = await fetch(proxy, { headers: { "Accept": "application/json" } });
                    if (!response.ok) throw new Error("Proxy hiba");
                    
                    const data = await response.json();
                    
                    if (data && (data.data?.depths || data.depths)) {
                        setDelves(data.data?.depths || data.depths);
                        setWeekNumber(data.data?.weekNumber || data.weekNumber || "N/A");
                        success = true;
                        break; 
                    }
                } catch (err) {
                    console.warn("Proxy próbálkozás sikertelen, ugrás a következőre...");
                }
            }

            // BIZTONSÁGI HÁLÓ: Helyi JSON betöltése hiba esetén
            if (!success) {
                console.log("Élő adatok blokkolva. Helyi (offline) JSON betöltése!");
                setDelves(delveFallback?.data?.depths || delveFallback?.depths || []);
                setWeekNumber(delveFallback?.data?.weekNumber || delveFallback?.weekNumber || "N/A");
            }

            setLoading(false);
        };
        fetchDelveData();
    }, []);

    // Szűrési logika
    const filteredDelves = (delves || []).filter(item => {
        if (!item) return false;
        const lowerSearch = searchTerm.toLowerCase();
        const biomeMatch = (item.biome || "").toLowerCase().includes(lowerSearch);
        const depthMatch = (item.depth || "").toString().includes(lowerSearch);
        const bossMatch = (item.boss?.n || "").toLowerCase().includes(lowerSearch);
        const buffMatch = (item.boss?.b || []).some(buff => (buff || "").toLowerCase().includes(lowerSearch));
        const enemyMatch = (item.enemies || []).some(enemy => (enemy?.n || "").toLowerCase().includes(lowerSearch));
        return biomeMatch || depthMatch || bossMatch || buffMatch || enemyMatch;
    });

    return (
        <div className="delve-page-wrapper">
            <header className="delve-header">
                <div className="delve-title-row">
                    <h1 className="delve-title">Delve Index</h1>
                    
                    <div className="pyrodisc-container">
                        <a href="https://www.pyrodisc.one/delves" target="_blank" rel="noopener noreferrer" className="pyrodisc-link">
                            <span className="pyrodisc-spin-wrapper">
                                <img src="/images/pyrodisc.png" alt="Pyrodisc Logo" className="pyrodisc-image" />
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

                <div className="week-badge">Week #{weekNumber}</div>
                
                <p className="delve-desc">
                    We are grateful to the Trove community for their daily contributions and dedication to keeping our data up to date.
                </p>
                <div className="delve-separator"></div>

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
                {loading ? (
                    <div className="no-data-notice"><p style={{ color: "var(--gold)" }}>Connecting to Database...</p></div>
                ) : (
                    /* ZSENIÁLIS TRÜKK: A key={searchTerm} miatt a React újraépíti az egész dobozt minden betűnél, így a kártyák frissen animálódnak be! */
                    <div className="delve-grid" key={`grid-${searchTerm}`}>
                        {filteredDelves.map((item, index) => (
                            <div 
                                key={item.id || index} 
                                className={`ui-card slide-up-animation ${item.isVaultFloor ? 'vault-card' : ''}`}
                                style={{animationDelay: `${index * 0.05}s`, cursor: 'pointer'}}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setTimeout(() => setSelectedDelve(item), 10);
                                }}
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
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* ÚJ, EGYEDI FELUGRÓ ABLAK (Holographic Design) */}
            {selectedDelve && (
                <div 
                    className="holo-overlay" 
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) setSelectedDelve(null);
                    }}
                >
                    <div className="holo-content">
                        <button className="holo-close" onClick={() => setSelectedDelve(null)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                        </button>
                        
                        <div className="holo-header">
                            <div className="holo-title-wrap">
                                <h2>Depth {selectedDelve.depth}</h2>
                                {selectedDelve.isVaultFloor && <span className="holo-vault-badge">✦ Vault</span>}
                            </div>
                            <p className="holo-subtitle">{selectedDelve.biome} <span>//</span> {selectedDelve.zone}</p>
                        </div>

                        <div className="holo-body">
                            {/* Bal oszlop: Fő infók */}
                            <div className="holo-main-col">
                                <div className="holo-card boss-card">
                                    <div className="holo-card-icon">💀</div>
                                    <div className="holo-card-info">
                                        <h3>Boss Target</h3>
                                        <h4>{selectedDelve.boss?.n}</h4>
                                        <div className="holo-tags">
                                            {selectedDelve.boss?.b?.map((b, i) => <span key={i} className="holo-tag-danger">{b}</span>)}
                                        </div>
                                    </div>
                                </div>

                                <div className="holo-card obj-card">
                                    <div className="holo-card-icon">🎯</div>
                                    <div className="holo-card-info">
                                        <h3>Mission Objective</h3>
                                        <h4>{selectedDelve.objectiveText}</h4>
                                    </div>
                                </div>
                            </div>

                            {/* Jobb oszlop: Ellenségek */}
                            <div className="holo-side-col">
                                <h3>Hostile Entities</h3>
                                <div className="holo-enemy-list">
                                    {(selectedDelve.enemies || []).map((en, i) => (
                                        <div key={i} className="holo-enemy-item">
                                            <div className="holo-enemy-main">
                                                <span className="holo-enemy-name">{en.n}</span>
                                                <span className="holo-enemy-count">x{en.c}</span>
                                            </div>
                                            <div className="holo-tags">
                                                {(en.b || []).map((buff, j) => <span key={j} className="holo-tag-neutral">{buff}</span>)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Alsó sáv: Szoba elrendezés TÉRKÉP stílusban */}
                        <div className="holo-map-section">
                            <h3>Floor Blueprint ({(selectedDelve.roomDetails || []).filter(r => r.e !== undefined).length + 2} Rooms)</h3>
                            <div className="holo-timeline">
                                <div className="holo-node spawn-node">
                                    <div className="node-dot"></div>
                                    <span>Spawn</span>
                                </div>
                                
                                {(selectedDelve.roomDetails || []).map((room, i) => {
                                    if (room.e === undefined) return null;
                                    const enemyName = (selectedDelve.enemies || [])[room.e]?.n || "Unknown";
                                    const shortName = enemyName.substring(0, 8) + (enemyName.length > 8 ? '.' : '');
                                    
                                    return (
                                        <div key={i} className="holo-node">
                                            <div className="node-dot"></div>
                                            <span>{shortName}</span>
                                        </div>
                                    );
                                })}

                                <div className="holo-node boss-node">
                                    <div className="node-dot"></div>
                                    <span>Boss</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DelvePage;