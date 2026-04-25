import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * PlaceholderPage – ideiglenes oldal, amíg az adott szekció nincs implementálva.
 * Props:
 *   icon   – emoji ikon
 *   title  – oldal neve
 *   desc   – rövid leírás
 */
export default function PlaceholderPage({ icon = '🚧', title = 'Hamarosan', desc = 'Ez az oldal fejlesztés alatt áll.' }) {
  const navigate = useNavigate()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])

  return (
    <div className="page-wrapper">
      <div className="placeholder-page">
        <div style={{ fontSize: '4rem' }}>{icon}</div>
        <h2>{title}</h2>
        <p>{desc}</p>
        <button
          className="btn btn-ghost"
          style={{ marginTop: '16px' }}
          onClick={() => navigate('/')}
        >
          ← HOME
        </button>
      </div>
    </div>
  )
}
