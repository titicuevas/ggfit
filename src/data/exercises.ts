import { Exercise } from '../types';

export const exercises: Exercise[] = [
  {
    id: 1,
    name: 'Flexiones',
    description: '20 repeticiones',
    difficulty: 'Fácil',
    points: 10,
    completed: false,
  },
  {
    id: 2,
    name: 'Sentadillas',
    description: '30 repeticiones',
    difficulty: 'Fácil',
    points: 10,
    completed: false,
  },
  {
    id: 3,
    name: 'Plancha',
    description: '1 minuto',
    difficulty: 'Media',
    points: 15,
    completed: false,
  },
  {
    id: 4,
    name: 'Burpees',
    description: '15 repeticiones',
    difficulty: 'Media',
    points: 15,
    completed: false,
  },
  {
    id: 5,
    name: 'Mountain Climbers',
    description: '40 repeticiones',
    difficulty: 'Media',
    points: 15,
    completed: false,
  },
  {
    id: 6,
    name: 'Jumping Jacks',
    description: '50 repeticiones',
    difficulty: 'Fácil',
    points: 10,
    completed: false,
  },
  {
    id: 7,
    name: 'Zancadas',
    description: '20 repeticiones por pierna',
    difficulty: 'Media',
    points: 15,
    completed: false,
  },
  {
    id: 8,
    name: 'Abdominales',
    description: '25 repeticiones',
    difficulty: 'Fácil',
    points: 10,
    completed: false,
  },
  {
    id: 9,
    name: 'Plancha Lateral',
    description: '45 segundos por lado',
    difficulty: 'Difícil',
    points: 20,
    completed: false,
  },
  {
    id: 10,
    name: 'Flexiones Diamante',
    description: '15 repeticiones',
    difficulty: 'Difícil',
    points: 20,
    completed: false,
  },
];

export const getExercisesByKDA = (kda: number): Exercise[] => {
  if (kda >= 3) {
    return exercises.filter(ex => ex.difficulty === 'Fácil');
  } else if (kda >= 1.5) {
    return exercises.filter(ex => ex.difficulty === 'Media');
  } else {
    return exercises.filter(ex => ex.difficulty === 'Difícil');
  }
}; 