export default async function handler(req, res) {
  const token = process.env.KIWI_TOKEN;

  if (!token) {
    return res.status(500).json({ error: 'KIWI_TOKEN environment variable is missing.' });
  }

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  try {
    const [serverTimeRes, dailyBuffsRes, chaosChestRes, biomesRes] = await Promise.all([
      fetch('https://api.aallyn.net/v1/rotations/server-time', { headers }),
      fetch('https://api.aallyn.net/v1/rotations/daily-buffs', { headers }),
      fetch('https://api.aallyn.net/v1/rotations/chaos-chest', { headers }),
      fetch('https://api.aallyn.net/v1/rotations/biomes', { headers })
    ]);

    const serverTime = await serverTimeRes.json().catch(() => null);
    const dailyBuffs = await dailyBuffsRes.json().catch(() => null);
    const chaosChest = await chaosChestRes.json().catch(() => null);
    const biomes = await biomesRes.json().catch(() => null);

    return res.status(200).json({
      serverTime,
      dailyBuffs,
      chaosChest,
      biomes
    });
  } catch (error) {
    return res.status(500).json({ 
      error: 'Failed to fetch data from Trove API.', 
      details: error.message 
    });
  }
}