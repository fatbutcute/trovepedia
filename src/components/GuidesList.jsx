import { useNavigate } from 'react-router-dom';
import './GuidesList.css';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export const GUIDES_DATA = [
  { 
    tag: 'Skill Chart & Rune Anvil', 
    title: 'Optimal Building Paths', 
    desc: 'Learn how to optimize your skill chart and rune anvil.', 
    icon: 'ri-bar-chart-box-line', 
    slug: 'crafting-paths',
    author: 'Hellfire191 - Arsyn',
    date: '2026-07-02',
    content: `## What is Star Chart?  
The Star Chart is a crucial system in Trove that enhances your character’s power. This guide will walk you through the optimal setup, essential resources, and tips for efficiently progressing through the Star Chart.

## Recommended Star Chart Path

This setup is widely used in the current endgame and benefits both magic and physical damage classes. It also maximizes the Light stat, which is essential for dealing with high-tier enemies.

## Node Colors & Their Effects
Green Nodes: Provide Light (Total: 250).  
Red Nodes: Increase Physical Damage,  
Blue Nodes: Increase Magic Damage,  
Purple Nodes: Increase both Magic and Physical Damage.

<div class="gd-image-container">
  <div class="gd-image-glow-border"></div>
  <img src="/guideimages/arsynskillchart.webp" alt="Skill Chart Layout" />
</div>

Additionally, some nodes provide special buffs, such as increased damage for four hours after defeating 5-star bosses in the Sundered Uplands or flask-related buffs. Also there are nodes that provide attack speed, magic find for loots, and many more bonuses for your gameplays.  
## Essential Resources for the Star Chart
### To progress through the Star Chart, you need three key resources:  
#### Astral Echoes  
Earned from completing dungeons and opening chests. A large quantity (thousands) is required to fully upgrade the Star Chart.
#### Celestial Spheres  
Used to unlock nodes in the Star Chart. Nodes grant various stats and power boosts. Maximum of 40 nodes can be unlocked at once.
#### Constellation Keys  
Required to unlock Major Nodes. Can be purchased with 1,300 Cubits from the store ([N] > More section). Unlocking major nodes also grants Balefire Dragon Fragments.
##### Nodes are divided into:
* Major Nodes (large nodes, require special keys to unlock),
* Minor Nodes (smaller nodes, unlocked using Celestial Spheres),
* Nodes must be unlocked sequentially; skipping is not allowed,
* Purchase Celestial Spheres from The Celestial NPC near The Grand Orrery Bench using Astral Echoes.

## Important Tips  

### Use the Astral Echoes Almanac

<div class="gd-flex-row">
  <div class="gd-flex-text">

* The Astral Echoes Almanac is a weekly legendary tome that grants 5,000 Astral Echoes upon completion,
* It significantly speeds up Star Chart progression,
* Available in the store ([N] > More section) for 2,000 Credits during discounts.

  </div>
  
  <div class="gd-flex-image-wrap">
    <div class="gd-image-container">
      <div class="gd-image-glow-border"></div>
      <img src="/guideimages/astralechoesalmanac.webp" alt="Astral Echoes Almanac" />
    </div>
  </div>
</div>

###  Resetting the Star Chart
* You can reset your Star Chart at any time using one Constellation Key at the center node,
* Celestial Spheres will be refunded upon reset,
* Constellation Keys will not be refunded, but previously unlocked Major Nodes remain unlocked permanently.

<div class="gd-image-container">
  <div class="gd-image-glow-border"></div>
  <img src="/guideimages/startchartreset.webp" alt="Resetting the Star Chart" />
</div>  
By following this guide, you can efficiently progress through the Star Chart and enhance your character’s strength.  
If you wish to see the best build for your class, check out this spreadsheet:  
<a href="https://docs.google.com/spreadsheets/d/1Q2xdqeoHLafC9se5cy_Gpc54KnmpaQez7TGsc5C1Lqw/edit?usp=sharing" target="_blank" rel="noreferrer">https://docs.google.com/spreadsheets/d/1Q2xdqeoHLafC9se5cy_Gpc54KnmpaQez7TGsc5C1Lqw/edit?usp=sharing</a>`
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
    title: 'Learn about ships and towers!', 
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
          /* JAVÍTVA: div helyett Link komponenst használunk az egyedi slug útvonallal */
          <Link
            to={`/guides/${slug}`}
            key={slug}
            className={`guide-card ${slug}`}
            style={{ 
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
          </Link>
        ))}
      </div>
    </div>
  );
}