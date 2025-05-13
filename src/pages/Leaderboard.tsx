import {
  Heading,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import '../global.css';

const Leaderboard = () => {
  // Datos de ejemplo
  const leaderboardData = [
    { rank: 1, name: 'Invocador1', points: 1500, level: 30 },
    { rank: 2, name: 'Invocador2', points: 1200, level: 28 },
    { rank: 3, name: 'Invocador3', points: 1000, level: 25 },
  ];

  return (
    <main className="main-centered">
      <Box
        className="card-centered"
        bgGradient="linear(to-r, brand.50, blue.100)"
        borderRadius="2xl"
        boxShadow="lg"
        p={{ base: 4, md: 8 }}
        mt={4}
      >
        <Heading mb={8} textAlign="center" color="brand.600">
          Tabla de Clasificación
        </Heading>
        <TableContainer>
          <Table variant="simple" bg="white" borderRadius="lg" boxShadow="md" overflow="hidden">
            <Thead>
              <Tr>
                <Th color="brand.600">Posición</Th>
                <Th color="brand.600">Invocador</Th>
                <Th isNumeric color="brand.600">Puntos</Th>
                <Th isNumeric color="brand.600">Nivel</Th>
              </Tr>
            </Thead>
            <Tbody>
              {leaderboardData.map((player) => (
                <Tr key={player.rank} _hover={{ bg: 'brand.50' }}>
                  <Td fontWeight="bold">{player.rank}</Td>
                  <Td>{player.name}</Td>
                  <Td isNumeric color="brand.500">{player.points}</Td>
                  <Td isNumeric>{player.level}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </main>
  );
};

export default Leaderboard; 