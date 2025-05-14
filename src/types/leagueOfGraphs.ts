export interface LeagueOfGraphsMatch {
  id: string;
  version: string;
  timestamp: number;
  duration: number;
  gameMode: string;
  gameName: string;
  gameType: string;
  mapId: number;
  queueId: number;
  participants: LeagueOfGraphsParticipant[];
  teams: LeagueOfGraphsTeam[];
}

export interface LeagueOfGraphsParticipant {
  puuid: string;
  assists: number;
  deaths: number;
  kills: number;
  championId: number;
  championName: string;
  teamId: number;
  win: boolean;
  summonerName: string;
  summonerId: string;
  profileIcon: number;
  summonerLevel: number;
  visionScore: number;
  totalDamageDealtToChampions: number;
  totalDamageTaken: number;
  goldEarned: number;
  totalMinionsKilled: number;
  neutralMinionsKilled: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
}

export interface LeagueOfGraphsTeam {
  teamId: number;
  win: boolean;
  objectives: {
    baron?: { first: boolean; kills: number };
    dragon?: { first: boolean; kills: number };
    inhibitor?: { first: boolean; kills: number };
    riftHerald?: { first: boolean; kills: number };
    tower?: { first: boolean; kills: number };
  };
} 