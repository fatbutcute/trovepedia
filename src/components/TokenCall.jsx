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
          <button type="submit" disabled={!searchValue.trim()}>
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

          <nav className="td-nav">
            <div className="td-nav-label">Navigate</div>
            {NAV_SECTIONS.map((section) => (
              <button
                key={section.id}
                type="button"
                className={`td-nav-item${activeSection === section.id ? ' active' : ''}`}
                onClick={() => handleNavClick(section.id)}
              >
                <span className="td-nav-dot" />
                {section.icon} {section.label}
              </button>
            ))}
          </nav>

          <div className="td-sidebar-footer">
            Data via the Kiwi API (aallyn.net). Auto-refreshes every 30s.
            {payload?.tokenConfigured === false && (
              <> Running without an API token — public rate limits apply.</>
            )}
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
              className="td-card span-2"
              ref={(el) => (sectionRefs.current.buffs = el)}
            >
              <div className="td-card-header">
                <div className="td-card-title">
                  <span className="td-card-icon">✦</span> Today's Buffs
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
                          {day?.emoji ?? '•'}
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
                    <div className="td-chaos-icon">◆</div>
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

            {/* Biomes */}
            <section
              id="biomes"
              className="td-card"
              ref={(el) => (sectionRefs.current.biomes = el)}
            >
              <div className="td-card-header">
                <div className="td-card-title">
                  <span className="td-card-icon">❖</span> Biome Rotation
                </div>
                <StatusBadge state={sectionState('biomes')} />
              </div>

              {biomes?.current ? (
                <>
                  <div className="td-biome-block">
                    <div className="td-biome-block-label">Current</div>
                    <div className="td-biome-list">
                      {Array.isArray(biomes.current?.biomes) && biomes.current.biomes.length > 0 ? (
                        biomes.current.biomes.map((biome, i) => (
                          <span className="td-biome-chip" key={i}>
                            <span className="td-biome-chip-icon" />
                            {biome?.final_name ?? biome?.name ?? 'Unknown biome'}
                          </span>
                        ))
                      ) : (
                        <span className="td-empty">No biome data.</span>
                      )}
                    </div>
                  </div>

                  {Array.isArray(biomes?.upcoming) && biomes.upcoming.length > 0 && (
                    <div className="td-biome-block">
                      <div className="td-biome-block-label">
                        Next ({formatCountdown(biomes.upcoming[0]?.starts_at, nowTick) ?? '--'})
                      </div>
                      <div className="td-biome-list">
                        {Array.isArray(biomes.upcoming[0]?.biomes) &&
                          biomes.upcoming[0].biomes.map((biome, i) => (
                            <span className="td-biome-chip" key={i}>
                              <span className="td-biome-chip-icon" />
                              {biome?.final_name ?? biome?.name ?? 'Unknown biome'}
                            </span>
                          ))}
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
                  <span className="td-card-icon">☰</span> Leaderboard Records
                </div>
                <StatusBadge state={sectionState('leaderboardRecords')} />
              </div>

              {records ? (
                <div className="td-record-list">
                  {records?.trove_mastery && (
                    <div className="td-record-row">
                      <div>
                        <div className="td-record-name">Trove Mastery</div>
                        <div className="td-record-holder">{records.trove_mastery?.player_name ?? 'Unknown'}</div>
                      </div>
                      <div className="td-record-value">
                        Lv {records.trove_mastery?.level ?? '—'}
                      </div>
                    </div>
                  )}
                  {records?.geode_mastery && (
                    <div className="td-record-row">
                      <div>
                        <div className="td-record-name">Geode Mastery</div>
                        <div className="td-record-holder">{records.geode_mastery?.player_name ?? 'Unknown'}</div>
                      </div>
                      <div className="td-record-value">
                        Lv {records.geode_mastery?.level ?? '—'}
                        {records.geode_mastery?.capped ? ' (capped)' : ''}
                      </div>
                    </div>
                  )}
                  {records?.power_rank && (
                    <div className="td-record-row">
                      <div>
                        <div className="td-record-name">Power Rank</div>
                        <div className="td-record-holder">{records.power_rank?.player_name ?? 'Unknown'}</div>
                      </div>
                      <div className="td-record-value">{records.power_rank?.value ?? '—'}</div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="td-empty">Leaderboard records are unavailable right now.</div>
              )}
            </section>

            {/* Player lookup */}
            <section
              id="player"
              className="td-card span-2"
              ref={(el) => (sectionRefs.current.player = el)}
            >
              <div className="td-card-header">
                <div className="td-card-title">
                  <span className="td-card-icon">⌕</span> Player Lookup
                </div>
                {playerQuery && <StatusBadge state={sectionState('playerProfile')} />}
              </div>

              {!playerQuery ? (
                <div className="td-player-empty">
                  Search a player name above to see their leaderboard summary.
                </div>
              ) : playerProfile ? (
                <>
                  <div className="td-buff-hero">
                    <div>
                      <div className="td-buff-name">
                        {playerProfile?.player_name ?? playerQuery}
                        {playerProfile?.verified ? ' ✓' : ''}
                      </div>
                      <div className="td-buff-weekday">
                        {playerProfile?.summary?.boards_appeared ?? 0} boards ·{' '}
                        {playerProfile?.summary?.appearances ?? 0} appearances
                      </div>
                    </div>
                  </div>

                  <div className="td-player-summary">
                    <div className="td-player-stat">
                      <div className="td-player-stat-label">Best Rank</div>
                      <div className="td-player-stat-value">
                        {playerProfile?.summary?.best_rank ?? '—'}
                      </div>
                    </div>
                    <div className="td-player-stat">
                      <div className="td-player-stat-label">Best Board</div>
                      <div className="td-player-stat-value">
                        {playerProfile?.summary?.best_rank_board_name ?? '—'}
                      </div>
                    </div>
                  </div>

                  {Array.isArray(playerProfile?.recent) && playerProfile.recent.length > 0 && (
                    <div className="td-player-recent">
                      {playerProfile.recent.slice(0, 6).map((row, i) => (
                        <div className="td-player-recent-row" key={i}>
                          <span>{row?.board_name ?? row?.leaderboard ?? 'Board'}</span>
                          <span>
                            #{row?.rank ?? '—'} · {row?.score ?? '—'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="td-player-empty">
                  No results for "{playerQuery}". Check the spelling and try again.
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}