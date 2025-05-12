import {
  Container,
  Heading,
  Text,
  Box,
  VStack,
  Card,
  CardBody,
  CardHeader,
  Button,
  Progress,
  Badge,
  SimpleGrid,
  useColorModeValue
} from '@chakra-ui/react';

const Exercises = () => {
  // Datos de ejemplo para los ejercicios
  const exercises = [
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
      difficulty: 'Media',
      points: 15,
      completed: false,
    },
    {
      id: 3,
      name: 'Plancha',
      description: '1 minuto',
      difficulty: 'Difícil',
      points: 20,
      completed: false,
    },
  ];

  const cardBg = useColorModeValue('white', 'gray.700');

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading as="h1" size="xl" mb={2}>
            Tus Ejercicios
          </Heading>
          <Text color="gray.500">
            Completa estos ejercicios para ganar puntos y subir de nivel
          </Text>
        </Box>

        <Box>
          <Heading size="md" mb={4}>
            Progreso Diario
          </Heading>
          <Progress value={30} size="sm" colorScheme="green" mb={4} />
          <Text fontSize="sm" color="gray.500">
            3 de 10 ejercicios completados
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {exercises.map((exercise) => (
            <Card key={exercise.id} bg={cardBg}>
              <CardHeader>
                <Heading size="md">{exercise.name}</Heading>
                <Badge
                  colorScheme={
                    exercise.difficulty === 'Fácil'
                      ? 'green'
                      : exercise.difficulty === 'Media'
                      ? 'yellow'
                      : 'red'
                  }
                  mt={2}
                >
                  {exercise.difficulty}
                </Badge>
              </CardHeader>
              <CardBody>
                <VStack align="stretch" spacing={4}>
                  <Text>{exercise.description}</Text>
                  <Text fontSize="sm" color="blue.500">
                    +{exercise.points} puntos
                  </Text>
                  <Button
                    colorScheme="blue"
                    variant={exercise.completed ? 'outline' : 'solid'}
                    isDisabled={exercise.completed}
                  >
                    {exercise.completed ? 'Completado' : 'Comenzar'}
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Exercises; 