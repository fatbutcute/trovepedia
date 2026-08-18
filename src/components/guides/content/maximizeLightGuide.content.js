export const maximizeLightGuideContent = {
  en: {
    hero: {
      badge: "Endgame Progression",
      title: "Maximize Your Light",
      description: "A complete step-by-step mathematical guide to reaching the highest Light possible in Trove using Mystic Gems, Mystic Gear, Dragons, Star Chart, and Permanent Buffs."
    },
    sections: {
      cosmicGems: {
        step: "01",
        title: "Cosmic Gems",
        totalBadge: "Total: 4,945 Light (+750 from Berserk Battler)",
        empoweredTitle: "Empowered Cosmic (Berserk Battler)",
        empoweredLight: "1,715 Light (+750 on full proc)",
        lesserTitle: "Lesser Cosmic Gems x2",
        lesserLight: "1,615 Light each (3,230 total)",
        desc: "These must be max Mystic gems with 3 blue pearl boosts on Light and 100% augmented.",
        rule: "Rule: Max gems must have 3 boosts. Empowered gems must reach 3 boosts by Level 15 (if they don't, they are 2-star gems and should be replaced)."
      },
      c5Gear: {
        step: "02",
        title: "Crystal 5 Gear",
        totalBadge: "Total: 4,160 Light",
        items: [
          { name: "Gearcrafter's Hat", light: "1,040 Light", pr: "PR 1787 (5★)" },
          { name: "Crystal Weapon", light: "2,080 Light", pr: "PR 1787 (5★)" },
          { name: "Gearcrafter's Visor", light: "1,040 Light", pr: "PR 1787 (5★)" }
        ],
        costsTitle: "Upgrade Cost PER PIECE",
        costs: [
          { label: "From 0★ to 5★", cores: "165 Tempered Block Element", frags: "20,400 Forge Fragments", flux: "70,000 Nitro Glitterine" },
          { label: "From 2★ to 5★", cores: "150 Tempered Block Element", frags: "16,800 Forge Fragments", flux: "55,000 Nitro Glitterine" }
        ]
      },
      mysticGear: {
        step: "03",
        title: "Mystic Gear",
        totalBadge: "Total: 4,680 Light (+520 over C5)",
        items: [
          { name: "Gearcrafter's Hat", light: "1,170 Light", pr: "PR 2324 (5★)" },
          { name: "Gearcrafter's Spear", light: "2,340 Light", pr: "PR 2324 (5★)" },
          { name: "Crystalline Visor", light: "1,170 Light", pr: "PR 2324 (5★)" }
        ],
        forgeTip: "To get Mystic Gear, upgrade a 5★ C5 gear piece inside the Forge.",
        costsTitle: "Upgrade Cost PER PIECE",
        costs: [
          { label: "From C5 5★ to Mystic 5★", cores: "6,500 Depths Cores", souls: "1,675 Souls of the Depths", deepstone: "18,850 Deepstone" },
          { label: "From Mystic 0★ to Mystic 5★", cores: "6,250 Depths Cores", souls: "1,650 Souls of the Depths", deepstone: "18,750 Deepstone" }
        ]
      },
      miscGear: {
        step: "04",
        title: "Misc. Gear",
        totalBadge: "Total: 1,675 Light",
        bannerTitle: "Radiant Banner",
        bannerName: "Enshadowed Torch of Knotted Shadow",
        bannerLight: "900 Light",
        bannerDesc: "Rare drop from Ifera Leviathan boss, or guaranteed at the 250 Leviathans Slain badge.",
        ringTitle: "Crystal Ring",
        ringName: "Crystal Level 4 Ring",
        ringLight: "325 Light",
        ringDesc: "Requires Level 20. Crafted in the Ringcrafting Bench.",
        autoTitle: "Auto-Use (Food / Rune)",
        autoName: "Repel Rune",
        autoLight: "450 Light",
        autoDesc: "Crafted at the Rune Crafting Bench. Any 450 Light food also qualifies."
      },
      allies: {
        step: "05",
        title: "Allies",
        totalBadge: "Total: 400 or 450 Light",
        pdTitle: "Physical Damage",
        pdName: "Scorpius",
        pdLight: "400 Light",
        mdTitle: "Magic Damage",
        mdName: "Orchian",
        mdLight: "400 Light",
        note450: "You can also use a 450 Light ally like The Moontouched of All Time, Venturous Vivian, or Sunfest Allies (harder to obtain)."
      },
      dragons: {
        step: "06",
        title: "Dragons",
        totalBadge: "Total: 570 Light",
        list: [
          {
            name: "Zeuztian, the Eternal Irradiance",
            light: "25 Light",
            cost: "1 Dormant Egg, 300 Dragon Coins, 50 Irradiant Souls, 50 Phoenix Motes, 500 Powercells"
          },
          {
            name: "Charl the Chaos Dragon",
            light: "50 Light",
            cost: "50 Chaos Fragments, 300 Dragon Coins, 25k Flux, 75 Chaos Chests"
          },
          {
            name: "Taeryn Veernok, Progenitor of the Cosmos",
            light: "495 Light",
            cost: "3 Diamond Eggs, 600 Dragon Coins, 100k Flux, 10k Cosmic Dust, 5k Crystalline Cores",
            note: "Provides 495 Light assuming you have max Mystic Cosmic Gems (scales with gem power)."
          }
        ]
      },
      starChart: {
        step: "07",
        title: "Star Chart",
        totalBadge: "Total: 250 Light",
        nodes: "3 Light Nodes: 50 Light + 150 Light + 50 Light",
        keysTitle: "91 Constellation Keys (118,300 Cubits)",
        keysDesc: "Buy from Store (N) > More (1,300 each) or get 1 weekly from Locksmith's Lexicon (Mastery 270).",
        spheresTitle: "13 Celestial Spheres",
        spheresDesc: "Purchased with Astral Echoes from the NPC next to the Star Chart. Farm echoes from dungeon chests (5,000/week soft cap) or Astral Echoes Almanac tome (5,000/week)."
      },
      otherBuffs: {
        step: "08",
        title: "Subclass, Mastery & Litany",
        totalBadge: "Total: 1,140 Light + 1% Multiplier",
        solarionTitle: "Solarion Subclass (Lvl 30)",
        solarionLight: "140 Light",
        solarionDesc: "Crafting cost: 1 Phoenix Soul, 1 Sun Beam Container, 150 Primal Gem Shards.",
        geodeTitle: "Geode Mastery (Lvl 100)",
        geodeLight: "1,000 Light",
        geodeDesc: "+10 Light per Geode Mastery level up to Level 100.",
        litanyTitle: "Litany Buff (+1% Total Light)",
        litanyDesc: "Craft Mantra of Regeneration (15 Negative + 15 Positive Karma) → Equip it → Buy Quality Incense (1,000 Flux) from Disciple Daniel → Adopt Mantra as Litany at Relic of Preservation. Lasts until weekly reset."
      },
      everything: {
        title: "Everything Added Up",
        c5Total: "13,271.4 Light (C5 Gear + 400 Light Ally)",
        mysticTotal: "13,796.6 Light (Mystic Gear + 400 Light Ally)",
        absoluteMax: "14,604.6 Light (Mystic Gear + 450 Light Ally + Berserk Battler Proc)"
      }
    }
  },
  fr: {
    hero: {
      badge: "Progression Endgame",
      title: "Maximiser votre Lumière",
      description: "Guide mathématique complet pour atteindre la Lumière maximale dans Trove avec les Gemmes Mystiques, l'Équipement Mystique, les Dragons, le Star Chart et les Buffs Permanents."
    },
    sections: {
      cosmicGems: {
        step: "01",
        title: "Gemmes Cosmiques",
        totalBadge: "Total : 4 945 Lumière (+750 via Berserk Battler)",
        empoweredTitle: "Gemme Renforcée (Berserk Battler)",
        empoweredLight: "1 715 Lumière (+750 au proc max)",
        lesserTitle: "Gemmes Mineures x2",
        lesserLight: "1 615 Lumière chacune (3 230 au total)",
        desc: "Gemmes de rang Mystique max avec 3 perles de boost sur la Lumière et 100% d'augmentation.",
        rule: "Règle : 3 boosts obligatoires au niveau 15 (sinon la gemme est 2 étoiles et doit être recyclée)."
      },
      c5Gear: {
        step: "02",
        title: "Équipement Cristal 5",
        totalBadge: "Total : 4 160 Lumière",
        items: [
          { name: "Chapeau d'artisan", light: "1 040 Lumière", pr: "PR 1787 (5★)" },
          { name: "Arme Cristal", light: "2 080 Lumière", pr: "PR 1787 (5★)" },
          { name: "Visière d'artisan", light: "1 040 Lumière", pr: "PR 1787 (5★)" }
        ],
        costsTitle: "Coût d'amélioration PAR PIÈCE",
        costs: [
          { label: "De 0★ à 5★", cores: "165 Tempered Block Element", frags: "20 400 Forge Fragment", flux: "70 000 Nitro Glitterine" },
          { label: "De 2★ à 5★", cores: "150 Tempered Block Element", frags: "16 800 Forge Fragment", flux: "55 000 Nitro Glitterine" }
        ]
      },
      mysticGear: {
        step: "03",
        title: "Équipement Mystique",
        totalBadge: "Total : 4 680 Lumière (+520 vs C5)",
        items: [
          { name: "Chapeau d'artisan", light: "1 170 Lumière", pr: "PR 2324 (5★)" },
          { name: "Lance d'artisan", light: "2 340 Lumière", pr: "PR 2324 (5★)" },
          { name: "Visière Cristalline", light: "1 170 Lumière", pr: "PR 2324 (5★)" }
        ],
        forgeTip: "Pour obtenir l'équipement Mystique, améliorez une pièce C5 5★ dans la Forge.",
        costsTitle: "Coût d'amélioration PAR PIÈCE",
        costs: [
          { label: "De C5 5★ à Mystique 5★", cores: "6 500 Depths Cores", souls: "1 675 Souls of the Depths", deepstone: "18 850 Deepstone" },
          { label: "De Mystique 0★ à Mystique 5★", cores: "6 250 Depths Cores", souls: "1 650 Souls of the Depths", deepstone: "18 750 Deepstone" }
        ]
      },
      miscGear: {
        step: "04",
        title: "Équipements Divers",
        totalBadge: "Total : 1 675 Lumière",
        bannerTitle: "Bannière Radiante",
        bannerName: "Torche Enshadowed des Ombres Nouées",
        bannerLight: "900 Lumière",
        bannerDesc: "Drop rare sur le Léviathan Ifera ou garanti au badge de 250 Léviathans vaincus.",
        ringTitle: "Anneau Cristal",
        ringName: "Anneau Cristal Niveau 4",
        ringLight: "325 Lumière",
        ringDesc: "Niveau 20 requis. Fabriqué à l'Établi de Joaillerie.",
        autoTitle: "Consommable Auto-Use (Rune)",
        autoName: "Rune Repousser (Repel)",
        autoLight: "450 Lumière",
        autoDesc: "Fabriquée à l'Établi de Runes. Toute nourriture 450 Lumière convient."
      },
      allies: {
        step: "05",
        title: "Compagnons (Allies)",
        totalBadge: "Total : 400 ou 450 Lumière",
        pdTitle: "Dégâts Physiques (PD)",
        pdName: "Scorpius",
        pdLight: "400 Lumière",
        mdTitle: "Dégâts Magiques (MD)",
        mdName: "Orchian",
        mdLight: "400 Lumière",
        note450: "Vous pouvez également utiliser un allié 450 Lumière (Moontouched, Vivian, Sunfest)."
      },
      dragons: {
        step: "06",
        title: "Dragons",
        totalBadge: "Total : 570 Lumière",
        list: [
          { name: "Zeuztian, Rayonnement Éternel", light: "25 Lumière", cost: "1 Œuf, 300 Pièces, 50 Âmes, 50 Motes, 500 Piles" },
          { name: "Charl le Dragon du Chaos", light: "50 Lumière", cost: "50 Fragments, 300 Pièces, 25k Flux, 75 Coffres Chaos" },
          { name: "Taeryn Veernok, Primordial Cosmique", light: "495 Lumière", cost: "3 Œufs Diamant, 600 Pièces, 100k Flux, 10k Poussière Cosmique, 5k Cœurs", note: "Donne 495 Lumière avec des Gemmes Cosmiques Mystiques max." }
        ]
      },
      starChart: {
        step: "07",
        title: "Star Chart",
        totalBadge: "Total : 250 Lumière",
        nodes: "3 nœuds de Lumière : 50 + 150 + 50 Lumière",
        keysTitle: "91 Clés de Constellation (118 300 Cubits)",
        keysDesc: "Achetez en boutique (1 300 unités) ou 1 par semaine via le tome (Maîtrise 270).",
        spheresTitle: "13 Sphères Célestes",
        spheresDesc: "Achetées avec des Échos Astraux auprès du PNJ près du Star Chart. Farmez les échos dans les coffres de donjons (soft cap 5 000/semaine) ou le tome Almanach des Échos Astraux (5 000/semaine)."
      },
      otherBuffs: {
        step: "08",
        title: "Sous-classe, Maîtrise & Litanie",
        totalBadge: "Total : 1 140 Lumière + 1% Multiplicateur",
        solarionTitle: "Sous-classe Solarion (Niv. 30)",
        solarionLight: "140 Lumière",
        solarionDesc: "Coût : 1 Âme de Phénix, 1 Conteneur Solaire, 150 Éclats Primitifs.",
        geodeTitle: "Maîtrise Geode (Niv. 100)",
        geodeLight: "1 000 Lumière",
        geodeDesc: "+10 Lumière par niveau de Maîtrise Geode jusqu'au niveau 100.",
        litanyTitle: "Buff Litanie (+1% Lumière Totale)",
        litanyDesc: "Fabriquez le Mantra de Régénération (15 Karma Négatif + 15 Karma Positif) → Équipez-le → Achetez de l'Encens de Qualité (1 000 Flux) auprès du Disciple Daniel → Adoptez le Mantra comme Litanie à la Relique de Préservation. Dure jusqu'au reset hebdomadaire."
      },
      everything: {
        title: "Total Final Cumulé",
        c5Total: "13 271,4 Lumière (Équipement C5 + Allié 400)",
        mysticTotal: "13 796,6 Lumière (Équipement Mystique + Allié 400)",
        absoluteMax: "14 604,6 Lumière (Équipement Mystique + Allié 450 + Proc Berserk Battler)"
      }
    }
  },
  es: {
    hero: {
      badge: "Progresión Endgame",
      title: "Maximiza tu Luz",
      description: "Guía matemática completa para alcanzar la Luz máxima en Trove con Gemas Místicas, Equipo Místico, Dragones, Star Chart y Mejoras Permanentes."
    },
    sections: {
      cosmicGems: {
        step: "01",
        title: "Gemas Cósmicas",
        totalBadge: "Total: 4.945 Luz (+750 por Berserk Battler)",
        empoweredTitle: "Gema Potenciada (Berserk Battler)",
        empoweredLight: "1.715 Luz (+750 al activar)",
        lesserTitle: "Gemas Menores x2",
        lesserLight: "1.615 Luz cada una (3.230 total)",
        desc: "Deben ser gemas Místicas al máximo con 3 perlas en Luz y 100% aumentadas.",
        rule: "Regla: 3 mejoras obligatorias al nivel 15 (si no, son de 2 estrellas y deben ser cambiadas)."
      },
      c5Gear: {
        step: "02",
        title: "Equipo Cristal 5",
        totalBadge: "Total: 4.160 Luz",
        items: [
          { name: "Sombrero de artesano", light: "1.040 Luz", pr: "PR 1787 (5★)" },
          { name: "Arma Cristal", light: "2.080 Luz", pr: "PR 1787 (5★)" },
          { name: "Visor de artesano", light: "1.040 Luz", pr: "PR 1787 (5★)" }
        ],
        costsTitle: "Coste de mejora POR PIEZA",
        costs: [
          { label: "De 0★ a 5★", cores: "165 Tempered Block Element", frags: "20.400 Forge Fragmento", flux: "70.000 Nitro Glitterine" },
          { label: "De 2★ a 5★", cores: "150 Tempered Block Element", frags: "16.800 Forge Fragmento", flux: "55.000 Nitro Glitterine" }
        ]
      },
      mysticGear: {
        step: "03",
        title: "Equipo Místico",
        totalBadge: "Total: 4.680 Luz (+520 frente a C5)",
        items: [
          { name: "Sombrero de artesano", light: "1.170 Luz", pr: "PR 2324 (5★)" },
          { name: "Lanza de artesano", light: "2.340 Luz", pr: "PR 2324 (5★)" },
          { name: "Visor Cristalino", light: "1.170 Luz", pr: "PR 2324 (5★)" }
        ],
        forgeTip: "Para obtener equipo Místico, mejora una pieza C5 5★ en la Forja.",
        costsTitle: "Coste de mejora POR PIEZA",
        costs: [
          { label: "De C5 5★ a Místico 5★", cores: "6.500 Depths Cores", souls: "1.675 Souls of the Depths", deepstone: "18.850 Deepstone" },
          { label: "De Místico 0★ a Místico 5★", cores: "6.250 Depths Cores", souls: "1.650 Souls of the Depths", deepstone: "18.750 Deepstone" }
        ]
      },
      miscGear: {
        step: "04",
        title: "Equipo Misceláneo",
        totalBadge: "Total: 1.675 Luz",
        bannerTitle: "Estandarte Radiante",
        bannerName: "Antorcha Enshadowed de Sombras Anudadas",
        bannerLight: "900 Luz",
        bannerDesc: "Drop raro de Ifera o garantizado en la insignia de 250 Leviatanes eliminados.",
        ringTitle: "Anillo Cristal",
        ringName: "Anillo Cristal Nivel 4",
        ringLight: "325 Luz",
        ringDesc: "Requiere Nivel 20. Fabricado en el banco de joyería.",
        autoTitle: "Comida / Runa Auto-Uso",
        autoName: "Runa Repeler",
        autoLight: "450 Luz",
        autoDesc: "Fabricada en el banco de runas. Cualquier comida de 450 Luz es válida."
      },
      allies: {
        step: "05",
        title: "Aliados",
        totalBadge: "Total: 400 o 450 Luz",
        pdTitle: "Daño Físico (PD)",
        pdName: "Scorpius",
        pdLight: "400 Luz",
        mdTitle: "Daño Mágico (MD)",
        mdName: "Orchian",
        mdLight: "400 Luz",
        note450: "También puedes usar un aliado de 450 Luz (Moontouched, Vivian, Sunfest)."
      },
      dragons: {
        step: "06",
        title: "Dragones",
        totalBadge: "Total: 570 Luz",
        list: [
          { name: "Zeuztian, la Irradiación Eterna", light: "25 Luz", cost: "1 Huevo, 300 Monedas, 50 Almas, 50 Motes, 500 Powercells" },
          { name: "Charl el Dragón del Caos", light: "50 Luz", cost: "50 Fragmentos, 300 Monedas, 25k Flux, 75 Cofres Caos" },
          { name: "Taeryn Veernok, Primordial Cósmico", light: "495 Luz", cost: "3 Huevos Diamante, 600 Monedas, 100k Flux, 10k Polvo Cósmico, 5k Núcleos", note: "Otorga 495 Luz con gemas cósmicas Místicas al máximo." }
        ]
      },
      starChart: {
        step: "07",
        title: "Star Chart",
        totalBadge: "Total: 250 Luz",
        nodes: "3 Nodos de Luz: 50 + 150 + 50 Luz",
        keysTitle: "91 Llaves de Constelación (118.300 Cubits)",
        keysDesc: "Comprar en la tienda (1.300 c/u) o 1 semanal con el tomo (Maestría 270).",
        spheresTitle: "13 Esferas Celestiales",
        spheresDesc: "Compradas con Ecos Astrales en el NPC junto al Star Chart. Farmea ecos en cofres de mazmorras (límite suave de 5.000/semana) o con el tomo Almanaque de Ecos Astrales (5.000/semana)."
      },
      otherBuffs: {
        step: "08",
        title: "Subclase, Maestría y Letanía",
        totalBadge: "Total: 1.140 Luz + 1% Multiplicador",
        solarionTitle: "Subclase de Solarion (Niv. 30)",
        solarionLight: "140 Luz",
        solarionDesc: "Coste: 1 Alma de Fénix, 1 Contenedor Solar, 150 Fragmentos Primordiales.",
        geodeTitle: "Maestría de Geode (Niv. 100)",
        geodeLight: "1.000 Luz",
        geodeDesc: "+10 de Luz por nivel de Maestría de Geode hasta nivel 100.",
        litanyTitle: "Mejora Letanía (+1% Luz Total)",
        litanyDesc: "Fabrica el Mantra de Regeneración (15 Karma Negativo + 15 Karma Positivo) → Equípalo → Compra Incienso de Calidad (1.000 Flux) del Discípulo Daniel → Adopta el Mantra como Letanía en la Reliquia de Preservación. Dura hasta el reinicio semanal."
      },
      everything: {
        title: "Resumen Total Acumulado",
        c5Total: "13.271,4 Luz (Equipo C5 + Aliado 400)",
        mysticTotal: "13.796,6 Luz (Equipo Místico + Aliado 400)",
        absoluteMax: "14.604,6 Luz (Equipo Místico + Aliado 450 + Proc Berserk Battler)"
      }
    }
  },
  zh: {
    hero: {
      badge: "终局进阶指南",
      title: "最大化光能值 (Light)",
      description: "全面精准的数值攻略，详解如何通过神秘宝石、神秘装备、始源龙、星图以及常驻增益达到 Trove 当前最高光能极限。"
    },
    sections: {
      cosmicGems: {
        step: "01",
        title: "宇宙宝石",
        totalBadge: "总计：4,945 光能 (+750 来自狂暴战神触发)",
        empoweredTitle: "强能宇宙宝石 (狂暴战神)",
        empoweredLight: "1,715 光能 (+750 满触发加成)",
        lesserTitle: "普通宇宙宝石 x2",
        lesserLight: "每颗 1,615 光能 (共 3,230 光能)",
        desc: "必须为满级神秘阶宝石，且光能词条上拥有 3 颗蓝色珍珠加成与 100% 属性强化。",
        rule: "规则：满级宝石必须拥有 3 点强化。强能宝石在 15 级前必须触发 3 点加成（否则为 2 星废品需更换）。"
      },
      c5Gear: {
        step: "02",
        title: "水晶 5 阶装备 (C5)",
        totalBadge: "总计：4,160 光能",
        items: [
          { name: "制装者之帽", light: "1,040 光能", pr: "PR 1787 (5★)" },
          { name: "水晶武器", light: "2,080 光能", pr: "PR 1787 (5★)" },
          { name: "制装者面具 (Face)", light: "1,040 光能", pr: "PR 1787 (5★)" }
        ],
        costsTitle: "单件升级消耗",
        costs: [
          { label: "从 0★ 升至 5★", cores: "165 Tempered Block Element", frags: "20,400 锻造碎片", flux: "70,000 Nitro Glitterine" },
          { label: "从 2★ 升至 5★", cores: "150 Tempered Block Element", frags: "16,800 锻造碎片", flux: "55,000 Nitro Glitterine" }
        ]
      },
      mysticGear: {
        step: "03",
        title: "神秘阶装备",
        totalBadge: "总计：4,680 光能 (相比 C5 +520 光能)",
        items: [
          { name: "制装者之帽", light: "1,170 光能", pr: "PR 2324 (5★)" },
          { name: "制装者之矛 (武器)", light: "2,340 光能", pr: "PR 2324 (5★)" },
          { name: "水晶面具 (Face)", light: "1,170 光能", pr: "PR 2324 (5★)" }
        ],
        forgeTip: "获取神秘装备：在锻造炉中直接升级一件 5★ C5 装备。",
        costsTitle: "单件升级消耗",
        costs: [
          { label: "从 C5 5★ 升至 神秘 5★", cores: "6,500 深渊核心", souls: "1,675 深渊之魂", deepstone: "18,850 深渊石" },
          { label: "从 神秘 0★ 升至 神秘 5★", cores: "6,250 深渊核心", souls: "1,650 深渊之魂", deepstone: "18,750 深渊石" }
        ]
      },
      miscGear: {
        step: "04",
        title: "其他关键装备",
        totalBadge: "总计：1,675 光能",
        bannerTitle: "辉耀旗帜",
        bannerName: "结影暗影火炬 (Torch)",
        bannerLight: "900 光能",
        bannerDesc: "击杀地表利维坦 Boss 稀有掉落，或完成 250 只利维坦成就保底获得。",
        ringTitle: "水晶戒指",
        ringName: "水晶 4 阶戒指 (C4)",
        ringLight: "325 光能",
        ringDesc: "需角色达到 20 级，在珠宝台制作。",
        autoTitle: "自动消耗品 (符文/食物)",
        autoName: "击退符文 (Repel Rune)",
        autoLight: "450 光能",
        autoDesc: "在符文台制作。任何 450 光能食物均可替代。"
      },
      allies: {
        step: "05",
        title: "侍从 (Allies)",
        totalBadge: "总计：400 或 450 光能",
        pdTitle: "物理伤害 (PD)",
        pdName: "天蝎座 (Scorpius)",
        pdLight: "400 光能",
        mdTitle: "魔法伤害 (MD)",
        mdName: "奥奇安 (Orchian)",
        mdLight: "400 光能",
        note450: "亦可使用 450 光能侍从（如 Moontouched、Vivian 或太阳节限定侍从）。"
      },
      dragons: {
        step: "06",
        title: "巨龙",
        totalBadge: "总计：570 光能",
        list: [
          { name: "永恒光辉 Zeuztian", light: "25 光能", cost: "1 龙蛋, 300 龙币, 50 灵魂, 50 凤凰微粒, 500 能量电池" },
          { name: "混沌龙 Charl", light: "50 光能", cost: "50 碎片, 300 龙币, 25k 原晶, 75 混沌箱" },
          { name: "宇宙始源龙 Taeryn Veernok", light: "495 光能", cost: "3 钻石龙蛋, 600 龙币, 100k 原晶, 10k 宇宙尘, 5k 核心", note: "在满级神秘宇宙宝石加持下提供 495 光能。" }
        ]
      },
      starChart: {
        step: "07",
        title: "星图 (Star Chart)",
        totalBadge: "总计：250 光能",
        nodes: "3 个光能节点：50 + 150 + 50 光能",
        keysTitle: "91 把星座钥匙 (118,300 古币)",
        keysDesc: "商城购买 (每把 1300) 或专精 270 级每周法典产出 1 把。",
        spheresTitle: "13 颗天界宝球",
        spheresDesc: "在星图旁 NPC 处消耗星界回响购买。可在地牢宝箱刷取回响（每周软上限 5,000）或使用星界回响年历典籍（每周 5,000）。"
      },
      otherBuffs: {
        step: "08",
        title: "副职、专精与祈祷增益",
        totalBadge: "总计：1,140 光能 + 1% 总乘区加成",
        solarionTitle: "日轮者副职 (30 级)",
        solarionLight: "140 光能",
        solarionDesc: "制作材料：1 凤凰之魂, 1 太阳光束容器, 150 原初碎片。",
        geodeTitle: "吉奥德专精 (100 级)",
        geodeLight: "1,000 光能",
        geodeDesc: "吉奥德专精每级 +10 光能，满级 100 级提供 1000 光能。",
        litanyTitle: "祈祷增益 Litany (+1% 总光能)",
        litanyDesc: "制作再生咒语 (15 负面因果 + 15 正面因果) → 装备它 → 从门徒丹尼尔 (Disciple Daniel) 处购买品质熏香 (1,000 原晶) → 在保存圣物台将咒语设为祈祷 (Litany)。效果持续至每周重置。"
      },
      everything: {
        title: "最终总计汇总",
        c5Total: "13,271.4 光能 (C5 装备 + 400 侍从)",
        mysticTotal: "13,796.6 光能 (神秘装备 + 400 侍从)",
        absoluteMax: "14,604.6 光能 (神秘装备 + 450 侍从 + 狂暴战神触发)"
      }
    }
  }
};