import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 4000;
const API_KEY = 'RGAPI-e369ece2-d6ff-4448-937b-d96d7040a2b5';

app.use(cors());

app.get('/api/summoner', async (req, res) => {
  const name = req.query.name;
  if (!name) return res.status(400).json({ error: 'Missing summoner name' });

  try {
    const response = await axios.get(
      `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(name)}`,
      { headers: { 'X-Riot-Token': API_KEY } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Unknown error' });
  }
});

// Nuevo endpoint para historial de partidas
app.get('/api/match-history', async (req, res) => {
  const puuid = req.query.puuid;
  if (!puuid) return res.status(400).json({ error: 'Missing puuid' });

  try {
    const idsResponse = await axios.get(
      `https://euw1.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5`,
      { headers: { 'X-Riot-Token': API_KEY } }
    );
    const matchDetails = await Promise.all(
      idsResponse.data.map(async (matchId) => {
        const matchResponse = await axios.get(
          `https://euw1.api.riotgames.com/lol/match/v5/matches/${matchId}`,
          { headers: { 'X-Riot-Token': API_KEY } }
        );
        return matchResponse.data;
      })
    );
    res.json(matchDetails);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Unknown error' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
}); 