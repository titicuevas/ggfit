import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Componentes
import Navbar from './components/Navbar';

// Páginas
import Home from './pages/Home';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Exercises from './pages/Exercises';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/exercises" element={<Exercises />} />
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
