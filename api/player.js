// api/player.js
const BASE_URL = 'https://api.aallyn.net';

const ENDPOINTS = {
  serverTime: '/v1/rotations/server-time',
  dailyBuffs: '/v1/rotations/daily-buffs',
  weeklyBuffs: '/v1/rotations/weekly-buffs',
  chaosChest: '/v1/rotations/chaos-chest',
  biomes: '/v1/rotations/biomes',
  leaderboardRecords: '/v1/leaderboards/records',
  corruxion: '/v1/rotations/corruxion',
  fluxion: '/v1/rotations/fluxion',
  luxion: '/v1/rotations/luxion',
};

const HEADERS = {
  'Accept': 'application/json',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  'Referer': 'https://trove.aallyn.net/'
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: { message: 'Method not allowed' } });

  const boardQuery = typeof req.query?.board === 'string' ? req.query.board.trim() : '';
  const dateQuery = typeof req.query?.created_at === 'string' ? req.query.created_at.trim() : '';

  // 1. Ha egy konkrét tábla bejegyzéseit kéri a frontend
  if (boardQuery) {
    try {
      const url = `${BASE_URL}/site/leaderboards/board?name=${encodeURIComponent(boardQuery)}${dateQuery ? `&created_at=${dateQuery}` : ''}`;
      let response = await fetch(url, { headers: HEADERS });
      
      // Fallback v1-re ha a site nem érhető el
      if (!response.ok) {
        response = await fetch(`${BASE_URL}/v1/leaderboards/${encodeURIComponent(boardQuery)}`, { headers: HEADERS });
      }
      
      const data = await response.json();
      return res.status(200).json({ ok: true, data });
    } catch (e) {
      return res.status(500).json({ error: { message: e.message } });
    }
  }

  // 2. Alap lekérés: Aggregált adatok + A TELJES BOARDS HIERARCHIA
  const data = {};

  // Standard v1 rotációk
  await Promise.all(
    Object.keys(ENDPOINTS).map(async (key) => {
      try {
        const r = await fetch(`${BASE_URL}${ENDPOINTS[key]}`, { headers: HEADERS });
        if (r.ok) data[key] = await r.json();
      } catch {
        data[key] = null;
      }
    })
  );

  // Teljes Boards lista lekérése
  try {
    const timestamp = dateQuery || Math.floor(Date.now() / 1000);
    // Megpróbáljuk időbélyeggel és anélkül is
    let bRes = await fetch(`${BASE_URL}/site/leaderboards/boards?created_at=${timestamp}`, { headers: HEADERS });
    if (!bRes.ok) {
      bRes = await fetch(`${BASE_URL}/site/leaderboards/boards`, { headers: HEADERS });
    }
    if (bRes.ok) {
      data.availableBoards = await bRes.json();
    }
  } catch (e) {
    data.availableBoards = null;
  }

  res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=45');
  return res.status(200).json({
    fetchedAt: Math.floor(Date.now() / 1000),
    data
  });
}