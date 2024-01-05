import { AnimatePresence, motion } from "framer-motion";
import { GameProvider } from "./components/GameContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameCreatingSession from "./components/Game Creating Session/GameCreatingSession";
import SplashScreen from "./components/Splash Screen/splashscreen";
import WaitingForOpponentsMove from "./components/Waiting for Opponents Move/WaitingForOpponentsMove";
import EndingScreen from "./components/Ending Screen/EndingScreen";

function App() {
  return (
    <Router>
      <div className="bg-[url('../public/bg.png')] bg-cover bg-no-repeat bg-[top] select-none">
        <GameProvider>
          <AnimatePresence>
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route
                path="/game-creating-session"
                element={
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <GameCreatingSession />
                  </motion.div>
                }
              />
              <Route
                path="play/:contractAddress"
                element={
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <WaitingForOpponentsMove />
                  </motion.div>
                }
              />
              <Route
                path="play/:contractAddress/ending-screen"
                element={
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <EndingScreen />
                  </motion.div>
                }
              />
            </Routes>
          </AnimatePresence>
        </GameProvider>
      </div>
    </Router>
  );
}

export default App;
