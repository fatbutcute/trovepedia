import { useNavigate } from 'react-router-dom'

const FEATURES = [
  {
    icon: '/icons/bookmark.png', 
    accent: 'gold', 
    path: '/guides',
    title: 'Guides',
    desc:  'Detailed, community-written guides for advancement, farming, and understanding game mechanics.',
  },
  {
    icon: '/icons/human.png', 
    accent: 'cyan', 
    path: '/classes',
    title: 'Classes',
    desc:  'Discover all classes: their characteristics, best builds, and tips for effective gameplay.',
  },
  {
    icon: '/icons/pickaxe.png', 
    accent: 'purple', 
    path: '/delve',
    title: 'Delve Index',
    desc:  'Complete delve index for optimizing your progression — with the best strategies at every level.',
  },
  {
    icon: '/icons/time.png', 
    accent: 'green', 
    path: '/rotations',
    title: 'Rotations',
    desc:  'Current D15 rotations and a calendar of all daily/weekly events in one place.',
  },
  {
    icon: '/icons/calendar.png', 
    accent: 'red', 
    path: '/event',
    title: 'Events',
    desc:  'Detailed event guide: find most of the events with their quest line, rewards and more... '
  },
  {
    icon: '/icons/calculator.png', 
    accent: 'blue', 
    path: '/calculator',
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
            {/* ITT VÁLTOZOTT: <img> taget használunk a sima szöveg helyett */}
            <div className="card-icon">
              <img 
                src={icon} 
                alt={title} 
                style={{ width: '35px', height: '35px', objectFit: 'contain' }} 
              />
            </div>
            
            <div className="card-title">{title}</div>
            <div className="card-desc">{desc}</div>
            <div className="card-arrow">View →</div>
          </div>
        ))}
      </div>
    </section>
  )
}