import { useNavigate, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'Guides',  path: '/guides' },
  { label: 'Classes',  path: '/classes' },
  { label: 'Delve Index',path: '/delve' },
  { label: 'Rotations',   path: '/rotations' },
  { label: 'Archive',     path: '/archive' },
  { label: 'Star Chart',  path: '/starchart' },
  { label: 'Clubs',       path: '/clubs' },
]

export default function Navbar() {
  const navigate  = useNavigate()
  const location  = useLocation()

  const goHome = () => navigate('/')

  return (
    <nav>
      <button className="nav-logo" onClick={goHome} style={{ background: 'none', border: 'none' }}>
        <span className="diamond" />
{/* Közös tároló doboz, ami függőleges oszloppá rendezi őket, balra vagy középre igazítva */}
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
  
  <span style={{ 
    display: 'block',
    fontFamily: 'MontserratBlack', 
    background: 'linear-gradient(135deg, #2bb1ff 0%, #21cbff 50%, #00d4db 100%)', 
    WebkitBackgroundClip: 'text', 
    backgroundClip: 'text', 
    WebkitTextFillColor: 'transparent', 
    color: 'transparent', 
    fontWeight: '800', 
    fontSize: '1rem'
  }}>
    Trovepedia
  </span>

  <span style={{ 
    display: 'block',
    fontFamily: 'Quicksand', 
    background: 'linear-gradient(135deg, #46ffb2 0%, #00e3f3 50%, #00d3b0 100%)', 
    WebkitBackgroundClip: 'text', 
    backgroundClip: 'text', 
    WebkitTextFillColor: 'transparent', 
    color: 'transparent', 
    fontWeight: '800', 
    fontSize: '0.85rem',
    letterSpacing: '0.5px'
  }}>
    made by community
  </span>

</div>
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
          <a href="https://discord.gg/" target="_blank" rel="noopener noreferrer" className="nav-cta" style={{ display: 'none' }}>
            Discord
          </a>
        </li>
      </ul>
    </nav>
  )
}
