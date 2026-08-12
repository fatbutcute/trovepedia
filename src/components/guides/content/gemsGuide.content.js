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
    }
  },
  ru: {
    hero: {
      badge: "Прогресс Эндгейма",
      title: "Максимизация Характеристик Самоцветов",
      description: "Полное руководство по оптимизации Усиленных и Малых Самоцветов, смене характеристик, переносу усилений и улучшению до максимального Ранга Силы и Света."
    },
    dock: {
      tiers: "Ранги Самоцветов",
      lesserEmpowered: "Малые и Усиленные",
      classGems: "Самоцветы Класса",
      structure: "Структура",
      stats: "Оптимальные Характеристики",
      leveling: "Прокачка",
      perfecting: "Совершенствование",
      builds: "Билды"
    },
    scrolly: {
      title: "Основы самоцветов",
      subtitle: "Каждый самоцвет в игре следует этим правилам. Как только вы поймете основы, вы сможете углубиться в детали.",
      steps: [
        {
          num: "1",
          tier: "Предел Ранга",
          title: "Ранг определяет потенциал",
          description: "Ранг самоцвета определяет его максимальный потенциал, включая максимальный уровень и мощность характеристик. Главные ранги: <strong style=\"color: #e2e8f0;\">Сияющий</strong>, <strong style=\"color: #f59e0b;\">Звездный</strong>, <strong style=\"color: #2effee;\">Кристаллический</strong> и <strong style=\"color: #c084fc;\">Мистический</strong>. Ранг самоцвета не меняется при повышении уровня, но его можно повысить с помощью Преобразователя с сохранением всего прогресса."
        },
        {
          num: "2",
          tier: "Классификация",
          title: "Малые и Усиленные",
          description: "Малые самоцветы ограничены одним типом урона. Усиленные самоцветы снимают это ограничение, предлагают более высокие характеристики и дают уникальную способность. Поскольку вы можете экипировать гораздо меньше Усиленных самоцветов, их выбор гораздо важнее."
        },
        {
          num: "3",
          tier: "Гнезда",
          title: "Стихия определяет гнездо",
          description: "Каждый самоцвет относится к одной из четырех стихий: Вода, Огонь, Воздух или Космос. Самоцвет можно поместить только в гнездо соответствующей стихии. Космические самоцветы уникальны тем, что всегда содержат характеристику Свет, которую нельзя изменить."
        },
        {
          num: "4",
          tier: "Характеристики",
          title: "Понимание характеристик",
          description: "При выпадении самоцвет случайным образом получает две или три характеристики из пула, включающего Урон, Критический Урон, Критический Удар и Здоровье. Всегда проверяйте характеристики перед вложением ресурсов и оставляйте только самоцветы с тремя начальными характеристиками."
        },
        {
          num: "5",
          tier: "Оптимизация",
          title: "Максимизация потенциала",
          description: "Получив хороший самоцвет, повышайте его уровень Пылью Самоцветов, чтобы увеличить Ранг Силы. Затем используйте Фокусы, чтобы довести каждую характеристику до 100%, создав идеальный самоцвет."
        }
      ]
    },
    rerollSection: {
      step: "01",
      title: "Смена и Перенос Характеристик",
      cards: [
        {
          num: "01",
          title: "Содержимая Искра Хаоса",
          body: "Используйте Искры Хаоса в Кузнице Самоцветов, чтобы <strong>изменить ненужные характеристики</strong> на важнейшие атрибуты, такие как <em>Свет, Физический/Магический Урон или Критический Урон</em>."
        },
        {
          num: "02",
          title: "Содержимая Вспышка Хаоса",
          body: "Используйте Вспышки Хаоса, чтобы <strong>перенести усиления характеристик</strong> на наиболее важный параметр — идеально на <em>Свет</em> для Космических самоцветов."
        },
        {
          num: "03",
          title: "Фокусы Строителя",
          body: "Увеличивайте базовый процент каждой характеристики до <strong>100%</strong> с помощью Фокусов, чтобы максимизировать общий Ранг Силы."
        }
      ]
    },
    tiersSection: {
      step: "02",
      title: "Ранги самоцветов",
      subtitle: "Только ранги <strong style=\"color: rgb(226, 232, 240);\">Сияющий</strong>, <strong style=\"color: #f59e0b;\">Звездный</strong>, <strong style=\"color: #2effee;\">Кристаллический</strong> и <strong style=\"color: #c084fc;\">Мистический</strong> стоят инвестиций в эндгейме. Выберите карту ниже для просмотра параметров.",
      labels: {
        maxLevel: "МАКС. УРОВЕНЬ",
        maxLevelSub: "Предел уровня для этого ранга.",
        eachRoll: "КАЖДОЕ УСИЛЕНИЕ",
        eachRollSub: "Добавляется на контрольных уровнях (5 / 10 / 15).",
        maxPr: "МАКС. РАНГ СИЛЫ",
        maxPrSub: "Идеально прокачанный Усиленный Самоцвет.",
        levelCap: "Лимит уровня:"
      },
      tiersData: {
        radiant: { title: "Сияющий", desc: "Самоцветы для середины игры. Хороши для перехода в более высокие Uber миры, но быстро заменяются в эндгейме." },
        stellar: { title: "Звездный", desc: "Прочная основа для высокоуровневого фарма. Необходимы для достижения Uber 10 перед переходом на Кристаллический ранг.", convCost: "1 000 Кредитов или 10 000 Кубитов", convNote: "Сохраняет уровень самоцвета и улучшения характеристик!" },
        crystal: { title: "Кристаллический", desc: "Начало настоящей мощи эндгейма. Высокий Ранг Силы за уровень и необходимость для прогресса в Uber 11+.", convCost: "1 500 Кредитов или 15 000 Кубитов", convNote: "Сохраняет уровень самоцвета и улучшения характеристик!" },
        mystic: { title: "Мистический", desc: "Пик развития самоцветов. Предлагает максимально возможные показатели Света, Ранга Силы и характеристик во всей игре." }
      }
    },
    statsSection: {
      title: "Оптимальное Распределение Характеристик",
      tabs: {
        empowered: "Космические Самоцветы",
        elemental: "Стихийные Самоцветы (Вода / Огонь / Воздух)"
      },
      cosmicStats: [
        { name: "Характеристика 1: Свет", priority: "ОБЯЗАТЕЛЬНО (3x Усиления)" },
        { name: "Характеристика 2: Физ. / Маг. Урон", priority: "Рекомендуется" },
        { name: "Характеристика 3: Критический Урон", priority: "Рекомендуется" }
      ],
      elementalStats: [
        { name: "Характеристика 1: Физ. / Маг. Урон", priority: "Основная" },
        { name: "Характеристика 2: Критический Урон", priority: "Основная" },
        { name: "Характеристика 3: Критический Удар (до 100%)", priority: "Гибкая" }
      ]
    },
    proTip: {
      title: "Важно знать!",
      body: "Всегда начинайте с <strong>3-ххарактеристикных Звездных/Кристаллических самоцветов</strong> на 1 уровне. Если самоцвет выпадает только с 2 характеристиками, он теряет 1 усиление на 5 уровне!"
    },
    convertersSection: {
      title: "Преобразователи Кристаллических и Мистических Самоцветов",
      crystal: {
        title: "Преобразователь Кристаллических Самоцветов",
        text: "Улучшает максимальный <strong>Звездный Самоцвет</strong> прямо в <strong>Кристаллический</strong>. Он сохраняет все улучшения, уровень и характеристики, чтобы вам не пришлось начинать прокачку заново."
      },
      mystic: {
        title: "Преобразователь Мистических Самоцветов",
        text: "Повышает <strong>Кристаллический Самоцвет</strong> до пикового <strong>Мистического ранга</strong>. Идеально для эндгейм-игроков, стремящихся к максимальному Свету и Рангу Силы."
      },
      note: "<strong>Примечание:</strong> Преобразователи не обязательны, но имеют четкое назначение. Они лучше всего подходят, когда у вас уже есть полностью прокачанный самоцвет и вы хотите повысить его ранг без потери характеристик."
    },
    lesserVsEmpowered: {
      step: "03",
      title: "Малые и Усиленные Самоцветы",
      intro: "Самоцветы в Trove делятся на две основные категории. Малые самоцветы создают основу характеристик, а Усиленные определяют ваш билд с помощью уникальных способностей.",
      lesser: {
        tag: "ОБЫЧНЫЙ - ОГРАНИЧЕННЫЙ",
        title: "Малый Самоцвет",
        intro: "Малые самоцветы обычные. Они привязаны к одному типу урона и не имеют спецспособностей, но так как вы экипируете их много, их характеристики суммируются.",
        list: [
          "<strong>Ограничение:</strong> Дикие самоцветы дают Физ. урон, Чародейские — Маг. урон.",
          "<strong>Характеристики:</strong> Выпадают с двумя или тремя характеристиками случайной силы.",
          "<strong>Улучшение:</strong> Повышайте показатели до 100%."
        ]
      },
      empowered: {
        tag: "\"БЕЗ ОГРАНИЧЕНИЙ\" И РЕДКИЙ",
        title: "Усиленный Самоцвет",
        intro: "Усиленные самоцветы более редкие и мощные. Они снимают ограничение по типу урона и дают уникальную способность.",
        list: [
          "<strong>Уникальная способность:</strong> Дает особый эффект или умение класса.",
          "<strong>Уникальность:</strong> Нельзя экипировать два самоцвета с одинаковой способностью.",
          "<strong>Высокие показатели:</strong> Выше базовый диапазон и +100 Ранга Силы изначально."
        ]
      },
      obtainLesser: {
        title: "Как получить Малые Самоцветы?",
        worlds: {
          title: "Миры",
          note: "В Приключенческих Мирах вы получаете малые самоцветы в зависимости от сложности мира и требований к Свету."
        },
        delves: {
          title: "Дельвы",
          info: "Дельвы 160+: <span class=\"styles_delvetext\">Исследуйте Дельвы до глубины 160+ и получайте те же коробки, что и в мирах D15.</span><br />Ранг Силы: <span class=\"styles_delvetext\">Требуется минимум <strong class=\"styles_prStrong\">15 000</strong> Ранга Силы.</span><br />Без требований к Свету: <span class=\"styles_delvetext\">Дельвы не ограничены Светом.</span>",
          note: "Дельвы — это короткий путь к мистическим самоцветам. Прохождение <strong class=\"styles_noteStrong\">Дельвов 165+</strong> аналогично мирам D15, но с меньшими ограничениями."
        }
      },
      obtainEmpowered: {
        title: "Как получить Усиленные Самоцветы?",
        cards: [
          {
            tag: "КРАФТ И БАШНЯ ТЕНЕЙ",
            title: "Коробка Усиленных Самоцветов",
            desc: "Обменивайте <span class=\"styles_lunarsouls\">Лунные Души</span> на Теневом Рынке. Содержит <span class=\"styles_radiant\">Сияющие</span> или <span class=\"styles_stellar\">Звездные</span> самоцветы, а также <span class=\"styles_classgemkey\">Фрагменты Ключей</span>."
          },
          {
            tag: "ГАРАНТИРОВАННЫЙ ЗВЕЗДНЫЙ",
            title: "Звездная Коробка Самоцветов",
            desc: "Гарантирует самоцвет <span class=\"styles_stellar\">Звездного</span> ранга при открытии. Можно скрафтить на Верстаке Приключений."
          },
          {
            tag: "ТОМ И НАГРАДА",
            title: "Издание Коробки Самоцветов",
            desc: "Особая коробка за заполнение Тома. Отличный вариант для регулярной прокачки. Можно использовать раз в неделю."
          },
          {
            tag: "ТАБЛИЦА ЛИДЕРОВ",
            title: "Награды Лидеров",
            desc: "Один из лучших способов получить коробки — состязания. Каждую неделю 3 класса должны набрать 125 очков для получения коробок."
          },
          {
            tag: "СИЯЮЩИЙ ТОРГОВЕЦ",
            title: "Сияющие Соверены",
            desc: "Возможность покупки коробок у Сияющего Торговца в обмен на Сияющие Соверены, получаемые при покупке кредитов."
          },
          {
            tag: "КРАФТ",
            title: "Верстак Приключений",
            desc: "На Верстаке Приключений можно скрафтить любые коробки самоцветов, но эти коробки Мистические и ресурсы собрать сложнее."
          }
        ]
      }
    },
    gemTypes: {
      step: "04",
      title: "Типы и Стихии Самоцветов",
      note: "Стихия определяет гнездо и доступные характеристики. Все стихийные самоцветы следуют одним правилам, но у Космических своя механика.",
      elemental: {
        title: "Три Стихийных Гнезда",
        desc: "Вода, Огонь и Воздух имеют одинаковые характеристики и список способностей — разница только в гнезде. Выбирайте под ваш класс.",
        canRoll: "Доступные характеристики:",
        stats: ["Урон (Физ / Маг)", "Критический Урон", "Критический Удар", "Макс. Здоровье", "Макс. Здоровье %"],
        abilitiesTitle: "Общие способности:",
        abilities: "Жгучее Проклятие (Stinging Curse) | Изменчивая Скорость (Volatile Velocity) | Духовный Всплеск (Spirit Surge) | Болотное Моджо (Mired Mojo) | Пиродиск (Pyrodisc) | Взрывной Епилог (Explosive Epilogue) | Кубический Занавес (Cubic Curtain)",
        restriction: "<strong>Ограничение:</strong> Только одна способность каждого типа одновременно."
      },
      cosmic: {
        title: "Особое Космическое Гнездо",
        desc: "Космические самоцветы отличаются от остальных. Одно из их гнезд всегда гарантирует <strong>Свет</strong> — главный параметр для прогресса в Геоде.",
        highlight: "Космические самоцветы имеют свои уникальные способности и экипируются в три выделенных Космических гнезда.",
        uniqueFeature: "Уникальная черта:",
        stats: ["Гарантированный Свет", "Урон", "Критический Урон"],
        abilitiesTitle: "Космические способности:",
        abilities: "Воин-Берсерк (Berserk Battler) | Эмпирейский Барьер (Empyrean Barrier) | Победитель-Вампир (Vampirian Vanquisher) | Сила Цветов (Flower Power)"
      },
      dragonBonus: {
        badge: "ПАССИВНЫЙ БОНУС ХАРАКТЕРИСТИК",
        title: "Изначальные Драконы",
        desc: "Каждая стихия имеет своего Изначального Дракона, дающего +10% к характеристикам каждого самоцвета этой стихии. Разблокировка всех четырех дает максимальный возможный бонус."
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
          description: "宝石的阶位决定了其最大潜力，包括等级上限和属性上限。核心阶位为：<strong style=\"color: #e2e8f0;\">辉耀</strong>、<strong style=\"color: #f59e0b;\">恒星</strong>、<strong style=\"color: #2effee;\">水晶</strong> 与 <strong style=\"color: #c084fc;\">神秘</strong>。宝石阶位不会通过升级而改变，但可以使用转换器提升阶位并保留所有进度。"
        },
        {
          num: "2",
          tier: "分类",
          title: "次级宝石 vs 强化宝石",
          description: "次级宝石仅提供基础属性。强化宝石解除伤害限制，提供更强属性，并附带独特的特殊技能。由于能够装备的强化宝石数量较少，因此选择正确的强化宝石至关重要。"
        },
        {
          num: "3",
          tier: "插槽",
          title: "元素决定插槽",
          description: "每颗宝石属于水、火、气或宇宙四大元素之一。宝石只能放入对应元素的插槽中。宇宙宝石非常独特，因为它们必定包含无法洗练的光芒值属性。"
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
        {
          num: "01",
          title: "封印混沌火花",
          body: "在宝石锻造台使用混沌火花<strong>重置不理想的属性</strong>为光芒值、物理/魔法伤害或暴击伤害等核心属性。"
        },
        {
          num: "02",
          title: "封印混沌耀斑",
          body: "使用混沌耀斑将<strong>属性加成点数转移</strong>至最核心的属性上（宇宙宝石优先转移至<em>光芒值</em>）。"
        },
        {
          num: "03",
          title: "建造者聚焦器",
          body: "使用粗糙、精确或高级聚焦器将各项属性基础百分比提升至 <strong>100%</strong>，以最大化战斗力。"
        }
      ]
    },
    tiersSection: {
      step: "02",
      title: "宝石的阶位划分",
      subtitle: "在Trove中，仅有 <strong style=\"color: rgb(226, 232, 240);\">辉耀</strong>、<strong style=\"color: #f59e0b;\">恒星</strong>、<strong style=\"color: #2effee;\">水晶</strong> 与 <strong style=\"color: #c084fc;\">神秘</strong> 阶位值得在终局内容中投入资源。点击卡片可查看详情。",
      labels: {
        maxLevel: "最大等级",
        maxLevelSub: "该阶位的等级上限。",
        eachRoll: "每次全新提升",
        eachRollSub: "在里程碑等级 (5 / 10 / 15) 获得。",
        maxPr: "最大战斗力",
        maxPrSub: "完美满级强化宝石。",
        levelCap: "等级上限:"
      },
      tiersData: {
        radiant: { title: "辉耀", desc: "中期过渡宝石。适合进入更高的Uber世界，但在终局阶段会被迅速替换。" },
        stellar: { title: "恒星", desc: "高效刷怪的坚实基础。进阶水晶阶位前达到Uber 10的核心必备宝石。", convCost: "1,000 点券 或 10,000 方块币", convNote: "保留宝石等级与属性增幅！" },
        crystal: { title: "水晶", desc: "真正的终局战力起点。每级提供极高战斗力，Uber 11+ 进阶必备。", convCost: "1,500 点券 或 15,000 方块币", convNote: "保留宝石等级与属性增幅！" },
        mystic: { title: "神秘", desc: "全游戏巅峰阶位。提供极至的光芒值、战斗力上限与属性上限。" }
      }
    },
    statsSection: {
      title: "最佳属性分配",
      tabs: {
        empowered: "宇宙宝石",
        elemental: "元素宝石（水 / 火 / 气）"
      },
      cosmicStats: [
        { name: "属性 1: 光芒值", priority: "必备 (3x 加成)" },
        { name: "属性 2: 物理 / 魔法伤害", priority: "推荐" },
        { name: "属性 3: 暴击伤害", priority: "推荐" }
      ],
      elementalStats: [
        { name: "属性 1: 物理 / 魔法伤害", priority: "核心属性" },
        { name: "属性 2: 暴击伤害", priority: "核心属性" },
        { name: "属性 3: 暴击率 (直到100%)", priority: "灵活属性" }
      ]
    },
    proTip: {
      title: "请牢记！",
      body: "务必从 <strong>1级且具备3条初始属性的恒星/水晶宝石</strong> 开始培养。如果宝石只有2条属性，在5级时会损失1次加成，导致最大战斗力低于完美3属性宝石！"
    },
    convertersSection: {
      title: "水晶与神秘宝石转换器",
      crystal: {
        title: "水晶宝石转换器",
        text: "将满级的<strong>恒星宝石</strong>直接进阶为<strong>水晶宝石</strong>。保留所有属性、等级与强化进度，无需从头开始。"
      },
      mystic: {
        title: "神秘宝石转换器",
        text: "将满级的<strong>水晶宝石</strong>进阶至顶级的<strong>神秘阶位</strong>。适合追求极致光芒值与战斗力的终局玩家。"
      },
      note: "<strong>注意：</strong> 转换器并非强制使用。虽然高阶宝石可以在高难度世界自然掉落，但转换器最适合用于直接提升已有满级宝石的阶位。"
    },
    lesserVsEmpowered: {
      step: "03",
      title: "次级宝石 vs 强化宝石",
      intro: "Trove中的宝石分为两大核心类别。次级宝石构筑属性基础，强化宝石通过强大技能定义你的流派构建。",
      lesser: {
        tag: "普通 - 受限",
        title: "次级宝石",
        intro: "普通宝石，限制单种伤害类型且无特殊技能。但由于装备数量较多，其组合属性非常可观。",
        list: [
          "<strong>限制：</strong> 猛烈宝石生成物理属性，奥术宝石生成魔法属性。",
          "<strong>属性：</strong> 附带2或3条随机强度的属性。",
          "<strong>强化：</strong> 提升属性百分比以达到100%完美度。"
        ]
      },
      empowered: {
        tag: "\"无限制\" & 稀有",
        title: "强化宝石",
        intro: "更加强大稀有，解除伤害限制并提供专属技能。",
        list: [
          "<strong>独特技能：</strong> 提供特殊被动技能或职业技能。",
          "<strong>唯一性：</strong> 无法同时装备两颗相同技能的宝石。",
          "<strong>高基础：</strong> 具备更高的属性范围与额外+100初始战斗力。",
          "<strong>高影响：</strong> 装备数量较少，但每一颗都是重大提升。"
        ]
      },
      obtainLesser: {
        title: "如何获得次级宝石？",
        worlds: {
          title: "世界",
          note: "在冒险世界中根据难度掉落次级宝石。冒险世界有固定的光芒值门槛限制。"
        },
        delves: {
          title: "地窖",
          info: "160+ 层地窖：<span class=\"styles_delvetext\">掉落与D15世界相同的宝石箱。</span><br />战斗力要求：<span class=\"styles_delvetext\">最低需达到 <strong class=\"styles_prStrong\">15,000</strong> 战斗力。</span><br />无光芒限制：<span class=\"styles_delvetext\">地窖不受光芒值门槛限制。</span>",
          note: "地窖是跳过低阶宝石快速获取顶级宝石的绝佳捷径。"
        }
      },
      obtainEmpowered: {
        title: "如何获得强化宝石？",
        cards: [
          {
            tag: "制作 & 阴影塔",
            title: "强化宝石箱",
            desc: "在阴影市场使用<span class=\"styles_lunarsouls\">月之灵魂</span>兑换。有机会获得<span class=\"styles_radiant\">辉耀</span>或<span class=\"styles_stellar\">恒星</span>强化宝石。"
          },
          {
            tag: "必得恒星",
            title: "恒星强化宝石箱",
            desc: "开启必定获得<span class=\"styles_stellar\">恒星</span>阶位宝石。可在冒险制作台制作。"
          },
          {
            tag: "手册 & 奖励",
            title: "强化宝石箱典藏版",
            desc: "完成每周宝石手册获得。<br />每周可使用一次。"
          },
          {
            tag: "排行榜",
            title: "排行榜奖励",
            desc: "每周职业竞赛达到125分即可在重置时获得强化宝石箱。"
          },
          {
            tag: "辉耀商人",
            title: "辉耀金币",
            desc: "在辉耀商人处使用辉耀金币直接购买箱子。"
          },
          {
            tag: "制作",
            title: "冒险制作台",
            desc: "制作神秘阶位宝石箱，但资源收集难度较高。"
          }
        ]
      }
    },
    gemTypes: {
      step: "04",
      title: "宝石类型与元素",
      note: "元素决定装备插槽与可生成的属性。三大元素宝石遵循相同规则，宇宙宝石拥有独特性。",
      elemental: {
        title: "三大元素插槽",
        desc: "水、火、气宝石共享属性池与技能池，唯一区别是插槽位置。",
        canRoll: "可生成属性：",
        stats: ["伤害 (物理 / 魔法)", "暴击伤害", "暴击率", "最大生命值", "最大生命值 %"],
        abilitiesTitle: "共享技能：",
        abilities: "刺骨诅咒 (Stinging Curse) | 易变飞速 (Volatile Velocity) | 灵魂涌动 (Spirit Surge) | 泥潭魔咒 (Mired Mojo) | 烈焰光盘 (Pyrodisc) | 爆炸尾声 (Explosive Epilogue) | 立方帷幕 (Cubic Curtain)",
        restriction: "<strong>限制：</strong> 同一技能只能装备一颗。"
      },
      cosmic: {
        title: "特殊宇宙插槽",
        desc: "宇宙宝石必定包含一条<strong>光芒值</strong>属性 — 推动Geode与宇宙终局内容的核心属性。",
        highlight: "拥有独立技能池与3个专属宇宙插槽。",
        uniqueFeature: "独特属性：",
        stats: ["必出光芒值", "伤害", "暴击伤害"],
        abilitiesTitle: "宇宙技能：",
        abilities: "狂暴战士 (Berserk Battler) | 璀璨屏障 (Empyrean Barrier) | 吸血征服者 (Vampirian Vanquisher) | 鲜花之力 (Flower Power)"
      },
      dragonBonus: {
        badge: "被动属性加成",
        title: "始源龙",
        desc: "每种元素对应一条始源龙，为该元素所有宝石提供+10%属性提升。解锁全部四条始源龙可获得最大属性加成。"
      }
    }
  }
};