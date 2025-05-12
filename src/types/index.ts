export interface User {
  id: string;
  summonerName: string;
  level: number;
  points: number;
  exercisesCompleted: number;
  region: string;
}

export interface Exercise {
  id: number;
  name: string;
  description: string;
  difficulty: 'Fácil' | 'Media' | 'Difícil';
  points: number;
  completed: boolean;
}

export interface GameStats {
  kda: number;
  win: boolean;
  score: number;
  timestamp: string;
}

export interface UserProfile extends User {
  gameStats: GameStats[];
  exerciseHistory: Exercise[];
  rank: number;
} 