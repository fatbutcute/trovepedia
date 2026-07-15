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
    bgImage: '/guidebg/skillchart.webp',
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
  
<a href="https://docs.google.com/spreadsheets/d/1Q2xdqeoHLafC9se5cy_Gpc54KnmpaQez7TGsc5C1Lqw/edit?usp=sharing" target="_blank" rel="noreferrer">Check out the classes spreadsheet!</a>`
  },
  { 
    tag: 'Max Light', 
    title: 'Maximize Your Light', 
    desc: 'This guide shows you how to maximize your light.', 
    icon: 'ri-sun-line', 
    slug: 'maximize-light',
    bgImage: '/guidebg/cosmic.webp',
    author: 'Mortrak, Losiqn - Arsyn',
    date: '2026-07-15',
    content: `## How to get max light?

This section covers the optimal setup for endgame progression, focusing heavily on maximizing your Light stat to deal with high-tier enemies.



## Empowered Cosmic Gem (Berserk Battler) &amp; Lesser Cosmic Gem x2

<div class="gd-image-container">
  <div class="gd-image-glow-border"></div>
  <img src="/guideimages/C5GEARMYSTI_GEMS3page0002.webp" alt="Optimal Cosmic Gems Setup" />
</div>  

These are max mystic gems. Make sure they have **3 boosts*** on Light and are **100% augmented**. The *Berserk Battler* Empowered Gem gives an additional <span class="text-cyan">+750 Light</span> if it’s fully procced.

### Total: <span class="text-cyan">4945 Light</span> <span class="text-gold">(+750 from Berserk Battler)</span>

<div class="gd-info-box">
  <div class="gd-info-box-content">
    <h4 class="gd-info-title">What are Gem Boosts?</h4>
    <p>
      These boosts are represented by the <strong>blue pearls</strong> above the stat in the Gem Forge. Max gems have exactly 3 boosts. Empowered gems must reach 3 boosts by <strong>Level 15</strong> - if they don't, they are 2-star gems and should be replaced immediately.
    </p>
  </div>
</div>



## C5 Gear - Total Light: 4160
<div class="gd-image-container">
  <div class="gd-image-glow-border"></div>
  <img src="/guideimages/C5hatmax.png"/>
</div>
<div class="gd-image-container">
  <div class="gd-image-glow-border"></div>
  <img src="/guideimages/C5weaponmax.png"/>
</div>
<div class="gd-image-container">
  <div class="gd-image-glow-border"></div>
  <img src="/guideimages/C5facemax.png"/>
</div>

### Upgrade Cost per Piece
<div class="gd-image-container">
  <div class="gd-image-glow-border"></div>
  <img src="/guideimages/C5GEARMYSTICGEMS3page0003.webp"/>
</div>

## Mystic Gear - Total Light: 4680
<div class="gd-image-container">
  <div class="gd-image-glow-border"></div>
  <img src="/guideimages/Mystichatmax.png"/>
</div>
<div class="gd-image-container">
  <div class="gd-image-glow-border"></div>
  <img src="/guideimages/Mysticweaponmax.png"/>
</div>
<div class="gd-image-container">
  <div class="gd-image-glow-border"></div>
  <img src="/guideimages/Mysticfacemax.png"/>
</div>

## Misc. Gear - Total Light: 1675
<div class="gd-image-container">
  <div class="gd-image-glow-border"></div>
  <img src="/guideimages/C5GEARMYSTICGEMS3page0005.webp"/>
</div>

### Banner, Rings and Auto-Use Rune:
* Enshadowed Torch of Knotted Shadow: One of the necessary items to reach max light. It can be obtained from Geode Topside Leviathan bosses. Note: Banners such as the Enshadowed Banner of Knotted Shadow cannot be traded and there are several type of banners which gives different stat bonuses. Good to know: You have a guarenteed chance to get the first banner after killing 250 leviathans.
* Rings: For long time, only crystal rings were available, but now you can also get the new mystic rings. Both of them are good, but mystic rings are better because they gives more light and new ring abilities. Mystic rings can be crafted at the Ringcrafting Bench after reaching max lvl in the Ringcrafter Bench. To be able to Mystic Rings you need mystic loops which are similar to primal loops, but mystic loops can be only acquired from D15, after reaching a new primal level. Note: You must be in D15 in the moment when you get the new primal level.
* Auto-Use Rune: This rune is a must-have for endgame players. Can be obtainable from the Rune Crafting Bench, after reaching a specified level in the bench.

## Allys - Total Light: 400 or 500
<div class="gd-image-container">
  <div class="gd-image-glow-border"></div>
  <img src="/guideimages/C5GEARMYSTICGEMS3page0006.webp"/>
</div>

### 
* Scorpius: One of the allies that gives a moderate amount of light. It can be obtained from the Star Chart. Very good for classes which have a lot of mobility such as Shadow Hunter. One of the best allies for farming.
* Orchian: Similarly as Scorpius, Orchian is a good ally for classes with magic damage and high mobility. It can be obtained from the Paragon Workbench.

## Dragons - Total Light: 570
<div class="gd-image-container">
  <div class="gd-image-glow-border"></div>
  <img src="/guideimages/C5GEARMYSTICGEMS3page0007.webp" alt="Optimal Cosmic Gems Setup" />
</div>
Each dragon gives a significant amount of light, and the total light from dragons can reach up to 570. This amount can be achieved if you have max mystic cosmic gems because the cosmic dragon scales from your cosmic gems.

## Star Chart - Total Light: 250
<div class="gd-image-container">
  <div class="gd-image-glow-border"></div>
  <img src="/guideimages/C5GEARMYSTICGEMS3page0008.webp"/>
</div>

##
* Star Chart: There are some orbs in the Star Chart (as shown on the image) which gives small amounts of light. Two of the 3 orbs unlocks Scorpius and Starry Skyfire allies.
* Constellation Key: Count this item as some kind of currency. If you have Constellation Keys, you can unlock minor orbs in the Star Chart. Constellation Keys can be either acquired for 1300 cubits on the Store -> More tab or you can obtain the Locksmith's Lexicon by reaching Mastery Lvl 270. The tome gives you 1 key every week. You need 91 keys to unlock all the 3 orbs which is 118.300 cubits.
* Celestial Sphere: Used to unlock major orbs in the Star Chart. You can obtain these spheres at the Celestial in the NW building of the Hub. Note: The first 3 Celestial Sphere costs 100 flux each, after buying the first amounts, you will need Astral Echoes in the future to buy more Celestial Spheres.
* Astral Echoes: Currency to buy Celestial Spheres. Best ways to get Astral Echoes: 

  * Farming dungeons, chest will drop different amounts of Astral Echoes every 5 minutes. After 5000 per week, the time drops to 15 minutes (this resets every week on Monday).
  * Buying the Astral Echoes Almanac tome (Store -> More tab): Gives 5000 Astral Echoes every week.

<div class="gd-image-container">
  <div class="gd-image-glow-border"></div>
  <img src="/guideimages/Celestial.webp"/>
</div>
<div class="gd-image-container">
  <div class="gd-image-glow-border"></div>
  <img src="/guideimages/Celestial1.webp"/>
</div>
<div class="gd-image-container">
  <div class="gd-image-glow-border"></div>
  <img src="/guideimages/Celestial2.webp"/>
</div>

## Other - Total Light: 1140 Light + 1% of overall total
<div class="gd-image-container">
  <div class="gd-image-glow-border"></div>
  <img src="/guideimages/C5GEARMYSTICGEMS3page0009.webp"/>
</div>

### Why are these important?
* Solarion Subclass: Like any subclass works, Solarion's subclass gives some amount of light. The amount of light depends on the subclass level. In order to get the 140 light, Solarion must reach lvl 30.
* Geode Mastery: Geode mastery is a must do part of the endgame. Every level gives 10 light to your current light, which is 1000 light at lvl 100.
* Litany: This buff gives 1% light of your current light. In order to craft this buff, you must go to the Altar of Martial Artistry bench (it's located SW on the hub) and craft the Mantra of Regeneration. When you crafted the Mantra of Regeneration, you must buy a Quality License from Disciple Daniel. When you have the Quality License, go to the Relic of Preservation and craft the Litany buff. This buff lasts until next weekly reset.
<div class="gd-image-container">
  <div class="gd-image-glow-border"></div>
  <img src="/guideimages/AltarofMartialArtistry.png"/>
</div>
<div class="gd-image-container">
  <div class="gd-image-glow-border"></div>
  <img src="/guideimages/AltarofMartialArtistry2.png"/>
</div>
<div class="gd-image-container">
  <div class="gd-image-glow-border"></div>
  <img src="/guideimages/Discipledaniel.png"/>
</div>
<div class="gd-image-container">
  <div class="gd-image-glow-border"></div>
  <img src="/guideimages/Discipledaniel2.png"/>
</div>
<div class="gd-image-container">
  <div class="gd-image-glow-border"></div>
  <img src="/guideimages/Relicofpreservation.png"/>
</div>
<div class="gd-image-container">
  <div class="gd-image-glow-border"></div>
  <img src="/guideimages/Relicofpreservation2.png"/>
</div>

## And now everything added up!
<span classname="crystalgear">C5 Gear: 13271 Light - using 400 light Ally.</span>\n
<span classname="mysticgear">Mystic Gear: 13796 Light - using 400 light Ally.</span>\n
###
###\n\n
<span classname="light">Absolute Max Light can be 14604 - with (450 Light) Ally + Berserk Battler (we count the Berserk Battler's proc as plus light.)</span>
`
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
    slug: 'mystic-gear',
    bgImage: '/guidebg/mysticgear.webp',
    author: 'Rocket__, Fayysal - Arsyn',
    date: '2026-07-09',
    content: `The Mystic Gear system is a pinnacle endgame progression mechanic in Trove that substantially boosts your character's stats. This guide covers the total resource costs required to fully upgrade your gear from Tier 0 to Tier 5, alongside optimal 8-week farming strategies.

## Total Upgrade Costs (Tier 0 → 5)

Fully upgrading a complete set of Mystic Gear requires a massive amount of investment. Below is the breakdown of the market value and exact material counts needed for a maxed-out setup.

* **Depths Cores (Total: 6,500)** * **Market Value:** ~84.5 Million Flux  
  * **Type:** Tradeable (~13,000 Flux each)
* **Soul of the Depths (Total: 1,675)** * **Market Value:** N/A  
  * **Type:** Account-Bound / Non-Tradeable
* **Deepstone (Total: 18,850)** * **Market Value:** ~17 Million Flux  
  * **Type:** Tradeable (~900 Flux each)

---

## The 8-Week Farming Strategy

To acquire the necessary Depths Cores and Souls efficiently without exhausting all your resources, pacing your progression over an 8-week cycle is highly recommended.

### Depths Cores Breakdown
Through consistent daily and weekly activities, you can easily amass over 15,000 Cores during this period:

* **Sparkle Keys (5 per day):** Yields **1,680 Depths Cores** (assuming an average of 6 cores per 5-star dungeon).
* **Normal Keys:** Yields **8,400 Depths Cores** (based on utilizing roughly 150 Normal Keys daily).
* **Obelisks:** Yields **6,000 Depths Cores** (achievable by securing a minimum of 3,000 cores per fast invasion event).
* **Trunks:** Yields **~1,000 Depths Cores** (granted if you have unlocked the dedicated node from the Runic Anvil).

### Soul of the Depths Breakdown
Since Souls are non-tradeable, time-gated gates dictate their farming loops. Maximize your Monday resets:

<div class="gd-flex-row">
  <div class="gd-flex-text">

* **Monday Reset Dungeon Bonus:** Completing 5 designated dungeons on Monday yields **1,960 Soul of the Depths** (calculated using *Sparkle Keys only*).
* **Normal Key Vaults:** Opening vaults in Kraken / The Depths Delves rewards **~6 souls** per vault.
* **Sparkling Key Vaults:** Opening vaults in Kraken / The Depths Delves rewards **~8 souls** per vault.

  </div>
  
  <div class="gd-flex-image-wrap">
    <div class="gd-image-container">
      <div class="gd-image-glow-border"></div>
      <img src="/guideimages/soulofthedepths.webp" alt="Farming Soul of the Depths" />
    </div>
  </div>
</div>

---

## Deepstone Farming (Tuesday Exclusive)

Deepstone gathering is heavily optimized when executed on **TUESDAY** due to specific daily multipliers. 

* Deepstones only start to populate and spawn **after you clear the first Vault** inside the delve.
* **Kraken / The Depths Delve:** Yields **~350 Deepstones per portal** when farming between Depths levels 170 and 182.

By organizing your farm schedules around Monday's Soul lockouts and Tuesday's Deepstone boosts, you can effortlessly craft and max out your Mystic Gear set.`
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