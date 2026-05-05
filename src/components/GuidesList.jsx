import { useNavigate } from 'react-router-dom';
import './GuidesList.css';

export const GUIDES_DATA = [
  { 
    tag: 'Bench / Charts Paths', 
    title: 'Optimal Building Paths', 
    desc: 'Skill chart, Rune Anvil and more...', 
    icon: 'ri-bar-chart-box-line', 
    slug: 'crafting-paths' 
  },
  { 
    tag: 'Max Light', 
    title: 'Maximize Your Light', 
    desc: 'This guide shows you how to maximize your light.', 
    icon: 'ri-sun-line', 
    slug: 'light-system' 
  },
  { 
    tag: 'Leviathans and Torches', 
    title: 'Leviathans & Torches', 
    desc: 'Which boss to farm and how to obtain permanent torches.', 
    icon: 'ri-mickey-line', 
    slug: 'leviathan-torch' 
  },
  { 
    tag: 'Gardening', 
    title: 'Gardening Guide', 
    desc: 'Plants, yields, and farming strategies.', 
    icon: 'ri-seedling-line', 
    slug: 'gardening' 
  },
  { 
    tag: 'Gems', 
    title: 'Maximize Gem Stats', 
    desc: 'Learn the proper way to maximize your stats on your gems.', 
    icon: 'ri-vip-diamond-line', 
    slug: 'gems' 
  },
  { 
    tag: 'Recommended Mods', 
    title: 'Best Game Mods', 
    desc: 'We are recommending the best mods to use in the game.', 
    icon: 'ri-settings-5-line', 
    slug: 'recommended-mods' 
  },
  { 
    tag: 'Best Ring Abilities', 
    title: 'Class Ring Abilities', 
    desc: 'Pick the best ring abilities for your classes!', 
    icon: 'ri-diamond-ring-line', 
    slug: 'ring-abilities' 
  },
  { 
    tag: 'All Ring Abilities', 
    title: 'All Ring Abilities', 
    desc: 'In this guide, you will find all the ring abilities available for each class.', 
    icon: 'ri-diamond-ring-fill', 
    slug: 'all-ring-abilities' 
  },
  { 
    tag: 'Leaderboard Rewards', 
    title: 'Leaderboard Rewards', 
    desc: 'This guide explains how to earn the basic rewards on the leaderboard.', 
    icon: 'ri-trophy-line', 
    slug: 'leaderboard-rewards' 
  },
  { 
    tag: 'Crystal Gear', 
    title: 'Crystal Gear Guide', 
    desc: 'Learn how to get and maximize your crystal gear.', 
    icon: 'ri-shield-flash-line', 
    slug: 'crystal-gear' 
  },
  { 
    tag: 'Mystic Gear', 
    title: 'Mystic Gear', 
    desc: 'The end game guide for mystic gear.', 
    icon: 'ri-sparkling-line', 
    slug: 'mystic-gear' 
  },
  { 
    tag: 'Geode', 
    title: 'Geode Basics', 
    desc: 'A complete guide about Geode - the basics, the modules and more...', 
    icon: 'ri-rocket-2-line', 
    slug: 'geode' 
  },
  { 
    tag: 'Delves', 
    title: 'Deep into the Delves', 
    desc: 'Learn about the basics, the drops you can find and the mechanics.', 
    icon: 'ri-door-open-line', 
    slug: 'delves' 
  },
  { 
    tag: 'Towers and Ships', 
    title: 'How does towers and ships work?', 
    desc: 'Best strategies to farm them, wave management and more...', 
    icon: 'ri-signal-tower-line', 
    slug: 'towers-ships' 
  },
];

export default function GuidesList({ limit }) {
  const navigate = useNavigate();
  const guides = limit ? GUIDES_DATA.slice(0, limit) : GUIDES_DATA;

  return (
    <div className="guides-wrapper">
      <header className="guides-header">
        <h1>Guides</h1>
        <p>Community-written, up-to-date guides for all important Trove mechanics.</p>
      </header>

<div className="guides-grid">
        {guides.map(({ tag, title, desc, icon, slug }, index) => (
          <div
            key={slug}
            // A SLUG HOZZÁADÁSA CLASSKÉNT
            className={`guide-card ${slug}`}
            onClick={() => navigate(`/guides/${slug}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate(`/guides/${slug}`)}
            style={{ 
                cursor: 'pointer', 
                animationDelay: `${index * 0.08}s` 
            }}
          >
            <div className="card-icon">
              <i className={icon}></i>
            </div>
            <div className="card-body">
              <div className="tag">{tag}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}