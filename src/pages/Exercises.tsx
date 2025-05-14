import { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  Image,
  Container,
  Alert,
  AlertIcon,
  AlertTitle,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Flex
} from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { useToast } from '@chakra-ui/toast';
import { Card, CardBody, CardFooter } from '@chakra-ui/card';
import '../global.css';
import type { Exercise } from '../types';
import { exercises } from '../data/exercises';
import { supabase } from '../supabaseClient';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const getTodayKey = () => {
  const today = new Date();
  return today.toISOString().slice(0, 10); // YYYY-MM-DD
};

function shuffleArray(array: any[]) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

const Exercises = () => {
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>(exercises);
  const [allCompleted, setAllCompleted] = useState(false);
  const [username, setUsername] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);
  const [loggedUser, setLoggedUser] = useState<string | null>(null);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const bgMain = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textMain = useColorModeValue('gray.800', 'white');
  const textSecondary = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const [loginMode, setLoginMode] = useState(false);
  const [carouselExercises, setCarouselExercises] = useState<Exercise[]>([]);
  const alertText = useColorModeValue('gray.800', 'white');
  const alertBg = useColorModeValue('green.100', 'green.700');
  const alertInfoBg = useColorModeValue('blue.50', 'blue.900');

  useEffect(() => {
    const todayKey = getTodayKey();
    const storedUser = localStorage.getItem('loggedUser');
    if (storedUser) {
      setLoggedUser(storedUser);
      // Recuperar progreso y puntos desde Supabase
      (async () => {
        const { data, error } = await supabase
          .from('users')
          .select('total_points, completed_today, last_completed_date')
          .eq('username', storedUser)
          .single();
        if (data) {
          setTotalPoints(data.total_points || 0);
          if (data.last_completed_date === todayKey && data.completed_today) {
            const completedIds = JSON.parse(data.completed_today);
            setSelectedExercises(exercises.map(ex => ({ ...ex, completed: completedIds.includes(ex.id) })));
          } else {
            // Resetear progreso diario en Supabase si la fecha no es hoy
            await supabase.from('users').update({ completed_today: JSON.stringify([]), last_completed_date: todayKey }).eq('username', storedUser);
            setSelectedExercises(exercises.map(ex => ({ ...ex, completed: false })));
          }
        }
      })();
    } else {
      // Si no hay usuario logueado, usar localStorage
      const saved = localStorage.getItem('completedExercises_' + todayKey);
      if (saved) {
        const completedIds = JSON.parse(saved);
        setSelectedExercises(exercises.map(ex => ({ ...ex, completed: completedIds.includes(ex.id) })));
      } else {
        setSelectedExercises(exercises.map(ex => ({ ...ex, completed: false })));
      }
      setTotalPoints(Number(localStorage.getItem('totalPoints') || 0));
    }
  }, []);

  useEffect(() => {
    const todayKey = getTodayKey();
    const completedIds = selectedExercises.filter(ex => ex.completed).map(ex => ex.id);
    setAllCompleted(selectedExercises.every(ex => ex.completed));
    if (!loggedUser) {
      localStorage.setItem('completedExercises_' + todayKey, JSON.stringify(completedIds));
    }
  }, [selectedExercises, loggedUser]);

  useEffect(() => {
    setCarouselExercises(shuffleArray(exercises));
  }, []);

  const handleComplete = async (exerciseId: string) => {
    // Buscar el ejercicio en el estado actual
    const currentExercise = selectedExercises.find(ex => ex.id === exerciseId);
    if (!currentExercise || currentExercise.completed) return;
    const exercise = exercises.find(ex => ex.id === exerciseId);
    if (!exercise) return;

    setSelectedExercises(prev =>
      prev.map(ex =>
        ex.id === exerciseId ? { ...ex, completed: true } : ex
      )
    );
    if (exercise) {
      if (loggedUser) {
        // Actualizar puntos y progreso en Supabase
        const todayKey = getTodayKey();
        // Obtener datos actuales
        const { data } = await supabase
          .from('users')
          .select('total_points, completed_today, last_completed_date')
          .eq('username', loggedUser)
          .single();
        let completedIds: string[] = [];
        let newTotal = (data?.total_points || 0);
        if (data?.last_completed_date === todayKey && data?.completed_today) {
          completedIds = JSON.parse(data.completed_today);
        }
        if (!completedIds.includes(exerciseId)) {
          completedIds.push(exerciseId);
          newTotal += exercise.points;
        }
        setTotalPoints(newTotal);
        await supabase.from('users').update({
          total_points: newTotal,
          completed_today: JSON.stringify(completedIds),
          last_completed_date: todayKey
        }).eq('username', loggedUser);
      } else {
        // LocalStorage para usuarios no logueados
        const prevPoints = Number(localStorage.getItem('totalPoints') || 0);
        localStorage.setItem('totalPoints', String(prevPoints + exercise.points));
        setTotalPoints(prevPoints + exercise.points);
      }
    }
    toast({
      title: '¡Ejercicio completado!',
      description: 'Has ganado puntos por completar este ejercicio.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleShowRegister = () => {
    onOpen();
  };

  const handleRegister = async () => {
    if (!username) return;
    setRegisterLoading(true);
    // Comprobar si el usuario ya existe
    const { data: existingUser } = await supabase.from('users').select('username').eq('username', username).single();
    if (existingUser) {
      setRegisterLoading(false);
      toast({
        title: 'Usuario ya registrado',
        description: 'Ese usuario ya está registrado. ¿Quieres iniciar sesión?',
        status: 'info',
        duration: 4000,
        isClosable: true,
      });
      setLoginMode(true);
      return;
    }
    // Guardar usuario en Supabase
    const { error } = await supabase.from('users').insert([{ username, total_points: 0, completed_today: JSON.stringify([]), last_completed_date: getTodayKey() }]);
    setRegisterLoading(false);
    if (error) {
      toast({
        title: 'Error al registrar',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: '¡Registro exitoso!',
        description: 'Ya puedes entrar en la clasificación global.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      localStorage.setItem('loggedUser', username);
      setLoggedUser(username);
      setTotalPoints(0);
      onClose();
      setUsername('');
      setLoginMode(false);
    }
  };

  const handleLogin = async () => {
    if (!username) return;
    setRegisterLoading(true);
    const { data: user, error } = await supabase.from('users').select('username').eq('username', username).single();
    setRegisterLoading(false);
    if (user) {
      toast({
        title: '¡Login exitoso!',
        description: 'Bienvenido de nuevo.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      localStorage.setItem('loggedUser', username);
      setLoggedUser(username);
      setTotalPoints(0); // Se actualizará en useEffect
      onClose();
      setUsername('');
      setLoginMode(false);
    } else {
      toast({
        title: 'Usuario no encontrado',
        description: 'Ese usuario no existe. Regístrate primero.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    setLoggedUser(null);
    setTotalPoints(0);
    setSelectedExercises(exercises.map(ex => ({ ...ex, completed: false })));
  };

  return (
    <Flex direction="column" align="center" minH="100vh" width="100vw" bg={bgMain} justify="center">
      <Container maxW="container.xl" p={0}>
        <VStack gap={8} align="center" width="100%">
          <Box width="100%">
            <Heading size="lg" mb={4} textAlign="center" color={textMain}>Ejercicios Disponibles</Heading>
            <Text color={textSecondary} textAlign="center">
              Completa ejercicios para ganar puntos y mejorar tu rendimiento en el juego.
            </Text>
          </Box>

          {/* Mostrar usuario logueado */}
          {loggedUser && (
            <Alert status="success" borderRadius="md" bg={alertBg} color={alertText}>
              <AlertIcon />
              <Box flex="1">
                ¡Bienvenido, <b>{loggedUser}</b>! Estás logueado. Puntos totales: <b>{totalPoints}</b>
                <Button ml={4} size="sm" colorScheme="red" onClick={handleLogout}>
                  Cerrar sesión
                </Button>
              </Box>
            </Alert>
          )}

          {/* Banner de registro solo si no está logueado */}
          {!loggedUser && (
            <Box width="100%" maxW="1200px" mx="auto">
              <Alert status="info" borderRadius="md" bg={alertInfoBg} color={alertText}>
                <AlertIcon />
                <Box flex="1">
                  ¿Quieres competir en la clasificación global?&nbsp;
                  <Button colorScheme="green" size="sm" ml={2} onClick={handleShowRegister}>
                    ¡Regístrate y entra en la clasificación!
                  </Button>
                </Box>
              </Alert>
            </Box>
          )}

          {/* Modal de registro/login */}
          <Modal isOpen={isOpen} onClose={() => { onClose(); setLoginMode(false); }} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{loginMode ? 'Iniciar sesión' : 'Registro de usuario'}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  placeholder="Nombre de usuario"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  autoFocus
                />
              </ModalBody>
              <ModalFooter>
                {loginMode ? (
                  <>
                    <Button colorScheme="blue" mr={3} onClick={handleLogin} isLoading={registerLoading}>
                      Iniciar sesión
                    </Button>
                    <Button variant="ghost" onClick={() => setLoginMode(false)}>Volver a registro</Button>
                  </>
                ) : (
                  <>
                    <Button colorScheme="blue" mr={3} onClick={handleRegister} isLoading={registerLoading}>
                      Registrarse
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                  </>
                )}
              </ModalFooter>
            </ModalContent>
          </Modal>

          {allCompleted && (
            <Alert status="success" borderRadius="md">
              <AlertIcon />
              <AlertTitle>¡Has completado todos los ejercicios del día! ¡Buen trabajo, tus partidas hoy han sido duras!</AlertTitle>
            </Alert>
          )}

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} className="card-centered">
            {selectedExercises.map((exercise) => (
              <Card
                key={exercise.id}
                bg={cardBg}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="lg"
                overflow="hidden"
                transition="transform 0.2s"
                _hover={{ transform: 'scale(1.02)' }}
                minH="420px"
              >
                {exercise.imageUrl && (
                  <Image
                    src={exercise.imageUrl}
                    alt={exercise.name}
                    height="200px"
                    width="100%"
                    objectFit="cover"
                  />
                )}
                <CardBody>
                  <VStack align="start" gap={2}>
                    <HStack justify="space-between" width="100%">
                      <Heading size="md" color={textMain}>{exercise.name}</Heading>
                      <Badge colorScheme={exercise.difficulty === 'Fácil' ? 'green' : exercise.difficulty === 'Media' ? 'yellow' : 'red'}>
                        {exercise.difficulty.toUpperCase()}
                      </Badge>
                    </HStack>
                    <Text color={textSecondary}>{exercise.description}</Text>
                    <HStack fontSize="sm" color={textSecondary}>
                      <Text>Duración: {exercise.duration} min</Text>
                      <Text>Calorías: {exercise.calories}</Text>
                    </HStack>
                  </VStack>
                </CardBody>
                <CardFooter>
                  <Button
                    colorScheme={exercise.completed ? 'gray' : 'blue'}
                    variant={exercise.completed ? 'solid' : 'outline'}
                    width="100%"
                    onClick={() => handleComplete(exercise.id)}
                    disabled={exercise.completed}
                    _disabled={{
                      bg: '#e2e8f0',
                      color: '#4a5568',
                      borderColor: '#cbd5e1',
                      cursor: 'not-allowed',
                      boxShadow: 'none',
                      opacity: 1
                    }}
                  >
                    {exercise.completed ? 'Completado' : 'Completar'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Flex>
  );
};

export default Exercises; 