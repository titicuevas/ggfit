import {
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Box,
  Select,
  HStack
} from '@chakra-ui/react';

const Leaderboard = () => {
  // Datos de ejemplo
  const users = [
    { rank: 1, name: 'Player1', level: 10, points: 1500, exercises: 45 },
    { rank: 2, name: 'Player2', level: 8, points: 1200, exercises: 38 },
    { rank: 3, name: 'Player3', level: 7, points: 1000, exercises: 32 },
  ];

  return (
    <Container maxW="container.xl" py={10}>
      <Box mb={8}>
        <Heading as="h1" size="xl" mb={6}>
          Clasificación Global
        </Heading>
        
        <HStack spacing={4} mb={4}>
          <Select placeholder="Filtrar por región" maxW="200px">
            <option value="euw">Europa Oeste</option>
            <option value="na">Norte América</option>
            <option value="eune">Europa Norte</option>
          </Select>
          
          <Select placeholder="Ordenar por" maxW="200px">
            <option value="points">Puntos</option>
            <option value="level">Nivel</option>
            <option value="exercises">Ejercicios</option>
          </Select>
        </HStack>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Posición</Th>
              <Th>Jugador</Th>
              <Th>Nivel</Th>
              <Th>Puntos</Th>
              <Th>Ejercicios Completados</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.rank}>
                <Td>
                  <Badge
                    colorScheme={user.rank === 1 ? 'yellow' : user.rank === 2 ? 'gray' : user.rank === 3 ? 'orange' : 'blue'}
                    fontSize="md"
                  >
                    #{user.rank}
                  </Badge>
                </Td>
                <Td>{user.name}</Td>
                <Td>{user.level}</Td>
                <Td>{user.points}</Td>
                <Td>{user.exercises}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Container>
  );
};

export default Leaderboard; 