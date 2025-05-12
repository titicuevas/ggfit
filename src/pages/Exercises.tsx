import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  Image,
} from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { useToast } from '@chakra-ui/toast';
import { Card, CardBody, CardFooter } from '@chakra-ui/card';
import { Progress } from '@chakra-ui/progress';
import { Divider } from '@chakra-ui/layout';
import type { Exercise } from '../types';
import { exercises } from '../data/exercises';

const Exercises = () => {
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>(exercises);
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleComplete = (exerciseId: string) => {
    setSelectedExercises(prev =>
      prev.map(ex =>
        ex.id === exerciseId ? { ...ex, completed: true } : ex
      )
    );
    toast({
      title: '¡Ejercicio completado!',
      description: 'Has ganado puntos por completar este ejercicio.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={8} align="stretch">
        <Box>
          <Heading size="lg" mb={4}>Ejercicios Disponibles</Heading>
          <Text color="gray.600">
            Completa ejercicios para ganar puntos y mejorar tu rendimiento en el juego.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
          {selectedExercises.map((exercise) => (
            <Card
              key={exercise.id}
              bg={bgColor}
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="lg"
              overflow="hidden"
              transition="transform 0.2s"
              _hover={{ transform: 'scale(1.02)' }}
            >
              {exercise.imageUrl && (
                <Image
                  src={exercise.imageUrl}
                  alt={exercise.name}
                  height="200px"
                  width="100%"
                  objectFit="cover"
                />
              )}
              <CardBody>
                <VStack gap={3} align="start">
                  <HStack justify="space-between" width="100%">
                    <Heading size="md">{exercise.name}</Heading>
                    <Badge
                      colorScheme={
                        exercise.difficulty === 'Fácil'
                          ? 'green'
                          : exercise.difficulty === 'Media'
                          ? 'yellow'
                          : 'red'
                      }
                    >
                      {exercise.difficulty}
                    </Badge>
                  </HStack>
                  <Text>{exercise.description}</Text>
                  <HStack width="100%" justify="space-between">
                    <Text fontSize="sm" color="gray.500">
                      Duración: {exercise.duration} min
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Calorías: {exercise.calories}
                    </Text>
                  </HStack>
                  <Progress
                    value={exercise.completed ? 100 : 0}
                    size="sm"
                    width="100%"
                    colorScheme="green"
                  />
                </VStack>
              </CardBody>
              <Divider />
              <CardFooter>
                <Button
                  width="100%"
                  colorScheme="blue"
                  disabled={exercise.completed}
                  onClick={() => handleComplete(exercise.id)}
                >
                  {exercise.completed ? 'Completado' : 'Completar Ejercicio'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Exercises; 