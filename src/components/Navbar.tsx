import { Box, Flex, Button, Heading, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box
      bg="white"
      px={4}
      borderBottom="1px"
      borderColor="gray.200"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Link to="/">
          <Heading size="md" cursor="pointer">
            GGFit
          </Heading>
        </Link>

        <HStack gap={4}>
          <Link to="/">
            <Button variant="ghost">Inicio</Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost">Perfil</Button>
          </Link>
          <Link to="/exercises">
            <Button variant="ghost">Ejercicios</Button>
          </Link>
          <Link to="/leaderboard">
            <Button variant="ghost">Clasificación</Button>
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar; 