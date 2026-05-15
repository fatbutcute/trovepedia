const fs = require('fs');

console.log("Célzott szűrés indítása: Csak a 'Crafting' típusú itemek megtartása...");

// Fájl beolvasása
const rawData = fs.readFileSync('allitemstrove.json', 'utf-8');
let items = JSON.parse(rawData);

// Szűrés kizárólag a TÍPUS alapján
const filteredItems = items.filter(item => {
  // Megkeressük a type vagy category mezőt, és kisbetűssé alakítjuk (biztos ami biztos)
  // Ha véletlenül nincs ilyen mező, akkor egy üres szöveget ("") adunk neki, hogy ne fagyjon ki.
  const itemType = (item.type || item.category || "").toLowerCase();

  // Ha a típus tartalmazza azt, hogy "crafting" vagy "material", akkor az kell nekünk!
  if (itemType.includes("crafting") || itemType.includes("material") || itemType === "resource") {
    return true; // MEGTARTJUK
  }

  // Minden más gatya! (Eldobjuk)
  return false;
});

// Fájlba mentés
fs.writeFileSync('materials_exact.json', JSON.stringify(filteredItems, null, 2));

console.log(`--- KÉSZ VAGYUNK ---`);
console.log(`Eredeti méret: ${items.length} item.`);
console.log(`Pontos, 'Crafting' típusú anyagok: ${filteredItems.length} item.`);
console.log(`Az új fájlod: materials_exact.json`);