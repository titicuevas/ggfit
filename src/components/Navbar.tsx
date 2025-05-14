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
      <Flex h={{ base: 12, md: 16 }} alignItems="center" justifyContent="space-between" maxW="container.xl" mx="auto" px={{ base: 2, md: 0 }}>
        <Link to="/">
          <Image src="/ggfit.png" alt="GGFit Logo" height={{ base: '32px', md: '40px' }} width={{ base: '32px', md: '40px' }} borderRadius="full" cursor="pointer" />
        </Link>

        <HStack gap={{ base: 1, md: 4 }} alignItems="center" overflowX={{ base: 'auto', md: 'visible' }}>
          <Link to="/">
            <Button variant="ghost" colorScheme="brand" size={{ base: 'sm', md: 'md' }}>Inicio</Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" colorScheme="brand" size={{ base: 'sm', md: 'md' }}>Perfil</Button>
          </Link>
          <Link to="/exercises">
            <Button variant="ghost" colorScheme="brand" size={{ base: 'sm', md: 'md' }}>Ejercicios</Button>
          </Link>
          <Link to="/leaderboard">
            <Button variant="ghost" colorScheme="brand" size={{ base: 'sm', md: 'md' }}>Clasificación</Button>
          </Link>
          <IconButton
            aria-label="Cambiar modo de color"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            fontSize="xl"
            size={{ base: 'sm', md: 'md' }}
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar; 