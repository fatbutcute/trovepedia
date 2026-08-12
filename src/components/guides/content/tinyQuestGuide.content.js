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
      badge: "Guide Mettre à jour Tiny Quest",
      title: "Guide Tiny Quest et Maîtrise des Compagnons",
      description: "Tout ce qu'il faut savoir sur la mise à jour Tiny Quest, monter ses compagnons niveau 30, les expéditions et l'optimisation."
    },
    section1: {
      step: "01",
      title: "Compagnons Niveau 30 et Évolution des Stats",
      description: "Sélectionnez un compagnon dans le panneau pour inspecter sa progression jusqu'au niveau 30.",
      adjustLevel: "Ajuster le Niveau :",
      lvl1: "Niv 1 (0 XP)", lvl15: "Niv 15", lvl30: "Niv 30 (MAX)",
      lightStat: "Stat Lumière", base: "Base :", damageBoost: "Boost Dégâts / Vitesse", specialPerk: "Bonus Spécial :"
    },
    alliesText: {
      vivian: { name: "Vivian l'Aventureuse", tier: "Lumière Max & Dégâts Doubles", perk: "Boost Dégâts Physiques et Magiques", description: "Offre le meilleur scaling de Lumière avec un double boost de dégâts." },
      moontouched: { name: "Le Touché par la Lune", tier: "Lumière Max & Stabilité", perk: "Stabilité Extra + Lumière Élevée", description: "Accorde la statistique de Lumière maximale et de la stabilité bonus." },
      skyfire: { name: "Feu Céleste Étoilé", tier: "Scaling Dégâts Magiques", perk: "Haut Scaling Dégâts Magiques", description: "Compagnon offensif adapté aux classes Magiques." },
      scorpius: { name: "Scorpius", tier: "Scaling Dégâts Physiques", perk: "Haut Scaling Dégâts Physiques", description: "Puissant compagnon axé sur les dégâts physiques." },
      staruable: { name: "Staruable", tier: "Vitesse & Lumière", perk: "Boost Vitesse de Déplacement", description: "Idéal pour le farm rapide nécessitant vitesse et Lumière." },
      heckmantis: { name: "Mante Bulbeuse", tier: "Focus Dégâts Critiques", perk: "Massif Boost Dégâts Critiques", description: "Spécialisé dans les Dégâts Critiques jusqu'à 34,5% au niveau 30." }
    },
    section2: {
      step: "02",
      title: "Mécaniques d'Expédition & Stratégie de Coupons",
      description: "Comprenez le fonctionnement des emplacements d'expédition et la conversion des longs délais en coupons.",
      cards: [
        { num: "01", title: "Apparition dans les Donjons", text: "Après avoir terminé un donjon, une station apparaît. Évitez de casser le coffre immédiatement." },
        { num: "02", title: "Limite de 3 Expéditions", text: "Vous pouvez lancer jusqu'à 3 expéditions simultanément (6 avec extensions).", badge1: "Max Actif : 3", badge2: "Progression Hors-ligne : OUI" },
        { num: "03", title: "Méthode \"Obtenir Coupon\"", text: "Si une quête a un délai trop long, choisissez \"Obtenir un coupon\". 100 coupons permettent de fabriquer une **Clé Simples**." },
        { num: "04", title: "Jetons d'Achèvement Instantané", text: "Économisez vos jetons pour les quêtes de moins de 20 minutes.", note: "<strong>Note :</strong> Plus le temps passe, plus le coût en jetons diminue !" }
      ]
    },
    section3: {
      step: "03",
      title: "Route de Niveau & Progression par Monde",
      description: "Maximisez l'XP de vos compagnons en terminant des quêtes dans des mondes de difficulté supérieure.",
      headers: ["Difficulté", "Tier Quête", "Durée Moyenne", "XP Compagnon", "Stratégie Recommandée"],
      rows: [
        { world: "Novice – D5", tier: "Tier 1–2", duration: "5 – 15 Min", xp: "Faible (100–300 XP)", strategy: "Cycles rapides. Idéal pour utiliser les jetons." },
        { world: "D6 – D9", tier: "Tier 3–4", duration: "30 Min – 2 Heures", xp: "Moyen (500–1 200 XP)", strategy: "Route équilibrée pour les joueurs mid-game." },
        { world: "D10 – D11", tier: "Tier 5–6", duration: "3 – 8 Heures", xp: "Élevé (2 000–5 000 XP)", strategy: "À lancer avant de se déconnecter." },
        { world: "D12 (Endgame)", tier: "Tier Max", duration: "12 – 24 Heures", xp: "Massif (8 000+ XP)", strategy: "Meilleur ratio XP. Utilisez les coupons si c'est trop long." }
      ],
      strategy1: { title: "Mécaniques d'XP", text: "Il faut environ **65 000 XP** pour atteindre le niveau 30." },
      strategy2: { title: "Farm Actif vs Hors-ligne", text: "Lancez les quêtes longues (8h+) juste avant de fermer le jeu." }
    },
    section4: {
      step: "04",
      title: "Artisanat & Recettes de Clés",
      description: "Tout ce qu'il faut fabriquer sur l'Établi Tiny.",
      recipes: [
        { tag: "CLÉ D'EXPÉDITION", title: "Clé Simple Tiny", desc: "Permet d'ouvrir les coffres d'expédition.", label: "Coupons Requis", value: "100x Coupons d'Expédition" },
        { tag: "ARTISANAT COMPAGNON", title: "Gilden Rana", desc: "Matériau spécial pour fabriquer de nouveaux compagnons.", label1: "Base de Clé", val1: "1x Clé Simple Tiny", label2: "Matériau Bonus", val2: "Matériaux Rares" }
      ],
      summary: {
        tag: "RÉSUMÉ", title: "Objectifs Clés",
        list: [
          "<strong>Priorité aux Compagnons Lumière :</strong> Montez Vivian ou Trugina niveau 30 en premier.",
          "<strong>Gardez toujours 3 emplacements actifs :</strong> Ne laissez jamais vos emplacements vides.",
          "<strong>Optimisation des Coupons :</strong> Convertissez les quêtes trop longues de 12h+ en coupons."
        ]
      }
    },
    section5: {
      step: "05",
      title: "Meilleure Méthode pour Monter vos Compagnons",
      description: "Déroulez vers le bas pour découvrir les astuces de progression.",
      cards: [
        {
          step: "01",
          category: "MÉCANIQUES",
          title: "Extension d'Emplacements (Max 6)",
          desc: "Par défaut, vous commencez avec 3 emplacements actifs. Obtenez des extensions pour débloquer jusqu'à 6 emplacements !",
          highlight: "Note : 6 emplacements actifs doublent votre gain d'XP passif hors-ligne."
        },
        {
          step: "02",
          category: "RÉINITIALISATIONS",
          title: "Apparition des Stations & Réinitialisation",
          desc: "Les stations apparaissent dans les donjons. Changer de biome permet de renouveler les quêtes disponibles.",
          highlight: "Astuce : Terminer des donjons dans d'autres biomes réinitialise immédiatement les quêtes."
        },
        {
          step: "03",
          category: "PROGRESSION",
          title: "Progression d'XP et Stats",
          desc: "Monter un compagnon du niveau 1 à 30 nécessite environ 65 000 XP au total.",
          highlight: "Les pics de puissance majeurs se déclenchent tous les 5 niveaux (Niv 5, 10, 15, 20, 25, 30)."
        },
        {
          step: "04",
          category: "STRATÉGIE",
          title: "Conversion Optimale en Coupons",
          desc: "Utilisez toujours 'Obtenir un coupon' sur les quêtes de 12h+ sauf si vous allez vous coucher.",
          highlight: "100 coupons permettent de fabriquer une Clé Simple Tiny pour débloquer vos récompenses."
        }
      ]
    }
  },
  es: {
    hero: { badge: "Guía Tiny Quest", title: "Guía de Tiny Quest y Maestría de Aliados", description: "Todo sobre la actualización Tiny Quest, subir aliados al nivel 30 y optimizar expediciones." },
    section1: {
      step: "01", title: "Aliados Nivel 30 y Escalado", description: "Selecciona un aliado para inspeccionar sus estadísticas.",
      adjustLevel: "Nivel de Aliado:", lvl1: "Nvl 1", lvl15: "Nvl 15", lvl30: "Nvl 30 (MÁX)", lightStat: "Luz", base: "Base:", damageBoost: "Aumento Daño/Velocidad", specialPerk: "Ventaja Especial:"
    },
    alliesText: {
      vivian: { name: "Vivian la Aventurera", tier: "Luz Máx y Daño Doble", perk: "Aumento Daño Físico y Mágico", description: "Ofrece el máximo escalado de Luz con aumento de daño doble." },
      moontouched: { name: "El Tocado por la Luna", tier: "Luz Máx y Estabilidad", perk: "Estabilidad Extra + Luz Alta", description: "Concede estadística de Luz máxima y estabilidad bonus." },
      skyfire: { name: "Fuego Estelar", tier: "Escalado Daño Mágico", perk: "Alto Escalado Daño Mágico", description: "Aliado ofensivo ideal para clases mágicas." },
      scorpius: { name: "Scorpius", tier: "Escalado Daño Físico", perk: "Alto Escalado Daño Físico", description: "Potente aliado orientado al daño físico." },
      staruable: { name: "Staruable", tier: "Velocidad y Luz", perk: "Aumento Velocidad Movimiento", description: "Ideal para velocidad de granjeo." },
      heckmantis: { name: "Mantis Bulbosa", tier: "Focus Daño Crítico", perk: "Aumento Masivo Daño Crítico", description: "Especializado en Daño Crítico hasta 34.5%." }
    },
    section2: {
      step: "02", title: "Mecánicas de Expedición y Cupones", description: "Aprende cómo funcionan los espacios de expedición.",
      cards: [
        { num: "01", title: "Aparición en Mazmorras", text: "Al completar una mazmorra aparece una estación. Evita romper el cofre de inmediato." },
        { num: "02", title: "Límite de 3 Expediciones", text: "Puedes ejecutar hasta 3 expediciones activas simultáneamente.", badge1: "Máx Activos: 3", badge2: "Progreso Offline: SÍ" },
        { num: "03", title: "Método \"Obtener Cupón\"", text: "Usa \"Obtener Cupón\" en misiones largas. 100 cupones crean una **Llave Simple**." },
        { num: "04", title: "Fichas de Completado Instantáneo", text: "Reserva fichas para misiones de menos de 20 minutos.", note: "<strong>Nota:</strong> ¡El coste disminuye con el tiempo!" }
      ]
    },
    section3: {
      step: "03", title: "Ruta de Nivelación y Mundos", description: "Maximiza la XP completando misiones en mundos más difíciles.",
      headers: ["Dificultad", "Rango Misión", "Duración", "XP Aliado", "Estrategia"],
      rows: [
        { world: "Principiante – D5", tier: "Rango 1–2", duration: "5 – 15 Min", xp: "Baja (100–300 XP)", strategy: "Ciclos rápidos." },
        { world: "D6 – D9", tier: "Rango 3–4", duration: "30 Min – 2 Horas", xp: "Media (500–1200 XP)", strategy: "Ruta equilibrada." },
        { world: "D10 – D11", tier: "Rango 5–6", duration: "3 – 8 Horas", xp: "Alta (2000–5000 XP)", strategy: "Activar antes de desconectarse." },
        { world: "D12 (Endgame)", tier: "Rango Máx", duration: "12 – 24 Horas", xp: "Masiva (8000+ XP)", strategy: "Mejor ratio de XP." }
      ],
      strategy1: { title: "Escalado de XP", text: "Se necesitan unos **65,000 XP** en total." },
      strategy2: { title: "Farm Activo vs Offline", text: "Pon misiones largas antes de cerrar el juego." }
    },
    section4: {
      step: "04", title: "Fabricación y Recetas", description: "Todo lo necesario para fabricar en el Banco Tiny.",
      recipes: [
        { tag: "LLAVE EXPEDICIÓN", title: "Llave Simple Tiny", desc: "Abre cofres de expedición.", label: "Cupones Requeridos", value: "100x Cupones" },
        { tag: "CREACIÓN ALIADOS", title: "Gilden Rana", desc: "Material clave para crear aliados.", label1: "Base Llave", val1: "1x Llave Simple", label2: "Material Extra", val2: "Materiales Raros" }
      ],
      summary: {
        tag: "RESUMEN", title: "Objetivos Principales",
        list: [
          "<strong>Prioriza Aliados de Luz:</strong> Sube a Vivian a nivel 30 primero.",
          "<strong>Mantén 3 espacios activos:</strong> Nunca dejes espacios vacíos.",
          "<strong>Optimiza Cupones:</strong> Convierte misiones de 12h+ en cupones."
        ]
      }
    },
    section5: {
      step: "05",
      title: "Mejor Forma de Subir Aliados",
      description: "Baja para revelar consejos estratégicos.",
      cards: [
        {
          step: "01",
          category: "MECÁNICAS",
          title: "Expansión de Espacios (Máx 6)",
          desc: "Comienzas con 3 espacios. ¡Consigue expansiones para desbloquear hasta 6 espacios activos!",
          highlight: "Nota: 6 espacios duplican la XP pasiva offline."
        },
        {
          step: "02",
          category: "REINICIOS",
          title: "Aparición de Estaciones y Reinicio",
          desc: "Las estaciones aparecen en mazmorras. Cambiar de bioma renueva las misiones disponibles.",
          highlight: "Consejo: Completar mazmorras en otros biomas renueva las misiones inmediatamente."
        },
        {
          step: "03",
          category: "PROGRESIÓN",
          title: "XP y Escalado de Aliados",
          desc: "Subir del nivel 1 al 30 requiere aproximadamente 65,000 XP en total.",
          highlight: "Los aumentos principales de poder ocurren cada 5 niveles (Nvl 5, 10, 15, 20, 25, 30)."
        },
        {
          step: "04",
          category: "ESTRATEGIA",
          title: "Conversión Óptima a Cupones",
          desc: "Convierte misiones de 12h+ en cupones a menos que te desclaves por la noche.",
          highlight: "100 cupones crean una Llave Simple Tiny para reclamar recompensas."
        }
      ]
    }
  },
  ru: {
    hero: { badge: "Гайд по Tiny Quest", title: "Гайд по Tiny Quest и Союзникам", description: "Все о прокачке союзников до 30 уровня и экспедициях." },
    section1: {
      step: "01", title: "Союзники 30 Уровня и Характеристики", description: "Выберите союзника для просмотра характеристик.",
      adjustLevel: "Уровень союзника:", lvl1: "Ур 1", lvl15: "Ур 15", lvl30: "Ур 30 (МАКС)", lightStat: "Свет", base: "Базовый:", damageBoost: "Бонус Урона/Скорости", specialPerk: "Особый Бонус:"
    },
    alliesText: {
      vivian: { name: "Авантюрная Вивиан", tier: "Макс Свет и Двойной Урон", perk: "Бонус Физ. и Маг. Урона", description: "Максимальный Свет и двойной урон на 30 уровне." },
      moontouched: { name: "Коснувшийся Луны", tier: "Макс Свет и Стабильность", perk: "Стабильность + Высокий Свет", description: "Максимальный Свет и бонус к стабильности." },
      skyfire: { name: "Звездный Небосвод", tier: "Магический Урон", perk: "Высокий Магический Урон", description: "Атакующий союзник для магов." },
      scorpius: { name: "Скорпиус", tier: "Физический Урон", perk: "Высокий Физический Урон", description: "Мощный союзник для физического урона." },
      staruable: { name: "Старуабль", tier: "Скорость и Свет", perk: "Бонус Скорости Перемещения", description: "Идеален для фарма скорости." },
      heckmantis: { name: "Богомол", tier: "Критический Урон", perk: "Массивный Критический Урон", description: "Специализация на Критическом Уроне до 34.5%." }
    },
    section2: {
      step: "02", title: "Механика Экспедиций и Купоны", description: "Изучите работу слотов экспедиций.",
      cards: [
        { num: "01", title: "Станции в Подземельях", text: "После прохождения появляется станция. Не разбивайте сундук сразу." },
        { num: "02", title: "Лимит 3 Экспедиций", text: "До 3 активных экспедиций одновременно (до 6 с расширителями).", badge1: "Макс: 3", badge2: "Прогресс Оффлайн: ДА" },
        { num: "03", title: "Пропуск через Купоны", text: "Пропускайте долгие квесты за купоны. 100 купонов = **Простой Ключ**." },
        { num: "04", title: "Жетоны Ускорения", text: "Используйте жетоны на квесты менее 20 минут.", note: "<strong>Примечание:</strong> Цена снижается со временем!" }
      ]
    },
    section3: {
      step: "03", title: "Прокачка и Прогрессия Миров", description: "Проходите квесты в более сложных мирах.",
      headers: ["Сложность", "Ранг Квеста", "Длительность", "XP Союзника", "Стратегия"],
      rows: [
        { world: "Новичок – D5", tier: "Ранг 1–2", duration: "5 – 15 Мин", xp: "Низкий (100–300)", strategy: "Быстрые циклы." },
        { world: "D6 – D9", tier: "Ранг 3–4", duration: "30 Мин – 2 Часа", xp: "Средний (500–1200)", strategy: "Сбалансированный маршрут." },
        { world: "D10 – D11", tier: "Ранг 5–6", duration: "3 – 8 Часов", xp: "Высокий (2000–5000)", strategy: "Запускать перед выходом." },
        { world: "D12 (Эндгейм)", tier: "Макс Ранг", duration: "12 – 24 Часа", xp: "Огромный (8000+)", strategy: "Лучший XP." }
      ],
      strategy1: { title: "Механика XP", text: "Требуется около **65,000 XP** до 30 уровня." },
      strategy2: { title: "Оффлайн Фарм", text: "Ставьте долгие квесты перед выходом из игры." }
    },
    section4: {
      step: "04", title: "Крафт и Рецепты Ключей", description: "Крафт на Верстаке Tiny.",
      recipes: [
        { tag: "КЛЮЧ ЭКСПЕДИЦИИ", title: "Простой Ключ Tiny", desc: "Открывает сундуки экспедиций.", label: "Требуется Купонов", value: "100x Купонов" },
        { tag: "КРАФТ СОЮЗНИКОВ", title: "Gilden Rana", desc: "Материал для создания союзников.", label1: "Основа Ключа", val1: "1x Простой Ключ", label2: "Бонус", val2: "Редкие Материалы" }
      ],
      summary: {
        tag: "ИТОГИ", title: "Главные Цели",
        list: [
          "<strong>Приоритет Свету:</strong> Прокачайте Вивиан до 30 уровня первой.",
          "<strong>Заполняйте все 3 слота:</strong> Не оставляйте слоты пустыми.",
          "<strong>Оптимизация Купонов:</strong> Переводите квесты 12ч+ в купоны."
        ]
      }
    },
    section5: {
      step: "05",
      title: "Лучший Способ Прокачки",
      description: "Скролльте для просмотра советов.",
      cards: [
        {
          step: "01",
          category: "МЕХАНИКА",
          title: "Расширение Слотов (Макс 6)",
          desc: "По умолчанию доступно 3 слота. Откройте до 6 активных слотов!",
          highlight: "Примечание: 6 слотов удваивают пассивный оффлайн XP."
        },
        {
          step: "02",
          category: "СБРОС",
          title: "Появление Станций и Сброс",
          desc: "Станции появляются в подземельях. Смена биома обновляет доступные квесты.",
          highlight: "Совет: Прохождение подземелий в других биомах сразу обновляет квесты."
        },
        {
          step: "03",
          category: "ПРОГРЕССИЯ",
          title: "XP и Прокачка Союзников",
          desc: "Для прокачки с 1 до 30 уровня требуется около 65,000 XP.",
          highlight: "Основные скачки силы происходят каждые 5 уровней (Ур 5, 10, 15, 20, 25, 30)."
        },
        {
          step: "04",
          category: "СТРАТЕГИЯ",
          title: "Конвертация в Купоны",
          desc: "Переводите долгие квесты 12ч+ в купоны.",
          highlight: "100 купонов создают Простой Ключ Tiny для получения наград."
        }
      ]
    }
  },
  zh: {
    hero: { badge: "微型任务更新指南", title: "微型任务与盟友精通指南", description: "关于微型任务更新、盟友提升至30级、远征机制与最佳进阶路线的全部内容。" },
    section1: {
      step: "01", title: "30级盟友与属性成长", description: "在侧边栏选择盟友以查看其属性成长。",
      adjustLevel: "调整盟友等级：", lvl1: "1级 (0 XP)", lvl15: "15级", lvl30: "30级 (最大)", lightStat: "光芒值", base: "基础：", damageBoost: "伤害/速度加成", specialPerk: "特殊效果："
    },
    alliesText: {
      vivian: { name: "冒险薇薇安", tier: "最大光芒值与双重伤害", perk: "物理与魔法伤害加成", description: "提供顶级光芒值成长与双重伤害加成。" },
      moontouched: { name: "月触之灵", tier: "最大光芒值与稳定性", perk: "额外稳定性 + 高光芒值", description: "提供最大光芒值与额外稳定性加成。" },
      skyfire: { name: "星空天火", tier: "魔法伤害成长", perk: "高额魔法伤害成长", description: "适合魔法伤害职业的高进攻性盟友。" },
      scorpius: { name: "天蝎座", tier: "物理伤害成长", perk: "高额物理伤害成长", description: "提供500光芒值与28.75%物理伤害加成。" },
      staruable: { name: "星之友", tier: "速度与光芒值", perk: "移动速度加成", description: "适合需要兼顾光芒值与移动速度的速刷构建。" },
      heckmantis: { name: "球形地狱螳螂", tier: "暴击伤害核心", perk: "巨额暴击伤害加成", description: "专注于暴击伤害成长，30级可达34.5%。" }
    },
    section2: {
      step: "02", title: "远征机制与代金券策略", description: "了解远征栏位的工作原理。",
      cards: [
        { num: "01", title: "副本生成", text: "完成副本后生成任务台，切勿立即打碎宝箱。" },
        { num: "02", title: "3个最大远征限制", text: "最多同时运行3个活跃远征（扩展后为6个）。", badge1: "最大活跃：3", badge2: "离线进度：支持" },
        { num: "03", title: "\"获取代金券\"跳过", text: "耗时过长时选择\"改获取代金券\"。100张代金券可制作**简单微型钥匙**。" },
        { num: "04", title: "即时完成代币", text: "建议仅对20分钟以下的任务使用代币。", note: "<strong>注意：</strong> 自然倒计时越接近0，代币消耗越低！" }
      ]
    },
    section3: {
      step: "03", title: "升级路线与世界进阶", description: "在高难度世界完成任务以最大化XP效率。",
      headers: ["世界难度", "任务阶位", "平均时长", "盟友XP收益", "推荐策略"],
      rows: [
        { world: "新手 – D5", tier: "阶位 1–2", duration: "5 – 15 分钟", xp: "低 (100–300)", strategy: "快速循环，消耗多余代币。" },
        { world: "D6 – D9", tier: "阶位 3–4", duration: "30 分钟 – 2 小时", xp: "中 (500–1200)", strategy: "中期玩家均衡路线。" },
        { world: "D10 – D11", tier: "阶位 5–6", duration: "3 – 8 小时", xp: "高 (2000–5000)", strategy: "下线前挂机挂上。" },
        { world: "D12 (终局)", tier: "最高阶位", duration: "12 – 24 小时", xp: "海量 (8000+)", strategy: "最佳XP收益比。" }
      ],
      strategy1: { title: "XP成长机制", text: "盟友升至30级约需 **65,000 总XP**。" },
      strategy2: { title: "挂机与离线", text: "长时间任务建议在关游戏前挂上。" }
    },
    section4: {
      step: "04", title: "制作与钥匙配方", description: "微型制作台上的所有制作配方。",
      recipes: [
        { tag: "远征钥匙", title: "简单微型钥匙", desc: "用于开启远征奖励宝箱。", label: "所需代金券", value: "100x 远征代金券" },
        { tag: "盟友制作", title: "镀金树蛙", desc: "制作强力新盟友的核心材料。", label1: "基础钥匙", val1: "1x 简单微型钥匙", label2: "额外材料", val2: "稀有材料" }
      ],
      summary: {
        tag: "总结", title: "核心目标",
        list: [
          "<strong>优先提升光芒值盟友：</strong> 优先将薇薇安升至30级。",
          "<strong>保持3个栏位运转：</strong> 切勿让栏位空置。",
          "<strong>代金券优化：</strong> 12小时以上的低收益任务直接转换为代金券。"
        ]
      }
    },
    section5: {
      step: "05",
      title: "盟友升级最佳途径",
      description: "向下滚动查看详细进阶技巧。",
      cards: [
        {
          step: "01",
          category: "机制",
          title: "栏位扩展 (最大6个)",
          desc: "默认开启3个栏位。获取扩展道具解锁最多6个栏位！",
          highlight: "注意：6栏位可翻倍被动离线XP收益。"
        },
        {
          step: "02",
          category: "刷新",
          title: "任务台生成与刷新",
          desc: "副本击败后生成任务台。切换生物群落可即时刷新任务池。",
          highlight: "提示：在其他群落完成副本可立即刷新可用任务。"
        },
        {
          step: "03",
          category: "进阶",
          title: "XP与属性成长",
          desc: "升至30级约需 65,000 XP。",
          highlight: "关键战力提升每5级触发一次 (5, 10, 15, 20, 25, 30级)。"
        },
        {
          step: "04",
          category: "策略",
          title: "最佳代金券转换",
          desc: "12小时以上的任务建议直接转换为代金券。",
          highlight: "100张代金券可制作简单微型钥匙，无需等待即可兑换奖励。"
        }
      ]
    }
  }
};