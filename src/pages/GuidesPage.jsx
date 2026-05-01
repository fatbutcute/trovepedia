import { useEffect } from 'react'
import GuidesList from '../components/GuidesList'
import { useReveal } from '../hooks/useReveal'
import { useNavigate } from "react-router-dom";

export default function GuidesPage() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])
  useReveal()

  return (
    <div className="page-wrapper guides">
      <section>
        <button
          className="btn btn-ghost"
          style={{ marginBottom: '20px' }}
          onClick={() => navigate('/')}
        >
          ← HOME
        </button>
        <p className="guide-label">Community Content</p>
        <h1 className="guides-title">Guides</h1>
        <p className="guide-desc">Community-written, up-to-date guides for all important Trove mechanics.
        </p>
        <GuidesList />
      </section>
    </div>
  )
}
