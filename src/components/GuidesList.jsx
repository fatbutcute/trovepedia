import { useNavigate } from 'react-router-dom'

export const GUIDES_DATA = [

  { tag: 'Bench / Charts Paths', name: 'Optimal building paths: Skill chart, Rune Anvil and more...',                         date: '', slug: 'crafting-paths' },
  { tag: 'Max Light',        name: 'This guide shows you how to maximize your light.',                  date: '',  slug: 'light-system' },
  { tag: 'Leviathans and Torches',        name: 'Leviathans and Torches: which boss to farm and how to obtain permanent torches.',  date: '', slug: 'leviathan-torch' },
  { tag: 'Gardening',        name: 'Gardening guide: plants, yields and farming strategies.',           date: '', slug: 'gardening' },
  { tag: 'Gems', name: 'Learn the proper way to maximize your stats on your gems.',                         date: '', slug: 'gems' },
  { tag: 'Best Ring Abilities',        name: 'Pick the best ring abilities for your classes!',  date: '', slug: 'ring-abilities' },
  { tag: 'All Ring Abilities',        name: 'In this guide, you will find all the ring abilities available for each class.',           date: '', slug: 'all-ring-abilities' },
  { tag: 'Recommended Mods',        name: 'We are recommending the best mods to use in the game.',           date: '', slug: 'recommended-mods' },
  { tag: 'Leaderboard Rewards',        name: 'This guide explains how to earn the basic rewards on the leaderboard.',           date: '', slug: 'leaderboard-rewards' },
  { tag: 'Crystal Gear',        name: 'Learn how to get and maximize your crystal gear.',           date: '', slug: 'crystal-gear' },
  { tag: 'Mystic Gear',        name: 'The end game guide for mystic gear.',           date: '', slug: 'mystic-gear' },
  { tag: 'Geode',        name: 'A complete guide about Geode - the basics, the modules and more...',           date: '', slug: 'geode' },
  { tag: 'Delves',        name: 'Deep into the Delves: learn about the basics, the drops you can find and the mechanics.',           date: '', slug: 'delves' },
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
