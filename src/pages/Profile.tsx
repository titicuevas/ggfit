import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  SimpleGrid,
  VStack,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/stat';
import { getSummonerByName, getMatchHistory, getMatchDetails } from '../services/riotApi';
import type { Summoner, Match } from '../types/riot';

const Profile = () => {
  const [summonerName, setSummonerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [summonerData, setSummonerData] = useState<Summoner | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const toast = useToast();

  const handleConnect = async () => {
    if (!summonerName.trim()) {
      toast({
        title: 'Error',
        description: 'Por favor ingresa un nombre de invocador',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const summoner = await getSummonerByName(summonerName);
      setSummonerData(summoner);

      const matchIds = await getMatchHistory(summoner.puuid);
      const matchDetails = await Promise.all(
        matchIds.map(id => getMatchDetails(id))
      );
      setMatches(matchDetails);

      toast({
        title: 'Conexión exitosa',
        description: `Bienvenido ${summoner.name}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      toast({
        title: 'Error',
        description: 'No se pudo conectar con la API de Riot Games',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={8} align="stretch">
        <Box>
          <Heading mb={4}>Perfil de Invocador</Heading>
          <FormControl>
            <FormLabel>Nombre de Invocador</FormLabel>
            <Input
              value={summonerName}
              onChange={(e) => setSummonerName(e.target.value)}
              placeholder="Ingresa tu nombre de invocador"
            />
          </FormControl>
          <Button
            mt={4}
            colorScheme="blue"
            onClick={handleConnect}
            loading={loading}
            loadingText="Conectando..."
            disabled={!summonerName.trim() || loading}
          >
            Conectar Cuenta
          </Button>
        </Box>

        {summonerData && (
          <Box>
            <Heading size="md" mb={4}>Estadísticas</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
              <Stat>
                <StatLabel>Nivel Actual</StatLabel>
                <StatNumber>{summonerData.summonerLevel}</StatNumber>
                <StatHelpText>Nivel de Invocador</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Ejercicios Completados</StatLabel>
                <StatNumber>{matches.length}</StatNumber>
                <StatHelpText>Partidas Registradas</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Puntos Totales</StatLabel>
                <StatNumber>
                  {matches.reduce((total, match) => {
                    const participant = match.info.participants.find(p => p.puuid === summonerData.puuid);
                    return total + (participant ? participant.kills + participant.assists : 0);
                  }, 0)}
                </StatNumber>
                <StatHelpText>Kills + Asistencias</StatHelpText>
              </Stat>
            </SimpleGrid>
          </Box>
        )}

        {loading && (
          <Box textAlign="center" py={8}>
            <Spinner size="xl" />
            <Text mt={4}>Cargando datos...</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Profile; 