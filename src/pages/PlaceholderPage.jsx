import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PlaceholderPage({ icon = '🚧', title = 'Soon!', desc = 'This page is under development.' }) {
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
