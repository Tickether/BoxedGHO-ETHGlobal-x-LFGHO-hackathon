'use client'

import { ChainId, TokenInfo, ethGasToken } from "@decent.xyz/box-common";
import { polygonGasToken, usdcToken } from "../constants";
import { Dispatch, PropsWithChildren, createContext, useReducer } from "react";

export const chainIcons: { [key: number]: string } = {
  [ChainId.SEPOLIA]: "/ethereum.svg",
  [ChainId.OPTIMISM_TESTNET]: "/optimism.svg",
  [ChainId.ARBITRUM_TESTNET]: "/arbitrum.svg",
  [ChainId.POLYGON_TESTNET]: "/polygon.svg",
  [ChainId.BASE_TESTNET]: "/base.png",
  [ChainId.AVALANCHE_TESTNET]: "/avalanche.svg",
};

export const chainNames: { [key: number]: string } = {
  [ChainId.SEPOLIA]: "Ethereum",
  [ChainId.OPTIMISM_TESTNET]: "OP Mainnet",
  [ChainId.ARBITRUM_TESTNET]: "Arbitrum One",
  [ChainId.POLYGON_TESTNET]: "Polygon",
  [ChainId.BASE_TESTNET]: "Base",
  [ChainId.AVALANCHE_TESTNET]: "Avalanche",
};

export type RouteVars = {
  srcChain: ChainId;
  srcToken: TokenInfo;
  dstChain: ChainId;
  dstToken: TokenInfo;
  sameChain: boolean;
  purchaseName: string;
};

export const RouteSelectContext = createContext<{
  routeVars: RouteVars;
  updateRouteVars: Dispatch<Partial<RouteVars>>;
}>({
  routeVars: {
    srcChain: ChainId.OPTIMISM_TESTNET,
    srcToken: ethGasToken,
    dstChain: ChainId.OPTIMISM_TESTNET,
    dstToken: usdcToken,
    purchaseName: "",
    sameChain: false,
  },
  updateRouteVars: () => {},
});

function routeReducer(prev: RouteVars, next: Partial<RouteVars>) {
  const newVars = { ...prev, ...next };

  if (newVars.dstChain !== prev.dstChain && !next.dstToken) {
    newVars.dstToken = getDefaultToken(newVars.dstChain);
  }

  newVars.sameChain =
    newVars.srcChain == newVars.dstChain &&
    newVars.srcToken.address == newVars.dstToken.address;

  return newVars;
}

export function getDefaultToken(chainId: ChainId) {
  if (chainId == ChainId.POLYGON || chainId == ChainId.POLYGON_TESTNET) {
    return { ...polygonGasToken, chainId };
  }
  return { ...ethGasToken, chainId };
}

export default function RouteSelectProvider({ children }: PropsWithChildren) {
  const [routeVars, updateRouteVars] = useReducer(routeReducer, {
    srcChain: ChainId.ARBITRUM_TESTNET,
    srcToken: ethGasToken,
    dstChain: ChainId.OPTIMISM_TESTNET,
    dstToken: usdcToken,
    sameChain: false,
    purchaseName: "",
  });

  const value = { routeVars, updateRouteVars };

  return (
    <RouteSelectContext.Provider value={value}>
      {children}
    </RouteSelectContext.Provider>
  );
}
