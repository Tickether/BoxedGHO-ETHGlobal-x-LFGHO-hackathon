import { ChainId, TokenInfo } from "@decent.xyz/box-common";
import { zeroAddress } from "viem";


//eth
export const ethGasToken: TokenInfo = {
  address: zeroAddress,
  decimals: 18,
  name: "Ethereum",
  symbol: "ETH",
  logo: "/ethereum.png",
  chainId: ChainId.ETHEREUM,
  isNative: true,
};
export const arbGasToken: TokenInfo = {
  address: zeroAddress,
  decimals: 18,
  name: "Ethereum",
  symbol: "ETH",
  logo: "/ethereum.png",
  chainId: ChainId.ETHEREUM,
  isNative: true,
};
export const opGasToken: TokenInfo = {
  address: zeroAddress,
  decimals: 18,
  name: "Ethereum",
  symbol: "ETH",
  logo: "/ethereum.png",
  chainId: ChainId.ETHEREUM,
  isNative: true,
};
export const baseGasToken: TokenInfo = {
  address: zeroAddress,
  decimals: 18,
  name: "Ethereum",
  symbol: "ETH",
  logo: "/ethereum.png",
  chainId: ChainId.ETHEREUM,
  isNative: true,
};


//gho
export const GHO_MAINNET = "0x40d16fc0246ad3160ccc09b8d0d3a2cd28ae6c2f";
export const ghoTokenMain: TokenInfo = {
  address: GHO_MAINNET,
  decimals: 18,
  name: "Gho Token",
  symbol: "GHO",
  logo: "https://assets.coingecko.com/coins/images/30663/standard/ghoaave.jpeg",
  chainId: ChainId.ETHEREUM,
  isNative: false,
};



//usdc
export const USDC_ETHEREUM = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
export const usdcTokenEth: TokenInfo = {
  address: USDC_ETHEREUM,
  decimals: 6,
  name: "USD Coin",
  symbol: "USDC",
  logo: "/usdc.png",
  chainId: ChainId.ETHEREUM,
  isNative: false,
};
export const USDC_ARBITRUM = "0xaf88d065e77c8cc2239327c5edb3a432268e5831";
export const usdcTokenArb: TokenInfo = {
  address: USDC_ARBITRUM,
  decimals: 6,
  name: "USD Coin",
  symbol: "USDC",
  logo: "/usdc.png",
  chainId: ChainId.ARBITRUM,
  isNative: false,
};
export const USDC_BASE = "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913";
export const usdcTokenBase: TokenInfo = {
  address: USDC_BASE,
  decimals: 6,
  name: "USD Coin",
  symbol: "USDC",
  logo: "/usdc.png",
  chainId: ChainId.BASE,
  isNative: false,
};
export const USDC_OPTIMISM = "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85";
export const usdcTokenOp: TokenInfo = {
  address: USDC_OPTIMISM,
  decimals: 6,
  name: "USD Coin",
  symbol: "USDC",
  logo: "/usdc.png",
  chainId: ChainId.OPTIMISM,
  isNative: false,
};




//uni
export const UNI_ETHEREUM = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984";
export const uniTokenEth: TokenInfo = {
  address: UNI_ETHEREUM,
  decimals: 18,
  name: "Uniswap",
  symbol: "UNI",
  logo: "/uni.png",
  chainId: ChainId.ETHEREUM,
  isNative: false,
};
export const UNI_ARBITRUM = "0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0";
export const uniTokenArb: TokenInfo = {
  address: UNI_ARBITRUM,
  decimals: 18,
  name: "Uniswap",
  symbol: "UNI",
  logo: "/uni.png",
  chainId: ChainId.ARBITRUM,
  isNative: false,
};
export const UNI_OPTIMISM = "0x6fd9d7ad17242c41f7131d257212c54a0e816691";
export const uniTokenOp: TokenInfo = {
  address: UNI_OPTIMISM,
  decimals: 18,
  name: "Uniswap",
  symbol: "UNI",
  logo: "/uni.png",
  chainId: ChainId.OPTIMISM,
  isNative: false,
};

export const defaultAvailableChains = [
  ChainId.ETHEREUM,
  ChainId.OPTIMISM,
  ChainId.ARBITRUM,
  ChainId.BASE,
];

export const defaultAvailableTokens: { [key: number]: TokenInfo[] } = {
  [ChainId.ETHEREUM]: [
    ethGasToken,
    usdcTokenEth,
    uniTokenEth
  ],
  [ChainId.OPTIMISM]: [
    opGasToken,
    usdcTokenOp,
    uniTokenOp
  ],
  [ChainId.ARBITRUM]: [
    arbGasToken,
    usdcTokenArb,
    uniTokenArb
  ],
  [ChainId.BASE]: [
    baseGasToken,
    usdcTokenBase,
  ],
};
