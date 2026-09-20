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

const REQUEST_TIMEOUT_MS = 6000;

function withTimeout(promise, ms) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error('Request timed out')), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

async function fetchJson(path, headers) {
  const response = await withTimeout(
    fetch(`${BASE_URL}${path}`, { headers, method: 'GET' }),
    REQUEST_TIMEOUT_MS
  );

  let body = null;
  try {
    body = await response.json();
  } catch {}

  if (!response.ok) {
    const message = (body && body.error && body.error.message) || `Upstream HTTP ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return body;
}

async function fetchEndpoint(path, token) {
  const authHeaders = token
    ? { Authorization: `Bearer ${token}`, Accept: 'application/json' }
    : { Accept: 'application/json' };

  try {
    const data = await fetchJson(path, authHeaders);
    return { ok: true, data };
  } catch (err) {
    if (token && err.status === 401) {
      try {
        const data = await fetchJson(path, { Accept: 'application/json' });
        return { ok: true, data };
      } catch (fallbackErr) {
        return { ok: false, error: fallbackErr.message };
      }
    }
    return { ok: false, error: err.message };
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: { message: 'Method not allowed' } });
  }

  const token = process.env.KIWI_TOKEN || null;
  const boardQuery = typeof req.query?.board === 'string' ? req.query.board.trim() : '';

  // Ha a frontend egy adott tábla adatait kéri (pl. /api/player?board=trove_mastery)
  if (boardQuery) {
    try {
      const boardRes = await fetch(`${BASE_URL}/v1/leaderboards/${encodeURIComponent(boardQuery)}`, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Referer': 'https://trove.aallyn.net/'
        }
      });
      const boardData = await boardRes.json();
      return res.status(200).json({ ok: true, data: boardData });
    } else {
      // Próbáljuk a site végpontot is ha a v1 nem adná vissza
      const siteRes = await fetch(`${BASE_URL}/site/leaderboards/boards`, {
        headers: { Accept: 'application/json' }
      });
      const siteData = await siteRes.json();
      return res.status(200).json({ ok: true, data: siteData });
    } catch (e) {
      return res.status(500).json({ error: { message: e.message } });
    }
  }

  // Alapértelmezett globális adatok lekérése
  const keys = Object.keys(ENDPOINTS);
  const settled = await Promise.all(
    keys.map((key) => fetchEndpoint(ENDPOINTS[key], token))
  );

  const data = {};
  const errors = {};

  keys.forEach((key, i) => {
    const result = settled[i];
    if (result.ok) {
      data[key] = result.data;
    } else {
      data[key] = null;
      errors[key] = { message: result.error };
    }
  });

  try {
    const boardsRes = await fetch(`${BASE_URL}/site/leaderboards/boards`, {
      headers: { Accept: 'application/json' }
    });
    if (boardsRes.ok) {
      data.availableBoards = await boardsRes.json();
    }
  } catch (e) {}

  res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=45');

  return res.status(200).json({
    fetchedAt: Math.floor(Date.now() / 1000),
    data,
    errors: Object.keys(errors).length > 0 ? errors : null,
  });
}