import type { Exercise } from '../types';

export const exercises: Exercise[] = [
  {
    id: '1',
    name: 'Sentadillas',
    description: 'Ejercicio básico para fortalecer piernas y glúteos',
    difficulty: 'Fácil',
    points: 10,
    completed: false,
    type: 'Fuerza',
    duration: 10,
    calories: 100,
    imageUrl: '/exercises/squats.jpg'
  },
  {
    id: '2',
    name: 'Flexiones',
    description: 'Ejercicio para fortalecer brazos y pecho',
    difficulty: 'Media',
    points: 15,
    completed: false,
    type: 'Fuerza',
    duration: 15,
    calories: 150,
    imageUrl: '/exercises/pushups.jpg'
  },
  {
    id: '3',
    name: 'Plancha',
    description: 'Ejercicio isométrico para core y abdomen',
    difficulty: 'Media',
    points: 20,
    completed: false,
    type: 'Fuerza',
    duration: 5,
    calories: 80,
    imageUrl: '/exercises/plank.jpg'
  },
  {
    id: '4',
    name: 'Saltos',
    description: 'Ejercicio cardiovascular de alta intensidad',
    difficulty: 'Difícil',
    points: 25,
    completed: false,
    type: 'Cardio',
    duration: 20,
    calories: 200,
    imageUrl: '/exercises/jumps.jpg'
  },
  {
    id: '5',
    name: 'Estiramientos',
    description: 'Ejercicios de flexibilidad y movilidad',
    difficulty: 'Fácil',
    points: 5,
    completed: false,
    type: 'Flexibilidad',
    duration: 15,
    calories: 50,
    imageUrl: '/exercises/stretching.jpg'
  }
];

export const getExercisesByKDA = (kda: number): Exercise[] => {
  if (kda < 1.5) {
    return exercises.filter(ex => ex.difficulty === 'Fácil');
  } else if (kda < 2.5) {
    return exercises.filter(ex => ex.difficulty === 'Media');
  } else {
    return exercises.filter(ex => ex.difficulty === 'Difícil');
  }
}; 