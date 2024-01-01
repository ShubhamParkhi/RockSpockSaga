import type { NextPage } from "next";
import { memo, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "../button";
import GameContext from "../GameContext";
import { RpsFactory } from "../library/rps";
import { loadGame } from "../library/useGameStorage";
import { useRouter } from "next/router";

const Main: NextPage = memo(() => {
  const { gameInfo, contractAddress } = useContext(GameContext);
  const c2Move = gameInfo?.c2Move;
  const game = loadGame();
  const move = game?.move || 0;
  const salt = game?.salt || 0;
  const havePlayed = (c2Move !== 0);
  const router = useRouter();

  const onButtonClick = () => {
    navigator.clipboard.writeText(window.location.href);
    window.alert(
      "Your link has been copied to clipboard. Share it with a friend to play his move"
    );
  };

  async function handleSolve() {
    if (typeof contractAddress === "string") {
      try {
        await (await RpsFactory.getReadWriteContract(contractAddress!)).Solve(move, salt);
        router.push(`/play/${contractAddress}/ending-screen`);
      } catch (error) {
        console.error("Error solving contract:", error);
      }
    }
  }

  useEffect(() => {
    if (havePlayed) {
      handleSolve();
    }
  }, [havePlayed]);

  return (
    <>
      <div className="self-stretch relative text-center">
        Waiting for Opponent’s Move
      </div>
      <Button
        text="Copy Game link"
        buttonPadding="20px 30px"
        onButtonClick={onButtonClick}
      />
      <div className="self-stretch h-[100px] overflow-hidden shrink-0 flex flex-row items-center justify-between">
        <motion.div
          animate={{ rotate: [10, -10] }}
          transition={{ duration: 0.3, repeat: Infinity, repeatType: "mirror" }}
        >
          <Image
            className="relative object-cover"
            width={158.7}
            height={74}
            alt="Player 1's Move"
            src="/vector5@2x.png"
            draggable={false}
          />
        </motion.div>
        <motion.div
          animate={{ rotate: [-10, 10] }}
          transition={{
            duration: 0.29,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          <Image
            className="relative object-cover"
            width={158.7}
            height={74}
            alt="Player 2's Move"
            src="/vector6@2x.png"
            draggable={false}
          />
        </motion.div>
      </div>
    </>
  );
});

export default Main;
