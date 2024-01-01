import type { NextPage } from "next";
import NavBar from "../components/nav-bar";
import Form, { FormState } from "../components/Game Creating Session/form";
import Rules from "../components/rules";
import { loadGame, saveGame } from "../components/library/useGameStorage";
import { useContext, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { deployContract } from "../components/library/web3";
import { useRouter } from "next/router";
import Button from "../components/button";
import GameContext from "../components/GameContext";

const GameCreatingSession: NextPage = () => {
  const [contractAddress, setContractAddress] = useState<string | null>(null);
  const [hasDeployed, setHasDeployed] = useState(false);
  const router = useRouter();
  const lastGame = loadGame();
  const { handleRulesClick, showRules } = useContext(GameContext);

  const onFormSubmit = async ({ salt, amount, opponent, move }: FormState) => {
    let contractAddress = null;
    try {
      contractAddress = await deployContract({
        salt,
        move,
        opponent,
        amount,
      });
      window.alert("Contract deployed successfully");
    } catch (e) {
      window.alert("Error deploying contract");
      console.error(e);
      return;
    }
    setContractAddress(contractAddress);
    setHasDeployed(true);
    saveGame({
      salt,
      move,
      contractAddress,
    });
  };

  const returnToLastGame = () => {
    router.push(`/play/${lastGame?.contractAddress}`);
  };

  useEffect(() => {
    hasDeployed ? router.push(`/play/${contractAddress}`) : null;
  }, [hasDeployed]);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-start py-10 px-2.5 box-border">
      <NavBar onRulesClick={handleRulesClick} />
      <Form onFormSubmit={onFormSubmit} />
      {lastGame && (
        <Button
          text="Return to last game"
          buttonPadding="20px 30px"
          onButtonClick={returnToLastGame}
        />
      )}
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

export default GameCreatingSession;
