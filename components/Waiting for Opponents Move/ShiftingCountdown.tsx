import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ShiftingCountdownProps {
  timeLeft: number;
}

const ShiftingCountdown = ({ timeLeft }: ShiftingCountdownProps) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [countdown, setCountdown] = useState(timeLeft);

  useEffect(() => {
    setCountdown(timeLeft);
    intervalRef.current = setInterval(() => {
      setCountdown((prevCountdown) => Math.max(prevCountdown - 1, 0)); // Update countdown
    }, 1000);

    return () => clearInterval(intervalRef.current || undefined);
  }, [timeLeft]);

  const minutes = Math.floor((countdown % 3600) / 60);
  const seconds = Math.floor((countdown % 3600) % 60);

  return (
    <div className="w-full max-w-5xl mx-auto rounded-xl flex items-center justify-center bg-gray-500">
      <CountdownItem num={minutes} text="minutes" />
      <CountdownItem num={seconds} text="seconds" />
    </div>
  );
};

const CountdownItem = ({ num, text }: { num: number; text: string }) => {
  return (
    <div className=" font-aclonica w-1/4 h-24 flex flex-col items-center justify-center border-r-[1px] border-slate-200">
      <div className="w-full text-center relative overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={num}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ ease: "backIn", duration: 0.75 }}
            className="block text-2xl md:text-4xl lg:text-6xl xl:text-7xl text-aliceblue font-medium"
          >
            {num}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-xs md:text-sm lg:text-base font-light text-aliceblue">
        {text}
      </span>
    </div>
  );
};

export default ShiftingCountdown;