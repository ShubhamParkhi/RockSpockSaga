import { useRouter } from 'next/router';
import WaitingForOpponentsMove from '../../components/Waiting for Opponents Move/WaitingForOpponentsMove';

export default function Play() {
  const router = useRouter();
  const contractAddress = router.query.contractAddress;
  
  return <WaitingForOpponentsMove contractAddress={contractAddress as string} />;
}
