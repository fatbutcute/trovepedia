export const leviathanTorchGuideContent = {
  en: {
    hero: {
      badge: "Geode Topside & Delve Bosses",
      title: "Leviathans & Permanent Torches Guide",
      description: "A complete walkthrough on hunting Geode Topside and Delve Leviathans, vault mechanics, exact torch stats, weekly upgrading, and badge progression."
    },
    sections: {
      overview: {
        step: "01",
        title: "Overview of Leviathans",
        badge: "Geode Topside Lairs",
        desc: "Leviathans are world bosses located in dedicated dark lair biomes on <strong>Geode Topside (D11–D13)</strong> and in deep <strong>Delves (Depth 115+)</strong>. Defeating them within the <strong>10-minute timer</strong> spawns a Leviathan Vault containing Torches, Crystal gear, and rare cosmetic drops."
      },
      mechanics: {
        step: "02",
        title: "Combat, Keys & Vault Mechanics",
        badge: "Core Rules",
        cards: [
          {
            title: "10-Minute Timer",
            tag: "Cursed Skull",
            desc: "Once the Cursed Skull is triggered in the lair, your raid party has exactly 10 minutes to defeat the Leviathan. If the timer runs out, the boss despawns and the skull must be activated again."
          },
          {
            title: "Leviathan Key",
            tag: "Vault Requirement",
            desc: "Opening the post-boss Leviathan Vault requires a Leviathan Key. Keys can be crafted at the All Purpose Key Mold conveniently placed near the exit portal inside the lair."
          },
          {
            title: "Crystal 3 Gear & Mount Drops",
            tag: "Bonus Loot",
            desc: "Leviathan Vaults feature increased Crystal-3 drop rates across all difficulties, as well as exclusive mount drops: Pair of Whirlygigs (D11), Timminutive (D12), and Iferan Spore Colony (D13)."
          }
        ]
      },
      bossTiers: {
        step: "03",
        title: "Leviathan Boss Tiers",
        badge: "4 World Encounters",
        cards: [
          {
            name: "Lobstroso",
            location: "D11 Topside (Pure Midnight)",
            reqLight: "2,800+ Light",
            drop: "Chitin Torches (250–300 Light)",
            desc: "Entry-level Leviathan. Straightforward melee attacks and rapid charge rotations."
          },
          {
            name: "Timmense",
            location: "D12 Topside (Uber Twilight)",
            reqLight: "3,800+ Light",
            drop: "Seasinew Torches (500–600 Light)",
            desc: "Mid-tier Leviathan. Fires a massive sweeping laser beam and spawns shadow adds."
          },
          {
            name: "Ifera",
            location: "D13 Topside (Mega Dark)",
            reqLight: "4,300+ Light",
            drop: "Tendril Torches (750–900 Light)",
            desc: "Pinnacle Topside boss. Spawns dangerous tentacles, vortex pulls, and lethal spin attacks."
          }
        ]
      },
      torchTable: {
        step: "04",
        title: "Exact Torch Stats & Decay Rules",
        badge: "Banner Slot Equipment",
        desc: "Torches occupy your banner equipment slot and are the primary source of endgame Light. While Fragile torches decay daily, crafting <strong>3 Fragile Torches into 1 Tempered Torch</strong> extends their lifespan to the weekly reset.",
        headers: ["Torch Name", "Boss Source", "Light Stat", "Duration / Decay"],
        rows: [
          { name: "Fragile Chitin Torch", boss: "Lobstroso (D11)", light: "+250 Light", decay: "Daily Reset" },
          { name: "Tempered Chitin Torch", boss: "Sunseeker Craft (3x Fragile)", light: "+300 Light", decay: "Weekly Reset" },
          { name: "Ancient Chitin Torch", boss: "Lobstroso (Rare Perma)", light: "+275 Light", decay: "Permanent (No Decay)" },
          { name: "Fragile Seasinew Torch", boss: "Timmense (D12)", light: "+500 Light", decay: "Daily Reset" },
          { name: "Tempered Seasinew Torch", boss: "Sunseeker Craft (3x Fragile)", light: "+600 Light", decay: "Weekly Reset" },
          { name: "Enchanted Seasinew Torch", boss: "Timmense (Rare Perma)", light: "+550 Light", decay: "Permanent (No Decay)" },
          { name: "Fragile Tendril Torch", boss: "Ifera (D13)", light: "+750 Light", decay: "Daily Reset" },
          { name: "Tempered Tendril Torch", boss: "Sunseeker Craft (3x Fragile)", light: "+900 Light", decay: "Weekly Reset" },
          { name: "Enshadowed Tendril Torch", boss: "Ifera (Rare Perma)", light: "+825 Light (900 Upgraded)", decay: "Permanent (Upgradable)" }
        ]
      },
      badges: {
        step: "05",
        title: "Leviathan Mastery & Badges",
        badge: "Milestones",
        desc: "Slaying Leviathans progresses account badges that grant Ego Potions, Cubits, and exclusive slayer vanity crowns.",
        milestones: [
          { kills: "1 Kill", reward: "Bronze Badge + Ego Potion + 25 Cubits" },
          { kills: "10 Kills", reward: "Silver Badge + Crown of the Leviathan Slayer: Lobstroso + 100 Cubits" },
          { kills: "50 Kills", reward: "Gold Badge + Ego Potion + 250 Cubits" },
          { kills: "100 Kills", reward: "Platinum Badge + Crown of the Leviathan Slayer: Timmense + 350 Cubits" },
          { kills: "250 Kills", reward: "Diamond Badge (Guaranteed Permanent Drop Pity) + 500 Cubits" },
          { kills: "500 Kills", reward: "Obsidian Badge + Crown of the Leviathan Slayer: Ifera + 750 Cubits" }
        ]
      }
    }
  },
  fr: {
    hero: {
      badge: "Boss de Geode Topside & Delves",
      title: "Guide des Léviathans et des Torches Permanentes",
      description: "Guide complet sur la chasse aux Léviathans de Geode Topside et des Delves, mécanique des coffres, statistiques exactes des torches, fabrication hebdomadaire et badges."
    },
    sections: {
      overview: {
        step: "01",
        title: "Vue d'ensemble des Léviathans",
        badge: "Antres de Geode Topside",
        desc: "Les Léviathans sont des boss mondiaux situés dans les antres sombres de <strong>Geode Topside (D11–D13)</strong> et des <strong>Delves (115+)</strong>. Les vaincre avant la fin du <strong>chrono de 10 minutes</strong> fait apparaître un coffre de Léviathan contenant des Torches, des pièces Cristal et des montures rares."
      },
      mechanics: {
        step: "02",
        title: "Combat, Clés & Coffres",
        badge: "Règles Essentielles",
        cards: [
          {
            title: "Chronomètre de 10 Minutes",
            tag: "Crâne Maudit",
            desc: "Dès l'activation du crâne maudit, le raid dispose de 10 minutes pour vaincre le Léviathan. En cas d'échec, le boss disparaît et doit être réinvoqué."
          },
          {
            title: "Clé de Léviathan",
            tag: "Requis pour le Coffre",
            desc: "Ouvrir le coffre après le boss nécessite une Clé de Léviathan, craftable au moule à clé situé à côté du portail de sortie de l'antre."
          },
          {
            title: "Équipement Cristal 3 & Montures",
            tag: "Butin Bonus",
            desc: "Les coffres offrent un taux accru de Cristal 3 et des montures exclusives : Pair of Whirlygigs (D11), Timminutive (D12) et Colonie de Spores d'Ifera (D13)."
          }
        ]
      },
      bossTiers: {
        step: "03",
        title: "Paliers de Boss Léviathans",
        badge: "4 Rencontres Majeures",
        cards: [
          {
            name: "Lobstroso",
            location: "D11 Topside (Pure Midnight)",
            reqLight: "2 800+ Lumière",
            drop: "Torches de Chitine (250–300 Lumière)",
            desc: "Léviathan d'entrée de gamme. Attaques de mêlée directes et charges rapides."
          },
          {
            name: "Timmense",
            location: "D12 Topside (Uber Twilight)",
            reqLight: "3 800+ Lumière",
            drop: "Torches de Seasinew (500–600 Lumière)",
            desc: "Léviathan intermédiaire. Balaye l'arène avec un rayon laser et invoque des sbires d'ombre."
          },
          {
            name: "Ifera",
            location: "D13 Topside (Mega Dark)",
            reqLight: "4 300+ Lumière",
            drop: "Torches de Tentacules (750–900 Lumière)",
            desc: "Boss ultime de Topside. Invoque des tentacules, des vortex d'aspiration et de violents tourbillons."
          }
        ]
      },
      torchTable: {
        step: "04",
        title: "Stats des Torches & Dégradation",
        badge: "Emplacement Bannière",
        desc: "Les torches s'équipent dans l'emplacement bannière pour fournir le maximum de Lumière. Fabriquer <strong>3 Torches Fragiles en 1 Torche Trempée</strong> prolonge leur durée jusqu'au reset hebdomadaire.",
        headers: ["Nom de la Torche", "Source Boss", "Stat de Lumière", "Durée / Dégradation"],
        rows: [
          { name: "Torche de Chitine Fragile", boss: "Lobstroso (D11)", light: "+250 Lumière", decay: "Reset Quotidien" },
          { name: "Torche de Chitine Trempée", boss: "Craft Sunseeker (3x Fragile)", light: "+300 Lumière", decay: "Reset Hebdomadaire" },
          { name: "Torche de Chitine Antique", boss: "Lobstroso (Perma Rare)", light: "+275 Lumière", decay: "Permanente (Pas de decay)" },
          { name: "Torche de Seasinew Fragile", boss: "Timmense (D12)", light: "+500 Lumière", decay: "Reset Quotidien" },
          { name: "Torche de Seasinew Trempée", boss: "Craft Sunseeker (3x Fragile)", light: "+600 Lumière", decay: "Reset Hebdomadaire" },
          { name: "Torche de Seasinew Enchantée", boss: "Timmense (Perma Rare)", light: "+550 Lumière", decay: "Permanente (Pas de decay)" },
          { name: "Torche de Tentacule Fragile", boss: "Ifera (D13)", light: "+750 Lumière", decay: "Reset Quotidien" },
          { name: "Torche de Tentacule Trempée", boss: "Craft Sunseeker (3x Fragile)", light: "+900 Lumière", decay: "Reset Hebdomadaire" },
          { name: "Torche Enchanbrée d'Ifera", boss: "Ifera (Perma Rare)", light: "+825 Lumière (900 Améliorée)", decay: "Permanente (Améliorable)" }
        ]
      },
      badges: {
        step: "05",
        title: "Maîtrise des Léviathans & Badges",
        badge: "Paliers de Récompenses",
        desc: "Vaincre des Léviathans débloque des badges de compte offrant des potions d'Ego, des Cubits et des couronnes de vanity exclusives.",
        milestones: [
          { kills: "1 Kill", reward: "Badge Bronze + Potion d'Ego + 25 Cubits" },
          { kills: "10 Kills", reward: "Badge Argent + Couronne de Tueur : Lobstroso + 100 Cubits" },
          { kills: "50 Kills", reward: "Badge Or + Potion d'Ego + 250 Cubits" },
          { kills: "100 Kills", reward: "Badge Platine + Couronne de Tueur : Timmense + 350 Cubits" },
          { kills: "250 Kills", reward: "Badge Diamant (Garantie de drop permanent) + 500 Cubits" },
          { kills: "500 Kills", reward: "Badge Obsidienne + Couronne de Tueur : Ifera + 750 Cubits" }
        ]
      }
    }
  },
  es: {
    hero: {
      badge: "Jefes de Geode Topside y Delves",
      title: "Guía de Leviatanes y Antorchas Permanentes",
      description: "Guía completa sobre la caza de Leviatanes en Geode Topside y Delves, mecánicas de cofres, estadísticas de antorchas, crafteo semanal y progreso de insignias."
    },
    sections: {
      overview: {
        step: "01",
        title: "Información General de Leviatanes",
        badge: "Guaridas de Geode Topside",
        desc: "Los Leviatanes son jefes de mundo ubicados en guaridas oscuras en <strong>Geode Topside (D11–D13)</strong> y en <strong>Delves (115+)</strong>. Derrotarlos antes del <strong>tiempo límite de 10 minutos</strong> hace aparecer un cofre de Leviatán con Antorchas, piezas Cristal y monturas exclusivas."
      },
      mechanics: {
        step: "02",
        title: "Combate, Llaves y Cofres",
        badge: "Reglas Clave",
        cards: [
          {
            title: "Límite de 10 Minutos",
            tag: "Calavera Maldita",
            desc: "Al activar la calavera en la guarida, el grupo tiene exactamente 10 minutos para vencer al jefe. Si expira el tiempo, el jefe desaparece y debe reactivarse."
          },
          {
            title: "Llave de Leviatán",
            tag: "Requisito de Cofre",
            desc: "Abrir el cofre tras la victoria requiere una Llave de Leviatán, fabricable en el molde junto al portal de salida de la guarida."
          },
          {
            title: "Equipo Cristal 3 y Monturas",
            tag: "Botín Especial",
            desc: "Los cofres tienen mayor probabilidad de Cristal 3 y monturas raras: Pair of Whirlygigs (D11), Timminutive (D12) y Colonia de Esporas de Ifera (D13)."
          }
        ]
      },
      bossTiers: {
        step: "03",
        title: "Rangos de Jefes Leviatanes",
        badge: "4 Encuentros Mayores",
        cards: [
          {
            name: "Lobstroso",
            location: "D11 Topside (Pure Midnight)",
            reqLight: "2.800+ Luz",
            drop: "Antorchas de Quitina (250–300 Luz)",
            desc: "Leviatán inicial. Ataques cuerpo a cuerpo directos y cargas rápidas."
          },
          {
            name: "Timmense",
            location: "D12 Topside (Uber Twilight)",
            reqLight: "3.800+ Luz",
            drop: "Antorchas de Seasinew (500–600 Luz)",
            desc: "Leviatán intermedio. Dispara un gran rayo láser e invoca esbirros sombríos."
          },
          {
            name: "Ifera",
            location: "D13 Topside (Mega Dark)",
            reqLight: "4.300+ Luz",
            drop: "Antorchas de Tentáculo (750–900 Luz)",
            desc: "Jefe supremo de Topside. Genera tentáculos, vórtices de succión y peligrosos giros."
          }
        ]
      },
      torchTable: {
        step: "04",
        title: "Estadísticas de Antorchas y Duración",
        badge: "Ranura de Estandarte",
        desc: "Las antorchas se equipan en la ranura de estandarte para conseguir la mayor cantidad de Luz. Fabricar <strong>3 Antorchas Frágiles en 1 Templada</strong> extiende su duración hasta el reinicio semanal.",
        headers: ["Nombre de Antorcha", "Fuente de Jefe", "Estadística de Luz", "Duración / Expiración"],
        rows: [
          { name: "Antorcha de Quitina Frágil", boss: "Lobstroso (D11)", light: "+250 Luz", decay: "Reinicio Diario" },
          { name: "Antorcha de Quitina Templada", boss: "Crafteo Sunseeker (3x Frágil)", light: "+300 Luz", decay: "Reinicio Semanal" },
          { name: "Antorcha de Quitina Antigua", boss: "Lobstroso (Perma Rara)", light: "+275 Luz", decay: "Permanente (Sin expiración)" },
          { name: "Antorcha de Seasinew Frágil", boss: "Timmense (D12)", light: "+500 Luz", decay: "Reinicio Diario" },
          { name: "Antorcha de Seasinew Templada", boss: "Crafteo Sunseeker (3x Frágil)", light: "+600 Luz", decay: "Reinicio Semanal" },
          { name: "Antorcha de Seasinew Encantada", boss: "Timmense (Perma Rara)", light: "+550 Luz", decay: "Permanente (Sin expiración)" },
          { name: "Antorcha de Tentáculo Frágil", boss: "Ifera (D13)", light: "+750 Luz", decay: "Reinicio Diario" },
          { name: "Antorcha de Tentáculo Templada", boss: "Crafteo Sunseeker (3x Frágil)", light: "+900 Luz", decay: "Reinicio Semanal" },
          { name: "Antorcha Ensombrecida de Ifera", boss: "Ifera (Perma Rara)", light: "+825 Luz (900 Mejorada)", decay: "Permanente (Mejorable)" }
        ]
      },
      badges: {
        step: "05",
        title: "Maestría de Leviatanes e Insignias",
        badge: "Hitos de Cuenta",
        desc: "Eliminar Leviatanes avanza insignias que otorgan Pociones de Ego, Cubitos y coronas decorativas de asesino.",
        milestones: [
          { kills: "1 Kill", reward: "Insignia Bronce + Poción de Ego + 25 Cubitos" },
          { kills: "10 Kills", reward: "Insignia Plata + Corona de Asesino: Lobstroso + 100 Cubitos" },
          { kills: "50 Kills", reward: "Insignia Oro + Poción de Ego + 250 Cubitos" },
          { kills: "100 Kills", reward: "Insignia Platino + Corona de Asesino: Timmense + 350 Cubitos" },
          { kills: "250 Kills", reward: "Insignia Diamante (Piedad de drop permanente) + 500 Cubitos" },
          { kills: "500 Kills", reward: "Insignia Obsidiana + Corona de Asesino: Ifera + 750 Cubitos" }
        ]
      }
    }
  },
  zh: {
    hero: {
      badge: "晶洞地表与深渊领主",
      title: "利维坦 (Leviathans) 与火炬系统进阶指南",
      description: "全面解析晶洞地表与深渊利维坦机制、开箱与钥匙制作、全火炬具体数值、每周合成升阶及击杀勋章奖励。"
    },
    sections: {
      overview: {
        step: "01",
        title: "利维坦 (Leviathans) 模式总览",
        badge: "晶洞地表专属巢穴",
        desc: "利维坦是栖息在 <strong>晶洞地表 (D11–D13)</strong> 黑暗巢穴及深层 <strong>深入探险 (115+ 层)</strong> 中的巨型世界 Boss。在 <strong>10 分钟限时倒计时</strong> 内击败它们会生成利维坦宝箱，可开出核心火炬战旗、水晶 3 装备以及专属坐骑。"
      },
      mechanics: {
        step: "02",
        title: "战斗机制、钥匙与宝箱系统",
        badge: "核心战斗规则",
        cards: [
          {
            title: "10 分钟限时机制",
            tag: "诅咒头骨",
            desc: "在巢穴内激活诅咒头骨后，全队有 10 分钟时间击败利维坦。若超时 Boss 将直接消失，需重新开启头骨挑战。"
          },
          {
            title: "利维坦钥匙 (Key)",
            tag: "开箱必备",
            desc: "开启战后宝箱需要消耗利维坦钥匙。巢穴内靠近出口传送门处设有万用钥匙模具，可随时现场制作钥匙。"
          },
          {
            title: "水晶 3 阶装备与稀有坐骑",
            tag: "额外珍贵掉落",
            desc: "宝箱大幅提升水晶 3 阶装备掉落率，并极小概率掉落专属坐骑：竹蜻蜓 (D11)、小提姆 (D12) 与伊菲拉孢子群 (D13)。"
          }
        ]
      },
      bossTiers: {
        step: "03",
        title: "利维坦阶级与光能门槛",
        badge: "4 大世界领主",
        cards: [
          {
            name: "龙虾利维坦 (Lobstroso)",
            location: "D11 晶洞地表 (Pure Midnight)",
            reqLight: "2,800+ 光能值",
            drop: "甲壳火炬 (250–300 光能)",
            desc: "入门级利维坦。以近战撞击与直线高速冲锋为主，适合新手组队开荒。"
          },
          {
            name: "巨眼利维坦 (Timmense)",
            location: "D12 晶洞地表 (Uber Twilight)",
            reqLight: "3,800+ 光能值",
            drop: "海肌火炬 (500–600 光能)",
            desc: "中阶利维坦。会释放大范围旋转激光扫射并在场上召唤暗影杂兵。"
          },
          {
            name: "水母利维坦 <br />(Ifera)",
            location: "D13 晶洞地表 (Mega Dark)",
            reqLight: "4,300+ 光能值",
            drop: "触手火炬 (750–900 光能)",
            desc: "地表最强世界 Boss。释放暗影触手、黑洞拉拽以及高伤害旋涡攻击。"
          }
        ]
      },
      torchTable: {
        step: "04",
        title: "全火炬光能数值与过期机制",
        badge: "战旗栏位核心装备",
        desc: "火炬装备于战旗栏位，是终局光能的最核心来源。每日临时火炬会在次日重置，但在前哨站使用 <strong>3 个每日临时火炬可合成为 1 个每周强化火炬</strong>，将有效期延长至每周重置。",
        headers: ["火炬名称", "Boss 掉落来源", "提供光能值", "有效期 / 过期机制"],
        rows: [
          { name: "脆弱甲壳火炬 (Fragile)", boss: "龙虾 Lobstroso (D11)", light: "+250 光能", decay: "每日重置清空" },
          { name: "强化甲壳火炬 (Tempered)", boss: "前哨站合成 (3x 每日)", light: "+300 光能", decay: "每周一重置清空" },
          { name: "远古甲壳火炬 (Ancient)", boss: "龙虾 (极稀有永久)", light: "+275 光能", decay: "永久保留 (永不过期)" },
          { name: "脆弱海肌火炬 (Fragile)", boss: "巨眼 Timmense (D12)", light: "+500 光能", decay: "每日重置清空" },
          { name: "强化海肌火炬 (Tempered)", boss: "前哨站合成 (3x 每日)", light: "+600 光能", decay: "每周一重置清空" },
          { name: "附魔海肌火炬 (Enchanted)", boss: "巨眼 (极稀有永久)", light: "+550 光能", decay: "永久保留 (永不过期)" },
          { name: "脆弱触手火炬 (Fragile)", boss: "水母 Ifera (D13)", light: "+750 光能", decay: "每日重置清空" },
          { name: "强化触手火炬 (Tempered)", boss: "前哨站合成 (3x 每日)", light: "+900 光能", decay: "每周一重置清空" },
          { name: "结影触手火炬 (Enshadowed)", boss: "水母 (极稀有永久)", light: "+825 光能 (升级后 900)", decay: "永久保留 (可升级毕业)" }
        ]
      },
      badges: {
        step: "05",
        title: "利维坦击杀勋章与里程碑",
        badge: "全账号勋章",
        desc: "击杀利维坦可累积全账号击杀勋章，解锁自我药水 (Ego Potions)、古币 (Cubits) 以及专属 Boss 击杀者头冠装扮。",
        milestones: [
          { kills: "1 次击杀", reward: "青铜勋章 + 自我药水 + 25 古币" },
          { kills: "10 次击杀", reward: "白银勋章 + 龙虾击杀者头冠 + 100 古币" },
          { kills: "50 次击杀", reward: "黄金勋章 + 自我药水 + 250 古币" },
          { kills: "100 次击杀", reward: "白金勋章 + 巨眼击杀者头冠 + 350 古币" },
          { kills: "250 次击杀", reward: "钻石勋章 (250 次保底永久火炬掉落) + 500 古币" },
          { kills: "500 次击杀", reward: "黑曜石勋章 + 水母击杀者头冠 + 750 古币" }
        ]
      }
    }
  }
};