import React from 'react';
import { motion } from 'framer-motion';

interface IProps {
  onClick: (value: number) => void;
}

const Moves: React.FC<IProps> = (props) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="self-stretch flex flex-1 h-full flex-col items-center justify-center gap-4 px-0 text-center text-5xl text-white font-aclonica"
    >
      <div className="relative">Choose Wisely:</div>
      <div className="self-stretch flex flex-row items-end justify-between">
        <button
          className="cursor-pointer [border:none] p-0 bg-[transparent] shrink-0 flex flex-col items-center justify-end gap-[10px] no-underline"
          onClick={(e) => props.onClick && props.onClick(Number((e.currentTarget as HTMLButtonElement).value))}
          value="1"
        >
          <img
            className="relative object-cover"
            width={74}
            height={158.7}
            alt="Rock"
            src="/Rock.png"
            draggable={false}
          />
          <div className="relative text-base font-aclonica text-white text-center">
            Rock
          </div>
        </button>
        <button
          className="cursor-pointer [border:none] p-0 bg-[transparent] shrink-0 flex flex-col items-center justify-end gap-[10px] no-underline"
          onClick={(e) =>
            props.onClick &&
            props.onClick(Number((e.currentTarget as HTMLButtonElement).value))
          }
          value="2"
        >
          <img
            className="relative object-cover"
            width={113.2}
            height={200}
            alt="Paper"
            src="/Paper.png"
            draggable={false}
          />
          <div className="relative text-base font-aclonica text-white text-center">
            Paper
          </div>
        </button>
        <button
          className="cursor-pointer [border:none] p-0 bg-[transparent] shrink-0 flex flex-col items-center justify-end gap-[10px] no-underline"
          onClick={(e) =>
            props.onClick &&
            props.onClick(Number((e.currentTarget as HTMLButtonElement).value))
          }
          value="3"
        >
          <img
            className="relative object-cover"
            width={61.7}
            height={191.1}
            alt="Scissors"
            src="/Scissors.png"
            draggable={false}
          />
          <div className="relative text-base font-aclonica text-white text-center">
            Scissors
          </div>
        </button>
        <button
          className="cursor-pointer [border:none] p-0 bg-[transparent] shrink-0 flex flex-col items-center justify-end gap-[10px] no-underline"
          onClick={(e) =>
            props.onClick &&
            props.onClick(Number((e.currentTarget as HTMLButtonElement).value))
          }
          value="4"
        >
          <img
            className="relative object-cover"
            width={68.9}
            height={186.8}
            alt="Lizard"
            src="/Lizard.png"
            draggable={false}
          />
          <div className="relative text-base font-aclonica text-white text-center">
            Lizard
          </div>
        </button>
        <button
          className="cursor-pointer [border:none] p-0 bg-[transparent] shrink-0 flex flex-col items-center justify-end gap-[10px] no-underline"
          onClick={(e) =>
            props.onClick &&
            props.onClick(Number((e.currentTarget as HTMLButtonElement).value))
          }
          value="5"
        >
          <img
            className="relative object-cover"
            width={91.5}
            height={195.7}
            alt="Spock"
            src="/Spock.png"
            draggable={false}
          />
          <div className="relative text-base font-aclonica text-white text-center">
            Spock
          </div>
        </button>
      </div>
    </motion.section>
  );
};

export default Moves;
