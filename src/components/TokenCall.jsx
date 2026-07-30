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
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${sec}s`;
  return `${sec}s`;
}

function formatCountdown(targetUnix, nowUnix) {
  if (!Number.isFinite(targetUnix) || !Number.isFinite(nowUnix)) return null;
  return formatDuration(targetUnix - nowUnix);
}

function StatusBadge({ state, okLabel = 'Live', errorLabel = 'Unavailable' }) {
  if (state === 'ok') return <span className="td-badge live">{okLabel}</span>;
  if (state === 'error') return <span className="td-badge error">{errorLabel}</span>;
  return <span className="td-badge muted">Loading</span>;
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

  // Pontos illesztés a megadott fájllistád alapján:
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

  const sectionRefs = useRef({});

  // --- Data fetching -------------------------------------------------

  async function loadData(forPlayer) {
    try {
      const url = forPlayer
        ? `/api/player?player=${encodeURIComponent(forPlayer)}`
        : '/api/player';
      const res = await fetch(url);
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error?.message || `Request failed (${res.status})`);
      }
      setPayload(json);
      setFetchError(null);

      const serverNow = json?.data?.serverTime?.now_unix;
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

  // Local ticking clock, synced to server time via the offset above so the
  // displayed clock stays accurate between polls without re-fetching.
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
  const weeklyBuffs = data?.weeklyBuffs;
  const WEEKLY_ICONS = [
  '/icons/pickaxe.png',
  '/icons/fish.png',
  '/icons/icons8-sparkling-diamond-80.png',
  '/icons/quest.png',
  '/icons/dragon.png',
  '/icons/xp.png',
  '/icons/lootbag.png'
];

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

        </form>
          <button 
            type="submit" 
            className="td-search-submit-btn" 
            disabled={!searchValue.trim()}
          >
            Search
          </button>
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

          {/* Chaos Chest átrakva ide a Sidebarba */}
          <div className="td-sidebar-card">
            <div className="td-card-header">
              <div className="td-card-title">
                <span className="td-card-icon">◆</span> Chaos Chest
              </div>
              <StatusBadge state={sectionState('chaosChest')} />
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

          {/* Sidebar Footer */}
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
            className="td-card span-2"
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
              <StatusBadge state={sectionState('dailyBuffs')} />
            </div>

              {dailyBuffs?.current ? (
                <>
                  <div className="td-buff-hero">
                    <span className="td-buff-emoji">{dailyBuffs.current?.emoji ?? '🎁'}</span>
                    <div>
                      <div className="td-buff-name">{dailyBuffs.current?.name ?? 'Unknown buff'}</div>
                      <div className="td-buff-weekday">{dailyBuffs.current?.weekday ?? ''}</div>
                    </div>
                  </div>

                  <div className="td-tag-row">
                    {Array.isArray(dailyBuffs.current?.normal_buffs) &&
                      dailyBuffs.current.normal_buffs.map((buff, i) => (
                        <span className="td-tag" key={`normal-${i}`}>
                          {typeof buff === 'string' ? buff : buff?.name ?? 'Buff'}
                        </span>
                      ))}
                    {Array.isArray(dailyBuffs.current?.premium_buffs) &&
                      dailyBuffs.current.premium_buffs.map((buff, i) => (
                        <span className="td-tag premium" key={`premium-${i}`}>
                          {typeof buff === 'string' ? buff : buff?.name ?? 'Premium buff'}
                        </span>
                      ))}
                  </div>

                  {Array.isArray(dailyBuffs?.week) && dailyBuffs.week.length > 0 && (
                    <div className="td-week-strip">
                      {dailyBuffs.week.map((day, i) => (
                        <div
                          key={i}
                          className={`td-week-day${
                            todayWeekday !== null && i === todayWeekday ? ' today' : ''
                          }`}
                          title={day?.name ?? ''}
                        >
                          <img 
                            src={WEEKLY_ICONS[i]} 
                            alt={WEEKDAY_LABELS[i]} 
                            className="td-week-icon"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                          <div>{WEEKDAY_LABELS[i] ?? ''}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
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
                    Weekly Buffs
                  </div>
                  <StatusBadge state={sectionState('weeklyBuffs')} />
                </div>

                {weeklyBuffs ? (
                  <div className="td-weekly-buff-list">
                    {/* Debug kiíratás a konzolra, ha meg akarod nézni a nyers szerkezetet */}
                    {console.log('Weekly Buffs API raw data:', weeklyBuffs)}

                    {/* 1. Ha van esemény neve */}
                    {(weeklyBuffs.event || weeklyBuffs.event_name || weeklyBuffs.name) && (
                      <div className="td-weekly-buff-item">
                        <span className="td-weekly-buff-label">Event:</span>
                        <span className="td-weekly-buff-value">
                          {typeof weeklyBuffs.event === 'object'
                            ? weeklyBuffs.event?.name || weeklyBuffs.event?.title
                            : weeklyBuffs.event || weeklyBuffs.event_name || weeklyBuffs.name}
                        </span>
                      </div>
                    )}

                    {/* 2. Buffok kigyűjtése minden lehetséges API mezőnévből */}
                    {(() => {
                      const rawList = 
                        weeklyBuffs.buffs || 
                        weeklyBuffs.weekly_buffs || 
                        weeklyBuffs.active_buffs || 
                        weeklyBuffs.normal_buffs || 
                        weeklyBuffs.current ||
                        weeklyBuffs.items ||
                        (Array.isArray(weeklyBuffs) ? weeklyBuffs : null);

                      if (Array.isArray(rawList) && rawList.length > 0) {
                        return rawList.map((buff, i) => (
                          <div className="td-tag premium" key={i}>
                            ✦ {typeof buff === 'string' ? buff : buff?.name || buff?.description || buff?.title || 'Weekly Bonus'}
                          </div>
                        ));
                      }

                      // Ha a válasz egy egybefüggő szöveg
                      if (typeof weeklyBuffs === 'string') {
                        return <div className="td-tag premium">✦ {weeklyBuffs}</div>;
                      }

                      // Ha van event, de külön buff lista nincs
                      if (weeklyBuffs.event || weeklyBuffs.event_name) {
                        return null;
                      }

                      return <div className="td-empty">No active weekly buffs found.</div>;
                    })()}
                  </div>
                ) : (
                  <div className="td-empty">Weekly buffs are unavailable right now.</div>
                )}
              </section>

            {/* Chaos Chest */}
            <section
              id="chaos"
              className="td-card"
              ref={(el) => (sectionRefs.current.chaos = el)}
            >
              <div className="td-card-header">
                <div className="td-card-title">
                  <span className="td-card-icon">◆</span> Chaos Chest
                </div>
                <StatusBadge state={sectionState('chaosChest')} />
              </div>

              {chaosChest?.item ? (
                <>
              <div className="td-chaos-hero">
                <div className="td-chaos-icon">
                  {chaosChest.item?.image_url && chaosChest.item.image_url.trim() !== '' ? (
                    <img 
                      src={chaosChest.item.image_url} 
                      alt={chaosChest.item?.name || 'Chaos Item'} 
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      onError={(e) => {
                        // Ha a kép letöltése meghiúsul (404/hibás URL), elrejtjük a képet és kirakjuk a szimbólumot
                        e.target.style.display = 'none';
                        e.target.parentNode.innerText = '◆';
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

                  {chaosChest?.active ? (
                    <div>
                      <div className="td-countdown">
                        {formatCountdown(
                          serverTime?.now_unix + (chaosChest?.seconds_remaining ?? 0),
                          nowTick
                        ) ?? formatDuration(chaosChest?.seconds_remaining)}
                      </div>
                      <div className="td-countdown-label">until window closes</div>
                    </div>
                  ) : (
                    <div>
                      <div className="td-countdown">{formatDuration(chaosChest?.seconds_remaining)}</div>
                      <div className="td-countdown-label">until next window opens</div>
                    </div>
                  )}
                </>
              ) : (
                <div className="td-empty">No Chaos Chest data available this week.</div>
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
                                    // Ha a generált fájlnév mégsem létezne az Aallyn szerverén
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
                  {/* Trove Mastery Record */}
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

                  {/* Geode Mastery Record */}
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

                  {/* Power Rank Record */}
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