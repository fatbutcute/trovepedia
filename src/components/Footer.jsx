import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import StaffCard from './StaffCard'

export default function Footer() {
  const navigate = useNavigate()
  const { langCode, t } = useLanguage()

  // useMemo biztosítja, hogy a linkek és kategóriacímek azonnal frissüljenek nyelvváltáskor
  const FOOTER_LINKS = useMemo(() => ({
    [t('nav.categories.navigation')]: [
      { label: t('nav.guides'), path: '/guides' },
      { label: t('nav.classes'), path: '/classes' },
      /* { label: 'Delve Index', path: '/delve' }, */
      /* { label: 'Rotations', path: '/rotations' }, */
      { label: t('nav.hub'), path: '/hub' },
    ],
    [t('nav.categories.tools')]: [
      /* { label: 'Fishing', path: '/fishing' }, */
      /* { label: 'Calendar', path: '/calendar' }, */
      /* { label: 'Map', path: '/map' }, */
      { label: t('nav.calculators'), path: '/calculators' },
      { label: t('nav.starchart'), path: '/starchart' },
      /*{ label: t('nav.archive'), path: '/archive' },*/
    ],
    [t('nav.categories.community')]: [
      { label: t('nav.discord'), href: 'https://discord.com/invite/trovegame' },
      { label: t('nav.trovesaurus'), href: 'https://trovesaurus.com/' },
      { label: t('nav.contributors'), path: '/contribute' },
      /* { label: 'Clubs', path: '/clubs' }, */
      /*{ label: t('nav.news'), path: '/news' },*/
      /* { label: 'Contact', path: '/contact' }, */
    ],
  }), [langCode, t])

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          
          <button
            className="footer-logo"
            onClick={() => navigate('/')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <span className="diamond"></span>
            <span style={{ fontFamily: 'Blinker', background: 'linear-gradient(135deg, #2bb1ff 0%, #21cbff 50%, #00d4db 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Trovepedia
            </span>
          </button>
          
          <p>{t('footer.tagline') || 'Trovepedia, made by the community.'}</p>
          
          {/*<StaffCard
            discordId="371018267768389633"
            name="ScaryZ"
            role="Developer"
          />*/}
          
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
        <span>{t('footer.copyright') || '© 2026 Trovepedia - Not affiliated with Gamigo AG!'}</span>
      </div>
    </footer>
  )
}