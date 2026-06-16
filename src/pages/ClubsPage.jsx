import React, { useState, useCallback, useEffect } from 'react';
import './ClubsPage.css';
import xvLogo from './clubs/XV/XV.webp';
import arsynLogo from './clubs/Arsyn/arsyn.webp';
import cfgTextXV from './clubs/XV/XV.cfg?raw';

// ─── Teljes Club Adatbázis ───────────────────────────────────────────────────
const CLUBS = [
  {
    id: 1,
    emblem: xvLogo,
    isImage: true,
    tier: 'Top',
    tagline: "Trove's Leading Club",
    name: 'XV',
    subtitle: 'Join the elite.',
    cfgData: cfgTextXV,
    description:
      'XV is a premier endgame club built for dedicated players who want to push their limits, earn greater rewards, and be part of a thriving community. With organized events, experienced members, and constant activity, XV provides everything you need to maximize your progression and enjoy the game at the highest level.',
    stats: [
      { value: '400+', label: 'Club Members' },
      { value: '50K+', label: 'Min. PR' },
      { value: '#1',   label: 'Global Rank' },
    ],
    features: [
      { title: 'Weekly Purple Runs',       desc: 'Conquer challenging content with a skilled, organized team every week.' },
      { title: 'Beacon Events',             desc: 'Regular beacon activities to help members progress faster and earn valuable rewards.' },
      { title: 'Community Giveaways',       desc: 'Exclusive giveaways and special events reserved for our members.' },
      { title: 'D15 Farming Groups',        desc: 'Efficient farming sessions designed to maximize loot and progression.' },
      { title: 'Ship & Club Activities',    desc: 'Coordinated ship hosts and club events throughout the week.' },
      { title: 'Active & Friendly',         desc: 'Passionate players who support each other and play together daily.' },
    ],
    requirements: [
      '50,000+ PR (Power Rank)',
      'Active participation',
      'Team-oriented mindset',
    ],
    discord: 'discord.gg/XVCLUB',
    quote: 'Great players play the game. Legends play together.',
    accent: '#C9A84C',
    glow:   'rgba(201, 168, 76, 0.28)',
    glowDim:'rgba(201, 168, 76, 0.07)',
    comingSoon: false,
  },
  /*{
    id: 2,
    emblem: arsynLogo, 
    isImage: true,
    tier: 'ELITE',
    tagline: 'Among the strong ones.',
    name: 'Arsyn',
    subtitle: 'Strategic gameplay.',
    cfgData: null,
    description: 'Arsyn is among the top tier clubs in Trove, known for its competitive edge and strategic gameplay. With a focus on teamwork and high-level content, Arsyn is the go-to club for players looking to make progress and find good people to play with.',
    stats: [
      { value: '750+', label: 'Club Members' },
      { value: '50K+', label: 'Min. PR' },
      { value: '#2', label: 'Global Rank' },
    ],
    features: [],
    requirements: ['50,000+ PR (Power Rank)', 'Active participation', 'Team-oriented mindset'],
    discord: 'discord.gg/arsyn',
    quote: '',
    accent: '#730dd3',
    glow: 'rgba(115, 13, 211, 0.28)',
    glowDim: 'rgba(115, 13, 211, 0.07)',
    comingSoon: true,
  },
  {
    id: 3,
    emblem: 'AP',
    isImage: false,
    tier: 'ELITE',
    tagline: 'Reach the Summit',
    name: 'APEX',
    subtitle: 'For those who never settle.',
    cfgData: null,
    description: 'APEX is a competitive club currently under construction. Built for players who demand the absolute best in organized play, APEX will set a new benchmark for gaming excellence. More information arriving soon.',
    stats: [
      { value: '—', label: 'Members' },
      { value: '—', label: 'Min. PR' },
      { value: '—', label: 'Global Rank' },
    ],
    features: [],
    requirements: [],
    discord: '',
    quote: '',
    accent: '#C94C4C',
    glow: 'rgba(201, 76, 76, 0.28)',
    glowDim: 'rgba(201, 76, 76, 0.07)',
    comingSoon: true,
  }*/
];

const IconBackArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const ClubParticles = ({ activeColor }) => {
  const canvasRef = React.useRef(null);
  const currentColorRef = React.useRef({ r: 0, g: 210, b: 255 }); 
  const targetColorRef = React.useRef(activeColor);

  useEffect(() => {
    targetColorRef.current = activeColor;
  }, [activeColor]);

  const parseToRGB = (colorStr) => {
    if (!colorStr) return { r: 0, g: 210, b: 255 };
    if (colorStr.startsWith('#')) {
      let c = colorStr.substring(1);
      if (c.length === 3) c = c.split('').map(x => x + x).join('');
      const num = parseInt(c, 16);
      return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
    }
    if (colorStr.startsWith('rgb')) {
      const match = colorStr.match(/\d+/g);
      if (match && match.length >= 3) {
        return { r: parseInt(match[0]), g: parseInt(match[1]), b: parseInt(match[2]) };
      }
    }
    return { r: 0, g: 210, b: 255 };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let particles = [];
    const particleCount = 200;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.logicalWidth = rect.width;
      canvas.logicalHeight = rect.height;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.logicalWidth,
        y: Math.random() * canvas.logicalHeight,
        radius: Math.random() * 0.8 + 0.3, 
        speedX: (Math.random() - 0.5) * 0.25, 
        speedY: (Math.random() - 0.5) * 0.35, 
        alpha: Math.random() * 0.4 + 0.1, 
        pulseSpeed: Math.random() * 0.008 + 0.003
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.logicalWidth, canvas.logicalHeight);
      
      const targetRGB = parseToRGB(targetColorRef.current);
      const curRGB = currentColorRef.current;
      
      curRGB.r += (targetRGB.r - curRGB.r) * 0.05; 
      curRGB.g += (targetRGB.g - curRGB.g) * 0.05;
      curRGB.b += (targetRGB.b - curRGB.b) * 0.05;
      
      const particleColorStyle = `rgb(${Math.round(curRGB.r)}, ${Math.round(curRGB.g)}, ${Math.round(curRGB.b)})`;

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += p.pulseSpeed;
        if (p.alpha > 0.5 || p.alpha < 0.1) p.pulseSpeed = -p.pulseSpeed;

        if (p.x < 0) p.x = canvas.logicalWidth;
        if (p.x > canvas.logicalWidth) p.x = 0;
        if (p.y < 0) p.y = canvas.logicalHeight;
        if (p.y > canvas.logicalHeight) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColorStyle;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="xvp-particles-canvas" aria-hidden="true" />;
};

export default function ClubsPage() {
  const [loading, setLoading] = useState(true);
  const [activeClub, setActiveClub] = useState(null);
  const [hoveredClub, setHoveredClub] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const [showMembers, setShowMembers] = useState(false);
  const [isClosingModal, setIsClosingModal] = useState(false);
  const [membersData, setMembersData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'desc' });
  const [visibleItemsCount, setVisibleItemsCount] = useState(35);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectClub = (club) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveClub(club);
      setIsTransitioning(false);
    }, 400);
  };

  const handleBackToDashboard = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveClub(null);
      setHoveredClub(null);
      setIsTransitioning(false);
    }, 400);
  };

  const fetchAndParseMembers = () => {
    if (!activeClub || !activeClub.cfgData) {
      console.warn("Nincs CFG adat ehhez a klubhoz!");
      return;
    }
    try {
      const lines = activeClub.cfgData.split('\n');
      const parsedMembers = [];
      lines.forEach(line => {
        if (line.includes('=')) {
          const parts = line.split('=')[1].trim().split('-');
          if (parts.length >= 3) {
            parsedMembers.push({
              name: parts[0],
              rank: parts[1],
              pr: parseInt(parts[2], 10)
            });
          }
        }
      });
      setMembersData(parsedMembers);
      setShowMembers(true);
    } catch (error) {
      console.error("Nem sikerült feldolgozni a tagokat:", error);
    }
  };

  const rankWeights = { 'President': 6, 'VP': 5, 'Officer': 4, 'Captain': 3, 'Enforcer': 2, 'Member': 1 };

  const sortedMembers = React.useMemo(() => {
    let sortable = [...membersData];
    sortable.sort((a, b) => {
      if (sortConfig.key === 'pr') return sortConfig.direction === 'asc' ? a.pr - b.pr : b.pr - a.pr;
      if (sortConfig.key === 'rank') {
        const weightA = rankWeights[a.rank] || 0;
        const weightB = rankWeights[b.rank] || 0;
        return sortConfig.direction === 'asc' ? weightA - weightB : weightB - weightA;
      }
      if (sortConfig.key === 'name') {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      }
      return 0;
    });
    return sortable.slice(0, visibleItemsCount);
  }, [membersData, sortConfig, visibleItemsCount]);

  const handleTableScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 20) {
      setVisibleItemsCount(prev => Math.min(prev + 35, membersData.length));
    }
  };

  const requestSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') direction = 'asc';
    setSortConfig({ key, direction });
  };

  const handleCloseMembers = () => {
    setIsClosingModal(true);
    setTimeout(() => {
      setVisibleItemsCount(35);
      setIsClosingModal(false);
      setShowMembers(false);
    }, 300);
  };

  const currentAccent = activeClub ? activeClub.accent : (hoveredClub ? hoveredClub.accent : '#00d2ff');
  const currentGlow = activeClub ? activeClub.glow : (hoveredClub ? hoveredClub.glow : 'rgba(0, 210, 255, 0.28)');
  const currentGlowDim = activeClub ? activeClub.glowDim : (hoveredClub ? hoveredClub.glowDim : 'rgba(0, 210, 255, 0.07)');

  const cssVars = {
    '--xv-accent': currentAccent,
    '--xv-glow': currentGlow,
    '--xv-glow-dim': currentGlowDim,
  };

  return (
    <div className="xvp" style={cssVars}>
      
      {/* Betöltő képernyő */}
      <div className={`xvp-loader-screen ${!loading ? 'xvp-loader--hidden' : ''}`}>
        <div className="xvp-loader-container">
          <span className="xvp-loader-title">LOADING</span>
          <div className="xvp-loader-bar"><div className="xvp-loader-progress" /></div>
        </div>
      </div>

      <div className="xvp-bg" aria-hidden="true">
        <ClubParticles activeColor={currentAccent} />
        <div className="xvp-bg__base" />
        {activeClub && <div className="xvp-bg__top-veil" />}
        <div className="xvp-bg__orb xvp-bg__orb--a" />
        <div className="xvp-bg__orb xvp-bg__orb--b" />
        <div className="xvp-bg__orb xvp-bg__orb--c" />
        <div className="xvp-bg__grid" />
        <div className="xvp-bg__vignette" />
      </div>

      {/* ── ALAPÁLLAPOT: Dashboard ── */}
      {!activeClub && (
        <div className={`xvp-dashboard ${isTransitioning ? 'xvp-dashboard--exiting' : 'xvp-dashboard--entering'}`}>
          <h1 className="xvp-dashboard-title">Select a Community</h1>
          <div className="xvp-dashboard-grid">
            {CLUBS.map((c) => (
              <button 
                key={c.id} 
                className="xvp-dash-club"
                style={{ '--dash-accent': c.accent, '--dash-glow': c.glow }}
                onClick={() => handleSelectClub(c)}
                onMouseEnter={() => setHoveredClub(c)}
                onMouseLeave={() => setHoveredClub(null)}
              >
                <div className="xvp-dash-emblem">
                  {c.isImage ? (
                    <img src={c.emblem} alt={c.name} className="xvp-dash-emblem__img" />
                  ) : (
                    <span className="xvp-dash-emblem__text">{c.emblem}</span>
                  )}
                  <div className="xvp-dash-ring"></div>
                </div>
                <span className="xvp-dash-name">{c.name}</span>
                {c.comingSoon && <span className="xvp-dash-badge">SOON</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── RÉSZLETES ÁLLAPOT: Teljes oldalas nézet ── */}
      {activeClub && (
        <div className={`xvp-details-view ${isTransitioning ? 'xvp-details--exiting' : 'xvp-details--entering'}`}>
          
          <button className="xvp-back-btn" onClick={handleBackToDashboard}>
            <span className="xvp-back-btn__icon"><IconBackArrow /></span>
            Back to Clubs
          </button>

          <div className="xvp-fp-scroll-area">
            <div className="xvp-fp-container">
              
              <header className="xvp-fp-hero">
                <div className="xvp-fp-emblem" aria-hidden="true">
                  {activeClub.isImage ? (
                    <img src={activeClub.emblem} alt={`${activeClub.name} logo`} className="xvp-fp-emblem__img" />
                  ) : (
                    <span className="xvp-fp-emblem__text">{activeClub.emblem}</span>
                  )}
                  <div className="xvp-fp-emblem__ring xvp-fp-emblem__ring--1" />
                  <div className="xvp-fp-emblem__ring xvp-fp-emblem__ring--2" />
                </div>

                <div className="xvp-fp-title-block">
                  <div className="xvp-fp-tags">
                    <span className="xvp-tier-badge">{activeClub.tier}</span>
                    <span className="xvp-tagline">{activeClub.tagline}</span>
                  </div>
                  <h1 className="xvp-fp-name">{activeClub.name}</h1>
                  <p className="xvp-fp-subtitle">{activeClub.subtitle}</p>
                </div>
              </header>

              <div className="xvp-fp-stats">
                {activeClub.stats.map((s, i) => (
                  <React.Fragment key={s.label}>
                    {i > 0 && <div className="xvp-fp-stats__sep" aria-hidden="true" />}
                    <div className="xvp-fp-stat">
                      <span className="xvp-fp-stat__val">{s.value}</span>
                      <span className="xvp-fp-stat__lbl">{s.label}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              <div className="xvp-fp-content">
                <main className="xvp-fp-main">
                  <h2 className="xvp-fp-section-title">About the Club</h2>
                  <p className="xvp-fp-desc">{activeClub.description}</p>

                  {activeClub.features.length > 0 && (
                    <section className="xvp-fp-features">
                      <h2 className="xvp-fp-section-title">Why Join {activeClub.name}?</h2>
                      <div className="xvp-fp-features__grid">
                        {activeClub.features.map((f, i) => (
                          <div className="xvp-fp-feature" key={f.title} style={{ '--fi-delay': `${i * 55}ms` }}>
                            <div className="xvp-fp-feature-inner">
                              <span className="xvp-fp-feature__icon" aria-hidden="true">{f.icon}</span>
                              <div className="xvp-fp-feature__body">
                                <div className="xvp-fp-feature__title">{f.title}</div>
                                <div className="xvp-fp-feature__desc">{f.desc}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </main>

                <aside className="xvp-fp-sidebar">
                  <div className="xvp-fp-sidebar-card">
                    {activeClub.comingSoon ? (
                      <div className="xvp-coming-soon">
                        <span className="xvp-coming-soon__label">Club under construction</span>
                        <button className="xvp-btn xvp-btn--primary xvp-btn--full">Notify Me</button>
                      </div>
                    ) : (
                      <>
                        {activeClub.requirements.length > 0 && (
                          <div className="xvp-fp-requirements">
                            <h3 className="xvp-fp-sidebar-title">Requirements</h3>
                            <ul className="xvp-fp-req-list">
                              {activeClub.requirements.map(r => <li key={r} className="xvp-fp-req-item">{r}</li>)}
                            </ul>
                          </div>
                        )}
                        
                        <div className="xvp-fp-actions">
                          {activeClub.discord && (
                            <a href={`https://${activeClub.discord}`} target="_blank" rel="noreferrer" className="xvp-btn xvp-btn--primary xvp-btn--full">
                              Join {activeClub.name}
                            </a>
                          )}
                          {activeClub.cfgData && (
                            <button className="xvp-btn xvp-btn--secondary xvp-btn--full" onClick={fetchAndParseMembers}>
                              View Members
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </aside>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ── MEMBERS MODAL OVERLAY ── */}
      {showMembers && (
        <div className={`xvp-modal-overlay ${isClosingModal ? 'xvp-modal--closing' : ''}`} onClick={handleCloseMembers}>
          <div className="xvp-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="xvp-modal-close" onClick={handleCloseMembers}><IconClose /></button>
            <h2 className="xvp-modal-title">{activeClub.name} <span>Club Members</span> <span className="xvp-modal-update">Stats are updated every week!</span></h2>
            
            <div className="xvp-table-wrapper" onScroll={handleTableScroll}>
              <table className="xvp-members-table">
                <thead>
                  <tr>
                    <th onClick={() => requestSort('name')} className={sortConfig.key === 'name' ? 'active-sort' : ''}>Player Name</th>
                    <th onClick={() => requestSort('rank')} className={sortConfig.key === 'rank' ? 'active-sort' : ''}>Club Rank</th>
                    <th onClick={() => requestSort('pr')} className={sortConfig.key === 'pr' ? 'active-sort' : ''}>Power Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedMembers.map((member, index) => (
                    <tr key={index}>
                      <td className="member-name">{member.name}</td>
                      <td className={`member-rank rank-${member.rank.toLowerCase()}`}>{member.rank}</td>
                      <td className="member-pr">{member.pr.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}