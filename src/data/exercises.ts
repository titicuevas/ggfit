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
    imageUrl: '/ejercicios/sentadilla.gif'
  },
  {
    id: '2',
    name: 'Puente de glúteos',
    description: 'Ejercicio para glúteos y core, fácil de hacer en casa',
    difficulty: 'Fácil',
    points: 10,
    completed: false,
    type: 'Fuerza',
    duration: 8,
    calories: 60,
    imageUrl: '/ejercicios/puente.gif'
  },
  {
    id: '3',
    name: 'Jumping Jacks',
    description: 'Cardio clásico para activar todo el cuerpo',
    difficulty: 'Fácil',
    points: 10,
    completed: false,
    type: 'Cardio',
    duration: 7,
    calories: 70,
    imageUrl: '/ejercicios/jumpingjacks.gif'
  },
  {
    id: '4',
    name: 'Flexiones',
    description: 'Ejercicio para fortalecer brazos y pecho',
    difficulty: 'Media',
    points: 15,
    completed: false,
    type: 'Fuerza',
    duration: 15,
    calories: 150,
    imageUrl: '/ejercicios/flexiones.gif'
  },
  {
    id: '5',
    name: 'Plancha',
    description: 'Ejercicio isométrico para core y abdomen',
    difficulty: 'Media',
    points: 20,
    completed: false,
    type: 'Fuerza',
    duration: 5,
    calories: 80,
    imageUrl: '/ejercicios/plancha.gif'
  },
  {
    id: '6',
    name: 'Zancadas',
    description: 'Fortalece piernas y glúteos, mejora el equilibrio',
    difficulty: 'Media',
    points: 15,
    completed: false,
    type: 'Fuerza',
    duration: 10,
    calories: 90,
    imageUrl: '/ejercicios/zancadas.gif'
  },
  {
    id: '7',
    name: 'Mountain Climbers',
    description: 'Cardio intenso para abdomen y piernas',
    difficulty: 'Media',
    points: 20,
    completed: false,
    type: 'Cardio',
    duration: 8,
    calories: 120,
    imageUrl: '/ejercicios/mountainclimbers.gif'
  },
  {
    id: '8',
    name: 'Abdominales',
    description: 'Ejercicio clásico para fortalecer el abdomen',
    difficulty: 'Media',
    points: 15,
    completed: false,
    type: 'Fuerza',
    duration: 10,
    calories: 80,
    imageUrl: '/ejercicios/abdominales.gif'
  },
  {
    id: '9',
    name: 'Burpees',
    description: 'Ejercicio completo para fuerza y cardio',
    difficulty: 'Difícil',
    points: 30,
    completed: false,
    type: 'Cardio',
    duration: 10,
    calories: 180,
    imageUrl: '/ejercicios/burpees.gif'
  },
  {
    id: '10',
    name: 'Superman',
    description: 'Ejercicio para fortalecer la espalda baja y glúteos',
    difficulty: 'Difícil',
    points: 25,
    completed: false,
    type: 'Fuerza',
    duration: 8,
    calories: 70,
    imageUrl: '/ejercicios/superman.gif'
  },
  {
    id: '11',
    name: 'Plancha con toque de hombro',
    description: 'Variante de plancha que trabaja core y hombros',
    difficulty: 'Difícil',
    points: 25,
    completed: false,
    type: 'Fuerza',
    duration: 8,
    calories: 80,
    imageUrl: '/ejercicios/planchatoquehombro.gif'
  },
  {
    id: '12',
    name: 'Plancha lateral',
    description: 'Ejercicio avanzado para oblicuos y core',
    difficulty: 'Difícil',
    points: 25,
    completed: false,
    type: 'Fuerza',
    duration: 6,
    calories: 70,
    imageUrl: '/ejercicios/planchalateral.gif'
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