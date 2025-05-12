import {
  Container,
  Heading,
  Box,
} from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/table';

const Leaderboard = () => {
  // Datos de ejemplo
  const leaderboardData = [
    { rank: 1, name: 'Invocador1', points: 1500, level: 30 },
    { rank: 2, name: 'Invocador2', points: 1200, level: 28 },
    { rank: 3, name: 'Invocador3', points: 1000, level: 25 },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      <Box>
        <Heading mb={6}>Tabla de Clasificación</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Posición</Th>
              <Th>Invocador</Th>
              <Th isNumeric>Puntos</Th>
              <Th isNumeric>Nivel</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leaderboardData.map((player) => (
              <Tr key={player.rank}>
                <Td>{player.rank}</Td>
                <Td>{player.name}</Td>
                <Td isNumeric>{player.points}</Td>
                <Td isNumeric>{player.level}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Container>
  );
};

export default Leaderboard; 