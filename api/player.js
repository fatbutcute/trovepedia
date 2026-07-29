export default async function handler(req, res) {
  const token = process.env.KIWI_TOKEN;

  try {
    const response = await fetch(`https://api.aallyn.net/v1/leaderboards`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: `API Error (Status ${response.status})`, 
        details: data 
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}