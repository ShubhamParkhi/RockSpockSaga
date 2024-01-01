import React, { createContext, useState, useEffect } from "react";
import { RpsFactory } from "../components/library/rps";
import { GameInfo } from "./types/gameInfo";
import { getProvider, getSigner } from "./library/web3";

interface GameContextData {
  currentUser: string | null;
  contractAddress: string | null;
  gameInfo: GameInfo | undefined;
  loading: boolean;
  showRules: boolean;
  setContractAddress: React.Dispatch<React.SetStateAction<string | null>>;
  setGameInfo: React.Dispatch<React.SetStateAction<GameInfo | undefined>>;
  fetchGameInfo: (contractAddress: string) => void;
  getCurrentUser: () => void;
  handleRulesClick: () => void;
}

const GameContext = createContext<GameContextData>({
  currentUser: null,
  contractAddress: null,
  gameInfo: undefined,
  loading: false,
  showRules: false,
  setContractAddress: () => {},
  setGameInfo: () => {},
  fetchGameInfo: () => {},
  getCurrentUser: () => {},
  handleRulesClick: () => {},
});

declare global {
  interface Window {
    ethereum: any;
  }
}

// Provider component to wrap your application
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [contractAddress, setContractAddress] = useState<string | null>(null);
  const [gameInfo, setGameInfo] = useState<GameInfo | undefined>();
  const [loading, setLoading] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const fetchGameInfo = async (contractAddress: string) => {
    setLoading(true);
    try {
      const contract = await RpsFactory.getReadWriteContract(contractAddress);
      const fetchedGameInfo = await contract.GetGameInfo();
      setGameInfo(fetchedGameInfo);
    } catch (error) {
      console.error("Failed to fetch game info", error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUser = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        const provider = getProvider();
        const signer = await getSigner();
        setCurrentUser(await signer.getAddress());
      } catch (error) {
        console.error("Failed to connect the wallet");
      }
    } else {
      console.log("Please install MetaMask!");
    }
  };

  const handleRulesClick = () => {
    setShowRules(!showRules);
  };

  const contextValue = {
    currentUser,
    contractAddress,
    gameInfo,
    loading,
    showRules,
    setContractAddress,
    setGameInfo,
    fetchGameInfo,
    getCurrentUser,
    handleRulesClick,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export default GameContext;
