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
    CardHeader,
    Select,
    Image,
    useColorModeValue,
    Flex
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import '../global.css';
import leagueOfGraphsApi from '../services/leagueOfGraphsApi';
import type { Summoner, Match } from '../types/riot';

const Profile = () => {
    const [summonerName, setSummonerName] = useState('');
    const [region, setRegion] = useState('euw');
    const [loading, setLoading] = useState(false);
    const [summonerData, setSummonerData] = useState<Summoner | null>(null);
    const [matchHistory, setMatchHistory] = useState<Match[]>([]);
    const toast = useToast();

    const bgMain = useColorModeValue('gray.50', 'gray.900');
    const bgCard = useColorModeValue('white', 'gray.800');
    const textSecondary = useColorModeValue('gray.600', 'gray.300');
    const borderCard = useColorModeValue('gray.200', 'gray.700');
    const textMain = useColorModeValue('gray.800', 'white');

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
            const summoner = await leagueOfGraphsApi.getSummonerByName(summonerName);
            const matches = await leagueOfGraphsApi.getMatchHistory(summonerName, region);
            setSummonerData(summoner);
            setMatchHistory(matches);
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

    const getKDA = (kills: number, deaths: number, assists: number) => {
        if (deaths === 0) return (kills + assists).toFixed(2);
        return ((kills + assists) / deaths).toFixed(2);
    };

    return (
        <Flex direction="column" align="center" minH="100vh" width="100vw" bg={bgMain} justify="center">
            <Container maxW="container.md" className="card-centered">
                <VStack gap={8} align="center" width="100%">
                    <Box width="100%">
                        <Heading size="lg" mb={4} textAlign="center" color={textMain}>Perfil</Heading>
                        <Text color={textSecondary} textAlign="center">
                            Conecta tu cuenta de League of Legends para comenzar a ganar puntos
                        </Text>
                    </Box>

                    {!summonerData ? (
                        <Card width="100%" bg={bgCard} borderColor={borderCard} borderWidth={1}>
                            <CardBody>
                                <VStack gap={4}>
                                    <Input
                                        placeholder="Nombre de invocador"
                                        value={summonerName}
                                        onChange={(e) => setSummonerName(e.target.value)}
                                    />
                                    <Select
                                        value={region}
                                        onChange={(e) => setRegion(e.target.value)}
                                    >
                                        <option value="euw">Europa Oeste (EUW)</option>
                                        <option value="na">Norte América (NA)</option>
                                        <option value="eune">Europa Norte y Este (EUNE)</option>
                                        <option value="kr">Corea (KR)</option>
                                    </Select>
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
                            <Card bg={bgCard} borderColor={borderCard} borderWidth={1}>
                                <CardHeader>
                                    <Heading size="md" color={textMain}>Información del Invocador</Heading>
                                </CardHeader>
                                <CardBody>
                                    <VStack align="start" gap={4}>
                                        <HStack justify="space-between" width="100%">
                                            <Text fontWeight="bold" color={textMain}>Nombre:</Text>
                                            <Text color={textMain}>{summonerData.name}</Text>
                                        </HStack>
                                        <HStack justify="space-between" width="100%">
                                            <Text fontWeight="bold" color={textMain}>Nivel:</Text>
                                            <Text color={textMain}>{summonerData.summonerLevel}</Text>
                                        </HStack>
                                        <HStack justify="space-between" width="100%">
                                            <Text fontWeight="bold" color={textMain}>Región:</Text>
                                            <Text color={textMain}>{region.toUpperCase()}</Text>
                                        </HStack>
                                        <HStack justify="space-between" width="100%">
                                            <Text fontWeight="bold" color={textMain}>Partidas Recientes:</Text>
                                            <Badge colorScheme="blue">{matchHistory.length}</Badge>
                                        </HStack>
                                    </VStack>
                                </CardBody>
                            </Card>

                            <Card bg={bgCard} borderColor={borderCard} borderWidth={1}>
                                <CardHeader>
                                    <Heading size="md" color={textMain}>Últimas Partidas</Heading>
                                </CardHeader>
                                <CardBody>
                                    <VStack align="start" gap={4}>
                                        {matchHistory.slice(0, 5).map((match, index) => {
                                            const player = match.info.participants.find(p => p.summonerName === summonerData.name);
                                            if (!player) return null;
                                            return (
                                                <Box key={index} width="100%" p={2} borderWidth={1} borderRadius="md" borderColor={borderCard} bg={bgCard}>
                                                    <HStack justify="space-between">
                                                        <HStack>
                                                            <Image
                                                                src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${player.championName}.png`}
                                                                alt={player.championName}
                                                                boxSize="30px"
                                                                borderRadius="md"
                                                            />
                                                            <Text color={textMain}>{player.championName}</Text>
                                                        </HStack>
                                                        <Badge colorScheme={player.win ? "green" : "red"}>
                                                            {player.win ? "Victoria" : "Derrota"}
                                                        </Badge>
                                                    </HStack>
                                                    <HStack fontSize="sm" color={textSecondary} mt={1}>
                                                        <Text color={textSecondary}>KDA: {player.kills}/{player.deaths}/{player.assists}</Text>
                                                        <Text color={textSecondary}>({getKDA(player.kills, player.deaths, player.assists)})</Text>
                                                    </HStack>
                                                    <HStack fontSize="sm" color={textSecondary} mt={1}>
                                                        <Text color={textSecondary}>CS: {player.totalMinionsKilled + (player.neutralMinionsKilled || 0)}</Text>
                                                        <Text color={textSecondary}>Vision: {player.visionScore}</Text>
                                                    </HStack>
                                                </Box>
                                            );
                                        })}
                                    </VStack>
                                </CardBody>
                            </Card>
                        </SimpleGrid>
                    )}
                </VStack>
            </Container>
        </Flex>
    );
};

export default Profile; 