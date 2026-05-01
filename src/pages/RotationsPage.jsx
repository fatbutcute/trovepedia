import { useState, useEffect, useCallback } from 'react'
import { getLongShadeRotation, formatCountdown } from '../lib/rotations'
import { useReveal } from '../hooks/useReveal'
import './RotationsPage.css'
import StaffCard from '../components/StaffCard'

const SLOTS_TO_SHOW = 4   // jelenlegi + 3 következő

// ─── BiomeCard ────────────────────────────────────────────────────────────────

function BiomeCard({ biome, index }) {
  return (
    <div
      className="biome-card reveal"
      style={{ '--biome-color': biome.color, animationDelay: `${index * 80}ms` }}
    >
      <div className="biome-card-glow" />
      <div className="biome-img-wrapper">
        <img
          src={`/images/biomes/${biome.image}`}
          alt={biome.name}
          className="biome-img"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      </div>
      <div className="biome-name">{biome.name}</div>
    </div>
  )
}

// ─── RotationSlot ─────────────────────────────────────────────────────────────

function RotationSlot({ slot, index, countdown }) {
  const isCurrent = index === 0
  const timeLabel = isCurrent
    ? `Next rotation in: ${countdown}`
    : new Date(slot.start).toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className={`rotation-slot reveal ${isCurrent ? 'slot-current' : 'slot-future'}`}>
      {/* Fejléc */}
      <div className="slot-header">
        <div className="slot-label-wrapper">
          {isCurrent && <span className="slot-live-dot" />}
          <span className="slot-label">{isCurrent ? 'Current Rotation' : `+${index} Rotation`}</span>
        </div>
        <span className="slot-time">{timeLabel}</span>
      </div>

      {/* Biome kártyák */}
      <div className="biome-grid">
        {slot.biomes.map((b, i) => (
          <BiomeCard key={`${b.name}-${i}`} biome={b} index={i} />
        ))}
      </div>
    </div>
  )
}

// ─── RotationsPage ────────────────────────────────────────────────────────────

export default function RotationsPage() {
  const [slots,     setSlots]     = useState([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)
  const [countdown, setCountdown] = useState('--:--:--')

  // Rotációk betöltése
  const loadSlots = useCallback(async () => {
    try {
      const results = await Promise.all(
        Array.from({ length: SLOTS_TO_SHOW }, (_, i) => getLongShadeRotation(i))
      )
      setSlots(results)
      setError(null)
    } catch (err) {
      setError('Nem sikerült betölteni a rotációkat.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadSlots() }, [loadSlots])

  // Visszaszámláló + automatikus frissítés rotáció-váltáskor
  useEffect(() => {
    if (!slots[0]) return

    const tick = () => {
      const cd = formatCountdown(slots[0].end)
      setCountdown(cd)

      // Ha lejárt, töltsük újra a rotációkat
      if (Date.now() >= slots[0].end) loadSlots()
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [slots, loadSlots])

  useReveal([slots])

  return (
    <div className="page-wrapper rotations">
      <section>
        <div className='d15rotnz'><p className="d15-system">Rotation Systems by <span className='NZ'>NZ</span></p>
  <StaffCard 
    discordId="346016772664721418" 
    name="NZ" 
    role="Developer, Soruden" 
  />
</div>

        {/* Fejléc */}
        <p className="section-label">Live Data</p>
        <h1 className="section-title-d15"><span className='d15'>D15</span> Rotations</h1>
        <p className="section-desc-rot">
          The current and upcoming D15 biome rotations — automatically updated every 3 hours.
        </p>

        {/* Tartalom */}
        {loading && (
          <div className="rotation-loading">
            <div className="rotation-spinner" />
            <span>Rotations loading…</span>
          </div>
        )}

        {error && (
          <div className="rotation-error">
            ⚠️ {error}
            <button className="btn btn-ghost" onClick={loadSlots} style={{ marginTop: 16 }}>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="rotation-list">
            {slots.map((slot, i) => (
              <RotationSlot
                key={slot.start}
                slot={slot}
                index={i}
                countdown={countdown}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
