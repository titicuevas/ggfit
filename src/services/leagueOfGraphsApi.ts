import axios from 'axios';
import type { Summoner, Match, Participant, Team } from '../types/riot';

const BACKEND_URL = 'http://localhost:4000';

interface RiotMatch {
  metadata: {
    dataVersion: string;
    matchId: string;
    participants: string[];
  };
  info: {
    gameCreation: number;
    gameDuration: number;
    gameId: number;
    gameMode: string;
    gameName: string;
    gameStartTimestamp: number;
    gameType: string;
    gameVersion: string;
    mapId: number;
    participants: Participant[];
    platformId: string;
    queueId: number;
    teams: Team[];
    tournamentCode: string;
  };
}

const leagueOfGraphsApi = {
  getSummonerByName: async (summonerName: string): Promise<Summoner> => {
    try {
      const name = summonerName.split('#')[0];
      const response = await axios.get(`/api/summoner?name=${encodeURIComponent(name)}`);
      if (!response.data) {
        throw new Error('No se encontró el invocador');
      }
      return {
        id: response.data.id,
        accountId: response.data.accountId,
        puuid: response.data.puuid,
        name: response.data.name,
        profileIconId: response.data.profileIconId,
        revisionDate: response.data.revisionDate,
        summonerLevel: response.data.summonerLevel
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('API key inválida o expirada');
        } else if (error.response?.status === 404) {
          throw new Error('Invocador no encontrado');
        }
      }
      console.error('Error fetching summoner:', error);
      throw error;
    }
  },

  getMatchHistory: async (summonerName: string): Promise<Match[]> => {
    try {
      const summoner = await leagueOfGraphsApi.getSummonerByName(summonerName);
      const response = await axios.get(`${BACKEND_URL}/api/match-history?puuid=${encodeURIComponent(summoner.puuid)}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching match history:', error);
      throw error;
    }
  },

  getMatchHistory: async (summonerName: string, region: string = 'euw'): Promise<Match[]> => {
    try {
      const summoner = await leagueOfGraphsApi.getSummonerByName(summonerName);
      
      const response = await axios.get(`${PROXY_URL}${RIOT_API_URL}/lol/match/v5/matches/by-puuid/${summoner.puuid}/ids?start=0&count=5`, {
        headers: {
          'X-Riot-Token': API_KEY,
          'Origin': window.location.origin
        }
      });

      const matchDetails = await Promise.all(
        response.data.map(async (matchId: string) => {
          const matchResponse = await axios.get(`${PROXY_URL}${RIOT_API_URL}/lol/match/v5/matches/${matchId}`, {
            headers: {
              'X-Riot-Token': API_KEY,
              'Origin': window.location.origin
            }
          });
          return matchResponse.data as RiotMatch;
        })
      );

      return matchDetails.map((match: RiotMatch): Match => ({
        metadata: {
          dataVersion: match.metadata.dataVersion,
          matchId: match.metadata.matchId,
          participants: match.metadata.participants
        },
        info: {
          gameCreation: match.info.gameCreation,
          gameDuration: match.info.gameDuration,
          gameId: match.info.gameId,
          gameMode: match.info.gameMode,
          gameName: match.info.gameName,
          gameStartTimestamp: match.info.gameStartTimestamp,
          gameType: match.info.gameType,
          gameVersion: match.info.gameVersion,
          mapId: match.info.mapId,
          participants: match.info.participants,
          platformId: region.toUpperCase(),
          queueId: match.info.queueId,
          teams: match.info.teams,
          tournamentCode: match.info.tournamentCode
        }
      }));
    } catch (error) {
      console.error('Error fetching match history:', error);
      throw error;
    }
  }
};

export default leagueOfGraphsApi; 