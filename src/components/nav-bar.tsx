import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/button';
import GameContext from './GameContext';

interface NavBarProps {
  onRulesClick: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onRulesClick }) => {
  const { getCurrentUser, currentUser } = useContext(GameContext);

  return (
    <div className="rounded-xl bg-gray-200 [backdrop-filter:blur(10px)] box-border max-w-[1720px] w-full flex flex-row items-center justify-between py-2.5 px-[24px] text-left text-5xl text-aliceblue font-aclonica">
      <Link
        className="flex flex-row items-center justify-center py-[5px] px-0 gap-[10px] no-underline"
        to="/"
      >
        <img
          className="relative w-[60px] h-[60px] overflow-hidden shrink-0 object-cover"
          width={60}
          height={60}
          alt="Logo"
          src="/Logo.png"
          draggable={false}
        />
        <div className="relative leading-[25px] text-aliceblue no-underline [text-shadow:0px_0px_2.67px_#fff,_0px_0px_10.93px_rgba(255,_255,_255,_0.5)]">
          <p className="m-0">Rock Spock</p>
          <p className="m-0 text-base">SAGA</p>
        </div>
      </Link>
      <div className="flex flex-row items-center justify-center gap-[30px] text-center text-base text-white">
        <Link
          to="/game-creating-session"
          className="relative leading-[30.97px] no-underline text-white"
        >
          Home
        </Link>
        <div className="relative leading-[30.97px] cursor-pointer" onClick={onRulesClick}>
          Rules
        </div>
        <Link
          to="https://shubhamparkhi.vercel.app"
          target="_blank"
          className="relative leading-[30.97px] no-underline text-white"
        >
          Developer
        </Link>
        {!currentUser ? (
          <Button
            text="Connect Wallet"
            buttonPadding="10px 15px"
            onButtonClick={getCurrentUser}
          />
        ) : null}
      </div>
    </div>
  );
};

export default NavBar;
