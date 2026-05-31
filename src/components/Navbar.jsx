import { useNavigate, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'Guides',  path: '/guides' },
  { label: 'Classes',  path: '/classes' },
  { label: 'Delve Index',path: '/delve' },
  { label: 'Rotations',   path: '/rotations' },
  { label: 'Archive',     path: '/archive' },
  { label: 'Star Chart',  path: '/starchart' },
]

export default function Navbar() {
  const navigate  = useNavigate()
  const location  = useLocation()

  const goHome = () => navigate('/')

  return (
    <nav>
      <button className="nav-logo" onClick={goHome} style={{ background: 'none', border: 'none' }}>
        <span className="diamond" />
        <span style={{ fontFamily: 'MontserratBlack' }}>TROVEPEDIA</span>
      </button>

      <ul className="nav-links">
        {NAV_ITEMS.map(({ label, path }) => (
          <li key={path}>
            <button
              className={location.pathname === path ? 'active' : ''}
              onClick={() => navigate(path)}
            >
              {label}
            </button>
          </li>
        ))}
        <li>
          <a href="https://discord.gg/" target="_blank" rel="noopener noreferrer" className="nav-cta">
            Discord
          </a>
        </li>
      </ul>
    </nav>
  )
}
