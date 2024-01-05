import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface RulesProps {
  onClose: () => void;
}

const Rules: React.FC<RulesProps> = memo(({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4 }}
      onClick={onClose}
      className="bg-gray-400 [backdrop-filter:blur(10px)] fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center py-0 px-[95px] box-border text-center text-5xl text-white font-aclonica"
    >
      <div className="rounded-[27px] bg-gray-300 [backdrop-filter:blur(25px)] box-border w-[480px] h-[270px] shrink-0 flex flex-col items-start justify-start p-[25px] relative gap-[15px] border-[2.5px] border-solid border-white">
        <div className="self-stretch flex flex-row items-center justify-between">
          <div className="relative">Rules:</div>
          <button
            className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-5xl font-aclonica text-white text-center inline-block"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className="flex-1 relative text-base text-left flex items-center">
          <span className="w-full">
            <p className="m-0">Rock crushes Lizard</p>
            <p className="m-0">Lizard poisons Spock</p>
            <p className="m-0">Spock smashes Scissors</p>
            <p className="m-0">Scissors decapitates Lizard</p>
            <p className="m-0">Lizard eats Paper</p>
            <p className="m-0">Spock vapourizes Rock</p>
            <p className="m-0">And basic Rock Paper Scissor Rules</p>
          </span>
        </div>
        <img
          className="absolute my-0 mx-[!important] top-[calc(50%_-_100px)] left-[calc(50%_-_100px)] w-[200px] h-[200px] object-cover z-[2]"
          width={200}
          height={200}
          alt="Logo"
          src="/Logobg.png"
          draggable={false}
        />
      </div>
    </motion.div>
  );
});

export default Rules;
