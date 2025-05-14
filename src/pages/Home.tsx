import { Container, Heading, Text, Button, VStack, Box, SimpleGrid, Image, Badge, HStack, Center, Flex, Spacer, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { exercises } from '../data/exercises';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function shuffleArray<T>(array: T[]): T[] {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

const Home = () => {
  // Tomamos los 5 primeros ejercicios como destacados
  // Pero los barajamos aleatoriamente para el carrusel
  const featuredExercises = shuffleArray(exercises).slice(0, 5);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const bgMain = useColorModeValue('gray.50', 'gray.900');
  const bgSection = useColorModeValue('white', 'gray.800');
  const bgGradient = useColorModeValue('linear(to-r, brand.50, blue.100)', 'linear(to-r, gray.800, gray.700)');
  const textMain = useColorModeValue('gray.800', 'white');
  const textSecondary = useColorModeValue('gray.600', 'gray.200');

  return (
    <Flex direction="column" align="center" minH="100vh" bg={bgMain} width="100vw" justify="center">
      <Container maxW="container.xl" py={10} centerContent>
        <VStack gap={12} align="center" width="100%">
          <Box textAlign="center" py={8} width="100%">
            <Heading as="h1" size="2xl" mb={4} color="brand.500">
              Bienvenido a GGFit
            </Heading>
            <Text fontSize="xl" color={textSecondary} maxW="2xl" mx="auto">
              Convierte tus partidas de League of Legends en una experiencia fitness.
              Mejora tu juego mientras te mantienes en forma.
            </Text>
            <Image src="/ggfit.png" alt="GGFit Logo" height="300px" mx="auto" my={6} borderRadius="full" />
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} width="100%">
            <Flex direction="column" p={8} borderWidth={1} borderRadius="lg" bg={bgSection} boxShadow="md" _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)' }} transition="all 0.2s">
              <Heading size="md" color="brand.500" mb={4}>¿Cómo funciona?</Heading>
              <Text color={textSecondary} mb={4}>
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

            <Flex direction="column" p={8} borderWidth={1} borderRadius="lg" bg={bgSection} boxShadow="md" _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)' }} transition="all 0.2s">
              <Heading size="md" color="brand.500" mb={4}>Características</Heading>
              <VStack align="start" spacing={3} mb={4}>
                <Text color={textSecondary}>• Conexión con tu cuenta de League of Legends</Text>
                <Text color={textSecondary}>• Ejercicios personalizados según tu rendimiento</Text>
                <Text color={textSecondary}>• Sistema de puntos y niveles</Text>
                <Text color={textSecondary}>• Tabla de clasificación</Text>
              </VStack>
              <Spacer />
              <Link to="/exercises">
                <Button colorScheme="brand" size="lg" width="full">
                  Ver Ejercicios
                </Button>
              </Link>
            </Flex>
          </SimpleGrid>

          {/* Ejercicios destacados en carrusel */}
          <Center width="100%">
            <Box
              mt={10}
              px={{ base: 2, md: 8 }}
              py={10}
              borderRadius="2xl"
              bgGradient={bgGradient}
              boxShadow="lg"
              width="100%"
            >
              <Heading size="lg" mb={6} color="brand.600" textAlign="center">
                Ejercicios Destacados
              </Heading>
              <Box maxW="1200px" mx="auto">
                <Slider {...sliderSettings}>
                  {featuredExercises.map((exercise) => (
                    <Box key={exercise.id} px={2}>
                      <Flex
                        direction="column"
                        bg={bgSection}
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
                          <Text color={textSecondary}>{exercise.description}</Text>
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
                    </Box>
                  ))}
                </Slider>
              </Box>
            </Box>
          </Center>
        </VStack>
      </Container>
    </Flex>
  );
};

export default Home; 