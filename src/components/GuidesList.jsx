import { useNavigate } from 'react-router-dom'

export const GUIDES_DATA = [

  { tag: 'Bench Paths', name: 'Optimal building paths: Skill chart, Rune Anvil and more...',                         date: '', slug: 'crafting-paths' },
  { tag: 'Light',        name: 'The light system complete guide — how to achieve the maximum',                  date: '',  slug: 'light-system' },
  { tag: 'Boss',        name: 'Leviathans and Torches: which boss to farm and how to obtain permanent torches.',  date: '', slug: 'leviathan-torch' },
  { tag: 'Gardening',        name: 'Gardening guide: plants, yields and farming strategies',           date: '', slug: 'gardening' },
]

export default function GuidesList({ limit }) {
  const navigate = useNavigate()
  const guides   = limit ? GUIDES_DATA.slice(0, limit) : GUIDES_DATA

  return (
    <div className="guides-list">
      {guides.map(({ tag, name, date, slug }) => (
        <div
          key={slug}
          className="guide-row reveal"
          onClick={() => navigate(`/guides/${slug}`)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate(`/guides/${slug}`)}
        >
          <span className="guide-tag">{tag}</span>
          <span className="guide-name">{name}</span>
          <span className="guide-date">{date}</span>
        </div>
      ))}
    </div>
  )
}
