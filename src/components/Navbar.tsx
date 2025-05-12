import { Box, Flex, Button, Heading, HStack, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      bg={bg}
      px={4}
      borderBottom="1px"
      borderColor={borderColor}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Heading as={RouterLink} to="/" size="md" cursor="pointer">
          GGFit
        </Heading>

        <HStack spacing={4}>
          <Button as={RouterLink} to="/" variant="ghost">
            Inicio
          </Button>
          <Button as={RouterLink} to="/profile" variant="ghost">
            Perfil
          </Button>
          <Button as={RouterLink} to="/exercises" variant="ghost">
            Ejercicios
          </Button>
          <Button as={RouterLink} to="/leaderboard" variant="ghost">
            Clasificación
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar; 