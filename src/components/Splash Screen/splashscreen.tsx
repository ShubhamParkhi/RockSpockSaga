import React from 'react';
import LogoAnimation from './logoanimation';
import { useNavigate } from 'react-router-dom';

interface SplashScreenProps {}

const SplashScreen: React.FC<SplashScreenProps> = () => {
  const navigate = useNavigate(); // Use navigate from react-router-dom

  const onAnimationComplete = () => {
    setTimeout(() => {
      navigate('/game-creating-session'); // Use navigate for routing
    }, 500);
  };

  return (
    <div className="relative bg-gray-300 w-full h-screen flex flex-col items-center justify-center py-10 px-[100px] box-border gap-[50px]">
      <LogoAnimation onAnimationComplete={onAnimationComplete} />
    </div>
  );
};

export default SplashScreen;
