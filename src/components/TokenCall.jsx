import { useEffect, useMemo, useRef, useState } from 'react';
import './TokenCall.css';

const REFRESH_INTERVAL_MS = 30_000;

const NAV_SECTIONS = [
  { id: 'buffs', label: "Today's Buffs", icon: '✦' },
  { id: 'chaos', label: 'Chaos Chest', icon: '◆' },
  { id: 'biomes', label: 'Biomes', icon: '❖' },
  { id: 'records', label: 'Leaderboard Records', icon: '☰' },
  { id: 'player', label: 'Player Lookup', icon: '⌕' },
];

const DAILY_BUFF_ICONS = [
  '/icons/pickaxe.png',                 
  '/icons/fish.png',                   
  '/icons/sparkling-diamond.png',       
  '/icons/quest.png',                 
  '/icons/dragon.png',                  
  '/icons/xp.png',                      
  '/icons/lootbag.png'                  
];

const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function formatClock(unixSeconds) {
  if (!Number.isFinite(unixSeconds)) return '--:--:--';
  const d = new Date(unixSeconds * 1000);
  return d.toISOString().slice(11, 19);
}

function formatDuration(seconds) {
  if (!Number.isFinite(seconds)) return '--';
  const s = Math.max(0, Math.floor(seconds));
  
  const d = Math.floor(s / (3600 * 24));
  const h = Math.floor((s % (3600 * 24)) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;

  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${sec}s`;
  return `${sec}s`;
}

function formatCountdown(targetUnix, nowUnix) {
  if (!Number.isFinite(targetUnix) || !Number.isFinite(nowUnix)) return null;
  return formatDuration(targetUnix - nowUnix);
}

function StatusBadge({ state, label, customClass }) {
  if (state === 'error') return <span className="td-badge error">Unavailable</span>;
  if (state === 'loading') return <span className="td-badge muted">Loading</span>;
  if (label) {
    return <span className={`td-badge ${customClass || 'live'}`}>{label}</span>;
  }
  return null;
}

function getBiomeImageUrl(biome) {
  if (!biome) return null;
  const rawUrl = biome.icon || biome.image_url || biome.banner;
  if (rawUrl && typeof rawUrl === 'string' && rawUrl.startsWith('http')) {
    return rawUrl;
  }

  const rawName = biome.final_name || biome.name || biome.id || '';
  if (!rawName) return null;

  const nameLower = rawName.toLowerCase();
  const BASE_PATH = 'https://trove.aallyn.net/static/assets/biomes/';

  if (nameLower.includes('candoria') || nameLower.includes('candy')) return `${BASE_PATH}candy.png`;
  if (nameLower.includes('dinosaur') || nameLower.includes('jungle')) return `${BASE_PATH}dinosaur.png`;
  if (nameLower.includes('dragon') || nameLower.includes('volcano')) return `${BASE_PATH}dragon.png`;
  if (nameLower.includes('dunes')) return `${BASE_PATH}dunes.png`;
  if (nameLower.includes('fae') || nameLower.includes('wilds')) return `${BASE_PATH}fae.png`;
  if (nameLower.includes('forest') || nameLower.includes('medieval')) return `${BASE_PATH}forest.png`;
  if (nameLower.includes('desert') || nameLower.includes('frontier')) return `${BASE_PATH}frontier.png`;
  if (nameLower.includes('giant') || nameLower.includes('giantland')) return `${BASE_PATH}giantland.png`;
  if (nameLower.includes('shade') || nameLower.includes('long_shade') || nameLower.includes('long shade')) return `${BASE_PATH}long_shade.png`;
  if (nameLower.includes('neon') || nameLower.includes('city')) return `${BASE_PATH}neon.png`;
  if (nameLower.includes('peaceful') || nameLower.includes('hills')) return `${BASE_PATH}peaceful.png`;
  if (nameLower.includes('pirate') || nameLower.includes('isles') || nameLower.includes('treasure') || nameLower.includes('lost')) return `${BASE_PATH}pirate.png`;
  if (nameLower.includes('sandsea') || nameLower.includes('sea')) return `${BASE_PATH}sandsea.png`;
  if (nameLower.includes('spire') || nameLower.includes('forbidden')) return `${BASE_PATH}spires.png`;
  if (nameLower.includes('tundra') || nameLower.includes('permafrost')) return `${BASE_PATH}tundra.png`;
  if (nameLower.includes('undead') || nameLower.includes('cursed') || nameLower.includes('vale')) return `${BASE_PATH}undead.png`;
  if (nameLower.includes('wasteland') || nameLower.includes('weathered')) return `${BASE_PATH}wasteland.png`;

  return null;
}

/* --- Luxion / Trials of Luxion Tracker Komponens (2 oszlopos, háttérképpel) --- */
function LuxionTracker({ luxion, serverTime, nowTick }) {
  const isActive = luxion?.active;
  const secondsRemaining = luxion?.seconds_remaining ?? 0;
  const targetTime = serverTime?.now_unix && secondsRemaining > 0 
    ? serverTime.now_unix + secondsRemaining 
    : null;

  return (
    <section id="luxion-tracker" className="td-card span-2 glow-amber td-luxion-card-bg">
      {/* Sötét overlay a háttérkép felett */}
      <div className="td-luxion-overlay" />

      <div className="td-luxion-content">
        <div className="td-card-header">
          <div className="td-card-title">
            <span className="td-title-mark" style={{ background: '#f59e0b', boxShadow: '0 0 12px 2px rgba(245, 158, 11, 0.5)' }}></span>
            <span style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '1.25rem', marginLeft: '4px', fontFamily: 'Comfortaa, sans-serif' }}>
              Trials of Luxion
            </span>
          </div>
          <StatusBadge 
            state={luxion ? 'ok' : 'loading'} 
            label={isActive ? 'ACTIVE IN HUB' : 'AWAY'} 
            customClass={isActive ? 'badge-amber' : 'muted'} 
          />
        </div>

        <div className="td-luxion-body">
          <div className="td-luxion-hero-card">
            <div className="td-luxion-status-info td-luxion-scroll-content">
              
              {/* Overview Section */}
              <div className="td-luxion-section">
                <h4 className="td-luxion-subtitle">The Trials of Luxion: Overview</h4>
                <p className="td-luxion-desc">
                  The powerful dragon Luxion has left the Hub to reclaim his realm, inviting only the bravest Trovians to test their strength in a recurring, month-long event: <strong>The Trials of Luxion</strong>. Active for one week each month, this deadly new gameplay mode challenges players to collect <strong>Venturine</strong>—a temporary currency used to craft exclusive rewards from Luxion’s hoard—while facing strict limitations, suppressed combat stats, and a penalty of lost Venturine upon death.
                </p>
              </div>

              {/* Getting Started Section */}
              <div className="td-luxion-section">
                <h4 className="td-luxion-subtitle">Getting Started &amp; Entering the Realm</h4>
                <p className="td-luxion-desc">
                  To join, eligible Trovians must use the portal in <strong>Light’s Den</strong> within the Hub. Access requires crafting a <strong>Luxion’s Pact</strong> at the Luxion’s Pact Register using an <em>Unfortunate Soul</em>, which can be crafted (with daily escalating Flux costs) or bought via Credits and Cubits from <em>Soul-Reckoner Suri</em>. New players can follow the dedicated questline in their Adventures UI (default PC key: <code>I</code>) to get started.
                </p>
              </div>

              {/* Progression Section */}
              <div className="td-luxion-section">
                <h4 className="td-luxion-subtitle">Trial Progression &amp; Scaling Difficulty</h4>
                <p className="td-luxion-desc">
                  Inside <strong>The Venture Capitol</strong>, players encounter Lord Primalux, who offers three sequential quest lines to defeat enemies in the Inner, Middle, and Outer rings. Upon completion, players can choose their path:
                </p>
                <ul className="td-luxion-list">
                  <li><strong>Complete the Trials:</strong> Satisfies the Pact for a massive Venturine payout and exits the instance after 10 seconds.</li>
                  <li><strong>Progress the Trials:</strong> Gives no instant reward, but upgrades the Pact to the next difficulty rank (ranging from Moonless Dark 10 to Long Shade 15), increasing future rewards.</li>
                </ul>
              </div>

              {/* Rewards & Mechanics Section */}
              <div className="td-luxion-section">
                <h4 className="td-luxion-subtitle">Rewards, Mechanics &amp; Risks</h4>
                <p className="td-luxion-desc">
                  Players can use the <strong>Venturine Forge</strong> to convert currency into <strong>Venturine Signets</strong> to unlock Luxion’s cycling hoard of collectibles. Players can also obtain temporary <em>Luxion’s Favor</em> buffs by Loot Collecting Unfortunate Souls, or test their luck at <em>Luxion’s Long Shots</em> by donating items for extra Venturine and rare Stashes.
                </p>
              </div>

              {/* Important Notes Section */}
              <div className="td-luxion-section td-luxion-alert-box">
                <h4 className="td-luxion-subtitle alert-title">⚠️ Important Notes</h4>
                <ul className="td-luxion-list">
                  <li><strong>Rules of the Realm:</strong> Jump and Movement Speed are capped, Build Mode and block destruction are disabled, and social features (joining or inviting) are unavailable.</li>
                  <li><strong>Use It or Lose It:</strong> Death deducts Venturine from your inventory. Furthermore, all Venturine, Signets, and Stashes <strong>disappear when the event ends</strong>, so be sure to spend and open everything before time runs out!</li>
                </ul>
              </div>

            </div>
          </div>

          <div className="td-luxion-timer-box">
            <div className="td-luxion-timer-label">
              {isActive ? 'Leaves the Hub in' : 'Next arrival'}
            </div>
            <div className="td-luxion-timer-value">
              {isActive 
                ? (targetTime ? (formatCountdown(targetTime, nowTick) ?? formatDuration(secondsRemaining)) : formatDuration(secondsRemaining))
                : (secondsRemaining > 0 ? formatDuration(secondsRemaining) : 'Schedule TBA')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Trove News Dashboard Komponens (9 hír + görgethető) --- */
function DashboardNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch('https://mystic-cave.com/api/v1/news')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!cancelled && json && json.data) {
          setNews(json.data);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <section id="td-news" className="td-card span-2">
      <div className="td-card-header">
        <div className="td-card-title">
          <span className="td-title-mark" style={{ background: '#e8b84b', boxShadow: '0 0 12px 2px rgba(232, 184, 75, 0.4)' }}></span>
          <span style={{ color: '#e8b84b', fontWeight: 'bold', fontSize: '1.2rem', marginLeft: '4px', fontFamily: 'Comfortaa, sans-serif' }}>Trove News</span>
        </div>
        <StatusBadge state={loading ? 'loading' : error ? 'error' : 'ok'} label="Updates" customClass="badge-amber" />
      </div>

      {loading ? (
        <div className="td-news-loader">
          <div className="spin">⟳</div> Loading latest news...
        </div>
      ) : error ? (
        <div className="td-empty" style={{ color: '#f87171' }}>Could not load news articles.</div>
      ) : (
        <div className="td-news-scroll-container">
          <div className="td-news-grid">
            {news.slice(0, 9).map((item, index) => {
              const title = item.title || "Trove Update";
              const excerpt = item.excerpt || "";
              const link = item.url || "https://mystic-cave.com/";
              const imageUrl = item.image || '/guideimages/default-news.webp';
              
              const pubDate = item.date ? new Date(item.date).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
              }) : 'Recent';

              return (
                <a 
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="td-news-card" 
                  key={item.id || index}
                >
                  <div className="td-news-card-image">
                    <img 
                      src={imageUrl} 
                      alt={title} 
                      loading="lazy" 
                      onError={(e) => { e.target.src = '/guideimages/default-news.webp'; }} 
                    />
                  </div>
                  <div className="td-news-card-content">
                    <span className="td-news-date">{pubDate}</span>
                    <h4 className="td-news-title">{title}</h4>
                    <p className="td-news-excerpt">{excerpt}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

export default function TokenCall() {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialOverlay, setInitialOverlay] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [clockOffsetSeconds, setClockOffsetSeconds] = useState(0);
  const [nowTick, setNowTick] = useState(() => Math.floor(Date.now() / 1000));
  const [activeSection, setActiveSection] = useState(NAV_SECTIONS[0].id);
  const [searchValue, setSearchValue] = useState('');
  const [playerQuery, setPlayerQuery] = useState('');

  const sectionRefs = useRef({});

  async function loadData(forPlayer) {
    const startTime = Date.now();
    try {
      const url = forPlayer
        ? `/api/player?player=${encodeURIComponent(forPlayer)}`
        : '/api/player';
      
      const [res, weeklyRes] = await Promise.allSettled([
        fetch(url).then((r) => r.json()),
        fetch('https://trove.aallyn.net/static/assets/data/weekly_buffs.json').then((r) => r.json()),
      ]);

      let mainJson = res.status === 'fulfilled' ? res.value : null;
      let staticWeekly = weeklyRes.status === 'fulfilled' ? weeklyRes.value : null;

      if (!mainJson || mainJson.error) {
        throw new Error(mainJson?.error?.message || 'Request failed');
      }

      if (!mainJson.data) mainJson.data = {};

      if (staticWeekly) {
        mainJson.data.weeklyBuffsStatic = staticWeekly;
      }

      setPayload(mainJson);
      setFetchError(null);

      const serverNow = mainJson?.data?.serverTime?.now_unix;
      if (Number.isFinite(serverNow)) {
        setClockOffsetSeconds(serverNow - Math.floor(Date.now() / 1000));
      }
    } catch (err) {
      setFetchError(err?.message || 'Could not reach the dashboard API.');
    } finally {
      setLoading(false);
      
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 500 - elapsedTime);

      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setInitialOverlay(false), 400);
      }, remainingTime);
    }
  }

  useEffect(() => {
    loadData(playerQuery);
    const interval = setInterval(() => loadData(playerQuery), REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [playerQuery]);

  useEffect(() => {
    const tick = setInterval(() => {
      setNowTick(Math.floor(Date.now() / 1000) + clockOffsetSeconds);
    }, 1000);
    return () => clearInterval(tick);
  }, [clockOffsetSeconds]);

  const data = payload?.data ?? null;
  const errors = payload?.errors ?? null;

  function sectionState(key) {
    if (!payload) return 'loading';
    if (errors?.[key]) return 'error';
    if (data?.[key]) return 'ok';
    return 'loading';
  }

  const serverTime = data?.serverTime;
  const dailyBuffs = data?.dailyBuffs;
  const chaosChest = data?.chaosChest;
  const biomes = data?.biomes;
  const records = data?.leaderboardRecords;
  const weeklyBuffs = data?.weeklyBuffsStatic || data?.weeklyBuffs;
  const corruxion = data?.corruxion;
  const fluxion = data?.fluxion;
  const playerActivity = data?.playerActivity;
  const luxion = data?.luxion;

  const todayWeekday = useMemo(() => {
    if (!Number.isFinite(serverTime?.trove_day)) return null;
    return ((serverTime.trove_day % 7) + 7) % 7;
  }, [serverTime]);

  function handleNavClick(id) {
    setActiveSection(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    const trimmed = searchValue.trim();
    if (!trimmed) return;
    setLoading(true);
    setPlayerQuery(trimmed);
    handleNavClick('player');
  }

  return (
    <div className="trove-dashboard">
      {initialOverlay && (
        <div className={`td-initial-loader ${fadeOut ? 'fade-out' : ''}`}>
          <div className="td-loader-spinner" />
          <div className="td-loader-text">Loading Trove Dashboard...</div>
        </div>
      )}

      <header className="td-header">
        <div className="td-title">
          <span className="td-title-mark" />
          Trove Live Dashboard
          <span className="td-title-sub">rotations &amp; leaderboards</span>
        </div>

        <form className="td-search" onSubmit={handleSearchSubmit}>
          <span className="td-search-icon">⌕</span>
          <input
            type="text"
            placeholder="Look up a player by name…"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button 
            type="submit" 
            className="td-search-submit-btn" 
            disabled={!searchValue.trim()}
          >
            Search
          </button>
        </form>

        <div className="td-header-actions">
          <button
            type="button"
            className="td-refresh-btn"
            onClick={() => {
              setLoading(true);
              loadData(playerQuery);
            }}
          >
            <span className={loading ? 'spin' : ''}>⟳</span>
            Refresh
          </button>
        </div>
      </header>

      <div className="td-body">
        <aside className="td-sidebar">
          <div className="td-clock-card">
            <div className="td-clock-label">Server Time (UTC)</div>
            <div className="td-clock-time">{formatClock(nowTick)}</div>
            {todayWeekday !== null && (
              <div className="td-clock-day">
                {WEEKDAY_LABELS[todayWeekday] ?? '—'} · Trove Day {serverTime?.trove_day}
              </div>
            )}
            <div className="td-clock-resets">
              <div className="td-reset-row">
                <span>Daily reset in</span>
                <span>{formatCountdown(serverTime?.daily_reset_at, nowTick) ?? '--'}</span>
              </div>
              <div className="td-reset-row">
                <span>Weekly reset in</span>
                <span>{formatCountdown(serverTime?.weekly_reset_at, nowTick) ?? '--'}</span>
              </div>
            </div>
          </div>

          <div className="td-sidebar-card glow-green">
            <div className="td-card-header">
              <div className="td-card-title">
                <span className="td-card-icon" style={{ color: '#4ade80' }}>●</span> Active Players
              </div>
              <StatusBadge state={playerActivity ? 'ok' : 'loading'} label="LIVE" customClass="badge-green" />
            </div>

            <div className="td-activity-content">
              <div className="td-activity-count">
                {(() => {
                  const J = playerActivity;
                  if (!J) return "--";
                  if (J.series && Array.isArray(J.series) && J.series.length > 0) {   
                    const G = J.series[J.series.length - 1];
                    const val = G?.active_players ?? G?.count;
                    return Number.isFinite(val) ? Math.round(val).toLocaleString() : "--";
                  }
                  if (Array.isArray(J) && J.length > 0) {                             
                    const G = J[J.length - 1];
                    const val = G?.active_players ?? G?.count;
                    return Number.isFinite(val) ? Math.round(val).toLocaleString() : "--";
                  }
                  if (Number.isFinite(J.latest)) {
                    return Math.round(J.latest).toLocaleString();
                  }
                  if (Array.isArray(J.points) && J.points.length > 0) {
                    const last = J.points[J.points.length - 1];
                    const val = last?.active ?? last?.active_players;
                    return Number.isFinite(val) ? Math.round(val).toLocaleString() : "--";
                  }
                  if (typeof J === "object") {
                    const val = J.active_players ?? J.count;
                    return Number.isFinite(val) ? Math.round(val).toLocaleString() : (val ?? "--");
                  }
                  return "--";
                })()}
              </div>
              <div className="td-activity-sub">players online right now</div>
            </div>
          </div>

          <div className="td-sidebar-card glow-blue">
            <div className="td-card-header">
              <div className="td-card-title">
                <span className="td-card-icon">◆</span> Chaos Mega-Core
              </div>
              <StatusBadge 
                state={sectionState('chaosChest')} 
                label={chaosChest?.active ? 'Active' : 'Live'} 
                customClass="badge-blue" 
              />
            </div>

            {chaosChest?.item ? (
              <div className="td-sidebar-chaos">
                <div className="td-chaos-hero">
                  <div className="td-chaos-icon">
                    {chaosChest.item?.image_url && chaosChest.item.image_url.trim() !== '' ? (
                      <img 
                        src={chaosChest.item.image_url} 
                        alt={chaosChest.item?.name || 'Chaos Item'} 
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          if (e.target.parentNode) e.target.parentNode.innerText = '◆';
                        }}
                      />
                    ) : (
                      '◆'
                    )}
                  </div>
                  <div>
                    <div className="td-chaos-name">{chaosChest.item?.name ?? 'Mystery item'}</div>
                    {chaosChest.item?.blueprint && (
                      <div className="td-chaos-blueprint">{chaosChest.item.blueprint}</div>
                    )}
                  </div>
                </div>

                <div className="td-sidebar-chaos-time">
                  <div className="td-countdown">
                    {formatCountdown(
                      serverTime?.now_unix + (chaosChest?.seconds_remaining ?? 0),
                      nowTick
                    ) ?? formatDuration(chaosChest?.seconds_remaining)}
                  </div>
                  <div className="td-countdown-label">until reset</div>
                </div>
              </div>
            ) : (
              <div className="td-empty">No Chaos Chest data.</div>
            )}
          </div>

          <div className="td-sidebar-card glow-purple">
            <div className="td-card-header">
              <div className="td-card-title">
                <span className="td-card-icon" style={{ color: '#c084fc' }}>✦</span> Corruxion
              </div>
              <StatusBadge 
                state={sectionState('corruxion')} 
                label={corruxion?.active ? 'Active' : 'Away'} 
                customClass={corruxion?.active ? 'badge-purple' : 'muted'} 
              />
            </div>

            {corruxion ? (
              <div className="td-sidebar-chaos">
                <div className="td-sidebar-chaos-time">
                  <div className="td-countdown" style={{ color: '#c084fc' }}>
                    {formatCountdown(
                      serverTime?.now_unix + (corruxion?.seconds_remaining ?? 0),
                      nowTick
                    ) ?? formatDuration(corruxion?.seconds_remaining)}
                  </div>
                  <div className="td-countdown-label">
                    {corruxion.active ? 'leaves in' : 'arrives in'}
                  </div>
                </div>
              </div>
            ) : (
              <div className="td-empty">No Corruxion data.</div>
            )}
          </div>

          <div className="td-sidebar-card glow-amber">
            <div className="td-card-header">
              <div className="td-card-title">
                <span className="td-card-icon" style={{ color: '#f59e0b' }}>◈</span> Fluxion
              </div>
              <StatusBadge 
                state={sectionState('fluxion')} 
                label={
                  fluxion?.state 
                    ? fluxion.state 
                    : fluxion?.active 
                      ? 'Active' 
                      : 'Voting'
                } 
                customClass="badge-amber" 
              />
            </div>

            {fluxion ? (
              <div className="td-sidebar-chaos">
                <div className="td-sidebar-chaos-time">
                  <div className="td-countdown" style={{ color: '#f59e0b' }}>
                    {formatCountdown(
                      serverTime?.now_unix + (fluxion?.seconds_remaining ?? 0),
                      nowTick
                    ) ?? formatDuration(fluxion?.seconds_remaining)}
                  </div>
                  <div className="td-countdown-label">
                    {fluxion.active ? 'window closes in' : 'next window in'}
                  </div>
                </div>
              </div>
            ) : (
              <div className="td-empty">No Fluxion data.</div>
            )}
          </div>

          <div className="td-sidebar-footer">
            Data via the Kiwi API (aallyn.net). Auto-refreshes every 30s.
          </div>
        </aside>

        <main className="td-main">
          {fetchError && (
            <div className="td-status-banner">
              ⚠ {fetchError} — showing the last data we had, if any.
            </div>
          )}

          <div className="td-grid">
            <section
              id="buffs"
              className="td-card"
              ref={(el) => (sectionRefs.current.buffs = el)}
            >
              <div className="td-card-header">
                <div className="td-card-title">
                  <img 
                    src="/icons/power.png" 
                    alt="Today's Buffs" 
                    className="td-card-title-icon" 
                  />
                  Today's Buffs
                </div>
                <StatusBadge state={sectionState('dailyBuffs')} label="Live" />
              </div>

              {dailyBuffs?.current ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="td-buff-hero" style={{ padding: '12px', background: 'var(--card-alt)', borderRadius: 'var(--radius-md)' }}>
                    
                    {/* --- ÚJ IKON RÉSZLET (Hétfőtől Vasárnapig dinamikusan) --- */}
                    <div className="td-buff-icon-wrapper" style={{ width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <img 
                        src={todayWeekday !== null && todayWeekday !== undefined 
                          ? DAILY_BUFF_ICONS[todayWeekday] 
                          : '/icons/power.png'} 
                        alt={dailyBuffs.current?.name ?? 'Daily Buff'} 
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        onError={(e) => {
                          // Ha nem találja a fájlt, visszaáll emojira vagy alap ikonra
                          e.target.style.display = 'none';
                          if (e.target.parentNode) {
                            e.target.parentNode.innerText = dailyBuffs.current?.emoji ?? '🎁';
                          }
                        }}
                      />
                    </div>

                    <div>
                      <div className="td-buff-name" style={{ fontSize: '1.05rem', fontWeight: '700' }}>
                        {dailyBuffs.current?.name ?? 'Unknown buff'}
                      </div>
                      <div className="td-buff-weekday" style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                        {dailyBuffs.current?.weekday ?? (todayWeekday !== null ? WEEKDAY_LABELS[todayWeekday] : '')}
                      </div>
                    </div>
                  </div>

                  <div className="td-tag-row">
                    {Array.isArray(dailyBuffs.current?.normal_buffs) &&
                      dailyBuffs.current.normal_buffs.map((buff, i) => (
                        <span className="td-tag" key={`n-${i}`}>
                          {typeof buff === 'string' ? buff : buff?.name}
                        </span>
                      ))}
                    {Array.isArray(dailyBuffs.current?.premium_buffs) &&
                      dailyBuffs.current.premium_buffs.map((buff, i) => (
                        <span className="td-tag premium" key={`p-${i}`}>
                          ✦ {typeof buff === 'string' ? buff : buff?.name}
                        </span>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="td-empty">Buff rotation is unavailable right now.</div>
              )}
            </section>

            <section
              id="weekly-buffs"
              className="td-card"
              ref={(el) => (sectionRefs.current.weeklyBuffs = el)}
            >
              <div className="td-card-header">
                <div className="td-card-title">
                  <img 
                    src="/icons/quest.png" 
                    alt="Weekly Buffs" 
                    className="td-card-title-icon" 
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  Weekly Bonus Rotation
                </div>
              </div>

              {weeklyBuffs ? (
                <div className="td-weekly-bonus-list">
                  {(() => {
                    const rotationList = Array.isArray(weeklyBuffs.rotation) 
                      ? weeklyBuffs.rotation 
                      : Array.isArray(weeklyBuffs) 
                        ? weeklyBuffs 
                        : [];

                    const currentName = typeof weeklyBuffs.current === 'object' 
                      ? weeklyBuffs.current?.name 
                      : weeklyBuffs.current;

                    const weeklyResetAt = serverTime?.weekly_reset_at;
                    const secondsToReset = weeklyResetAt && nowTick ? Math.max(0, weeklyResetAt - nowTick) : 0;
                    const ONE_WEEK_SEC = 7 * 24 * 3600;

                    const getBonusIcon = (name) => {
                      const lower = (name || '').toLowerCase();
                      if (lower.includes('star')) return '/icons/star.png';
                      if (lower.includes('xp') || lower.includes('experience')) return '/icons/xpweekly.png';
                      if (lower.includes('stat') || lower.includes('reroll')) return '/icons/stat.png';
                      if (lower.includes('invasion') || lower.includes('fast')) return '/icons/fastinv.png';
                      return '/icons/quest.png';
                    };

                    if (rotationList.length > 0) {
                      let activeIndex = rotationList.findIndex(
                        (item) => item.name?.toLowerCase() === currentName?.toLowerCase()
                      );
                      if (activeIndex === -1) activeIndex = 0;

                      return rotationList.map((item, i) => {
                        const isActive = i === activeIndex;

                        let weeksUntil = (i - activeIndex + rotationList.length) % rotationList.length;
                        let totalSecondsOffset = 0;

                        if (!isActive) {
                          totalSecondsOffset = secondsToReset + (weeksUntil - 1) * ONE_WEEK_SEC;
                        }

                        const iconSrc = getBonusIcon(item.name);

                        return (
                          <div 
                            key={i} 
                            className={`td-weekly-bonus-card${isActive ? ' active' : ''}`}
                          >
                            <div className="td-weekly-bonus-header">
                              <div className="td-weekly-bonus-title">
                                <img 
                                  src={iconSrc} 
                                  alt={item.name} 
                                  className="td-weekly-bonus-icon"
                                  onError={(e) => { e.target.style.display = 'none'; }}
                                />
                                <span className="td-weekly-bonus-name">{item.name}</span>
                              </div>

                              <div className={`td-weekly-bonus-status${isActive ? ' active-text' : ''}`}>
                                {isActive ? (
                                  'Active now'
                                ) : (
                                  `in ${formatDuration(totalSecondsOffset)}`
                                )}
                              </div>
                            </div>

                            <div className="td-weekly-bonus-desc">
                              {Array.isArray(item.buffs) 
                                ? item.buffs.join(' ') 
                                : item.description || item.buff || 'Special weekly bonus active during this week.'}
                            </div>
                          </div>
                        );
                      });
                    }

                    return <div className="td-empty">No weekly bonus rotation data.</div>;
                  })()}
                </div>
              ) : (
                <div className="td-empty">Weekly buffs are unavailable right now.</div>
              )}
            </section>

            <section
              id="biomes"
              className="td-card"
              ref={(el) => (sectionRefs.current.biomes = el)}
            >
              <div className="td-card-header">
                <div className="td-card-title">
                  <img 
                    src="/icons/rotation.png" 
                    alt="Biome Rotation" 
                    className="td-card-title-icon" 
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.parentNode) {
                        const span = document.createElement('span');
                        span.className = 'td-card-icon';
                        span.innerText = '❖';
                        e.target.parentNode.insertBefore(span, e.target);
                      }
                    }}
                  />
                  Biome Rotation
                </div>
                <StatusBadge state={sectionState('biomes')} />
              </div>

              {biomes?.current ? (
                <>
                  <div className="td-biome-block">
                    <div className="td-biome-block-label">Current Biomes</div>
                    <div className="td-biome-list">
                      {Array.isArray(biomes.current?.biomes) && biomes.current.biomes.length > 0 ? (
                        biomes.current.biomes.map((biome, i) => {
                          const imgUrl = getBiomeImageUrl(biome);
                          return (
                            <div className="td-biome-chip" key={i}>
                              {imgUrl ? (
                                <img 
                                  src={imgUrl} 
                                  alt={biome?.name || 'Biome'} 
                                  className="td-biome-chip-img"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    if (e.target.parentNode && !e.target.parentNode.querySelector('.td-biome-fallback-icon')) {
                                      const badge = document.createElement('span');
                                      badge.className = 'td-biome-fallback-icon';
                                      e.target.parentNode.insertBefore(badge, e.target);
                                    }
                                  }}
                                />
                              ) : (
                                <span className="td-biome-fallback-icon" />
                              )}
                              <span>{biome?.final_name ?? biome?.name ?? 'Unknown biome'}</span>
                            </div>
                          );
                        })
                      ) : (
                        <span className="td-empty">No biome data.</span>
                      )}
                    </div>
                  </div>

                  {Array.isArray(biomes?.upcoming) && biomes.upcoming.length > 0 && (
                    <div className="td-biome-block" style={{ marginTop: '16px' }}>
                      <div className="td-biome-block-label">
                        Next ({formatCountdown(biomes.upcoming[0]?.starts_at, nowTick) ?? '--'})
                      </div>
                      <div className="td-biome-list">
                        {Array.isArray(biomes.upcoming[0]?.biomes) &&
                          biomes.upcoming[0].biomes.map((biome, i) => {
                            const imgUrl = getBiomeImageUrl(biome);
                            return (
                              <div className="td-biome-chip" key={i}>
                                {imgUrl ? (
                                  <img 
                                    src={imgUrl} 
                                    alt={biome?.name || 'Biome'} 
                                    className="td-biome-chip-img"
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                      if (e.target.parentNode && !e.target.parentNode.querySelector('.td-biome-fallback-icon')) {
                                        const badge = document.createElement('span');
                                        badge.className = 'td-biome-fallback-icon';
                                        e.target.parentNode.insertBefore(badge, e.target);
                                      }
                                    }}
                                  />
                                ) : (
                                  <span className="td-biome-fallback-icon" />
                                )}
                                <span>{biome?.final_name ?? biome?.name ?? 'Unknown biome'}</span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="td-empty">Biome rotation is unavailable right now.</div>
              )}
            </section>

            <section
              id="records"
              className="td-card"
              ref={(el) => (sectionRefs.current.records = el)}
            >
              <div className="td-card-header">
                <div className="td-card-title">
                  <img 
                    src="/icons/quest.png" 
                    alt="Leaderboard Records" 
                    className="td-card-title-icon" 
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  Leaderboard Records
                </div>
                <StatusBadge state={sectionState('leaderboardRecords')} />
              </div>

              {records ? (
                <div className="td-record-list">
                  {records?.trove_mastery && (
                    <div className="td-record-card">
                      <div className="td-record-icon-wrapper">
                        <img 
                          src="/icons/trove_mastery.png" 
                          alt="Trove Mastery" 
                          className="td-record-icon"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.parentNode) e.target.parentNode.innerText = '🏆';
                          }}
                        />
                      </div>
                      <div className="td-record-info">
                        <div className="td-record-name">Trove Mastery</div>
                        <div className="td-record-holder">
                          👑 {records.trove_mastery?.player_name || records.trove_mastery?.player || 'Unknown'}
                        </div>
                      </div>
                      <div className="td-record-badge">
                        Lv {records.trove_mastery?.level ?? records.trove_mastery?.score ?? '—'}
                      </div>
                    </div>
                  )}

                  {records?.geode_mastery && (
                    <div className="td-record-card">
                      <div className="td-record-icon-wrapper">
                        <img 
                          src="/icons/geode_mastery.png" 
                          alt="Geode Mastery" 
                          className="td-record-icon"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.parentNode) e.target.parentNode.innerText = '💎';
                          }}
                        />
                      </div>
                      <div className="td-record-info">
                        <div className="td-record-name">Geode Mastery</div>
                        <div className="td-record-holder">
                          👑 {records.geode_mastery?.player_name || records.geode_mastery?.player || 'Unknown'}
                        </div>
                      </div>
                      <div className="td-record-badge geode">
                        Lv {records.geode_mastery?.level ?? records.geode_mastery?.score ?? '—'}
                        {records.geode_mastery?.capped ? ' (MAX)' : ''}
                      </div>
                    </div>
                  )}

                  {records?.power_rank && (
                    <div className="td-record-card">
                      <div className="td-record-icon-wrapper">
                        <img 
                          src="/icons/power_rank.png" 
                          alt="Power Rank" 
                          className="td-record-icon"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.parentNode) e.target.parentNode.innerText = '⚡';
                          }}
                        />
                      </div>
                      <div className="td-record-info">
                        <div className="td-record-name">Power Rank</div>
                        <div className="td-record-holder">
                          👑 {records.power_rank?.player_name || records.power_rank?.player || 'Unknown'}
                        </div>
                      </div>
                      <div className="td-record-badge power">
                        {records.power_rank?.value ?? records.power_rank?.score ?? '—'} PR
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="td-empty">Leaderboard records are unavailable right now.</div>
              )}
            </section>
            
            {/* 2. Sor 1-2. oszlop: Luxion Tracker */}
            <LuxionTracker 
              luxion={luxion} 
              serverTime={serverTime} 
              nowTick={nowTick} 
            />

            {/* 2. Sor 3-4. oszlop: Trove News */}
            <DashboardNews />
            
          </div>
        </main>
      </div>
    </div>
  );
}