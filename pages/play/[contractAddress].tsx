import { useRouter } from 'next/router';
import React from "react";
import WaitingForOpponentsMove from "../../components/Waiting for Opponents Move/WaitingForOpponentsMove";

const Play: React.FC = () => {
  const router = useRouter();
  const { contractAddress } = router.query;

  return <WaitingForOpponentsMove contractAddress={contractAddress as string} />;
};

export default Play;
