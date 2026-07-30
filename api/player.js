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
};

const REQUEST_TIMEOUT_MS = 8000;

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
  if (req.method !== 'GET') {
    return res.status(405).json({ error: { message: 'Method not allowed' } });
  }

  const token = process.env.KIWI_TOKEN || null;
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

  // --- AKTIVITÁS DEDIKÁLT SZERVEROLDALI FETCH (Tokenmentes) ---
  try {
    const actRes = await fetch('https://api.aallyn.net/site/leaderboards/activity', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://trove.aallyn.net/'
      }
    });
    if (actRes.ok) {
      data.playerActivity = await actRes.json();
    } else {
      data.playerActivity = null;
    }
  } catch (e) {
    data.playerActivity = null;
  }

  const playerQuery = typeof req.query?.player === 'string' ? req.query.player.trim() : '';
  if (playerQuery) {
    const profileResult = await fetchEndpoint(
      `/v1/leaderboards/players/${encodeURIComponent(playerQuery)}/profile`,
      token
    );
    if (profileResult.ok) {
      data.playerProfile = profileResult.data;
    }
  }

  res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=45');

  return res.status(200).json({
    fetchedAt: Math.floor(Date.now() / 1000),
    data,
    errors: Object.keys(errors).length > 0 ? errors : null,
  });
}