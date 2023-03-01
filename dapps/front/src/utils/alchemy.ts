import { Network, Alchemy } from "alchemy-sdk";
import { ethers } from "ethers";
import { SecretContract, contractAddress } from "@src/abi/secret";
const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const settings = {
  apiKey: apiKey,
  network: Network.ETH_GOERLI,
};
export const alchemy = new Alchemy(settings);
export const alchemyProvider = new ethers.providers.AlchemyProvider(
  Network.ETH_GOERLI,
  apiKey
);

const PRIVATE_KEY = ""; // Need to make this into api because of security risk
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);
export const secretContractAlchemy = new ethers.Contract(
  contractAddress,
  SecretContract.abi,
  signer
);
