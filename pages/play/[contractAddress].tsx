import { NextPage } from "next";
import React from "react";
import WaitingForOpponentsMove from "../../components/Waiting for Opponents Move/WaitingForOpponentsMove";

const WaitingForOpponent: NextPage<{ contractAddress: string }> = ({
  contractAddress,
}: {
  contractAddress: string;
}) => {
  return <WaitingForOpponentsMove contractAddress={contractAddress} />;
};

export default WaitingForOpponent;
