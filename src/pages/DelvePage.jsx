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

            // 1. LÉPÉS: Megpróbáljuk letölteni a legfrissebb élő adatokat
            for (const proxy of proxies) {
                try {
                    const response = await fetch(proxy, { headers: { "Accept": "application/json" } });
                    if (!response.ok) throw new Error("Proxy hiba");
                    
                    const data = await response.json();
                    
                    // Ellenőrizzük, hogy valós JSON adat jött-e vissza
                    if (data && (data.data?.depths || data.depths)) {
                        setDelves(data.data?.depths || data.depths);
                        setWeekNumber(data.data?.weekNumber || data.weekNumber || "N/A");
                        success = true;
                        break; // Sikerült az élő lekérés, kilépünk!
                    }
                } catch (err) {
                    console.warn("Proxy próbálkozás sikertelen, ugrás a következőre...");
                }
            }

            // 2. LÉPÉS: BIZTONSÁGI HÁLÓ - Ha minden proxy blokkolva van, betöltjük a helyi JSON-t!
            if (!success) {
                console.log("Élő adatok blokkolva. Helyi (offline) JSON betöltése!");
                setDelves(delveFallback?.data?.depths || delveFallback?.depths || []);
                setWeekNumber(delveFallback?.data?.weekNumber || delveFallback?.weekNumber || "N/A");
            }

            setLoading(false);
        };
        fetchDelveData();
    }, []);

    // Szűrési logika (Golyóálló)
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
                    <div className="delve-grid">
                        {filteredDelves.map((item, index) => (
                            <div 
                                key={item.id || index} 
                                className={`ui-card slide-up-animation ${item.isVaultFloor ? 'vault-card' : ''}`}
                                style={{animationDelay: `${index * 0.01}s`, cursor: 'pointer'}}
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

            {/* FELUGRÓ ABLAK (MODAL) */}
            {selectedDelve && (
                <div 
                    className="dm-overlay" 
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) setSelectedDelve(null);
                    }}
                >
                    <div className="dm-content">
                        <button className="dm-close" onClick={() => setSelectedDelve(null)}>✕</button>
                        
                        <div className="dm-header">
                            <div className="dm-title-row">
                                <h2>Depth {selectedDelve.depth}</h2>
                                {selectedDelve.isVaultFloor && <span className="dm-vault-pill">👑 Vault Floor</span>}
                            </div>
                            <p className="dm-subtitle">{selectedDelve.biome} • {selectedDelve.zone}</p>
                        </div>

                        <div className="dm-box dm-boss-box">
                            <div className="dm-box-title">👑 Boss: {selectedDelve.boss?.n}</div>
                            <div className="dm-tags">
                                {selectedDelve.boss?.b?.map((b, i) => <span key={i} className="dm-tag-red">{b}</span>)}
                            </div>
                        </div>

                        <div className="dm-box dm-obj-box">
                            <div className="dm-box-title">🎯 Objective</div>
                            <div className="dm-obj-text">{selectedDelve.objectiveText}</div>
                        </div>

                        <h3 className="dm-section-title">Enemies</h3>
                        <div className="dm-enemies-grid">
                            {(selectedDelve.enemies || []).map((en, i) => (
                                <div key={i} className="dm-enemy-card">
                                    <div className="dm-enemy-name">{en.n}</div>
                                    <div className="dm-enemy-count">Count: {en.c}</div>
                                    <div className="dm-tags">
                                        {(en.b || []).map((buff, j) => <span key={j} className="dm-tag-gray">{buff}</span>)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h3 className="dm-section-title">
                            Room Layout ({(selectedDelve.roomDetails || []).filter(r => r.e !== undefined).length + 2} Rooms)
                        </h3>
                        <div className="dm-layout-grid">
                            <div className="dm-room dm-room-spawn">Spawn</div>
                            
                            {(selectedDelve.roomDetails || []).map((room, i) => {
                                if (room.e === undefined) return null;
                                
                                // JAVÍTÁS: Extrém védelem, ha hiányozna az ellenség adata!
                                const enemyList = selectedDelve.enemies || [];
                                const enemyName = enemyList[room.e]?.n || "Unknown";
                                const shortName = enemyName.substring(0, 8); 
                                
                                return (
                                    <div key={i} className="dm-room">
                                        <span className="dm-r-id">R{i+1}</span>
                                        <span className="dm-r-name">{shortName}</span>
                                    </div>
                                );
                            })}

                            <div className="dm-room dm-room-boss">Boss</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DelvePage;