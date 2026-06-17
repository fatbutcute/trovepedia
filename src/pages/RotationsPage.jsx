import { useState, useEffect, useCallback, useMemo } from 'react'
import { getLongShadeRotation, formatCountdown } from '../lib/rotations'
import { useReveal } from '../hooks/useReveal'
import './RotationsPage.css'
import StaffCard from '../components/StaffCard'

const SLOTS_TO_SHOW = 4

// ─── FLOATING NAVIGATION CONFIG ───
const ROTATION_TABS = [
  { id: 'd15', label: 'D15 Biomes', icon: 'rotation' },
  { id: 'challenge', label: 'Dragon Challenge', icon: 'challenge' }, 
  { 
    id: 'dragons', 
    label: 'Dragons', 
    icon: 'dragon',
    subItems: [
      { id: 'corruxion', label: 'Corruxion' },
      { id: 'fluxion', label: 'Fluxion' },
      { id: 'Trials', label: 'Trials' }
    ]
  }
]

/* ── Floating Navigation Component ── */
function FloatingNav({ activeTab, setActiveTab }) {
  const [expandedMenu, setExpandedMenu] = useState(null);

  const activeIndex = ROTATION_TABS.findIndex(t => 
    t.id === activeTab || (t.subItems && t.subItems.some(s => s.id === activeTab))
  );

  let currentTabColor = '#00e5ff';
  
  if (activeTab === 'challenge') {
    currentTabColor = '#facc15';
  } else if (
    activeTab === 'dragons' || 
    activeTab === 'corruxion' || 
    activeTab === 'luxion' || 
    activeTab === 'fluxion' ||
    activeTab === 'Trials'
  ) {
    currentTabColor = '#b7003d'; 
  }

  const handleMainClick = (item) => {
    if (item.subItems) {
      setExpandedMenu(expandedMenu === item.id ? null : item.id);
      const isSubActive = item.subItems.some(sub => sub.id === activeTab);
      if (expandedMenu !== item.id && !isSubActive) {
         setActiveTab(item.subItems[0].id);
      }
    } else {
      setActiveTab(item.id);
      setExpandedMenu(null);
    }
  };

  return (
    <nav 
      className="floating-vertical-nav"
      style={{ '--nav-tab-color': currentTabColor }}
    >
      <div 
        className="nav-active-indicator" 
        style={{ transform: `translateY(${-64 + (activeIndex * 64)}px)` }} 
      />
      {ROTATION_TABS.map(item => {
        const isActiveMain = activeTab === item.id || (item.subItems && item.subItems.some(sub => sub.id === activeTab));
        const isExpanded = expandedMenu === item.id;

        return (
          <div key={item.id} className="nav-item-container">
            <button 
              className={`nav-icon-btn ${isActiveMain ? 'active' : ''}`}
              onClick={() => handleMainClick(item)}
              title={item.label}
            >
              <img 
                src={`/icons/${item.icon}.png`} 
                alt={item.label} 
                className="nav-icon-img" 
              />
            </button>

            {item.subItems && (
              <div className={`nav-dropdown ${isExpanded ? 'expanded' : ''}`}>
                 <div className="nav-dropdown-content">
                   {item.subItems.map(sub => (
                      <button 
                        key={sub.id} 
                        className={`nav-sub-btn ${activeTab === sub.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(sub.id)}
                      >
                        {sub.label}
                      </button>
                   ))}
                 </div>
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}

/* ── Animált Custom Dropdown Komponens ── */
function CustomDropdown({ value, options, onChange, label }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="custom-dropdown-container">
      <label className="dropdown-label">{label}</label>
      <div className={`custom-dropdown ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <div className="selected-value">
          {options.find(opt => opt.value === value)?.label || value}
          <i className={`fa-solid fa-chevron-down arrow ${isOpen ? 'up' : ''}`}></i>
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

/* ── Trials Tracker Component ── */
function TrialsTracker() {
  const [view, setView] = useState('calendar');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [timezone, setTimezone] = useState('local'); // Kiválasztott időzóna kulcsa
  
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
  const baseTime = new Date(Date.UTC(1900, 0, 3, 11, 0, 0));
  const cycleLength = 27;

  // Időzónák eltolásának lekérése UTC-hez képest órában mérve
  const getTimezoneOffsetHours = (tz, timestamp) => {
    if (tz === 'utc' || tz === 'gmt') return 0;
    if (tz === 'local') return -(new Date(timestamp).getTimezoneOffset() / 60);
    
    // Fix világidő eltolások (Téli/Nyári időszámítást automatikusan kezelő natív leképezéssel)
    const tzMap = {
      'cet': 'Europe/Paris',
      'est': 'America/New_York',
      'pst': 'America/Los_Angeles'
    };
    
    try {
      const targetTz = tzMap[tz];
      if (!targetTz) return 0;
      
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: targetTz,
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false
      });
      
      const parts = formatter.formatToParts(new Date(timestamp));
      const p = {};
      parts.forEach(part => { if (part.type !== 'literal') p[part.type] = part.value; });
      
      const tzDate = new Date(Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second));
      const geoDiffStr = (tzDate.getTime() - timestamp);
      return Math.round(geoDiffStr / (1000 * 60 * 60));
    } catch (e) {
      const standardOffsets = { 'cet': 1, 'est': -5, 'pst': -8 };
      return standardOffsets[tz] || 0;
    }
  };

const convertToUTC = (localDate, tzName) => {
    const options = {
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      timeZone: tzName, hour12: false
    };
    return new Date(localDate.toLocaleString('en-US', options));
  };

  // 2. EREDETI SEGÉDFÜGGVÉNY: UTC idő konvertálása a cél időzóna helyi idejére
  const convertFromUTC = (utcDate, tzName) => {
    const options = {
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      timeZone: tzName, hour12: false
    };
    return new Date(utcDate.toLocaleString('en-US', options));
  };

  // 3. EREDETI LOGIKA: Az időintervallumok legenerálása hajszálpontosan a kínai script alapján
  const getIntervals = (day) => {
    const intervals = [];
    
    // Meghatározzuk a cél időzóna nevét a React state alapján
    const tzMap = {
    'local': Intl.DateTimeFormat().resolvedOptions().timeZone,
    'utc': 'UTC',
    'cet': 'Europe/Paris',
    'est': 'America/New_York',
    'pst': 'America/Los_Angeles'
    };
    const currentTimezone = tzMap[timezone] || 'UTC';

    // Létrehozzuk az adott naptári nap dátumobjektumát
    const currentDate = new Date(selectedYear, selectedMonth, day);

    // Az eredeti kínai bázisidő (UTC+0: 1900.01.03 11:00)
    const baseTime = new Date(Date.UTC(1900, 0, 3, 11, 0, 0));
    
    const startOfDay = new Date(selectedYear, selectedMonth, day);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(selectedYear, selectedMonth, day);
    endOfDay.setHours(23, 59, 59, 999);
    
    // Konvertálás a beépített transzformációval
    const startOfDayUTC = convertToUTC(startOfDay, currentTimezone);
    
    // Kiszámoljuk a bázisidőtől eltelt órákat és a ciklusindexet (27 órás periódus)
    const hoursSinceBase = (startOfDayUTC.getTime() - baseTime.getTime()) / (1000 * 60 * 60);
    const cycleLength = 27;
    let cycleIndex = Math.floor(hoursSinceBase / cycleLength);
    
    // Ellenőrizzük a környező ciklusokat (-2 és +2 között, ahogy az eredetiben van)
    for (let i = -2; i <= 2; i++) {
      const currentCycle = cycleIndex + i;
      const startTimeUTC = new Date(baseTime.getTime() + currentCycle * cycleLength * 60 * 60 * 1000);
      const endTimeUTC = new Date(startTimeUTC.getTime() + 3 * 60 * 60 * 1000);
      
      // Visszakonvertáljuk a sáv kezdetét a cél időzónára
      const startTimeLocal = convertFromUTC(startTimeUTC, currentTimezone);
      
      // Hajszálpontos egyezőség vizsgálat: Év, Hónap és Nap szinten az eredeti mintára
      if (startTimeLocal.getDate() === currentDate.getDate() &&
          startTimeLocal.getMonth() === currentDate.getMonth() &&
          startTimeLocal.getFullYear() === currentDate.getFullYear()) {
          
          const timeFormat = { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: false,
              timeZone: currentTimezone
          };
          
          // Formázás a natív toLocaleTimeString hívással
          const startFormatted = startTimeUTC.toLocaleTimeString('en-US', timeFormat);
          const endFormatted = endTimeUTC.toLocaleTimeString('en-US', timeFormat);
          
          intervals.push(`${startFormatted} - ${endFormatted}`);
      }
    }
    
    return intervals;
  };

  return (
    
    <div className="rot-tab-content fade-in-up">
      <div className="trials-header">
        <h1 className="rot-title tracker-main-title tracker-title-trials">
          <span className="rot-title-accent" style={{ color: '#ff0077' }}>Trials</span>
        </h1>
        <div className="trials-toggle">
          <div 
            className="toggle-active-bg" 
            style={{ transform: `translateX(${view === 'calendar' ? '0px' : '200px'})` }}
          />
          <button className={view === 'calendar' ? 'active' : ''} onClick={() => setView('calendar')}>Event Calendar</button>
          <button className={view === 'calculator' ? 'active' : ''} onClick={() => setView('calculator')}>Venturine Calculator</button>
        </div>
      </div>
      <p className="trials-credits">Original creators of the trials calendar: <span className="trials-credit-names">Ginnne, __reisalin__, MewsCat, とても残念だ</span></p>
      {view === 'calendar' ? (
        <div key="calendar-view" className="trials-calendar-container fade-in-up">
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
            {/* JAVÍTVA: Dinamikus, működő multi-időzónás legördülő menü */}
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
              const isToday = new Date().getDate() === day && new Date().getMonth() === selectedMonth;
              return (
                <div key={day} className={`calendar-day ${isToday ? 'today' : ''} ${intervals.length > 0 ? 'has-event' : ''}`}>
                  <span className="day-number">{day}</span>
                  {intervals.map((int, idx) => <div key={idx} className="day-interval">{int}</div>)}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div key="calc-view" className="venturine-calc-container fade-in-up">
          <div className="calc-inputs">
            <div className="input-group">
              <label>Initial Cost</label>
              <input 
                type="number" 
                className="calc-input-field"
                value={startCost} 
                min="7" 
                onChange={(e) => setStartCost(e.target.value)} 
              />
            </div>
            <div className="input-group">
              <label>Production Quantity</label>
              <input 
                type="number" 
                className="calc-input-field"
                value={produceCount} 
                min="1" 
                onChange={(e) => setProduceCount(e.target.value)} 
              />
            </div>
          </div>
          <div className="calc-result">
            <h3>Total Materials Needed</h3>
            <div className="result-value">{calcTotal}</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Format helpers & Sub-components ── */
function formatTimeLeft(ms) {
  if (ms < 0) return '0d 0h 0m 0s'
  const d = Math.floor(ms / (1000 * 60 * 60 * 24))
  const h = Math.floor((ms / (1000 * 60 * 60)) % 24)
  const m = Math.floor((ms / 1000 / 60) % 60)
  const s = Math.floor((ms / 1000) % 60)
  return `${d}d ${h}h ${m}m ${s}s`
}

function CountdownDisplay({ value }) {
  const parts = value.split(':')
  return (
    <span className="countdown-display">
      {parts.map((part, pi) => (
        <span key={pi} className="countdown-group">
          {part.split('').map((ch, ci) => (
            <span key={ci} className="countdown-digit">{ch}</span>
          ))}
          {pi < parts.length - 1 && <span className="countdown-sep">:</span>}
        </span>
      ))}
    </span>
  )
}

function BiomeCard({ biome, index }) {
  return (
    <div 
      className="biome-card reveal" 
      style={{ '--biome-color': biome.color, animationDelay: `${index * 50}ms` }}
    >
      <div className="biome-img-wrapper">
        <img 
          src={`/images/biomes/${biome.image}`} 
          alt={biome.name} 
          className="biome-img"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      </div>
      <div className="biome-info">
        <span className="biome-name">{biome.name}</span>
      </div>
    </div>
  )
}

function RotationSlot({ slot, index, countdown }) {
  const isCurrent = index === 0
  const timeInfo = isCurrent 
    ? `${countdown}` 
    : `${new Date(slot.start).toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' })} ➔ ${new Date(slot.end).toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' })}`

  return (
    <div className={`rotation-slot reveal ${isCurrent ? 'slot-current' : 'slot-future'}`}>
      <div className="biome-grid">
        {slot.biomes.map((b, i) => (
          <BiomeCard key={`${b.name}-${i}`} biome={b} index={i} />
        ))}
      </div>
      <div className="slot-header">
        <span className="slot-timer-text">{timeInfo}</span>
      </div>
    </div>
  )
}

function D15Rotations() {
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [countdown, setCountdown] = useState('--:--:--')

  const loadSlots = useCallback(async () => {
    try {
      const results = await Promise.all(
        Array.from({ length: SLOTS_TO_SHOW }, (_, i) => getLongShadeRotation(i))
      )
      setSlots(results)
      setError(null)
    } catch (err) {
      setError('Could not load rotations.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadSlots() }, [loadSlots])

  useEffect(() => {
    if (!slots[0]) return
    const tick = () => {
      setCountdown(formatCountdown(slots[0].end))
      if (Date.now() >= slots[0].end) loadSlots()
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [slots, loadSlots])

  useReveal([slots])

  return (
    <div className="rot-tab-content fade-in-up">
      <header className="rot-hero">
                    <div className="rot-credits">
            <div className="rot-credits-titles">
                <span className="rot-d15">Rotation Systems by</span>
              <span className="rot-credits-text">D15 Rotation Systems built by</span>
            </div>
            <StaffCard discordId="346016772664721418" name="NZ" role="Developer, Soruden" />
          </div>
        <div className="rot-hero-left">
          <h1 className="rot-title">
            <span className="rot-title-accent"> D15</span>
            <span className="rot-title-plain"> Rotations</span>
          </h1>
          <p className="rot-desc">Track the current and upcoming D15 biome rotations in real time.</p>
        </div>
        <div className="rot-hero-right">
          <div className="rot-stats-panel">
            <div className="rot-stat"><span className="rot-stat-num">{SLOTS_TO_SHOW}</span><span className="rot-stat-label">Slots shown</span></div>
            <div className="rot-stat-divider" />
            <div className="rot-stat"><span className="rot-stat-num">3h</span><span className="rot-stat-label">Rotation cycle</span></div>
            <div className="rot-stat-divider" />
            <div className="rot-stat"><span className="rot-stat-num">{slots[0]?.biomes?.length ?? '—'}</span><span className="rot-stat-label">Biomes / slot</span></div>
          </div>
        </div>
      </header>

      {loading && <div className="rotation-loading"><div className="rotation-spinner" /><span>Fetching live rotation data…</span></div>}
      {error && <div className="rotation-error"><span className="rot-error-icon">⚠</span><span>{error}</span><button className="rot-retry-btn" onClick={loadSlots}>Retry</button></div>}
      
      {!loading && !error && (
        <div className="rotation-list">
          {slots.map((slot, i) => <RotationSlot key={slot.start} slot={slot} index={i} countdown={countdown} />)}
        </div>
      )}
    </div>
  )
}

function ChallengeTracker() {
  const [timeLeft, setTimeLeft] = useState('')
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const minutes = now.getMinutes()
      const seconds = now.getSeconds()

      if (minutes < 20) {
        setIsActive(true)
        setTimeLeft(`${19 - minutes}m ${59 - seconds}s`)
      } else {
        setIsActive(false)
        setTimeLeft(`${59 - minutes}m ${59 - seconds}s`)
      }
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="rot-tab-content fade-in-up">
      <h1 className="rot-title"><span className="rot-title-accent">Hourly</span> Challenge</h1>
      <p className="rot-desc">Dragon challenges occur at the top of every hour and last for 20 minutes.</p>
      <div className={`challenge-box ${isActive ? 'live' : 'waiting'}`}>
        <div className="status-badge">{isActive ? 'LIVE NOW' : 'NEXT CHALLENGE IN'}</div>
        <div className="massive-timer">{timeLeft}</div>
        <p className="rot-desc" style={{ marginTop: '20px', color: isActive ? '#4ade80' : '#6c778a' }}>
          {isActive ? "The dragon challenge is currently active! Jump into the game!" : "Waiting for the next hour to strike..."}
        </p>
      </div>
    </div>
  )
}

function NPCTracker({ name, anchorUTC, accentColor, description }) {
  const [timeLeft, setTimeLeft] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [targetDate, setTargetDate] = useState(null)

  useEffect(() => {
    const CYCLE_MS = 14 * 24 * 60 * 60 * 1000
    const DURATION_MS = 3 * 24 * 60 * 60 * 1000

    const tick = () => {
      const now = Date.now()
      const diff = now - anchorUTC
      const cyclesPassed = Math.floor(diff / CYCLE_MS)
      const currentStart = anchorUTC + (cyclesPassed * CYCLE_MS)
      const currentEnd = currentStart + DURATION_MS

      if (now >= currentStart && now < currentEnd) {
        setIsActive(true)
        setTargetDate(currentEnd)
        setTimeLeft(formatTimeLeft(currentEnd - now))
      } else {
        setIsActive(false)
        const nextStart = currentStart + CYCLE_MS
        setTargetDate(nextStart)
        setTimeLeft(formatTimeLeft(nextStart - now))
      }
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [anchorUTC])

  const formatDate = (ms) => {
    if (!ms) return ''
    return new Date(ms).toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  const titleColorClass = name.toLowerCase() === 'luxion' ? 'tracker-title-luxion' : 'tracker-title-corruxion';

  return (
    <div className="rot-tab-content fade-in-up">
      <h1 className={`rot-title tracker-main-title ${titleColorClass}`}>
        <span className="rot-title-accent" style={{ color: accentColor }}>{name}</span>
      </h1>
      <p className="rot-desc">{description}</p>
      <div className={`challenge-box ${isActive ? 'live' : 'waiting'}`} style={isActive ? {borderColor: accentColor, boxShadow: `0 0 30px ${accentColor}33`} : {}}>
        <div className="status-badge" style={isActive ? {backgroundColor: accentColor, color: '#000'} : {}}>
          {isActive ? 'ARRIVED & ACTIVE' : 'NEXT APPEARANCE IN'}
        </div>
        <div className="massive-timer">{timeLeft}</div>
        <div className="rot-target-date" style={{marginTop: '25px', color: '#6c778a', fontSize: '1.1rem', fontWeight: '700'}}>
          {isActive ? 'Leaves at: ' : 'Arrives at: '} 
          <span style={{color: '#fff', marginLeft: '5px'}}>{formatDate(targetDate)}</span>
        </div>
      </div>
    </div>
  )
}

function FluxionTracker({ name, anchorUTC, accentColor, description }) {
  const [timeLeft, setTimeLeft] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [targetDate, setTargetDate] = useState(null)

useEffect(() => {
  const CYCLE_MS = 14 * 24 * 60 * 60 * 1000;       // 14 napos teljes ciklus
  const DURATION_MS = 3 * 24 * 60 * 60 * 1000;     // Az aktív időszak hossza (3 nap)

  // Beállítjuk a kiindulópontot a MAI napra (Kedd), pontosan 13:00-ra
  const baseStart = new Date();
  baseStart.setHours(13, 0, 0, 0); // Kedd 13:00:00.000
  
  // Ha a "baseStart" valamilyen okból a jövőben lenne az első futáskor, 
  // vagy ha egy korábbi ciklus startját akarjuk megkapni:
  let initialAnchor = baseStart.getTime();

  const tick = () => {
    const now = Date.now();
    
    // Kiszámoljuk, hogy a Kedd 13:00-hoz képest hol járunk a 14 napos ciklusban
    let diff = now - initialAnchor;
    
    // Ha az időben visszafelé számolnánk (pl. a legelső ciklus előtt vagyunk), eltoljuk az anchort
    if (diff < 0) {
      const cyclesToBacktrack = Math.ceil(Math.abs(diff) / CYCLE_MS);
      initialAnchor -= cyclesToBacktrack * CYCLE_MS;
      diff = now - initialAnchor;
    }

    const cyclesPassed = Math.floor(diff / CYCLE_MS);
    
    // A jelenlegi 14 napos ciklus pontos kezdete (mindig egy keddi nap 13:00)
    const currentStart = initialAnchor + (cyclesPassed * CYCLE_MS);
    const currentEnd = currentStart + DURATION_MS;

    // Ellenőrzés: Kedd 13:00 és Péntek 13:00 között vagyunk-e?
    if (now >= currentStart && now < currentEnd) {
      setIsActive(true);
      setTargetDate(currentEnd);
      setTimeLeft(formatTimeLeft(currentEnd - now));
    } else {
      setIsActive(false);
      
      // Ha a mostani kedd 13:00-as rajt már elmúlt (és a 3 nap is lement), 
      // akkor a következő célpont a 14 nappal későbbi Kedd 13:00 lesz
      const nextStart = now >= currentEnd ? currentStart + CYCLE_MS : currentStart;
      
      setTargetDate(nextStart);
      setTimeLeft(formatTimeLeft(nextStart - now));
    }
  };

  tick();
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}, []); // Az anchorUTC-t ki is veheted a függőségekből, mert a kód most már magától legenerálja a mait

  const formatDate = (ms) => {
    if (!ms) return ''
    return new Date(ms).toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="rot-tab-content fade-in-up">
      <h1 className="rot-title tracker-main-title tracker-title-fluxion">
        <span className="rot-title-accent" style={{ color: accentColor } }>{name}</span>
      </h1>
      <p className="rot-desc">{description}</p>
      <div className={`challenge-box fluxion-box ${isActive ? 'live' : 'waiting'}`}>
        <div className={`status-badge ${isActive ? 'fluxion-badge-live' : 'fluxion-badge-waiting'}`}>
          {isActive ? 'VOTING PHASE ACTIVE' : 'NEXT VOTING PHASE IN'}
        </div>
        <div className="massive-timer fluxion-massive-timer">{timeLeft}</div>
        <div className="rot-target-date" style={{marginTop: '25px', color: '#6c778a', fontSize: '1.1rem', fontWeight: '700'}}>
          {isActive ? 'Voting ends at: ' : 'Voting starts at: '} 
          <span style={{color: '#fff', marginLeft: '5px'}}>{formatDate(targetDate)}</span>
        </div>
      </div>
    </div>
  )
}

export default function RotationsPage() {
  const [activeTab, setActiveTab] = useState(ROTATION_TABS[0].id)

  const CORRUXION_ANCHOR = Date.UTC(2026, 4, 15, 11, 0, 0)
  const LUXION_ANCHOR = Date.UTC(2026, 4, 22, 11, 0, 0)
  const FLUXION_ANCHOR = Date.UTC(2026, 4, 18, 11, 0, 0)
  const TRIALS_ANCHOR = Date.UTC(1900, 0, 3, 11, 0, 0)

  return (
    <>
      <FloatingNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="page-wrapper rotations">
        <div className="rot-bg-orb rot-bg-orb--a" aria-hidden="true" />
        <div className="rot-bg-orb rot-bg-orb--b" aria-hidden="true" />
        <div className="rot-bg-grid" aria-hidden="true" />
        <div className="rot-main-layout">
          <main className="rot-content-area">
            {activeTab === 'd15' && <D15Rotations />}
            {activeTab === 'challenge' && <ChallengeTracker />}
            {activeTab === 'luxion' && <NPCTracker name="Luxion" anchorUTC={LUXION_ANCHOR} accentColor="#ff9100" description="Luxion accepts Dragon Coins in exchange for rare mounts, allies and more." />}
            {activeTab === 'corruxion' && <NPCTracker name="Corruxion" anchorUTC={CORRUXION_ANCHOR} accentColor="#a855f7" description="Corruxion emerges from the shadows on the weekends when Luxion rests. He offers void-themed items and sinister rewards." />}
            {activeTab === 'fluxion' && <FluxionTracker name="Fluxion" anchorUTC={FLUXION_ANCHOR} accentColor="#fbff00" description="Fluxion visits the Hub to offer community-voted rewards in exchange for Flux." />}
            {activeTab === 'Trials' && <TrialsTracker name="Trials" anchorUTC={TRIALS_ANCHOR} accentColor="#b7003d" description="Track speed police schedule and calculate materials." />}
          </main>
        </div>
      </div>
    </>
  )
}