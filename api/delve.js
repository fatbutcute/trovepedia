// api/delve.js
export default async function handler(request, response) {
  try {
    // 1. Megkérjük a Pyrodiscot az adatokra, de most már úgy teszünk, mintha igazi böngésző lennénk!
    const pyrodiscReq = await fetch("https://www.pyrodisc.one/api/trove/delve/current.php", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", // Álcázás
        "Referer": "https://www.pyrodisc.one/delves" // Azt mondjuk, a saját oldalukról jövünk
      }
    });

    // Ha a Pyrodisc valamiért mégis hibát dob (pl. 403 Forbidden), azt továbbítjuk
    if (!pyrodiscReq.ok) {
      return response.status(pyrodiscReq.status).json({ 
        error: `A Pyrodisc szervere elutasította a kérést (Status: ${pyrodiscReq.status})` 
      });
    }

    const data = await pyrodiscReq.json();

    // 2. Visszaadjuk az adatot a Trovepediának
    response.status(200).json(data);
    
  } catch (error) {
    // Ha a hálózat szakad meg, vagy a szerverünk fagy le
    response.status(500).json({ error: "Szerver hiba az adatok letöltésekor: " + error.message });
  }
}