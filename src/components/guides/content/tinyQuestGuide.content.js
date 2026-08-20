export const tinyQuestGuideContent = {
  en: {
    hero: {
      badge: "Tiny Quest Update Guide",
      title: "Tiny Quest & Ally Mastery Guide",
      description: "Everything you need to know about the Tiny Quest update, leveling allies to level 30, expedition mechanics, and optimal progression routes."
    },
    section1: {
      step: "01",
      title: "Level 30 Allies & Stat Scaling",
      description: "Select an ally from the sidebar to inspect its detailed stat scaling, level progression, and perks up to Level 30.",
      adjustLevel: "Adjust Ally Level:",
      lvl1: "Lvl 1 (0 XP)",
      lvl15: "Lvl 15",
      lvl30: "Lvl 30 (MAX)",
      lightStat: "Light Stat",
      base: "Base:",
      damageBoost: "Damage / Speed Boost",
      specialPerk: "Special Perk:"
    },
    alliesText: {
      vivian: {
        name: "Venturous Vivian",
        tier: "Max Light & Dual Dmg",
        perk: "Physical & Magic Damage Boost",
        description: "Provides top-tier Light scaling alongside a dual Physical and Magic damage boost at level 30."
      },
      moontouched: {
        name: "The Moontouched of All Time",
        tier: "Max Light & Stability",
        perk: "Extra Stability + High Light",
        description: "Grants maximum Light stat along with physical damage and bonus Stability at higher levels."
      },
      skyfire: {
        name: "Starry Skyfire",
        tier: "Magic Damage Scaling",
        perk: "High Magic Damage Scaling",
        description: "High offensive ally tailored for Magic Damage classes, scaling up to 500 Light at level 30."
      },
      scorpius: {
        name: "Scorpius",
        tier: "Physical Damage Scaling",
        perk: "High Physical Damage Scaling",
        description: "A powerful damage-oriented ally granting 500 Light alongside a massive 28.75% Physical Damage boost."
      },
      staruable: {
        name: "Staruable",
        tier: "Speed & Light Utility",
        perk: "Movement Speed Boost",
        description: "Ideal for speed-farming builds requiring both solid Light scaling and high Movement Speed."
      },
      heckmantis: {
        name: "Bulbous Heckmantis",
        tier: "Critical Damage Focus",
        perk: "Massive Critical Damage Boost",
        description: "Specialized ally focusing heavily on Critical Damage scaling up to 34.5% at level 30."
      }
    },
    section2: {
      step: "02",
      title: "Expedition Mechanics & Voucher Strategy",
      description: "Understand how expedition slots work, why breaking chests can ruin your interact prompt, and how to convert unwanted long timers into key vouchers.",
      cards: [
        {
          num: "01",
          title: "Dungeon Spawns & Chest Tip",
          text: "After completing a dungeon, a quest station spawns. Avoid breaking the loot chest right away, as scattered loot makes it much harder to press your interact key (`E`)."
        },
        {
          num: "02",
          title: "3 Max Expedition Limit",
          text: "You can only run up to 3 (eventually 6 when you get the expanders) active expeditions simultaneously. Timers continue ticking down in real time even if you log out or close Trove.",
          badge1: "Max Active: 3 Allies",
          badge2: "Offline Progress: YES"
        },
        {
          num: "03",
          title: "\"Get Voucher\" Skip Method",
          text: "If a quest features an excessively long timer, skip it by selecting \"Get Voucher Instead\". Accumulating 100 vouchers allows you to craft a <strong>Simple Tiny Key</strong>."
        },
        {
          num: "04",
          title: "Insta-Complete Token Usage",
          text: "Shorter timers require significantly fewer Insta-Complete Tokens. Reserve tokens strictly for quests under 20–25 minutes to stretch your resources.",
          note: "<strong>Note:</strong> As the natural timer gets closer to 0, the token cost dynamically drops!"
        }
      ]
    },
    section3: {
      step: "03",
      title: "Leveling Route & World Progression",
      description: "Maximize your Ally XP efficiency by completing quests in higher difficulty worlds. As you ascend tiers, expedition duration increases alongside XP rewards.",
      headers: ["World Difficulty", "Quest Tier", "Avg. Duration", "Ally XP Yield", "Recommended Strategy"],
      rows: [
        { world: "Novice – D5", tier: "Tier 1–2", duration: "5 – 15 Mins", xp: "Low (100–300 XP)", strategy: "Fast cycles. Great for burning excess Insta-Complete Tokens." },
        { world: "D6 – D9", tier: "Tier 3–4", duration: "30 Mins – 2 Hours", xp: "Medium (500–1,200 XP)", strategy: "Balanced route for mid-game players pushing towards max level." },
        { world: "D10 – D11", tier: "Tier 5–6", duration: "3 – 8 Hours", xp: "High (2,000–5,000 XP)", strategy: "Set active before logging off to gain passive offline XP progress." },
        { world: "D12 (Endgame)", tier: "Max Tier", duration: "12 – 24 Hours", xp: "Massive (8,000+ XP)", strategy: "Best XP-to-quest ratio. Use \"Get Voucher\" if timers are too long." }
      ],
      strategy1: { title: "XP Scaling Mechanics", text: "Allies require roughly <strong>65,000 total XP</strong> to reach level 30. Stat boosts scale progressively, with major power spikes occurring every 5 levels." },
      strategy2: { title: "Active vs. Offline Farming", text: "Short quests (under 20 mins) are ideal for active play sessions. For long quests (8+ hours), queue them right before closing the game so timers tick while offline." }
    },
    section4: {
      step: "04",
      title: "Crafting & Key Recipes",
      description: "Everything you need to craft at the Tiny Bench. Convert your saved Vouchers and materials into keys and frogs to unlock new allies and expedition rewards.",
      recipes: [
        {
          tag: "EXPEDITION KEY",
          title: "Simple Tiny Key",
          desc: "Used to open basic expedition reward caches and claim your earned rewards.",
          label: "Vouchers Required",
          value: "100x Expedition Vouchers"
        },
        {
          tag: "ALLY CRAFTING",
          title: "Gilden Rana",
          desc: "Special crafting material used as a core ingredient to craft new, powerful allies at the Tadpole Tours Kiosk.",
          label1: "Key Base",
          val1: "1x Simple Tiny Key",
          label2: "Bonus Material",
          val2: "Extra Rare Materials"
        }
      ],
      summary: {
        tag: "SUMMARY",
        title: "Key Takeaways & Endgame Goals",
        list: [
          "<strong>Prioritize Light Allies:</strong> Get Tiny Trugina or Vivian to Level 30 first to max out your Light stat (563 Light ceiling).",
          "<strong>Always Keep 3 Slots Running:</strong> Never leave expedition slots empty. Let long timers tick down passively while offline.",
          "<strong>Voucher Optimization:</strong> Never waste time on low-value 12+ hour quests if you need quick keys — convert them directly into Vouchers!",
          "<strong>Token Discipline:</strong> Only use Insta-Complete Tokens when natural timers drop under 20 minutes to get maximum efficiency per token."
        ]
      }
    },
    section5: {
      step: "05",
      title: "Best Way to Level your Allies",
      description: "Scroll down to sequentially reveal crucial ally progression mechanics and strategy field notes.",
      cards: [
        {
          step: "01",
          category: "MECHANICS",
          title: "Expedition Slot Expansion (Max 6)",
          desc: "By default, you start with 3 active expedition slots. Acquire Expedition Slot Expanders to unlock up to 6 total slots!",
          highlight: "Note: Running 6 active slots simultaneously doubles your passive offline Ally XP generation."
        },
        {
          step: "02",
          category: "RESETS",
          title: "Quest Station Spawn & Refresh",
          desc: "Quest stations spawn in dungeons after defeat. If a station offers undesirable quests or long timers, completing dungeons in different biomes cycles the available pool.",
          highlight: "Tip: Completing dungeons in different biomes immediately cycles available quests. Timers tick in real-time while offline."
        },
        {
          step: "03",
          category: "PROGRESSION",
          title: "Ally Leveling XP & Stat Scaling",
          desc: "Leveling an ally from Level 1 to 30 requires approximately 65,000 Total XP.",
          highlight: "Stat scaling isn't linear — major power spikes trigger every 5 levels (Lvl 5, 10, 15, 20, 25, 30)."
        },
        {
          step: "04",
          category: "STRATEGY",
          title: "Optimal Voucher Conversion",
          desc: "Always use 'Get Voucher Instead' on 12+ hour quests unless you plan to go offline for the night.",
          highlight: "100 Vouchers craft a Simple Tiny Key, which opens rewards immediately without waiting on long timers."
        }
      ]
    }
  },
  fr: {
    hero: {
      badge: "Guide Mise à jour Tiny Quest",
      title: "Guide Tiny Quest et Maîtrise des Compagnons",
      description: "Tout ce qu'il faut savoir sur la mise à jour Tiny Quest, monter ses compagnons au niveau 30, les mécaniques d'expédition et les routes de progression optimales."
    },
    section1: {
      step: "01",
      title: "Compagnons Niveau 30 et Évolution des Stats",
      description: "Sélectionnez un compagnon dans le panneau pour inspecter en détail l'évolution de ses statistiques, sa progression et ses bonus jusqu'au niveau 30.",
      adjustLevel: "Ajuster le Niveau :",
      lvl1: "Niv 1 (0 XP)",
      lvl15: "Niv 15",
      lvl30: "Niv 30 (MAX)",
      lightStat: "Stat Lumière",
      base: "Base :",
      damageBoost: "Boost Dégâts / Vitesse",
      specialPerk: "Bonus Spécial :"
    },
    alliesText: {
      vivian: {
        name: "Vivian l'Aventureuse",
        tier: "Lumière Max & Dégâts Doubles",
        perk: "Boost Dégâts Physiques et Magiques",
        description: "Offre le meilleur scaling de Lumière avec un double boost de dégâts physiques et magiques au niveau 30."
      },
      moontouched: {
        name: "Le Touché par la Lune",
        tier: "Lumière Max & Stabilité",
        perk: "Stabilité Extra + Lumière Élevée",
        description: "Accorde la statistique de Lumière maximale ainsi que des dégâts physiques et un bonus de Stabilité aux niveaux élevés."
      },
      skyfire: {
        name: "Feu Céleste Étoilé",
        tier: "Scaling Dégâts Magiques",
        perk: "Haut Scaling Dégâts Magiques",
        description: "Compagnon très offensif adapté aux classes de Dégâts Magiques, atteignant jusqu'à 500 Lumière au niveau 30."
      },
      scorpius: {
        name: "Scorpius",
        tier: "Scaling Dégâts Physiques",
        perk: "Haut Scaling Dégâts Physiques",
        description: "Puissant compagnon axé sur les dégâts physiques, accordant 500 Lumière et un énorme boost de 28,75% de Dégâts Physiques."
      },
      staruable: {
        name: "Staruable",
        tier: "Vitesse & Lumière",
        perk: "Boost Vitesse de Déplacement",
        description: "Idéal pour les builds de farm rapide nécessitant à la fois une solide stat de Lumière et une grande Vitesse de déplacement."
      },
      heckmantis: {
        name: "Mante Bulbeuse",
        tier: "Focus Dégâts Critiques",
        perk: "Massif Boost Dégâts Critiques",
        description: "Compagnon spécialisé se concentrant lourdement sur les Dégâts Critiques, atteignant jusqu'à 34,5% au niveau 30."
      }
    },
    section2: {
      step: "02",
      title: "Mécaniques d'Expédition & Stratégie de Coupons",
      description: "Comprenez le fonctionnement des emplacements d'expédition, pourquoi casser les coffres peut gêner l'interaction, et comment convertir les longs délais en coupons de clés.",
      cards: [
        {
          num: "01",
          title: "Apparition dans les Donjons & Astuce Coffre",
          text: "Après avoir terminé un donjon, une station de quête apparaît. Évitez de casser le coffre de butin tout de suite, car les objets au sol rendent l'appui sur la touche d'interaction (`E`) bien plus difficile."
        },
        {
          num: "02",
          title: "Limite de 3 Expéditions Max",
          text: "Vous ne pouvez lancer que 3 expéditions actives simultanément (jusqu'à 6 avec les extensions). Les chronomètres continuent de tourner en temps réel même si vous vous déconnectez ou fermez Trove.",
          badge1: "Max Actif : 3 Compagnons",
          badge2: "Progression Hors-ligne : OUI"
        },
        {
          num: "03",
          title: "Méthode \"Obtenir Coupon\" (Passer)",
          text: "Si une quête a un délai excessivement long, passez-la en choisissant \"Obtenir un coupon à la place\". Cumuler 100 coupons vous permet de fabriquer une <strong>Clé Simple Tiny</strong>."
        },
        {
          num: "04",
          title: "Utilisation des Jetons Instantanés",
          text: "Les délais courts nécessitent beaucoup moins de jetons d'achèvement instantané. Réservez strictement vos jetons aux quêtes de moins de 20 à 25 minutes pour économiser vos ressources.",
          note: "<strong>Note :</strong> Plus le chronomètre naturel se rapproche de 0, plus le coût en jetons diminue dynamiquement !"
        }
      ]
    },
    section3: {
      step: "03",
      title: "Route de Niveau & Progression par Monde",
      description: "Maximisez l'efficacité d'XP de vos compagnons en terminant des quêtes dans des mondes de difficulté supérieure. À mesure que vous montez de rang, la durée des expéditions augmente en même temps que les gains d'XP.",
      headers: ["Difficulté", "Tier Quête", "Durée Moyenne", "XP Compagnon", "Stratégie Recommandée"],
      rows: [
        { world: "Novice – D5", tier: "Tier 1–2", duration: "5 – 15 Min", xp: "Faible (100–300 XP)", strategy: "Cycles rapides. Idéal pour consommer les jetons d'achèvement instantané en excès." },
        { world: "D6 – D9", tier: "Tier 3–4", duration: "30 Min – 2 Heures", xp: "Moyen (500–1 200 XP)", strategy: "Route équilibrée pour les joueurs en milieu de progression visant le niveau max." },
        { world: "D10 – D11", tier: "Tier 5–6", duration: "3 – 8 Heures", xp: "Élevé (2 000–5 000 XP)", strategy: "À lancer avant de vous déconnecter pour gagner de l'XP passivement hors-ligne." },
        { world: "D12 (Endgame)", tier: "Tier Max", duration: "12 – 24 Heures", xp: "Massif (8 000+ XP)", strategy: "Meilleur ratio XP par quête. Utilisez \"Obtenir Coupon\" si le délai est trop long." }
      ],
      strategy1: {
        title: "Mécaniques d'Évolution de l'XP",
        text: "Il faut environ <strong>65 000 XP au total</strong> pour monter un compagnon au niveau 30. Les statistiques augmentent progressivement, avec des pics de puissance majeurs tous les 5 niveaux."
      },
      strategy2: {
        title: "Farm Actif vs Hors-ligne",
        text: "Les quêtes courtes (moins de 20 min) sont idéales pour les sessions de jeu actives. Pour les longues quêtes (8h+), lancez-les juste avant de fermer le jeu pour que les délais s'écoulent hors-ligne."
      }
    },
    section4: {
      step: "04",
      title: "Artisanat & Recettes de Clés",
      description: "Tout ce qu'il faut fabriquer sur l'Établi Tiny. Convertissez vos coupons économisés et vos matériaux en clés et en grenouilles pour débloquer de nouveaux compagnons et récompenses d'expédition.",
      recipes: [
        {
          tag: "CLÉ D'EXPÉDITION",
          title: "Clé Simple Tiny",
          desc: "Utilisée pour ouvrir les coffres de récompenses d'expédition de base et récupérer vos gains.",
          label: "Coupons Requis",
          value: "100x Coupons d'Expédition"
        },
        {
          tag: "ARTISANAT COMPAGNON",
          title: "Gilden Rana",
          desc: "Matériau spécial utilisé comme ingrédient central pour fabriquer de nouveaux compagnons puissants au Kiosque Tadpole Tours.",
          label1: "Base de Clé",
          val1: "1x Clé Simple Tiny",
          label2: "Matériau Bonus",
          val2: "Matériaux Très Rares"
        }
      ],
      summary: {
        tag: "RÉSUMÉ",
        title: "Points Clés & Objectifs Endgame",
        list: [
          "<strong>Priorité aux Compagnons Lumière :</strong> Montez Tiny Trugina ou Vivian au niveau 30 en premier pour maximiser votre statistique de Lumière (plafond à 563 Lumière).",
          "<strong>Gardez toujours 3 emplacements actifs :</strong> Ne laissez jamais vos emplacements d'expédition vides. Laissez les longs délais s'écouler passivement hors-ligne.",
          "<strong>Optimisation des Coupons :</strong> Ne perdez pas de temps sur des quêtes de 12h+ peu rentables si vous voulez des clés rapides — convertissez-les directement en coupons !",
          "<strong>Discipline des Jetons :</strong> N'utilisez vos jetons d'achèvement instantané que lorsque le chronomètre descend sous les 20 minutes pour rentabiliser chaque jeton au maximum."
        ]
      }
    },
    section5: {
      step: "05",
      title: "Meilleure Méthode pour Monter vos Compagnons",
      description: "Déroulez vers le bas pour découvrir les mécaniques essentielles de progression et les notes stratégiques.",
      cards: [
        {
          step: "01",
          category: "MÉCANIQUES",
          title: "Extension d'Emplacements (Max 6)",
          desc: "Par défaut, vous commencez avec 3 emplacements actifs. Obtenez des extensions d'emplacement pour débloquer jusqu'à 6 emplacements au total !",
          highlight: "Note : Faire tourner 6 emplacements simultanément double votre gain d'XP passif hors-ligne."
        },
        {
          step: "02",
          category: "RÉINITIALISATIONS",
          title: "Apparition des Stations & Renouvellement",
          desc: "Les stations de quêtes apparaissent dans les donjons après victoire. Si une station propose des quêtes indésirables ou trop longues, terminer des donjons dans d'autres biomes renouvelle la sélection.",
          highlight: "Astuce : Terminer des donjons dans différents biomes réinitialise immédiatement les quêtes. Les chronos tournent en temps réel hors-ligne."
        },
        {
          step: "03",
          category: "PROGRESSION",
          title: "Progression d'XP et Stats",
          desc: "Monter un compagnon du niveau 1 à 30 nécessite environ 65 000 XP au total.",
          highlight: "La progression des stats n'est pas linéaire — les pics de puissance majeurs se déclenchent tous les 5 niveaux (Niv 5, 10, 15, 20, 25, 30)."
        },
        {
          step: "04",
          category: "STRATÉGIE",
          title: "Conversion Optimale en Coupons",
          desc: "Utilisez toujours 'Obtenir un coupon' sur les quêtes de 12h+ à moins de vous déconnecter pour la nuit.",
          highlight: "100 coupons permettent de fabriquer une Clé Simple Tiny, ouvrant instantanément vos récompenses sans attendre de longs délais."
        }
      ]
    }
  },
  es: {
    hero: {
      badge: "Guía de Actualización Tiny Quest",
      title: "Guía de Tiny Quest y Maestría de Aliados",
      description: "Todo lo que necesitas saber sobre la actualización Tiny Quest, subir aliados al nivel 30, mecánicas de expedición y rutas de progresión óptimas."
    },
    section1: {
      step: "01",
      title: "Aliados Nivel 30 y Escalado de Estadísticas",
      description: "Selecciona un aliado del panel lateral para inspeccionar en detalle el escalado de sus estadísticas, su progresión de nivel y sus ventajas hasta el nivel 30.",
      adjustLevel: "Ajustar Nivel del Aliado:",
      lvl1: "Nvl 1 (0 XP)",
      lvl15: "Nvl 15",
      lvl30: "Nvl 30 (MÁX)",
      lightStat: "Estadística de Luz",
      base: "Base:",
      damageBoost: "Aumento Daño / Velocidad",
      specialPerk: "Ventaja Especial:"
    },
    alliesText: {
      vivian: {
        name: "Vivian la Aventurera",
        tier: "Luz Máx y Daño Doble",
        perk: "Aumento Daño Físico y Mágico",
        description: "Ofrece el máximo escalado de Luz junto con un aumento doble de daño físico y mágico al nivel 30."
      },
      moontouched: {
        name: "El Tocado por la Luna",
        tier: "Luz Máx y Estabilidad",
        perk: "Estabilidad Extra + Luz Alta",
        description: "Concede la estadística de Luz máxima junto con daño físico y estabilidad adicional en niveles altos."
      },
      skyfire: {
        name: "Fuego Estelar",
        tier: "Escalado Daño Mágico",
        perk: "Alto Escalado Daño Mágico",
        description: "Aliado altamente ofensivo adaptado para clases de Daño Mágico, alcanzando hasta 500 de Luz al nivel 30."
      },
      scorpius: {
        name: "Scorpius",
        tier: "Escalado Daño Físico",
        perk: "Alto Escalado Daño Físico",
        description: "Un potente aliado enfocado al daño físico que otorga 500 de Luz junto con un masivo aumento del 28.75% de Daño Físico."
      },
      staruable: {
        name: "Staruable",
        tier: "Utilidad de Velocidad y Luz",
        perk: "Aumento Velocidad de Movimiento",
        description: "Ideal para configuraciones de farmeo rápido que requieren tanto un buen escalado de Luz como alta Velocidad de Movimiento."
      },
      heckmantis: {
        name: "Mantis Bulbosa",
        tier: "Enfoque Daño Crítico",
        perk: "Aumento Masivo Daño Crítico",
        description: "Aliado especializado enfocado fuertemente en el Daño Crítico, alcanzando hasta un 34.5% al nivel 30."
      }
    },
    section2: {
      step: "02",
      title: "Mecánicas de Expedición y Estrategia de Cupones",
      description: "Entiende cómo funcionan los espacios de expedición, por qué romper cofres puede arruinar tu tecla de interacción (`E`), y cómo convertir temporizadores largos indeseados en cupones de llaves.",
      cards: [
        {
          num: "01",
          title: "Aparición en Mazmorras y Consejo de Cofres",
          text: "Al completar una mazmorra, aparece una estación de misión. Evita romper el cofre de botín de inmediato, ya que el botín esparcido dificulta pulsar tu tecla de interacción (`E`)."
        },
        {
          num: "02",
          title: "Límite Máximo de 3 Expediciones",
          text: "Solo puedes tener hasta 3 expediciones activas simultáneamente (hasta 6 cuando consigas expansiones). Los temporizadores siguen descontándose en tiempo real incluso si cierras sesión o Trove.",
          badge1: "Máx Activos: 3 Aliados",
          badge2: "Progreso Offline: SÍ"
        },
        {
          num: "03",
          title: "Método de Salto \"Obtener Cupón\"",
          text: "Si una misión tiene un temporizador excesivamente largo, sáltatela seleccionando \"Obtener Cupón en su lugar\". Acumular 100 cupones te permite fabricar una <strong>Llave Simple Tiny</strong>."
        },
        {
          num: "04",
          title: "Uso de Fichas de Completado Instantáneo",
          text: "Los temporizadores más cortos requieren significativamente menos fichas de completado instantáneo. Reserva las fichas estrictamente para misiones de menos de 20–25 minutos para maximizar tus recursos.",
          note: "<strong>Nota:</strong> ¡A medida que el temporizador natural se acerca a 0, el coste en fichas disminuye dinámicamente!"
        }
      ]
    },
    section3: {
      step: "03",
      title: "Ruta de Nivelación y Progresión por Mundos",
      description: "Maximiza la eficiencia de XP de tus aliados completando misiones en mundos de mayor dificultad. A medida que subes de rango, la duración de la expedición aumenta junto con las recompensas de XP.",
      headers: ["Dificultad del Mundo", "Rango de Misión", "Duración Media", "Rendimiento XP", "Estrategia Recomendada"],
      rows: [
        { world: "Principiante – D5", tier: "Rango 1–2", duration: "5 – 15 Min", xp: "Baja (100–300 XP)", strategy: "Ciclos rápidos. Excelente para gastar el exceso de fichas de completado instantáneo." },
        { world: "D6 – D9", tier: "Rango 3–4", duration: "30 Min – 2 Horas", xp: "Media (500–1.200 XP)", strategy: "Ruta equilibrada para jugadores en mitad de progresión que buscan el nivel máximo." },
        { world: "D10 – D11", tier: "Rango 5–6", duration: "3 – 8 Horas", xp: "Alta (2.000–5.000 XP)", strategy: "Actívalas antes de desconectarte para ganar progreso pasivo de XP sin conexión." },
        { world: "D12 (Endgame)", tier: "Rango Máximo", duration: "12 – 24 Horas", xp: "Masiva (8.000+ XP)", strategy: "Mejor ratio de XP por misión. Usa \"Obtener Cupón\" si los temporizadores son demasiado largos." }
      ],
      strategy1: {
        title: "Mecánicas de Escalado de XP",
        text: "Los aliados requieren aproximadamente <strong>65.000 XP totales</strong> para alcanzar el nivel 30. Las mejoras de estadísticas escalan progresivamente, con picos de poder importantes cada 5 niveles."
      },
      strategy2: {
        title: "Farmeo Activo vs. Fuera de Línea",
        text: "Las misiones cortas (menos de 20 min) son ideales para sesiones de juego activo. Para misiones largas (8+ horas), ponlas en cola justo antes de cerrar el juego para que los temporizadores avancen mientras estás desconectado."
      }
    },
    section4: {
      step: "04",
      title: "Fabricación y Recetas de Llaves",
      description: "Todo lo que necesitas fabricar en el Banco Tiny. Convierte tus cupones y materiales ahorrados en llaves y ranas para desbloquear nuevos aliados y recompensas de expedición.",
      recipes: [
        {
          tag: "LLAVE DE EXPEDICIÓN",
          title: "Llave Simple Tiny",
          desc: "Utilizada para abrir cofres de recompensa de expedición básicos y reclamar tus recompensas obtenidas.",
          label: "Cupones Requeridos",
          value: "100x Cupones de Expedición"
        },
        {
          tag: "CREACIÓN DE ALIADOS",
          title: "Gilden Rana",
          desc: "Material de fabricación especial utilizado como ingrediente central para crear nuevos y poderosos aliados en el Quiosco Tadpole Tours.",
          label1: "Base de Llave",
          val1: "1x Llave Simple Tiny",
          label2: "Material Extra",
          val2: "Materiales Muy Raros"
        }
      ],
      summary: {
        tag: "RESUMEN",
        title: "Puntos Clave y Objetivos Finales",
        list: [
          "<strong>Prioriza Aliados de Luz:</strong> Sube a Tiny Trugina o Vivian al nivel 30 primero para maximizar tu estadística de Luz (techo de 563 de Luz).",
          "<strong>Mantén siempre 3 espacios activos:</strong> Nunca dejes espacios de expedición vacíos. Deja que los temporizadores largos avancen pasivamente mientras estás desconectado.",
          "<strong>Optimización de Cupones:</strong> Nunca pierdas tiempo en misiones de 12+ horas de bajo valor si necesitas llaves rápidas: ¡conviértelas directamente en cupones!",
          "<strong>Disciplina de Fichas:</strong> Solo usa Fichas de Completado Instantáneo cuando los temporizadores naturales bajen de 20 minutos para obtener la máxima eficiencia por ficha."
        ]
      }
    },
    section5: {
      step: "05",
      title: "Mejor Forma de Subir Aliados",
      description: "Desplázate hacia abajo para revelar secuencialmente mecánicas cruciales de progresión y notas estratégicas de campo.",
      cards: [
        {
          step: "01",
          category: "MECÁNICAS",
          title: "Expansión de Espacios (Máx 6)",
          desc: "Por defecto, comienzas con 3 espacios de expedición activos. ¡Consigue expansores de espacio para desbloquear hasta 6 espacios en total!",
          highlight: "Nota: Ejecutar 6 espacios activos simultáneamente duplica tu generación pasiva de XP de aliados fuera de línea."
        },
        {
          step: "02",
          category: "REINICIOS",
          title: "Aparición de Estaciones y Reinicio",
          desc: "Las estaciones de misión aparecen en las mazmorras tras vencer. Si una estación ofrece misiones indeseables o con tiempos muy largos, completar mazmorras en diferentes biomas renueva el grupo de misiones.",
          highlight: "Consejo: Completar mazmorras en diferentes biomas renueva las misiones inmediatamente. Los temporizadores descuentan en tiempo real offline."
        },
        {
          step: "03",
          category: "PROGRESIÓN",
          title: "XP y Escalado de Aliados",
          desc: "Subir un aliado del nivel 1 al 30 requiere aproximadamente 65.000 XP en total.",
          highlight: "El escalado de estadísticas no es lineal: los picos de poder principales se activan cada 5 niveles (Nvl 5, 10, 15, 20, 25, 30)."
        },
        {
          step: "04",
          category: "ESTRATEGIA",
          title: "Conversión Óptima a Cupones",
          desc: "Usa siempre 'Obtener Cupón en su lugar' en misiones de más de 12 horas, a menos que planees desconectarte durante toda la noche.",
          highlight: "100 cupones fabrican una Llave Simple Tiny, que abre recompensas de inmediato sin tener que esperar largos temporizadores."
        }
      ]
    }
  },
  ru: {
    hero: {
      badge: "Гайд по обновлению Tiny Quest",
      title: "Гайд по Tiny Quest и прокачке союзников",
      description: "Все, что вам нужно знать об обновлении Tiny Quest, прокачке союзников до 30 уровня, механике экспедиций и оптимальных маршрутах развития."
    },
    section1: {
      step: "01",
      title: "Союзники 30 Уровня и Характеристики",
      description: "Выберите союзника на боковой панели, чтобы подробно изучить масштабирование его характеристик, прогресс уровней и перки до 30 уровня.",
      adjustLevel: "Уровень союзника:",
      lvl1: "Ур 1 (0 XP)",
      lvl15: "Ур 15",
      lvl30: "Ур 30 (МАКС)",
      lightStat: "Характеристика Света",
      base: "Базовый:",
      damageBoost: "Бонус Урона / Скорости",
      specialPerk: "Особый Бонус:"
    },
    alliesText: {
      vivian: {
        name: "Авантюрная Вивиан",
        tier: "Макс Свет и Двойной Урон",
        perk: "Бонус Физ. и Маг. Урона",
        description: "Обеспечивает максимальный показатель Света наряду с двойным усилением физического и магического урона на 30 уровне."
      },
      moontouched: {
        name: "Коснувшийся Луны",
        tier: "Макс Свет и Стабильность",
        perk: "Стабильность + Высокий Свет",
        description: "Дает максимальный показатель Света вместе с физическим уроном и бонусом к стабильности на высоких уровнях."
      },
      skyfire: {
        name: "Звездный Небосвод",
        tier: "Магический Урон",
        perk: "Высокий Магический Урон",
        description: "Атакующий союзник, созданный для классов с магическим уроном, дающий до 500 Света на 30 уровне."
      },
      scorpius: {
        name: "Скорпиус",
        tier: "Физический Урон",
        perk: "Высокий Физический Урон",
        description: "Мощный атакующий союзник, дающий 500 Света и огромное увеличение физического урона на 28.75%."
      },
      staruable: {
        name: "Старуабль",
        tier: "Скорость и Свет",
        perk: "Бонус Скорости Перемещения",
        description: "Идеален для скоростного фарма, требующего как высокого показателя Света, так и высокой скорости перемещения."
      },
      heckmantis: {
        name: "Богомол",
        tier: "Критический Урон",
        perk: "Массивный Критический Урон",
        description: "Специализированный союзник, ориентированный на критический урон, увеличивающийся до 34.5% на 30 уровне."
      }
    },
    section2: {
      step: "02",
      title: "Механика Экспедиций и Купоны",
      description: "Узнайте, как работают слоты экспедиций, почему разбивание сундуков мешает взаимодействию (`E`) и как превращать нежелательные долгие таймеры в купоны ключей.",
      cards: [
        {
          num: "01",
          title: "Станции в Подземельях и Совет по Сундукам",
          text: "После прохождения подземелья появляется станция квестов. Не разбивайте сундук сразу: разбросанный лут сильно мешает нажать клавишу взаимодействия (`E`)."
        },
        {
          num: "02",
          title: "Лимит в 3 Экспедиции",
          text: "Вы можете одновременно запускать до 3 активных экспедиций (до 6 с расширителями). Таймеры идут в реальном времени, даже если вы выйдете из игры." your interact prompt, and how to convert unwanted long timers into key vouchers."[cite: 12]
          badge1: "Макс: 3 Союзника",
          badge2: "Прогресс Оффлайн: ДА"
        },
        {
          num: "03",
          title: "Метод Пропуска \"Получить Купон\"",
          text: "Если у квеста слишком долгий таймер, пропустите его, выбрав \"Получить купон вместо этого\". Собрав 100 купонов, вы сможете скрафтить <strong>Простой Ключ Tiny</strong>."
        },
        {
          num: "04",
          title: "Использование Жетонов Ускорения",
          text: "Короткие таймеры требуют гораздо меньше жетонов. Используйте жетоны строго для квестов длительностью менее 20–25 минут ради экономии ресурсов.",
          note: "<strong>Примечание:</strong> По мере приближения естественного таймера к 0 стоимость в жетонах динамически снижается!"
        }
      ]
    },
    section3: {
      step: "03",
      title: "Прокачка и Прогрессия Миров",
      description: "Максимизируйте получение опыта союзников, выполняя квесты в мирах повышенной сложности. С ростом сложности увеличивается длительность экспедиций и количество получаемого опыта.",
      headers: ["Сложность Мира", "Ранг Квеста", "Среднее Время", "Опыт Союзника", "Рекомендуемая Стратегия"],
      rows: [
        { world: "Новичок – D5", tier: "Ранг 1–2", duration: "5 – 15 Мин", xp: "Низкий (100–300 XP)", strategy: "Быстрые циклы. Отлично подходит для траты лишних жетонов мгновенного завершения." },
        { world: "D6 – D9", tier: "Ранг 3–4", duration: "30 Мин – 2 Часа", xp: "Средний (500–1 200 XP)", strategy: "Сбалансированный маршрут для игроков на средней стадии игры." },
        { world: "D10 – D11", tier: "Ранг 5–6", duration: "3 – 8 Часов", xp: "Высокий (2 000–5 000 XP)", strategy: "Запускайте перед выходом из игры для пассивного получения опыта оффлайн." },
        { world: "D12 (Эндгейм)", tier: "Макс Ранг", duration: "12 – 24 Часа", xp: "Огромный (8 000+ XP)", strategy: "Лучшее соотношение опыта. Используйте купоны, если таймеры слишком велики." }
      ],
      strategy1: {
        title: "Механика Получения XP",
        text: "Для достижения 30 уровня союзнику требуется около <strong>65 000 общего опыта</strong>. Характеристики растут с резкими скачками силы каждые 5 уровней."
      },
      strategy2: {
        title: "Активный Фарм против Оффлайна",
        text: "Короткие квесты (до 20 мин) идеальны для активной игры. Долгие квесты (8+ часов) ставьте прямо перед выходом из игры, чтобы таймеры шли в оффлайне."
      }
    },
    section4: {
      step: "04",
      title: "Крафт и Рецепты Ключей",
      description: "Все, что вам нужно для создания на Верстаке Tiny. Превращайте накопленные купоны и материалы в ключи и лягушек, чтобы открывать новых союзников и награды.",
      recipes: [
        {
          tag: "КЛЮЧ ЭКСПЕДИЦИИ",
          title: "Простой Ключ Tiny",
          desc: "Используется для открытия базовых сундуков с наградами экспедиций и получения ваших призов.",
          label: "Требуется Купонов",
          value: "100x Купонов Экспедиции"
        },
        {
          tag: "КРАФТ СОЮЗНИКОВ",
          title: "Gilden Rana",
          desc: "Особый материал, используемый в качестве ключевого ингредиента для создания новых мощных союзников в киоске Tadpole Tours.",
          label1: "Основа Ключа",
          val1: "1x Простой Ключ Tiny",
          label2: "Доп. Материал",
          val2: "Редкие Материалы"
        }
      ],
      summary: {
        tag: "ИТОГИ",
        title: "Главные Выводы и Цели Эндгейма",
        list: [
          "<strong>Приоритет Союзникам на Свет:</strong> Прокачайте Tiny Trugina или Вивиан до 30 уровня в первую очередь для максимального Света (потолок 563 Света).",
          "<strong>Всегда держите 3 слота активными:</strong> Никогда не оставляйте слоты пустыми. Пусть долгие таймеры идут пассивно, пока вы не в сети.",
          "<strong>Оптимизация Купонов:</strong> Не тратьте время на малоэффективные квесты 12+ часов, если нужны быстрые ключи — меняйте их сразу на купоны!",
          "<strong>Дисциплина Жетонов:</strong> Используйте жетоны мгновенного завершения только тогда, когда таймер опускается ниже 20 минут, ради максимальной выгоды."
        ]
      }
    },
    section5: {
      step: "05",
      title: "Лучший Способ Прокачки Союзников",
      description: "Прокрутите вниз, чтобы изучить ключевые механики прокачки союзников и полезные заметки.",
      cards: [
        {
          step: "01",
          category: "МЕХАНИКА",
          title: "Расширение Слотов (Макс 6)",
          desc: "По умолчанию доступно 3 активных слота экспедиций. Приобретайте расширители слотов, чтобы открыть до 6 слотов одновременно!",
          highlight: "Примечание: 6 активных слотов удваивают пассивный прирост опыта союзников в оффлайне."
        },
        {
          step: "02",
          category: "СБРОС",
          title: "Появление Станций и Обновление",
          desc: "Станции квестов появляются в подземельях после победы. Если станция предлагает неподходящие квесты, прохождение данжей в других биомах обновляет список.",
          highlight: "Совет: Прохождение подземелий в других биомах сразу обновляет квесты. Таймеры идут в реальном времени оффлайн."
        },
        {
          step: "03",
          category: "ПРОГРЕССИЯ",
          title: "XP и Масштабирование Характеристик",
          desc: "Для прокачки союзника с 1 по 30 уровень требуется около 65 000 общего опыта.",
          highlight: "Рост характеристик нелинеен — основные скачки силы происходят каждые 5 уровней (5, 10, 15, 20, 25, 30 ур)."
        },
        {
          step: "04",
          category: "СТРАТЕГИЯ",
          title: "Оптимальная Конвертация в Купоны",
          desc: "Всегда используйте 'Получить купон' на квестах длительностью 12+ часов, если только не собираетесь выходить из игры на ночь.",
          highlight: "100 купонов позволяют скрафтить Простой Ключ Tiny, открывающий награды сразу без ожидания долгих таймеров."
        }
      ]
    }
  },
  zh: {
    hero: {
      badge: "微型任务更新指南",
      title: "微型任务与侍从精通指南",
      description: "关于微型任务（Tiny Quest）更新、侍从升至30级、远征探索机制以及最佳进阶路线的全部核心攻略。"
    },
    section1: {
      step: "01",
      title: "30级侍从与属性成长",
      description: "在侧边栏选择侍从，查看其直至30级的详细属性数值成长、升级进度与特权加成。",
      adjustLevel: "调整侍从等级：",
      lvl1: "1级 (0 XP)",
      lvl15: "15级",
      lvl30: "30级 (满级)",
      lightStat: "光能值 (Light)",
      base: "基础：",
      damageBoost: "伤害 / 速度加成",
      specialPerk: "特殊特权："
    },
    alliesText: {
      vivian: {
        name: "冒险薇薇安 (Venturous Vivian)",
        tier: "顶级光能与双攻加成",
        perk: "物理与魔法伤害加成",
        description: "在30级时提供当前顶级的双重物理与魔法伤害百分比加成与最高光能值成长。"
      },
      moontouched: {
        name: "月触之灵 (The Moontouched)",
        tier: "顶级光能与稳定性",
        perk: "额外稳定性 + 高光能",
        description: "在高等级提供最高档位的光能值，并附带物理伤害与高额稳定性加成。"
      },
      skyfire: {
        name: "星空天火 (Starry Skyfire)",
        tier: "魔法伤害成长",
        perk: "高额魔法伤害成长",
        description: "专为魔法伤害职业量身打造的强力进攻型侍从，30级提供高达500点光能值。"
      },
      scorpius: {
        name: "天蝎座 (Scorpius)",
        tier: "物理伤害成长",
        perk: "高额物理伤害成长",
        description: "强力的物理伤害侍从，提供500点光能值以及高达28.75%的巨额物理伤害加成。"
      },
      staruable: {
        name: "星之友 (Staruable)",
        tier: "速度与光能功能型",
        perk: "移动速度加成",
        description: "专为速刷配装打造的理想侍从，同时兼顾扎实的光能值与高额移动速度提升。"
      },
      heckmantis: {
        name: "球形地狱螳螂 (Bulbous Heckmantis)",
        tier: "暴击伤害专精",
        perk: "巨额暴击伤害加成",
        description: "专注暴击伤害提升的特化型侍从，在30级时提供高达34.5%的暴击伤害加成。"
      }
    },
    section2: {
      step: "02",
      title: "远征机制与代金券策略",
      description: "深入了解远征栏位运作规则、击碎宝箱为何会阻碍按键交互（E键），以及如何将不需要的长倒计时任务直接转换为钥匙代金券。",
      cards: [
        {
          num: "01",
          title: "副本生成与宝箱交互技巧",
          text: "击败副本 Boss 后会生成任务台。请勿立即打碎通关宝箱，散落一地的掉落物会严重干扰你按下交互键（`E`）接取任务。"
        },
        {
          num: "02",
          title: "3个初始远征栏位限制",
          text: "默认最多同时进行3个活跃远征（使用扩展器后最多可扩展至6个）。即使下线或关闭游戏，远征倒计时依然会在后台实时扣除。",
          badge1: "最大活跃：3名侍从",
          badge2: "离线挂机进度：支持"
        },
        {
          num: "03",
          title: "\"获取代金券\"跳过机制",
          text: "如果刷出的任务耗时过长，可选择\"改获取代金券\"直接跳过。累积100张代金券即可制作一把<strong>简单微型钥匙</strong>。"
        },
        {
          num: "04",
          title: "即时完成代币的最佳用法",
          text: "耗时越短的任务消耗的即时完成代币越少。请严格将代币留给20-25分钟以下的任务，以最大化代币价值。",
          note: "<strong>注意：</strong> 随着任务自然倒计时逐渐归零，即时完成所需的代币数量也会动态下降！"
        }
      ]
    },
    section3: {
      step: "03",
      title: "升级路线与世界难度进阶",
      description: "在高难度世界完成任务以最大化侍从XP获取效率。随着难度阶位提升，远征任务耗时增加的同时XP收益也会成倍增长。",
      headers: ["世界难度", "任务阶位", "平均耗时", "侍从XP收益", "推荐策略"],
      rows: [
        { world: "新手 – D5", tier: "1–2 阶", duration: "5 – 15 分钟", xp: "低 (100–300 XP)", strategy: "快速轮转循环，非常适合用来消耗多余的即时完成代币。" },
        { world: "D6 – D9", tier: "3–4 阶", duration: "30分钟 – 2小时", xp: "中等 (500–1,200 XP)", strategy: "适合中期玩家冲刺满级的平稳均衡路线。" },
        { world: "D10 – D11", tier: "5–6 阶", duration: "3 – 8 小时", xp: "高 (2,000–5,000 XP)", strategy: "在准备下线前挂上，利用离线时间被动获取大量XP。" },
        { world: "D12 (终局)", tier: "最高阶位", duration: "12 – 24 小时", xp: "极高 (8,000+ XP)", strategy: "单次任务XP收益最高。若时间太长可使用\"获取代金券\"跳过。" }
      ],
      strategy1: {
        title: "XP 成长与数值机制",
        text: "侍从升至30级共计需要约 <strong>65,000 总XP</strong>。属性成长并非线性增长，在每5级（5、10、15、20、25、30级）会出现显著的战力跃升。"
      },
      strategy2: {
        title: "在线速刷 vs 离线挂机",
        text: "20分钟以内的短任务适合在线游玩时循环速刷；8小时以上的超长任务建议在退出游戏前挂满，利用离线时间消化倒计时。"
      }
    },
    section4: {
      step: "04",
      title: "制作与钥匙合成配方",
      description: "微型工作台（Tiny Bench）的全部合成配方。将收集的代金券与材料合成为钥匙与树蛙，解锁全新侍从与丰厚远征奖励。",
      recipes: [
        {
          tag: "远征钥匙",
          title: "简单微型钥匙 (Simple Tiny Key)",
          desc: "用于开启基础远征奖励宝箱并领取对应奖励。",
          label: "所需代金券",
          value: "100x 远征代金券"
        },
        {
          tag: "侍从制作材料",
          title: "镀金树蛙 (Gilden Rana)",
          desc: "在蝌蚪旅游信息站制作全新强力侍从所必需的核心材料。",
          label1: "基础钥匙",
          val1: "1x 简单微型钥匙",
          label2: "附加材料",
          val2: "额外珍稀材料"
        }
      ],
      summary: {
        tag: "核心总结",
        title: "核心要点与终局目标",
        list: [
          "<strong>优先拉满光能侍从：</strong> 优先将 Tiny Trugina 或 Vivian 升至30级以拉满角色的光能值（最高达563点光能上限）。",
          "<strong>时刻保持3个栏位运转：</strong> 切勿让远征栏位闲置，长倒计时任务可在离线时被动挂机完成。",
          "<strong>代金券最优转化：</strong> 如果急需钥匙，切勿在收益一般的12小时以上任务上浪费时间——直接转换为代金券！",
          "<strong>代币精准使用：</strong> 仅在自然倒计时降至20分钟以内时使用即时完成代币，以获取最高的代币转换性价比。"
        ]
      }
    },
    section5: {
      step: "05",
      title: "侍从升级最佳途径",
      description: "向下滚动依次解锁关键侍从进阶机制与实战策略笔记。",
      cards: [
        {
          step: "01",
          category: "机制",
          title: "远征栏位扩展 (最多6个)",
          desc: "默认初始提供3个活跃远征栏位。获取远征栏位扩展器后最多可解锁至6个总栏位！",
          highlight: "提示：同时运行6个活跃栏位可使离线被动侍从XP获取效率翻倍。"
        },
        {
          step: "02",
          category: "刷新",
          title: "任务台生成与池子刷新",
          desc: "副本通关后生成任务台。若任务台刷出的任务不理想或时间过长，前往不同生物群落完成副本即可轮换任务池。",
          highlight: "技巧：在不同群落完成副本可立即刷新任务池。即使离线倒计时也会实时进行。"
        },
        {
          step: "03",
          category: "进阶",
          title: "侍从XP升级与属性成长",
          desc: "将侍从从1级升至30级共计需要约 65,000 总XP。",
          highlight: "属性成长并非平滑增长——每5级（5、10、15、20、25、30级）都会迎来重大战力爆发。"
        },
        {
          step: "04",
          category: "策略",
          title: "最佳代金券转换策略",
          desc: "除非你准备下线睡觉，否则对于12小时以上的超长任务一律使用\"改获取代金券\"跳过。",
          highlight: "100张代金券即可制作一把简单微型钥匙，无需漫长等待即可即时开启宝箱兑换奖励。"
        }
      ]
    }
  }
};