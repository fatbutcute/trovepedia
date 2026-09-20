// api/player.js
const BASE_URL = 'https://api.aallyn.net';

const HEADERS = {
  'Accept': 'application/json',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  'Referer': 'https://trove.aallyn.net/'
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: { message: 'Method not allowed' } });

  const { uuid, anchor, offset, limit } = req.query;

  // 1. EGY ADOTT TÁBLA BEJEGYZÉSEINEK LEKÉRÉSE (UUID alapján)
  if (uuid) {
    try {
      const qLimit = limit || 100;
      const qOffset = offset || 0;
      const qAnchor = anchor ? `&created_at=${anchor}` : '';
      const targetUrl = `${BASE_URL}/site/leaderboards/${encodeURIComponent(uuid)}/entries?limit=${qLimit}&offset=${qOffset}${qAnchor}`;
      
      const r = await fetch(targetUrl, { headers: HEADERS });
      const data = await r.json();
      return res.status(200).json({ ok: r.ok, data });
    } catch (e) {
      return res.status(500).json({ ok: false, error: e.message });
    }
  }

  // 2. KEZDETI BETÖLTÉS: TIMESTAMPS + TELJES BOARDS LISTA
  try {
    // Először lekérjük a legfrissebb időbélyegeket
    let latestAnchor = null;
    let timestamps = [];
    try {
      const stampRes = await fetch(`${BASE_URL}/site/leaderboards/timestamps?limit=14`, { headers: HEADERS });
      if (stampRes.ok) {
        const stampData = await stampRes.json();
        timestamps = stampData.items || [];
        if (timestamps.length > 0) {
          latestAnchor = timestamps[0];
        }
      }
    } catch (e) {}

    // A legfrissebb anchorral lekérjük a teljes board listát
    let boards = [];
    const boardsUrl = latestAnchor 
      ? `${BASE_URL}/site/leaderboards/boards?created_at=${latestAnchor}`
      : `${BASE_URL}/site/leaderboards/boards`;

    const boardsRes = await fetch(boardsUrl, { headers: HEADERS });
    if (boardsRes.ok) {
      const bData = await boardsRes.json();
      boards = bData.items || bData || [];
    }

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
    return res.status(200).json({
      ok: true,
      latestAnchor,
      timestamps,
      boards
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}