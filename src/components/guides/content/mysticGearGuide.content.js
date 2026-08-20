export const mysticGearGuideContent = {
  en: {
    hero: {
      badge: "Pinnacle Endgame Gear",
      title: "Mystic Gear & Crafting Guide",
      description: "A comprehensive guide to upgrading your Crystal 5 gear to Mystic Tier 5, exact material costs, and the optimal 8-week farming cycle for Souls and Deepstone."
    },
    sections: {
      overview: {
        step: "01",
        title: "What is Mystic Gear?",
        badge: "Tier 5 Pinnacle",
        desc: "Mystic Gear represents the apex of equipment progression in Trove. By upgrading a maxed 5★ Crystal 5 (C5) gear piece in the Forge, you ascend it into Mystic tier, dramatically increasing your Light and Power Rank."
      },
      totalCosts: {
        step: "02",
        title: "Total Upgrade Costs (Tier 0 → 5)",
        badge: "Complete Set Investment",
        desc: "Fully upgrading a complete 3-piece Mystic Gear setup (Hat, Weapon, Face) requires a substantial material investment. Below is the total resource requirement and estimated market valuation:",
        items: [
          {
            name: "Depths Cores",
            total: "6,500 Total Cores",
            cost: "~84.5M Flux",
            type: "Tradeable (~13,000 Flux each)",
            desc: "Primary crafting component acquired from Delve vaults, Fast Invasions (Obelisks), and Sparkle Key 5-Star dungeons."
          },
          {
            name: "Soul of the Depths",
            total: "1,675 Total Souls",
            cost: "Account-Bound",
            type: "Non-Tradeable",
            desc: "Time-gated soul material farmed from Kraken / The Depths Delve vaults and Monday reset bonus dungeons."
          },
          {
            name: "Deepstone",
            total: "18,850 Total Deepstone",
            cost: "~17M Flux",
            type: "Tradeable (~900 Flux each)",
            desc: "Abundant ore found inside deep Delves (Levels 170–182). Highly optimized when mined on Tuesday gathering bonus days."
          }
        ]
      },
      strategy: {
        step: "03",
        title: "The 8-Week Farming Strategy",
        badge: "Optimal Progression Loop",
        desc: "Pacing your resource gathering across an 8-week cycle allows you to comfortably amass over 15,000 Depths Cores without exhausting all your daily Flux.",
        coreMethods: [
          {
            title: "Sparkle Keys (5 Daily)",
            yield: "1,680 Cores",
            desc: "Yields an average of 6 Depths Cores per 5-Star dungeon completion."
          },
          {
            title: "Normal Keys",
            yield: "8,400 Cores",
            desc: "Calculated based on clearing ~150 Normal Key vaults daily across your rotation."
          },
          {
            title: "Fast Invasion Obelisks",
            yield: "6,000 Cores",
            desc: "Securing a minimum of 3,000 cores per fast invasion event period."
          },
          {
            title: "Runic Anvil Trunks",
            yield: "~1,000 Cores",
            desc: "Bonus passive cores granted if you have unlocked the dedicated node from the Runic Anvil tree."
          }
        ]
      },
      soulFarming: {
        step: "04",
        title: "Soul of the Depths (Monday Bonus)",
        badge: "Weekly Lockout Priority",
        desc: "Since Souls of the Depths are account-bound, time management around the Monday server reset is critical for your upgrade timeline.",
        points: [
          "<strong>Monday Reset Dungeon Bonus:</strong> Clearing 5 designated dungeons on Monday yields <strong>1,960 Souls</strong> (calculated using Sparkle Keys only).",
          "<strong>Normal Key Vaults:</strong> Opening regular vaults in Kraken / The Depths Delves rewards <strong>~6 Souls</strong> per vault.",
          "<strong>Sparkling Key Vaults:</strong> Opening Sparkling Key vaults in Kraken / The Depths Delves rewards <strong>~8 Souls</strong> per vault."
        ]
      },
      deepstoneFarming: {
        step: "05",
        title: "Deepstone Gathering (Tuesday Exclusive)",
        badge: "Mining Multiplier",
        desc: "Deepstone gathering is heavily amplified on <strong>TUESDAY</strong> due to the daily mining multiplier bonuses active across all worlds.",
        tips: [
          "Deepstones only start to populate and spawn <strong>after you clear the first Vault</strong> inside the delve instance.",
          "Farming between <strong>Depths levels 170 and 182</strong> in Kraken / The Depths Delves yields approximately <strong>~350 Deepstones per portal</strong>."
        ]
      }
    }
  },
  fr: {
    hero: {
      badge: "Équipement Ultime Endgame",
      title: "Guide de l'Équipement Mystique",
      description: "Guide complet pour améliorer votre équipement Cristal 5 en Mystique Rang 5, les coûts exacts en matériaux et le cycle de farm optimal sur 8 semaines."
    },
    sections: {
      overview: {
        step: "01",
        title: "Qu'est-ce que l'Équipement Mystique ?",
        badge: "Sommet du Rang 5",
        desc: "L'équipement Mystique représente le sommet de la progression dans Trove. En améliorant une pièce C5 5★ dans la Forge, vous la convertissez en rang Mystique, augmentant considérablement votre Lumière et votre Rang de Puissance."
      },
      totalCosts: {
        step: "02",
        title: "Coûts Totaux d'Amélioration (Rang 0 → 5)",
        badge: "Investissement Set Complet",
        desc: "L'amélioration complète d'un ensemble de 3 pièces (Chapeau, Arme, Visière) nécessite un investissement massif. Voici le récapitulatif précis des ressources et de leur valeur marchande :",
        items: [
          {
            name: "Depths Cores (Cœurs des Profondeurs)",
            total: "6 500 Cœurs au Total",
            cost: "~84,5M Flux",
            type: "Échangeable (~13 000 Flux unité)",
            desc: "Composant principal obtenu dans les coffres de Delves, les Invasions Rapides (Obélisques) et les donjons 5 étoiles via Clés Scintillantes."
          },
          {
            name: "Soul of the Depths (Âmes des Profondeurs)",
            total: "1 675 Âmes au Total",
            cost: "Lié au Compte",
            type: "Non Échangeable",
            desc: "Ressource hebdomadaire obtenue dans les caveaux du Kraken / Profondeurs et lors du bonus de donjons du lundi."
          },
          {
            name: "Deepstone (Pierres des Profondeurs)",
            total: "18 850 Pierres au Total",
            cost: "~17M Flux",
            type: "Échangeable (~900 Flux unité)",
            desc: "Minerai abondant situé dans les Delves profondes (Niveaux 170 à 182). À récolter impérativement le mardi lors du bonus de minage."
          }
        ]
      },
      strategy: {
        step: "03",
        title: "La Stratégie de Farm sur 8 Semaines",
        badge: "Cycle d'Optimisation",
        desc: "Étaler votre récolte sur un cycle de 8 semaines vous permet d'amasser plus de 15 000 Cœurs des Profondeurs sans épuiser tout votre Flux quotidien.",
        coreMethods: [
          {
            title: "Clés Scintillantes (5 par jour)",
            yield: "1 680 Cœurs",
            desc: "Rapporte en moyenne 6 Cœurs des Profondeurs par donjon 5 étoiles terminé."
          },
          {
            title: "Clés Normales",
            yield: "8 400 Cœurs",
            desc: "Basé sur l'ouverture d'environ 150 caveaux de Clés Normales par jour."
          },
          {
            title: "Obélisques d'Invasion Rapide",
            yield: "6 000 Cœurs",
            desc: "Obtenu en sécurisant un minimum de 3 000 cœurs par session d'invasion rapide."
          },
          {
            title: "Troncs de l'Enclume Runique",
            yield: "~1 000 Cœurs",
            desc: "Cœurs passifs accordés si vous avez débloqué le nœud dédié dans l'arbre de l'Enclume Runique."
          }
        ]
      },
      soulFarming: {
        step: "04",
        title: "Âmes des Profondeurs (Bonus du Lundi)",
        badge: "Priorité Reset Hebdomadaire",
        desc: "Les Âmes étant liées au compte, la gestion de votre temps autour du reset du lundi est cruciale pour votre progression.",
        points: [
          "<strong>Bonus Donjon du Lundi :</strong> Terminer 5 donjons désignés le lundi rapporte <strong>1 960 Âmes</strong> (calculé avec des Clés Scintillantes uniquement).",
          "<strong>Caveaux avec Clés Normales :</strong> Ouvrir des caveaux standards dans les Delves Kraken / Profondeurs accorde <strong>~6 Âmes</strong> par coffre.",
          "<strong>Caveaux avec Clés Scintillantes :</strong> Ouvrir des caveaux scintillants accorde <strong>~8 Âmes</strong> par coffre."
        ]
      },
      deepstoneFarming: {
        step: "05",
        title: "Récolte de Deepstone (Exclusivité Mardi)",
        badge: "Multiplicateur de Minage",
        desc: "La récolte de Deepstone est fortement optimisée le <strong>MARDI</strong> grâce aux multiplicateurs de minage actifs ce jour-là.",
        tips: [
          "Les minerais de Deepstone commencent à apparaître <strong>uniquement après avoir vidé le premier caveau</strong> du Delve.",
          "Miner entre les <strong>niveaux 170 et 182</strong> dans les Delves Kraken / Profondeurs rapporte environ <strong>~350 Deepstones par portail</strong>."
        ]
      }
    }
  },
  es: {
    hero: {
      badge: "Equipo Supremo de Endgame",
      title: "Guía de Equipo Místico y Forja",
      description: "Guía completa para mejorar tu equipo Cristal 5 a Místico Rango 5, costes exactos de materiales y el ciclo óptimo de farmeo de 8 semanas para Almas y Deepstone."
    },
    sections: {
      overview: {
        step: "01",
        title: "¿Qué es el Equipo Místico?",
        badge: "Cúspide de Rango 5",
        desc: "El Equipo Místico representa la cima de la progresión de equipamiento en Trove. Al mejorar una pieza C5 5★ en la Forja, la asciendes a rango Místico, aumentando drásticamente tu Luz y Rango de Poder."
      },
      totalCosts: {
        step: "02",
        title: "Costes Totales de Mejora (Rango 0 → 5)",
        badge: "Inversión del Set Completo",
        desc: "Mejorar al máximo un conjunto completo de 3 piezas (Sombrero, Arma, Visor) requiere una inversión masiva. A continuación se detallan los recursos exactos y su valor estimado en el mercado:",
        items: [
          {
            name: "Depths Cores (Núcleos de las Profundidades)",
            total: "6.500 Núcleos en Total",
            cost: "~84.5M Flux",
            type: "Comerciable (~13.000 Flux c/u)",
            desc: "Componente principal obtenido en cofres de Delves, Invasiones Rápidas (Obeliscos) y mazmorras de 5 estrellas con Llaves Brillantes."
          },
          {
            name: "Soul of the Depths (Almas de las Profundidades)",
            total: "1.675 Almas en Total",
            cost: "Vinculado a la Cuenta",
            type: "No Comerciable",
            desc: "Material con límite temporal obtenido en cofres de Delves de Kraken / Profundidades y en el bonus de mazmorras del lunes."
          },
          {
            name: "Deepstone (Piedra Profunda)",
            total: "18.850 Piedras en Total",
            cost: "~17M Flux",
            type: "Comerciable (~900 Flux c/u)",
            desc: "Mineral abundante encontrado en Delves profundos (Niveles 170–182). Extremadamente optimizado si se mina los martes con el bonus de recolección."
          }
        ]
      },
      strategy: {
        step: "03",
        title: "Estrategia de Farmeo de 8 Semanas",
        badge: "Bucle Óptimo de Farmeo",
        desc: "Distribuir la recolección de materiales a lo largo de 8 semanas te permite acumular cómodamente más de 15.000 Núcleos sin agotar todo tu Flux diario.",
        coreMethods: [
          {
            title: "Llaves Brillantes (5 Diarias)",
            yield: "1.680 Núcleos",
            desc: "Otorga un promedio de 6 Núcleos por cada mazmorra de 5 estrellas completada."
          },
          {
            title: "Llaves Normales",
            yield: "8.400 Núcleos",
            desc: "Calculado en base a abrir ~150 cofres de Llave Normal diariamente."
          },
          {
            title: "Obeliscos de Invasión Rápida",
            yield: "6.000 Núcleos",
            desc: "Asegurando un mínimo de 3.000 núcleos por evento de invasión rápida."
          },
          {
            title: "Troncos del Yunque Rúnico",
            yield: "~1.000 Núcleos",
            desc: "Núcleos pasivos otorgados si has desbloqueado el nodo correspondiente en el árbol del Yunque Rúnico."
          }
        ]
      },
      soulFarming: {
        step: "04",
        title: "Almas de las Profundidades (Bonus del Lunes)",
        badge: "Prioridad del Reinicio Semanal",
        desc: "Dado que las Almas están vinculadas a la cuenta, aprovechar el reinicio de los lunes es esencial para el progreso de tu equipo.",
        points: [
          "<strong>Bonus de Mazmorras del Lunes:</strong> Completar 5 mazmorras designadas los lunes otorga <strong>1.960 Almas</strong> (calculado únicamente con Llaves Brillantes).",
          "<strong>Cofres con Llaves Normales:</strong> Abrir cofres estándar en Delves de Kraken / Profundidades recompensa con <strong>~6 Almas</strong> por cofre.",
          "<strong>Cofres con Llaves Brillantes:</strong> Abrir cofres brillantes otorga <strong>~8 Almas</strong> por cofre."
        ]
      },
      deepstoneFarming: {
        step: "05",
        title: "Recolección de Deepstone (Exclusivo de Martes)",
        badge: "Multiplicador de Minería",
        desc: "La minería de Deepstone se maximiza los <strong>MARTES</strong> debido a los multiplicadores de recursos activos durante ese día.",
        tips: [
          "La Deepstone solo empieza a aparecer <strong>después de limpiar el primer cofre</strong> dentro del Delve.",
          "Minar entre los <strong>niveles 170 y 182</strong> en Delves de Kraken / Profundidades rinde aproximadamente <strong>~350 Deepstones por portal</strong>."
        ]
      }
    }
  },
  zh: {
    hero: {
      badge: "终局巅峰装备",
      title: "神秘装备 (Mystic Gear) 进阶指南",
      description: "详解如何将水晶5阶 (C5) 装备升级至神秘5阶 (Mystic Tier 5)、完整材料消耗汇总以及8周深渊之魂与深渊石的高效农怪循环策略。"
    },
    sections: {
      overview: {
        step: "01",
        title: "什么是神秘装备 (Mystic Gear)？",
        badge: "5阶巅峰毕业装备",
        desc: "神秘装备是 Trove 当前版本的终局毕业装备系统。在锻造炉中将一件满级的 5★ 水晶5阶 (C5) 装备直接升级，即可使其蜕变进阶为神秘阶装备，大幅跃升角色的光能值 (Light) 与战斗力等级 (PR)。"
      },
      totalCosts: {
        step: "02",
        title: "单套全套升级总消耗 (0阶 → 5阶)",
        badge: "三件套全满投入",
        desc: "将完整的 3 件套神秘装备（帽子、武器、面具）全部升至 5 阶需要巨额资源投入。以下为全套所需的核心材料汇总与市场估值：",
        items: [
          {
            name: "深渊核心 (Depths Cores)",
            total: "共计 6,500 核心",
            cost: "~8450万 原晶 (Flux)",
            type: "可交易 (单价约 13,000 原晶)",
            desc: "核心合成材料，可通过深渊宝箱、快速入侵方尖碑活动以及闪耀钥匙 5 星副本获取。"
          },
          {
            name: "深渊之魂 (Soul of the Depths)",
            total: "共计 1,675 灵魂",
            cost: "账号绑定",
            type: "不可交易",
            desc: "受每周时间锁限制的绑定材料，通过击杀海妖/深渊 Delves 宝箱及周一重置副本奖励获取。"
          },
          {
            name: "深渊石 (Deepstone)",
            total: "共计 18,850 矿石",
            cost: "~1700万 原晶 (Flux)",
            type: "可交易 (单价约 900 原晶)",
            desc: "产自深层 Delves (170–182层) 的丰富矿石。强烈建议在周二采矿加成日进行批量挖取。"
          }
        ]
      },
      strategy: {
        step: "03",
        title: "8周周期性高效农怪策略",
        badge: "最平稳进阶循环",
        desc: "将材料收集分摊至 8 周的常规循环中，可在不消耗全部每日原晶储备的前提下轻松积累超过 15,000 个深渊核心。",
        coreMethods: [
          {
            title: "闪耀钥匙 (每日 5 把)",
            yield: "产出 1,680 核心",
            desc: "完成每日 5 星地牢副本，平均每次产出约 6 个深渊核心。"
          },
          {
            title: "普通钥匙深渊刷取",
            yield: "产出 8,400 核心",
            desc: "按每日日常消耗约 150 把普通钥匙开启深渊宝箱计算。"
          },
          {
            title: "快速入侵方尖碑",
            yield: "产出 6,000 核心",
            desc: "在每轮快速入侵活动周期内保底获取至少 3,000 个核心。"
          },
          {
            title: "符文铁砧宝箱节点",
            yield: "产出 ~1,000 核心",
            desc: "若已在符文铁砧天赋树中解锁了专属宝箱被动节点即可额外获得。"
          }
        ]
      },
      soulFarming: {
        step: "04",
        title: "深渊之魂获取 (周一重置专属)",
        badge: "每周重置优先级",
        desc: "由于深渊之魂为账号绑定材料，合理规划每周一服务器重置后的时间分配对整体装备毕业周期至关重要。",
        points: [
          "<strong>周一重置副本奖励：</strong> 周一完成指定的 5 个副本即可直接获得 <strong>1,960 个深渊之魂</strong>（仅使用闪耀钥匙计算）。",
          "<strong>普通钥匙宝箱：</strong> 在海妖/深渊 Delves 中开启普通钥匙宝箱，每个宝箱奖励 <strong>~6 个灵魂</strong>。",
          "<strong>闪耀钥匙宝箱：</strong> 在海妖/深渊 Delves 中开启闪耀钥匙宝箱，每个宝箱奖励 <strong>~8 个灵魂</strong>。"
        ]
      },
      deepstoneFarming: {
        step: "05",
        title: "深渊石挖矿 (周二加成专属)",
        badge: "采矿倍率翻倍",
        desc: "深渊石的采集效率在 <strong>周二</strong> 达到顶峰，全服当日激活的日常采矿增益可大幅提升单次开采产出。",
        tips: [
          "深渊石矿脉在深渊副本内 <strong>仅会在你清理并开启第一个宝箱后</strong> 才会刷新生成。",
          "在海妖/深渊 Delves 的 <strong>170 至 182 层</strong> 之间进行挖矿，每个传送门可稳定产出约 <strong>~350 块深渊石</strong>。"
        ]
      }
    }
  }
};