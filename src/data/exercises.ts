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
  },
  {
    id: '6',
    name: 'Burpees',
    description: 'Ejercicio completo para fuerza y cardio',
    difficulty: 'Difícil',
    points: 30,
    completed: false,
    type: 'Cardio',
    duration: 10,
    calories: 180,
    imageUrl: '/exercises/burpees.jpg'
  },
  {
    id: '7',
    name: 'Zancadas',
    description: 'Fortalece piernas y glúteos, mejora el equilibrio',
    difficulty: 'Media',
    points: 15,
    completed: false,
    type: 'Fuerza',
    duration: 10,
    calories: 90,
    imageUrl: '/exercises/lunges.jpg'
  },
  {
    id: '8',
    name: 'Mountain Climbers',
    description: 'Cardio intenso para abdomen y piernas',
    difficulty: 'Difícil',
    points: 20,
    completed: false,
    type: 'Cardio',
    duration: 8,
    calories: 120,
    imageUrl: '/exercises/mountainclimbers.jpg'
  },
  {
    id: '9',
    name: 'Puente de glúteos',
    description: 'Ejercicio para glúteos y core, fácil de hacer en casa',
    difficulty: 'Fácil',
    points: 10,
    completed: false,
    type: 'Fuerza',
    duration: 8,
    calories: 60,
    imageUrl: '/exercises/glutebridge.jpg'
  },
  {
    id: '10',
    name: 'Jumping Jacks',
    description: 'Cardio clásico para activar todo el cuerpo',
    difficulty: 'Fácil',
    points: 10,
    completed: false,
    type: 'Cardio',
    duration: 7,
    calories: 70,
    imageUrl: '/exercises/jumpingjacks.jpg'
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