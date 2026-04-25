import { useEffect } from 'react'
import GuidesList from '../components/GuidesList'
import { useReveal } from '../hooks/useReveal'
import { useNavigate } from "react-router-dom";

export default function GuidesPage() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])
  useReveal()

  return (
    <div className="page-wrapper">
      <section>
        <button
          className="btn btn-ghost"
          style={{ marginBottom: '20px' }}
          onClick={() => navigate('/')}
        >
          ← HOME
        </button>
        <p className="section-label" style={{ fontFamily: 'Blinker', fontSize: '1.2em' }}>Community Content</p>
        <h1 className="section-title" style={{ fontFamily: 'Blinker', fontSize: '2em' }}>Guides</h1>
        <p className="section-desc" style={{ fontFamily: 'SFProDisplay', fontSize: '1.3em' }}>Community-written, up-to-date guides for all important Trove mechanics.
        </p>
        <GuidesList />
      </section>
    </div>
  )
}
