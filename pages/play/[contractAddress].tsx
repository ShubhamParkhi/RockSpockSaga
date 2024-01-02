import type { NextPage } from "next";
import { useRouter } from "next/router";
import WaitingForOpponentsMove from '../../components/Waiting for Opponents Move/WaitingForOpponentsMove';

const WaitingForOpponent: NextPage = () => {
  const router = useRouter();
  const contractAddress = router.query.contractAddress;

  return (
    <div>
      <WaitingForOpponentsMove contractAddress={contractAddress as string} />
    </div>
  );
};

export default WaitingForOpponent;