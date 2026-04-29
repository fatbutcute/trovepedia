import React, { useState, useEffect } from 'react';
import './DelvePage.css';

const DelvePage = () => {
    // 1. Állapotok (State) beállítása: Adatok, Töltés, Hiba, Keresés
    const [delves, setDelves] = useState([]);
    const [weekNumber, setWeekNumber] = useState("N/A");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // 2. Adatok lekérése (Fetch) az oldal betöltésekor
    useEffect(() => {
        const fetchDelveData = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/delve", {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch delve data from Pyrodisc.");
                }

                const data = await response.json();
                
                // Beállítjuk az adatokat pont úgy, ahogy a lokális JSON-nál is volt
                setDelves(data?.data?.depths || data?.depths || []);
                setWeekNumber(data?.data?.weekNumber || data?.weekNumber || "N/A");
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDelveData();
    }, []);

    // 3. JAVÍTOTT Szűrési logika (100% Golyóálló)
    const filteredDelves = (delves || []).filter(item => {
        if (!item) return false; // Ha az item teljesen üres, átugorjuk
        const lowerSearch = searchTerm.toLowerCase();
        
        // A (valami || "") biztosítja, hogy ha hiányzik az adat, akkor is egy üres szöveget vizsgáljon, így nem omlik össze!
        const biomeMatch = (item.biome || "").toLowerCase().includes(lowerSearch);
        const depthMatch = (item.depth || "").toString().includes(lowerSearch);
        const bossMatch = (item.boss?.n || "").toLowerCase().includes(lowerSearch);
        const buffMatch = (item.boss?.b || []).some(buff => (buff || "").toLowerCase().includes(lowerSearch));
        const enemyMatch = (item.enemies || []).some(enemy => (enemy?.n || "").toLowerCase().includes(lowerSearch));

        return biomeMatch || depthMatch || bossMatch || buffMatch || enemyMatch;
    });

    return (
        <div className="delve-page-wrapper">
            {/* A FEJLÉC ÉRINTETLEN MARAD, MINDIG LÁTSZIK */}
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

                {/* Hét száma */}
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

            {/* ITT DŐL EL, HOGY MIT MUTATUNK A KÁRTYÁK HELYÉN */}
            <main className="delve-container">
                {loading ? (
                    // Töltés állapota
                    <div className="no-data-notice">
                        <p style={{ color: "var(--gold)" }}>Fetching live data from Pyrodisc...</p>
                    </div>
                ) : error ? (
                    // Hiba állapota
                    <div className="no-data-notice">
                        <p style={{ color: "#ff4f6a" }}>Error loading data: {error}</p>
                    </div>
                ) : filteredDelves.length === 0 ? (
                    // Nincs találat a keresésre
                    <div className="no-data-notice">
                        <p>No results found for "{searchTerm}". Try a different term!</p>
                    </div>
                ) : (
                    // Sikeres betöltés: Kártyák megjelenítése
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