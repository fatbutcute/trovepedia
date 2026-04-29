import React, { useState, useEffect } from 'react';
import './DelvePage.css';

const DelvePage = () => {
    const [delves, setDelves] = useState([]);
    const [weekNumber, setWeekNumber] = useState("N/A");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDelve, setSelectedDelve] = useState(null);

    // ADATOK LEKÉRÉSE AUTÓMATIKUS ÚJRAPRÓBÁLKOZÁSSAL (Auto-Retry)
    useEffect(() => {
        const fetchDelveData = async () => {
            const targetUrl = "https://www.pyrodisc.one/api/trove/delve/current.php";
            const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${targetUrl}`;
            let retries = 3; // 3-szor próbálja meg letölteni, ha megszakadna a kapcsolat

            for (let i = 0; i < retries; i++) {
                try {
                    setLoading(true);
                    const response = await fetch(proxyUrl, { headers: { "Accept": "application/json" } });
                    
                    if (!response.ok) throw new Error(`Status: ${response.status}`);
                    
                    const data = await response.json();
                    setDelves(data?.data?.depths || data?.depths || []);
                    setWeekNumber(data?.data?.weekNumber || data?.weekNumber || "N/A");
                    setError(null);
                    break; // Ha sikerült, kilépünk a próbálkozási ciklusból
                } catch (err) {
                    console.warn(`Lekérés sikertelen (${i + 1}/${retries}). Újrapróbálkozás...`);
                    if (i === retries - 1) {
                        setError("Szerver hiba. Kérlek frissíts rá az oldalra később.");
                    }
                    // Vár 1 másodpercet a következő próbálkozás előtt
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } finally {
                    if (i === retries - 1 || !error) setLoading(false);
                }
            }
        };
        fetchDelveData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Szűrés
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
                    <div className="no-data-notice"><p style={{ color: "var(--gold)" }}>Connecting to Pyrodisc DB...</p></div>
                ) : error ? (
                    <div className="no-data-notice"><p style={{ color: "#ff4f6a" }}>{error}</p></div>
                ) : (
                    <div className="delve-grid">
                        {filteredDelves.map((item, index) => (
                            <div 
                                key={item.id || index} 
                                className={`ui-card slide-up-animation ${item.isVaultFloor ? 'vault-card' : ''}`}
                                style={{animationDelay: `${index * 0.01}s`}}
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

            {/* ATOMBIZTOS FELUGRÓ ABLAK (MODAL) */}
            {selectedDelve && (
                <div className="delve-modal-overlay" onClick={() => setSelectedDelve(null)}>
                    <div className="delve-modal-content" onClick={(e) => e.stopPropagation()}>
                        
                        <button className="delve-modal-close" onClick={() => setSelectedDelve(null)}>✕</button>
                        
                        <div className="delve-modal-header">
                            <h2>Depth {selectedDelve.depth}</h2>
                            <p>{selectedDelve.biome} • {selectedDelve.zone}</p>
                            {selectedDelve.isVaultFloor && <span className="delve-modal-vault">Vault Floor</span>}
                        </div>

                        <div className="delve-modal-section">
                            <h3>Boss Information</h3>
                            <div className="delve-modal-box boss-box">
                                <span className="highlight">{selectedDelve.boss?.n}</span>
                                <div className="delve-modal-tags">
                                    {selectedDelve.boss?.b?.map((b, i) => <span key={i} className="tag tag-red">{b}</span>)}
                                </div>
                            </div>
                        </div>

                        <div className="delve-modal-section">
                            <h3>Objective</h3>
                            <div className="delve-modal-box obj-box">
                                <span className="highlight">{selectedDelve.objectiveText}</span>
                            </div>
                        </div>

                        <div className="delve-modal-section">
                            <h3>Enemies</h3>
                            <div className="delve-modal-enemies">
                                {selectedDelve.enemies?.map((en, i) => (
                                    <div key={i} className="delve-modal-enemy-card">
                                        <div className="enemy-head">
                                            <span className="enemy-name">{en.n}</span>
                                            <span className="enemy-count">x{en.c}</span>
                                        </div>
                                        <div className="delve-modal-tags">
                                            {en.b?.map((buff, j) => <span key={j} className="tag tag-gray">{buff}</span>)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="delve-modal-section">
                            <h3>Room Layout</h3>
                            <div className="delve-modal-layout">
                                <div className="room-box room-spawn">Spawn</div>
                                {(selectedDelve.roomDetails || []).map((room, i) => {
                                    if (room.e === undefined) return null;
                                    const enemyName = selectedDelve.enemies[room.e]?.n || "Unknown";
                                    // Levágjuk a nevet, hogy beférjen a dobozba
                                    const shortName = enemyName.split(' ')[0]; 
                                    return (
                                        <div key={i} className="room-box">
                                            <span className="r-id">R{i+1}</span>
                                            <span className="r-name">{shortName}</span>
                                        </div>
                                    );
                                })}
                                <div className="room-box room-boss">Boss</div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default DelvePage;