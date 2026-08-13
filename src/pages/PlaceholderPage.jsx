import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { placeholderPageContent } from '../components/guides/content/placeholderPage.content.js'

export default function PlaceholderPage({ icon = '🚧', title, desc }) {
  const navigate = useNavigate()
  const { langCode } = useLanguage()
  
  const c = placeholderPageContent[langCode] || placeholderPageContent.en

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])

  // Prop felülbírálás lehetőség megtartása, alapértelmezetten a fordítás lép életbe
  const displayTitle = title || c.title
  const displayDesc = desc || c.desc

  return (
    <div className="page-wrapper">
      <div className="placeholder-page">
        <div style={{ fontSize: '4rem' }}>{icon}</div>
        <h2>{displayTitle}</h2>
        <p>{displayDesc}</p>
        <button
          className="btn btn-ghost"
          style={{ marginTop: '16px' }}
          onClick={() => navigate('/')}
        >
          {c.homeBtn}
        </button>
      </div>
    </div>
  )
}