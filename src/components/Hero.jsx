import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Hero() {
  const navigate = useNavigate()

  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

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
    <div className="hero">

      <div
        style={{
          position: "absolute",
          top: "-5%", left: "-5%", right: "-5%", bottom: "-5%", 
          zIndex: 0,
          backgroundImage: "url('/images/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translate(${mouse.x}px, ${mouse.y}px) scale(1.05)`,
          transition: "transform 0.2s ease-out, opacity 2s ease, filter 2s ease",
          opacity: loaded ? 1 : 0,
          filter: loaded
            ? "brightness(1) contrast(1.1)"
            : "brightness(0.2) blur(8px)"
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6))"
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        <h1>
          <span className="Trovepedia">Trovepedia</span>
        </h1>

        <p className="hero-eyebrow">
          BY ONE AND ONLY TROVEPEDIA COMMUNITY
        </p>

        <p className="hero-sub">
          Guides, classes, delve index and more - all in one place.
        </p>

        <div className="hero-buttons">
          <button
            className="btn btn-primary"
            onClick={() => navigate('/guides')}
          >
            Guides →
          </button>

          <button
            className="btn btn-ghost"
            onClick={() => navigate('/classes')}
          >
            Discover Classes
          </button>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "320px",
          zIndex: 2,
          pointerEvents: "none",
          background: "linear-gradient(to bottom, transparent 0%, #070d2b 100%)"
        }}
      />

    </div>
  )
}