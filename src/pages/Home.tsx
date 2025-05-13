import { Container, Heading, Text, Button, VStack, Box, SimpleGrid, Image, Badge, HStack, Center, Flex, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { exercises } from '../data/exercises';

const Home = () => {
  // Tomamos los 5 primeros ejercicios como destacados
  const featuredExercises = exercises.slice(0, 5);

  return (
    <Flex direction="column" align="center" minH="100vh" bg="gray.50" width="100vw" justify="center">
      <Container maxW="container.xl" py={10} centerContent>
        <VStack gap={12} align="center" width="100%">
          <Box textAlign="center" py={8} width="100%">
            <Heading as="h1" size="2xl" mb={4} color="brand.500">
              Bienvenido a GGFit
            </Heading>
            <Text fontSize="xl" color="gray.600" maxW="2xl" mx="auto">
              Convierte tus partidas de League of Legends en una experiencia fitness.
              Mejora tu juego mientras te mantienes en forma.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} width="100%">
            <Flex direction="column" p={8} borderWidth={1} borderRadius="lg" bg="white" boxShadow="md" _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)' }} transition="all 0.2s">
              <Heading size="md" color="brand.500" mb={4}>¿Cómo funciona?</Heading>
              <Text color="gray.600" mb={4}>
                GGFit analiza tu rendimiento en League of Legends y te asigna ejercicios
                basados en tu KDA. ¡Mejora tu juego mientras te mantienes en forma!
              </Text>
              <Spacer />
              <Link to="/profile">
                <Button colorScheme="brand" size="lg" width="full">
                  Comenzar Ahora
                </Button>
              </Link>
            </Flex>

            <Flex direction="column" p={8} borderWidth={1} borderRadius="lg" bg="white" boxShadow="md" _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)' }} transition="all 0.2s">
              <Heading size="md" color="brand.500" mb={4}>Características</Heading>
              <VStack align="start" spacing={3} mb={4}>
                <Text color="gray.600">• Conexión con tu cuenta de League of Legends</Text>
                <Text color="gray.600">• Ejercicios personalizados según tu rendimiento</Text>
                <Text color="gray.600">• Sistema de puntos y niveles</Text>
                <Text color="gray.600">• Tabla de clasificación</Text>
              </VStack>
              <Spacer />
              <Link to="/exercises">
                <Button colorScheme="brand" size="lg" width="full">
                  Ver Ejercicios
                </Button>
              </Link>
            </Flex>
          </SimpleGrid>

          {/* Ejercicios destacados */}
          <Center width="100%">
            <Box
              mt={10}
              px={{ base: 2, md: 8 }}
              py={10}
              borderRadius="2xl"
              bgGradient="linear(to-r, brand.50, blue.100)"
              boxShadow="lg"
              width="100%"
            >
              <Heading size="lg" mb={6} color="brand.600" textAlign="center">
                Ejercicios Destacados
              </Heading>
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} gap={8}>
                {featuredExercises.map((exercise) => (
                  <Flex
                    key={exercise.id}
                    direction="column"
                    bg="white"
                    borderRadius="xl"
                    boxShadow="md"
                    overflow="hidden"
                    p={0}
                    _hover={{ boxShadow: '2xl', transform: 'scale(1.04)' }}
                    transition="all 0.2s"
                    borderWidth={1}
                    borderColor="brand.100"
                    minH="340px"
                  >
                    {exercise.imageUrl && (
                      <Image
                        src={exercise.imageUrl}
                        alt={exercise.name}
                        height="160px"
                        width="100%"
                        objectFit="cover"
                        borderTopRadius="xl"
                      />
                    )}
                    <VStack align="start" p={5} gap={2} flex={1}>
                      <HStack justify="space-between" width="100%">
                        <Heading size="md" color="brand.600">{exercise.name}</Heading>
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
                      <Text color="gray.600">{exercise.description}</Text>
                      <HStack width="100%" justify="space-between">
                        <Text fontSize="sm" color="gray.500">
                          Duración: {exercise.duration} min
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          Calorías: {exercise.calories}
                        </Text>
                      </HStack>
                      <Spacer />
                    </VStack>
                  </Flex>
                ))}
              </SimpleGrid>
            </Box>
          </Center>
        </VStack>
      </Container>
    </Flex>
  );
};

export default Home; 