import { Box, Flex, Button, Heading, HStack, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      bg={bgColor}
      px={4}
      borderBottom="1px"
      borderColor={borderColor}
      position="sticky"
      top={0}
      zIndex={10}
      boxShadow="sm"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between" maxW="container.xl" mx="auto">
        <Link to="/">
          <Heading size="md" cursor="pointer" color="brand.500">
            GGFit
          </Heading>
        </Link>

        <HStack gap={4}>
          <Link to="/">
            <Button variant="ghost" colorScheme="brand">Inicio</Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" colorScheme="brand">Perfil</Button>
          </Link>
          <Link to="/exercises">
            <Button variant="ghost" colorScheme="brand">Ejercicios</Button>
          </Link>
          <Link to="/leaderboard">
            <Button variant="ghost" colorScheme="brand">Clasificación</Button>
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar; 