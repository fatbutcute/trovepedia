import React, { useState, useEffect } from 'react';
import './DelvePage.css';

const DelvePage = () => {
    const [delves, setDelves] = useState([]);
    const [weekNumber, setWeekNumber] = useState("N/A");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDelve, setSelectedDelve] = useState(null);

    useEffect(() => {
        const fetchDelveData = async () => {
            try {
                setLoading(true);
                const targetUrl = "https://www.pyrodisc.one/api/trove/delve/current.php";
                const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`, {
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
        return biomeMatch || depthMatch || bossMatch || buffMatch;
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
                            placeholder="Search delves..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            <main className="delve-container">
                {loading ? (
                    <div className="no-data-notice"><p>Loading live data...</p></div>
                ) : error ? (
                    <div className="no-data-notice"><p>Error: {error}</p></div>
                ) : (
                    <div className="delve-grid">
                        {filteredDelves.map((item, index) => (
                            <div 
                                key={item.id || index} 
                                // Ha Vault szint, hozzáadjuk a vault-card osztályt
                                className={`ui-card slide-up-animation ${item.isVaultFloor ? 'vault-card' : ''}`}
                                style={{animationDelay: `${index * 0.05}s`}}
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
                                    <div className="row"><div className="icon-box2"></div><span className="main-text">{item.boss?.n}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* MODAL */}
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