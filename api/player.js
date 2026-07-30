// api/player.js
//
// Vercel serverless function that proxies the Aallyn "Kiwi" API
// (https://docs.aallyn.net) so the frontend never talks to it directly.
//
// Fans out to 5 endpoints in parallel:
//   - /v1/rotations/server-time
//   - /v1/rotations/daily-buffs
//   - /v1/rotations/chaos-chest
//   - /v1/rotations/biomes
//   - /v1/leaderboards/records   <-- see note below
//
// NOTE ON "leaderboards":
// The spec asked for `/v1/rotations/leaderboards`, but that path doesn't
// exist in the real API. Leaderboards are their own top-level category
// (`/v1/leaderboards/*`, scope `leaderboards:read`), not part of `rotations`.
// Most of that family needs an authenticated token with that scope, but
// `/v1/leaderboards/records` is public/tokenless and returns exactly the
// kind of "at a glance" data a live dashboard wants: the current Trove
// Mastery, Geode Mastery, and Power Rank record-holders. That's what this
// proxy calls. If you later mint a token with `leaderboards:read` and want
// live boards instead of records, swap the path below for e.g.
// `/v1/leaderboards/timestamps` + `/v1/leaderboards?created_at=...`.
//
// Auth handling:
//   - If KIWI_TOKEN is set, every call is sent with `Authorization: Bearer`.
//   - Rotations + /leaderboards/records are public endpoints, so a missing,
//     invalid, or revoked token never blocks a response: on a 401 we
//     transparently retry that single endpoint with no auth header at all
//     and keep going.
//   - A failure on one endpoint never fails the whole response - each
//     section reports its own ok/error state.

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
  playerActivity: '/v1/leaderboards/activity',
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
  } catch {
    // Non-JSON body (rare, usually on 5xx from an upstream proxy) - ignore.
  }

  if (!response.ok) {
    const message =
      (body && body.error && body.error.message) ||
      `Upstream responded with HTTP ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.code = body && body.error && body.error.code;
    throw error;
  }

  return body;
}

// Fetches one endpoint. If a token is present and the call comes back 401
// (missing/invalid/expired/revoked), retries once with no auth header,
// since these endpoints are all public and still work anonymously (just at
// a stricter per-IP rate limit instead of the per-token one).
async function fetchEndpoint(path, token) {
  const authHeaders = token
    ? { Authorization: `Bearer ${token}`, Accept: 'application/json' }
    : { Accept: 'application/json' };

  try {
    const data = await fetchJson(path, authHeaders);
    return { ok: true, data, usedAuth: Boolean(token) };
  } catch (err) {
    if (token && err.status === 401) {
      try {
        const data = await fetchJson(path, { Accept: 'application/json' });
        return { ok: true, data, usedAuth: false, tokenFallback: true };
      } catch (fallbackErr) {
        return { ok: false, error: fallbackErr.message, status: fallbackErr.status };
      }
    }
    return { ok: false, error: err.message, status: err.status };
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: { message: 'Method not allowed' } });
  }

  const token = process.env.KIWI_TOKEN || null;
  const keys = Object.keys(ENDPOINTS);

  const settled = await Promise.all(
    keys.map((key) => fetchEndpoint(ENDPOINTS[key], token))
  );

  const data = {};
  const errors = {};
  let anyTokenFallback = false;

  keys.forEach((key, i) => {
    const result = settled[i];
    if (result.ok) {
      data[key] = result.data;
      if (result.tokenFallback) anyTokenFallback = true;
    } else {
      data[key] = null;
      errors[key] = { message: result.error, status: result.status ?? null };
    }
  });

  // --- ÚJ: Játékosaktivitás lekérése közvetlenül a szerverről (CORS mentesen) ---
  try {
    const activityRes = await fetch('https://api.aallyn.net/site/leaderboards/activity', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Referer': 'https://trove.aallyn.net/'
      }
    });
    if (activityRes.ok) {
      data.playerActivity = await activityRes.json();
    } else {
      data.playerActivity = null;
    }
  } catch (err) {
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
    } else {
      data.playerProfile = null;
      errors.playerProfile = { message: profileResult.error, status: profileResult.status ?? null };
    }
  }

  res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=45');

  return res.status(200).json({
    fetchedAt: Math.floor(Date.now() / 1000),
    tokenConfigured: Boolean(token),
    tokenFellBackToAnonymous: anyTokenFallback,
    data,
    errors: Object.keys(errors).length > 0 ? errors : null,
  });
}