import { ChainId, TokenInfo } from "@decent.xyz/box-common";
import { zeroAddress } from "viem";



export const polygonGasToken: TokenInfo = {
  address: zeroAddress,
  decimals: 18,
  name: "Matic",
  symbol: "MATIC",
  logo: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=025",
  chainId: ChainId.POLYGON_TESTNET,
  isNative: true,
};
export const GHO_TESTNET = "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60";

export const ghoToken: TokenInfo = {
  address: GHO_TESTNET,
  decimals: 18,
  name: "Gho Token",
  symbol: "GHO",
  logo: `https://assets.coingecko.com/coins/images/30663/standard/ghoaave.jpeg`,
  chainId: ChainId.SEPOLIA,
  isNative: false,
};

export const USDC_OPTIMISM = "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85";

export const usdcToken: TokenInfo = {
  address: USDC_OPTIMISM,
  decimals: 6,
  name: "USD Coin",
  symbol: "USDC",
  logo: `https://s3.coinmarketcap.com/static-gravity/image/5a8229787b5e4c809b5914eef709b59a.png`,
  chainId: ChainId.OPTIMISM_TESTNET,
  isNative: false,
};


export const defaultAvailableChains = [
  ChainId.SEPOLIA,
  ChainId.OPTIMISM_TESTNET,
  ChainId.ARBITRUM_TESTNET,
  ChainId.POLYGON_TESTNET,
  ChainId.BASE_TESTNET,
  ChainId.AVALANCHE_TESTNET,
];

export function getChainIcon(chainId: ChainId | number) {
  switch (chainId) {
    case (ChainId.SEPOLIA):
      return '/ethereum.svg';
    case (ChainId.OPTIMISM_TESTNET):
      return '/optimism.svg';
    case (ChainId.ARBITRUM_TESTNET):
      return '/arbitrum.svg';
    case (ChainId.POLYGON_TESTNET):
      return '/polygon.svg';
    case (ChainId.BASE_TESTNET):
      return '/base.png';
    case (ChainId.AVALANCHE_TESTNET):
      return '/avalanche.svg';
  }
}