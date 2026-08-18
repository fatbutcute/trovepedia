import { useEffect, useMemo, useRef, useState } from 'react';
import './TokenCall.css';
import { useLanguage } from '../context/LanguageContext';
import { dashboardContent } from './guides/content/dashboard.content';

const REFRESH_INTERVAL_MS = 30_000;

// Ikon választó függvény a nap neve vagy a buff típusa alapján
function getDailyBuffIcon(buffData) {
  if (!buffData) return '/icons/power.png';

  const weekday = (buffData.weekday || '').toLowerCase();
  const buffName = (buffData.name || '').toLowerCase();

  if (weekday.includes('mon')) return '/icons/pickaxe.png';
  if (weekday.includes('tue')) return '/icons/fish.png';
  if (weekday.includes('wed')) return '/icons/icons8-sparkling-diamond-80.png';
  if (weekday.includes('thu')) return '/icons/quest.png';
  if (weekday.includes('fri')) return '/icons/dragon.png';
  if (weekday.includes('sat')) return '/icons/xp.png';
  if (weekday.includes('sun')) return '/icons/lootbag.png';

  if (buffName.includes('mining') || buffName.includes('gathering')) return '/icons/pickaxe.png';
  if (buffName.includes('fish')) return '/icons/fish.png';
  if (buffName.includes('gem')) return '/icons/icons8-sparkling-diamond-80.png';
  if (buffName.includes('adventure') || buffName.includes('quest')) return '/icons/quest.png';
  if (buffName.includes('dragon')) return '/icons/dragon.png';
  if (buffName.includes('xp') || buffName.includes('experience')) return '/icons/xp.png';
  if (buffName.includes('loot') || buffName.includes('karma')) return '/icons/lootbag.png';

  return '/icons/power.png';
}

// 🌐 Segédfüggvény a napi és heti buffok lefordításához
function translateBuffText(rawText, t) {
  if (!rawText || typeof rawText !== 'string') return rawText;

  let text = rawText.trim();

  // 1. Ha van közvetlen egyezés a buffDescriptions szótárban
  if (t?.buffDescriptions?.[text]) {
    return t.buffDescriptions[text];
  }

  // 2. Ha a szöveg összetett vagy kis- és nagybetű eltérés van
  const dict = t?.buffDescriptions || {};
  let translated = text;
  Object.keys(dict).forEach((key) => {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'gi');
    translated = translated.replace(regex, dict[key]);
  });

  return translated;
}

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

function StatusBadge({ state, label, customClass, t }) {
  if (state === 'error') return <span className="td-badge error">{t?.badges?.unavailable || 'Unavailable'}</span>;
  if (state === 'loading') return <span className="td-badge muted">{t?.badges?.loading || 'Loading'}</span>;
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

/* --- Luxion / Trials of Luxion Tracker Komponens --- */
function LuxionTracker({ luxion, serverTime, nowTick, t }) {
  const isActive = luxion?.active;
  const secondsRemaining = luxion?.seconds_remaining ?? 0;
  const targetTime = serverTime?.now_unix && secondsRemaining > 0 
    ? serverTime.now_unix + secondsRemaining 
    : null;

  return (
    <section id="luxion-tracker" className="td-card span-2 glow-amber td-luxion-card-bg">
      <div className="td-luxion-overlay" />

      <div className="td-luxion-content">
        <div className="td-card-header">
          <div className="td-card-title">
            <span className="td-title-mark" style={{ background: '#f59e0b', boxShadow: '0 0 12px 2px rgba(245, 158, 11, 0.5)' }}></span>
            <span style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '1.25rem', marginLeft: '4px', fontFamily: 'Comfortaa, sans-serif' }}>
              {t.luxion.title}
            </span>
          </div>
          <StatusBadge 
            state={luxion ? 'ok' : 'loading'} 
            label={isActive ? t.badges.activeInHub : t.badges.away} 
            customClass={isActive ? 'badge-amber' : 'muted'} 
            t={t}
          />
        </div>

        <div className="td-luxion-body">
          <div className="td-luxion-hero-card">
            <div className="td-luxion-status-info td-luxion-scroll-content">
              
              <div className="td-luxion-section">
                <h4 className="td-luxion-subtitle">{t.luxion.overviewTitle}</h4>
                <p className="td-luxion-desc" dangerouslySetInnerHTML={{ __html: t.luxion.overviewDesc }} />
              </div>

              <div className="td-luxion-section">
                <h4 className="td-luxion-subtitle">{t.luxion.gettingStartedTitle}</h4>
                <p className="td-luxion-desc" dangerouslySetInnerHTML={{ __html: t.luxion.gettingStartedDesc }} />
              </div>

              <div className="td-luxion-section">
                <h4 className="td-luxion-subtitle">{t.luxion.progressionTitle}</h4>
                <p 
                  className="td-luxion-desc" 
                  dangerouslySetInnerHTML={{ __html: t.luxion.progressionDesc }} 
                />
                <ul className="td-luxion-list">
                  <li><strong>{t.luxion.completeTrials}</strong> {t.luxion.completeTrialsDesc}</li>
                  <li><strong>{t.luxion.progressTrials}</strong> {t.luxion.progressTrialsDesc}</li>
                </ul>
              </div>

              <div className="td-luxion-section">
                <h4 className="td-luxion-subtitle">{t.luxion.rewardsTitle}</h4>
                <p className="td-luxion-desc" dangerouslySetInnerHTML={{ __html: t.luxion.rewardsDesc }} />
              </div>

              <div className="td-luxion-section td-luxion-alert-box">
                <h4 className="td-luxion-subtitle alert-title">{t.luxion.notesTitle}</h4>
                <ul className="td-luxion-list">
                  <li><strong>{t.luxion.rule1Title}</strong> {t.luxion.rule1Desc}</li>
                  <li dangerouslySetInnerHTML={{ __html: `<strong>${t.luxion.rule2Title}</strong> ${t.luxion.rule2Desc}` }} />
                </ul>
              </div>

            </div>
          </div>

          <div className="td-luxion-timer-box">
            <div className="td-luxion-timer-label">
              {isActive ? t.luxion.leavesHubIn : t.luxion.nextArrival}
            </div>
            <div className="td-luxion-timer-value">
              {isActive 
                ? (targetTime ? (formatCountdown(targetTime, nowTick) ?? formatDuration(secondsRemaining)) : formatDuration(secondsRemaining))
                : (secondsRemaining > 0 ? formatDuration(secondsRemaining) : t.luxion.scheduleTba)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Trove News Dashboard Komponens --- */
function DashboardNews({ t }) {
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
          <span style={{ color: '#e8b84b', fontWeight: 'bold', fontSize: '1.2rem', marginLeft: '4px', fontFamily: 'Comfortaa, sans-serif' }}>
            {t.news.title}
          </span>
        </div>
        <StatusBadge state={loading ? 'loading' : error ? 'error' : 'ok'} label={t.badges.updates} customClass="badge-amber" t={t} />
      </div>

      {loading ? (
        <div className="td-news-loader">
          <div className="spin">⟳</div> {t.news.loading}
        </div>
      ) : error ? (
        <div className="td-empty" style={{ color: '#f87171' }}>{t.news.error}</div>
      ) : (
        <div className="td-news-scroll-container">
          <div className="td-news-grid">
            {news.slice(0, 9).map((item, index) => {
              const title = item.title || t.news.defaultTitle;
              const excerpt = item.excerpt || "";
              const link = item.url || "https://mystic-cave.com/";
              const imageUrl = item.image || '/guideimages/default-news.webp';
              
              const pubDate = item.date ? new Date(item.date).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
              }) : t.news.recent;

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
  const { langCode } = useLanguage();
  const t = dashboardContent[langCode] || dashboardContent.en;

  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialOverlay, setInitialOverlay] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [clockOffsetSeconds, setClockOffsetSeconds] = useState(0);
  const [nowTick, setNowTick] = useState(() => Math.floor(Date.now() / 1000));
  const [activeSection, setActiveSection] = useState('buffs');
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
          <div className="td-loader-text">{t.header.loading}</div>
        </div>
      )}

      <header className="td-header">
        <div className="td-title">
          <span className="td-title-mark" />
          {t.header.title}
          <span className="td-title-sub">{t.header.subtitle}</span>
        </div>

        <form className="td-search" onSubmit={handleSearchSubmit}>
          <span className="td-search-icon">⌕</span>
          <input
            type="text"
            placeholder={t.header.searchPlaceholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button 
            type="submit" 
            className="td-search-submit-btn" 
            disabled={!searchValue.trim()}
          >
            {t.header.searchButton}
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
            {t.header.refresh}
          </button>
        </div>
      </header>

      <div className="td-body">
        <aside className="td-sidebar">
          <div className="td-clock-card">
            <div className="td-clock-label">{t.clock.serverTime}</div>
            <div className="td-clock-time">{formatClock(nowTick)}</div>
            {todayWeekday !== null && (
              <div className="td-clock-day">
                {t.clock.weekdays[todayWeekday] ?? '—'} · {t.clock.day} {serverTime?.trove_day}
              </div>
            )}
            <div className="td-clock-resets">
              <div className="td-reset-row">
                <span>{t.clock.dailyReset}</span>
                <span>{formatCountdown(serverTime?.daily_reset_at, nowTick) ?? '--'}</span>
              </div>
              <div className="td-reset-row">
                <span>{t.clock.weeklyReset}</span>
                <span>{formatCountdown(serverTime?.weekly_reset_at, nowTick) ?? '--'}</span>
              </div>
            </div>
          </div>

          <div className="td-sidebar-card glow-green">
            <div className="td-card-header">
              <div className="td-card-title">
                <span className="td-card-icon" style={{ color: '#4ade80' }}>●</span> {t.sidebar.activePlayers}
              </div>
              <StatusBadge state={playerActivity ? 'ok' : 'loading'} label={t.sidebar.live} customClass="badge-green" t={t} />
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
              <div className="td-activity-sub">{t.sidebar.onlineSub}</div>
            </div>
          </div>

          <div className="td-sidebar-card glow-blue">
            <div className="td-card-header">
              <div className="td-card-title">
                <span className="td-card-icon">◆</span> {t.sidebar.chaosWeekly}
              </div>
              <StatusBadge 
                state={sectionState('chaosChest')} 
                label={chaosChest?.active ? t.sidebar.active : t.sidebar.live} 
                customClass="badge-blue" 
                t={t}
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
                    <div className="td-chaos-name">{chaosChest.item?.name ?? t.sidebar.mysteryItem}</div>
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
                  <div className="td-countdown-label">{t.sidebar.untilReset}</div>
                </div>
              </div>
            ) : (
              <div className="td-empty">{t.sidebar.noChaos}</div>
            )}
          </div>

          <div className="td-sidebar-card glow-purple">
            <div className="td-card-header">
              <div className="td-card-title">
                <span className="td-card-icon" style={{ color: '#c084fc' }}>✦</span> {t.sidebar.corruxion}
              </div>
              <StatusBadge 
                state={sectionState('corruxion')} 
                label={corruxion?.active ? t.sidebar.active : t.sidebar.away} 
                customClass={corruxion?.active ? 'badge-purple' : 'muted'} 
                t={t}
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
                    {corruxion.active ? t.sidebar.leavesIn : t.sidebar.arrivesIn}
                  </div>
                </div>
              </div>
            ) : (
              <div className="td-empty">{t.sidebar.noCorruxion}</div>
            )}
          </div>

          <div className="td-sidebar-card glow-amber">
            <div className="td-card-header">
              <div className="td-card-title">
                <span className="td-card-icon" style={{ color: '#f59e0b' }}>◈</span> {t.sidebar.fluxion}
              </div>
              <StatusBadge 
                state={sectionState('fluxion')} 
                label={
                  fluxion?.state 
                    ? fluxion.state 
                    : fluxion?.active 
                      ? t.sidebar.active 
                      : t.sidebar.voting
                } 
                customClass="badge-amber" 
                t={t}
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
                    {fluxion.active ? t.sidebar.windowCloses : t.sidebar.nextWindow}
                  </div>
                </div>
              </div>
            ) : (
              <div className="td-empty">{t.sidebar.noFluxion}</div>
            )}
          </div>

          <div className="td-sidebar-footer">
            {t.sidebar.footer} <br />{t.sidebar.autoRefresh}
          </div>
        </aside>

        <main className="td-main">
          {fetchError && (
            <div className="td-status-banner">
              ⚠ {fetchError} {t.bannerError}
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
                    alt={t.buffs.title} 
                    className="td-card-title-icon" 
                  />
                  {t.buffs.title}
                </div>
                <StatusBadge state={sectionState('dailyBuffs')} label={t.badges.live} t={t} />
              </div>

              {dailyBuffs?.current ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="td-buff-hero" style={{ padding: '12px', background: 'var(--card-alt)', borderRadius: 'var(--radius-md)' }}>
                    <div className="td-buff-icon-wrapper" style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <img 
                          src={getDailyBuffIcon(dailyBuffs.current)} 
                          alt={dailyBuffs.current?.name ?? 'Daily Buff'} 
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.parentNode) {
                              e.target.parentNode.innerText = dailyBuffs.current?.emoji ?? '🎁';
                            }
                          }}
                        />
                      </div>

                      <div>
                        <div className="td-buff-name" style={{ fontSize: '1.05rem', fontWeight: '700' }}>
                          {t.buffNames?.[dailyBuffs.current?.name] || dailyBuffs.current?.name || t.buffs.unknown}
                        </div>
                        <div className="td-buff-weekday" style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                          {dailyBuffs.current?.weekday ?? (todayWeekday !== null ? t.clock.weekdays[todayWeekday] : '')}
                        </div>
                      </div>
                    </div>

                  <div className="td-tag-row">
                    {Array.isArray(dailyBuffs.current?.normal_buffs) &&
                      dailyBuffs.current.normal_buffs.map((buff, i) => {
                        const rawBuff = typeof buff === 'string' ? buff : buff?.name;
                        return (
                          <span className="td-tag" key={`n-${i}`}>
                            {translateBuffText(rawBuff, t)}
                          </span>
                        );
                      })}
                    {Array.isArray(dailyBuffs.current?.premium_buffs) &&
                      dailyBuffs.current.premium_buffs.map((buff, i) => {
                        const rawBuff = typeof buff === 'string' ? buff : buff?.name;
                        return (
                          <span className="td-tag premium" key={`p-${i}`}>
                            ✦ {translateBuffText(rawBuff, t)}
                          </span>
                        );
                      })}
                  </div>
                </div>
              ) : (
                <div className="td-empty">{t.buffs.unavailable}</div>
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
                    alt={t.weeklyBonus.title} 
                    className="td-card-title-icon" 
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  {t.weeklyBonus.title}
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
                        const rawDesc = Array.isArray(item.buffs) 
                          ? item.buffs.join(' ') 
                          : item.description || item.buff || t.weeklyBonus.defaultDesc;

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
                                <span className="td-weekly-bonus-name">
                                  {t.buffNames?.[item.name] || item.name}
                                </span>
                              </div>

                              <div className={`td-weekly-bonus-status${isActive ? ' active-text' : ''}`}>
                                {isActive ? (
                                  t.weeklyBonus.activeNow
                                ) : (
                                  `${t.weeklyBonus.inTime} ${formatDuration(totalSecondsOffset)}`
                                )}
                              </div>
                            </div>

                            <div className="td-weekly-bonus-desc">
                              {translateBuffText(rawDesc, t)}
                            </div>
                          </div>
                        );
                      });
                    }

                    return <div className="td-empty">{t.weeklyBonus.noData}</div>;
                  })()}
                </div>
              ) : (
                <div className="td-empty">{t.weeklyBonus.unavailable}</div>
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
                    alt={t.biomes.title} 
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
                  {t.biomes.title}
                </div>
                <StatusBadge state={sectionState('biomes')} t={t} />
              </div>

              {biomes?.current ? (
                <>
                  <div className="td-biome-block">
                    <div className="td-biome-block-label">{t.biomes.current}</div>
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
                              <span>{biome?.final_name ?? biome?.name ?? t.biomes.unknown}</span>
                            </div>
                          );
                        })
                      ) : (
                        <span className="td-empty">{t.biomes.noData}</span>
                      )}
                    </div>
                  </div>

                  {Array.isArray(biomes?.upcoming) && biomes.upcoming.length > 0 && (
                    <div className="td-biome-block" style={{ marginTop: '16px' }}>
                      <div className="td-biome-block-label">
                        {t.biomes.next} ({formatCountdown(biomes.upcoming[0]?.starts_at, nowTick) ?? '--'})
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
                                <span>{biome?.final_name ?? biome?.name ?? t.biomes.unknown}</span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="td-empty">{t.biomes.unavailable}</div>
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
                    alt={t.records.title} 
                    className="td-card-title-icon" 
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  {t.records.title}
                </div>
                <StatusBadge state={sectionState('leaderboardRecords')} t={t} />
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
                        <div className="td-record-name">{t.records.troveMastery}</div>
                        <div className="td-record-holder">
                          👑 {records.trove_mastery?.player_name || records.trove_mastery?.player || t.records.unknown}
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
                        <div className="td-record-name">{t.records.geodeMastery}</div>
                        <div className="td-record-holder">
                          👑 {records.geode_mastery?.player_name || records.geode_mastery?.player || t.records.unknown}
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
                        <div className="td-record-name">{t.records.powerRank}</div>
                        <div className="td-record-holder">
                          👑 {records.power_rank?.player_name || records.power_rank?.player || t.records.unknown}
                        </div>
                      </div>
                      <div className="td-record-badge power">
                        {records.power_rank?.value ?? records.power_rank?.score ?? '—'} PR
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="td-empty">{t.records.unavailable}</div>
              )}
            </section>
            
            {/* Luxion Tracker */}
            <LuxionTracker 
              luxion={luxion} 
              serverTime={serverTime} 
              nowTick={nowTick} 
              t={t}
            />

            {/* Trove News */}
            <DashboardNews t={t} />
            
          </div>
        </main>
      </div>
    </div>
  );
}