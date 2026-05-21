import { useState, useEffect, useCallback } from 'react'
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
      { id: 'luxion', label: 'Luxion' },
      { id: 'fluxion', label: 'Fluxion' }
    ]
  }
]

/* ── Floating Navigation Component ── */
function FloatingNav({ activeTab, setActiveTab }) {
  const [expandedMenu, setExpandedMenu] = useState(null);

  const activeIndex = ROTATION_TABS.findIndex(t => 
    t.id === activeTab || (t.subItems && t.subItems.some(s => s.id === activeTab))
  );

  // Kiszámoljuk az éppen aktív fül színét a kérésed alapján
  let currentTabColor = '#00e5ff'; // Alapértelmezett kék (d15)
  
  if (activeTab === 'challenge') {
    currentTabColor = '#facc15'; // Sárga a Challenge fülhöz
  } else if (activeTab === 'dragons' || activeTab === 'corruxion' || activeTab === 'luxion' || activeTab === 'fluxion') {
    currentTabColor = '#b7003d'; // Bordóspiros a Dragon fülekhez
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
      /* Átadjuk a CSS-nek a dinamikusan változó színt változóként */
      style={{ '--nav-tab-color': currentTabColor }}
    >
      <div 
        className="nav-active-indicator" 
        style={{ transform: `translateY(${24 + (activeIndex * 64)}px)` }} 
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
      {/* JAVÍTVA: A .biome-card-bg és .biome-card-shine (a csík) teljesen el lett távolítva! */}
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
      
      {/* 1. A biom kártyák rácsa jön előre (balra) */}
      <div className="biome-grid">
        {slot.biomes.map((b, i) => (
          <BiomeCard key={`${b.name}-${i}`} biome={b} index={i} />
        ))}
      </div>

      {/* 2. Az időzítő blokkja hátra kerül (jobbra) */}
      <div className="slot-header">
        <span className="slot-timer-text">{timeInfo}</span>
      </div>

    </div>
  )
}

/* ── Content Trackers ── */
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

  return (
    <div className="rot-tab-content fade-in-up">
      <h1 className="rot-title"><span className="rot-title-accent" style={{color: accentColor}}>{name}</span> Tracker</h1>
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

  return (
    <div className="rot-tab-content fade-in-up">
      {/* Kizárólag a {name} (Fluxion) szó kapja meg az accentColor-t! A "Tracker" szó tiszta fehér marad */}
      <h1 className="rot-title tracker-main-title tracker-title-fluxion">
        <span className="rot-title-accent" style={{ color: accentColor }}>{name}</span> Tracker
      </h1>
      <p className="rot-desc">{description}</p>
      
      {/* A doboz megkapta a fluxion-box osztályt, nulla inline stílussal */}
      <div className={`challenge-box fluxion-box ${isActive ? 'live' : 'waiting'}`}>
        
        {/* ÚJ OSZTÁLYOK: fluxion-badge-live és fluxion-badge-waiting a feliratnak */}
        <div className={`status-badge ${isActive ? 'fluxion-badge-live' : 'fluxion-badge-waiting'}`}>
          {isActive ? 'VOTING PHASE ACTIVE' : 'NEXT VOTING PHASE IN'}
        </div>
        
        {/* ÚJ OSZTÁLY: fluxion-massive-timer a nagy órának */}
        <div className="massive-timer fluxion-massive-timer">{timeLeft}</div>
        
        {/* ÚJ OSZTÁLY: fluxion-target-date az alsó érkezési szövegnek */}
        <div className="rot-target-date fluxion-target-date">
          {isActive ? 'Voting ends at: ' : 'Voting starts at: '} 
          <span className="fluxion-date-highlight">{formatDate(targetDate)}</span>
        </div>
      </div>
    </div>
  )
}

/* ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── */

export default function RotationsPage() {
  const [activeTab, setActiveTab] = useState(ROTATION_TABS[0].id)
  const CORRUXION_ANCHOR = Date.UTC(2026, 4, 15, 11, 0, 0)
  const LUXION_ANCHOR = Date.UTC(2026, 4, 22, 11, 0, 0)
  const FLUXION_ANCHOR = Date.UTC(2026, 4, 18, 11, 0, 0)

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
            {activeTab === 'luxion' && <NPCTracker name="Luxion" anchorUTC={LUXION_ANCHOR} accentColor="#facc15" description="Luxion accepts Dragon Coins in exchange for rare mounts, allies and more." />}
            {activeTab === 'corruxion' && <NPCTracker name="Corruxion" anchorUTC={CORRUXION_ANCHOR} accentColor="#a855f7" description="Corruxion emerges from the shadows on the weekends when Luxion rests. He offers void-themed items and sinister rewards." />}
            {activeTab === 'fluxion' && <FluxionTracker name="Fluxion" anchorUTC={FLUXION_ANCHOR} accentColor="#ff0055" description="Fluxion visits the Hub to offer community-voted rewards in exchange for Flux." />}
          </main>
    
            <div className="rot-credits">
            <div className="rot-credits-titles">
                <span className="rot-d15"><span className="d15">D15</span> Rotation System by</span>
              <span className="rot-credits-text">D15 Rotation System built by</span>
            </div>
            <StaffCard discordId="346016772664721418" name="NZ" role="Developer, Soruden" />
          </div>
        </div>
      </div>
    </>
  )
}