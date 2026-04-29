import React, { useState, useEffect } from 'react';
import './DelvePage.css';

const DelvePage = () => {
    const [delves, setDelves] = useState([]);
    const [weekNumber, setWeekNumber] = useState("N/A");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    
    // ÚJ: Állapot a kijelölt delve-hez (Modal)
    const [selectedDelve, setSelectedDelve] = useState(null);

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
                            <p className='pyrodisc-desc'>Data gathering dashboard for delves and weekly bonuses.</p>
                        </div>
                    </div>
                </div>
                <div className="week-badge">Week #{weekNumber}</div>
                <p className="delve-desc">Click on any card to see detailed room layout and enemy information.</p>
                <div className="delve-separator"></div>
                <div className="delve-search-container">
                    <div className="search-input-wrapper">
                        <img src="/icons/search.png" alt="Search" className="search-icon" />
                        <input 
                            type="text" 
                            className="delve-search-input"
                            placeholder="Search by depth, boss, buff, biome..."
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
                ) : filteredDelves.length === 0 ? (
                    <div className="no-data-notice"><p>No results found for "{searchTerm}".</p></div>
                ) : (
                    <div className="delve-grid">
                        {filteredDelves.map((item, index) => (
                            <div 
                                key={item.id || index} 
                                className="ui-card slide-up-animation" 
                                style={{animationDelay: `${index * 0.01}s`, cursor: 'pointer'}}
                                onClick={() => setSelectedDelve(item)} // Kártyára kattintás
                            >
                                <div className="header">
                                    <div className="depth-badge">Depth {item.depth}</div>
                                    {item.isVaultFloor && <div className="vault-mini-tag">VAULT</div>}
                                    <div className="difficulty-tag">{item.zone}</div>
                                </div>
                                <h1 className="title">{item.biome}</h1>
                                <div className="modifier-bar">
                                    {item.boss?.b?.map((buff, idx) => (
                                        <div key={idx} className="mod-badge">{buff}</div>
                                    ))}
                                </div>
                                <div className="info-grid">
                                    <div className="row objective"><div className="icon-box1"></div><span className="main-text">{item.objectiveText}</span></div>
                                    <div className="row"><div className="icon-box2"></div><span className="main-text">{item.boss?.n || "Unknown Boss"}</span></div>
                                </div>
                                <div className="click-hint">Click for details →</div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* MODAL MEGJELENÍTÉSE */}
            {selectedDelve && (
                <DelveModal 
                    data={selectedDelve} 
                    onClose={() => setSelectedDelve(null)} 
                />
            )}
        </div>
    );
};

// --- RÉSZLETES MODAL KOMPONENS ---
const DelveModal = ({ data, onClose }) => {
    // Megakadályozza a kattintás továbbterjedését a modalon belülről
    const stopPropagation = (e) => e.stopPropagation();

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content slide-up-modal" onClick={stopPropagation}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                
                <header className="modal-header">
                    <div className="modal-title-group">
                        <span className="modal-depth">Depth {data.depth}</span>
                        {data.isVaultFloor && <span className="vault-badge">✨ Vault Floor</span>}
                    </div>
                    <h2 className="modal-biome">{data.biome}</h2>
                    <p className="modal-zone">{data.zone}</p>
                </header>

                <div className="modal-body-grid">
                    {/* BOSS SZEKCIÓ */}
                    <section className="modal-section boss-section">
                        <div className="section-label-row">
                            <div className="icon-box2"></div>
                            <h3>Boss Information</h3>
                        </div>
                        <div className="boss-detail-card">
                            <p className="boss-name">{data.boss?.n}</p>
                            <div className="modal-modifier-bar">
                                {data.boss?.b?.map((buff, i) => (
                                    <span key={i} className="mod-badge big">{buff}</span>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* OBJECTIVE SZEKCIÓ */}
                    <section className="modal-section objective-section">
                        <div className="section-label-row">
                            <div className="icon-box1"></div>
                            <h3>Objective</h3>
                        </div>
                        <div className="objective-detail-card">
                            <p className="objective-text">{data.objectiveText}</p>
                        </div>
                    </section>

                    {/* ENEMIES SZEKCIÓ */}
                    <section className="modal-section enemies-section">
                        <div className="section-label-row">
                            <div className="icon-box3"></div>
                            <h3>Floor Enemies</h3>
                        </div>
                        <div className="enemies-modal-grid">
                            {data.enemies?.map((enemy, i) => (
                                <div key={i} className="enemy-modal-card">
                                    <div className="enemy-modal-header">
                                        <span className="enemy-modal-name">{enemy.n}</span>
                                        <span className="enemy-modal-count">x{enemy.c}</span>
                                    </div>
                                    <div className="enemy-modal-buffs">
                                        {enemy.b?.map((b, j) => (
                                            <span key={j} className="enemy-buff-tag">{b}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ROOM LAYOUT SZEKCIÓ */}
                    <section className="modal-section layout-section">
                        <div className="section-label-row">
                            <img src="/icons/target.png" style={{width:20, height:20}} alt="layout" />
                            <h3>Room Layout (14 Rooms)</h3>
                        </div>
                        <div className="room-layout-grid">
                            <div className="room-box spawn">Spawn</div>
                            {data.roomDetails?.slice(0, 12).map((room, i) => {
                                // Megnézzük melyik ellenség van a szobában az index alapján
                                const enemyName = data.enemies[room.e]?.n || "Empty";
                                const shortName = enemyName.split(' ')[0]; // Csak az első szó, h kiférjen
                                return (
                                    <div key={i} className={`room-box enemy-type-${room.e}`}>
                                        <span className="room-id">R{i+1}</span>
                                        <span className="room-enemy">{shortName}</span>
                                    </div>
                                );
                            })}
                            <div className="room-box boss-room">BOSS</div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default DelvePage;