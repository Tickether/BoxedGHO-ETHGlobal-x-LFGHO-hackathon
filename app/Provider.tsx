"use client";
import { supportedSocialConnectors } from "@zerodev/wagmi/connectkit";
import { supportedConnectors } from "connectkit";
supportedConnectors.push(...supportedSocialConnectors);

import {
  SocialWalletConnector,
  GoogleSocialWalletConnector,
  FacebookSocialWalletConnector,
  GithubSocialWalletConnector,
  DiscordSocialWalletConnector,
  TwitchSocialWalletConnector,
  TwitterSocialWalletConnector,
} from "@zerodev/wagmi";

import { createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai } from "viem/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import {
  getDefaultConfig,
  ConnectKitButton,
  ConnectKitProvider,
} from "connectkit";
import { Children } from "react";

function ConnectKitExample({ children }: { children: React.ReactNode }) {
  const chains = [polygonMumbai];
  console.log(process.env.NEXT_PUBLIC_W3M_PROJECT_ID);
  const options = {
    chains,
    options: { projectId: process.env.NEXT_PUBLIC_DECENT_API_KEY },
  };

  const config = createConfig(
    getDefaultConfig({
      alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY, // or infuraId
      walletConnectProjectId: process.env.NEXT_PUBLIC_W3M_PROJECT_ID,
      connectors: [new GoogleSocialWalletConnector(options)],
      appName: "Your App Name",
      appDescription: "Your App Description",
      appUrl: "https://family.co", // your app's url
      appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    })
  );

  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider theme="midnight">{children}</ConnectKitProvider>
    </WagmiConfig>
  );
}

export default ConnectKitExample;
