import { useState } from 'react';
import {
    Box,
    Heading,
    Text,
    VStack,
    HStack,
    Button,
    Input,
    Badge,
    SimpleGrid,
    Container,
    Card,
    CardBody,
    CardHeader
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import '../global.css';
import riotApi from '../services/riotApi';
import type { Summoner } from '../types/riot';

const Profile = () => {
    const [summonerName, setSummonerName] = useState('');
    const [loading, setLoading] = useState(false);
    const [summonerData, setSummonerData] = useState<Summoner | null>(null);
    const toast = useToast();

    const handleConnect = async () => {
        if (!summonerName) {
            toast({
                title: 'Error',
                description: 'Por favor, ingresa un nombre de invocador',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setLoading(true);
        try {
            const summoner = await riotApi.getSummonerByName(summonerName);
            setSummonerData(summoner);
            toast({
                title: '¡Conexión exitosa!',
                description: `Bienvenido, ${summoner.name}`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error al conectar:', error);
            toast({
                title: 'Error',
                description: 'No se pudo conectar con la cuenta de League of Legends',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="main-centered">
            <Container maxW="container.md" className="card-centered">
                <VStack gap={8} align="center" width="100%">
                    <Box width="100%">
                        <Heading size="lg" mb={4} textAlign="center">Perfil</Heading>
                        <Text color="gray.600" textAlign="center">
                            Conecta tu cuenta de League of Legends para comenzar a ganar puntos
                        </Text>
                    </Box>

                    {!summonerData ? (
                        <Card width="100%">
                            <CardBody>
                                <VStack gap={4}>
                                    <Input
                                        placeholder="Nombre de invocador"
                                        value={summonerName}
                                        onChange={(e) => setSummonerName(e.target.value)}
                                    />
                                    <Button
                                        colorScheme="blue"
                                        width="100%"
                                        onClick={handleConnect}
                                        isLoading={loading}
                                        disabled={!summonerName || loading}
                                    >
                                        Conectar Cuenta
                                    </Button>
                                </VStack>
                            </CardBody>
                        </Card>
                    ) : (
                        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} width="100%">
                            <Card>
                                <CardHeader>
                                    <Heading size="md">Información del Invocador</Heading>
                                </CardHeader>
                                <CardBody>
                                    <VStack align="start" gap={4}>
                                        <HStack justify="space-between" width="100%">
                                            <Text fontWeight="bold">Nombre:</Text>
                                            <Text>{summonerData.name}</Text>
                                        </HStack>
                                        <HStack justify="space-between" width="100%">
                                            <Text fontWeight="bold">Nivel:</Text>
                                            <Text>{summonerData.summonerLevel}</Text>
                                        </HStack>
                                        <HStack justify="space-between" width="100%">
                                            <Text fontWeight="bold">Ejercicios Completados:</Text>
                                            <Badge colorScheme="green">0</Badge>
                                        </HStack>
                                        <HStack justify="space-between" width="100%">
                                            <Text fontWeight="bold">Puntos Totales:</Text>
                                            <Badge colorScheme="blue">0</Badge>
                                        </HStack>
                                    </VStack>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <Heading size="md">Historial de Ejercicios</Heading>
                                </CardHeader>
                                <CardBody>
                                    <Text color="gray.500">No hay ejercicios registrados aún</Text>
                                </CardBody>
                            </Card>
                        </SimpleGrid>
                    )}
                </VStack>
            </Container>
        </main>
    );
};

export default Profile; 