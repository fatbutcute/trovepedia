import { useNavigate } from 'react-router-dom'

const FEATURES = [
  {
    icon: '📖', accent: 'gold', path: '/guides',
    title: 'Guides',
    desc:  'Detailed, community-written guides for advancement, farming, and understanding game mechanics.',
  },
  {
    icon: '⚔️', accent: 'cyan', path: '/classes',
    title: 'Classes',
    desc:  'Discover all classes: their characteristics, best builds, and tips for effective gameplay.',
  },
  {
    icon: '🌀', accent: 'purple', path: '/delve',
    title: 'Delve Index',
    desc:  'Complete delve index for optimizing your progression — with the best strategies at every level.',
  },
  {
    icon: '🔄', accent: 'green', path: '/rotations',
    title: 'Rotations',
    desc:  'Current D15 rotations and a calendar of all daily/weekly events in one place.',
  },
  {
    icon: '🐟', accent: 'red', path: '/fishing',
    title: 'Fishing',
    desc:  'Complete fishing database: locations, rarities, and a collection system for tracking your progress.'
  },
  {
    icon: '💡', accent: 'blue', path: '/calculator',
    title: 'PR Calculators',
    desc:  'Precise formulas and calculation methods for determining and optimizing your true power.',
  },
]

export default function Features() {
  const navigate = useNavigate()

  return (
    <section>
      <p className="section-label">Navigation</p>
      <h2 className="section-title">What do you find here?</h2>
      <p className="section-desc">
        Everything you need to advance in Trove — for beginners and veterans alike.
      </p>

      <div className="cards">
        {FEATURES.map(({ icon, accent, path, title, desc }) => (
          <div
            key={title}
            className="card reveal"
            data-accent={accent}
            onClick={() => navigate(path)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate(path)}
          >
            <div className="card-icon">{icon}</div>
            <div className="card-title">{title}</div>
            <div className="card-desc">{desc}</div>
            <div className="card-arrow">View →</div>
          </div>
        ))}
      </div>
    </section>
  )
}
