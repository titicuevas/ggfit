import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  Input,
  FormControl,
  FormLabel,
  useToast,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid
} from '@chakra-ui/react';

const Profile = () => {
  const [summonerName, setSummonerName] = useState('');
  const toast = useToast();

  const handleConnect = () => {
    // Aquí irá la lógica para conectar con la API de Riot
    toast({
      title: 'Conexión exitosa',
      description: 'Tu cuenta ha sido conectada correctamente',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Tu Perfil
        </Heading>

        <Card>
          <CardBody>
            <VStack spacing={6}>
              <FormControl>
                <FormLabel>Nombre de Invocador</FormLabel>
                <Input
                  placeholder="Ingresa tu nombre de invocador"
                  value={summonerName}
                  onChange={(e) => setSummonerName(e.target.value)}
                />
              </FormControl>
              <Button
                colorScheme="blue"
                onClick={handleConnect}
                isDisabled={!summonerName}
              >
                Conectar Cuenta
              </Button>
            </VStack>
          </CardBody>
        </Card>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Nivel Actual</StatLabel>
                <StatNumber>1</StatNumber>
                <StatHelpText>¡Sigue ejercitándote!</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Ejercicios Completados</StatLabel>
                <StatNumber>0</StatNumber>
                <StatHelpText>Este mes</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Puntos Totales</StatLabel>
                <StatNumber>0</StatNumber>
                <StatHelpText>Acumulados</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        <Card>
          <CardBody>
            <Heading size="md" mb={4}>
              Historial de Ejercicios
            </Heading>
            <Text>No hay ejercicios registrados aún.</Text>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};

export default Profile; 