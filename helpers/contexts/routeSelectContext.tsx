'use client'

import { ChainId, TokenInfo } from "@decent.xyz/box-common";
import { ethGasToken, opGasToken, baseGasToken, arbGasToken, ghoTokenMain } from "../constants";
import { Dispatch, PropsWithChildren, createContext, useReducer } from "react";

export const chainIcons: { [key: number]: string } = {
  [ChainId.ETHEREUM]: "/ethereum.svg",
  [ChainId.OPTIMISM]: "/optimism.svg",
  [ChainId.ARBITRUM]: "/arbitrum.svg",
  [ChainId.BASE]: "/base.png",
};

export const chainNames: { [key: number]: string } = {
  [ChainId.ETHEREUM]: "Ethereum",
  [ChainId.OPTIMISM]: "OP Mainnet",
  [ChainId.ARBITRUM]: "Arbitrum One",
  [ChainId.BASE]: "Base",
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
    srcChain: ChainId.ETHEREUM,
    srcToken: ghoTokenMain,
    dstChain: ChainId.OPTIMISM,
    dstToken: opGasToken,
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
  if (chainId == ChainId.ARBITRUM) {
    return { ...arbGasToken, chainId };
  }
  if (chainId == ChainId.OPTIMISM) {
    return { ...opGasToken, chainId };
  }
  if (chainId == ChainId.BASE) {
    return { ...baseGasToken, chainId };
  }
  return { ...ethGasToken, chainId };
}

export default function RouteSelectProvider({ children }: PropsWithChildren) {
  const [routeVars, updateRouteVars] = useReducer(routeReducer, {
    srcChain: ChainId.ETHEREUM,
    srcToken: ghoTokenMain,
    dstChain: ChainId.OPTIMISM,
    dstToken: opGasToken,
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
