import type { NextPage } from "next";
import { useRouter } from "next/router";
import NavBar from "../../../components/nav-bar";
import Button from "../../../components/button";
import { useContext, useEffect, useState } from "react";
import Rules from "../../../components/rules";
import { AnimatePresence } from "framer-motion";
import Loading from "../../../components/Loading";
import { loadGame } from "../../../components/library/useGameStorage";
import GameContext from "../../../components/GameContext";

const EndingScreen: NextPage = () => {
  const { gameInfo, currentUser, handleRulesClick, getCurrentUser, showRules, fetchGameInfo } =
    useContext(GameContext);
  const router = useRouter();
  const url = router.asPath;
  const parts = url.split("/");
  const contractAddress = parts[2];

  const [winner, setWinner] = useState(false);
  const game = loadGame();
  const c1Move = game?.move || 0;

  useEffect(() => {
    if (!currentUser) {
      getCurrentUser();
    }
    fetchGameInfo(contractAddress);
  }, [contractAddress]);

  const onButtonClick = () => {
    router.push("/game-creating-session");
  };

  let { c2Move, player1, player2 } = gameInfo || {};

  useEffect(() => {
    if (!currentUser) {
      getCurrentUser();
    }

    if (c2Move !== undefined) {
      if (c1Move % 2 == c2Move % 2) {
        setWinner(c1Move < c2Move);
      } else {
        setWinner(c1Move > c2Move);
      }
    }
  }, [c2Move]);

  return (
    <div className="relative bg-gray-300 w-full h-screen flex flex-col items-center justify-start overflow-hidden py-10 px-2.5 box-border text-center text-23xl-7 text-aliceblue font-aclonica">
      <NavBar onRulesClick={handleRulesClick} />
      <main className="self-stretch flex-1 flex flex-col items-center justify-center py-[50px] px-0 gap-[25px] text-left text-[26px] text-white font-aclonica">
        {!currentUser && !winner ? (
          <Loading />
        ) : (
          <div className= "items-center justify-center flex flex-col gap-[25px]">
            <Loading />
            {currentUser === player1 && winner ? (
              <div className="relative">Congratulations You Won!</div>
            ) : currentUser === player2 && winner ? (
              <div className="relative">Better Luck Next Time!</div>
            ) : winner ? (
              <div className="relative">Player1 Won!</div>
            ) : (
              <div className="relative">Player2 Won!</div>
            )}
            <Button
              text="Play Again"
              buttonPadding="20px 30px"
              onButtonClick={onButtonClick}
            />
          </div>
        )}
      </main>
      <div className="text-center text-23xl-7 text-aliceblue font-aclonica [text-shadow:0px_0px_4px_#fff,_0px_0px_15px_rgba(255,_255,_255,_0.5)]">
        <p className="m-0">
          <span className="text-66xl-3">Rock Spock</span>
        </p>
        <p className="m-0 leading-[137.13%]">SAGA</p>
      </div>
      <AnimatePresence>
        {showRules && <Rules onClose={handleRulesClick} />}
      </AnimatePresence>
    </div>
  );
};

export default EndingScreen;
