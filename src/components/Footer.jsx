import { useNavigate } from 'react-router-dom'
import StaffCard from './StaffCard'

const FOOTER_LINKS = {
  Content: [
    { label: 'Guides',  path: '/guides' },
    { label: 'Classes',  path: '/classes' },
    { label: 'Delve Index',path: '/delve' },
    { label: 'Rotations',   path: '/rotations' },
  ],
  Tools: [
    { label: 'PR Calculator', path: '/calculator' },
    { label: 'Fishing',   path: '/fishing' },
    { label: 'Calendar',        path: '/calendar' },
    { label: 'Map',        path: '/map' },
  ],
  Community: [
    { label: 'Discord',        href: 'https://discord.gg/' },
    { label: 'Trovesaurus',    href: 'https://trovesaurus.com/' },
    { label: 'Contribute',   path: '/contribute' },
    { label: 'Contact',      path: '/contact' },
  ],
}

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer>
      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          
          <button
            className="nav-logo"
            onClick={() => navigate('/')}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <span className="diamond">♦</span>
            <span style={{ fontFamily: 'Blinker' }}>Trovepedia</span>
          </button>
          <p>Trovepedia, made by the community.</p>
           <StaffCard
            discordId="371018267768389633"
            name="ScaryZ"
            role="Developer"
          />         
          
        </div>

        {/* Column links */}
        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div key={title} className="footer-col">
            <h4>{title}</h4>
            <ul>
              {links.map(({ label, path, href }) => (
                <li key={label}>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
                  ) : (
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); navigate(path) }}
                    >
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <span>© 2026 Trovepedia — Unofficial site, not affiliated with Gamigo AG!</span>
      </div>
    </footer>
  )
}
