import { useEffect } from 'react'
import Hero       from '../components/Hero'
import StatsStrip from '../components/StatsStrip'
import Features   from '../components/Features'
import GuidesList from '../components/GuidesList'
import { useReveal } from '../hooks/useReveal'
import Dashboard  from '../components/Dashboard'

export default function Home() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])

  useReveal()

  return (
    <>
      <Hero />
      <Dashboard />
      <div className="divider" />

      <StatsStrip />

      <Features />

      <div className="divider" />

      {/* Útmutatók előnézet */}
      <section id="guides">
        <p className="section-label">Up to date content</p>
        <h2 className="section-title">Guides</h2>
        <p className="section-desc">
          Community-written, up-to-date guides for all important Trove mechanics.
        </p>
        <GuidesList limit={5} />
      </section>
    </>
  )
}
