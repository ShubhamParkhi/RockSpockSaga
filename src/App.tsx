import { motion } from "framer-motion";
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
        <motion.div
          initial="pageInitial"
          animate="pageAnimate"
          variants={{
            pageInitial: { opacity: 0 },
            pageAnimate: { opacity: 1 },
          }}
        >
          <GameProvider>
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/game-creating-session" element={<GameCreatingSession />} />
              <Route path="play/:contractAddress" element={<WaitingForOpponentsMove />} />
              <Route
                path="play/:contractAddress/ending-screen"
                element={<EndingScreen />}
              />
            </Routes>
          </GameProvider>
        </motion.div>
      </div>
    </Router>
  );
}

export default App;
