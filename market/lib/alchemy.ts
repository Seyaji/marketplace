import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: process.env.ALCHEMY_API,
  network: Network.ETH_SEPOLIA,
};

export const alchemy = new Alchemy(settings);
