import React, { useState, useEffect } from 'react';
import './DelvePage.css';

const DelvePage = () => {
    // 1. Állapotok (State)
    const [delves, setDelves] = useState([]);
    const [weekNumber, setWeekNumber] = useState("N/A");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDelve, setSelectedDelve] = useState(null);

    // 2. Adatok lekérése a MŰKÖDŐ CodeTabs proxy-val!
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

    // 3. Szűrési logika
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
            {/* FEJLÉC */}
            <header className="delve-header">
                <div className="delve-title-row">
                    <h1 className="delve-title">Delve Index</h1>
                    <div className="pyrodisc-container">
                        <a href="https://www.pyrodisc.one/delves" target="_blank" rel="noopener noreferrer" className="pyrodisc-link">
                            <span className="pyrodisc-spin-wrapper">
                                <img src="/images/pyrodisc.png" alt="Pyrodisc Logo" className="pyrodisc-image" />
                            </span>
                        </a>
                    </div>
                </div>
                <div className="week-badge">Week #{weekNumber}</div>
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

            {/* KÁRTYÁK GRIDJE */}
            <main className="delve-container">
                {loading ? (
                    <div className="no-data-notice"><p style={{ color: "var(--gold)" }}>Fetching live data from Pyrodisc...</p></div>
                ) : error ? (
                    <div className="no-data-notice"><p style={{ color: "#ff4f6a" }}>Error loading data: {error}</p></div>
                ) : filteredDelves.length === 0 ? (
                    <div className="no-data-notice"><p>No results found for "{searchTerm}".</p></div>
                ) : (
                    <div className="delve-grid">
                        {filteredDelves.map((item, index) => (
                            <div 
                                key={item.id || index} 
                                // Ha Vault, kap egy glow effektet a CSS-ből
                                className={`ui-card slide-up-animation ${item.isVaultFloor ? 'vault-card' : ''}`}
                                style={{animationDelay: `${index * 0.01}s`}}
                                onClick={() => setSelectedDelve(item)} // Kattintásra kinyílik a Modal
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

                                {/* VISSZAÁLLÍTOTT RÉSZLETES KÁRTYA TARTALOM */}
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

            {/* FELUGRÓ ABLAK (MODAL) */}
            {selectedDelve && (
                <div className="modal-overlay" onClick={() => setSelectedDelve(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedDelve(null)}>&times;</button>
                        
                        <div className={`modal-header-box ${selectedDelve.isVaultFloor ? 'vault-glow' : ''}`}>
                            <span className="modal-depth">Depth {selectedDelve.depth}</span>
                            <h2 className="modal-biome">{selectedDelve.biome}</h2>
                        </div>

                        <div className="modal-grid">
                            <section className="modal-section">
                                <h3>Boss & Buffs</h3>
                                <div className="detail-box">
                                    <p className="highlight-text">{selectedDelve.boss?.n}</p>
                                    <div className="modal-buffs">
                                        {selectedDelve.boss?.b?.map((b, i) => <span key={i} className="mod-badge">{b}</span>)}
                                    </div>
                                </div>
                            </section>

                            <section className="modal-section">
                                <h3>Enemies</h3>
                                <div className="enemy-list">
                                    {selectedDelve.enemies?.map((en, i) => (
                                        <div key={i} className="enemy-row">
                                            <span>{en.n}</span>
                                            <span className="count">x{en.c}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="modal-section full-width">
                                <h3>Room Layout</h3>
                                <div className="layout-grid">
                                    <div className="room spawn">Spawn</div>
                                    {selectedDelve.roomDetails?.slice(0, 12).map((r, i) => (
                                        <div key={i} className="room">Room {i+1}</div>
                                    ))}
                                    <div className="room boss">BOSS</div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DelvePage;