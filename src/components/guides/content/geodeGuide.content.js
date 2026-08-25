export const geodeGuideContent = {
  en: {
    hero: {
      badge: "Sunseeker Spire & Hub System",
      title: "Geode Sanctuary & <br />Caving Guide",
      description: "A comprehensive guide to the Sunseeker Spire floors, cavern portal mechanics, Module Forge upgrade priorities, and companion care."
    },
    sections: {
      overview: {
        step: "01",
        title: "Sanctuary Hub & Spire Structure",
        badge: "Sanctuary Map",
        desc: "The Geode Sanctuary is centered around the multi-story Sunseeker Spire, surrounded by an energy barrier inscribed with 'BE THE LIGHT'. It houses all essential workbenches, cavern gates, and crafting facilities."
      },
      spireFloors: {
        step: "02",
        title: "Central Spire Floors & Facilities",
        badge: "Spire Navigation",
        floors: [
          {
            floor: "1st Floor: Mining Facility",
            desc: "The primary expedition hub. Contains the 3 cave portals (Orange: Sunken Sunvault, Green: Verdant Veins, Purple: Moonglow Grotto), Amberine, the Module Forge, and Module Workbench."
          },
          {
            floor: "2nd Floor: Crafter's Commons",
            desc: "The default spawn area. Houses the Geodian Sun Goddess Statue, transit portals, and connectors to the Companion Ranch (East) and Crystallogy Center (West)."
          },
          {
            floor: "3rd Floor: Sunseeker Square",
            desc: "Mid-level hub connecting to the Bomber Royale Blastadium (East) and Reliquary Research Center (West)."
          },
          {
            floor: "4th & 5th Floor: Observation & Landing",
            desc: "Observation deck providing an overview of Geode, and Sunseeker Landing with return shuttles back to Trove."
          }
        ]
      },
      wings: {
        step: "03",
        title: "Specialized Sanctuary Wings",
        badge: "Key Stations",
        cards: [
          {
            name: "Companion Ranch (East 2F)",
            npc: "Sunseeker Gabbro",
            desc: "Features the Egg Incubator, Companion Trainer, and Forever Home Finder to hatch, train, and trade companions for Crystals."
          },
          {
            name: "Crystallogy Center (West 2F)",
            npc: "Sunseeker Lazul",
            desc: "Houses the Crystallogy Workbench and Geodian Workbench for crafting exploration utilities, recipes, and Geode Mastery items."
          },
          {
            name: "Reliquary Research (West 3F)",
            npc: "Sunseeker Th'lan",
            desc: "Contains the Reliquary Revealer and merchant Thundros to purchase, charge in caves, and open resource-packed Reliquaries."
          },
          {
            name: "Bomber Royale (East 3F)",
            npc: "Sunseeker Rowan",
            desc: "PVP combat simulator where players can earn Bomber Royale Coins to trade with the Blastadium Merchant."
          }
        ]
      },
      modules: {
        step: "04",
        title: "Core Geode Modules & Upgrade Priority",
        badge: "Module Forge",
        desc: "Upgrading modules increases cave survivability and resource yields. Prioritize GAS Engine and Omni-Tool first. Click any of the modules to see it's upgrades and quantity of crafting materials.",
        headers: ["Module Name", "Type / Function", "Priority", "Max Rank"],
        rows: [
          {
            name: "Omni-Tool",
            iconUrl: "https://static.wikia.nocookie.net/trove/images/d/d8/Omni-Tool.png/revision/latest?cb=20180525132746",
            type: "A dedicated mining module tailored for harvesting Geodian blocks, emitting a beam that happens to calm local cave dwellers.",
            prio: "Highest (P1)",
            max: "Rank 10",
            upgrades: [
              {
                rank: 2,
                stats: "When N-Charge > 50%, mining strength +50%",
                costs: [
                  { name: "Gleamstone", amount: "60" },
                  { name: "Moonstone", amount: "10" },
                  { name: "Daydrop", amount: "10" },
                  { name: "Dream Dew", amount: "10" },
                  { name: "Crystals", amount: "90" },
                  { name: "Metamatter", amount: "2" },
                ]
              },
              {
                rank: 3,
                stats: "Range +1",
                costs: [
                  { name: "Gleamstone", amount: "100" },
                  { name: "Blazine", amount: "20" },
                  { name: "Geminite", amount: "20" },
                  { name: "Day Drop", amount: "20" },
                  { name: "Crystals", amount: "150" },
                  { name: "Metamatter", amount: "3" },
                ]
              },
              {
                rank: 4,
                stats: "Can mine Builderite, Quirkstone, Chronozine, and Sparkzite.",
                costs: [
                  { name: "Gleamstone", amount: "220" },
                  { name: "Moonstone", amount: "40" },
                  { name: "Cave Birds", amount: "10" },
                  { name: "Blazine", amount: "40" },
                  { name: "Crystals", amount: "320" },
                  { name: "Metamatter", amount: "4" },
                ]
              },
              {
                rank: 5,
                stats: "50% Lasermancy",
                costs: [
                  { name: "Builderite", amount: "430" },
                  { name: "Quirkstone", amount: "70" },
                  { name: "Acrobat Bark", amount: "20" },
                  { name: "Cogwine", amount: "20" },
                  { name: "Crystals", amount: "640" },
                  { name: "Metamatter", amount: "5" },
                ]
              },
              {
                rank: 6,
                stats: "Reduces N-Charge cost by 25%",
                costs: [
                  { name: "Builderite", amount: "590" },
                  { name: "Sparkzite", amount: "90" },
                  { name: "Chronozine", amount: "90" },
                  { name: "Moonlit Moss", amount: "80" },
                  { name: "Crystals", amount: "890" },
                  { name: "Metamatter", amount: "6" },
                ]
              },
              {
                rank: 7,
                stats: "Range +1",
                costs: [
                  { name: "Builderite", amount: "760" },
                  { name: "Queen Trumpets", amount: "30" },
                  { name: "Fireheart Flower", amount: "30" },
                  { name: "Chronozine", amount: "120" },
                  { name: "Crystals", amount: "1140" },
                  { name: "Metamatter", amount: "7" },
                ]
              },
              {
                rank: 8,
                stats: "Can mine Ancient Gears, Lunarium, Mightstone, and Everlight.",
                costs: [
                  { name: "Builderite", amount: "1000" },
                  { name: "Builder's Blossom", amount: "40" },
                  { name: "Sparkzite", amount: "160" },
                  { name: "Wallflowers", amount: "130" },
                  { name: "Crystals", amount: "1500" },
                  { name: "Metamatter", amount: "8" },
                ]
              },
              {
                rank: 9,
                stats: "50% Lasermancy",
                costs: [
                  { name: "Ancient Gears", amount: "780" },
                  { name: "Everlight", amount: "120" },
                  { name: "Queen Trumpets", amount: "30" },
                  { name: "Builder's Blossom", amount: "30" },
                  { name: "Crystals", amount: "1170" },
                  { name: "Metamatter", amount: "9" },
                ]
              },
              {
                rank: 10,
                stats: "Impact Radius +1",
                costs: [
                  { name: "Ancient Gears", amount: "1540" },
                  { name: "Mightstone", amount: "240" },
                  { name: "Wallflowers", amount: "190" },
                  { name: "Lunarium", amount: "240" },
                  { name: "Crystals", amount: "2310" },
                  { name: "Metamatter", amount: "10" },
                ]
              },
              {
              rank: "Total Max ",
              stats: "Total materials required to fully upgrade the module",
              costs: [
                { name: "Crystals", amount: "8210" },
                { name: "Metamatter", amount: "54" },
                { name: "Gleamstone", amount: "380" },
                { name: "Moonstone", amount: "50" },
                { name: "Day Drop", amount: "30" },
                { name: "Dream Dew", amount: "10" },
                { name: "Blazine", amount: "60" },
                { name: "Geminite", amount: "20" },
                { name: "Cave Birds", amount: "10" },
                { name: "Builderite", amount: "2780" },
                { name: "Quirkstone", amount: "70" },
                { name: "Acrobat Bark", amount: "20" },
                { name: "Cogwine", amount: "20" },
                { name: "Sparkzite", amount: "250" },
                { name: "Chronozine", amount: "210" },
                { name: "Moonlit Moss", amount: "80" },
                { name: "Queen Trumpets", amount: "60" },
                { name: "Fireheart Flower", amount: "30" },
                { name: "Builder's Blossom", amount: "70" },
                { name: "Wallflowers", amount: "320" },
                { name: "Ancient Gears", amount: "2320" },
                { name: "Everlight", amount: "120" },
                { name: "Mightstone", amount: "240" },
                { name: "Lunarium", amount: "240" },
              ]
            }
            ]
          },
          {
            name: "GAS Engine",
            iconUrl: "https://static.wikia.nocookie.net/trove/images/7/71/GAS.png/revision/latest?cb=20180525132742",
            type: "The cave suit’s life-support acclimation system that gradually depletes over time. Upgrade it to survive longer expeditions and reach deeper cavern tiers.",
            prio: "Highest (P1)",
            max: "Rank 10",
            upgrades: [
              {
                rank: 2,
                stats: "Significantly reduces GAS drain in Tier 2",
                costs: [
                  { name: "GAS Enhancer", amount: "1" },
                  { name: "Blazine", amount: "30" },
                  { name: "Moonlight", amount: "30" },
                  { name: "Geminite", amount: "30" },
                  { name: "Crystals", amount: "290" },
                  { name: "Metamatter", amount: "2" },
                ]
              },
              {
                rank: 3,
                stats: "Reduce gas consumption in Tier 1 by 25%",
                costs: [
                  { name: "Gas Enhancer", amount: "1" },
                  { name: "Gleamstone", amount: "220" },
                  { name: "Cave Birds", amount: "10" },
                  { name: "Cave Kelp", amount: "10" },
                  { name: "Crystals", amount: "320" },
                  { name: "Metamatter", amount: "3" },
                ]
              },
              {
                rank: 4,
                stats: "Significantly reduces GAS drain in Tier 3",
                costs: [
                  { name: "GAS Enhancer", amount: "1" },
                  { name: "Gleamstone", amount: "290" },
                  { name: "Sun Sap", amount: "20" },
                  { name: "Cogwine", amount: "20" },
                  { name: "Crystals", amount: "430" },
                  { name: "Metamatter", amount: "4" },
                ]
              },
              {
                rank: 5,
                stats: "Reduce gas consumption in Tier 1 by 50% total. Reduce Tier 2 by 25%",
                costs: [
                  { name: "Builderite", amount: "680" },
                  { name: "Quirkstone", amount: "110" },
                  { name: "Sparkzite", amount: "110" },
                  { name: "Moonlit Moss", amount: "90" },
                  { name: "Crystals", amount: "1010" },
                  { name: "Metamatter", amount: "5" },
                ]
              },
              {
                rank: 6,
                stats: "Significantly reduces GAS drain in Tier 4",
                costs: [
                  { name: "Builderite", amount: "850" },
                  { name: "Acrobat Bark", amount: "40" },
                  { name: "Cave Birds", amount: "40" },
                  { name: "Chronozie", amount: "130" },
                  { name: "Crystals", amount: "890" },
                  { name: "Metamatter", amount: "6" },
                ]
              },
              {
                rank: 7,
                stats: "Reduce gas consumption in Tier 2 by 50% total. Reduce Tier 3 by 25%",
                costs: [
                  { name: "Builderite", amount: "1260" },
                  { name: "Queen Trumpets", amount: "50" },
                  { name: "Fireheart Flower", amount: "50" },
                  { name: "Cogwine", amount: "50" },
                  { name: "Crystals", amount: "1890" },
                  { name: "Metamatter", amount: "7" },
                ]
              },
              {
                rank: 8,
                stats: "Significantly reduces GAS drain in Tier 5",
                costs: [
                  { name: "Builderite", amount: "1510" },
                  { name: "Wallflowers", amount: "190" },
                  { name: "Sparkzite", amount: "230" },
                  { name: "Builder's Blossom", amount: "60" },
                  { name: "Crystals", amount: "2270" },
                  { name: "Metamatter", amount: "8" },
                ]
              },
              {
                rank: 9,
                stats: "Reduce gas consumption in Tier 3 by 50% total. Reduce Tier 4 by 25%",
                costs: [
                  { name: "Ancient Gears", amount: "1850" },
                  { name: "Lunarium", amount: "280" },
                  { name: "Everlight", amount: "280" },
                  { name: "Wallflowers", amount: "230" },
                  { name: "Crystals", amount: "2270" },
                  { name: "Metamatter", amount: "9" },
                ]
              },
              {
                rank: 10,
                stats: "300 Max G.A.S.",
                costs: [
                  { name: "Ancient Gears", amount: "2150" },
                  { name: "Queen Trumpets", amount: "90" },
                  { name: "Fireheart Flower", amount: "90" },
                  { name: "Mightstone", amount: "330" },
                  { name: "Crystals", amount: "3230" },
                  { name: "Metamatter", amount: "10" },
                ]
              },
              {
              rank: "Total Max ",
              stats: "Total materials required to fully upgrade the module",
              costs: [
                { name: "GAS Enhancer", amount: "3" },
                { name: "Crystals", amount: "7740" },
                { name: "Metamatter", amount: "54" },
                { name: "Blazine", amount: "30" },
                { name: "Moonstone", amount: "30" },
                { name: "Geminite", amount: "30" },
                { name: "Gleamstone", amount: "510" },
                { name: "Cave Birds", amount: "50" },
                { name: "Cave Kelp", amount: "10" },
                { name: "Sun Sap", amount: "20" },
                { name: "Cogwine", amount: "70" },
                { name: "Builderite", amount: "4300" },
                { name: "Quirkstone", amount: "110" },
                { name: "Sparkzite", amount: "340" },
                { name: "Moonlit Moss", amount: "90" },
                { name: "Acrobat Bark", amount: "40" },
                { name: "Chronozine", amount: "130" },
                { name: "Queen Trumpets", amount: "140" },
                { name: "Fireheart Flower", amount: "140" },
                { name: "Wallflowers", amount: "420" },
                { name: "Builder's Blossom", amount: "60" },
                { name: "Ancient Gears", amount: "4000" },
                { name: "Moonlight", amount: "280" },
                { name: "Everlight", amount: "280" },
                { name: "Mightstone", amount: "330" },
              ]
            }
        ]
          },
          {
            name: "Rocket Boots",
            iconUrl: "https://static.wikia.nocookie.net/trove/images/2/2b/Rocket_Boots.png/revision/latest?cb=20180525132748",
            type: "Delivers standard jetpack-style propulsion, just with significantly more style.",
            prio: "High (P2)",
            max: "Rank 10",
            upgrades: [
              {
                rank: 2,
                stats: "Increase horizontal acceleration and speed by 15%",
                costs: [
                  { name: "Gleamstone", amount: "180" },
                  { name: "Acrobat Bark", amount: "10" },
                  { name: "Moonstone", amount: "30" },
                  { name: "Day Drop", amount: "30" },
                  { name: "Crystals", amount: "270" },
                  { name: "Metamatter", amount: "2" },
                ]
              },
              {
                rank: 3,
                stats: "Increase mining speed by 50% while boots are active",
                costs: [
                  { name: "Gleamstone", amount: "250" },
                  { name: "Cave Birds", amount: "10" },
                  { name: "Cave Kelp", amount: "10" },
                  { name: "Moonlit Moss", amount: "40" },
                  { name: "Crystals", amount: "510" },
                  { name: "Metamatter", amount: "3" },
                ]
              },
              {
                rank: 4,
                stats: "Halves N-Charge cost in Tier 1 of caves",
                costs: [
                  { name: "Gleamstone", amount: "510" },
                  { name: "Quirkstone", amount: "80" },
                  { name: "Sparkzite", amount: "80" },
                  { name: "Sun Sap", amount: "20" },
                  { name: "Crystals", amount: "760" },
                  { name: "Metamatter", amount: "4" },
                ]
              },
              {
                rank: 5,
                stats: "Increase horizontal acceleration and speed by 15%",
                costs: [
                  { name: "Builderite", amount: "380" },
                  { name: "Chronozine", amount: "60" },
                  { name: "Queen Trumpets", amount: "20" },
                  { name: "Wallflowers", amount: "50" },
                  { name: "Crystals", amount: "560" },
                  { name: "Metamatter", amount: "5" },
                ]
              },
              {
                rank: 6,
                stats: "No longer take falling damage",
                costs: [
                  { name: "Builderite", amount: "630" },
                  { name: "Fireheart Flower", amount: "30" },
                  { name: "Cogwine", amount: "30" },
                  { name: "Sparkzite", amount: "100" },
                  { name: "Crystals", amount: "950" },
                  { name: "Metamatter", amount: "6" },
                ]
              },
              {
                rank: 7,
                stats: "Halves N-Charge cost in Tier 2 of caves",
                costs: [
                  { name: "Builderite", amount: "1260" },
                  { name: "Builder's Blossom", amount: "50" },
                  { name: "Sparkzite", amount: "200" },
                  { name: "Quirkstone", amount: "200" },
                  { name: "Crystals", amount: "1890" },
                  { name: "Metamatter", amount: "7" },
                ]
              },
              {
                rank: 8,
                stats: "Increase horizontal acceleration and speed by 15%",
                costs: [
                  { name: "Ancient Gears", amount: "480" },
                  { name: "Lunarium", amount: "80" },
                  { name: "Quirkstone", amount: "80" },
                  { name: "Wallflowers", amount: "60" },
                  { name: "Crystals", amount: "710" },
                  { name: "Metamatter", amount: "8" },
                ]
              },
              {
                rank: 9,
                stats: "Increase mining speed by 50% while boots are active",
                costs: [
                  { name: "Ancient Gears", amount: "780" },
                  { name: "Everlight", amount: "120" },
                  { name: "Fireheart Flower", amount: "30" },
                  { name: "Queen Trumpets", amount: "30" },
                  { name: "Crystals", amount: "1170" },
                  { name: "Metamatter", amount: "9" },
                ]
              },
              {
                rank: 10,
                stats: "Halves N-Charge cost in Tier 3 of caves",
                costs: [
                  { name: "Ancient Gears", amount: "1540" },
                  { name: "Mightstone", amount: "240" },
                  { name: "Builder's Blossom", amount: "60" },
                  { name: "Wallflowers", amount: "190" },
                  { name: "Crystals", amount: "2310" },
                  { name: "Metamatter", amount: "10" },
                ]
              },
              {
              rank: "Total Max ",
              stats: "Total materials required to fully upgrade the module",
              costs: [
                { name: "Crystals", amount: "9000" },
                { name: "Metamatter", amount: "54" },
                { name: "Gleamstone", amount: "940" },
                { name: "Acrobat Bark", amount: "10" },
                { name: "Moonstone", amount: "30" },
                { name: "Day Drop", amount: "30" },
                { name: "Cave Birds", amount: "10" },
                { name: "Cave Kelp", amount: "10" },
                { name: "Moonlit Moss", amount: "40" },
                { name: "Quirkstone", amount: "360" },
                { name: "Sparkzite", amount: "380" },
                { name: "Sun Sap", amount: "20" },
                { name: "Builderite", amount: "2270" },
                { name: "Chronozine", amount: "60" },
                { name: "Queen Trumpets", amount: "50" },
                { name: "Wallflowers", amount: "300" },
                { name: "Fireheart Flower", amount: "60" },
                { name: "Cogwine", amount: "30" },
                { name: "Builder's Blossom", amount: "110" },
                { name: "Ancient Gears", amount: "2800" },
                { name: "Lunarium", amount: "80" },
                { name: "Everlight", amount: "120" },
                { name: "Mightstone", amount: "240" },
              ]
            }
            ]
          },
          {
            name: "Climbing Claw",
            iconUrl: "https://static.wikia.nocookie.net/trove/images/5/5d/Climbing_Claw.png/revision/latest/scale-to-width-down/200?cb=20180525132740",
            type: "A grappling hook that pulls you toward any targeted spot in range, while also doubling as a tool to shove cave creatures out of your way.",
            prio: "High (P2)",
            max: "Rank 10",
            upgrades: [
              {
                rank: 2,
                stats: "Can now stun critters in Tier 1 and 2",
                costs: [
                  { name: "Gleamstone", amount: "60" },
                  { name: "Moonstone", amount: "10" },
                  { name: "Day Drop", amount: "10" },
                  { name: "Dream Dew", amount: "10" },
                  { name: "Crystals", amount: "90" },
                  { name: "Metamatter", amount: "2" },
                ]
              },
              {
                rank: 3,
                stats: "Range +5",
                costs: [
                  { name: "Gleamstone", amount: "100" },
                  { name: "Blazine", amount: "20" },
                  { name: "Geminite", amount: "20" },
                  { name: "Day Drop", amount: "20" },
                  { name: "Crystals", amount: "150" },
                  { name: "Metamatter", amount: "3" },
                ]
              },
              {
                rank: 4,
                stats: "Gain 6 N-Charge/sec while reeling in grapple",
                costs: [
                  { name: "Gleamstone", amount: "150" },
                  { name: "Moonstone", amount: "30" },
                  { name: "Cave Birds", amount: "10" },
                  { name: "Blazine", amount: "30" },
                  { name: "Crystals", amount: "220" },
                  { name: "Metamatter", amount: "4" },
                ]
              },
              {
                rank: 5,
                stats: "Every 6 crystals collected make your next Climbing Claw cost no N-Charge",
                costs: [
                  { name: "Builderite", amount: "430" },
                  { name: "Quirkstone", amount: "70" },
                  { name: "Acrobat Bark", amount: "20" },
                  { name: "Cogwine", amount: "20" },
                  { name: "Crystals", amount: "640" },
                  { name: "Metamatter", amount: "5" },
                ]
              },
              {
                rank: 6,
                stats: "Can now stun critters in Tier 3 and 4",
                costs: [
                  { name: "Builderite", amount: "590" },
                  { name: "Sparkzite", amount: "90" },
                  { name: "Chronozine", amount: "90" },
                  { name: "Moonlit Moss", amount: "80" },
                  { name: "Crystals", amount: "890" },
                  { name: "Metamatter", amount: "6" },
                ]
              },
              {
                rank: 7,
                stats: "Range +5",
                costs: [
                  { name: "Builderite", amount: "500" },
                  { name: "Queen Trumpets", amount: "20" },
                  { name: "Fireheart Flower", amount: "20" },
                  { name: "Chronozine", amount: "80" },
                  { name: "Crystals", amount: "750" },
                  { name: "Metamatter", amount: "7" },
                ]
              },
              {
                rank: 8,
                stats: "Gain 12 N-Charge/sec while reeling in grapple",
                costs: [
                  { name: "Ancient Gears", amount: "780" },
                  { name: "Lunarium", amount: "80" },
                  { name: "Builder's Blossom", amount: "20" },
                  { name: "Wallflowers", amount: "60" },
                  { name: "Crystals", amount: "710" },
                  { name: "Metamatter", amount: "8" },
                ]
              },
              {
                rank: 9,
                stats: "Every 3 crystals collected make your next Climbing Claw cost no N-Charge",
                costs: [
                  { name: "Ancient Gears", amount: "780" },
                  { name: "Everlight", amount: "120" },
                  { name: "Queen Trumpets", amount: "30" },
                  { name: "Builder's Blossom", amount: "30" },
                  { name: "Crystals", amount: "1170" },
                  { name: "Metamatter", amount: "9" },
                ]
              },
              {
                rank: 10,
                stats: "Can now stun critters in Tier 5",
                costs: [
                  { name: "Ancient Gears", amount: "930" },
                  { name: "Mightstone", amount: "140" },
                  { name: "Wallflowers", amount: "120" },
                  { name: "Lunarium", amount: "140" },
                  { name: "Crystals", amount: "1390" },
                  { name: "Metamatter", amount: "10" },
                ]
              },
              {
              rank: "Total Max ",
              stats: "Total materials required to fully upgrade the module",
              costs: [
                { name: "Crystals", amount: "7740" },
                { name: "Metamatter", amount: "54" },
                { name: "Gleamstone", amount: "1020" },
                { name: "Quirkstone", amount: "90" },
                { name: "Moonlit Moss", amount: "130" },
                { name: "Geminite", amount: "30" },
                { name: "Sparkzite", amount: "180" },
                { name: "Cave Birds", amount: "20" },
                { name: "Acrobat Bark", amount: "20" },
                { name: "Chronozine", amount: "240" },
                { name: "Day Drop", amount: "70" },
                { name: "Cogwine", amount: "20" },
                { name: "Builderite", amount: "1770" },
                { name: "Queen Trumpets", amount: "80" },
                { name: "Fireheart Flower", amount: "50" },
                { name: "Builder's Blossom", amount: "60" },
                { name: "Ancient Gears", amount: "2190" },
                { name: "Lunarium", amount: "220" },
                { name: "Wallflowers", amount: "60" },
                { name: "Everlight", amount: "260" },
                { name: "Mightstone", amount: "140" },
              ]
            }
        ]

          },
          {
            name: "N-Charge",
            iconUrl: "https://static.wikia.nocookie.net/trove/images/4/4f/N-Charge.png/revision/latest/scale-to-width-down/200?cb=20180525132745",
            type: "The primary power supply that energizes most active modules installed on your Geodian exploration suit.",
            prio: "Medium (P3)",
            max: "Rank 10",
            upgrades: [
              {
                rank: 2,
                stats: "10 Maximum N-Charge",
                costs: [
                  { name: "Gleamstone", amount: "80" },
                  { name: "Blazine", amount: "20" },
                  { name: "Sun Sap", amount: "10" },
                  { name: "Sun Drop", amount: "10" },
                  { name: "Crystals", amount: "120" },
                  { name: "Metamatter", amount: "2" },
                ]
              },
              {
                rank: 3,
                stats: "10 N-Charge Regen",
                costs: [
                  { name: "Gleamstone", amount: "110" },
                  { name: "Blazine", amount: "20" },
                  { name: "Cave Kelp", amount: "10" },
                  { name: "Acrobat Bark", amount: "10" },
                  { name: "Crystals", amount: "160" },
                  { name: "Metamatter", amount: "3" },
                ]
              },
              {
                rank: 4,
                stats: "Collecting crystals gives 10 N-Charge",
                costs: [
                  { name: "Gleamstone", amount: "180" },
                  { name: "Blazine", amount: "30" },
                  { name: "Cave Birds", amount: "10" },
                  { name: "Cogwine", amount: "10" },
                  { name: "Crystals", amount: "270" },
                  { name: "Metamatter", amount: "4" },
                ]
              },
              {
                rank: 5,
                stats: "While gas is below 100, recharge N-Charge 50% faster",
                costs: [
                  { name: "Builderite", amount: "340" },
                  { name: "Sparkzite", amount: "60" },
                  { name: "Cave Birds", amount: "20" },
                  { name: "Moonlit Moss", amount: "50" },
                  { name: "Crystals", amount: "510" },
                  { name: "Metamatter", amount: "5" },
                ]
              },
              {
                rank: 6,
                stats: "10 Maximum N-Charge",
                costs: [
                  { name: "Builderite", amount: "380" },
                  { name: "Sparkzite", amount: "60" },
                  { name: "Chronozine", amount: "60" },
                  { name: "Queen Trumpets", amount: "20" },
                  { name: "Crystals", amount: "560" },
                  { name: "Metamatter", amount: "6" },
                ]
              },
              {
                rank: 7,
                stats: "10 N-Charge Regen",
                costs: [
                  { name: "Builderite", amount: "630" },
                  { name: "Sparkzite", amount: "100" },
                  { name: "Fireheart Flower", amount: "30" },
                  { name: "Builder's Blossom", amount: "30" },
                  { name: "Crystals", amount: "950" },
                  { name: "Metamatter", amount: "7" },
                ]
              },
              {
                rank: 8,
                stats: "10 Maximum N-Charge",
                costs: [
                  { name: "Ancient Gears", amount: "480" },
                  { name: "Sparkzite", amount: "80" },
                  { name: "Lunarium", amount: "80" },
                  { name: "Wallflowers", amount: "60" },
                  { name: "Crystals", amount: "710" },
                  { name: "Metamatter", amount: "8" },
                ]
              },
              {
                rank: 9,
                stats: "Collecting crystals gives 20 N-Charge",
                costs: [
                  { name: "Ancient Gears", amount: "780" },
                  { name: "Everlight", amount: "120" },
                  { name: "Fireheart Flower", amount: "30" },
                  { name: "Queen Trumpets", amount: "30" },
                  { name: "Crystals", amount: "1170" },
                  { name: "Metamatter", amount: "9" },
                ]
              },
              {
                rank: 10,
                stats: "20 Maximum N-Charge",
                costs: [
                  { name: "Ancient Gears", amount: "1540" },
                  { name: "Everlight", amount: "240" },
                  { name: "Builder's Blossom", amount: "60" },
                  { name: "Mightstone", amount: "240" },
                  { name: "Crystals", amount: "2310" },
                  { name: "Metamatter", amount: "10" },
                ]
              },
              {
              rank: "Total Max ",
              stats: "Total materials required to fully upgrade the module",
              costs: [
                { name: "Crystals", amount: "6740" },
                { name: "Metamatter", amount: "54" },
                { name: "Gleamstone", amount: "370" },
                { name: "Blazine", amount: "70" },
                { name: "Sun Sap", amount: "10" },
                { name: "Day Drop", amount: "10" },
                { name: "Cave Kelp", amount: "10" },
                { name: "Acrobat Bark", amount: "10" },
                { name: "Cave Birds", amount: "30" },
                { name: "Cogwine", amount: "10" },
                { name: "Builderite", amount: "1350" },
                { name: "Sparkzite", amount: "300" },
                { name: "Moonlit Moss", amount: "50" },
                { name: "Chronozine", amount: "60" },
                { name: "Queen Trumpets", amount: "50" },
                { name: "Fireheart Flower", amount: "60" },
                { name: "Builder's Blossom", amount: "90" },
                { name: "Ancient Gears", amount: "2800" },
                { name: "Lunarium", amount: "80" },
                { name: "Wallflowers", amount: "60" },
                { name: "Everlight", amount: "360" },
                { name: "Mightstone", amount: "240" },
              ]
            }
        ]
          },
          {
            name: "Barrier Generator",
            iconUrl: "https://static.wikia.nocookie.net/trove/images/d/d8/Barrier_Generator.png/revision/latest/scale-to-width-down/200?cb=20180525132739",
            type: "Deploys a protective energy shield that blocks incoming projectiles, stuns aggressive mobs, and grants a passive movement speed boost while active.",
            prio: "Medium (P3)",
            max: "Rank 10",
            upgrades: [
              {
                rank: 2,
                stats: "Stun critters in Tier 1 and 2 of caves",
                costs: [
                  { name: "Gleamstone", amount: "150" },
                  { name: "Cave Birds", amount: "10" },
                  { name: "Dream Dew", amount: "10" },
                  { name: "Blazine", amount: "30" },
                  { name: "Crystals", amount: "220" },
                  { name: "Metamatter", amount: "2" },
                ]
              },
              {
                rank: 3,
                stats: "Move 30% faster while active",
                costs: [
                  { name: "Gleamstone", amount: "250" },
                  { name: "Quirkstone", amount: "40" },
                  { name: "Geminite", amount: "40" },
                  { name: "Moonlit Miss", amount: "40" },
                  { name: "Crystals", amount: "380" },
                  { name: "Metamatter", amount: "3" },
                ]
              },
              {
                rank: 4,
                stats: "Gain 5 N-Charge each time you are hit while active",
                costs: [
                  { name: "Gleamstone", amount: "430" },
                  { name: "Chronozine", amount: "70" },
                  { name: "Sparkzite", amount: "70" },
                  { name: "Acrobat Bark", amount: "20" },
                  { name: "Crystals", amount: "640" },
                  { name: "Metamatter", amount: "4" },
                ]
              },
              {
                rank: 5,
                stats: "Stun critters in Tier 3 and 4 of caves",
                costs: [
                  { name: "Builderite", amount: "380" },
                  { name: "Queen Trumpets", amount: "20" },
                  { name: "Quirkstone", amount: "60" },
                  { name: "Cogwine", amount: "20" },
                  { name: "Crystals", amount: "560" },
                  { name: "Metamatter", amount: "5" },
                ]
              },
              {
                rank: 6,
                stats: "Reduce N-Charge cost to 40",
                costs: [
                  { name: "Builderite", amount: "630" },
                  { name: "Fireheart Flower", amount: "30" },
                  { name: "Wallflowers", amount: "80" },
                  { name: "Quirkstone", amount: "100" },
                  { name: "Crystals", amount: "950" },
                  { name: "Metamatter", amount: "6" },
                ]
              },
              {
                rank: 7,
                stats: "Move 60% Faster while active",
                costs: [
                  { name: "Builderite", amount: "760" },
                  { name: "Builder's Blossom", amount: "30" },
                  { name: "Queen Trumpets", amount: "30" },
                  { name: "Sparkzite", amount: "120" },
                  { name: "Crystals", amount: "1140" },
                  { name: "Metamatter", amount: "7" },
                ]
              },
              {
                rank: 8,
                stats: "Stun critters in Tier 5 caves",
                costs: [
                  { name: "Ancient Gears", amount: "480" },
                  { name: "Lunarium", amount: "80" },
                  { name: "Fireheart Flower", amount: "20" },
                  { name: "Wallflowers", amount: "60" },
                  { name: "Crystals", amount: "710" },
                  { name: "Metamatter", amount: "8" },
                ]
              },
              {
                rank: 9,
                stats: "Gain 10 total N-Charge each time you are hit while active",
                costs: [
                  { name: "Ancient Gears", amount: "780" },
                  { name: "Everlight", amount: "120" },
                  { name: "Queen Trumpets", amount: "30" },
                  { name: "Builder's Blossom", amount: "30" },
                  { name: "Crystals", amount: "1170" },
                  { name: "Metamatter", amount: "9" },
                ]
              },
              {
                rank: 10,
                stats: "Reduce N-Charge cost to 20",
                costs: [
                  { name: "Ancient Gears", amount: "930" },
                  { name: "Mightstone", amount: "140" },
                  { name: "Everlight", amount: "140" },
                  { name: "Lunarium", amount: "140" },
                  { name: "Crystals", amount: "1390" },
                  { name: "Metamatter", amount: "10" },
                ]
              },
              {
              rank: "Total Max ",
              stats: "Total materials required to fully upgrade the module",
              costs: [
                { name: "Crystals", amount: "7160" },
                { name: "Metamatter", amount: "54" },
                { name: "Gleamstone", amount: "830" },
                { name: "Cabe Birds", amount: "10" },
                { name: "Dream Dew", amount: "10" },
                { name: "Blazine", amount: "30" },
                { name: "Quirkstone", amount: "200" },
                { name: "Geminite", amount: "40" },
                { name: "Moonlit Miss", amount: "40" },
                { name: "Chronozine", amount: "70" },
                { name: "Sparkzite", amount: "190" },
                { name: "Acrobat Bark", amount: "20" },
                { name: "Builderite", amount: "1770" },
                { name: "Queen Trumpets", amount: "80" },
                { name: "Cogwine", amount: "20" },
                { name: "Fireheart Flower", amount: "50" },
                { name: "Wallflowrs", amount: "140" },
                { name: "Builder's Blossom", amount: "60" },
                { name: "Ancient Gears", amount: "2190" },
                { name: "Lunarium", amount: "220" },
                { name: "Everlight", amount: "260" },
                { name: "Mightstone", amount: "140" },
              ]
            }
            ]
          },
          {
            name: "Pathpainter",
            iconUrl: "https://static.wikia.nocookie.net/trove/images/7/73/Pathpainter.png/revision/latest/scale-to-width-down/200?cb=20180525132747",
            type: "Converts the ground beneath your feet into speed-boosting tracks that can be utilized by any player.",
            prio: "Utility (P4)",
            max: "Rank 10",
            upgrades: [
              {
                rank: 2,
                stats: "Boosted jump Height +25%",
                costs: [
                  { name: "Gleamstone", amount: "170" },
                  { name: "Quirkstone", amount: "30" },
                  { name: "Moonlit Moss", amount: "30" },
                  { name: "Geminite", amount: "30" },
                  { name: "Crystals", amount: "250" },
                  { name: "Metamatter", amount: "2" },
                ]
              },
              {
                rank: 3,
                stats: "Boosted movement speed +40%",
                costs: [
                  { name: "Gleamstone", amount: "340" },
                  { name: "Sparkzite", amount: "60" },
                  { name: "Cave Birds", amount: "20" },
                  { name: "Acrobat Ark", amount: "20" },
                  { name: "Crystals", amount: "510" },
                  { name: "Metamatter", amount: "3" },
                ]
              },
              {
                rank: 4,
                stats: "Reduce cooldown by 5 seconds",
                costs: [
                  { name: "Gleamstone", amount: "510" },
                  { name: "Chronozine", amount: "80" },
                  { name: "Day Drop", amount: "70" },
                  { name: "Cogwine", amount: "20" },
                  { name: "Crystals", amount: "760" },
                  { name: "Metamatter", amount: "4" },
                ]
              },
              {
                rank: 5,
                stats: "Boost durration increased by 2 seconds",
                costs: [
                  { name: "Builderite", amount: "380" },
                  { name: "Queen Trumpets", amount: "20" },
                  { name: "Quirkstone", amount: "60" },
                  { name: "Chronozine", amount: "60" },
                  { name: "Crystals", amount: "560" },
                  { name: "Metamatter", amount: "5" },
                ]
              },
              {
                rank: 6,
                stats: "Reduce N-Charge cost to 50",
                costs: [
                  { name: "Builderite", amount: "630" },
                  { name: "Fireheart Flower", amount: "30" },
                  { name: "Chronozine", amount: "100" },
                  { name: "Queen Trumpets", amount: "30" },
                  { name: "Crystals", amount: "950" },
                  { name: "Metamatter", amount: "6" },
                ]
              },
              {
                rank: 7,
                stats: "Boost gives 2 N-Charge per second",
                costs: [
                  { name: "Builderite", amount: "760" },
                  { name: "Builder's Blossom", amount: "30" },
                  { name: "Moonlit Moss", amount: "100" },
                  { name: "Sparkzite", amount: "120" },
                  { name: "Crystals", amount: "1140" },
                  { name: "Metamatter", amount: "7" },
                ]
              },
              {
                rank: 8,
                stats: "Boosted jump height +50% total",
                costs: [
                  { name: "Ancient Gears", amount: "480" },
                  { name: "Lunarium", amount: "80" },
                  { name: "Fireheart Flower", amount: "20" },
                  { name: "Wallflowers", amount: "60" },
                  { name: "Crystals", amount: "710" },
                  { name: "Metamatter", amount: "8" },
                ]
              },
              {
                rank: 9,
                stats: "Boosted movement speed +60% total",
                costs: [
                  { name: "Ancient Gears", amount: "780" },
                  { name: "Everlight", amount: "120" },
                  { name: "Queen Trumpets", amount: "30" },
                  { name: "Builder's Blossom", amount: "30" },
                  { name: "Crystals", amount: "1170" },
                  { name: "Metamatter", amount: "9" },
                ]
              },
              {
                rank: 10,
                stats: "No longer generate agro while boost is active",
                costs: [
                  { name: "Ancient Gears", amount: "930" },
                  { name: "Mightstone", amount: "140" },
                  { name: "Everlight", amount: "140" },
                  { name: "Lunarium", amount: "140" },
                  { name: "Crystals", amount: "1170" },
                  { name: "Metamatter", amount: "10" },
                ]
              },
              {
              rank: "Total Max ",
              stats: "Total materials required to fully upgrade the module",
              costs: [
                { name: "Crystals", amount: "7740" },
                { name: "Metamatter", amount: "54" },
                { name: "Gleamstone", amount: "1020" },
                { name: "Quirkstone", amount: "90" },
                { name: "Moonlit Moss", amount: "130" },
                { name: "Geminite", amount: "30" },
                { name: "Sparkzite", amount: "180" },
                { name: "Cave Birds", amount: "20" },
                { name: "Acrobat Bark", amount: "20" },
                { name: "Chronozine", amount: "240" },
                { name: "Day Drop", amount: "70" },
                { name: "Cogwine", amount: "20" },
                { name: "Builderite", amount: "1770" },
                { name: "Queen Trumpets", amount: "80" },
                { name: "Fireheart Flower", amount: "50" },
                { name: "Builder's Blossom", amount: "60" },
                { name: "Ancient Gears", amount: "2190" },
                { name: "Lunarium", amount: "220" },
                { name: "Wallflowers", amount: "60" },
                { name: "Everlight", amount: "260" },
                { name: "Mightstone", amount: "140" },
              ]
            }
            ]
          },
          {
            name: "Thumper",
            iconUrl: "https://static.wikia.nocookie.net/trove/images/8/81/Thumper.png/revision/latest?cb=20180525132749",
            type: "Emits acoustic shockwaves through the terrain to pinpoint buried ore deposits such as ancient gears or bardium and uncover concealed crystals.",
            prio: "Utility (P4)",
            max: "Rank 10",
            upgrades: [
              {
                rank: 2,
                stats: "Increases radius by 25%",
                costs: [
                  { name: "Gleamstone", amount: "80" },
                  { name: "Blazine", amount: "20" },
                  { name: "Sun Sap", amount: "10" },
                  { name: "Sun Drop", amount: "10" },
                  { name: "Crystals", amount: "120" },
                  { name: "Metamatter", amount: "2" },
                ]
              },
              {
                rank: 3,
                stats: "Reveals Tier 2-3 resources",
                costs: [
                  { name: "Gleamstone", amount: "110" },
                  { name: "Blazine", amount: "20" },
                  { name: "Cave Kelp", amount: "10" },
                  { name: "Acrobat Bark", amount: "10" },
                  { name: "Crystals", amount: "160" },
                  { name: "Metamatter", amount: "3" },
                ]
              },
              {
                rank: 4,
                stats: "Anyone in range gains +15% mining speed",
                costs: [
                  { name: "Gleamstone", amount: "180" },
                  { name: "Blazine", amount: "30" },
                  { name: "Cave Birds", amount: "10" },
                  { name: "Cogwine", amount: "10" },
                  { name: "Crystals", amount: "270" },
                  { name: "Metamatter", amount: "4" },
                ]
              },
              {
                rank: 5,
                stats: "Increase duration by 50%",
                costs: [
                  { name: "Builderite", amount: "340" },
                  { name: "Sparkzite", amount: "60" },
                  { name: "Cave Birds", amount: "20" },
                  { name: "Moonlit Moss", amount: "50" },
                  { name: "Crystals", amount: "510" },
                  { name: "Metamatter", amount: "5" },
                ]
              },
              {
                rank: 6,
                stats: "Reveals Tier 4-5 resources",
                costs: [
                  { name: "Builderite", amount: "380" },
                  { name: "Sparkzite", amount: "60" },
                  { name: "Chronozine", amount: "60" },
                  { name: "Queen Trumpets", amount: "20" },
                  { name: "Crystals", amount: "560" },
                  { name: "Metamatter", amount: "6" },
                ]
              },
              {
                rank: 7,
                stats: "Increases radius by 50%",
                costs: [
                  { name: "Builderite", amount: "630" },
                  { name: "Sparkzite", amount: "100" },
                  { name: "Fireheart Flower", amount: "30" },
                  { name: "Builder's Blossom", amount: "30" },
                  { name: "Crystals", amount: "950" },
                  { name: "Metamatter", amount: "7" },
                ]
              },
              {
                rank: 8,
                stats: "Anyone in range gains +30% total mining speed",
                costs: [
                  { name: "Ancient Gears", amount: "480" },
                  { name: "Sparkzite", amount: "80" },
                  { name: "Lunarium", amount: "80" },
                  { name: "Wallflowers", amount: "60" },
                  { name: "Crystals", amount: "710" },
                  { name: "Metamatter", amount: "8" },
                ]
              },
              {
                rank: 9,
                stats: "Collecting crystals gives 20 N-Charge",
                costs: [
                  { name: "Ancient Gears", amount: "780" },
                  { name: "Everlight", amount: "120" },
                  { name: "Fireheart Flower", amount: "30" },
                  { name: "Queen Trumpets", amount: "30" },
                  { name: "Crystals", amount: "1170" },
                  { name: "Metamatter", amount: "9" },
                ]
              },
              {
                rank: 10,
                stats: "Increase duration by 100%",
                costs: [
                  { name: "Ancient Gears", amount: "930" },
                  { name: "Everlight", amount: "140" },
                  { name: "Builder's Blossom", amount: "40" },
                  { name: "Mightstone", amount: "140" },
                  { name: "Crystals", amount: "1390" },
                  { name: "Metamatter", amount: "10" },
                ]
              },
              {
              rank: "Total Max ",
              stats: "Increases radius by 100%",
              costs: [
                { name: "Crystals", amount: "5840" },
                { name: "Metamatter", amount: "54" },
                { name: "Gleamstone", amount: "370" },
                { name: "Blazine", amount: "70" },
                { name: "Sun Sap", amount: "10" },
                { name: "Day Drop", amount: "10" },
                { name: "Cave Kelp", amount: "10" },
                { name: "Acrobat Bark", amount: "10" },
                { name: "Cave Birds", amount: "30" },
                { name: "Cogwine", amount: "10" },
                { name: "Builderite", amount: "1350" },
                { name: "Sparkzite", amount: "300" },
                { name: "Moonlit Moss", amount: "50" },
                { name: "Chronozine", amount: "60" },
                { name: "Queen Trumpets", amount: "50" },
                { name: "Fireheart Flower", amount: "60" },
                { name: "Builder's Blossom", amount: "70" },
                { name: "Ancient Gears", amount: "2190" },
                { name: "Lunarium", amount: "80" },
                { name: "Wallflowers", amount: "60" },
                { name: "Everlight", amount: "260" },
                { name: "Mightstone", amount: "140" },
              ]
            }
        ]
          },
          {
            name: "Vacamatic",
            iconUrl: "https://static.wikia.nocookie.net/trove/images/f/ff/Vaca-matic.png/revision/latest?cb=20220528133354",
            type: "Used to draw in surrounding flora, crystals, and monsters, with upgraded tiers granting temporary stat buffs when vacuuming crystals.",
            prio: "Utility (P4)",
            max: "Rank 10",
            upgrades: [
              {
                rank: 2,
                stats: "Increase radius by 50%",
                costs: [
                  { name: "Builderite", amount: "430" },
                  { name: "Acrobat Bark", amount: "20" },
                  { name: "Cogwine", amount: "20" },
                  { name: "Inert Geode", amount: "300" },
                  { name: "Crystals", amount: "425" },
                  { name: "Metamatter", amount: "2" },
                ]
              },
              {
                rank: 3,
                stats: "Crystal Vacuums refund half the N-Charge cost",
                costs: [
                  { name: "Builderite", amount: "630" },
                  { name: "Fireheart Flower", amount: "30" },
                  { name: "Queen Trumpets", amount: "30" },
                  { name: "Inert Geode", amount: "325" },
                  { name: "Crystals", amount: "475" },
                  { name: "Metamatter", amount: "3" },
                ]
              },
              {
                rank: 4,
                stats: "Reduce cooldown by 20 seconds",
                costs: [
                  { name: "Builderite", amount: "680" },
                  { name: "Quikstone", amount: "110" },
                  { name: "Sparkzite", amount: "110" },
                  { name: "Inert Geode", amount: "350" },
                  { name: "Crystals", amount: "570" },
                  { name: "Metamatter", amount: "4" },
                ]
              },
              {
                rank: 5,
                stats: "Crystal Vacuums restore GAS or double Health Regen in Delves",
                costs: [
                  { name: "Ancient Gears", amount: "480" },
                  { name: "Lunarium", amount: "80" },
                  { name: "Wallflowers", amount: "60" },
                  { name: "Inert Geode", amount: "375" },
                  { name: "Crystals", amount: "700" },
                  { name: "Metamatter", amount: "5" },
                ]
              },
              {
                rank: 6,
                stats: "Inrease radius by 100%",
                costs: [
                  { name: "Ancient Gears", amount: "620" },
                  { name: "Everlight", amount: "120" },
                  { name: "Builder's Blossom", amount: "30" },
                  { name: "Inert Geode", amount: "400" },
                  { name: "Crystals", amount: "800" },
                  { name: "Metamatter", amount: "6" },
                ]
              },
              {
                rank: 7,
                stats: "Crystal Vacuums reduce equipped Module Cooldowns.",
                costs: [
                  { name: "Ancient Gears", amount: "930" },
                  { name: "Mightstone", amount: "140" },
                  { name: "Everlight", amount: "140" },
                  { name: "Inert Geode", amount: "425" },
                  { name: "Crystals", amount: "1000" },
                  { name: "Metamatter", amount: "7" },
                ]
              },
              {
                rank: 8,
                stats: "Reduce N-Charge cost to 60",
                costs: [
                  { name: "Ancient Gears", amount: "1260" },
                  { name: "Queen Trumpets", amount: "50" },
                  { name: "Fireheart Flower", amount: "50" },
                  { name: "Inert Geode", amount: "450" },
                  { name: "Crystals", amount: "1200" },
                  { name: "Metamatter", amount: "8" },
                ]
              },
              {
                rank: 9,
                stats: "Vaca-matic can now pick up Plants.",
                costs: [
                  { name: "Ancient Gears", amount: "1430" },
                  { name: "Lunarium", amount: "280" },
                  { name: "Everlight", amount: "280" },
                  { name: "Inert Geode", amount: "475" },
                  { name: "Crystals", amount: "1400" },
                  { name: "Metamatter", amount: "9" },
                ]
              },
              {
                rank: 10,
                stats: "Doubles Crystals that are vacuumed.",
                costs: [
                  { name: "Ancient Gears", amount: "1430" },
                  { name: "Mightstone", amount: "280" },
                  { name: "Wallflowers", amount: "280" },
                  { name: "Inert Geode", amount: "500" },
                  { name: "Crystals", amount: "1500" },
                  { name: "Metamatter", amount: "10" },
                ]
              },
              {
              rank: "Total Max ",
              stats: "Total materials required to fully upgrade the module",
              costs: [
                { name: "Ancient Gears", amount: "6150" },
                { name: "Builderite", amount: "1790" },
                { name: "Inert Geode", amount: "3700" },
                { name: "Crystals", amount: "8470" },
                { name: "Metamatter", amount: "55" },
                { name: "Everlight", amount: "540" },
                { name: "Mightstone", amount: "420" },
                { name: "Lunarium", amount: "360" },
                { name: "Wallflowers", amount: "340" },
                { name: "Quirkstone", amount: "110" },
                { name: "Sparkzite", amount: "110" },
                { name: "Fireheart Flower", amount: "80" },
                { name: "Queen Trumpets", amount: "80" },
                { name: "Builder's Blossom", amount: "30" },
                { name: "Acrobat Bark", amount: "20" },
                { name: "Cogwine", amount: "20" },
                { name: "Geminite", amount: "30" }
              ]
            }
            ]
          }
        ]
      },
      tips: {
        step: "05",
        title: "Essential Caving & Mastery Tips",
        badge: "Progression Guide",
        list: [
          "<strong>Always Keep a Reliquary Active:</strong> Buy reliquaries from Thundros and keep one active to passively charge it while gathering.",
          "<strong>Heal Every Critter:</strong> Use Comfort Food and Healing Kits on wounded critters to acquire Companion Eggs and bonus Crystals.",
          "<strong>Geode Mastery Light Baseline:</strong> Each level of Geode Mastery grants <strong>+10 Light</strong>, making it vital for endgame Topside and Delves.",
          "<strong>Portal Selection:</strong> Orange Portal leads to Sunken Sunvault, Green to Verdant Veins, and Purple to Moonglow Grotto."
        ]
      }
    }
  },
  fr: {
    hero: {
      badge: "Flèche des Chercheurs & Hub",
      title: "Guide du Sanctuaire de Géode <br />et de la Forge de Modules",
      description: "Guide complet sur les étages de la Flèche des Chercheurs, les portails de cavernes, la forge de modules et l'élevage de compagnons."
    },
    sections: {
      overview: {
        step: "01",
        title: "Aperçu du Sanctuaire et de la Flèche",
        badge: "Carte du Sanctuaire",
        desc: "Le Sanctuaire de Géode s'articule autour de la Flèche des Chercheurs, entourée d'une barrière d'énergie portant l'inscription 'BE THE LIGHT'. Elle regroupe tous les établis, portails et ateliers essentiels."
      },
      spireFloors: {
        step: "02",
        title: "Étages Centraux de la Flèche",
        badge: "Navigation",
        floors: [
          {
            floor: "1er Étage : Installation Minière",
            desc: "Le centre d'expédition principal. Contient les 3 portails de cavernes (Orange : Sunken Sunvault, Vert : Verdant Veins, Violet : Moonglow Grotto), Amberine, la Forge de Modules et l'Établi de Modules."
          },
          {
            floor: "2e Étage : Place des Artisans",
            desc: "Zone d'apparition par défaut. Abrite la statue de la Déesse du Soleil, les portails de transit et les accès au Ranch des Compagnons (Est) et au Centre de Cristallogie (Ouest)."
          },
          {
            floor: "3e Étage : Place des Chercheurs",
            desc: "Niveau intermédiaire reliant le Blastadium Bomber Royale (Est) et le Centre de Recherche de Reliquaires (Ouest)."
          },
          {
            floor: "4e & 5e Étage : Pont d'Observation & Atterrissage",
            desc: "Pont d'observation offrant une vue panoramique sur Géode, et Atterrissage avec les navettes de retour vers Trove."
          }
        ]
      },
      wings: {
        step: "03",
        title: "Ailes Spécialisées du Sanctuaire",
        badge: "Ateliers Clés",
        cards: [
          {
            name: "Ranch des Compagnons (Est 2F)",
            npc: "Chercheur Gabbro",
            desc: "Comprend l'Incubateur d'œufs, l'Entraîneur de compagnons et le Foyer Définitif pour faire éclore, entraîner et échanger des familiers contre des cristaux."
          },
          {
            name: "Centre de Cristallogie (Ouest 2F)",
            npc: "Chercheur Lazul",
            desc: "Comprend l'Établi de Cristallogie et l'Établi Géodien pour fabriquer des utilitaires d'exploration et monter la Maîtrise de Géode."
          },
          {
            name: "Recherche de Reliquaires (Ouest 3F)",
            npc: "Chercheur Th'lan",
            desc: "Comprend le Révélateur de Reliquaires et le marchand Thundros pour acheter, charger et ouvrir des reliquaires remplis de ressources."
          },
          {
            name: "Bomber Royale (Est 3F)",
            npc: "Chercheur Rowan",
            desc: "Simulateur de combat PVP permettant de remporter des pièces Bomber Royale à échanger auprès du marchand du Blastadium."
          }
        ]
      },
      modules: {
  step: "04",
  title: "Modules Principaux de Géode et Priorité d'Amélioration",
  badge: "Forge de Modules",
  desc: "Améliorer les modules augmente la survie dans les cavernes et le rendement en ressources. Donnez la priorité au Moteur de GAS et à l'Omni-Tool. Cliquez sur n'importe quel module pour voir ses améliorations et la quantité de matériaux requis.",
  headers: ["Nom du Module", "Type / Fonction", "Priorité", "Rang Max"],
  rows: [
    {
      name: "Omni-Tool",
      iconUrl: "https://static.wikia.nocookie.net/trove/images/d/d8/Omni-Tool.png/revision/latest?cb=20180525132746",
      type: "Un module d'extraction dédié à la récolte des blocs géodiens, émettant un rayon qui apaise également les créatures des cavernes.",
      prio: "Maximale (P1)",
      max: "Rang 10"
    },
    {
      name: "GAS Engine",
      iconUrl: "https://static.wikia.nocookie.net/trove/images/7/71/GAS.png/revision/latest?cb=20180525132742",
      type: "Le système de survie et d'acclimatation de la combinaison qui s'épuise avec le temps — améliorez-le pour survivre à de plus longues expéditions et atteindre les niveaux de cavernes plus profonds.",
      prio: "Maximale (P1)",
      max: "Rang 10"
    },
    {
      name: "Rocket Boots",
      iconUrl: "https://static.wikia.nocookie.net/trove/images/2/2b/Rocket_Boots.png/revision/latest?cb=20180525132748",
      type: "Offre une propulsion classique de type jetpack, avec nettement plus de style.",
      prio: "Haute (P2)",
      max: "Rang 10"
    },
    {
      name: "Climbing Claw",
      iconUrl: "https://static.wikia.nocookie.net/trove/images/5/5d/Climbing_Claw.png/revision/latest/scale-to-width-down/200?cb=20180525132740",
      type: "Un grappin qui vous attire vers n'importe quel point ciblé à portée, tout en servant également à repousser les créatures hors de votre chemin.",
      prio: "Haute (P2)",
      max: "Rang 10"
    },
    {
      name: "N-Charge",
      iconUrl: "https://static.wikia.nocookie.net/trove/images/4/4f/N-Charge.png/revision/latest/scale-to-width-down/200?cb=20180525132745",
      type: "La source d'énergie principale qui alimente la plupart des modules actifs installés sur votre combinaison d'exploration géodienne.",
      prio: "Moyenne (P3)",
      max: "Rang 10"
    },
    {
      name: "Barrier Generator",
      iconUrl: "https://static.wikia.nocookie.net/trove/images/d/d8/Barrier_Generator.png/revision/latest/scale-to-width-down/200?cb=20180525132739",
      type: "Déploie un bouclier d'énergie protecteur qui bloque les projectiles, étourdit les monstres agressifs et confère un bonus passif de vitesse de déplacement lorsqu'il est actif.",
      prio: "Moyenne (P3)",
      max: "Rang 10"
    },
    {
      name: "Pathpainter",
      iconUrl: "https://static.wikia.nocookie.net/trove/images/7/73/Pathpainter.png/revision/latest/scale-to-width-down/200?cb=20180525132747",
      type: "Transforme le sol sous vos pieds en pistes d'accélération utilisables par tous les joueurs.",
      prio: "Utilitaire (P4)",
      max: "Rang 10"
    },
    {
      name: "Thumper",
      iconUrl: "https://static.wikia.nocookie.net/trove/images/8/81/Thumper.png/revision/latest?cb=20180525132749",
      type: "Émet des ondes de choc acoustiques à travers le terrain pour localiser les gisements de minerai enfouis et révéler les cristaux dissimulés.",
      prio: "Utilitaire (P4)",
      max: "Rang 10"
    },
    {
      name: "Vacamatic",
      iconUrl: "https://static.wikia.nocookie.net/trove/images/f/ff/Vaca-matic.png/revision/latest?cb=20220528133354",
      type: "Génère un puissant vortex d'aspiration pour attirer la flore, les cristaux et les monstres environnants ; les rangs supérieurs octroient des buffs temporaires lors de l'aspiration de cristaux.",
      prio: "Utilitaire (P4)",
      max: "Rang 10"
    }
  ]
},
      tips: {
        step: "05",
        title: "Conseils Clés d'Exploration & Maîtrise",
        badge: "Progression",
        list: [
          "<strong>Gardez toujours un Reliquaire actif :</strong> Achetez des reliquaires auprès de Thundros pour les charger passivement en récoltant.",
          "<strong>Soignez toutes les créatures :</strong> Utilisez des trousses de soins et de la nourriture pour obtenir des Œufs de Compagnons et des Cristaux.",
          "<strong>Lumière de Maîtrise de Géode :</strong> Chaque rang de maîtrise de Géode accorde <strong>+10 Lumière</strong>.",
          "<strong>Choix des Portails :</strong> Orange mène à Sunken Sunvault, Vert à Verdant Veins, et Violet à Moonglow Grotto."
        ]
      }
    }
  },
  es: {
    hero: {
      badge: "Aguja de Buscasoles & Hub",
      title: "Guía del Santuario de Geode <br />y Forja de Módulos",
      description: "Guía completa sobre las plantas de la Aguja de Buscasoles, portales de cavernas, prioridad de mejora de módulos y cuidado de compañeros."
    },
    sections: {
      overview: {
        step: "01",
        title: "Información del Santuario y la Aguja",
        badge: "Mapa del Santuario",
        desc: "El Santuario de Geode se articula alrededor de la Aguja de Buscasoles, rodeada por una barrera de energía con la inscripción 'BE THE LIGHT'. Alberga todas las estaciones de trabajo, portales y talleres."
      },
      spireFloors: {
        step: "02",
        title: "Plantas Centrales de la Aguja",
        badge: "Navegación",
        floors: [
          {
            floor: "1ª Planta: Instalación Minera",
            desc: "El centro principal de expedición. Contiene los 3 portales de cavernas (Naranja: Sunken Sunvault, Verde: Verdant Veins, Púrpura: Moonglow Grotto), Amberine, la Forja de Módulos y el Banco de Módulos."
          },
          {
            floor: "2ª Planta: Plaza de Artesanos",
            desc: "Zona de aparición predeterminada. Alberga la estatua de la Diosa del Sol, portales de tránsito y accesos al Rancho de Compañeros (Este) y Centro de Cristalología (Oeste)."
          },
          {
            floor: "3ª Planta: Plaza de Buscasoles",
            desc: "Nivel intermedio que conecta con el Blastadium de Bomber Royale (Este) y el Centro de Investigación de Relicarios (Oeste)."
          },
          {
            floor: "4ª y 5ª Planta: Mirador y Embarcadero",
            desc: "Plataforma de observación con vistas a Geode y el Embarcadero con transbordadores de regreso a Trove."
          }
        ]
      },
      wings: {
        step: "03",
        title: "Alas Especializadas del Santuario",
        badge: "Estaciones Clave",
        cards: [
          {
            name: "Rancho de Compañeros (Este 2F)",
            npc: "Buscasoles Gabbro",
            desc: "Incluye la Incubadora de huevos, el Entrenador de compañeros y el Buscador de Hogar para incubar, entrenar y cambiar mascotas por cristales."
          },
          {
            name: "Centro de Cristalología (Oeste 2F)",
            npc: "Buscasoles Lazul",
            desc: "Alberga la Mesa de Cristalología y el Banco Geodiano para crear consumibles de exploración y subir la Maestría de Geode."
          },
          {
            name: "Investigación de Relicarios (Oeste 3F)",
            npc: "Buscasoles Th'lan",
            desc: "Contiene el Revelador de Relicarios y al comerciante Thundros para comprar, cargar en cuevas y abrir relicarios llenos de recursos."
          },
          {
            name: "Bomber Royale (Este 3F)",
            npc: "Buscasoles Rowan",
            desc: "Simulador de combate PVP donde conseguir monedas de Bomber Royale para canjear recompensas exclusivas."
          }
        ]
      },
      modules: {
  step: "04",
  title: "Módulos Principales de Geoda y Prioridad de Mejora",
  badge: "Forja de Módulos",
  desc: "Mejorar los módulos aumenta la supervivencia en las cuevas y el rendimiento de recursos. Prioriza el Motor de GAS y la Omniherramienta primero. Haz clic en cualquiera de los módulos para ver sus mejoras y la cantidad de materiales necesarios.",
  headers: ["Nombre del Módulo", "Tipo / Función", "Prioridad", "Rango Máximo"],
  rows: [
    {
      name: "Omni-Tool",
      iconUrl: "https://static.wikia.nocookie.net/trove/images/d/d8/Omni-Tool.png/revision/latest?cb=20180525132746",
      type: "Un módulo de minería diseñado para recolectar bloques geodianos, emitiendo un rayo que también calma a las criaturas de las cuevas.",
      prio: "Máxima (P1)",
      max: "Rango 10"
    },
    {
      name: "GAS Engine",
      iconUrl: "https://static.wikia.nocookie.net/trove/images/7/71/GAS.png/revision/latest?cb=20180525132742",
      type: "El sistema de aclimatación y soporte vital del traje que se agota con el tiempo; mejóralo para sobrevivir expediciones más largas y alcanzar niveles de cuevas más profundos.",
      prio: "Máxima (P1)",
      max: "Rango 10"
    },
    {
      name: "Rocket Boots",
      iconUrl: "https://static.wikia.nocookie.net/trove/images/2/2b/Rocket_Boots.png/revision/latest?cb=20180525132748",
      type: "Proporciona propulsión estándar estilo propulsor, pero con mucho más estilo.",
      prio: "Alta (P2)",
      max: "Rango 10"
    },
    {
      name: "Climbing Claw",
      iconUrl: "https://static.wikia.nocookie.net/trove/images/5/5d/Climbing_Claw.png/revision/latest/scale-to-width-down/200?cb=20180525132740",
      type: "Un gancho de agarre que te atrae hacia cualquier punto objetivo dentro de su alcance y también sirve para apartar a las criaturas de las cuevas.",
      prio: "Alta (P2)",
      max: "Rango 10"
    },
    {
      name: "N-Charge",
      iconUrl: "https://static.wikia.nocookie.net/trove/images/4/4f/N-Charge.png/revision/latest/scale-to-width-down/200?cb=20180525132745",
      type: "La fuente de energía principal que alimenta la mayoría de los módulos activos instalados en tu traje de exploración geodiano.",
      prio: "Media (P3)",
      max: "Rango 10"
    },
    {
      name: "Barrier Generator",
      iconUrl: "https://static.wikia.nocookie.net/trove/images/d/d8/Barrier_Generator.png/revision/latest/scale-to-width-down/200?cb=20180525132739",
      type: "Despliega un escudo de energía protector que bloquea proyectiles, aturde monstruos agresivos y otorga un aumento pasivo de velocidad de movimiento mientras está activo.",
      prio: "Media (P3)",
      max: "Rango 10"
    },
    {
      name: "Pathpainter",
      iconUrl: "https://static.wikia.nocookie.net/trove/images/7/73/Pathpainter.png/revision/latest/scale-to-width-down/200?cb=20180525132747",
      type: "Convierte el suelo bajo tus pies en pistas que aumentan la velocidad y que pueden ser utilizadas por cualquier jugador.",
      prio: "Utilidad (P4)",
      max: "Rango 10"
    },
    {
      name: "Thumper",
      iconUrl: "https://static.wikia.nocookie.net/trove/images/8/81/Thumper.png/revision/latest?cb=20180525132749",
      type: "Emite ondas de choque acústicas a través del terreno para localizar depósitos de minerales enterrados y revelar cristales ocultos.",
      prio: "Utilidad (P4)",
      max: "Rango 10"
    },
    {
      name: "Vacamatic",
      iconUrl: "https://static.wikia.nocookie.net/trove/images/f/ff/Vaca-matic.png/revision/latest?cb=20220528133354",
      type: "Genera un potente vórtice de succión para atraer la flora, cristales y monstruos cercanos; los rangos superiores otorgan mejoras temporales de estadísticas al aspirar cristales.",
      prio: "Utilidad (P4)",
      max: "Rango 10"
    }
  ]
},
      tips: {
        step: "05",
        title: "Consejos Clave de Exploración y Maestría",
        badge: "Progresión",
        list: [
          "<strong>Lleva siempre un Relicario activo:</strong> Cómpralos a Thundros y equípalos para cargarlos automáticamente mientras minas.",
          "<strong>Cura a todos los animalitos:</strong> Usa kits de curación y comida para conseguir Huevos de Compañero y Cristales adicionales.",
          "<strong>Luz de Maestría de Geode:</strong> Cada nivel de maestría concede <strong>+10 Luz</strong>.",
          "<strong>Destino de Portales:</strong> El portal Naranja lleva a Sunken Sunvault, el Verde a Verdant Veins y el Púrpura a Moonglow Grotto."
        ]
      }
    }
  },
  zh: {
    hero: {
      badge: "逐日者尖塔与避难所体系",
      title: "晶洞避难所与<br />地下洞穴全指南",
      description: "详尽解析逐日者尖塔各层建筑、洞穴传送门机制、<br />模块锻造台升级优先级与伴侣宠物照料指南。"
    },
    sections: {
      overview: {
        step: "01",
        title: "晶洞避难所与尖塔整体架构",
        badge: "避难所地图",
        desc: "晶洞避难所围绕多层的逐日者尖塔建立，外围环绕着铭刻有 'BE THE LIGHT' 的能量护盾。尖塔内整合了所有核心工作台、洞穴入口与制作设施。"
      },
      spireFloors: {
        step: "02",
        title: "尖塔核心主楼层分布",
        badge: "楼层导航",
        floors: [
          {
            floor: "一层：采矿中心 (Mining Facility)",
            desc: "探险核心起点。包含三大洞穴传送门（橙色：沉沦日穹、绿色：翠绿矿脉、紫色：月光石洞）、安珀琳 (Amberine)、模块锻造台与模块工作台。"
          },
          {
            floor: "二层：工匠广场 (Crafter's Commons)",
            desc: "玩家默认出生点。设有晶洞太阳女神雕像、传送门，并连接东侧伴侣牧场与西侧结晶学中心。"
          },
          {
            floor: "三层：逐日者广场 (Sunseeker Square)",
            desc: "中层枢纽，直接通往东侧炸弹大逃杀竞技场与西侧圣物研究中心。"
          },
          {
            floor: "四层与五层：观景台与停机坪",
            desc: "四层为全景展望台，五层停机坪设有返回主世界 (Trove Hub) 的航天飞机。"
          }
        ]
      },
      wings: {
        step: "03",
        title: "尖塔功能翼区与关键设施",
        badge: "核心区域",
        cards: [
          {
            name: "伴侣牧场 (东侧 2F)",
            npc: "逐日者加布罗 (Gabbro)",
            desc: "配备孵化器、伴侣训练师与归宿机，用于孵化、升级宠物以及将多余伴侣兑换为晶体。"
          },
          {
            name: "结晶学中心 (西侧 2F)",
            npc: "逐日者拉祖尔 (Lazul)",
            desc: "设有结晶学工作台与晶洞建筑台，用于制作探险工具、配方并提升晶洞精通。"
          },
          {
            name: "圣物研究中心 (西侧 3F)",
            npc: "逐日者特兰 (Th'lan)",
            desc: "设有圣物解密器与商人松德罗斯 (Thundros)，用于购买、在洞穴中充能并开启圣物。"
          },
          {
            name: "炸弹竞技场 (东侧 3F)",
            npc: "逐日者罗文 (Rowan)",
            desc: "PVP 战斗训练场，参与炸弹大逃杀获取代币以兑换专属主题奖励。"
          }
        ]
      },
      modules: {
  step: "04",
  title: "核心地洞模块与升级优先级",
  badge: "模块锻造炉",
  desc: "升级模块可提升洞穴生存能力和资源获取量。优先升级 GAS Engine 和 Omni-Tool。点击任意模块即可查看其升级阶段及所需合成材料数量。",
  headers: ["模块名称", "类型 / 功能", "优先级", "最高等级"],
  rows: [
    {
      name: "Omni-Tool",
      iconUrl: "https://static.wikia.nocookie.net/trove/images/d/d8/Omni-Tool.png/revision/latest?cb=20180525132746",
      type: "专为采集晶洞方块设计的采矿模块，发出的光束还能安抚洞穴生物。",
      prio: "最高 (P1)",
      max: "10 级"
    },
    {
      name: "GAS Engine",
      iconUrl: "https://static.wikia.nocookie.net/trove/images/7/71/GAS.png/revision/latest?cb=20180525132742",
      type: "洞穴防护服的生命维持适应系统，会随时间逐渐消耗——升级可延长探险时间并深入更深层的洞穴阶层。",
      prio: "最高 (P1)",
      max: "10 级"
    },
    {
      name: "Rocket Boots",
      iconUrl: "https://static.wikia.nocookie.net/trove/images/2/2b/Rocket_Boots.png/revision/latest?cb=20180525132748",
      type: "提供标准的喷气背包式推进力，但姿势更加炫酷。",
      prio: "高 (P2)",
      max: "10 级"
    },
    {
      name: "Climbing Claw",
      iconUrl: "https://static.wikia.nocookie.net/trove/images/5/5d/Climbing_Claw.png/revision/latest/scale-to-width-down/200?cb=20180525132740",
      type: "可将你拉向范围内任意目标点的抓钩，同时还能用来击退挡路的洞穴生物。",
      prio: "高 (P2)",
      max: "10 级"
    },
    {
      name: "N-Charge",
      iconUrl: "https://static.wikia.nocookie.net/trove/images/4/4f/N-Charge.png/revision/latest/scale-to-width-down/200?cb=20180525132745",
      type: "为晶洞探险服上安装的大多数主动模块提供动力的核心能源供应。",
      prio: "中 (P3)",
      max: "10 级"
    },
    {
      name: "Barrier Generator",
      iconUrl: "https://static.wikia.nocookie.net/trove/images/d/d8/Barrier_Generator.png/revision/latest/scale-to-width-down/200?cb=20180525132739",
      type: "展开一道防护能量护盾，可格挡投射物、击晕具有攻击性的怪物，并在激活期间提供被动移动速度加成。",
      prio: "中 (P3)",
      max: "10 级"
    },
    {
      name: "Pathpainter",
      iconUrl: "https://static.wikia.nocookie.net/trove/images/7/73/Pathpainter.png/revision/latest/scale-to-width-down/200?cb=20180525132747",
      type: "将脚下的地面转化为加速轨道，所有玩家均可使用。",
      prio: "功能辅助 (P4)",
      max: "10 级"
    },
    {
      name: "Thumper",
      iconUrl: "https://static.wikia.nocookie.net/trove/images/8/81/Thumper.png/revision/latest?cb=20180525132749",
      type: "通过地形发出声学冲击波，精准定位地底矿藏并显现实体隐藏的水晶。",
      prio: "功能辅助 (P4)",
      max: "10 级"
    },
    {
      name: "Vacamatic",
      iconUrl: "https://static.wikia.nocookie.net/trove/images/f/ff/Vaca-matic.png/revision/latest?cb=20220528133354",
      type: "产生强大的吸力漩涡吸入周围的植物、水晶和怪物；升级后吸取水晶可获得临时属性增益。",
      prio: "功能辅助 (P4)",
      max: "10 级"
    }
  ]
},
      tips: {
        step: "05",
        title: "洞穴探险与精通进阶技巧",
        badge: "进阶心得",
        list: [
          "<strong>时刻佩戴圣物：</strong> 探险前在圣物中心购买并装备圣物，采矿探险时会自动充能。",
          "<strong>救助每一个小动物：</strong> 使用急救包与食物治疗虚弱小动物，是获取伴侣蛋与晶体奖励的核心途径。",
          "<strong>晶洞精通光能基础：</strong> 每级晶洞精通提供 <strong>+10 光能</strong>，终局毕业必修。",
          "<strong>传送门指引：</strong> 橙色对应沉沦日穹，绿色对应翠绿矿脉，紫色对应月光石洞。"
        ]
      }
    }
  }
};