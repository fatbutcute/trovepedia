import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './DelvePage.css';

const DelvePage = () => {
    const [delves, setDelves] = useState([]);
    const [weekNumber, setWeekNumber] = useState("N/A");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDelve, setSelectedDelve] = useState(null);

    // Adatok lekérése a Pyrodiscről (CodeTabs proxyval)
    useEffect(() => {
        const fetchDelveData = async () => {
            try {
                setLoading(true);
                const targetUrl = "https://www.pyrodisc.one/api/trove/delve/current.php";
                const response = await fetch(`https://api.codetabs.com/v1/proxy?quest=${targetUrl}`, {
                    method: "GET",
                    headers: { "Accept": "application/json" }
                });

                if (!response.ok) throw new Error(`Status: ${response.status}`);
                const data = await response.json();
                
                setDelves(data?.data?.depths || data?.depths || []);
                setWeekNumber(data?.data?.weekNumber || data?.weekNumber || "N/A");
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
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
                    
                    {/* Pyrodisc Logó + Tooltip visszarakva */}
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

                <div className="week-badge">Week #{weekNumber}</div>
                
                {/* Közösségi leírás visszarakva */}
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
                    <div className="no-data-notice"><p style={{ color: "var(--gold)" }}>Fetching live data...</p></div>
                ) : error ? (
                    <div className="no-data-notice"><p style={{ color: "#ff4f6a" }}>Error: {error}</p></div>
                ) : (
                    <div className="delve-grid">
                        {filteredDelves.map((item, index) => (
                            <div 
                                key={item.id || index} 
                                className={`ui-card slide-up-animation ${item.isVaultFloor ? 'vault-card' : ''}`}
                                style={{animationDelay: `${index * 0.01}s`, cursor: 'pointer'}}
                                onClick={() => setSelectedDelve(item)}
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

            {/* MODAL - KITELEPORTÁLVA A BODY-BA, KÉP ALAPJÁN STILIZÁLVA */}
            {selectedDelve && createPortal(
                <div className="modal-overlay" onClick={() => setSelectedDelve(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedDelve(null)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                        </button>
                        
                        <div className="modal-header-custom">
                            <div className="modal-title-row-custom">
                                <h2 className="modal-depth-title">Depth {selectedDelve.depth}</h2>
                                {selectedDelve.isVaultFloor && (
                                    <div className="vault-badge-custom">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M2 22h20M2 11l5-3 5 3 5-3 5 3v9H2v-9z"/></svg>
                                        Vault Floor
                                    </div>
                                )}
                            </div>
                            <div className="modal-subtitle-custom">
                                {selectedDelve.biome} • {selectedDelve.zone}
                            </div>
                        </div>

                        <div className="modal-section-custom boss-section-custom">
                            <div className="section-title-custom">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff4f6a" strokeWidth="2"><path d="M2 22h20M2 11l5-3 5 3 5-3 5 3v9H2v-9z"/></svg>
                                Boss: {selectedDelve.boss?.n}
                            </div>
                            <div className="badge-row-custom">
                                {selectedDelve.boss?.b?.map((b, i) => (
                                    <span key={i} className="tag-custom tag-red-custom">{b}</span>
                                ))}
                            </div>
                        </div>

                        <div className="modal-section-custom objective-section-custom">
                            <div className="section-title-custom">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#40d0ff" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                                Objective
                            </div>
                            <div className="objective-val-custom">{selectedDelve.objectiveText}</div>
                        </div>

                        <h3 className="section-heading-custom">Enemies</h3>
                        <div className="enemies-grid-custom">
                            {selectedDelve.enemies?.map((en, i) => (
                                <div key={i} className="enemy-card-custom">
                                    <h4>{en.n}</h4>
                                    <div className="enemy-count-custom">Count: {en.c}</div>
                                    <div className="badge-row-custom">
                                        {en.b?.map((buff, j) => (
                                            <span key={j} className="tag-custom tag-gray-custom">{buff}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h3 className="section-heading-custom">Room Layout ({selectedDelve.roomDetails?.filter(r => r.e !== undefined).length + 2} Rooms)</h3>
                        <div className="layout-grid-custom">
                            <div className="room-box-custom room-spawn-custom">
                                <span className="room-name-custom">Spawn</span>
                            </div>
                            
                            {selectedDelve.roomDetails?.map((room, i) => {
                                if (room.e === undefined) return null;
                                const enemyName = selectedDelve.enemies[room.e]?.n || "Unknown";
                                const shortName = enemyName.substring(0, 8); // Csak az első 8 karakter, ahogy a képen
                                
                                return (
                                    <div key={i} className="room-box-custom">
                                        <span className="room-id-custom">R{i+1}</span>
                                        <span className="room-name-custom">{shortName}</span>
                                    </div>
                                );
                            })}

                            <div className="room-box-custom room-boss-custom">
                                <span className="room-name-custom">Boss</span>
                            </div>
                        </div>

                        <div className="layout-legend-custom">
                            <span className="legend-item-custom"><span className="dot-custom dot-blue-custom"></span> Spawn</span>
                            <span className="legend-item-custom"><span className="dot-custom dot-green-custom"></span> Objective</span>
                            <span className="legend-item-custom"><span className="dot-custom dot-red-custom"></span> Boss</span>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default DelvePage;