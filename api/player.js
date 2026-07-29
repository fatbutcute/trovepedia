export default async function handler(req, res) {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Player name is required.' });
  }

  const token = process.env.KIWI_TOKEN;

  const endpointsToTry = [
    `https://api.aallyn.net/v1/player/${encodeURIComponent(name)}`,
    `https://api.aallyn.net/v1/players/${encodeURIComponent(name)}`,
    `https://api.aallyn.net/v1/user/${encodeURIComponent(name)}`,
    `https://api.aallyn.net/v1/player?name=${encodeURIComponent(name)}`
  ];

  for (const url of endpointsToTry) {
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        return res.status(200).json({
          successfulEndpoint: url,
          data: data
        });
      }
    } catch (e) {
    }
  }

  return res.status(404).json({
    error: 'Player not found on any known API endpoints.',
    searchedName: name
  });
}