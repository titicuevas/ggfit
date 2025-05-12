import { Container, Heading, Text, Button, VStack, Box, SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <VStack gap={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>
            Bienvenido a GGFit
          </Heading>
          <Text fontSize="xl" color="gray.600">
            Convierte tus partidas de League of Legends en una experiencia fitness
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
          <Box p={6} borderWidth={1} borderRadius="lg" bg="white">
            <VStack gap={4} align="stretch">
              <Heading size="md">¿Cómo funciona?</Heading>
              <Text>
                GGFit analiza tu rendimiento en League of Legends y te asigna ejercicios
                basados en tu KDA. ¡Mejora tu juego mientras te mantienes en forma!
              </Text>
              <Link to="/profile">
                <Button colorScheme="blue" width="full">
                  Comenzar Ahora
                </Button>
              </Link>
            </VStack>
          </Box>

          <Box p={6} borderWidth={1} borderRadius="lg" bg="white">
            <VStack gap={4} align="stretch">
              <Heading size="md">Características</Heading>
              <Text>
                • Conexión con tu cuenta de League of Legends
                <br />
                • Ejercicios personalizados según tu rendimiento
                <br />
                • Sistema de puntos y niveles
                <br />
                • Tabla de clasificación
              </Text>
              <Link to="/exercises">
                <Button colorScheme="green" width="full">
                  Ver Ejercicios
                </Button>
              </Link>
            </VStack>
          </Box>
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Home; 