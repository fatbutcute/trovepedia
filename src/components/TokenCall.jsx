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

/* --- ÚJ: CustomDropdown Komponens a Trials-hoz --- */
function CustomDropdown({ value, options, onChange, label }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="custom-dropdown-container">
      <label className="dropdown-label">{label}</label>
      <div className={`custom-dropdown ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <div className="selected-value">
          {options.find(opt => opt.value === value)?.label || value}
          <span className={`arrow ${isOpen ? 'up' : ''}`}>▼</span>
        </div>
        
        {isOpen && (
          <div className="dropdown-options fade-in-down">
            {options.map(opt => (
              <div 
                key={opt.value} 
                className={`dropdown-option ${opt.value === value ? 'active' : ''}`}
                onClick={(e) => { 
                  e.stopPropagation();
                  onChange(opt.value); 
                  setIsOpen(false); 
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TrialsTracker() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [timezone, setTimezone] = useState('local'); 
  
  const [startCost, setStartCost] = useState(7);
  const [produceCount, setProduceCount] = useState(1);

  const calcTotal = useMemo(() => {
    const s = parseInt(startCost) || 0;
    const n = parseInt(produceCount) || 0;
    if (s < 7 || n < 1) return 0;
    const floorN4 = Math.floor(n / 4);
    return (n * s) + (floorN4 * (n - 2 * floorN4 - 2));
  }, [startCost, produceCount]);

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();

  const convertToUTC = (localDate, tzName) => {
    const options = {
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      timeZone: tzName, hour12: false
    };
    return new Date(localDate.toLocaleString('en-US', options));
  };

  const convertFromUTC = (utcDate, tzName) => {
    const options = {
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      timeZone: tzName, hour12: false
    };
    return new Date(utcDate.toLocaleString('en-US', options));
  };

  const getIntervals = (day) => {
    const intervals = [];
    const tzMap = {
      'local': Intl.DateTimeFormat().resolvedOptions().timeZone,
      'utc': 'UTC',
      'cet': 'Europe/Paris',
      'est': 'America/New_York',
      'pst': 'America/Los_Angeles'
    };
    const currentTimezone = tzMap[timezone] || 'UTC';
    const currentDate = new Date(selectedYear, selectedMonth, day);
    const baseTime = new Date(Date.UTC(1900, 0, 3, 11, 0, 0));
    
    const startOfDay = new Date(selectedYear, selectedMonth, day);
    startOfDay.setHours(0, 0, 0, 0);
    const startOfDayUTC = convertToUTC(startOfDay, currentTimezone);
    
    const hoursSinceBase = (startOfDayUTC.getTime() - baseTime.getTime()) / (1000 * 60 * 60);
    const cycleLength = 27;
    let cycleIndex = Math.floor(hoursSinceBase / cycleLength);
    
    for (let i = -2; i <= 2; i++) {
      const currentCycle = cycleIndex + i;
      const startTimeUTC = new Date(baseTime.getTime() + currentCycle * cycleLength * 60 * 60 * 1000);
      const endTimeUTC = new Date(startTimeUTC.getTime() + 3 * 60 * 60 * 1000);
      const startTimeLocal = convertFromUTC(startTimeUTC, currentTimezone);
      
      if (startTimeLocal.getDate() === currentDate.getDate() &&
          startTimeLocal.getMonth() === currentDate.getMonth() &&
          startTimeLocal.getFullYear() === currentDate.getFullYear()) {
          
          const timeFormat = { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: false,
              timeZone: currentTimezone
          };
          const startFormatted = startTimeUTC.toLocaleTimeString('en-US', timeFormat);
          const endFormatted = endTimeUTC.toLocaleTimeString('en-US', timeFormat);
          intervals.push(`${startFormatted} - ${endFormatted}`);
      }
    }
    return intervals;
  };

  return (
    <section id="trials" className="td-card span-2">
      <div className="trials-header">
        <div className="trials-header-left">
          <div className="td-card-title">
            <span className="td-title-mark" style={{ background: '#b7003d', boxShadow: '0 0 12px 2px rgba(183, 0, 61, 0.4)' }}></span>
            <span style={{ color: '#ff0077', fontWeight: 'bold', fontSize: '1.2rem', marginLeft: '4px' }}>Trials Tracker</span>
          </div>
          <p className="trials-credits">Original creators: <span className="trials-credit-names">Ginnne, __reisalin__, MewsCat, とても残念だ</span></p>
        </div>

        {/* ÚJ: Kompakt Vízszintes Kalkulátor jobb felül */}
        <div className="trials-mini-calc">
          <div className="mini-calc-title">Venturine Calculator</div>
          <div className="mini-calc-body">
            <div className="mini-calc-input">
              <label>Cost</label>
              <input 
                type="number" 
                value={startCost} 
                min="7" 
                onChange={(e) => setStartCost(e.target.value)} 
              />
            </div>
            <div className="mini-calc-input">
              <label>Qty</label>
              <input 
                type="number" 
                value={produceCount} 
                min="1" 
                onChange={(e) => setProduceCount(e.target.value)} 
              />
            </div>
            <div className="mini-calc-result">
              <span className="mini-result-label">Total</span>
              <span className="mini-result-value">{calcTotal}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mindig látható Event Calendar */}
      <div className="trials-calendar-container">
        <div className="calendar-controls">
          <CustomDropdown 
            label="Year"
            value={selectedYear} 
            options={[2025, 2026].map(y => ({ value: y, label: y }))}
            onChange={setSelectedYear} 
          />
          <CustomDropdown 
            label="Month"
            value={selectedMonth} 
            options={["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m, i) => ({ value: i, label: m }))}
            onChange={setSelectedMonth} 
          />
          <CustomDropdown 
            label="Timezone"
            value={timezone} 
            options={[
              { value: 'local', label: 'Local Time (Auto)' },
              { value: 'utc', label: 'UTC / Server Time' },
              { value: 'cet', label: 'CET (Central European)' },
              { value: 'est', label: 'EST (Eastern / NY)' },
              { value: 'pst', label: 'PST (Pacific / LA)' }
            ]}
            onChange={setTimezone} 
          />
        </div>
        <div className="calendar-grid">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => <div key={d} className="calendar-day-label">{d}</div>)}
          
          {Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 }).map((_, i) => (
            <div key={`empty-${i}`} className="calendar-day empty" />
          ))}
          
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const intervals = getIntervals(day);
            const isToday = new Date().getDate() === day && new Date().getMonth() === selectedMonth && new Date().getFullYear() === selectedYear;
            return (
              <div key={day} className={`calendar-day ${isToday ? 'today' : ''} ${intervals.length > 0 ? 'has-event' : ''}`}>
                <span className="day-number">{day}</span>
                {intervals.map((int, idx) => <div key={idx} className="day-interval">{int}</div>)}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
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

  const sectionRefs = useRef({});

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

          {/* 1. Chaos Chest */}
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

          {/* 2. Corruxion */}
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

          {/* 3. Fluxion */}
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
            {/* Today's Buffs (Egyszerű, Letisztult) */}
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
                    <span className="td-buff-emoji" style={{ fontSize: '1.8rem' }}>
                      {dailyBuffs.current?.emoji ?? '🎁'}
                    </span>
                    <div>
                      <div className="td-buff-name" style={{ fontSize: '1.05rem', fontWeight: '700' }}>
                        {dailyBuffs.current?.name ?? 'Unknown buff'}
                      </div>
                      <div className="td-buff-weekday" style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                        {dailyBuffs.current?.weekday ?? (todayWeekday !== null ? WEEKDAY_LABELS[todayWeekday] : '')}
                      </div>
                    </div>
                  </div>

                  {/* Napi Aktív Buff tagek */}
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
            
            {/* ÚJ: Trials Tracker 2 Oszlopon */}
            <TrialsTracker />
            
          </div>
        </main>
      </div>
    </div>
  );
}