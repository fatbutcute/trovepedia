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

const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const DAY_COLORS = [
  '#9500d1', // Mon (Lila)
  '#5cffeb', // Tue (Ciánkék)
  '#ef3ca5', // Wed (Rózsaszín)
  '#fbda83', // Thu (Sárga/Arany)
  '#ab023c', // Fri (Bordó)
  '#15ef7b', // Sat (Zöld)
  '#ff9900'  // Sun (Narancs)
];

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

export default function TokenCall() {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [clockOffsetSeconds, setClockOffsetSeconds] = useState(0);
  const [nowTick, setNowTick] = useState(() => Math.floor(Date.now() / 1000));
  const [activeSection, setActiveSection] = useState(NAV_SECTIONS[0].id);
  const [searchValue, setSearchValue] = useState('');
  const [playerQuery, setPlayerQuery] = useState('');

  const [isBuffModalOpen, setIsBuffModalOpen] = useState(false);
  const sectionRefs = useRef({});

  // --- Data fetching -------------------------------------------------

  async function loadData(forPlayer) {
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

      if (staticWeekly) {
        if (!mainJson.data) mainJson.data = {};
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
    }
  }

  useEffect(() => {
    loadData(playerQuery);
    const interval = setInterval(() => loadData(playerQuery), REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // --- Derived rendering helpers --------------------------------------

  const serverTime = data?.serverTime;
  const dailyBuffs = data?.dailyBuffs;
  const chaosChest = data?.chaosChest;
  const biomes = data?.biomes;
  const records = data?.leaderboardRecords;
  const playerProfile = data?.playerProfile;
  const weeklyBuffs = data?.weeklyBuffsStatic || data?.weeklyBuffs;
  const corruxion = data?.corruxion;
  const fluxion = data?.fluxion;

  const WEEKLY_ICONS = [
    '/icons/pickaxe.png',
    '/icons/fish.png',
    '/icons/icons8-sparkling-diamond-80.png',
    '/icons/quest.png',
    '/icons/dragon.png',
    '/icons/xp.png',
    '/icons/lootbag.png'
  ];

  // Nap kiszámítása
  const todayWeekday = useMemo(() => {
    if (!Number.isFinite(serverTime?.trove_day)) return null;
    return ((serverTime.trove_day % 7) + 7) % 7;
  }, [serverTime]);

  // Aktuális nap színe (a todayWeekday UTÁN számoljuk ki!)
  const currentDayColor = todayWeekday !== null ? DAY_COLORS[todayWeekday] || '#5cffeb' : '#5cffeb';

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

          {/* 1. Chaos Chest Kártya */}
          <div className="td-sidebar-card glow-blue">
            <div className="td-card-header">
              <div className="td-card-title">
                <span className="td-card-icon">◆</span> Chaos Chest
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

          {/* 2. Corruxion Kártya */}
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

          {/* 3. Fluxion Kártya */}
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
            {/* Today's Buffs */}
            <section
              id="buffs"
              className="td-card td-buff-interactive-card"
              style={{
                '--buff-glow-color': currentDayColor
              }}
              onClick={() => setIsBuffModalOpen(true)}
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
                <span className="td-buff-click-hint">Click for full schedule ↗</span>
              </div>

              {dailyBuffs?.current ? (
                <div className="td-buff-hero-compact">
                  <span className="td-buff-emoji">{dailyBuffs.current?.emoji ?? '🎁'}</span>
                  <div>
                    <div className="td-buff-name" style={{ color: currentDayColor }}>
                      {dailyBuffs.current?.name ?? 'Unknown buff'}
                    </div>
                    <div className="td-buff-weekday">
                      {dailyBuffs.current?.weekday ?? WEEKDAY_LABELS[todayWeekday]} · Active Today
                    </div>
                  </div>
                </div>
              ) : (
                <div className="td-empty">Buff rotation is unavailable right now.</div>
              )}
            </section>

            {/* FULLSCREEN POPUP MODAL */}
            {isBuffModalOpen && (
              <div className="td-modal-overlay" onClick={() => setIsBuffModalOpen(false)}>
                <div 
                  className="td-modal-content" 
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="td-modal-header">
                    <div className="td-card-title">
                      <img src="/icons/power.png" alt="Buffs" className="td-card-title-icon" />
                      Weekly Buff Schedule
                    </div>
                    <button className="td-modal-close" onClick={() => setIsBuffModalOpen(false)}>✕</button>
                  </div>

                  <div className="td-modal-body">
                    {Array.isArray(dailyBuffs?.week) && dailyBuffs.week.map((day, i) => {
                      const dayColor = DAY_COLORS[i] || '#5cffeb';
                      const isToday = todayWeekday !== null && i === todayWeekday;

                      return (
                        <div 
                          key={i} 
                          className={`td-modal-day-card${isToday ? ' today-highlight' : ''}`}
                          style={{ '--day-color': dayColor }}
                        >
                          <div className="td-modal-day-header">
                            <img 
                              src={WEEKLY_ICONS[i]} 
                              alt={WEEKDAY_LABELS[i]} 
                              className="td-modal-day-icon"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                            <span className="td-modal-day-name" style={{ color: dayColor }}>
                              {WEEKDAY_LABELS[i]} - {day?.name || 'Buff Day'}
                            </span>
                            {isToday && <span className="td-badge live">TODAY</span>}
                          </div>

                          <div className="td-tag-row">
                            {Array.isArray(day?.normal_buffs) && day.normal_buffs.map((buff, j) => (
                              <span className="td-tag custom-colored" key={`n-${j}`}>
                                {typeof buff === 'string' ? buff : buff?.name}
                              </span>
                            ))}
                            {Array.isArray(day?.premium_buffs) && day.premium_buffs.map((buff, j) => (
                              <span className="td-tag premium custom-colored" key={`p-${j}`}>
                                ✦ {typeof buff === 'string' ? buff : buff?.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Weekly Buffs */}
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
                  Weekly bonus rotation
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

            {/* Biomes */}
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

            {/* Leaderboard Records */}
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
          </div>
        </main>
      </div>
    </div>
  );
}