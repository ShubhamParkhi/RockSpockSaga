import {BigNumberish, ethers} from "ethers";
import {RPS_CONTRACT} from "../config";

const infuraKey = 'https://sepolia.infura.io/v3/ca2f8983db9147dc89ef7ed30343e523';
export const getProvider = () => {
  if (window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  return new ethers.JsonRpcProvider(infuraKey);
}

export const isReadOnly = () => {
  return !window.ethereum;
}

export const getSigner = async () => {
  if (isReadOnly()) {
    throw new Error('No signer available');
  }

  const provider = getProvider();
  return await provider.getSigner();
}

interface DeployContractParams {
  move: number,
  salt: number,
  opponent: string,
  amount: BigNumberish,
}

export const deployContract = async (info: DeployContractParams): Promise<string> => {
  const signer = await getSigner();
  const contractFactory = new ethers.ContractFactory(RPS_CONTRACT.abi, RPS_CONTRACT.bytecode, signer);

  const hash = ethers.solidityPackedKeccak256(["uint8", "uint256"], [info.move, info.salt])

  const contract = await contractFactory.deploy(hash, info.opponent, {
    value: info.amount,
  });

  return contract.target.toString();
}
