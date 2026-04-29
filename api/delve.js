// api/delve.js
export default async function handler(request, response) {
  try {
    // A Vercel szervere kéri le az adatot a Pyrodiscről (itt nincs CORS!)
    const pyrodiscReq = await fetch("https://www.pyrodisc.one/api/trove/delve/current.php");
    const data = await pyrodiscReq.json();

    // Visszaadjuk az adatot a te Trovepedia oldaladnak
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: "Failed to fetch from Pyrodisc" });
  }
}