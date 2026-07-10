import { useNavigate } from 'react-router-dom'
import StaffCard from './StaffCard'

const FOOTER_LINKS = {
  Navigation: [
    { label: 'Guides',  path: '/guides' },
    { label: 'Classes',  path: '/classes' },
    /* { label: 'Delve Index',path: '/delve' }, */
    { label: 'Rotations',   path: '/rotations' },



  ],
  Tools: [

    /* { label: 'Fishing', path: '/fishing' }, */
    /* { label: 'Calendar',        path: '/calendar' }, */
    /* { label: 'Map',        path: '/map' }, */
    
    { label: 'Calculators', path: '/calculators' },
    { label: 'Star Chart', path: '/starchart' },
    { label: 'Archive', path: '/archive' },
  ],
  Community: [
    { label: 'Trove - Discord',        href: 'https://discord.com/invite/trovegame' },
    { label: 'Trovesaurus',    href: 'https://trovesaurus.com/' },
    { label: 'Contributors',   path: '/contribute' },
    { label: 'Clubs', path: '/clubs' },
    { label: 'News', path: '/news' },
    /* { label: 'Contact',      path: '/contact' }, */
  ],
}

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer>
      <div className="footer-inner">
      <div className="footer-brand">
        
        {/* JAVÍTVA: nav-logo lecserélve footer-logo-ra */}
        <button
          className="footer-logo"
          onClick={() => navigate('/')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <span className="diamond"></span>
          <span style={{ fontFamily: 'Blinker', background: 'linear-gradient(135deg, #2bb1ff 0%, #21cbff 50%, #00d4db 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Trovepedia</span>
        </button>
        
        <p>Trovepedia, made by the community.</p>
        
        {/*<StaffCard
          discordId="371018267768389633"
          name="ScaryZ"
          role="Developer"
        />      */   }
        
      </div>

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
        <span>© 2026 Trovepedia - Not affiliated with Gamigo AG!</span>
      </div>
    </footer>
  )
}
