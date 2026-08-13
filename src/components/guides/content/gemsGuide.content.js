export const gemsGuideContent = {
  en: {
    hero: {
      badge: "Endgame Progression",
      title: "Maximize Gem Stats",
      description: "A complete walkthrough on optimizing your Empowered and Lesser Gems, rerolling stats, moving boosts, and augmenting to reach maximum Power Rank and Light."
    },
    dock: {
      tiers: "Gem Tiers",
      lesserEmpowered: "Lesser & Empowered",
      classGems: "Class Gems",
      structure: "Gem Structure",
      stats: "Optimal Stats",
      leveling: "Leveling",
      perfecting: "Perfecting",
      builds: "Gem Builds"
    },
    scrolly: {
      title: "Learn the basics of gems",
      subtitle: "Every gem in the game follows this pattern. Once you understand the basics, you can dive deeper into the details of gems.",
      steps: [
        {
          num: "1",
          tier: "Tier Ceiling",
          title: "Tier determines its potential",
          description: "A gem's tier determines its maximum potential, including how high it can level and how powerful its stats can become. While Trove features several gem tiers, the four most important are <strong style=\"color: #e2e8f0;\">Radiant</strong>, <strong style=\"color: #f59e0b;\">Stellar</strong>, <strong style=\"color: #2effee;\">Crystal</strong>, and <strong style=\"color: #c084fc;\">Mystic</strong>. A gem's tier never changes through leveling, but it can be upgraded by one tier with a Converter while keeping all of its progress."
        },
        {
          num: "2",
          tier: "Classification",
          title: "Lesser vs. Empowered",
          description: "Lesser Gems are limited to a single damage type. Empowered Gems remove that limitation, offer stronger stat rolls, and come with a unique special ability. Since you can equip far fewer Empowered Gems, choosing the right ones is much more important."
        },
        {
          num: "3",
          tier: "Sockets",
          title: "Elements determine the socket",
          description: "Every gem belongs to one of four elements: Water, Fire, Air, or Cosmic. A gem can only be placed into a socket that matches its element. Cosmic Gems are unique because they always include the Light stat which cannot be rerolled."
        },
        {
          num: "4",
          tier: "Stat Rolls",
          title: "Understanding stat rolls",
          description: "When a gem drops, it randomly rolls either two or three stats from a pool that includes Damage, Critical Damage, Critical Hit, and Health. Each stat also rolls with a random value. Always check a gem's stats before investing in it, and only keep gems that roll with all three stats."
        },
        {
          num: "5",
          tier: "Optimization",
          title: "Maximize its potential",
          description: "Once you have a good gem, level it up with Gem Dust to increase its Power Rank and unlock additional stat boosts. Afterward, use Focuses to optimize every stat until they reach 100%, creating a fully perfected gem."
        }
      ]
    },
    rerollSection: {
      step: "01",
      title: "Rerolling & Moving Stats",
      cards: [
        {
          num: "01",
          title: "Contained Chaos Spark",
          body: "Use Chaos Sparks at the Gem Forge to <strong>reroll undesirable stats</strong> into crucial attributes like <em>Light, Physical/Magic Damage, or Critical Damage</em>."
        },
        {
          num: "02",
          title: "Contained Chaos Flare",
          body: "Use Chaos Flares to <strong>move stat boost procs</strong> (the small gems next to stats) to your most vital stat - ideally <em>Light</em> for Cosmics, or Damage/Crit Damage."
        },
        {
          num: "03",
          title: "Builder's Focuses",
          body: "Augment each stat's base percentage up to <strong>100%</strong> using Rough, Precise, and Superior Focuses to maximize total Power Rank."
        }
      ]
    },
    tiersSection: {
      step: "02",
      title: "The tiers among the gems",
      subtitle: "While Trove features several gem tiers, only <strong style=\"color: rgb(226, 232, 240);\">Radiant</strong>, <strong style=\"color: #f59e0b;\">Stellar</strong>, <strong style=\"color: #2effee;\">Crystal</strong>, and <strong style=\"color: #c084fc;\">Mystic</strong> provide stats worth investing in for endgame progression. Select a card below to inspect tier ceilings, PR scaling, and converters.",
      labels: {
        maxLevel: "MAX LEVEL",
        maxLevelSub: "Level ceiling for this tier.",
        eachRoll: "EACH NEW ROLL",
        eachRollSub: "Added on milestone levels (5 / 10 / 15).",
        maxPr: "MAX POWER RANK",
        maxPrSub: "Perfect maxed Empowered Gem.",
        levelCap: "Level cap:"
      },
      tiersData: {
        radiant: { title: "Radiant", desc: "Mid-game entry gems. Good for stepping into higher Uber worlds, but replaced quickly in endgame." },
        stellar: { title: "Stellar", desc: "Solid foundation for high-tier farming. Essential for reaching Uber 10 before upgrading to Crystal.", convCost: "1,000 Credits or 10,000 Cubits", convNote: "Keeps gem level & stat augments intact!" },
        crystal: { title: "Crystal", desc: "Where serious end-game power begins. High PR per level and required for Uber 11+ progression.", convCost: "1,500 Credits or 15,000 Cubits", convNote: "Keeps gem level & stat augments intact!" },
        mystic: { title: "Mystic", desc: "Pinnacle gem tier. Offers maximum possible Light, Power Rank, and stat ceilings in the entire game." }
      }
    },
    statsSection: {
      title: "Optimal Stat Distribution",
      tabs: {
        empowered: "Cosmic Gems",
        elemental: "Elemental Gems (Water / Fire / Air)"
      },
      cosmicStats: [
        { name: "Stat 1: Light", priority: "MUST HAVE (3x Boosts)" },
        { name: "Stat 2: Physical / Magic Damage", priority: "Recommended" },
        { name: "Stat 3: Critical Damage", priority: "Recommended" }
      ],
      elementalStats: [
        { name: "Stat 1: Physical / Magic Damage", priority: "Core Stat" },
        { name: "Stat 2: Critical Damage", priority: "Core Stat" },
        { name: "Stat 3: Critical Hit (until 100%)", priority: "Flex Stat" }
      ]
    },
    proTip: {
      title: "Keep in mind!",
      body: "Always start with <strong>3-stat Stellar/Crystal gems</strong> at level 1. If a gem only drops with 2 stats, it loses 1 boost proc at level 5, capping its maximum Power Rank lower than a perfect 3-stat gem!"
    },
    convertersSection: {
      title: "Mystic and Crystal Gem Converter",
      crystal: {
        title: "Crystal Gem Converter",
        text: "Upgrades a maxed <strong>Stellar Gem</strong> directly into a <strong>Crystal Gem</strong>. It retains all existing stat rolls, level progression, and focus augments so you don't have to restart your gem build from scratch."
      },
      mystic: {
        title: "Mystic Gem Converter",
        text: "Upgrades a maxed <strong>Crystal Gem</strong> to the pinnacle <strong>Mystic Tier</strong>. Perfect for endgame players aiming for the absolute maximum Light and Power Rank caps without sacrificing stat investments."
      },
      note: "<strong>Note:</strong> Converters aren't mandatory, but they have a specific use case. While high-tier gems can drop naturally in higher difficulty worlds, converters are best used when you already have a fully maxed gem and want to upgrade it to the next tier without losing its stats or augments."
    },
    lesserVsEmpowered: {
      step: "03",
      title: "Lesser vs. Empowered Gems",
      intro: "Gems in Trove are split into two fundamental categories. While Lesser Gems form your stat foundation, Empowered Gems define your build with game-changing abilities.",
      lesser: {
        tag: "COMMON - RESTRICTED",
        title: "Lesser Gem",
        intro: "Lesser gems are common gems. They are locked to a single damage school and have no special ability - but since you equip many of them, their combined stats add up.",
        list: [
          "<strong>Restriction:</strong> Fierce gems roll Physical stats, while Arcane gems roll Magic stats.",
          "<strong>Stat Rolls:</strong> Comes with two or three stats, each rolled at a random strength.",
          "<strong>Augmenting:</strong> Improve and focus the stats to close the gap toward the perfect 100%."
        ]
      },
      empowered: {
        tag: "\"UNRESTRICTED\" & RARE",
        title: "Empowered Gem",
        intro: "Empowered gems are more powerful and more rare to get. It removes the damage-school restriction, rolls within a higher stat range, and comes with a special ability.",
        list: [
          "<strong>Unique Ability:</strong> Grants a special ability, or a class ability on Class Gems.",
          "<strong>One of a Kind:</strong> Every ability is unique - two equipped gems can never have the same ability.",
          "<strong>Higher Base Stats:</strong> Rolls within a higher stat range and starts with +100 Power Rank.",
          "<strong>High Impact:</strong> You only equip a few - each one is a major upgrade."
        ]
      },
      obtainLesser: {
        title: "How do you obtain Lesser Gems?",
        worlds: {
          title: "Worlds",
          note: "In Adventure Worlds you obtain lesser gems based on the world difficulty. Adventure Worlds are more restricted, because they need specified light requirements to enter."
        },
        delves: {
          title: "Delves",
          info: "160+ Delves: <span class=\"styles_delvetext\">Explore Delves up to 160+ depth and earn the same Gem Boxes available from D15 Worlds.</span><br />Power Rank: <span class=\"styles_delvetext\">A minimum of <strong class=\"styles_prStrong\">15,000</strong> Power Rank is required to access certain Delve depths.</span><br />No Light requirement: <span class=\"styles_delvetext\">Delves are not restricted by Light, allowing you to progress regardless of your current Light.</span>",
          note: "Delves are just shortcut to mystic gems. Completing <strong class=\"styles_noteStrong\">165+ delves</strong> is the same as doing D15 worlds, but with lesser and lower restrictions. Delves are pretty useful if you want to skip Stellar and Crystal gems."
        }
      },
      obtainEmpowered: {
        title: "How do you obtain Empowered Gems?",
        cards: [
          {
            tag: "CRAFT & SHADOW TOWER",
            title: "Empowered Gem Box",
            desc: "Obtained by converting <span class=\"styles_lunarsouls\">Lunar Souls</span> at the Shadowy Market. Drops <span class=\"styles_radiant\">Radiant</span> or <span class=\"styles_stellar\">Stellar</span> Empowered Gems, and rarely <span class=\"styles_classgemkey\">Class Gem Key Fragments</span> or <span class=\"styles_dragonegg\">Diamond Dragon Eggs</span>."
          },
          {
            tag: "GUARANTEED STELLAR",
            title: "Stellar Empowered Gem Box",
            desc: "Guarantees a <span class=\"styles_stellar\">Stellar</span> tier Empowered Gem upon opening. Essential for skipping lower Radiant tiers. Can be crafted at the Adventure Crafting Bench."
          },
          {
            tag: "TOME & REWARD",
            title: "Empowered Gem Box Edition",
            desc: "Special edition box yielded passively from Empowered Gem Tome completion or high-tier events. <br />Great for consistent endgame gem progression. Can be used once per week."
          },
          {
            tag: "LEADERBOARD",
            title: "Leaderboard Rewards",
            desc: "One of the easiest ways to get Empowered Gem Boxes is doing Leaderboard contests. Every week there are 3 class which have <br />to reach 125 leaderboard points to get Empowered Gem Boxes at the next reset."
          },
          {
            tag: "RADIANT MERCHANT",
            title: "Radiant Sovereigns",
            desc: "There is an option to buy Empowered Gem Boxes at the Radiant Merchant in exchange for Radiant Sovereigns. You can obtain Radiant Sovereigns whenever you buy credits in the store."
          },
          {
            tag: "CRAFTING ANY TYPE",
            title: "Adventure Bench",
            desc: "At the Adventure Crafting Bench you craft any type of Gem Boxes, but these Gem Boxes are Mystic and the resources are more difficult to gather. Not worth in a long term."
          }
        ]
      }
    },
    gemTypes: {
      step: "04",
      title: "Gem Types & Elements",
      note: "An Element determines where a gem can be equipped and which stats it can roll. While the three Elemental gems follow the same rules, Cosmic gems have their own unique mechanics.",
      elemental: {
        title: "Three Elemental Sockets",
        desc: "Water, Fire, and Air gems share the same stat rolls and ability pool — the only difference is the socket they fit into. Choose the element required by your class and available sockets.",
        canRoll: "Can Roll Stats:",
        stats: ["Damage (Phys / Magic)", "Critical Damage", "Critical Hit", "Max Health", "Max Health %"],
        abilitiesTitle: "Shared Empowered Abilities:",
        abilities: "Stinging Curse | Volatile Velocity | Spirit Surge | Mired Mojo Stunburst | Pyrodisc | Explosive Epilogue | Cubic Curtain",
        restriction: "<strong>Restriction:</strong> Only one gem with each ability can be equipped at a time. You cannot equip the same ability twice."
      },
      cosmic: {
        title: "Special Cosmic Socket",
        desc: "Cosmic gems are different from the other elements. One of their stat slots is always guaranteed to be <strong>Light</strong> - the stat that powers your progress through Geode and Cosmic endgame content.",
        highlight: "Cosmic gems have their own unique Empowered ability pool and are equipped in three dedicated Cosmic sockets alongside your Elemental gems, allowing you to maximize your total Light.",
        uniqueFeature: "Unique Feature:",
        stats: ["Guaranteed Light Stat", "Damage", "Critical Damage"],
        abilitiesTitle: "Empowered Abilities:",
        abilities: "Berserk Battker | Empyrean Barrier | Vampirian Vanquisher | Flower Power"
      },
      dragonBonus: {
        badge: "PASSIVE STAT BOOST",
        title: "Primordial Dragons",
        desc: "Each element has its own Primordial Dragon, providing a +10% boost to every gem of that element. There is one Primordial Dragon for Water, Fire, Air, and Cosmic. Unlocking all four gives you the maximum possible boost to your gem stats and Power Rank potential."
      }
    },
    classGemsSection: {
  step: "05",
  title: "Class Gems",
  subtitle: "Build-Defining Powers",
  intro: "Every class has a unique gem of its own. A Class Gem is a special Empowered Gem tied to a specific class that modifies one of its abilities, providing a powerful, build-defining upgrade that can be equipped like any other Empowered Gem.",
  cards: {
    onePerClass: {
      title: "One per class",
      desc: "Each class has its own unique Class Gem, and it can only be equipped by that class. Switching classes means switching to a different Class Gem."
    },
    rewritesAbility: {
      title: "Modifies an ability",
      desc: "Instead of simply providing additional stats, a Class Gem modifies one of the class's abilities, often significantly changing how it works."
    },
    howToGet: {
      title: "How to obtain a Class Gem",
      desc: "Complete a Shadow Colosseum in the Shores of the Everdark. When you are done, open the vault with a class gem key to obtain a class gem."
    }
  },
  selectorTitle: "Select a Class Gem to view its ability:",
  selectedLabel: "SELECTED CLASS GEM",
  gems: {
    bard: { 
      name: "Bard", 
      ability: "Melody Master", 
      desc: [
        "Explosion deals 800% magic damage to nearby enemies and temporarily redirects aggro to the player. Buffs nearby allies to gain 45% Physical and Magical Damage and 45% Critical Damage.",
        "Heals nearby allies by 45% of max health and buffs them with 15% life gain when dealing damage. Additionally, it applies stun to nearby enemies for 3 seconds.",
        "Gain increased movement speed by 40% and max energy by 50. Buffs allies with a 50% chance to restore energy when dealing damage."
      ] 
    },
    boomeranger: { 
      name: "Boomeranger", 
      ability: "Bawk-Bomb", 
      desc: [
        "Tiny Bombs Tiny Bombs becomes a Bawk-Bomb. These spawns chickens that attacks enemies for a brief duration.",
        "Big Bomb Big Bomb becomes a Bawk-Bomb. These spawns chickens that attacks enemies for a brief duration."
      ] 
    },
    candybarbarian: { name: "Candy Barbarian", ability: "Scoop n' Gloop", desc: "Sugar Crash Sugar Crash now leaps 4 blocks straight up and crashes down, dealing AoE damage, vacuuming enemies within 3-4 blocks toward you, and applying a brief snare." },
    chloromancer: { name: "Chloromancer", ability: "Plant Power", desc: "When Empowered Growth is active the Chloromancer heals nearby plants and allies. Allies are healed 10% every 1.5 second for 12 sec." },
    dinotamer: { name: "Dino Tamer", ability: "Dino Time", desc: "Increases the duration and attack speed of Dino Mount Dino Mount." },
    dracolyte: { name: "Dracolyte", ability: "Burning Ward", desc: "When a Burnt Offering Burnt Offering detonates, it also spawns a mini Dracolyte minion that attacks enemies for a brief duration." },
    faetrickster: { name: "Fae Trickster", ability: "Fae-go my Ego", desc: "The Fae Trickster is able to take an aditional hit before Ego Blast Ego Blast's bonus damage is lost. Refreshes after 4s of not taking damage." },
    gunslinger: { name: "Gunslinger", ability: "Overcharged", desc: "Run and Gun Run and Gun no longer increases your attack speed but instead decreases it by 25%. All shots fired are fully charged Charge Shot Charge Shots." },
    icesage: { name: "Ice Sage", ability: "Pain Freeze", desc: "In addition to Coldhearted Coldhearted's effects, the first Styles Staff Basic Attack against an enemy freezes the target for 1s and enemies hit by 3 Basic Attacks explode." },
    knight: { name: "Knight", ability: "Spirit Squire", desc: "Charge Charge no longer propels you forward. Instead, a Spirit Squire charges forward through multiple enemies, dealing damage and stunning them for 1s." },
    lunarlancer: { name: "Lunar Lancer", ability: "Shadow Lancer", desc: "Styles Spear Basic Attacks have a chance to spawn a dark shadow version of you that attacks enemies. In lunarform the chance is increased." },
    neonninja: { name: "Neon Ninja", ability: "Heuristic Haxstar", desc: "Shurikens from Shining Star Shining Star are replaced with a massive buzzsaw that pierces enemies and applies Stasis Blade Stasis Blade's root." },
    pirate: { name: "Pirate Captain", ability: "ARR-tillery", desc: "	Allows First Mate First Mate to deploy an additional turret. Both turrets will upgrade from the same Doubloons." },
    revenant: { name: "Revenant", ability: "Aegis Assault", desc: "Bulwark Bash Bulwark Bash loses its cooldown and applies a stacking DoT effect which deals 66% PD per second." },
    shadowhunter: { name: "Shadow Hunter", ability: "Shadow Blitz", desc: "Basic Attack becomes a rapid-fire stream of arrows." },
    solarion: { name: "Solarion", ability: "Prismatic Link", desc: "Prismatic Blast now pulse around the Phoenix as well as the Solarion, allowing the Solarion to maintain range while attacking, and deal AOE damage around their Phoenix." },
    tombraiser: { name: "Tomb Raiser", ability: "Beckon Banshee", desc: "Banshee's Boon Banshee's Boon also summons a banshee that heals your Skellittles and damages enemies. Adittionally, when the banshee dies attract a Restless Soul." },
    vanguardian: { name: "Vanguardian", ability: "Hero's Mantle", desc: "Every third Styles Fist Melee Basic Attack and every fourth Styles Fist Ranged Basic Attack reduces ability cooldowns by 2s." }
  }
}
  },
  fr: {
    hero: {
      badge: "Progression Endgame",
      title: "Maximiser les Stats des Gemmes",
      description: "Un guide complet sur l'optimisation de vos Gemmes Renforcées et Mineures, le changement de statistiques, le déplacement des boosts et l'augmentation pour atteindre le Power Rank et la Lumière maximum."
    },
    dock: {
      tiers: "Tiers de Gemmes",
      lesserEmpowered: "Mineures & Renforcées",
      classGems: "Gemmes de Classe",
      structure: "Structure",
      stats: "Stats Optimales",
      leveling: "Niveaux",
      perfecting: "Perfectionnement",
      builds: "Builds de Gemmes"
    },
    scrolly: {
      title: "Apprendre les bases des gemmes",
      subtitle: "Chaque gemme dans le jeu suit ce modèle. Une fois les bases comprises, vous pourrez approfondir les détails des gemmes.",
      steps: [
        {
          num: "1",
          tier: "Plafond de Tier",
          title: "Le Tier détermine son potentiel",
          description: "Le tier d'une gemme détermine son potentiel maximum, y compris le niveau maximal qu'elle peut atteindre et la puissance de ses statistiques. Bien que Trove propose plusieurs tiers, les quatre plus importants sont <strong style=\"color: #e2e8f0;\">Radiant</strong>, <strong style=\"color: #f59e0b;\">Stellaire</strong>, <strong style=\"color: #2effee;\">Cristal</strong>, et <strong style=\"color: #c084fc;\">Mystique</strong>. Le tier d'une gemme ne change jamais en gagnant des niveaux, mais peut être amélioré d'un tier avec un Convertisseur tout en conservant toute sa progression."
        },
        {
          num: "2",
          tier: "Classification",
          title: "Mineures vs Renforcées",
          description: "Les Gemmes Mineures sont limitées à un seul type de dégâts. Les Gemmes Renforcées retirent cette limitation, offrent des tirages de statistiques plus puissants et possèdent une capacité spéciale unique. Comme vous pouvez équiper beaucoup moins de Gemmes Renforcées, il est bien plus important de choisir les bonnes."
        },
        {
          num: "3",
          tier: "Châssis",
          title: "L'Élément détermine le châssis",
          description: "Chaque gemme appartient à l'un des quatre éléments : Eau, Feu, Air ou Cosmique. Une gemme ne peut être placée que dans un châssis correspondant à son élément. Les Gemmes Cosmiques sont uniques car elles incluent toujours la statistique Lumière qui ne peut pas être changée."
        },
        {
          num: "4",
          tier: "Tirage de Stats",
          title: "Comprendre les tirages de stats",
          description: "Lorsqu'une gemme tombe, elle tire aléatoirement deux ou trois statistiques parmi les Dégâts, Dégâts Critiques, Coup Critique et Santé. Chaque statistique a également une valeur aléatoire. Vérifiez toujours les statistiques d'une gemme avant de l'améliorer, et ne gardez que les gemmes qui possèdent trois statistiques d'origine."
        },
        {
          num: "5",
          tier: "Optimisation",
          title: "Maximiser son potentiel",
          description: "Une fois que vous avez une bonne gemme, montez son niveau avec de la Poussière de Gemme pour augmenter son Power Rank et débloquer des boosts de statistiques. Ensuite, utilisez des Foyers pour optimiser chaque statistique jusqu'à 100%, créant ainsi une gemme parfaitement optimisée."
        }
      ]
    },
    rerollSection: {
      step: "01",
      title: "Relancer & Déplacer les Stats",
      cards: [
        {
          num: "01",
          title: "Étincelle de Chaos Contenue",
          body: "Utilisez les Étincelles de Chaos à la Forge de Gemmes pour <strong>relancer les stats indésirables</strong> vers des attributs cruciaux comme la <em>Lumière, les Dégâts Physiques/Magiques ou les Dégâts Critiques</em>."
        },
        {
          num: "02",
          title: "Éruption de Chaos Contenue",
          body: "Utilisez les Éruptions de Chaos pour <strong>déplacer les boosts de stats</strong> (les petites gemmes à côté des stats) vers votre statistique la plus vitale - idéalement la <em>Lumière</em> pour les Cosmiques, ou les Dégâts/Dégâts Critiques."
        },
        {
          num: "03",
          title: "Foyers du Bâtisseur",
          body: "Augmentez le pourcentage de base de chaque statistique jusqu'à <strong>100%</strong> en utilisant des Foyers Bruts, Précis et Supérieurs pour maximiser le Power Rank total."
        }
      ]
    },
    tiersSection: {
      step: "02",
      title: "Les différents tiers de gemmes",
      subtitle: "Bien que Trove propose plusieurs tiers de gemmes, seuls les tiers <strong style=\"color: rgb(226, 232, 240);\">Radiant</strong>, <strong style=\"color: #f59e0b;\">Stellaire</strong>, <strong style=\"color: #2effee;\">Cristal</strong> et <strong style=\"color: #c084fc;\">Mystique</strong> fournissent des statistiques valant la peine d'investir pour la progression endgame. Sélectionnez une carte ci-dessous pour inspecter les plafonds de tier, le scaling de Power Rank et les convertisseurs.",
      labels: {
        maxLevel: "NIVEAU MAX",
        maxLevelSub: "Plafond de niveau pour ce tier.",
        eachRoll: "CHAQUE NOUVEAU ROLL",
        eachRollSub: "Ajouté aux niveaux paliers (5 / 10 / 15).",
        maxPr: "POWER RANK MAX",
        maxPrSub: "Gemme Renforcée parfaite au max.",
        levelCap: "Niveau max :"
      },
      tiersData: {
        radiant: { title: "Radiant", desc: "Gemmes d'entrée de milieu de jeu. Bonnes pour faire vos premiers pas dans les mondes Uber élevés, mais remplacées rapidement en endgame." },
        stellar: { title: "Stellaire", desc: "Base solide pour le farm de haut niveau. Essentielle pour atteindre l'Uber 10 avant de pouvoir passer au niveau Cristal.", convCost: "1 000 Crédits ou 10 000 Cubits", convNote: "Conserve le niveau de la gemme et les augmentations de stats !" },
        crystal: { title: "Cristal", desc: "Le début de la vraie puissance endgame. Power Rank élevé par niveau et requis pour la progression en Uber 11+.", convCost: "1 500 Crédits ou 15 000 Cubits", convNote: "Conserve le niveau de la gemme et les augmentations de stats !" },
        mystic: { title: "Mystique", desc: "Le sommet absolu des gemmes. Offre le maximum possible de Lumière, de Power Rank et de plafonds de stats dans tout le jeu." }
      }
    },
    statsSection: {
      title: "Distribution Optimale des Stats",
      tabs: {
        empowered: "Gemmes Cosmiques",
        elemental: "Gemmes Élémentaires (Eau / Feu / Air)"
      },
      cosmicStats: [
        { name: "Stat 1 : Lumière", priority: "INDISPENSABLE (3x Boosts)" },
        { name: "Stat 2 : Dégâts Physiques / Magiques", priority: "Recommandé" },
        { name: "Stat 3 : Dégâts Critiques", priority: "Recommandé" }
      ],
      elementalStats: [
        { name: "Stat 1 : Dégâts Physiques / Magiques", priority: "Stat Principale" },
        { name: "Stat 2 : Dégâts Critiques", priority: "Stat Principale" },
        { name: "Stat 3 : Coup Critique (jusqu'à 100%)", priority: "Stat Flex" }
      ]
    },
    proTip: {
      title: "Garder en tête !",
      body: "Commencez toujours avec des <strong>gemmes Stellaires/Cristal à 3 stats</strong> au niveau 1. Si une gemme ne tombe qu'avec 2 stats, elle perd 1 boost au niveau 5, ce qui limite son Power Rank maximal bien plus bas qu'une gemme parfaite à 3 stats !"
    },
    convertersSection: {
      title: "Convertisseurs de Gemmes Cristal et Mystique",
      crystal: {
        title: "Convertisseur de Gemme Cristal",
        text: "Améliore une <strong>Gemme Stellaire</strong> maxée directement en <strong>Gemme Cristal</strong>. Il conserve tous les tirages de stats existants, la progression de niveau et les augmentations pour ne pas avoir à tout recommencer à zéro."
      },
      mystic: {
        title: "Convertisseur de Gemme Mystique",
        text: "Améliore une <strong>Gemme Cristal</strong> au tier ultime <strong>Mystique</strong>. Parfait pour les joueurs endgame visant le maximum absolu de Lumière et de Power Rank sans sacrifier leurs investissements de stats."
      },
      note: "<strong>Note :</strong> Les convertisseurs ne sont pas obligatoires, mais ils ont un usage précis. Bien que les gemmes de haut tier puissent tomber naturellement dans les mondes difficiles, les convertisseurs sont idéaux lorsque vous avez déjà une gemme maxée et souhaitez passer au tier suivant sans perdre ses stats ou ses augmentations."
    },
    lesserVsEmpowered: {
      step: "03",
      title: "Gemmes Mineures vs Renforcées",
      intro: "Les gemmes dans Trove sont divisées en deux catégories fondamentales. Alors que les Gemmes Mineures forment votre base de statistiques, les Gemmes Renforcées définissent votre build avec des capacités uniques.",
      lesser: {
        tag: "COMMUN - RESTREINT",
        title: "Gemme Mineure",
        intro: "Les gemmes mineures sont communes. Elles sont verrouillées à un seul type de dégâts et n'ont pas de capacité spéciale - mais comme vous en équipez beaucoup, leurs statistiques combinées s'additionnent.",
        list: [
          "<strong>Restriction :</strong> Les gemmes Féroces tirent des stats Physiques, tandis que les Arcaniques tirent des stats Magiques.",
          "<strong>Tirages :</strong> Viennent avec deux ou trois statistiques, chacune tirée à une puissance aléatoire.",
          "<strong>Augmentation :</strong> Améliorez les statistiques pour combler l'écart vers le 100% parfait."
        ]
      },
      empowered: {
        tag: "\"NON RESTREINT\" & RARE",
        title: "Gemme Renforcée",
        intro: "Les gemmes renforcées sont plus puissantes et plus rares. Elles retirent la restriction de type de dégâts, offrent une plage de statistiques plus élevée et possèdent une capacité spéciale.",
        list: [
          "<strong>Capacité Unique :</strong> Accorde une capacité spéciale, ou une capacité de classe sur les Gemmes de Classe.",
          "<strong>Unique :</strong> Chaque capacité est unique - deux gemmes équipées ne peuvent jamais avoir la même capacité.",
          "<strong>Stats de Base Élevées :</strong> Plage de statistiques supérieure et commence avec +100 Power Rank.",
          "<strong>Fort Impact :</strong> Vous en équipez peu - chacune est une amélioration majeure."
        ]
      },
      obtainLesser: {
        title: "Comment obtenir des Gemmes Mineures ?",
        worlds: {
          title: "Mondes",
          note: "Dans les Mondes d'Aventure, vous obtenez des gemmes mineures selon la difficulté du monde. Les Mondes d'Aventure sont plus restreints car ils nécessitent des prérequis de Lumières spécifiques."
        },
        delves: {
          title: "Delves",
          info: "Delves 160+ : <span class=\"styles_delvetext\">Explorez les Delves jusqu'à une profondeur de 160+ et gagnez les mêmes boîtes de gemmes qu'en Monde D15.</span><br />Power Rank : <span class=\"styles_delvetext\">Un minimum de <strong class=\"styles_prStrong\">15 000</strong> Power Rank est requis pour accéder à certaines profondeurs.</span><br />Sans prérequis de Lumière : <span class=\"styles_delvetext\">Les Delves ne sont pas restreintes par la Lumière, vous permettant de progresser peu importe votre Lumière actuelle.</span>",
          note: "Les Delves sont un raccourci vers les gemmes mystiques. Compléter des <strong class=\"styles_noteStrong\">delves 165+</strong> équivaut aux mondes D15, mais avec moins de restrictions. Utile pour sauter les gemmes Stellaires et Cristal."
        }
      },
      obtainEmpowered: {
        title: "Comment obtenir des Gemmes Renforcées ?",
        cards: [
          {
            tag: "ARTISANAT & SHADOW TOWER",
            title: "Boîte de Gemmes Renforcées",
            desc: "Obtenue en échangeant des <span class=\"styles_lunarsouls\">Âmes Lunaires</span> au Marché Ombreux. Donne des Gemmes Renforcées <span class=\"styles_radiant\">Radiantes</span> ou <span class=\"styles_stellar\">Stellaires</span>, et rarement des <span class=\"styles_classgemkey\">Fragments de Clé de Gemme de Classe</span> ou des <span class=\"styles_dragonegg\">Œufs de Dragon Diamant</span>."
          },
          {
            tag: "STELLAIRE GARANTIE",
            title: "Boîte de Gemmes Renforcées Stellaires",
            desc: "Garantit une Gemme Renforcée de tier <span class=\"styles_stellar\">Stellaire</span> à l'ouverture. Essentielle pour sauter les tiers Radiants. Peut être fabriquée sur le Banc d'Artisanat d'Aventure."
          },
          {
            tag: "TOME & RÉCOMPENSE",
            title: "Édition Boîte de Gemmes Renforcées",
            desc: "Boîte spéciale obtenue passivement en complétant le Tome de Gemmes Renforcées ou lors d'événements. <br />Parfait pour une progression régulière en endgame. Utilisable une fois par semaine."
          },
          {
            tag: "CLASSEMENT",
            title: "Récompenses du Classement",
            desc: "L'un des moyens les plus simples d'obtenir des Boîtes de Gemmes Renforcées est de participer aux concours du Classement. Chaque semaine, 3 classes doivent <br />atteindre 125 points de classement pour recevoir des boîtes au réinitialisation."
          },
          {
            tag: "MARCHAND RADIANT",
            title: "Souverains Radiants",
            desc: "Possibilité d'acheter des Boîtes de Gemmes Renforcées chez le Marchand Radiant contre des Souverains Radiants. S'obtiennent lors de l'achat de crédits dans la boutique."
          },
          {
            tag: "ARTISANAT",
            title: "Banc d'Aventure",
            desc: "Sur le Banc d'Artisanat d'Aventure, vous pouvez fabriquer tout type de Boîtes de Gemmes, mais ces boîtes sont Mystiques et les ressources plus difficiles à rassembler. Pas rentable sur le long terme."
          }
        ]
      }
    },
    gemTypes: {
      step: "04",
      title: "Types & Éléments de Gemmes",
      note: "Un Élément détermine où une gemme peut être équipée et quelles statistiques elle peut tirer. Alors que les trois gemmes Élémentaires suivent les mêmes règles, les gemmes Cosmiques ont leurs propres mécaniques.",
      elemental: {
        title: "Trois Châssis Élémentaires",
        desc: "Les gemmes d'Eau, de Feu et d'Air partagent les mêmes tirages de stats et la même liste de capacités — la seule différence est le châssis. Choisissez l'élément requis par votre classe et vos châssis disponibles.",
        canRoll: "Stats Possibles :",
        stats: ["Dégâts (Phys / Mag)", "Dégâts Critiques", "Coup Critique", "Santé Max", "Santé Max %"],
        abilitiesTitle: "Capacités Renforcées Partagées :",
        abilities: "Malédiction Cuisante (Stinging Curse) | Vitesse Volatile (Volatile Velocity) | Poussée Spirituelle (Spirit Surge) | Mojo Enisé (Mired Mojo) | Pyrodisque (Pyrodisc) | Épilogue Explosif (Explosive Epilogue) | Rideau Cubique (Cubic Curtain)",
        restriction: "<strong>Restriction :</strong> Une seule gemme par capacité équipée à la fois. Vous ne pouvez pas équiper la même capacité deux fois."
      },
      cosmic: {
        title: "Châssis Cosmique Spécial",
        desc: "Les gemmes Cosmiques sont différentes des autres éléments. L'un des emplacements de statistiques garantit toujours la <strong>Lumière</strong> - la statistique qui propulse votre progression dans Geode et l'endgame Cosmique.",
        highlight: "Les gemmes Cosmiques possèdent leur propre liste de capacités Renforcées et s'équipent dans trois châssis Cosmiques dédiés aux côtés de vos gemmes Élémentaires, permettant de maximiser votre Lumière totale.",
        uniqueFeature: "Caractéristique Unique :",
        stats: ["Stat Lumière Garantie", "Dégâts", "Dégâts Critiques"],
        abilitiesTitle: "Capacités Cosmiques :",
        abilities: "Combattant Berzerk (Berserk Battler) | Barrière Épyréenne (Empyrean Barrier) | Vainqueur Vampirique (Vampirian Vanquisher) | Pouvoir Fleur (Flower Power)"
      },
      dragonBonus: {
        badge: "BOOST DE STAT PASSORT",
        title: "Dragons Primordiaux",
        desc: "Chaque élément possède son propre Dragon Primordial, fournissant un boost de +10% à chaque gemme de cet élément. Il y a un Dragon Primordial pour l'Eau, le Feu, l'Air et le Cosmique. Débloquer les quatre vous offre le boost maximal possible pour vos stats et votre potentiel de Power Rank."
      }
    },
    classGemsSection: {
  step: "05",
  title: "Gemmes de Classe",
  subtitle: "Pouvoirs Déterminants de Build",
  intro: "Chaque classe possède sa propre gemme unique. Une Gemme de Classe est une Gemme Renforcée spéciale liée à une classe spécifique qui modifie l'une de ses capacités, offrant une amélioration puissante qui peut être équipée comme n'importe quelle autre Gemme Renforcée.",
  cards: {
    onePerClass: {
      title: "Une par classe",
      desc: "Chaque classe a sa propre Gemme de Classe unique, et seule cette classe peut l'équiper. Changer de classe signifie passer à une autre Gemme de Classe."
    },
    rewritesAbility: {
      title: "Modifie une capacité",
      desc: "Au lieu de fournir simplement des statistiques supplémentaires, une Gemme de Classe modifie l'une des capacités de la classe, changeant souvent considérablement son fonctionnement."
    },
    howToGet: {
      title: "Comment l'obtenir",
      desc: "Terminez un Colisée des Ombres dans les Rivages de l'Éternelle Obscurité. Une fois terminé, ouvrez le coffre avec une clé de gemme de classe."
    }
  },
  selectorTitle: "Sélectionnez une Gemme de Classe pour voir sa capacité :",
  selectedLabel: "GEMME DE CLASSE SÉLECTIONNÉE",
  gems: {
    bard: { 
      name: "Barde", 
      ability: "Maître de la Mélodie", 
      desc: [
        "L'explosion inflige 800% de dégâts magiques aux ennemis proches et redirige temporairement l'aggro. Confère aux alliés proches +45% de dégâts physiques/magiques et +45% de dégâts critiques.",
        "Soigne les alliés proches de 45% des PV max et confère 15% de vol de vie en infligeant des dégâts. Étourdit également les ennemis proches pendant 3 secondes.",
        "Augmente la vitesse de déplacement de 40% et l'énergie max de 50. Confère aux alliés 50% de chances de restaurer de l'énergie en infligeant des dégâts."
      ] 
    },
    boomeranger: { 
      name: "Boomeranger", 
      ability: "Bomba-Cot", 
      desc: [
        "Petites Bombes devient une Bomba-Cot. Génère des poulets qui attaquent les ennemis pendant une courte durée.",
        "Grosse Bombe devient une Bomba-Cot. Génère des poulets qui attaquent les ennemis pendant une courte durée."
      ] 
    },
    candybarbarian: { name: "Barbare Sucré", ability: "Cuillère & Glu", desc: "Crash Sucré saute désormais de 4 blocs vers le haut et s'écrase, infligeant des dégâts de zone, aspirant les ennemis dans un rayon de 3-4 blocs vers vous et appliquant un court ralentissement." },
    chloromancer: { name: "Chloromancien", ability: "Pouvoir Botanique", desc: "Lorsque Croissance Renforcée est active, le Chloromancien soigne les plantes et alliés proches de 10% toutes les 1,5s pendant 12s." },
    dinotamer: { name: "Dompteur de Dinos", ability: "Heure Dino", desc: "Augmente la durée et la vitesse d'attaque de la Monture Dino." },
    dracolyte: { name: "Dracolyte", ability: "Aura Brûlante", desc: "Lorsqu'une Offrande Brûlée détonne, elle fait également apparaître un mini dracolyte qui attaque les ennemis pendant une courte durée." },
    faetrickster: { name: "Farfadotier", ability: "Égo Préservé", desc: "Le Farfadotier peut subir un coup supplémentaire avant de perdre le bonus de dégâts d'Égo Blast. Se réinitialise après 4s sans subir de dégâts." },
    gunslinger: { name: "Pistoléro", ability: "Surcharge", desc: "Tir en Courant n'augmente plus la vitesse d'attaque mais la réduit de 25%. Tous les tirs deviennent des Tirs Chargés au maximum." },
    icesage: { name: "Sage de Glace", ability: "Gel Dououreux", desc: "En plus des effets de Cœur Glacé, la première attaque de base gèle la cible pendant 1s, et les ennemis touchés par 3 attaques de base explosent." },
    knight: { name: "Chevalier", ability: "Écuyer Spectral", desc: "Charge ne vous propulse plus vers l'avant. À la place, un Écuyer Spectral charge à travers plusieurs ennemis, infligeant des dégâts et les étourdissant pendant 1s." },
    lunarlancer: { name: "Lancier Lunaire", ability: "Lancier Sombre", desc: "Les attaques de base à la lance ont une chance de faire apparaître un double d'ombre qui attaque les ennemis. En forme lunaire, la chance est augmentée." },
    neonninja: { name: "Ninja Néon", ability: "Haxstar Heuristique", desc: "Les shurikens d'Étoile Brillante sont remplacés par une scie circulaire géante qui perce les ennemis et applique l'immobilisation de Lame de Stase." },
    pirate: { name: "Capitaine Pirate", ability: "ARR-tillerie", desc: "Permet au Second de déployer une tourelle supplémentaire. Les deux tourelles s'améliorent avec les mêmes Doublons." },
    revenant: { name: "Revenant", ability: "Assaut de l'Égide", desc: "Coup de Bouclier n'a plus de temps de recharge et applique un effet de dégâts sur la durée cumulable infligeant 66% de dégâts physiques par seconde." },
    shadowhunter: { name: "Chasseur d'Ombres", ability: "Blitz Sombre", desc: "L'attaque de base devient une rafale continue de flèches à haute vitesse." },
    solarion: { name: "Solarion", ability: "Lien Prismatique", desc: "Éclat Prismatique pulse désormais autour du Phénix ainsi que du Solarion, lui permettant de maintenir sa distance tout en infligeant des dégâts de zone autour du Phénix." },
    tombraiser: { name: "Invocateur de Tombes", ability: "Invocatrice Banshee", desc: "Bénédiction de la Banshee invoque également une banshee qui soigne vos squelettes et blesse les ennemis. De plus, quand elle meurt, elle attire une Âme Inquiète." },
    vanguardian: { name: "Vanguardien", ability: "Manteau du Héros", desc: "Chaque troisième attaque de base de mêlée et chaque quatrième attaque de base à distance réduit les temps de recharge des capacités de 2s." }
  }
}
  },
  es: {
    hero: {
      badge: "Progresión Endgame",
      title: "Maximizar Estadísticas de Gemas",
      description: "Guía completa para optimizar tus Gemas Mejoradas y Menores, cambiar estadísticas, mover mejoras y aumentar hasta alcanzar el Power Rank y la Luz máximos."
    },
    dock: {
      tiers: "Rangos de Gemas",
      lesserEmpowered: "Menores y Mejoradas",
      classGems: "Gemas de Clase",
      structure: "Estructura",
      stats: "Estadísticas Óptimas",
      leveling: "Nivelación",
      perfecting: "Perfeccionamiento",
      builds: "Builds de Gemas"
    },
    scrolly: {
      title: "Aprende lo básico sobre gemas",
      subtitle: "Cada gema del juego sigue este patrón. Una vez que comprendas lo básico, podrás profundizar más en los detalles de las gemas.",
      steps: [
        {
          num: "1",
          tier: "Límite de Rango",
          title: "El Rango determina su potencial",
          description: "El rango de una gema determina su potencial máximo, incluyendo hasta qué nivel puede subir y qué tan potentes pueden llegar a ser sus estadísticas. Aunque Trove cuenta con varios rangos, los cuatro más importantes son <strong style=\"color: #e2e8f0;\">Radiante</strong>, <strong style=\"color: #f59e0b;\">Estelar</strong>, <strong style=\"color: #2effee;\">Cristal</strong> y <strong style=\"color: #c084fc;\">Místico</strong>. El rango de una gema nunca cambia al subir de nivel, pero se puede mejorar un rango con un Convertidor manteniendo todo su progreso."
        },
        {
          num: "2",
          tier: "Clasificación",
          title: "Menores vs Mejoradas",
          description: "Las Gemas Menores están limitadas a un solo tipo de daño. Las Gemas Mejoradas eliminan esa limitación, ofrecen valores de estadísticas más altos y vienen con una habilidad especial única. Como puedes equipar muchas menos Gemas Mejoradas, elegir las correctas es mucho más importante."
        },
        {
          num: "3",
          tier: "Engastes",
          title: "El Elemento determina el engaste",
          description: "Cada gema pertenece a uno de los cuatro elementos: Agua, Fuego, Aire o Cósmico. Una gema solo se puede colocar en un engaste que coincida con su elemento. Las Gemas Cósmicas son únicas porque siempre incluyen la estadística de Luz que no se puede cambiar."
        },
        {
          num: "4",
          tier: "Estadísticas",
          title: "Comprendiendo las estadísticas",
          description: "Al obtener una gema, esta genera al azar dos o tres estadísticas de un grupo que incluye Daño, Daño Crítico, Golpe Crítico y Salud. Cada estadística también viene con un valor aleatorio. Comprueba siempre las estadísticas de una gema antes de invertir en ella, y conserva solo las que vengan con las tres estadísticas."
        },
        {
          num: "5",
          tier: "Optimización",
          title: "Maximiza su potencial",
          description: "Una vez que tengas una buena gema, súbela de nivel con Polvo de Gemas para aumentar su Power Rank y desbloquear mejoras de estadísticas adicionales. Después, usa Enfoques para optimizar cada estadística hasta alcanzar el 100%, creando una gema totalmente perfeccionada."
        }
      ]
    },
    rerollSection: {
      step: "01",
      title: "Cambiar y Mover Estadísticas",
      cards: [
        {
          num: "01",
          title: "Chispa de Caos Contenida",
          body: "Usa Chispas de Caos en la Forja de Gemas para <strong>cambiar estadísticas no deseadas</strong> a atributos cruciales como <em>Luz, Daño Físico/Mágico o Daño Crítico</em>."
        },
        {
          num: "02",
          title: "Brote de Caos Contenido",
          body: "Usa Brotes de Caos para <strong>mover las mejoras de estadísticas</strong> (las pequeñas gemas junto a las estadísticas) a tu estadística más vital, idealmente <em>Luz</em> para las Cósmicas, o Daño/Daño Crítico."
        },
        {
          num: "03",
          title: "Enfoques del Constructor",
          body: "Aumenta el porcentaje base de cada estadística hasta el <strong>100%</strong> usando Enfoques Rústicos, Precisos y Superiores para maximizar el Power Rank total."
        }
      ]
    },
    tiersSection: {
      step: "02",
      title: "Rangos entre las gemas",
      subtitle: "Aunque Trove cuenta con varios rangos de gemas, solo los rangos <strong style=\"color: rgb(226, 232, 240);\">Radiante</strong>, <strong style=\"color: #f59e0b;\">Estelar</strong>, <strong style=\"color: #2effee;\">Cristal</strong> y <strong style=\"color: #c084fc;\">Místico</strong> ofrecen estadísticas en las que vale la pena invertir para el progreso endgame. Selecciona una tarjeta para inspeccionar límites, Power Rank y convertidores.",
      labels: {
        maxLevel: "NIVEL MÁXIMO",
        maxLevelSub: "Límite de nivel para este rango.",
        eachRoll: "CADA NUEVA MEJORA",
        eachRollSub: "Añadido en niveles hito (5 / 10 / 15).",
        maxPr: "POWER RANK MÁXIMO",
        maxPrSub: "Gema Mejorada al máximo perfecto.",
        levelCap: "Límite de nivel:"
      },
      tiersData: {
        radiant: { title: "Radiante", desc: "Gemas de entrada para juego medio. Útiles para dar el paso a mundos Uber superiores, pero se reemplazan rápidamente en el endgame." },
        stellar: { title: "Estelar", desc: "Base sólida para farmear en niveles altos. Esencial para alcanzar Uber 10 antes de poder subir al rango Cristal.", convCost: "1.000 Créditos o 10.000 Cubitos", convNote: "¡Conserva el nivel de la gema y los aumentos de estadísticas!" },
        crystal: { title: "Cristal", desc: "Donde empieza el verdadero poder endgame. Alto Power Rank por nivel y necesaria para progresar en Uber 11+.", convCost: "1.500 Créditos o 15.000 Cubitos", convNote: "¡Conserva el nivel de la gema y los aumentos de estadísticas!" },
        mystic: { title: "Místico", desc: "El rango definitivo. Ofrece la máxima Luz, Power Rank y límites de estadísticas posibles en todo el juego." }
      }
    },
    statsSection: {
      title: "Distribución Óptima de Estadísticas",
      tabs: {
        empowered: "Gemas Cósmicas",
        elemental: "Gemas Elementales (Agua / Fuego / Aire)"
      },
      cosmicStats: [
        { name: "Estadística 1: Luz", priority: "OBLIGATORIO (3x Mejoras)" },
        { name: "Estadística 2: Daño Físico / Mágico", priority: "Recomendado" },
        { name: "Estadística 3: Daño Crítico", priority: "Recomendado" }
      ],
      elementalStats: [
        { name: "Estadística 1: Daño Físico / Mágico", priority: "Estadística Base" },
        { name: "Estadística 2: Daño Crítico", priority: "Estadística Base" },
        { name: "Estadística 3: Golpe Crítico (hasta 100%)", priority: "Estadística Flexible" }
      ]
    },
    proTip: {
      title: "¡Ten en cuenta!",
      body: "Empieza siempre con <strong>gemas Estelares/Cristal de 3 estadísticas</strong> a nivel 1. Si una gema solo viene con 2 estadísticas, perderá 1 mejora al nivel 5, limitando su Power Rank máximo mucho más abajo que una gema perfecta de 3 estadísticas."
    },
    convertersSection: {
      title: "Convertidores de Gemas Cristal y Místicas",
      crystal: {
        title: "Convertidor de Gema Cristal",
        text: "Mejora una <strong>Gema Estelar</strong> al máximo directamente a <strong>Gema Cristal</strong>. Mantiene todos los valores de estadísticas, la progresión de nivel y las mejoras para que no tengas que reiniciar tu gema desde cero."
      },
      mystic: {
        title: "Convertidor de Gema Mística",
        text: "Lleva tu <strong>Gema Cristal</strong> al rango supremo <strong>Místico</strong>. Perfecto para jugadores de endgame que buscan el límite máximo de Luz y Power Rank sin sacrificar sus inversiones de estadísticas."
      },
      note: "<strong>Nota:</strong> Los convertidores no son obligatorios, pero tienen un uso específico. Aunque las gemas de alto rango pueden obtenerse de forma natural en mundos difíciles, los convertidores son ideales cuando ya tienes una gema al máximo y quieres subirla al siguiente rango sin perder sus estadísticas."
    },
    lesserVsEmpowered: {
      step: "03",
      title: "Gemas Menores vs Mejoradas",
      intro: "Las gemas en Trove se dividen en dos categorías fundamentales. Mientras que las Gemmas Menores forman tu base de estadísticas, las Gemas Mejoradas definen tu estilo de juego con habilidades únicas.",
      lesser: {
        tag: "COMÚN - RESTRINGIDO",
        title: "Gema Menor",
        intro: "Las gemas menores son comunes. Están limitadas a un solo tipo de daño y no tienen habilidad especial, pero como equipas muchas, sus estadísticas combinadas se suman.",
        list: [
          "<strong>Restricción:</strong> Las gemas Fieras dan estadísticas Físicas, mientras que las Arcanas dan Mágicas.",
          "<strong>Estadísticas:</strong> Vienen con dos o tres estadísticas, cada una con un valor aleatorio.",
          "<strong>Aumento:</strong> Mejora y perfecciona las estadísticas para acercarte al 100% perfecto."
        ]
      },
      empowered: {
        tag: "\"SIN RESTRICCIÓN\" & RARA",
        title: "Gema Mejorada",
        intro: "Las gemas mejoradas son más potentes y raras de conseguir. Eliminan la restricción de tipo de daño, vienen con valores más altos e incluyen una habilidad especial.",
        list: [
          "<strong>Habilidad Única:</strong> Concede una habilidad especial o de clase en Gemas de Clase.",
          "<strong>Única:</strong> Cada habilidad es única: dos gemas equipadas nunca pueden tener la misma habilidad.",
          "<strong>Estadísticas Base Altas:</strong> Rango de estadísticas superior y comienza con +100 de Power Rank.",
          "<strong>Gran Impacto:</strong> Solo equipas unas pocas: cada una es una mejora importante."
        ]
      },
      obtainLesser: {
        title: "¿Cómo obtener Gemas Menores?",
        worlds: {
          title: "Mundos",
          note: "En los Mundos de Aventura obtienes gemas menores según la dificultad del mundo. Los Mundos de Aventura son más restringidos porque requieren requisitos de Luz específicos."
        },
        delves: {
          title: "Delves",
          info: "Delves 160+: <span class=\"styles_delvetext\">Explora Delves hasta profundidad 160+ y gana las mismas cajas de gemas que en Mundos D15.</span><br />Power Rank: <span class=\"styles_delvetext\">Se requiere un mínimo de <strong class=\"styles_prStrong\">15.000</strong> de Power Rank para acceder a ciertas profundidades.</span><br />Sin requisito de Luz: <span class=\"styles_delvetext\">Las Delves no están restringidas por la Luz, lo que te permite progresar sin importar tu Luz actual.</span>",
          note: "Las Delves son un atajo directo a las gemas místicas. Completar <strong class=\"styles_noteStrong\">Delves 165+</strong> es equivalente a los mundos D15, pero con menos restricciones. Muy útil para saltarse gemas Estelares y Cristal."
        }
      },
      obtainEmpowered: {
        title: "¿Cómo obtener Gemas Mejoradas?",
        cards: [
          {
            tag: "FORJA Y TORRE SOMBRÍA",
            title: "Caja de Gemas Mejoradas",
            desc: "Se obtiene canjeando <span class=\"styles_lunarsouls\">Almas Lunares</span> en el Mercado Sombrío. Otorga Gemas Mejoradas <span class=\"styles_radiant\">Radiantes</span> o <span class=\"styles_stellar\">Estelares</span>, y raramente <span class=\"styles_classgemkey\">Fragmentos de Llave de Gema de Clase</span> o <span class=\"styles_dragonegg\">Huevos de Dragón Diamante</span>."
          },
          {
            tag: "ESTELAR GARANTIZADA",
            title: "Caja de Gemas Mejoradas Estelares",
            desc: "Garantiza una Gema Mejorada de rango <span class=\"styles_stellar\">Estelar</span> al abrirla. Esencial para saltarse rangos Radiantes inferiores. Se puede fabricar en el Banco de Aventura."
          },
          {
            tag: "TOMO Y RECOMPENSA",
            title: "Edición Caja de Gemas Mejoradas",
            desc: "Caja especial que se obtiene de forma pasiva al completar el Tomo de Gemas Mejoradas o eventos. <br />Excelente para una progresión constante. Se puede usar una vez por semana."
          },
          {
            tag: "CLASIFICACIÓN",
            title: "Recompensas de Clasificación",
            desc: "Una de las formas más fáciles de obtener cajas es participar en los concursos de Clasificación. Cada semana hay 3 clases que deben alcanzar 125 puntos para recibir Cajas de Gemas Mejoradas en el siguiente reinicio."
          },
          {
            tag: "MERCADER RADIANTE",
            title: "Soberanos Radiantes",
            desc: "Existe la opción de comprar Cajas de Gemas Mejoradas en el Mercader Radiante a cambio de Soberanos Radiantes, los cuales se obtienen al comprar créditos en la tienda."
          },
          {
            tag: "FABRICACIÓN",
            title: "Banco de Aventura",
            desc: "En el Banco de Aventura puedes fabricar cualquier tipo de Caja de Gemas, pero estas son Místicas y los recursos son más difíciles de reunir. No vale la pena a largo plazo."
          }
        ]
      }
    },
    gemTypes: {
      step: "04",
      title: "Tipos y Elementos de Gemas",
      note: "Un Elemento determina dónde se puede equipar una gema y qué estadísticas puede tener. Mientras que las tres gemas Elementales siguen las mismas reglas, las Cósmicas tienen sus propias mecánicas.",
      elemental: {
        title: "Tres Engastes Elementales",
        desc: "Las gemas de Agua, Fuego y Aire comparten las mismas estadísticas y habilidades: la única diferencia es el engaste en el que encajan. Elige el elemento que requiera tu clase y tus engastes disponibles.",
        canRoll: "Estadísticas Posibles:",
        stats: ["Daño (Fís / Mág)", "Daño Crítico", "Golpe Crítico", "Salud Máx", "Salud Máx %"],
        abilitiesTitle: "Habilidades Mejoradas Compartidas:",
        abilities: "Maldición Picante (Stinging Curse) | Velocidad Volátil (Volatile Velocity) | Oleada Espiritual (Spirit Surge) | Mojo Enfangado (Mired Mojo) | Girodisco (Pyrodisc) | Epílogo Explosivo (Explosive Epilogue) | Cortina Cúbica (Cubic Curtain)",
        restriction: "<strong>Restricción:</strong> Solo se puede equipar una gema de cada habilidad a la vez. No puedes equipar la misma habilidad dos veces."
      },
      cosmic: {
        title: "Engaste Cósmico Especial",
        desc: "Las gemas Cósmicas son diferentes a los otros elementos. Uno de sus espacios de estadísticas siempre garantiza la <strong>Luz</strong>, la estadística que impulsa tu progreso en Geode y el contenido endgame Cósmico.",
        highlight: "Las gemas Cósmicas tienen su propio grupo de habilidades y se equipan en tres engastes Cósmicos dedicados junto a tus gemas Elementales, permitiéndote maximizar tu Luz total.",
        uniqueFeature: "Característica Única:",
        stats: ["Luz Garantizada", "Daño", "Daño Crítico"],
        abilitiesTitle: "Habilidades Cósmicas:",
        abilities: "Luchador Berserker (Berserk Battler) | Barrera Empírea (Empyrean Barrier) | Vencedor Vampírico (Vampirian Vanquisher) | Poder Flor (Flower Power)"
      },
      dragonBonus: {
        badge: "MEJORA PASIVA DE ESTADÍSTICAS",
        title: "Dragones Primordiales",
        desc: "Cada elemento tiene su propio Dragón Primordial, que proporciona una mejora del +10% a cada gema de ese elemento. Hay un Dragón Primordial para Agua, Fuego, Aire y Cósmico. Desbloquear los cuatro te da la máxima mejora posible para tus estadísticas y Power Rank."
      }
    },
    classGemsSection: {
  step: "05",
  title: "Gemas de Clase",
  subtitle: "Poderes Definitorios de Build",
  intro: "Cada clase tiene su propia gema única. Una Gema de Clase es una Gema Mejorada especial vinculada a una clase específica que modifica una de sus habilidades, proporcionando una mejora potente que se puede equipar como cualquier otra Gema Mejorada.",
  cards: {
    onePerClass: {
      title: "Una por clase",
      desc: "Cada clase tiene su propia Gema de Clase única y solo puede ser equipada por esa clase. Cambiar de clase significa cambiar a una Gema de Clase diferente."
    },
    rewritesAbility: {
      title: "Modifica una habilidad",
      desc: "En lugar de simplemente proporcionar estadísticas adicionales, una Gema de Clase modifica una de las habilidades de la clase, cambiando significativamente su funcionamiento."
    },
    howToGet: {
      title: "Cómo obtenerla",
      desc: "Completa un Coliseo Sombrío en las Orillas de la Oscuridad Eterna. Al terminar, abre el cofre con una llave de gema de clase."
    }
  },
  selectorTitle: "Selecciona una Gema de Clase para ver su habilidad:",
  selectedLabel: "GEMA DE CLASE SELECCIONADA",
  gems: {
    bard: { 
      name: "Bardo", 
      ability: "Maestro de la Melodía", 
      desc: [
        "La explosión inflige un 800% de daño mágico a los enemigos cercanos y redirige temporalmente la amenaza. Otorga a los aliados cercanos +45% de daño físico/mágico y +45% de daño crítico.",
        "Cura a los aliados cercanos un 45% de la salud máxima y otorga un 15% de robo de vida al infligir daño. Además, aturde a los enemigos cercanos durante 3 segundos.",
        "Aumenta la velocidad de movimiento un 40% y la energía máxima en 50. Otorga a los aliados un 50% de probabilidad de restaurar energía al infligir daño."
      ] 
    },
    boomeranger: { 
      name: "Boomeranger", 
      ability: "Bomba-Cocorocó", 
      desc: [
        "Bombas Pequeñas se convierte en Bomba-Cocorocó. Genera pollos que atacan a los enemigos durante un breve período.",
        "Bomba Grande se convierte en Bomba-Cocorocó. Genera pollos que atacan a los enemigos durante un breve período."
      ] 
    },
    candybarbarian: { name: "Bárbaro Dulce", ability: "Cuchara y Engrudo", desc: "Choque de Azúcar ahora salta 4 bloques hacia arriba y cae en picado, infligiendo daño en área, aspirando a los enemigos en un radio de 3-4 bloques hacia ti y aplicando una breve ralentización." },
    chloromancer: { name: "Cloromante", ability: "Poder Botánico", desc: "Cuando Crecimiento Mejorado está activo, el Cloromante cura a las plantas y aliados cercanos un 10% cada 1.5s durante 12s." },
    dinotamer: { name: "Domador de Dinos", ability: "Hora Dino", desc: "Aumenta la duración y la velocidad de ataque de la Montura Dino." },
    dracolyte: { name: "Dracolito", ability: "Protección Ardiente", desc: "Cuando una Ofrenda Quemada detona, genera un mini dracolito que ataca a los enemigos durante un breve período." },
    faetrickster: { name: "Duende Truquero", ability: "Ego Protegido", desc: "El Duende Truquero puede recibir un golpe adicional antes de perder el bono de daño de Ego Blast. Se reinicia tras 4s sin recibir daño." },
    gunslinger: { name: "Pistolero", ability: "Sobrecargado", desc: "Correr y Disparar ya no aumenta la velocidad de ataque, sino que la reduce un 25%. Todos los disparos se convierten en Disparos Cargados al máximo." },
    icesage: { name: "Sabio de Hielo", ability: "Congelación Dolorosa", desc: "Además de los efectos de Corazón Helado, el primer ataque básico congela al objetivo durante 1s, y los enemigos alcanzados por 3 ataques básicos explotan." },
    knight: { name: "Caballero", ability: "Escudero Espiritual", desc: "Carga ya no te impulsa hacia adelante. En su lugar, un Escudero Espiritual carga a través de múltiples enemigos, infligiendo daño y aturdiéndolos durante 1s." },
    lunarlancer: { name: "Lancero Lunar", ability: "Lancero Sombrío", desc: "Los ataques básicos con lanza tienen la probabilidad de invocar una sombra oscura que ataca a los enemigos. En forma lunar la probabilidad aumenta." },
    neonninja: { name: "Ninja Neón", ability: "Haxstar Heurística", desc: "Los shurikens de Estrella Brillante se reemplazan por una sierra circular gigante que atraviesa enemigos y aplica la inmovilización de Hoja de Estasis." },
    pirate: { name: "Capitán Pirata", ability: "ARR-tillería", desc: "Permite al Segundo de Bordo desplegar una torreta adicional. Ambas torretas se mejorarán con los mismos Doblones." },
    revenant: { name: "Revenant", ability: "Asalto de la Hégida", desc: "Golpe de Baluarte pierde su tiempo de recarga y aplica un efecto de daño continuo acumulable que inflige un 66% de daño físico por segundo." },
    shadowhunter: { name: "Cazador de Sombras", ability: "Ráfaga Sombría", desc: "El ataque básico se convierte en una ráfaga continua de flechas a alta velocidad." },
    solarion: { name: "Solarion", ability: "Enlace Prismático", desc: "Ráfaga Prismática ahora pulsa alrededor del Fénix además del Solarion, permitiendo mantener la distancia mientras ataca e infligir daño en área alrededor del Fénix." },
    tombraiser: { name: "Profanador de Tumbas", ability: "Invocación de Banshee", desc: "Bendición de Banshee también invoca una banshee que cura a tus esqueletos y daña a los enemigos. Además, cuando muere atrae un Alma Inquieta." },
    vanguardian: { name: "Vanguardiano", ability: "Manto del Héroe", desc: "Cada tercer ataque básico cuerpo a cuerpo y cada cuarto ataque básico a distancia reduce el tiempo de recarga de las habilidades en 2s." }
  }
}
  },
  zh: {
    hero: {
      badge: "终局进度",
      title: "最大化宝石属性",
      description: "关于优化强化宝石与次级宝石、洗练属性、转移加成以及提升以达到最大战斗力等级与光芒值的完整指南。"
    },
    dock: {
      tiers: "宝石阶位",
      lesserEmpowered: "次级与强化",
      classGems: "职业宝石",
      structure: "宝石结构",
      stats: "最佳属性",
      leveling: "升级",
      perfecting: "完美化",
      builds: "宝石构建"
    },
    scrolly: {
      title: "了解宝石基础知识",
      subtitle: "游戏中的每一颗宝石都遵循此规则。一旦了解了基础知识，您就可以深入探索细节。",
      steps: [
        {
          num: "1",
          tier: "阶位上限",
          title: "阶位决定其潜力",
          description: "宝石的阶位决定了其最大潜力，包括等级上限和属性上限。核心阶位为：<strong style=\"color: #e2e8f0;\">辉耀</strong>、<strong style=\"color: #f59e0b;\">恒星</strong>、<strong style=\"color: #2effee;\">水晶</strong> 与 <strong style=\"color: #c084fc;\">神秘</strong>。"
        },
        {
          num: "2",
          tier: "分类",
          title: "次级宝石 vs 强化宝石",
          description: "次级宝石仅提供基础属性。强化宝石解除伤害限制，提供更强属性，并附带独特的特殊技能。"
        },
        {
          num: "3",
          tier: "插槽",
          title: "元素决定插槽",
          description: "每颗宝石属于水、火、气或宇宙四大元素之一。宝石只能放入对应元素的插槽中。"
        },
        {
          num: "4",
          tier: "属性生成",
          title: "理解属性生成",
          description: "宝石掉落时会随机生成2或3条属性。在投入资源之前务必检查属性，并仅保留初始具备3条属性的宝石。"
        },
        {
          num: "5",
          tier: "优化",
          title: "最大化其潜力",
          description: "获得优秀的宝石后，使用宝石粉末升级以提升战斗力。随后使用聚焦器将每项属性提升至100%，打造出完美宝石。"
        }
      ]
    },
    rerollSection: {
      step: "01",
      title: "洗练与转移属性",
      cards: [
        { num: "01", title: "封印混沌火花", body: "重置不理想的属性。" },
        { num: "02", title: "封印混沌耀斑", body: "转移属性加成点数。" },
        { num: "03", title: "建造者聚焦器", body: "提升属性基础百分比至100%。" }
      ]
    },
    tiersSection: {
      step: "02",
      title: "宝石的阶位划分",
      subtitle: "仅核心阶位值得在终局内容中投入资源。",
      labels: { maxLevel: "最大等级", maxLevelSub: "等级上限。", eachRoll: "全新提升", eachRollSub: "里程碑等级获得。", maxPr: "最大战斗力", maxPrSub: "完美满级强化宝石。", levelCap: "等级上限:" },
      tiersData: {
        radiant: { title: "辉耀", desc: "中期过渡宝石。" },
        stellar: { title: "恒星", desc: "刷怪基础。" },
        crystal: { title: "水晶", desc: "终局战力起点。" },
        mystic: { title: "神秘", desc: "巅峰阶位。" }
      }
    },
    statsSection: {
      title: "最佳属性分配",
      tabs: { empowered: "宇宙宝石", elemental: "元素宝石（水 / 火 / 气）" },
      cosmicStats: [{ name: "属性 1: 光芒值", priority: "必备" }],
      elementalStats: [{ name: "属性 1: 物理 / 魔法伤害", priority: "核心" }]
    },
    proTip: { title: "请牢记！", body: "务必从具备3条初始属性的宝石开始培养。" },
    convertersSection: { title: "水晶与神秘宝石转换器", crystal: { title: "水晶宝石转换器", text: "进阶为水晶宝石。" }, mystic: { title: "神秘宝石转换器", text: "进阶至神秘阶位。" }, note: "注意：转换器需要特定材料。" },
    lesserVsEmpowered: {
      step: "03", title: "次级宝石 vs 强化宝石", intro: "分为两大核心类别。",
      lesser: { tag: "普通 - 受限", title: "次级宝石", intro: "普通宝石，限制单种伤害类型。", list: ["限制伤害类型"] },
      empowered: { tag: "\"无限制\" & 稀有", title: "强化宝石", intro: "解除伤害限制并提供专属技能。", list: ["提供独特技能"] },
      obtainLesser: { title: "如何获得次级宝石？", worlds: { title: "世界", note: "根据难度掉落。" }, delves: { title: "地窖", info: "掉落宝石箱。", note: "地窖捷径。" } },
      obtainEmpowered: { title: "如何获得强化宝石？", cards: [{ tag: "制作", title: "强化宝石箱", desc: "阴影市场兑换。" }] }
    },
    gemTypes: {
      step: "04", title: "宝石类型与元素", note: "元素决定插槽。",
      elemental: { title: "三大元素插槽", desc: "共享属性池与技能池。", canRoll: "可生成属性：", stats: ["伤害", "暴击伤害"], abilitiesTitle: "共享技能：", abilities: "刺骨诅咒 | 烈焰光盘...", restriction: "同一技能只能装备一颗。" },
      cosmic: { title: "特殊宇宙插槽", desc: "必定包含光芒值。", highlight: "唯一光芒值来源！", uniqueFeature: "独特属性：", stats: ["光芒值"], abilitiesTitle: "宇宙技能：", abilities: "狂暴战士..." },
      dragonBonus: { badge: "被动属性加成", title: "始源龙", desc: "+10%属性提升。" }
    },
classGemsSection: {
  step: "05",
  title: "职业宝石",
  subtitle: "重塑机制的核心力量",
  intro: "每个职业都有其专属的独特宝石。职业宝石是一种绑定的特殊强化宝石，能够修改该职业的核心技能，提供强大的流派重塑造效果，装备方式与其他强化宝石相同。",
  cards: {
    onePerClass: {
      title: "专职专用",
      desc: "每个职业都有其专属的职业宝石，且只能由该职业装备。切换职业意味着需要更换对应的职业宝石。"
    },
    rewritesAbility: {
      title: "技能机制重写",
      desc: "职业宝石并非单纯提供额外属性，而是直接修改职业的核心技能，通常会显著改变其运作方式。"
    },
    howToGet: {
      title: "获取途径",
      desc: "前往永夜之海岸完成阴影竞技场挑战。通关后使用职业宝石钥匙开启宝箱即可获得。"
    }
  },
  selectorTitle: "点击下方职业宝石查看技能重写效果：",
  selectedLabel: "当前选择的职业宝石",
  gems: {
    bard: { 
      name: "吟游诗人", 
      ability: "旋律大师", 
      desc: [
        "爆炸对周围敌人造成 800% 魔法伤害并强行吸引仇恨。为附近盟友提供 +45% 物理/魔法伤害和 +45% 暴击伤害加成。",
        "治疗附近盟友 45% 最大生命值，并在造成伤害时提供 15% 生命吸取。此外，使周围敌人眩晕 3 秒。",
        "提升 40% 移动速度和 50 点最大能量。为盟友提供造成伤害时 50% 概率恢复能量的被动加成。"
      ] 
    },
    boomeranger: { 
      name: "回旋镖手", 
      ability: "咕咕炸弹", 
      desc: [
        "微型炸弹变为咕咕炸弹，召唤小鸡持续攻击敌人。",
        "大型炸弹变为咕咕炸弹，召唤小鸡持续攻击敌人。"
      ] 
    },
    candybarbarian: { name: "糖果野蛮人", ability: "冰淇淋猛砸", desc: "糖分冲撞改为向上跳跃 4 格后重重砸下，造成范围伤害并将 3-4 格内的敌人强行拉拽至身旁，施加短暂束缚。" },
    chloromancer: { name: "植物学者", ability: "植物潜能", desc: "强化生长激活时，植物学者可治疗附近植物与盟友，每 1.5 秒恢复 10% 生命值，持续 12 秒。" },
    dinotamer: { name: "驯龙师", ability: "恐龙时刻", desc: "延长恐龙坐骑的持续时间并提升攻击速度。" },
    dracolyte: { name: "龙法师", ability: "灼烧结界", desc: "献祭炸弹引爆时，会额外召唤一只小龙法师随从协助攻击敌人。" },
    faetrickster: { name: "仙子幻客", ability: "自我防护", desc: "仙子幻客在失去自尊冲击的额外伤害加成前可额外承受一次攻击。4 秒内未受伤害后重置。" },
    gunslinger: { name: "枪手", ability: "极限过载", desc: "移动射击不再提升攻击速度，反而降低 25% 攻速，但发射的所有子弹全部变为满蓄力炮弹。" },
    icesage: { name: "寒冰贤者", ability: "痛苦冻结", desc: "除了冷酷无情的原有效果外，对敌人的首次普通攻击会冻结目标 1 秒，被普通攻击命中 3 次的敌人会发生爆炸。" },
    knight: { name: "骑士", ability: "精神侍从", desc: "冲锋不再将自身向前推进，而是召唤一名精神侍从向前冲锋贯穿多个敌人，造成伤害并眩晕 1 秒。" },
    lunarlancer: { name: "月枪手", ability: "暗影枪手", desc: "长枪普通攻击有概率召唤暗影分身协助攻击敌人。变身月灵形态后召唤概率大幅提升。" },
    neonninja: { name: "霓虹忍者", ability: "启发式锯星", desc: "闪耀之星的手里剑替换为巨型电锯，穿透敌人并施加定身之刃的束缚效果。" },
    pirate: { name: "海盗船长", ability: "火力全开", desc: "允许大副额外部署一台炮台，两台炮台共享金币升级效果。" },
    revenant: { name: "亡灵骑士", ability: "神圣突袭", desc: "壁垒重击取消冷却时间，改为施加可叠加的持续伤害效果，每秒造成 66% 物理伤害。" },
    shadowhunter: { name: "暗影猎手", ability: "暗影速射", desc: "普通攻击变为加特林高射速箭雨形态。" },
    solarion: { name: "日轮者", ability: "棱镜链接", desc: "棱镜爆发现在会在凤凰与日轮者周围同时脉冲，允许日轮者保持距离攻击并在凤凰周围造成范围伤害。" },
    tombraiser: { name: "墓穴召唤师", ability: "女妖呼唤", desc: "女妖赐福会额外召唤一只女妖治疗你的骷髅并伤害敌人。女妖死亡时还会吸引一个躁动灵魂。" },
    vanguardian: { name: "前锋", ability: "英雄披风", desc: "近战普通攻击每第 3 次、远程普通攻击每第 4 次均可缩短技能冷却时间 2 秒。" }
  }
}
  },
};