import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/nav-bar";
import Rules from "../../components/rules";
import Main from "../../components/Waiting for Opponents Move/main";
import Moves from "../../components/moves";
import Loading from "../../components/Loading";
import { RpsFactory } from "../../components/library/rps";
import GameContext from "../../components/GameContext";
import ShiftingCountdown from "./ShiftingCountdown";

const WaitingForOpponentsMove = () => {
  const navigate = useNavigate();
  const {contractAddress} = useParams<string>()
  const {
    gameInfo,
    currentUser,
    loading,
    fetchGameInfo,
    getCurrentUser,
    handleRulesClick,
    setContractAddress,
    showRules,
  } = useContext(GameContext);
  const [move, setMove] = useState(gameInfo?.c2Move || 0);
  const { timeout, lastAction, player1, player2, stake } = gameInfo || {};

  const timeLeft = timeout && lastAction ? timeout - (Math.floor(Date.now() / 1000) - lastAction) : undefined;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (typeof contractAddress === "string" && stake !== undefined) {
      const contract = await RpsFactory.getReadWriteContract(contractAddress);
      await contract.JoinGame(move, ethers.parseEther(stake));
      navigate(`/play/${contractAddress}/ending-screen`)
    }
  };

  useEffect(() => {
    async function handleTimeOutOrZeroStake() {
      if (timeLeft &&  currentUser === player1 && stake !== "0.0" && timeLeft <= 0) {
        try {
          await (await RpsFactory.getReadWriteContract(contractAddress!)).TimeOutForPlayer2();
          navigate(`/play/${contractAddress}/ending-screen`);
        } catch (error) {
          console.error("Error solving contract:", error);
        }
      }
      if (stake === "0.0") {
        navigate(`/play/${contractAddress}/ending-screen`);
      }
    }
    handleTimeOutOrZeroStake();
  }, [timeLeft, stake, currentUser, player1, contractAddress, navigate]);

  useEffect(() => {
    if (!currentUser) {
      getCurrentUser();
    }
    if (typeof contractAddress === "string" && !contractAddress) {
      setContractAddress(contractAddress);
    }
    if (typeof contractAddress === "string" && !gameInfo) {
      fetchGameInfo(contractAddress);
    }
    }, [contractAddress, currentUser, fetchGameInfo, gameInfo, getCurrentUser, setContractAddress]);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-start overflow-hidden py-10 px-2.5 box-border text-center text-23xl-7 text-aliceblue font-aclonica">
      <NavBar onRulesClick={handleRulesClick} />
      <main className="w-full flex-1 flex flex-col items-center justify-center py-[50px] px-0 box-border gap-[50px] max-w-[650px] text-left text-5xl text-white font-aclonica">
        {loading || !gameInfo ? (
          <Loading />
        ) : (
          <div className="w-full items-center flex flex-col gap-4 max-w-[650px]">
            {currentUser === player1 ? (
              <>
                <div className="self-stretch relative">
                  Stake Amount: {stake} ETH
                </div>
                <Main />
              </>
            ) : currentUser === player2 ? (
              <>
                <div className="self-stretch relative">
                  Stake Amount: {stake} ETH
                </div>
                <div className="self-stretch relative">Time left:</div>
                {timeLeft && <ShiftingCountdown timeLeft={timeLeft} />}
                <form onSubmit={handleSubmit} className="w-full max-w-[650px]">
                  <Moves onClick={setMove} />
                </form>
              </>
            ) : !currentUser ? (
              <div className="self-stretch relative text-center">
                Connect your wallet
              </div>
            ) : (
              <div className="self-stretch relative text-center">
                You are not in the game
              </div>
            )}
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

export default WaitingForOpponentsMove;
