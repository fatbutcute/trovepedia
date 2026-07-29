export default async function handler(req, res) {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Player name is required.' });
  }

  const token = process.env.KIWI_TOKEN;

  try {
    const response = await fetch(`https://api.aallyn.net/v1/player/${encodeURIComponent(name)}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch player data from Trove API.' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error while fetching data.' });
  }
}