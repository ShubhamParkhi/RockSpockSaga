import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import { motion } from "framer-motion";

type ButtonType = {
  text?: string;
  disabled?: boolean;
  buttonPadding?: CSSProperties["padding"];
  onButtonClick?: () => void;
};

const Button: NextPage<ButtonType> = ({
  text,
  buttonPadding,
  onButtonClick,
  disabled,
}) => {
  const buttonStyle: CSSProperties = useMemo(() => {
    return {
      padding: buttonPadding,
    };
  }, [buttonPadding]);

  return (
    <motion.button
      className="rounded-3xs bg-gray-500 [backdrop-filter:blur(6px)] flex flex-row items-center justify-center py-5 px-[30px] text-center text-base text-aliceblue font-aclonica cursor-pointer"
      style={buttonStyle}
      onClick={onButtonClick}
      disabled={disabled}
      whileHover={{ 
        boxShadow: "0px 0px 10px 0px #FFF", 
        scale: 1.025,
      }}
      whileTap={{scale: 0.975}}
    >
    <div className="relative">{text}</div>
    </motion.button>
  );
};

export default Button;
