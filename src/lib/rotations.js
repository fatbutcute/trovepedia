/**
 * src/lib/rotations.js
 *
 * D15 rotáció számítási logika.
 * A biomes.json-t a /public/data/ mappából olvassa (fetch via Vite).
 */

const SYSTEM_EPOCH    = 1718708400
const SYSTEM_INTERVAL = 60 * 60 * 3   // 3 óra másodpercben

// ─── Biome slot-ok (eredeti rotációs listák) ─────────────────────────────────

const biome1 = [
  'Sundered Uplands', 'Cerise Sandsea', 'The Deeper Forest', 'Alkali Flats',
  'Dead of Winter', 'Sundered Uplands', 'Firefly Party', 'Desert of Secrets',
  'Weathered Wastelands', 'The Frozen Wastes', "Frigga's Fjord", 'Abandoned Boneyard',
]

const biome2 = [
  'Cursed Vale', 'Hollow Dunes', 'The Bewitching Wood', 'Primal Preserve',
  'Hollow Dunes', 'Ancient Heights', 'Viking Burial Grounds', 'Spellbound Thicket',
  'Saurian Swamp', 'Restless Range', 'Uncanny Valley',
]

const biome3 = [
  'Sugar Steppes', 'Volcanic Fields', 'The Lost Isles', 'Luminopolis',
  'The Lost Isles', 'Blazing Emberlands', 'Cocoa Craters', 'Data Spires',
  'The Lost Isles', 'Cupcake Canyon', "Dragon's Teeth", 'Luminopolis',
  'The Lost Isles', 'Data Spires',
]

// ─── Biome icon map (belső név → image kulcs) ────────────────────────────────

const biomeIconMap = {
  'Geode Topside':        'biome_sandsea',
  'Cerise Sandsea':       'biome_sandsea',
  'Hollow Dunes':         'biome_dunes',
  'Weathered Wastelands': 'biome_wasteland',
  'Desert Frontier':      'biome_frontier',
  'Abandoned Boneyard':   'biome_frontier',
  'Alkali Flats':         'biome_frontier',
  'Desert of Secrets':    'biome_frontier',
  'Permafrost':           'biome_tundra',
  'The Frozen Wastes':    'biome_tundra',
  'Dead of Winter':       'biome_tundra',
  'Medieval Highlands':   'biome_forest',
  'The Deeper Forest':    'biome_forest',
  'Firefly Party':        'biome_forest',
  "Frigga's Fjord":       'biome_forest',
  'Sundered Uplands':     'biome_giantland',
  'Fae Forest':           'biome_fae',
  'The Bewitching Wood':  'biome_fae',
  'Spellbound Thicket':   'biome_fae',
  'Uncanny Valley':       'biome_fae',
  'Jurassic Jungle':      'biome_dinosaur',
  'Saurian Swamp':        'biome_dinosaur',
  'Primal Preserve':      'biome_dinosaur',
  'Forbidden Spires':     'biome_spires',
  'Restless Range':       'biome_spires',
  'Ancient Heights':      'biome_spires',
  'Cursed Vale':          'biome_cursed',
  'Viking Burial Grounds':'biome_cursed',
  'Data Spires':          'biome_neon',
  'Neon City':            'biome_neon',
  'Luminopolis':          'biome_neon',
  'The Lost Isles':       'biome_pirate',
  'Sugar Steppes':        'biome_candy',
  'Cupcake Canyon':       'biome_candy',
  'Cocoa Craters':        'biome_candy',
  'Candoria':             'biome_candy',
  'Dragonfire Peaks':     'biome_dragon',
  "Dragon's Teeth":       'biome_dragon',
  'Volcanic Fields':      'biome_dragon',
  'Blazing Emberlands':   'biome_dragon',
}

// ─── Display nevek (al-biome → fő biome neve) ────────────────────────────────

const displayNameMap = {
  'Abandoned Boneyard':   'Desert Frontier',
  'Alkali Flats':         'Desert Frontier',
  'Desert of Secrets':    'Desert Frontier',
  'The Frozen Wastes':    'Permafrost',
  'Dead of Winter':       'Permafrost',
  'The Deeper Forest':    'Medieval Highlands',
  'Firefly Party':        'Medieval Highlands',
  "Frigga's Fjord":       'Medieval Highlands',
  'The Bewitching Wood':  'Fae Forest',
  'Spellbound Thicket':   'Fae Forest',
  'Uncanny Valley':       'Fae Forest',
  'Saurian Swamp':        'Jurassic Jungle',
  'Primal Preserve':      'Jurassic Jungle',
  'Restless Range':       'Forbidden Spires',
  'Ancient Heights':      'Forbidden Spires',
  'Viking Burial Grounds':'Cursed Vale',
  'Data Spires':          'Neon City',
  'Luminopolis':          'Neon City',
  'Sugar Steppes':        'Candoria',
  'Cupcake Canyon':       'Candoria',
  'Cocoa Craters':        'Candoria',
  "Dragon's Teeth":       'Dragonfire Peaks',
  'Volcanic Fields':      'Dragonfire Peaks',
  'Blazing Emberlands':   'Dragonfire Peaks',
}

// ─── Biomes.json betöltése (egyszer, Promise) ────────────────────────────────

let _biomesCache = null

async function getBiomes() {
  if (_biomesCache) return _biomesCache
  const res  = await fetch('/data/biomes.json')
  _biomesCache = await res.json()
  return _biomesCache
}

// ─── Segédfüggvények ─────────────────────────────────────────────────────────

export async function getBiomeInfo(name) {
  const biomes      = await getBiomes()
  const displayName = displayNameMap[name] ?? name
  const imageFile   = biomeIconMap[name]

  const found = imageFile
    ? biomes.find((b) => b.image === `${imageFile}.png`)
    : biomes.find((b) => b.name.toLowerCase() === displayName.toLowerCase())

  return {
    name:  displayName,
    image: found ? found.image  : 'biome_frontier.png',
    color: found ? found.color  : '#a78bfa',
  }
}

/**
 * getLongShadeRotation(future)
 *
 * @param {number} future – hány rotációval a jövőbe nézzünk (0 = jelenlegi)
 * @returns {Promise<{ start: number, end: number, biomes: BiomeInfo[] }>}
 */
export async function getLongShadeRotation(future = 0) {
  const nowSeconds = Math.floor(Date.now() / 1000)
  const current    = nowSeconds - SYSTEM_EPOCH
  const consumed   = Math.trunc(current / SYSTEM_INTERVAL)
  const elapsed    = current % SYSTEM_INTERVAL

  const startSeconds = nowSeconds - elapsed + future * SYSTEM_INTERVAL

  const [b1, b2, b3] = await Promise.all([
    getBiomeInfo(biome1[(consumed + future) % biome1.length]),
    getBiomeInfo(biome2[(consumed + future) % biome2.length]),
    getBiomeInfo(biome3[(consumed + future) % biome3.length]),
  ])

  return {
    start:  startSeconds * 1000,
    end:   (startSeconds + SYSTEM_INTERVAL) * 1000,
    biomes: [b1, b2, b3],
  }
}

/** Formázott visszaszámláló string az eltelt idő alapján */
export function formatCountdown(endMs) {
  const diff = Math.max(0, endMs - Date.now())
  const h    = Math.floor(diff / 3_600_000)
  const m    = Math.floor((diff % 3_600_000) / 60_000)
  const s    = Math.floor((diff % 60_000) / 1000)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
