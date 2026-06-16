import React, { useState, useCallback, useEffect } from 'react';
import './ClubsPage.css';
import xvLogo from './clubs/XV/XV.webp';
import cfgText from './clubs/XV/XV.cfg?raw'; // <── Ezt használjuk fel közvetlenül!

// ─── Club Data ────────────────────────────────────────────────────────────────
const CLUBS = [
  {
    id: 1,
    emblem: xvLogo,
    tier: 'Top',
    tagline: "Trove's Leading Club",
    name: 'XV',
    subtitle: 'Join the elite.',
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
    glow:   'rgba(201,168,76,0.28)',
    glowDim:'rgba(201,168,76,0.07)',
  }
];

const IconChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const IconChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ─── HARDVERESEN GYORSÍTOTT PARTICLE CANVAS (NAGY FELBONTÁSRA OPTIMALIZÁLVA) ───
const ClubParticles = ({ activeColor }) => {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let particles = [];
    const particleCount = 200; // Picit megemeltem, mert a kisebb pöttyökből több mutat jól

    // Canvas méretezése a kijelző pixelsűrűségéhez (HD / Retina / 4K fix)
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1; // Lekérjük a monitor pixelsűrűségét
      const rect = canvas.getBoundingClientRect();
      
      // A belső felbontást megszorozzuk a dpr-rel (Ettől lesz tűéles!)
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // A rajzolási felületet visszaméretezzük a CSS mérethez
      ctx.scale(dpr, dpr);
      
      // Mentjük a logikai méreteket a részecskéknek
      canvas.logicalWidth = rect.width;
      canvas.logicalHeight = rect.height;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Részecskék legenerálása (MÓDOSÍTVA: Szuper pici méretek!)
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.logicalWidth,
        y: Math.random() * canvas.logicalHeight,
        // JAVÍTVA: 1.8 helyett maximum 0.8 pixel átmérő, így mikroszkopikus porszemek lesznek!
        radius: Math.random() * 0.8 + 0.3, 
        speedX: (Math.random() - 0.5) * 0.25, 
        speedY: (Math.random() - 0.5) * 0.35, 
        alpha: Math.random() * 0.4 + 0.1, 
        pulseSpeed: Math.random() * 0.008 + 0.003
      });
    }

    // Animációs ciklus
    const animate = () => {
      // Mindig a logikai méret alapján törlünk
      ctx.clearRect(0, 0, canvas.logicalWidth, canvas.logicalHeight);
      
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        p.alpha += p.pulseSpeed;
        if (p.alpha > 0.5 || p.alpha < 0.1) p.pulseSpeed = -p.pulseSpeed;

        if (p.x < 0) p.x = canvas.logicalWidth;
        if (p.x > canvas.logicalWidth) p.x = 0;
        if (p.y < 0) p.y = canvas.logicalHeight;
        if (p.y > canvas.logicalHeight) p.y = 0;

        ctx.beginTransaction?.() || ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = activeColor;
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
  }, [activeColor]);

  return <canvas ref={canvasRef} className="xvp-particles-canvas" aria-hidden="true" />;
};

export default function ClubsPage() {
  const [current,   setCurrent]   = useState(0);
  const [animPhase, setAnimPhase] = useState('idle');
  const [loading,   setLoading]   = useState(true);

  const [showMembers, setShowMembers] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [membersData, setMembersData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'desc' });
  const [visibleItemsCount, setVisibleItemsCount] = useState(35);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const navigate = useCallback((dir) => {
    if (animPhase !== 'idle') return;

    const exitPhase  = dir === 'right' ? 'exit-left'  : 'exit-right';
    const enterPhase = dir === 'right' ? 'enter-right' : 'enter-left';

    setAnimPhase(exitPhase);

    setTimeout(() => {
      setCurrent(prev =>
        dir === 'right'
          ? (prev + 1) % CLUBS.length
          : (prev - 1 + CLUBS.length) % CLUBS.length
      );
      setAnimPhase(enterPhase);
      setTimeout(() => setAnimPhase('idle'), 580);
    }, 300);
  }, [animPhase]);

  const goTo = useCallback((index) => {
    if (animPhase !== 'idle' || index === current) return;
    navigate(index > current ? 'right' : 'left');
  }, [animPhase, current, navigate]);

  const club = CLUBS[current];
  const cssVars = {
    '--xv-accent':   club.accent,
    '--xv-glow':     club.glow,
    '--xv-glow-dim': club.glowDim,
  };

  const fetchAndParseMembers = () => {
    try {
      if (!cfgText) return;
      
      const lines = cfgText.split('\n');
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

  const rankWeights = {
    'President': 6,
    'VP': 5,
    'Officer': 4,
    'Captain': 3,
    'Enforcer': 2,
    'Member': 1
  };

  const sortedMembers = React.useMemo(() => {
    let sortable = [...membersData];
    sortable.sort((a, b) => {
      if (sortConfig.key === 'pr') {
        return sortConfig.direction === 'asc' ? a.pr - b.pr : b.pr - a.pr;
      }
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
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

const handleCloseMembers = () => {
    setIsClosing(true);
    setTimeout(() => {
      setVisibleItemsCount(35);
      setIsClosing(false);
      setShowMembers(false);
    }, 300);
  };

  return (
    <div className="xvp" style={cssVars}>
      <div className={`xvp-loader-screen ${!loading ? 'xvp-loader--hidden' : ''}`}>
        <div className="xvp-loader-container">
          <span className="xvp-loader-title">LOADING</span>
          <div className="xvp-loader-bar">
            <div className="xvp-loader-progress" />
          </div>
          <span className="xvp-loader-subtitle"></span>
        </div>
      </div>

      <div className="xvp-bg" aria-hidden="true">
        <ClubParticles activeColor={club.accent} />
        <div className="xvp-bg__base" />
        <div className="xvp-bg__orb xvp-bg__orb--a" />
        <div className="xvp-bg__orb xvp-bg__orb--b" />
        <div className="xvp-bg__orb xvp-bg__orb--c" />
        <div className="xvp-bg__grid" />
        <div className="xvp-bg__vignette" />
      </div>

      <button
        className="xvp-arrow xvp-arrow--left"
        onClick={() => navigate('left')}
        aria-label="Previous club"
        disabled={animPhase !== 'idle'}
      >
        <span className="xvp-arrow__circle">
          <IconChevronLeft />
        </span>
      </button>

      <div className="xvp-slider">
        <div className={`xvp-wrap xvp-wrap--${animPhase}`}>

          <article className="xvp-card" role="region" aria-label={`${club.name} club`}>
            <div className="xvp-card__shine" aria-hidden="true" />

            <div className="xvp-card__inner">
              <header className="xvp-header">
                <div className="xvp-emblem" aria-hidden="true">
                  {typeof club.emblem === 'string' && (club.emblem === 'NV' || club.emblem === 'AP') ? (
                    <span className="xvp-emblem__text">{club.emblem}</span>
                  ) : (
                    <img src={club.emblem} alt={`${club.name} logo`} className="xvp-emblem__img" />
                  )}
                  <div className="xvp-emblem__ring xvp-emblem__ring--1" />
                  <div className="xvp-emblem__ring xvp-emblem__ring--2" />
                </div>

                <div className="xvp-title-block">
                  <span className="xvp-tier-badge">{club.tier}</span>
                  <p className="xvp-tagline">{club.tagline}</p>
                  <h1 className="xvp-name">{club.name}</h1>
                  <p className="xvp-subtitle">{club.subtitle}</p>
                </div>
              </header>

              {/* ── Stats Bar ───────────────────────────────────── */}
              <div className="xvp-stats" role="list" aria-label="Club statistics">
                {club.stats.map((s, i) => (
                  <React.Fragment key={s.label}>
                    {i > 0 && <div className="xvp-stats__sep" aria-hidden="true" />}
                    <div className="xvp-stat" role="listitem">
                      <span className="xvp-stat__val">{s.value}</span>
                      <span className="xvp-stat__lbl">{s.label}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {/* ── Description ─────────────────────────────────── */}
              <p className="xvp-desc">{club.description}</p>

              {/* ── Features Grid ───────────────────────────────── */}
              {club.features.length > 0 && (
                <section className="xvp-features" aria-label="Club features">
                  <h2 className="xvp-section-label">Why Join {club.name}?</h2>
                  <div className="xvp-features__grid">
                    {club.features.map((f, i) => (
                      <div
                        className="xvp-feature"
                        key={f.title}
                        style={{ '--fi-delay': `${i * 55}ms` }}
                      >
                        <div className="xvp-feature-inner">
                          <span className="xvp-feature__icon" aria-hidden="true">{f.icon}</span>
                          <div className="xvp-feature__body">
                            <div className="xvp-feature__title">{f.title}</div>
                            <div className="xvp-feature__desc">{f.desc}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ── Requirements + CTA ──────────────────────────── */}
              {!club.comingSoon && club.requirements.length > 0 && (
                <div className="xvp-footer">
                  <div className="xvp-requirements">
                    <h3 className="xvp-section-label">Requirements</h3>
                    <ul className="xvp-req-list" aria-label="Membership requirements">
                      {club.requirements.map(r => (
                        <li key={r} className="xvp-req-item">{r}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="xvp-cta-group">
                    {club.discord && (
                      <a
                        href={`https://${club.discord}`}
                        target="_blank"
                        rel="noreferrer"
                        className="xvp-btn xvp-btn--primary"
                      >
                        Join Club
                      </a>
                    )}
                    <button className="xvp-btn xvp-btn--secondary" onClick={fetchAndParseMembers}>View Members</button>
                  </div>
                </div>
              )}

              {/* Coming Soon CTA */}
              {club.comingSoon && (
                <div className="xvp-coming-soon">
                  <span className="xvp-coming-soon__label">Club under construction</span>
                  <button className="xvp-btn xvp-btn--primary">Notify Me</button>
                </div>
              )}

              {/* ── Quote ───────────────────────────────────────── */}
              {club.quote && (
                <blockquote className="xvp-quote">
                  <span aria-hidden="true" className="xvp-quote__deco">"</span>
                  {club.quote}
                  <span aria-hidden="true" className="xvp-quote__deco">"</span>
                </blockquote>
              )}

              {/* ── Discord Link ─────────────────────────────────── */}
              {club.discord && (
                <div className="xvp-discord">
                  <span className="xvp-discord__label">Discord</span>
                  <a
                    href={`https://${club.discord}`}
                    target="_blank"
                    rel="noreferrer"
                    className="xvp-discord__link"
                  >
                    {club.discord}
                  </a>
                </div>
              )}

            </div>
          </article>

        </div>
      </div>

      {/* ── Right Arrow ────────────────────────────────────────────────── */}
      <button
        className="xvp-arrow xvp-arrow--right"
        onClick={() => navigate('right')}
        aria-label="Next club"
        disabled={animPhase !== 'idle'}
      >
        <span className="xvp-arrow__circle">
          <IconChevronRight />
        </span>
      </button>

      {/* ── Pagination Dots ────────────────────────────────────────────── */}
      <nav className="xvp-pagination" aria-label="Club pagination">
        {CLUBS.map((c, i) => (
          <button
            key={c.id}
            className={`xvp-dot ${i === current ? 'xvp-dot--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to ${c.name}`}
            aria-current={i === current ? 'page' : undefined}
          />
        ))}
      </nav>

      {/* ── MEMBERS MODAL OVERLAY (JAVÍTVA: Duplikáció kiszedve) ── */}
      {showMembers && (
        <div className={`xvp-modal-overlay ${isClosing ? 'xvp-modal--closing' : ''}`} onClick={handleCloseMembers}>
          <div className="xvp-modal-content" onClick={(e) => e.stopPropagation()}>
            
            <button className="xvp-modal-close" onClick={handleCloseMembers}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
              <path d="M18 6L6 18M6 6l12 12" />
              <path d="M12 2a10 10 0 1 0 10 10" strokeDasharray="4 4" opacity="0" />
            </svg>
            </button>
            
            <h2 className="xvp-modal-title">{club.name} <span>Club Members</span> <span className="xvp-modal-update">Stats are updated every week!</span></h2>
            
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