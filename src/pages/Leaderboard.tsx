import { useState, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Container,
  useColorModeValue,
  Flex
} from '@chakra-ui/react';
import { supabase } from '../supabaseClient';
import '../styles/leaderboard.css';

interface LeaderboardUser {
  username: string;
  total_points: number;
  rank?: number;
}

const Leaderboard = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const bgMain = useColorModeValue('gray.50', 'gray.900');
  const bgTable = useColorModeValue('white', 'gray.800');
  const textMain = useColorModeValue('gray.800', 'white');
  const thBg = useColorModeValue('gray.100', 'gray.700');
  const thText = useColorModeValue('gray.600', 'gray.200');
  const titleColor = useColorModeValue('black', 'white');
  const subtitleColor = useColorModeValue('gray', 'white');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('username, total_points')
          .order('total_points', { ascending: false });

        if (error) throw error;

        // Añadir el ranking a cada usuario
        const rankedUsers = data.map((user, index) => ({
          ...user,
          rank: index + 1
        }));

        setUsers(rankedUsers);
      } catch (error) {
        console.error('Error al cargar la clasificación:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <Flex direction="column" align="center" minH="100vh" width="100vw" bg={bgMain} justify="center">
      <Container maxW="container.lg" p={{ base: 2, md: 0 }}>
        <Box textAlign="center" mb={{ base: 4, md: 8 }} mt={{ base: 4, md: 8 }}>
          <div className="leaderboard-title" style={{ color: titleColor, fontWeight: 800, fontSize: '2.2rem' }}><span role="img" aria-label="trofeo">🏆</span> Clasificación Global</div>
          <div className="leaderboard-sub" style={{ color: subtitleColor, fontWeight: 600, fontSize: '1.1rem' }}>
            ¡Compite con otros jugadores y alcanza la cima!
          </div>
        </Box>
        <Box className="leaderboard-container" bg={bgTable} w="100%" overflowX={{ base: 'auto', md: 'visible' }}>
          <Table className="leaderboard-table" variant="simple" size="md" color={textMain} width="100%" minWidth={{ base: '600px', md: '100%' }}>
            <Thead bg={thBg}>
              <Tr>
                <Th className="leaderboard-pos" color={thText} bg={thBg} fontSize={{ base: 'sm', md: 'md' }}>POSICIÓN</Th>
                <Th className="leaderboard-user" color={thText} bg={thBg} fontSize={{ base: 'sm', md: 'md' }}>USUARIO</Th>
                <Th isNumeric className="leaderboard-points" color={thText} bg={thBg} fontSize={{ base: 'sm', md: 'md' }}>PUNTOS</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.username} fontSize={{ base: 'sm', md: 'md' }}>
                  <Td className="leaderboard-pos">{user.rank === 1 && <span role="img" aria-label="oro">🥇</span>}{user.rank === 2 && <span role="img" aria-label="plata">🥈</span>}{user.rank === 3 && <span role="img" aria-label="bronce">🥉</span>}{user.rank && user.rank > 3 && <span>{user.rank}</span>}</Td>
                  <Td className="leaderboard-user">{user.username}{user.rank && user.rank <= 3 && (<span style={{background: user.rank === 1 ? '#ffe066' : user.rank === 2 ? '#e9ecef' : '#ffd6a5',color: '#222',borderRadius: '6px',fontWeight: 'bold',fontSize: '0.9em',padding: '2px 10px',marginLeft: '6px',boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>TOP {user.rank}</span>)}</Td>
                  <Td isNumeric className="leaderboard-points">{user.total_points}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Container>
    </Flex>
  );
};

export default Leaderboard; 