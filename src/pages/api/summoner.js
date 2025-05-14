export default async function handler(req, res) {
  const { name } = req.query;
  if (!name) return res.status(400).json({ error: 'Missing summoner name' });

  const API_KEY = process.env.RIOT_API_KEY; // Configura esto en Vercel
  try {
    const response = await fetch(
      `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(name)}`,
      {
        headers: { 'X-Riot-Token': API_KEY }
      }
    );
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Unknown error' });
  }
} 