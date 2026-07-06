import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'Guides',      path: '/guides' },
  { label: 'Classes',     path: '/classes' },
  /* { label: 'Delve Index', path: '/delve' }, */
  { label: 'Rotations',   path: '/rotations' },
  { label: 'Archive',     path: '/archive' },
  { label: 'Star Chart',  path: '/starchart' },
  { label: 'Clubs',       path: '/clubs' },
  { label: 'News',        path: '/news' },
  { label: 'Fishing',     path: '/fishing' },
]

export default function Navbar() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  // Close drawer on route change
  useEffect(() => { setIsOpen(false) }, [location.pathname])

  // Close drawer on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setIsOpen(false) }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const goHome = () => navigate('/')

  return (
    <>
      <nav>
        {/* Logo */}
        <button className="nav-logo" onClick={goHome}>
          <span className="diamond" />
          <div className="nav-logo-text">
            <span className="nav-logo-title">Trovepedia</span>
            <span className="nav-logo-sub">made by community</span>
          </div>
        </button>

        {/* Desktop links */}
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
        </ul>

        {/* Hamburger — mobile only */}
        <button
          className={`nav-hamburger ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(prev => !prev)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`nav-drawer ${isOpen ? 'open' : ''}`}
        aria-hidden={!isOpen}
      >
        <ul>
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
        </ul>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div className="nav-backdrop" onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}