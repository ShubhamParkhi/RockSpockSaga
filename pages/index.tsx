import type { NextPage } from "next";
import { useRouter } from "next/router";
import LogoAnimation from "../components/Splash Screen/logoanimation";

const SplashScreen: NextPage = () => {
  const router = useRouter();

  const onAnimationComplete = () => {
    setTimeout(() => {
      router.push("/game-creating-session");
    }, 500);
    };

  return (
    <div className="relative bg-gray-300 w-full h-screen flex flex-col items-center justify-center py-10 px-[100px] box-border gap-[50px]">
      <LogoAnimation onAnimationComplete={onAnimationComplete} />
    </div>
  );
};

export default SplashScreen;
