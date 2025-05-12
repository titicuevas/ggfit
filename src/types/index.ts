export interface User {
  id: string;
  summonerName: string;
  level: number;
  points: number;
  exercisesCompleted: number;
  lastExercise?: Date;
  region: string;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  difficulty: 'Fácil' | 'Media' | 'Difícil';
  points: number;
  completed: boolean;
  type: 'Cardio' | 'Fuerza' | 'Flexibilidad';
  duration: number; // en minutos
  calories: number;
  imageUrl?: string;
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

export interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  level: number;
} 