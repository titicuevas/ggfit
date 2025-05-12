import axios from 'axios';
import type { Summoner, Match } from '../types/riot';

const API_KEY = '7c056c65-38c0-48a4-b627-5b59aa8385ea';
const BASE_URL = 'https://euw1.api.riotgames.com';

const riotApi = {
  getSummonerByName: async (summonerName: string): Promise<Summoner> => {
    try {
      const response = await axios.get(`${BASE_URL}/lol/summoner/v4/summoners/by-name/${summonerName}`, {
        headers: {
          'X-Riot-Token': API_KEY
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching summoner:', error);
      throw error;
    }
  },

  getMatchHistory: async (puuid: string): Promise<string[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5`, {
        headers: {
          'X-Riot-Token': API_KEY
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching match history:', error);
      throw error;
    }
  },

  getMatchDetails: async (matchId: string): Promise<Match> => {
    try {
      const response = await axios.get(`${BASE_URL}/lol/match/v5/matches/${matchId}`, {
        headers: {
          'X-Riot-Token': API_KEY
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching match details:', error);
      throw error;
    }
  }
};

export default riotApi; 