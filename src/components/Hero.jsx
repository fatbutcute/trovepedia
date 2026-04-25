import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import bgImage from '../img/background.png';

export default function Hero() {
  const navigate = useNavigate()

  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  // 🖱️ MOUSE TRACK
  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30
      const y = (e.clientY / window.innerHeight - 0.5) * 30

      setMouse({ x, y })
    }

    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

return (
  <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>

    {/* BACKGROUND */}
<div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transform: `translate(${mouse.x}px, ${mouse.y}px) scale(1.08)`,
        transition: "transform 0.2s ease-out",
        filter: "brightness(0.6) contrast(1.1)"
      }}
    />

    {/* OVERLAY */}
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        background:
          "linear-gradient(45deg, #030924 , #000 100%)"
      }}
    />

    {/* CONTENT */}
    <div className="hero" style={{ position: "relative", zIndex: 2 }}>

      <h1>
        <span className="Trovepedia">Trovepedia</span>
      </h1>

      <p className="hero-eyebrow">
        BY ONE AND ONLY TROVEPEDIA COMMUNITY
      </p>

      <p className="hero-sub">
        Guides, classes, delve index and more — all in one place.
      </p>

      <div className="hero-buttons">
        <button className="btn btn-primary" onClick={() => navigate('/guides')}>
          Guides →
        </button>

        <button className="btn btn-ghost" onClick={() => navigate('/classes')}>
          Discover Classes
        </button>
      </div>

    </div>

    {/* 🔥 BOTTOM FADE */}
<div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "320px",
        zIndex: 2,
        pointerEvents: "none",
        // JAVÍTÁS: Átlátszóból indul (0%), és fokozatosan lesz sötétkék (100%)
        background: "linear-gradient(to bottom, transparent 0%, #070d2b 100%)"
      }}
    />

  </div>
)
}