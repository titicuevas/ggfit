export default async function handler(req, res) {
  const { puuid } = req.query;
  if (!puuid) return res.status(400).json({ error: 'Missing puuid' });

  const API_KEY = process.env.RIOT_API_KEY;
  try {
    // Obtener los últimos 5 match IDs
    const idsResponse = await fetch(
      `https://euw1.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5`,
      {
        headers: { 'X-Riot-Token': API_KEY }
      }
    );
    const ids = await idsResponse.json();
    if (!idsResponse.ok) return res.status(idsResponse.status).json(ids);

    // Obtener los detalles de cada partida
    const matchDetails = await Promise.all(
      ids.map(async (matchId) => {
        const matchResponse = await fetch(
          `https://euw1.api.riotgames.com/lol/match/v5/matches/${matchId}`,
          {
            headers: { 'X-Riot-Token': API_KEY }
          }
        );
        return await matchResponse.json();
      })
    );
    res.status(200).json(matchDetails);
  } catch (error) {
    res.status(500).json({ error: 'Unknown error' });
  }
} 