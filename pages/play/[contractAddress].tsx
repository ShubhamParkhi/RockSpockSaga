import type { NextPage } from 'next';
import type { GetServerSidePropsContext } from 'next';
import WaitingForOpponentsMove from '../../components/Waiting for Opponents Move/WaitingForOpponentsMove';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { contractAddress } = context.query;
  return {
    props: { contractAddress }
  };
}

const WaitingForOpponent: NextPage<{ contractAddress: string }> = ({ contractAddress }) => {
  return (
    <div>
      <WaitingForOpponentsMove contractAddress={contractAddress} />
    </div>
  );
};
export default WaitingForOpponent;
