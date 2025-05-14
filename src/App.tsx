import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, useColorModeValue, ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import 'bootstrap/dist/css/bootstrap.min.css';

// Componentes
import Navbar from './components/Navbar';

// Páginas
import Home from './pages/Home';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Exercises from './pages/Exercises';

function App() {
  const bgGlobal = useColorModeValue('gray.50', 'gray.900');
  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg={bgGlobal}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </Router>
      </Box>
    </ChakraProvider>
  );
}

export default App;
