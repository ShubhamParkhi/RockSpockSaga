import React, { FC, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import NavBar from '../../components/nav-bar';
import Rules from '../../components/rules';
import Main from '../../components/Waiting for Opponents Move/main';
import Moves from '../../components/moves';
import Loading from '../../components/Loading';
import { RpsFactory } from '../../components/library/rps';
import GameContext from '../../components/GameContext';

interface WaitingForOpponentsMoveProps {
    contractAddress: string;
  }
  
  const WaitingForOpponentsMove: FC<WaitingForOpponentsMoveProps> = ({ contractAddress }: WaitingForOpponentsMoveProps) => {
  const router = useRouter();
  const { gameInfo, currentUser, loading, fetchGameInfo, getCurrentUser, handleRulesClick, setContractAddress, showRules } = useContext(GameContext);
  const [move, setMove] = useState(gameInfo?.c2Move || 0);
  const { player1, player2, stake } = gameInfo || {};

  // Update the contract with the move of player 2
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (typeof contractAddress === 'string' && stake !== undefined) {
      const contract = await RpsFactory.getReadWriteContract(contractAddress);
      await contract.JoinGame(move, ethers.parseEther(stake));
      router.push('/play/[contractAddress]/ending-screen', `/play/${contractAddress}/ending-screen`);
    }
  };

  useEffect(() => {
    if (stake === '0.0') {
        router.push('/play/[contractAddress]/ending-screen', `/play/${contractAddress}/ending-screen`);
    }
  }, [stake]);

  useEffect(() => {
    if (!currentUser) {
      getCurrentUser();
    }
    if (typeof contractAddress === 'string') {
      setContractAddress(contractAddress);
      fetchGameInfo(contractAddress);
    }
  }, [contractAddress]);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-start overflow-hidden py-10 px-2.5 box-border text-center text-23xl-7 text-aliceblue font-aclonica">
      <NavBar onRulesClick={handleRulesClick} />
      <main className="w-full flex-1 flex flex-col items-center justify-center py-[50px] px-0 box-border gap-[50px] max-w-[650px] text-left text-5xl text-white font-aclonica">
      {loading || !gameInfo ? (
          <Loading />
        ) : (
          <div className="w-full items-center flex flex-col gap-8 max-w-[650px]">
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
                <form onSubmit={handleSubmit} className="w-full max-w-[650px]">
                  <Moves onClick={setMove} />
                </form>
              </>
            ) : !currentUser ?(
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
