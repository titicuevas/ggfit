import { Box, Container, Heading, Text, Button, VStack, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="center">
        <Heading as="h1" size="2xl" textAlign="center">
          GGFit
        </Heading>
        <Text fontSize="xl" textAlign="center">
          Convierte tus derrotas en victorias físicas
        </Text>
        
        <Box p={8} borderWidth={1} borderRadius="lg" width="100%" maxW="600px">
          <VStack spacing={6}>
            <Heading as="h2" size="lg">
              ¿Cómo funciona?
            </Heading>
            <Text>
              GGFit analiza tu rendimiento en League of Legends y te asigna ejercicios
              personalizados basados en tu KDA. Mejora tu salud mientras juegas.
            </Text>
            
            <HStack spacing={4}>
              <Button
                colorScheme="blue"
                size="lg"
                onClick={() => navigate('/profile')}
              >
                Conecta tu cuenta
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/leaderboard')}
              >
                Ver Clasificación
              </Button>
            </HStack>
          </VStack>
        </Box>

        <Box p={8} borderWidth={1} borderRadius="lg" width="100%" maxW="600px">
          <VStack spacing={6}>
            <Heading as="h2" size="lg">
              Sistema de Ejercicios
            </Heading>
            <Text>
              Basado en tu rendimiento en el juego, te asignaremos ejercicios
              específicos para mantenerte en forma y mejorar tu salud.
            </Text>
            <Button
              colorScheme="green"
              size="lg"
              onClick={() => navigate('/exercises')}
            >
              Ver Ejercicios
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Home; 