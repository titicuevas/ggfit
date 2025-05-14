import { Box, Flex, Button, HStack, useColorModeValue, Image, IconButton, useColorMode } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const { colorMode, toggleColorMode } = useColorMode();

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
          <Image src="/ggfit.png" alt="GGFit Logo" height="40px" width="40px" borderRadius="full" cursor="pointer" />
        </Link>

        <HStack gap={4} alignItems="center">
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
          <IconButton
            aria-label="Cambiar modo de color"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            fontSize="xl"
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar; 