import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { GameProvider } from './context/GameContext';
import SplashPage from './pages/SplashPage/SplashPage';
import HomePage from './pages/HomePage/HomePage';
import GamePage from './pages/GamePage/GamePage';
import ScorePage from './pages/ScorePage/ScorePage';
import CreditsPage from './pages/CreditsPage/CreditsPage';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"        element={<SplashPage />} />
        <Route path="/home"    element={<HomePage />} />
        <Route path="/game"    element={<GamePage />} />
        <Route path="/score"   element={<ScorePage />} />
        <Route path="/credits" element={<CreditsPage />} />
        <Route path="*"        element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AnimatedRoutes />
    </GameProvider>
  );
}
