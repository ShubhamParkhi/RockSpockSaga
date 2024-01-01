import type { NextPage } from "next";
import { FormEvent, memo, useMemo, useState } from "react";
import Button from "../button";
import Moves from "../moves";
import { motion } from "framer-motion";
import {BigNumberish, ethers} from "ethers";

export interface FormState {
  salt: number;
  move: number;
  opponent: string;
  amount: BigNumberish;
}

interface FormProps {
  onFormSubmit: (formState: FormState) => void;
}

const Form: NextPage<FormProps> = memo(({onFormSubmit}: FormProps) => {
  const [opponent, setOpponent] = useState("");
  const [amount, setAmount] = useState<BigNumberish>(0);
  const [showMoves, setShowMoves] = useState(false);
  const [move, setMove] = useState(0);

  const onValueChange = (val: string) => {
    const ethVal = ethers.parseEther(val);
    setAmount(ethVal);
  };

  const onButtonClick = () => {
    setShowMoves(true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (isValid) {
      const salt = generateSecureRandomSalt();
      onFormSubmit({ salt, move, opponent, amount});
    }
  };
  
  const generateSecureRandomSalt = (): number => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0];
  };
  
  const isValid = useMemo(() => validateInput(move, opponent), [move, opponent]);

  return (
    <form onSubmit={handleSubmit} className="w-full flex-1 flex flex-col items-center justify-center py-[50px] px-0 box-border gap-[33.33px] max-w-[650px]">
      {!showMoves && (
        <section className="self-stretch flex flex-col items-center justify-center gap-[33px]">
          <motion.input
            className="[outline:none] font-aclonica text-base bg-gray-200 self-stretch rounded-3xs [backdrop-filter:blur(10px)] flex flex-row items-center justify-center py-5 px-[15px] placeholder-aliceblue text-white border-[2px] border-solid border-white"
            placeholder="Opponent’s Wallet Address"
            type="text"
            onChange={(e) => setOpponent(e.target.value)}
            whileHover={{
              boxShadow:
                "0px 0px 6px #fff, 0px 0px 10px rgba(255, 255, 255, 0.5)",
            }}
            whileFocus={{
              boxShadow:
                "0px 0px 6px #fff, 0px 0px 10px rgba(255, 255, 255, 0.5)",
            }}
          />
          <motion.input
            className="[outline:none] font-aclonica text-base bg-gray-200 self-stretch rounded-3xs [backdrop-filter:blur(10px)] flex flex-row items-center justify-center py-5 px-[15px] placeholder-aliceblue text-white border-[2px] border-solid border-white"
            placeholder="Stake Amount"
            type="number"
            step="0.0001"
            onChange={(e) => onValueChange(e.target.value)}
            whileHover={{
              boxShadow:
                "0px 0px 6px #fff, 0px 0px 10px rgba(255, 255, 255, 0.5)",
            }}
            whileFocus={{
              boxShadow:
                "0px 0px 6px #fff, 0px 0px 10px rgba(255, 255, 255, 0.5)",
            }}
          />
          <Button
            text="Create Game"
            buttonPadding="20px 30px"
            onButtonClick={onButtonClick}
            disabled={!opponent || amount === 0}
          />
        </section>
      )}
      {showMoves && <Moves onClick={setMove}/>}
    </form>
  );
});

const validateInput = (move: number, opponent: string) => {
  return move > 0 && opponent.length > 0;
};

export default Form;
