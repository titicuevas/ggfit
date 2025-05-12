import axios from 'axios';

const RIOT_API_KEY = import.meta.env.VITE_RIOT_API_KEY;
const BASE_URL = 'https://api.riotgames.com';

if (!RIOT_API_KEY) {
  throw new Error('Falta la variable de entorno de la API de Riot');
}

const riotApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-Riot-Token': RIOT_API_KEY,
  },
});

export const getSummonerByName = async (summonerName: string, region: string) => {
  try {
    const response = await riotApi.get(`/lol/summoner/v4/summoners/by-name/${summonerName}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos del invocador:', error);
    throw error;
  }
};

export const getMatchHistory = async (puuid: string, region: string) => {
  try {
    const response = await riotApi.get(`/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener historial de partidas:', error);
    throw error;
  }
};

export const getMatchDetails = async (matchId: string, region: string) => {
  try {
    const response = await riotApi.get(`/lol/match/v5/matches/${matchId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener detalles de la partida:', error);
    throw error;
  }
};

export default {
  getSummonerByName,
  getMatchHistory,
  getMatchDetails,
}; 