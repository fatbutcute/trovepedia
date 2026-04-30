import React, { useState, useEffect } from 'react';
// ⚠️ FONTOS: Állítsd be a pontos útvonalat a saját json fájlodhoz!
import delveFallback from '../data/delve.json'; 
import './DelvePage.css';
import StaffCard from '../components/StaffCard';

const DelvePage = () => {
    const [delves, setDelves] = useState([]);
    const [weekNumber, setWeekNumber] = useState("N/A");
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDelve, setSelectedDelve] = useState(null);
    
    // Állapot az eltűnő animáció kezeléséhez
    const [isClosing, setIsClosing] = useState(false);

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

            // BIZTONSÁGI HÁLÓ
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

    // Késleltetett bezárás az animáció miatt
    const handleCloseModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setSelectedDelve(null);
            setIsClosing(false);
        }, 200);
    };

    return (
        <div className="delve-page-wrapper">
            <header className="delve-header">
                <div className="delve-title-row">
                    <div className='Sqze'>
                        <StaffCard
                            discordId="724956641023492116"
                            name="Sqze (Nepo)"
                            role="Developer, Pyrodisc"
                        />
                    </div>                     
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
                    <div className="delve-grid" key={`grid-${searchTerm}`}>
                        {filteredDelves.map((item, index) => (
                            <div 
                                key={item.id || index} 
                                className={`ui-card slide-up-animation ${item.isVaultFloor ? 'vault-card' : ''}`}
                                style={{animationDelay: `${index * 0.05}s`, cursor: 'pointer'}}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setIsClosing(false);
                                    setTimeout(() => setSelectedDelve(item), 10);
                                }}
                            >
                                <div className="header">
                                    <div className="depth-badge">
                                        Depth {item.depth}
                                        {/* KORONA IKON BEILLESZTÉSE A KÁRTYÁRA */}
                                        {item.isVaultFloor && (
                                            <img src="/icons/crown.png" alt="Crown" className="vault-crown" style={{ marginLeft: '6px', width: '16px', height: '16px', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(231, 255, 19, 0.8))' }} />
                                        )}
                                    </div>
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

            {/* MODAL */}
            {selectedDelve && (
                <div 
                    className={`m-wrap ${isClosing ? 'closing' : ''}`} 
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) handleCloseModal();
                    }}
                >
                    <div className={`m-modal ${isClosing ? 'closing' : ''}`}>
                        <div className="m-accent-bar"></div>
                        
                        <div className="m-header">
                            <div className="m-header-left">
                                <div className="m-depth-row">
                                    <div className="m-depth-num">{selectedDelve.depth}</div>
                                    <div className="m-depth-tag">
                                        <span className="m-depth-label">DEPTH LEVEL</span>
                                        {/* KORONA IKON BEILLESZTÉSE A MODAL VAULT JELVÉNYÉBE */}
                                        {selectedDelve.isVaultFloor && (
                                            <span className="m-floor-badge" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <img src="/icons/crown.png" alt="Crown" className="vault-crown" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
                                                VAULT FLOOR
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="m-subtitle">{selectedDelve.biome} - {selectedDelve.zone}</div>
                            </div>
                            <button className="m-close" onClick={handleCloseModal}>✕</button>
                        </div>

                        <div className="m-body">
                            {/* TOP ROW: Boss & Objective */}
                            <div className="m-top-row">
                                <div className="m-boss-card">
                                    <div className="m-card-eyebrow">BOSS</div>
                                    <div className="m-boss-name">{selectedDelve.boss?.n}</div>
                                    <div className="m-tags">
                                        {selectedDelve.boss?.b?.map((b, i) => <span key={i} className="m-tag danger">{b}</span>)}
                                    </div>
                                </div>
                                <div className="m-obj-card">
                                    <div className="m-card-eyebrow blue">OBJECTIVE</div>
                                    <div className="m-obj-value">{selectedDelve.objectiveText}</div>
                                    <div className="m-obj-label">Complete objective to reveal boss</div>
                                </div>
                            </div>

                            {/* ENEMIES SECTION */}
                            <div>
                                <div className="m-section-head">
                                    <span className="m-section-title">HOSTILE ENTITIES</span>
                                    <div className="m-section-line"></div>
                                </div>
                                <div className="m-enemies-grid">
                                    {(selectedDelve.enemies || []).map((en, i) => (
                                        <div key={i} className="m-enemy">
                                            <div className="m-enemy-info">
                                                <div className="m-enemy-name">{en.n}</div>
                                                <div className="m-tags">
                                                    {(en.b || []).map((buff, j) => <span key={j} className="m-tag info">{buff}</span>)}
                                                </div>
                                            </div>
                                            <div className="m-enemy-count-wrap">
                                                <span className="m-enemy-count-label">QTY: </span>
                                                <span className="m-enemy-count">{en.c}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ROOM MAP SECTION */}
                            <div className="m-map">
                                <div className="m-section-head">
                                    <span className="m-section-title">FLOOR BLUEPRINT</span>
                                    <div className="m-section-line"></div>
                                </div>
                                <div className="m-room-grid">
                                    <div className="m-room spawn">
                                        <span className="m-room-id">SPAWN</span>
                                        <span className="m-room-type">Start</span>
                                    </div>
                                    
                                    {(selectedDelve.roomDetails || []).map((room, i) => {
                                        if (room.e === undefined) return null;
                                        const enemyName = (selectedDelve.enemies || [])[room.e]?.n || "Unknown";
                                        const shortName = enemyName.substring(0, 8);
                                        return (
                                            <div key={i} className="m-room">
                                                <span className="m-room-id">R{i+1}</span>
                                                <span className="m-room-type">{shortName}</span>
                                            </div>
                                        );
                                    })}

                                    <div className="m-room boss-room">
                                        <span className="m-room-id">BOSS</span>
                                        <span className="m-room-type">End</span>
                                    </div>
                                </div>
                                
                                <div className="m-map-legend">
                                    <div className="m-legend-item"><div className="m-legend-dot s"></div> SPAWN</div>
                                    <div className="m-legend-item"><div className="m-legend-dot r"></div> ROOM</div>
                                    <div className="m-legend-item"><div className="m-legend-dot b"></div> BOSS</div>
                                </div>
                            </div>
                        </div>

                        {/* FOOTER STATS */}
                        <div className="m-footer">
                            <div className="m-footer-stat">
                                <span className="m-footer-val">{(selectedDelve.roomDetails || []).filter(r => r.e !== undefined).length + 2}</span>
                                <span className="m-footer-label">TOTAL ROOMS</span>
                            </div>
                            <div className="m-footer-divider"></div>
                            <div className="m-footer-stat">
                                <span className="m-footer-val">{(selectedDelve.enemies || []).length}</span>
                                <span className="m-footer-label">ENEMY TYPES</span>
                            </div>
                            <div className="m-footer-divider"></div>
                            <div className="m-footer-stat">
                                <span className="m-footer-val">{selectedDelve.zone}</span>
                                <span className="m-footer-label">DIFFICULTY</span>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default DelvePage;