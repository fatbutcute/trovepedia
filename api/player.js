export default async function handler(req, res) {
  const token = process.env.KIWI_TOKEN;
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  try {
    const [timeRes, dailyBuffRes, chaosRes] = await Promise.all([
      fetch('https://api.aallyn.net/v1/rotations/server-time', { headers }),
      fetch('https://api.aallyn.net/v1/rotations/daily-buffs', { headers }),
      fetch('https://api.aallyn.net/v1/rotations/chaos-chest', { headers }),
      fetch('https://api.aallyn.net/v1/rotations/calendar', { headers }),
      fetch('https://api.aallyn.net/v1/rotations/delves?week=', { headers }),
      fetch('https://api.aallyn.net/v1/rotations/biomes', { headers }),
      fetch('https://api.aallyn.net/v1/leaderboards', { headers })
    ]);

    const serverTime = await timeRes.json().catch(() => null);
    const dailyBuffs = await dailyBuffRes.json().catch(() => null);
    const chaosChest = await chaosRes.json().catch(() => null);

    return res.status(200).json({
      serverTime,
      dailyBuffs,
      chaosChest
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch Trove data', message: error.message });
  }
}